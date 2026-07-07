insert into subjects (id, name, color) values
  ('11111111-1111-1111-1111-111111111111', 'Matematika', '#2084e8'),
  ('22222222-2222-2222-2222-222222222222', 'Bahasa Indonesia', '#f59f00'),
  ('33333333-3333-3333-3333-333333333333', 'IPA', '#2f9e44'),
  ('44444444-4444-4444-4444-444444444444', 'Bahasa Inggris', '#9c36b5')
on conflict (id) do nothing;

insert into parents (id, name, whatsapp, address) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Ibu Rina', '628121110001', 'Jl. Melati No. 7'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Bapak Dimas', '628131110002', 'Jl. Cendana No. 11')
on conflict (id) do nothing;

insert into teachers (id, name, whatsapp, specialties, bio) values
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Bu Naya', '628151110004', array['Matematika', 'Bahasa Indonesia'], 'Guru sabar untuk kelas kecil.'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Pak Arif', '628161110005', array['IPA', 'Matematika'], 'Guru dengan pendekatan visual dan eksperimen.')
on conflict (id) do nothing;

insert into students (
  id,
  name,
  grade,
  age,
  parent_id,
  parent_name,
  whatsapp,
  address,
  package_id,
  desired_schedule,
  notes,
  status
) values
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Alya Putri', 3, 9, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Ibu Rina', '628121110001', 'Jl. Melati No. 7', 'paket-regular', 'Senin & Rabu sore', 'Perlu penguatan perkalian.', 'aktif'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Bima Pratama', 5, 11, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Bapak Dimas', '628131110002', 'Jl. Cendana No. 11', 'paket-premium', 'Selasa & Kamis sore', 'Suka eksperimen IPA.', 'aktif')
on conflict (id) do nothing;

insert into classes (id, name, grade, teacher_id, room) values
  ('99999999-9999-9999-9999-999999999991', 'SD Kelas 3', 3, 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Ruang Biru'),
  ('99999999-9999-9999-9999-999999999992', 'SD Kelas 5', 5, 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Ruang Inovasi')
on conflict (id) do nothing;

insert into class_students (class_id, student_id) values
  ('99999999-9999-9999-9999-999999999991', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'),
  ('99999999-9999-9999-9999-999999999992', 'ffffffff-ffff-ffff-ffff-ffffffffffff')
on conflict do nothing;

insert into schedules (class_id, day, start_time, end_time, mode) values
  ('99999999-9999-9999-9999-999999999991', 'Senin & Rabu', '16:00', '17:30', 'offline'),
  ('99999999-9999-9999-9999-999999999992', 'Selasa & Kamis', '16:00', '17:30', 'offline');

insert into materials (
  subject_id,
  class_grade,
  chapter,
  learning_goals,
  summary,
  examples,
  exercises,
  homework,
  teacher_notes
) values
  ('11111111-1111-1111-1111-111111111111', 3, 'Perkalian 1-10', array['Memahami perkalian sebagai penjumlahan berulang', 'Menghafal fakta dasar'], 'Perkalian dipahami lewat kelompok benda yang jumlahnya sama.', array['3 x 4 = 4 + 4 + 4'], array['Hitung 6 x 7'], array['Latihan tabel perkalian 6-8'], 'Gunakan gambar kelompok benda.'),
  ('33333333-3333-3333-3333-333333333333', 5, 'Sistem Pernapasan', array['Mengenal organ pernapasan', 'Menjelaskan fungsi paru-paru'], 'Materi membahas jalur udara dari hidung ke paru-paru.', array['Udara masuk melalui hidung'], array['Urutkan organ pernapasan'], array['Buat poster kesehatan pernapasan'], 'Gunakan model balon.');

insert into payments (student_id, month, amount, status, method, paid_at) values
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Juli 2026', 450000, 'Sudah bayar', 'Transfer', '2026-07-02'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Juli 2026', 650000, 'Belum bayar', '-', null);
