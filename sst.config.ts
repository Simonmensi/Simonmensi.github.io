/// <reference path="./.sst/platform/config.d.ts" />

/**
 * SST Ion configuration for deploying the Next.js SSR app to AWS.
 *
 * Infrastructure provisioned automatically:
 * - Lambda functions (server-rendered pages + Server Actions)
 * - CloudFront CDN (static assets + dynamic origin)
 * - S3 bucket (static assets)
 *
 * The PostgreSQL database is external (e.g. Neon, Supabase, or RDS).
 * Connection credentials are passed via SST secrets:
 *
 *   npx sst secret set DATABASE_URL "postgresql://..."
 *   npx sst secret set ADMIN_USER "admin"
 *   npx sst secret set ADMIN_PASS "your-password"
 *
 * Deploy:
 *   npx sst deploy --stage prod
 *
 * Remove:
 *   npx sst remove --stage prod
 */
export default $config({
  app(input) {
    return {
      name: "simonmensi-portfolio",
      removal: input?.stage === "prod" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "ap-southeast-1",
        },
      },
    };
  },

  async run() {
    // ── Secrets ──────────────────────────────────────────────
    // Set once per stage:  npx sst secret set DATABASE_URL "postgresql://..."
    const databaseUrl = new sst.Secret("DATABASE_URL");
    const adminUser = new sst.Secret("ADMIN_USER");
    const adminPass = new sst.Secret("ADMIN_PASS");

    // ── Next.js Site ────────────────────────────────────────
    const site = new sst.aws.Nextjs("Site", {
      link: [databaseUrl, adminUser, adminPass],
      environment: {
        DATABASE_URL: databaseUrl.value,
        ADMIN_USER: adminUser.value,
        ADMIN_PASS: adminPass.value,
      },
    });

    return {
      url: site.url,
    };
  },
});
