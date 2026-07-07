export type AIMaterialInput = {
  grade: number;
  subject: string;
  chapter: string;
  questionCount: number;
  difficulty: "mudah" | "sedang" | "menantang";
};

export type AIMaterialOutput = {
  summary: string;
  examples: string[];
  exercises: string[];
  homework: string[];
  explanations: string[];
  parentNotes: string;
};

export function generateMockMaterial(input: AIMaterialInput): AIMaterialOutput {
  const levelText = {
    mudah: "bahasa sederhana dan langkah kecil",
    sedang: "campuran konsep dasar dan soal penerapan",
    menantang: "soal cerita dan penalaran bertahap"
  }[input.difficulty];

  const topic = `${input.subject} kelas ${input.grade} - ${input.chapter}`;
  const makeQuestion = (index: number) =>
    `${index}. Soal ${input.difficulty} tentang ${input.chapter.toLowerCase()} untuk murid kelas ${input.grade}.`;

  return {
    summary: `Ringkasan dummy AI untuk ${topic}. Materi disusun dengan ${levelText}, cocok untuk sesi bimbel SD dan latihan personal.`,
    examples: [
      `Contoh 1: Guru menjelaskan konsep utama ${input.chapter} memakai benda di sekitar anak.`,
      `Contoh 2: Murid menyelesaikan satu soal bersama, lalu menjelaskan ulang dengan kalimat sendiri.`
    ],
    exercises: Array.from({ length: input.questionCount }, (_, index) => makeQuestion(index + 1)),
    homework: [
      `Kerjakan 5 soal penguatan ${input.chapter} di rumah.`,
      "Tuliskan satu hal yang sudah dipahami dan satu hal yang masih membingungkan."
    ],
    explanations: [
      "Pembahasan dibuat bertahap: pahami pertanyaan, tandai kata kunci, pilih rumus atau strategi, lalu cek ulang jawaban.",
      "Untuk soal cerita, anak diminta menggambar situasi agar konsep lebih mudah terlihat."
    ],
    parentNotes:
      "Catatan untuk orang tua: dampingi anak 15-20 menit, beri pujian pada proses berpikir, dan kirim foto PR jika membutuhkan umpan balik guru."
  };
}
