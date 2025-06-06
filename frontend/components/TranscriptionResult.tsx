// components/TranscriptionResult.tsx

type Props = {
  data: any;
};

export default function TranscriptionResult({ data }: Props) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">📝 Transcript</h2>
      <p className="bg-gray-100 p-4 rounded">{data.text}</p>

      <h3 className="text-lg mt-4">⏱ Word Timings:</h3>
      <ul className="text-sm text-gray-700">
        {data.segments?.flatMap((seg: any, idx: number) =>
          seg.words?.map((word: any, i: number) => (
            <li key={`${idx}-${i}`}>
              {word.word} → {word.start.toFixed(2)}s - {word.end.toFixed(2)}s
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
