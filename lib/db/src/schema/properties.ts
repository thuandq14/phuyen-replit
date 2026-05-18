import { pgTable, text, serial, boolean, real, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const propertiesTable = pgTable("properties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  price: real("price").notNull(),
  priceUnit: text("price_unit").notNull(),
  type: text("type").notNull(), // apartment | villa | townhouse | beachfront
  category: text("category").notNull(), // premium | mid-range
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  area: real("area"),
  imageUrl: text("image_url").notNull(),
  images: text("images").array().notNull().default([]),
  description: text("description"),
  amenities: text("amenities").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  hasBalcony: boolean("has_balcony").notNull().default(false),
  hasSeaView: boolean("has_sea_view").notNull().default(false),
  status: text("status").notNull().default("available"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPropertySchema = createInsertSchema(propertiesTable).omit({ id: true, createdAt: true });
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof propertiesTable.$inferSelect;
