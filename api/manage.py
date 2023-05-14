import uvicorn

from app.main import create_app

app = create_app()

if __name__ == "__main__":
    uvicorn.run(
        "oss_website:app",
        host="0.0.0.0",
        port=8000,
        log_level="info",
        reload=True
    )
