import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  file: FileList;
};

export default function Home() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [transcript, setTranscript] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (!data.file || data.file.length === 0) {
      toast.error("Lütfen bir ses dosyası seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("file", data.file[0]);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.text) {
        setTranscript(response.data.text);
        toast.success("Transkripsiyon başarılı!");
      } else {
        toast.error("Yanıt boş döndü.");
      }
    } catch (error: any) {
      toast.error("Transkripsiyon başarısız: " + (error?.message || "Bilinmeyen hata"));
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <>
      <Head>
        <title>Whisper Transcriber</title>
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <ToastContainer />
        <h1 className="text-3xl font-bold mb-4">🎙️ Whisper Transcribe</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
        >
          <input
            type="file"
            accept=".wav,.mp3,.m4a"
            {...register("file")}
            className="mb-4"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            {loading ? "Yükleniyor..." : "Transkribe Et"}
          </button>
        </form>

        {transcript && (
          <div className="mt-8 bg-white p-6 rounded shadow max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-2">📝 Transkript</h2>
            <p className="whitespace-pre-wrap">{transcript}</p>
          </div>
        )}
      </main>
    </>
  );
}
