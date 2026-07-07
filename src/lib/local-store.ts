"use client";

import { useEffect, useMemo, useState } from "react";
import { initialData } from "./mock-data";
import type {
  AppData,
  Attendance,
  Grade,
  Payment,
  RegistrationInput,
  Report,
  Student,
  StudentFormInput
} from "./types";

const STORAGE_KEY = "smart-kids-learning-center-data-v1";

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function monthLabel() {
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric"
  }).format(new Date());
}

function mergeWithInitial(value: AppData): AppData {
  return {
    ...initialData,
    ...value,
    packages: value.packages?.length ? value.packages : initialData.packages,
    testimonials: value.testimonials?.length ? value.testimonials : initialData.testimonials,
    faqs: value.faqs?.length ? value.faqs : initialData.faqs
  };
}

export function useLearningCenterStore() {
  const [data, setData] = useState<AppData>(initialData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setData(mergeWithInitial(JSON.parse(saved) as AppData));
      } catch {
        setData(initialData);
      }
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, ready]);

  const stats = useMemo(() => {
    const paid = data.payments
      .filter((payment) => payment.status === "Sudah bayar")
      .reduce((total, payment) => total + payment.amount, 0);
    const unpaid = data.payments
      .filter((payment) => payment.status === "Belum bayar")
      .reduce((total, payment) => total + payment.amount, 0);
    const averageScore =
      data.grades.length === 0
        ? 0
        : Math.round(data.grades.reduce((total, grade) => total + grade.score, 0) / data.grades.length);
    const attendanceRate =
      data.attendance.length === 0
        ? 0
        : Math.round(
            (data.attendance.filter((item) => item.status === "hadir").length / data.attendance.length) *
              100
          );

    return {
      paid,
      unpaid,
      activeStudents: data.students.filter((student) => student.status === "aktif").length,
      averageScore,
      attendanceRate
    };
  }, [data]);

  function addRegistration(input: RegistrationInput) {
    let created: Student | null = null;

    setData((current) => {
      const parentId = uid("parent");
      const studentId = uid("student");
      const packageInfo = current.packages.find((item) => item.id === input.packageId);
      const gradeClass = current.classes.find((item) => item.grade === input.grade);

      const newStudent: Student = {
        id: studentId,
        name: input.childName,
        grade: input.grade,
        age: input.age,
        parentId,
        parentName: input.parentName,
        whatsapp: input.whatsapp,
        address: input.address,
        packageId: input.packageId,
        desiredSchedule: input.desiredSchedule,
        notes: input.notes,
        status: "baru",
        createdAt: today()
      };
      created = newStudent;

      const nextPayment: Payment = {
        id: uid("payment"),
        studentId,
        month: monthLabel(),
        amount: packageInfo?.price ?? 0,
        status: "Belum bayar",
        method: "-"
      };

      return {
        ...current,
        parents: [
          ...current.parents,
          {
            id: parentId,
            name: input.parentName,
            whatsapp: input.whatsapp,
            address: input.address
          }
        ],
        students: [...current.students, newStudent],
        classes: current.classes.map((item) =>
          item.id === gradeClass?.id ? { ...item, studentIds: [...item.studentIds, studentId] } : item
        ),
        payments: [...current.payments, nextPayment]
      };
    });

    return created;
  }

  function saveStudent(input: StudentFormInput) {
    setData((current) => {
      if (input.id) {
        const updatedStudent: Student = {
          ...(current.students.find((student) => student.id === input.id) as Student),
          ...input,
          id: input.id
        };

        return {
          ...current,
          students: current.students.map((student) =>
            student.id === input.id ? updatedStudent : student
          )
        };
      }

      const studentId = uid("student");
      const gradeClass = current.classes.find((item) => item.grade === input.grade);
      const newStudent: Student = {
        ...input,
        id: studentId,
        createdAt: today()
      };

      return {
        ...current,
        students: [...current.students, newStudent],
        classes: current.classes.map((item) =>
          item.id === gradeClass?.id ? { ...item, studentIds: [...item.studentIds, studentId] } : item
        )
      };
    });
  }

  function deleteStudent(studentId: string) {
    setData((current) => ({
      ...current,
      students: current.students.filter((student) => student.id !== studentId),
      classes: current.classes.map((item) => ({
        ...item,
        studentIds: item.studentIds.filter((id) => id !== studentId)
      })),
      attendance: current.attendance.filter((item) => item.studentId !== studentId),
      grades: current.grades.filter((item) => item.studentId !== studentId),
      payments: current.payments.filter((item) => item.studentId !== studentId),
      reports: current.reports.filter((item) => item.studentId !== studentId)
    }));
  }

  function updatePayment(paymentId: string, status: Payment["status"], method: Payment["method"]) {
    setData((current) => ({
      ...current,
      payments: current.payments.map((payment) =>
        payment.id === paymentId
          ? {
              ...payment,
              status,
              method,
              paidAt: status === "Sudah bayar" ? today() : undefined
            }
          : payment
      )
    }));
  }

  function setAttendance(studentId: string, classId: string, status: Attendance["status"]) {
    const date = today();

    setData((current) => {
      const existing = current.attendance.find(
        (item) => item.studentId === studentId && item.classId === classId && item.date === date
      );

      if (existing) {
        return {
          ...current,
          attendance: current.attendance.map((item) =>
            item.id === existing.id ? { ...item, status } : item
          )
        };
      }

      return {
        ...current,
        attendance: [
          ...current.attendance,
          {
            id: uid("attendance"),
            studentId,
            classId,
            date,
            status
          }
        ]
      };
    });
  }

  function addGrade(input: Omit<Grade, "id" | "date">) {
    setData((current) => ({
      ...current,
      grades: [
        ...current.grades,
        {
          ...input,
          id: uid("grade"),
          date: today()
        }
      ]
    }));
  }

  function saveTeacherNote(studentId: string, teacherNotes: string) {
    setData((current) => {
      const existing = current.reports.find((report) => report.studentId === studentId);
      const studentGrades = current.grades.filter((grade) => grade.studentId === studentId);
      const averageScore =
        studentGrades.length === 0
          ? 0
          : Math.round(
              studentGrades.reduce((total, grade) => total + grade.score, 0) / studentGrades.length
            );
      const studentAttendance = current.attendance.filter((item) => item.studentId === studentId);
      const present = studentAttendance.filter((item) => item.status === "hadir").length;
      const completedMaterials = current.materials
        .filter((material) => material.classGrade === current.students.find((student) => student.id === studentId)?.grade)
        .slice(0, 2)
        .map((material) => material.chapter);

      if (existing) {
        return {
          ...current,
          reports: current.reports.map((report) =>
            report.id === existing.id ? { ...report, teacherNotes } : report
          )
        };
      }

      const nextReport: Report = {
        id: uid("report"),
        studentId,
        month: monthLabel(),
        attendanceSummary: `${present} dari ${studentAttendance.length} pertemuan hadir`,
        averageScore,
        completedMaterials,
        strengths: "Mulai menunjukkan perkembangan positif di kelas.",
        improvements: "Perlu latihan konsisten sesuai arahan guru.",
        teacherNotes,
        homeSuggestion: "Latihan singkat 15 menit setiap hari dengan pendampingan orang tua."
      };

      return {
        ...current,
        reports: [...current.reports, nextReport]
      };
    });
  }

  function resetMockData() {
    setData(initialData);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return {
    data,
    ready,
    stats,
    addRegistration,
    saveStudent,
    deleteStudent,
    updatePayment,
    setAttendance,
    addGrade,
    saveTeacherNote,
    resetMockData
  };
}
