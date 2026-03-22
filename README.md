# Simon Lei — Portfolio

Personal portfolio built with Next.js 16 (App Router), TypeScript, Tailwind CSS,
and PostgreSQL. Server Actions handle lead capture; SST deploys the app to AWS
Lambda + CloudFront.

## Prerequisites

- Node.js 20+
- PostgreSQL 15+ (local or remote)

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Generate the Prisma client
npx prisma generate

# 3. Create your .env file
cp .env.example .env
# Then edit .env with your local PostgreSQL credentials
```

### Environment Variables

Create a `.env` file in the project root with the following keys:

| Key | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://simon_user:simon_pass@localhost:5432/simon_db?schema=public` |
| `ADMIN_USER` | Username for the `/admin/*` routes | `admin` |
| `ADMIN_PASS` | Password for the `/admin/*` routes | `changeme` |

### Database Migration

```bash
# Apply the Prisma schema to your local database
npx prisma migrate dev --name init
```

> Your PostgreSQL user needs `CREATEDB` permission (Prisma uses a shadow database
> during migration). Grant it with:
> `ALTER USER your_user CREATEDB;`

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin Dashboard

The `/admin/leads` endpoint returns all captured leads as JSON, protected by
HTTP Basic Auth.

```bash
# Without credentials → 401 Unauthorized
curl http://localhost:3000/admin/leads/

# With credentials → 200 + JSON array
curl -u admin:changeme http://localhost:3000/admin/leads/
```

Credentials are set via `ADMIN_USER` and `ADMIN_PASS` in `.env`.

## Testing

```bash
npm run test           # Run all tests once
npm run test:watch     # Watch mode
npm run test:coverage  # With coverage report
npm run lint           # ESLint
```

## Project Structure

```
app/
  contact/
    _actions.ts        # Server Action — saves lead to PostgreSQL
    page.tsx           # Contact / lead capture page
  admin/
    leads/route.ts     # GET endpoint — returns all leads (auth required)
components/
  contact/
    VCardForm.tsx      # Lead capture form (calls Server Action)
    QrPanel.tsx        # QR code display panel
    ThankYouMessage.tsx
lib/
  db.ts                # Singleton PrismaClient (Lambda-safe)
  generate-vcard.ts    # vCard builder + browser download
  vcard-data.ts        # Simon's contact data
prisma/
  schema.prisma        # Lead model
middleware.ts          # Basic Auth guard for /admin/*
sst.config.ts          # AWS deployment config (SST Ion)
```

## Deployment (AWS via SST)

The app deploys to AWS Lambda + CloudFront using [SST Ion](https://sst.dev).

```bash
# Set secrets (one-time per stage)
npx sst secret set DATABASE_URL "postgresql://..."
npx sst secret set ADMIN_USER "admin"
npx sst secret set ADMIN_PASS "your-secure-password"

# Deploy
npx sst deploy --stage prod

# Remove all resources
npx sst remove --stage prod
```

SST provisions Lambda functions, a CloudFront distribution, and an S3 bucket
automatically. The PostgreSQL database is external (Neon, Supabase, or AWS RDS).
