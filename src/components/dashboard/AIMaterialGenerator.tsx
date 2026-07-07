"use client";

import { FormEvent, useState } from "react";
import { BrainCircuit, WandSparkles } from "lucide-react";
import { generateMockMaterial, type AIMaterialInput, type AIMaterialOutput } from "@/lib/ai";

const initialInput: AIMaterialInput = {
  grade: 3,
  subject: "Matematika",
  chapter: "Perkalian 1-10",
  questionCount: 5,
  difficulty: "sedang"
};

export function AIMaterialGenerator() {
  const [input, setInput] = useState<AIMaterialInput>(initialInput);
  const [result, setResult] = useState<AIMaterialOutput | null>(() => generateMockMaterial(initialInput));

  function update<K extends keyof AIMaterialInput>(key: K, value: AIMaterialInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(generateMockMaterial(input));
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
      <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="rounded-lg bg-ocean-50 p-3 text-ocean-700">
            <BrainCircuit className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-ink">Generate Materi AI</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Susun ringkasan, latihan, PR, pembahasan, dan catatan orang tua dalam satu alur.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="space-y-2">
            <span className="label">Kelas</span>
            <select
              className="field"
              value={input.grade}
              onChange={(event) => update("grade", Number(event.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((grade) => (
                <option key={grade} value={grade}>
                  SD Kelas {grade}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="label">Mata pelajaran</span>
            <select
              className="field"
              value={input.subject}
              onChange={(event) => update("subject", event.target.value)}
            >
              {["Matematika", "Bahasa Indonesia", "IPA", "Bahasa Inggris"].map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="label">Tema/Bab</span>
            <input
              className="field"
              value={input.chapter}
              onChange={(event) => update("chapter", event.target.value)}
            />
          </label>
          <label className="space-y-2">
            <span className="label">Jumlah soal</span>
            <input
              className="field"
              min={3}
              max={20}
              type="number"
              value={input.questionCount}
              onChange={(event) => update("questionCount", Number(event.target.value))}
            />
          </label>
          <label className="space-y-2">
            <span className="label">Tingkat kesulitan</span>
            <select
              className="field"
              value={input.difficulty}
              onChange={(event) =>
                update("difficulty", event.target.value as AIMaterialInput["difficulty"])
              }
            >
              <option value="mudah">Mudah</option>
              <option value="sedang">Sedang</option>
              <option value="menantang">Menantang</option>
            </select>
          </label>
        </div>
        <button type="submit" className="btn-primary mt-5 w-full">
          <WandSparkles className="h-4 w-4" />
          Generate Dummy
        </button>
      </form>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="label text-ocean-700">Output AI</p>
            <h3 className="mt-1 text-xl font-bold text-ink">
              {input.subject} kelas {input.grade}: {input.chapter}
            </h3>
          </div>
          <span className="rounded-full bg-sunshine-100 px-3 py-1 text-xs font-bold text-ink">
            Draft
          </span>
        </div>

        {result ? (
          <div className="mt-5 space-y-5">
            <OutputBlock title="Ringkasan materi" content={[result.summary]} />
            <OutputBlock title="Contoh soal" content={result.examples} ordered />
            <OutputBlock title="Latihan" content={result.exercises} ordered />
            <OutputBlock title="PR" content={result.homework} ordered />
            <OutputBlock title="Pembahasan" content={result.explanations} />
            <OutputBlock title="Catatan untuk orang tua" content={[result.parentNotes]} />
          </div>
        ) : null}
      </section>
    </div>
  );
}

function OutputBlock({
  title,
  content,
  ordered = false
}: {
  title: string;
  content: string[];
  ordered?: boolean;
}) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <div>
      <h4 className="font-bold text-ink">{title}</h4>
      <ListTag className={`mt-2 space-y-2 text-sm leading-6 text-slate-600 ${ordered ? "list-decimal pl-5" : ""}`}>
        {content.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </div>
  );
}
