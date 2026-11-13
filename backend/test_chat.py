import os
import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient

os.environ.setdefault("OPENAI_API_KEY", "test-key-no-network")

from app import OPENAI_MODEL, app, mcp_server


class ChatTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)
        mcp_server._memory.clear()

    def tearDown(self):
        self.client.close()
        mcp_server._memory.clear()

    @patch("app.openai.ChatCompletion.create")
    def test_missing_key_keeps_health_online_and_chat_returns_503(self, create):
        with patch("app.OPENAI_API_KEY", None):
            health = self.client.get("/")
            self.assertEqual(health.status_code, 200)
            self.assertFalse(health.json()["openai_api_key_set"])
            response = self.client.post("/api/chat", json={"message": "Hi"})
        self.assertEqual(response.status_code, 503)
        self.assertIn("API key is not configured", response.json()["detail"])
        create.assert_not_called()

    @patch("app.openai.ChatCompletion.create")
    def test_text_reply_uses_configured_model(self, create):
        create.return_value = {"choices": [{"message": {"content": "Hello"}}]}
        response = self.client.post("/api/chat", json={"message": "Hi"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"response": "Hello", "type": "text"})
        self.assertEqual(create.call_args.kwargs["model"], OPENAI_MODEL)
        self.assertEqual(create.call_args.kwargs["reasoning_effort"], "none")

    @patch("app.openai.ChatCompletion.create")
    def test_tool_followup_uses_same_model_and_returns_result(self, create):
        create.side_effect = [
            {"choices": [{"message": {"function_call": {
                "name": "save_to_memory",
                "arguments": '{"key": "color", "value": "blue"}',
            }}}]},
            {"choices": [{"message": {"content": "Saved blue."}}]},
        ]
        response = self.client.post("/api/chat", json={"message": "Save my color as blue"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["type"], "tool_call")
        self.assertEqual(response.json()["tool_called"], "save_to_memory")
        self.assertEqual(response.json()["response"], "Saved blue.")
        self.assertEqual(mcp_server.retrieve("color"), "blue")
        self.assertEqual(create.call_count, 2)
        for call in create.call_args_list:
            self.assertEqual(call.kwargs["model"], OPENAI_MODEL)
            self.assertEqual(call.kwargs["reasoning_effort"], "none")
        messages = create.call_args.kwargs["messages"]
        self.assertEqual(messages[-1]["role"], "function")
        self.assertEqual(messages[-1]["name"], "save_to_memory")


if __name__ == "__main__":
    unittest.main()
