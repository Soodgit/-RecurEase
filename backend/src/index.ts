import express, { Request, Response } from "express";
import cors from "cors";
import knexLib from "knex";

// Use require for knexfile.cjs (if using "type": "module" or .cjs config)
const knexConfig = require("../knexfile.cjs");
const knex = knexLib(knexConfig.development);

const app = express();
app.use(cors());
app.use(express.json());

// ----------- SLOTS CRUD ENDPOINTS ----------- //

// Get all slots (No week filter for now, can add later)
app.get("/api/slots", async (_req: Request, res: Response) => {
  try {
    const slots = await knex("slots").select("*");
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: "Error fetching slots", details: err });
  }
});

// Create a new slot
app.post("/api/slots", async (req: Request, res: Response) => {
  const { title, day_of_week, start_time, end_time } = req.body;
  if (!title || day_of_week == null || !start_time || !end_time) {
    return res.status(400).json({ error: "Missing field(s)" });
  }
  // Optional: Check conflict or limit here!
  try {
    const slot = await knex("slots")
      .insert({ title, day_of_week, start_time, end_time })
      .returning("*");
    res.status(201).json(slot[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create slot", details: err });
  }
});

// Update a slot
app.put("/api/slots/:id", async (req: Request, res: Response) => {
  const { title, day_of_week, start_time, end_time } = req.body;
  const { id } = req.params;
  try {
    const updated = await knex("slots")
      .where({ id })
      .update({ title, day_of_week, start_time, end_time })
      .returning("*");
    if (!updated.length) return res.status(404).json({ error: "Slot not found" });
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update slot", details: err });
  }
});

// Delete a slot
app.delete("/api/slots/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await knex("slots").where({ id }).del();
    if (!deleted) return res.status(404).json({ error: "Slot not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete slot", details: err });
  }
});

// -------- SLOT EXCEPTIONS ENDPOINTS -------- //

// Create exception
app.post("/api/slots/:id/exception", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { exception_date, action, new_title, new_start_time, new_end_time } = req.body;
  if (!exception_date || !action) {
    return res.status(400).json({ error: "Missing exception fields" });
  }
  try {
    const exception = await knex("slot_exceptions")
      .insert({
        slot_id: id,
        exception_date,
        action,
        new_title,
        new_start_time,
        new_end_time,
      })
      .returning("*");
    res.status(201).json(exception[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create exception", details: err });
  }
});

// Update exception
app.put("/api/slots/:id/exception/:eid", async (req: Request, res: Response) => {
  const { eid } = req.params;
  const { action, new_title, new_start_time, new_end_time } = req.body;
  try {
    const updated = await knex("slot_exceptions")
      .where({ id: eid })
      .update({ action, new_title, new_start_time, new_end_time })
      .returning("*");
    if (!updated.length) return res.status(404).json({ error: "Exception not found" });
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update exception", details: err });
  }
});

// Delete exception
app.delete("/api/slots/:id/exception/:eid", async (req: Request, res: Response) => {
  const { eid } = req.params;
  try {
    const deleted = await knex("slot_exceptions").where({ id: eid }).del();
    if (!deleted) return res.status(404).json({ error: "Exception not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete exception", details: err });
  }
});

// ---- Optional: Health endpoint (check working) ---- //
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ success: true, message: "RecurEase backend running!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
