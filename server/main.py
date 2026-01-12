from fastapi import FastAPI, APIRouter
import os

app = FastAPI()

api_router = APIRouter(prefix="/api")

@api_router.get("/")
def root():
    return {"data": "Hello World!"}

@api_router.get("/add")
def add(a: float, b: float):
    return {"data": a + b}

@api_router.get("/subtract")
def subtract(a: float, b: float):
    return {"data": a - b}

@api_router.get("/health")
def health_check():
    return {"status": "ok", "version": os.getenv("API_VERSION", "1.0.0")}

app.include_router(api_router)