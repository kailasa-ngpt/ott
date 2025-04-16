import httpx
import json
from openai import OpenAI
import config

class AIService:
    def __init__(self):
        self.client = OpenAI(
            api_key=config.OPENAI_API_KEY,
            base_url=config.OPENAI_API_BASE
        )
        self.model = config.OPENAI_MODEL
        self.rag_endpoint = config.RAG_API_ENDPOINT
    
    async def query_rag(self, query, document_id):
        """Query the RAG service to get relevant context"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.rag_endpoint,
                    json={"query": query, "document_id": document_id},
                    timeout=30.0
                )
                response.raise_for_status()
                return response.json()
        except httpx.HTTPError as e:
            print(f"Error querying RAG service: {e}")
            return {"context": "Unable to retrieve context from RAG service."}
    
    async def generate_response(self, user_query, document_id=None):
        """Generate a response using OpenAI API with optional RAG context"""
        
        # Initialize messages with system instructions
        messages = [
            {
                "role": "system", 
                "content": ("You are a helpful AI assistant that answers questions about videos. "
                           "If the question is about the video content, use the provided context "
                           "to answer accurately. If you don't know or the context doesn't help, "
                           "be honest about not knowing.")
            }
        ]
        
        # If document_id is provided, get context from RAG
        rag_context = None
        if document_id:
            rag_result = await self.query_rag(user_query, document_id)
            if "context" in rag_result and rag_result["context"]:
                rag_context = rag_result["context"]
                
                # Add RAG context to the messages
                messages.append({
                    "role": "system",
                    "content": f"Context from the video transcript: {rag_context}"
                })
        
        # Add user query
        messages.append({"role": "user", "content": user_query})
        
        try:
            # Call OpenAI API
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=500
            )
            
            return {
                "answer": response.choices[0].message.content,
                "used_rag": rag_context is not None,
                "document_id": document_id
            }
            
        except Exception as e:
            print(f"Error calling OpenAI API: {e}")
            return {"error": "Failed to generate response from AI service."}

# Create a singleton instance
ai_service = AIService() 