from fastapi import FastAPI
import os

app = FastAPI()

@app.get("/")
def root():
    return {"data": "Hello World!"}

@app.get("/add")
def add(a: float, b: float):
    return {"data": a + b}

@app.get("/health")
def health_check():
    return {"status": "ok", "version": os.getenv("API_VERSION", "1.0.0")}

