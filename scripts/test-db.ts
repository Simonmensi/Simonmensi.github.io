import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client.js";

async function main() {
  const adapter = new PrismaPg({
    connectionString:
      "postgresql://simon_user:simon_pass@localhost:5432/simon_db?schema=public",
  });
  const db = new PrismaClient({ adapter });

  const lead = await db.lead.create({
    data: { name: "CLI Test", phone: "+65 0000" },
  });
  console.log("INSERTED:", JSON.stringify(lead));

  const all = await db.lead.findMany();
  console.log("ALL LEADS:", JSON.stringify(all, null, 2));

  await db.$disconnect();
}

main().catch((e) => {
  console.error("ERROR:", e);
  process.exit(1);
});
