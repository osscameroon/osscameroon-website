from typing import Any

from fastapi import FastAPI

from app.main.controller.github_controller import github_router


async def status() -> dict[str, Any]:
    return {
        "status": "ok",
        "version": "1.0",
        "apis": [
            {"path": "api/v1"}
        ]
    }

def create_app():
    app =  FastAPI(title='OssCameroon API', version="0.1")
    app.include_router(github_router)

    # Add middleware/event_handler and everything else

    app.get("/")(status)

    return app
