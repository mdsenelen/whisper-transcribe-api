from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import whisper
import tempfile

app = FastAPI()

# CORS ayarları – Frontend'in erişebilmesi için
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Gerekirse burayı localhost:3000 ile sınırla
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Whisper modelini yükle
model = whisper.load_model("tiny")


@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    """
    Ses dosyasını alır, geçici olarak kaydeder, Whisper ile transkript yapar.
    """
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        result = model.transcribe(tmp_path, word_timestamps=True)

        return JSONResponse(content=result)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.post("/echo")
async def echo(data: dict):
    """
    Test amaçlı: gelen JSON'ı aynen geri döner.
    """
    return JSONResponse(content={"received": data})
