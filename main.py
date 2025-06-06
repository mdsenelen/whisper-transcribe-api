from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import whisper
import tempfile

app = FastAPI()

model = whisper.load_model("tiny")


@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    try:
        # Geçici bir dosyaya yaz
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        # Whisper ile transkripti al
        result = model.transcribe(tmp_path, word_timestamps=True)

        return JSONResponse(content=result)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
