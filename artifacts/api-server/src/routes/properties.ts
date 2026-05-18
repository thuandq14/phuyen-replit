import { Router } from "express";
import { db, propertiesTable } from "@workspace/db";
import { GetPropertyParams } from "@workspace/api-zod";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  const properties = await db
    .select()
    .from(propertiesTable)
    .orderBy(desc(propertiesTable.featured), desc(propertiesTable.createdAt));

  res.json(
    properties.map((p) => ({
      ...p,
      images: p.images ?? [],
      amenities: p.amenities ?? [],
    }))
  );
});

router.get("/featured", async (_req, res) => {
  const properties = await db
    .select()
    .from(propertiesTable)
    .where(eq(propertiesTable.featured, true))
    .orderBy(desc(propertiesTable.createdAt));

  res.json(
    properties.map((p) => ({
      ...p,
      images: p.images ?? [],
      amenities: p.amenities ?? [],
    }))
  );
});

router.get("/:id", async (req, res) => {
  const parsed = GetPropertyParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [property] = await db
    .select()
    .from(propertiesTable)
    .where(eq(propertiesTable.id, parsed.data.id));

  if (!property) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  res.json({
    ...property,
    images: property.images ?? [],
    amenities: property.amenities ?? [],
  });
});

export default router;
