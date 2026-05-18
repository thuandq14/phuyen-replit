import { Router } from "express";
import { db, contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router = Router();

router.post("/", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }

  const data = parsed.data;
  const [contact] = await db
    .insert(contactsTable)
    .values({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email ?? null,
      projectInterest: data.projectInterest,
      message: data.message ?? null,
    })
    .returning();

  req.log.info({ contactId: contact.id }, "New contact inquiry submitted");
  res.status(201).json({ id: contact.id, message: "Yêu cầu của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ trong 24h!" });
});

router.get("/inquiries", async (req, res) => {
  const inquiries = await db
    .select()
    .from(contactsTable)
    .orderBy(desc(contactsTable.createdAt));

  res.json(
    inquiries.map((c) => ({
      id: c.id,
      fullName: c.fullName,
      phone: c.phone,
      email: c.email ?? null,
      projectInterest: c.projectInterest,
      message: c.message ?? null,
      createdAt: c.createdAt.toISOString(),
    }))
  );
});

export default router;
