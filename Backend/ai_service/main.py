from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn

from ai_service import ai_service
import config

# Define request data model
class ChatRequest(BaseModel):
    message: str
    document_id: Optional[str] = None

# Define response data model
class ChatResponse(BaseModel):
    answer: str
    used_rag: bool
    document_id: Optional[str] = None

# Initialize FastAPI app
app = FastAPI(title="Video Chat AI Service")

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Video Chat AI Service is running"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Endpoint to send a message to the AI and get a response.
    Optionally include a document_id to use RAG with video transcript.
    """
    if not request.message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    response = await ai_service.generate_response(
        request.message, 
        request.document_id
    )
    
    if "error" in response:
        raise HTTPException(status_code=500, detail=response["error"])
    
    return response

if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host=config.HOST, 
        port=config.PORT,
        reload=True
    ) 