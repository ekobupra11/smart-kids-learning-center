import type { AppData } from "./types";

export const initialData: AppData = {
  users: [
    {
      id: "user-admin",
      name: "Admin Smart Kids",
      email: "admin@smartkids.local",
      role: "admin"
    },
    {
      id: "user-guru-1",
      name: "Bu Naya",
      email: "naya@smartkids.local",
      role: "guru",
      linkedId: "teacher-1"
    },
    {
      id: "user-parent-1",
      name: "Ibu Rina",
      email: "rina@example.com",
      role: "orang_tua",
      linkedId: "parent-1"
    },
    {
      id: "user-owner",
      name: "Owner Smart Kids",
      email: "owner@smartkids.local",
      role: "owner"
    }
  ],
  parents: [
    {
      id: "parent-1",
      name: "Ibu Rina",
      whatsapp: "628121110001",
      address: "Jl. Melati No. 7"
    },
    {
      id: "parent-2",
      name: "Bapak Dimas",
      whatsapp: "628131110002",
      address: "Jl. Cendana No. 11"
    },
    {
      id: "parent-3",
      name: "Ibu Sari",
      whatsapp: "628141110003",
      address: "Jl. Kenanga No. 3"
    }
  ],
  students: [
    {
      id: "student-1",
      name: "Alya Putri",
      grade: 3,
      age: 9,
      parentId: "parent-1",
      parentName: "Ibu Rina",
      whatsapp: "628121110001",
      address: "Jl. Melati No. 7",
      packageId: "paket-regular",
      desiredSchedule: "Senin & Rabu sore",
      notes: "Perlu penguatan perkalian.",
      status: "aktif",
      createdAt: "2026-07-01"
    },
    {
      id: "student-2",
      name: "Bima Pratama",
      grade: 5,
      age: 11,
      parentId: "parent-2",
      parentName: "Bapak Dimas",
      whatsapp: "628131110002",
      address: "Jl. Cendana No. 11",
      packageId: "paket-premium",
      desiredSchedule: "Selasa & Kamis sore",
      notes: "Suka eksperimen IPA.",
      status: "aktif",
      createdAt: "2026-07-02"
    },
    {
      id: "student-3",
      name: "Cika Maharani",
      grade: 1,
      age: 7,
      parentId: "parent-3",
      parentName: "Ibu Sari",
      whatsapp: "628141110003",
      address: "Jl. Kenanga No. 3",
      packageId: "paket-starter",
      desiredSchedule: "Sabtu pagi",
      notes: "Butuh transisi belajar yang lembut.",
      status: "baru",
      createdAt: "2026-07-04"
    },
    {
      id: "student-4",
      name: "Daffa Rizky",
      grade: 6,
      age: 12,
      parentId: "parent-2",
      parentName: "Bapak Dimas",
      whatsapp: "628131110002",
      address: "Jl. Cendana No. 11",
      packageId: "paket-premium",
      desiredSchedule: "Jumat sore",
      notes: "Persiapan ujian sekolah.",
      status: "aktif",
      createdAt: "2026-07-04"
    }
  ],
  teachers: [
    {
      id: "teacher-1",
      name: "Bu Naya",
      whatsapp: "628151110004",
      specialties: ["Matematika", "Bahasa Indonesia"],
      bio: "Sabar, terbiasa mengajar kelas kecil, dan fokus pada confidence anak."
    },
    {
      id: "teacher-2",
      name: "Pak Arif",
      whatsapp: "628161110005",
      specialties: ["IPA", "Matematika"],
      bio: "Mengajar dengan eksperimen mini, visual, dan latihan penalaran."
    },
    {
      id: "teacher-3",
      name: "Bu Lala",
      whatsapp: "628171110006",
      specialties: ["Calistung", "Bahasa Inggris"],
      bio: "Pendamping kelas awal yang hangat, rapi, dan penuh aktivitas."
    }
  ],
  classes: [
    {
      id: "class-1",
      name: "SD Kelas 1",
      grade: 1,
      teacherId: "teacher-3",
      room: "Ruang Matahari",
      scheduleIds: ["schedule-1"],
      studentIds: ["student-3"],
      materialIds: ["material-1"]
    },
    {
      id: "class-3",
      name: "SD Kelas 3",
      grade: 3,
      teacherId: "teacher-1",
      room: "Ruang Biru",
      scheduleIds: ["schedule-2"],
      studentIds: ["student-1"],
      materialIds: ["material-2", "material-3"]
    },
    {
      id: "class-5",
      name: "SD Kelas 5",
      grade: 5,
      teacherId: "teacher-2",
      room: "Ruang Inovasi",
      scheduleIds: ["schedule-3"],
      studentIds: ["student-2"],
      materialIds: ["material-4"]
    },
    {
      id: "class-6",
      name: "SD Kelas 6",
      grade: 6,
      teacherId: "teacher-2",
      room: "Ruang Fokus",
      scheduleIds: ["schedule-4"],
      studentIds: ["student-4"],
      materialIds: ["material-5"]
    }
  ],
  schedules: [
    {
      id: "schedule-1",
      classId: "class-1",
      day: "Sabtu",
      startTime: "08:00",
      endTime: "09:30",
      mode: "offline"
    },
    {
      id: "schedule-2",
      classId: "class-3",
      day: "Senin & Rabu",
      startTime: "16:00",
      endTime: "17:30",
      mode: "offline"
    },
    {
      id: "schedule-3",
      classId: "class-5",
      day: "Selasa & Kamis",
      startTime: "16:00",
      endTime: "17:30",
      mode: "offline"
    },
    {
      id: "schedule-4",
      classId: "class-6",
      day: "Jumat",
      startTime: "15:30",
      endTime: "17:30",
      mode: "offline"
    }
  ],
  subjects: [
    { id: "subject-math", name: "Matematika", color: "#2084e8" },
    { id: "subject-bindo", name: "Bahasa Indonesia", color: "#f59f00" },
    { id: "subject-ipa", name: "IPA", color: "#2f9e44" },
    { id: "subject-eng", name: "Bahasa Inggris", color: "#9c36b5" }
  ],
  materials: [
    {
      id: "material-1",
      subjectId: "subject-bindo",
      classGrade: 1,
      chapter: "Membaca Suku Kata",
      learningGoals: ["Mengenal bunyi suku kata", "Membaca kata sederhana"],
      summary:
        "Anak mengenal pola suku kata terbuka seperti ba, bi, bu, lalu merangkainya menjadi kata.",
      examples: ["ba + ju = baju", "ku + da = kuda"],
      exercises: ["Lingkari kata yang diawali huruf b.", "Baca 5 kata sederhana bersama guru."],
      homework: ["Baca kartu kata 10 menit bersama orang tua."],
      teacherNotes: "Gunakan kartu gambar agar anak tetap antusias."
    },
    {
      id: "material-2",
      subjectId: "subject-math",
      classGrade: 3,
      chapter: "Perkalian 1-10",
      learningGoals: ["Memahami perkalian sebagai penjumlahan berulang", "Menghafal fakta dasar"],
      summary:
        "Perkalian dipahami melalui kelompok benda yang jumlahnya sama, lalu dilatih bertahap.",
      examples: ["3 x 4 artinya 4 + 4 + 4 = 12", "5 kelompok berisi 2 pensil = 10 pensil"],
      exercises: ["Hitung 6 x 7.", "Tuliskan bentuk penjumlahan dari 4 x 5."],
      homework: ["Latihan tabel perkalian 6-8."],
      teacherNotes: "Alya lebih cepat paham memakai gambar kelompok benda."
    },
    {
      id: "material-3",
      subjectId: "subject-bindo",
      classGrade: 3,
      chapter: "Menemukan Ide Pokok",
      learningGoals: ["Membaca paragraf pendek", "Menentukan kalimat utama"],
      summary:
        "Murid mencari topik utama paragraf dan membedakan kalimat utama dari kalimat penjelas.",
      examples: ["Paragraf tentang kebersihan kelas memiliki ide pokok menjaga kelas tetap bersih."],
      exercises: ["Baca paragraf dan garis bawahi kalimat utama."],
      homework: ["Tulis 1 paragraf tentang kegiatan sore."],
      teacherNotes: "Minta anak menjawab dengan kalimat lengkap."
    },
    {
      id: "material-4",
      subjectId: "subject-ipa",
      classGrade: 5,
      chapter: "Sistem Pernapasan",
      learningGoals: ["Mengenal organ pernapasan", "Menjelaskan fungsi paru-paru"],
      summary:
        "Materi membahas jalur udara dari hidung ke paru-paru serta kebiasaan menjaga kesehatan napas.",
      examples: ["Udara masuk melalui hidung, lalu menuju tenggorokan dan paru-paru."],
      exercises: ["Urutkan organ pernapasan.", "Jelaskan mengapa olahraga baik untuk paru-paru."],
      homework: ["Buat poster kecil cara menjaga kesehatan pernapasan."],
      teacherNotes: "Gunakan model balon untuk demonstrasi."
    },
    {
      id: "material-5",
      subjectId: "subject-math",
      classGrade: 6,
      chapter: "Pecahan dan Persen",
      learningGoals: ["Mengubah pecahan menjadi persen", "Menyelesaikan soal cerita"],
      summary:
        "Murid menghubungkan pecahan, desimal, dan persen lewat konteks diskon, nilai, dan bagian dari keseluruhan.",
      examples: ["1/4 = 25%", "Diskon 20% dari Rp50.000 adalah Rp10.000"],
      exercises: ["Ubah 3/5 menjadi persen.", "Hitung 15% dari 80."],
      homework: ["Cari 3 contoh persen di rumah atau toko."],
      teacherNotes: "Daffa perlu latihan membaca soal cerita dengan lebih teliti."
    }
  ],
  attendance: [
    {
      id: "attendance-1",
      studentId: "student-1",
      classId: "class-3",
      date: "2026-07-01",
      status: "hadir"
    },
    {
      id: "attendance-2",
      studentId: "student-1",
      classId: "class-3",
      date: "2026-07-03",
      status: "hadir"
    },
    {
      id: "attendance-3",
      studentId: "student-2",
      classId: "class-5",
      date: "2026-07-02",
      status: "izin"
    },
    {
      id: "attendance-4",
      studentId: "student-4",
      classId: "class-6",
      date: "2026-07-04",
      status: "hadir"
    }
  ],
  grades: [
    {
      id: "grade-1",
      studentId: "student-1",
      classId: "class-3",
      subjectId: "subject-math",
      title: "Quiz Perkalian",
      score: 88,
      date: "2026-07-03",
      note: "Sudah lancar perkalian 1-5."
    },
    {
      id: "grade-2",
      studentId: "student-2",
      classId: "class-5",
      subjectId: "subject-ipa",
      title: "Latihan Pernapasan",
      score: 82,
      date: "2026-07-02",
      note: "Paham organ utama, perlu urutan lebih rapi."
    },
    {
      id: "grade-3",
      studentId: "student-4",
      classId: "class-6",
      subjectId: "subject-math",
      title: "Soal Persen",
      score: 76,
      date: "2026-07-04",
      note: "Perlu latihan soal cerita."
    }
  ],
  payments: [
    {
      id: "payment-1",
      studentId: "student-1",
      month: "Juli 2026",
      amount: 450000,
      status: "Sudah bayar",
      method: "Transfer",
      paidAt: "2026-07-02"
    },
    {
      id: "payment-2",
      studentId: "student-2",
      month: "Juli 2026",
      amount: 650000,
      status: "Belum bayar",
      method: "-"
    },
    {
      id: "payment-3",
      studentId: "student-3",
      month: "Juli 2026",
      amount: 300000,
      status: "Belum bayar",
      method: "-"
    },
    {
      id: "payment-4",
      studentId: "student-4",
      month: "Juli 2026",
      amount: 650000,
      status: "Sudah bayar",
      method: "QRIS",
      paidAt: "2026-07-01"
    }
  ],
  reports: [
    {
      id: "report-1",
      studentId: "student-1",
      month: "Juli 2026",
      attendanceSummary: "2 dari 2 pertemuan hadir",
      averageScore: 88,
      completedMaterials: ["Perkalian 1-10", "Menemukan Ide Pokok"],
      strengths: "Alya cepat menangkap pola jika diberi contoh visual.",
      improvements: "Perlu latihan konsisten pada perkalian 6-8.",
      teacherNotes: "Alya mulai lebih percaya diri menjawab di kelas kecil.",
      homeSuggestion: "Latihan flashcard perkalian 10 menit sebelum tidur."
    },
    {
      id: "report-2",
      studentId: "student-4",
      month: "Juli 2026",
      attendanceSummary: "1 dari 1 pertemuan hadir",
      averageScore: 76,
      completedMaterials: ["Pecahan dan Persen"],
      strengths: "Daffa teliti saat menghitung angka langsung.",
      improvements: "Perlu membiasakan menandai informasi penting pada soal cerita.",
      teacherNotes: "Daffa kooperatif dan mulai berani bertanya.",
      homeSuggestion: "Kerjakan 3 soal cerita pendek per hari dan bahas langkahnya."
    }
  ],
  packages: [
    {
      id: "paket-starter",
      name: "Starter",
      price: 300000,
      frequency: "4x per bulan",
      features: ["Kelas kecil", "Latihan dasar", "Catatan guru bulanan"]
    },
    {
      id: "paket-regular",
      name: "Regular",
      price: 450000,
      frequency: "8x per bulan",
      features: ["Kelas kecil", "Modul belajar digital", "Laporan perkembangan", "Latihan mingguan"],
      highlighted: true
    },
    {
      id: "paket-premium",
      name: "Premium",
      price: 650000,
      frequency: "12x per bulan",
      features: ["Prioritas jadwal", "Tryout mini", "Konsultasi orang tua", "Laporan lengkap"]
    }
  ],
  testimonials: [
    {
      id: "testimonial-1",
      name: "Ibu Rina",
      role: "Orang tua Alya, kelas 3",
      quote:
        "Alya jadi lebih berani mengerjakan matematika. Laporannya jelas, jadi kami tahu harus latihan apa di rumah."
    },
    {
      id: "testimonial-2",
      name: "Bapak Dimas",
      role: "Orang tua Bima, kelas 5",
      quote:
        "Kelasnya kecil dan guru sabar. Anak saya merasa diperhatikan, bukan sekadar diberi banyak soal."
    },
    {
      id: "testimonial-3",
      name: "Ibu Sari",
      role: "Orang tua Cika, kelas 1",
      quote:
        "Pendekatannya lembut untuk anak kelas awal. Cika mulai senang membaca suku kata."
    }
  ],
  faqs: [
    {
      question: "Apakah Smart Kids menerima semua kelas SD?",
      answer: "Ya, program tersedia untuk SD kelas 1 sampai kelas 6 dengan pengelompokan sesuai level."
    },
    {
      question: "Apakah guru selalu menggunakan teknologi?",
      answer:
        "Guru menggunakan teknologi sebagai alat bantu saat dibutuhkan, tetapi pendampingan utama tetap dilakukan langsung oleh guru."
    },
    {
      question: "Berapa jumlah murid per kelas?",
      answer: "Kelas dibuat kecil agar guru bisa memantau pemahaman anak dengan lebih dekat."
    },
    {
      question: "Bagaimana orang tua memantau perkembangan?",
      answer:
        "Orang tua dapat melihat jadwal, kehadiran, nilai, catatan guru, pembayaran, dan laporan bulanan dari dashboard."
    }
  ]
};
