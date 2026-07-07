export type Role = "admin" | "guru" | "orang_tua" | "owner";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  linkedId?: string;
};

export type Parent = {
  id: string;
  name: string;
  whatsapp: string;
  address: string;
};

export type Teacher = {
  id: string;
  name: string;
  whatsapp: string;
  specialties: string[];
  bio: string;
};

export type Student = {
  id: string;
  name: string;
  grade: number;
  age: number;
  parentId: string;
  parentName: string;
  whatsapp: string;
  address: string;
  packageId: string;
  desiredSchedule: string;
  notes: string;
  status: "baru" | "aktif" | "cuti";
  createdAt: string;
};

export type LearningClass = {
  id: string;
  name: string;
  grade: number;
  teacherId: string;
  room: string;
  scheduleIds: string[];
  studentIds: string[];
  materialIds: string[];
};

export type Schedule = {
  id: string;
  classId: string;
  day: string;
  startTime: string;
  endTime: string;
  mode: "offline" | "online";
};

export type Subject = {
  id: string;
  name: string;
  color: string;
};

export type Material = {
  id: string;
  subjectId: string;
  classGrade: number;
  chapter: string;
  learningGoals: string[];
  summary: string;
  examples: string[];
  exercises: string[];
  homework: string[];
  teacherNotes: string;
};

export type Attendance = {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: "hadir" | "izin" | "sakit" | "alpa";
};

export type Grade = {
  id: string;
  studentId: string;
  classId: string;
  subjectId: string;
  title: string;
  score: number;
  date: string;
  note: string;
};

export type Payment = {
  id: string;
  studentId: string;
  month: string;
  amount: number;
  status: "Belum bayar" | "Sudah bayar";
  method: "Tunai" | "Transfer" | "QRIS" | "-";
  paidAt?: string;
  proofUrl?: string;
};

export type Report = {
  id: string;
  studentId: string;
  month: string;
  attendanceSummary: string;
  averageScore: number;
  completedMaterials: string[];
  strengths: string;
  improvements: string;
  teacherNotes: string;
  homeSuggestion: string;
};

export type PricingPackage = {
  id: string;
  name: string;
  price: number;
  frequency: string;
  features: string[];
  highlighted?: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type AppData = {
  users: User[];
  students: Student[];
  parents: Parent[];
  teachers: Teacher[];
  classes: LearningClass[];
  schedules: Schedule[];
  subjects: Subject[];
  materials: Material[];
  attendance: Attendance[];
  grades: Grade[];
  payments: Payment[];
  reports: Report[];
  packages: PricingPackage[];
  testimonials: Testimonial[];
  faqs: FAQ[];
};

export type RegistrationInput = {
  childName: string;
  grade: number;
  age: number;
  parentName: string;
  whatsapp: string;
  address: string;
  packageId: string;
  desiredSchedule: string;
  notes: string;
};

export type StudentFormInput = Omit<Student, "id" | "createdAt"> & {
  id?: string;
};
