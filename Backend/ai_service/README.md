# Video Chat AI Service

A FastAPI service that provides AI-powered chat capabilities for video content using OpenAI-compatible APIs and RAG (Retrieval Augmented Generation).

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

## Running the Service

Start the service with:
```bash
python main.py
```

The service will be available at `http://localhost:8000`.

## API Endpoints

### Chat Endpoint
- **URL**: `/api/chat`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "message": "What is this video about?",
    "document_id": "vid_12345"  // Optional
  }
  ```
- **Response**:
  ```json
  {
    "answer": "This video is about...",
    "used_rag": true,
    "document_id": "vid_12345"
  }
  ```

## Integration with Main Application

To integrate this service with the main application:

1. Ensure the AI service is running
2. Make HTTP requests from your main backend to the `/api/chat` endpoint
3. Handle the responses in your application

## Development

- The service is configured for hot reloading during development
- API documentation available at `/docs` when the service is running 