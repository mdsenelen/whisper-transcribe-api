# Whisper Transcribe API — Multilingual, Real-Time Speech Transcription & Translation API

A FastAPI-powered speech-to-text API using OpenAI's Whisper model, supporting multi-language audio transcription with real-time capabilities, word-level timestamps, and easy integration for frontend projects.

🚧 **This project is in its early stages and under active development.**  
Upcoming features include grammar explanations, interactive subtitle generation, and two-way voice translation for language learning and accessibility use cases.

---

## 🔧 Features

- 🎙️ **Multi-language Audio Transcription**
- ⏱️ **Word-level Timestamps**
- ⚡ **Real-time Transcription**
- 🧠 **Powered by OpenAI's Whisper ASR**
- 🔌 **Easy Integration with Frontend Projects (React/Next.js Compatible)**
- 🚀 **FastAPI Backend for Scalability & Simplicity**

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/whisper-transcribe-api.git
   cd whisper-transcribe-api
````

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   venv\Scripts\activate   # On Windows
   source venv/bin/activate  # On Unix or MacOS
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Make sure `ffmpeg` is installed and added to your system PATH.
   You can download it from [gyan.dev FFmpeg builds](https://www.gyan.dev/ffmpeg/builds/).

---

## 🚀 Running the API

Start the FastAPI server with Uvicorn:

```bash
uvicorn main:app --reload
```

The API will be available at:
📍 `http://127.0.0.1:8000`

Interactive API docs:
📄 `http://127.0.0.1:8000/docs`

---

## 📤 Example Usage

Make a POST request to `/transcribe` with an audio file (`.wav`, `.mp3`, etc.):

```bash
curl -X POST "http://127.0.0.1:8000/transcribe" \
     -F "file=@example.wav"
```

Response:

```json
{
  "text": "Hello, this is a test transcription.",
  "language": "en",
  "segments": [
    {
      "start": 0.0,
      "end": 2.3,
      "text": "Hello, this is a test transcription."
    }
  ]
}
```

---

## 🧭 Roadmap (Planned Features)

* [ ] Grammar and language learning explanations
* [ ] Interactive subtitle syncing
* [ ] Two-way real-time speech translation
* [ ] Frontend integration examples (React/Next.js)
* [ ] Docker support for deployment


## 🤝 Contributions

Contributions are welcome!
Please open an issue or submit a pull request for any improvements, fixes, or feature ideas.



## 📄 License

MIT License
© 2025 \mdsenelen


