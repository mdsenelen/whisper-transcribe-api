// components/LanguageSelector.tsx

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

const languages = [
  { code: 'en', name: 'English' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
];

export default function LanguageSelector({ selected, onChange }: Props) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
