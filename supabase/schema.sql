create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  role text not null check (role in ('admin', 'guru', 'orang_tua', 'owner')),
  linked_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists parents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  whatsapp text not null,
  address text not null,
  created_at timestamptz not null default now()
);

create table if not exists teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  whatsapp text not null,
  specialties text[] not null default '{}',
  bio text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  grade int not null check (grade between 1 and 6),
  age int not null check (age between 6 and 13),
  parent_id uuid references parents(id) on delete set null,
  parent_name text not null,
  whatsapp text not null,
  address text not null,
  package_id text not null,
  desired_schedule text not null,
  notes text not null default '',
  status text not null default 'baru' check (status in ('baru', 'aktif', 'cuti')),
  created_at timestamptz not null default now()
);

create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  grade int not null check (grade between 1 and 6),
  teacher_id uuid references teachers(id) on delete set null,
  room text not null,
  created_at timestamptz not null default now()
);

create table if not exists class_students (
  class_id uuid references classes(id) on delete cascade,
  student_id uuid references students(id) on delete cascade,
  primary key (class_id, student_id)
);

create table if not exists schedules (
  id uuid primary key default gen_random_uuid(),
  class_id uuid references classes(id) on delete cascade,
  day text not null,
  start_time time not null,
  end_time time not null,
  mode text not null check (mode in ('offline', 'online')),
  created_at timestamptz not null default now()
);

create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text not null default '#2084e8'
);

create table if not exists materials (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid references subjects(id) on delete set null,
  class_grade int not null check (class_grade between 1 and 6),
  chapter text not null,
  learning_goals text[] not null default '{}',
  summary text not null,
  examples text[] not null default '{}',
  exercises text[] not null default '{}',
  homework text[] not null default '{}',
  teacher_notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists class_materials (
  class_id uuid references classes(id) on delete cascade,
  material_id uuid references materials(id) on delete cascade,
  primary key (class_id, material_id)
);

create table if not exists attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  class_id uuid references classes(id) on delete cascade,
  date date not null,
  status text not null check (status in ('hadir', 'izin', 'sakit', 'alpa')),
  created_at timestamptz not null default now()
);

create table if not exists grades (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  class_id uuid references classes(id) on delete cascade,
  subject_id uuid references subjects(id) on delete set null,
  title text not null,
  score numeric not null check (score between 0 and 100),
  date date not null,
  note text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  month text not null,
  amount numeric not null,
  status text not null check (status in ('Belum bayar', 'Sudah bayar')),
  method text not null check (method in ('Tunai', 'Transfer', 'QRIS', '-')),
  paid_at date,
  proof_url text,
  created_at timestamptz not null default now()
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  month text not null,
  attendance_summary text not null,
  average_score numeric not null default 0,
  completed_materials text[] not null default '{}',
  strengths text not null default '',
  improvements text not null default '',
  teacher_notes text not null default '',
  home_suggestion text not null default '',
  created_at timestamptz not null default now()
);

alter table users enable row level security;
alter table parents enable row level security;
alter table teachers enable row level security;
alter table students enable row level security;
alter table classes enable row level security;
alter table class_students enable row level security;
alter table schedules enable row level security;
alter table subjects enable row level security;
alter table materials enable row level security;
alter table class_materials enable row level security;
alter table attendance enable row level security;
alter table grades enable row level security;
alter table payments enable row level security;
alter table reports enable row level security;
