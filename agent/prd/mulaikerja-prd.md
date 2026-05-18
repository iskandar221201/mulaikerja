# PRD — MulaiKerja
**Product Requirements Document v1.0**  
Platform job listing niche properti & blue collar Indonesia

---

## 1. Overview

### Visi
Platform lowongan kerja Indonesia yang fokus pada sektor properti, konstruksi, dan blue collar — dengan distribusi multi-channel (web + WhatsApp + sosmed) dan monetisasi berbasis iklan.

### Domain
`mulaikerja.id`

### Tagline (kandidat)
> "Mulai karir barumu hari ini."

---

## 2. Target Market

| Segmen | Deskripsi |
|---|---|
| **Job Seeker** | Pencari kerja blue collar (security, OB, tukang, teknisi) & profesional properti (agen, marketing, arsitek, admin) |
| **Employer** | Developer properti, kontraktor, pengelola gedung, perusahaan security, UMKM |

---

## 3. Business Model

### Fase 1 (MVP)
- **Gratis semua** — posting & apply tanpa biaya
- Monetisasi via **Google AdSense** pada halaman public

### Fase 2 (Growth)
- Featured listing (bayar untuk tampil di atas)
- Paket employer premium
- Direct ads dari perusahaan niche properti/konstruksi

---

## 4. Fitur MVP

### 4.1 Public (Tanpa Login)
- Browse semua lowongan aktif
- Search by keyword
- Filter: kategori, lokasi (provinsi/kota), tipe kerja, pengalaman minimum
- Halaman detail lowongan
- Tombol lamar → redirect ke WhatsApp / buka email client
- **WhatsApp apply menggunakan pre-filled message template** agar pesan pertama job seeker ke employer langsung profesional dan informatif (lihat section 4.4)
- SEO: setiap lowongan punya URL unik, meta tag, structured data (JSON-LD)

### 4.2 Job Seeker (Login)
- Register/login via Google OAuth atau email + password
- Set preferensi: kategori, lokasi, tipe kerja, gaji minimum
- Terima email notifikasi otomatis kalau ada lowongan baru yang match

### 4.3 Employer (Login)
- Register/login via Google OAuth atau email + password
- Lengkapi profil perusahaan (nama, logo, deskripsi, website)
- Post lowongan baru:
  - Judul, kategori, tipe kerja
  - Lokasi (bisa lebih dari satu kota)
  - Gaji min/max (opsional)
  - Pengalaman minimum (tahun)
  - Deadline lowongan
  - Deskripsi pekerjaan
  - Metode lamaran: WhatsApp atau Email
- Edit & tutup lowongan
- Soft delete lowongan

### 4.4 WhatsApp Pre-filled Message Template

Tombol "Lamar via WhatsApp" tidak langsung membuka WA kosong — melainkan membuka WA dengan pesan yang sudah terisi otomatis.

**Format URL:**
```
https://wa.me/{nomor}?text={encoded_template}
```

**Template pesan:**
```
Halo, saya tertarik melamar posisi *{Judul Posisi}* di *{Nama Perusahaan}*.

Saya menemukan lowongan ini melalui MulaiKerja (mulaikerja.id).

Berikut informasi singkat saya:
- Nama: 
- Pendidikan terakhir: 
- Pengalaman: 
- Domisili: 

Mohon informasi lebih lanjut mengenai proses seleksi. Terima kasih. 🙏
```

**Catatan implementasi:**
- `{Judul Posisi}` dan `{Nama Perusahaan}` diisi otomatis dari data lowongan
- Job seeker tinggal melengkapi bagian nama, pendidikan, pengalaman, domisili
- Template di-encode sebagai URL parameter (`encodeURIComponent`)
- Berlaku untuk semua lowongan tanpa terkecuali — tidak ada opsi bypass template

**Contoh kode:**
```javascript
const template = `Halo, saya tertarik melamar posisi *${job.title}* di *${employer.company_name}*.

Saya menemukan lowongan ini melalui MulaiKerja (mulaikerja.id).

Berikut informasi singkat saya:
- Nama: 
- Pendidikan terakhir: 
- Pengalaman: 
- Domisili: 

Mohon informasi lebih lanjut mengenai proses seleksi. Terima kasih. 🙏`;

const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(template)}`;
```

---

## 5. Tech Stack

| Layer | Tech |
|---|---|
| Frontend + API | Next.js 14 (App Router) |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | NextAuth.js (Google + Credentials) |
| Email | Resend |
| Styling | Tailwind CSS |
| Deploy | PM2 + Nginx di VPS |
| CDN / DNS | Cloudflare (free) |
| Cron | node-cron (expire deadline otomatis) |

---

## 6. Database Schema

```sql
-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    role VARCHAR(20) NOT NULL CHECK (role IN ('seeker', 'employer')),
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employer Profiles
CREATE TABLE employer_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    company_logo VARCHAR(500),
    location VARCHAR(255),
    description TEXT,
    website VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Listings
CREATE TABLE job_listings (
    id SERIAL PRIMARY KEY,
    employer_id INTEGER REFERENCES employer_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    job_type VARCHAR(20) NOT NULL CHECK (job_type IN ('fulltime', 'parttime', 'contract', 'freelance')),
    salary_min INTEGER,
    salary_max INTEGER,
    description TEXT NOT NULL,
    min_experience INTEGER DEFAULT 0,
    deadline DATE,
    apply_method VARCHAR(20) NOT NULL CHECK (apply_method IN ('whatsapp', 'email')),
    apply_contact VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'closed', 'expired')),
    deleted_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Locations
CREATE TABLE job_locations (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES job_listings(id) ON DELETE CASCADE,
    province VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL
);

-- Seeker Preferences
CREATE TABLE seeker_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    categories JSONB DEFAULT '[]',
    locations JSONB DEFAULT '[]',
    job_types JSONB DEFAULT '[]',
    min_salary INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notification Log
CREATE TABLE notification_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    job_id INTEGER REFERENCES job_listings(id) ON DELETE CASCADE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_job_listings_category ON job_listings(category);
CREATE INDEX idx_job_listings_status ON job_listings(status);
CREATE INDEX idx_job_listings_deadline ON job_listings(deadline);
CREATE INDEX idx_job_listings_deleted_at ON job_listings(deleted_at);
CREATE INDEX idx_job_locations_city ON job_locations(city);
CREATE INDEX idx_job_locations_province ON job_locations(province);
```

### Cron Job Harian (expire deadline)
```sql
UPDATE job_listings 
SET status = 'expired' 
WHERE deadline < CURRENT_DATE 
AND status = 'active'
AND deleted_at IS NULL;
```

---

## 7. Struktur Folder

```
mulaikerja/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                  # Homepage / browse lowongan
│   │   ├── jobs/
│   │   │   ├── page.tsx              # Listing semua lowongan
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Detail lowongan
│   │   └── layout.tsx
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (seeker)/
│   │   └── dashboard/
│   │       ├── page.tsx              # Dashboard job seeker
│   │       └── preferences/
│   │           └── page.tsx          # Set preferensi
│   ├── (employer)/
│   │   └── dashboard/
│   │       ├── page.tsx              # Dashboard employer
│   │       ├── jobs/
│   │       │   ├── page.tsx          # List lowongan milik employer
│   │       │   ├── new/
│   │       │   │   └── page.tsx      # Form post lowongan baru
│   │       │   └── [id]/
│   │       │       └── edit/
│   │       │           └── page.tsx  # Edit lowongan
│   │       └── profile/
│   │           └── page.tsx          # Profil perusahaan
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts          # NextAuth handler
│       ├── jobs/
│       │   ├── route.ts              # GET list, POST create
│       │   └── [id]/
│       │       └── route.ts          # GET detail, PUT update, DELETE soft
│       ├── employer/
│       │   └── profile/
│       │       └── route.ts
│       ├── seeker/
│       │   └── preferences/
│       │       └── route.ts
│       └── cron/
│           └── expire-jobs/
│               └── route.ts          # Endpoint cron expire deadline
├── components/
│   ├── ui/                           # Reusable UI components
│   ├── jobs/
│   │   ├── JobCard.tsx
│   │   ├── JobList.tsx
│   │   ├── JobFilter.tsx
│   │   └── JobDetail.tsx
│   ├── employer/
│   │   ├── JobForm.tsx
│   │   └── CompanyProfileForm.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── db.ts                         # Prisma client instance
│   ├── auth.ts                       # NextAuth config
│   ├── email.ts                      # Resend email helper
│   ├── matching.ts                   # Logic matching seeker preference vs job
│   └── utils.ts
├── prisma/
│   └── schema.prisma                 # Prisma schema
├── public/
│   └── logo.svg
├── .env
├── .env.example
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 8. Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mulaikerja

# NextAuth
NEXTAUTH_URL=https://mulaikerja.id
NEXTAUTH_SECRET=your_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Resend (email)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@mulaikerja.id

# Cron secret (untuk protect endpoint cron)
CRON_SECRET=your_cron_secret
```

---

## 9. Kategori Lowongan (Seed Data)

```
Properti & Real Estate
Konstruksi & Teknik
Security & Satpam
Kebersihan & OB
Sopir & Kurir
Teknisi (AC, Listrik, Plumbing)
Administrasi & Back Office
Marketing & Sales
Keuangan & Akuntansi
Lainnya
```

---

## 10. Alur Utama

### Alur Job Seeker
```
Landing page → Browse lowongan → Detail lowongan → Klik lamar
                                                    → Redirect WA / Email client
Daftar akun → Set preferensi → Tunggu email notifikasi
```

### Alur Employer
```
Daftar akun → Lengkapi profil perusahaan → Post lowongan
→ Pilih metode lamaran (WA/Email) → Lowongan live
→ Terima lamaran langsung di WA/Email
```

---

## 11. SEO Strategy

- Setiap lowongan: URL unik `/jobs/[id]-[slug]`
- Meta title: `{title} di {company} - {city} | MulaiKerja`
- Structured data JSON-LD: `JobPosting` schema
- Sitemap XML otomatis
- robots.txt
- Open Graph untuk share sosmed

---

## 12. Deployment

```bash
# Di VPS (AAPanel)
# 1. Clone repo
git clone https://github.com/username/mulaikerja.git

# 2. Install dependencies
npm install

# 3. Setup env
cp .env.example .env
# Edit .env dengan credentials

# 4. Run migration
npx prisma migrate deploy

# 5. Build
npm run build

# 6. Start dengan PM2
pm2 start npm --name "mulaikerja" -- start
pm2 save

# Nginx config: proxy ke port 3000
# Cloudflare: proxy ON, SSL Full
```

---

## 13. Roadmap

| Fase | Target | Fitur |
|---|---|---|
| **MVP** | Bulan 1 | Browse, post, apply via WA/Email, auth, email notif |
| **Growth** | Bulan 2-3 | AdSense, sitemap, sosmed auto-post, view counter |
| **Monetisasi** | Bulan 4+ | Featured listing, employer analytics, paket premium |

---

## 14. Auto-Deploy via GitHub Actions

### Setup Secrets di GitHub
Masuk ke repo → Settings → Secrets and variables → Actions, tambahkan:

```
VPS_HOST        # IP VPS kamu
VPS_USER        # ubuntu / root
VPS_SSH_KEY     # Private key SSH (isi dengan cat ~/.ssh/id_rsa)
VPS_PORT        # 22 (default)
```

### Workflow File
Simpan di `.github/workflows/deploy.yml`:

```yaml
name: Deploy MulaiKerja

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy ke VPS via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: ${{ secrets.VPS_PORT }}
          script: |
            cd /www/wwwroot/mulaikerja
            git pull origin main
            npm install --production
            npx prisma migrate deploy
            npm run build
            pm2 restart mulaikerja
```

### Alur Kerja Setelah Setup

```
Edit kode di lokal
  → git push origin main
    → GitHub Actions trigger otomatis
      → SSH ke VPS
        → git pull + install + migrate + build + restart
          → Live dalam ~2-3 menit
```

### Nginx Config di AAPanel

Buat website baru di AAPanel dengan domain `mulaikerja.id`, lalu edit config Nginx:

```nginx
server {
    listen 80;
    server_name mulaikerja.id www.mulaikerja.id;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

SSL di-handle Cloudflare (proxy ON) + Let's Encrypt via AAPanel.

### PM2 Setup Awal (sekali saja via SSH)

```bash
# Masuk ke direktori project
cd /www/wwwroot/mulaikerja

# Install dependencies
npm install

# Run migration
npx prisma migrate deploy

# Build
npm run build

# Start dengan PM2
pm2 start npm --name "mulaikerja" -- start

# Simpan config PM2 agar auto-start saat VPS reboot
pm2 save
pm2 startup
```

---

*Dokumen ini dibuat sebagai referensi development MulaiKerja v1.0*  
*Last updated: Mei 2026*
