"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  audio: FileList;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [transcription, setTranscription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    const file = data.audio[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTranscription(res.data.text || JSON.stringify(res.data, null, 2));
    } catch (err: any) {
      setTranscription("Bir hata oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Ses Dosyası Transkripsiyonu</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Ses Dosyası (WAV/MP3)</label>
          <input
            type="file"
            accept="audio/*"
            {...register("audio", { required: "Lütfen bir ses dosyası yükleyin." })}
            className="border p-2 w-full"
          />
          {errors.audio && <p className="text-red-500 text-sm mt-1">{errors.audio.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Yükleniyor..." : "Transkripte Et"}
        </button>
      </form>

      {transcription && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Transkript:</h2>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{transcription}</pre>
        </div>
      )}
    </main>
  );
}
