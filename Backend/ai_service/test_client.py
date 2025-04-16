import asyncio
import httpx
import json

async def test_chat_api():
    """Test the chat API with and without document_id"""
    
    # Test URL - update with your actual URL when testing
    api_url = "http://localhost:8000/api/chat"
    
    # Test cases
    test_cases = [
        {
            "name": "Simple question without RAG",
            "data": {
                "message": "What can you tell me about this video?"
            }
        },
        {
            "name": "Question with document_id for RAG",
            "data": {
                "message": "What is the main topic of this video?",
                "document_id": "video_123"
            }
        }
    ]
    
    async with httpx.AsyncClient() as client:
        for test in test_cases:
            print(f"\n--- Testing: {test['name']} ---")
            print(f"Request: {json.dumps(test['data'], indent=2)}")
            
            try:
                response = await client.post(api_url, json=test['data'])
                
                print(f"Status Code: {response.status_code}")
                if response.status_code == 200:
                    print(f"Response: {json.dumps(response.json(), indent=2)}")
                else:
                    print(f"Error: {response.text}")
            except Exception as e:
                print(f"Exception: {e}")

if __name__ == "__main__":
    # Run the test function
    asyncio.run(test_chat_api()) 