# Smart Kids Learning Center

MVP website dan sistem manajemen bimbel SD modern berbasis teknologi. Project ini dibuat dengan Next.js, TypeScript, Tailwind CSS, mock/local storage fallback, dan struktur Supabase-ready.

## Fitur

- Landing page promosi untuk bimbel SD kelas 1-6
- Form pendaftaran murid
- Dashboard admin: murid, kelas, jadwal, guru, pembayaran, absensi, nilai, laporan, materi digital
- Dashboard guru: jadwal, daftar murid, absensi, nilai, catatan perkembangan, materi, materi digital
- Dashboard orang tua: jadwal anak, kehadiran, nilai, catatan guru, pembayaran, laporan
- Dashboard owner: pendapatan, piutang, kapasitas kelas, ringkasan guru
- Modul materi dengan struktur mapel, kelas, bab, tujuan, ringkasan, contoh soal, latihan, PR, catatan guru
- Generator Materi Digital dummy/mock, siap dikembangkan sesuai kebutuhan operasional bimbel
- Schema dan seed SQL untuk Supabase

## Cara Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Command tambahan:

```bash
npm run dev:network
npm run typecheck
npm run build
```

Untuk membuka dari HP atau laptop lain di jaringan Wi-Fi yang sama, jalankan:

```bash
npm run dev:network
```

Lalu buka `http://IP-LAPTOP:3000`, contoh `http://192.168.1.147:3000`. Jika tidak terbuka, pastikan perangkat berada di Wi-Fi yang sama dan izinkan Node.js di Windows Firewall.

Untuk membagikan demo tanpa warning koneksi aman di HP, jalankan server lokal lalu buat HTTPS tunnel:

```bash
npm run dev
npm run share:https
```

Command `share:https` akan menampilkan URL seperti `https://nama-acak.trycloudflare.com`. Link ini sementara dan akan berubah setiap tunnel dijalankan ulang.

## Environment

Salin `.env.example` menjadi `.env.local`.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Jika Supabase belum dikonfigurasi, aplikasi tetap berjalan memakai mock data dan local storage browser.

## Demo Role

Masuk ke `/login`, lalu pilih:

- Admin: `/dashboard/admin`
- Guru: `/dashboard/guru`
- Orang tua: `/dashboard/orang-tua`
- Owner: `/dashboard/owner`

Belum ada password pada MVP ini. Struktur role sudah dipisah agar bisa disambungkan ke Supabase Auth.

## Data Mock

Mock data utama ada di:

- `src/lib/mock-data.ts`
- `src/lib/local-store.ts`

Form pendaftaran menambah murid baru, parent baru, dan tagihan bulan berjalan ke local storage.

## Supabase

File database:

- `supabase/schema.sql`
- `supabase/seed.sql`

Urutan awal:

1. Buat project Supabase.
2. Jalankan isi `supabase/schema.sql` di SQL Editor.
3. Jalankan isi `supabase/seed.sql`.
4. Isi `.env.local`.
5. Ganti pemakaian `useLearningCenterStore` dengan query Supabase bertahap.

## Generator Materi Digital

Dummy generator ada di:

- `src/lib/material-generator.ts`
- `src/app/api/material/route.ts`
- `src/components/dashboard/MaterialGenerator.tsx`

Output sudah dibentuk sebagai:

- Ringkasan materi
- Contoh soal
- Latihan
- PR
- Pembahasan
- Catatan untuk orang tua

Saat ingin mengembangkan generator materi, ganti blok mock di route API dengan layanan yang dipilih dan tetap kembalikan struktur `MaterialGeneratorOutput` agar UI tidak perlu berubah.

## Struktur Project

```text
src/
  app/
    dashboard/
    login/
    materi/
    api/material/
  components/
    dashboard/
    landing/
  lib/
    material-generator.ts
    auth.ts
    local-store.ts
    mock-data.ts
    supabase.ts
    types.ts
supabase/
  schema.sql
  seed.sql
public/images/
  hero-learning-center.png
```

## Catatan Pengembangan

- Tambahkan Supabase Auth untuk role `admin`, `guru`, `orang_tua`, `owner`.
- Buat row-level security policy per role.
- Ganti local storage dengan repository/service layer Supabase.
- Tambahkan upload bukti pembayaran ke Supabase Storage.
- Buat export PDF laporan bulanan.
- Sambungkan generator materi digital ke layanan yang dipilih dengan validasi JSON schema.
