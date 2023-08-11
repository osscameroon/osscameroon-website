import uvicorn

from app.main import create_app

app = create_app()

if __name__ == "__main__":
    uvicorn.run(
        "manage:app",
        host="0.0.0.0",
        port=8811,
        log_level="info",
        reload=True
    )
