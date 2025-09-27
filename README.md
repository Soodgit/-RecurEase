# RecurEase
Scheduler App for Recurring Weekly Slots
Tech Stack: React, TypeScript, TailwindCSS, Node.js, PostgreSQL, Knex

# RecurEase API Endpoints

## Slots (Recurring Weekly)
- `GET    /api/slots?week=YYYY-MM-DD` – Get all slots for a week
- `POST   /api/slots`                 – Create new recurring slot
- `PUT    /api/slots/:id`             – Edit all recurring instances
- `DELETE /api/slots/:id`             – Delete all recurring instances

## Slot Exceptions (Single-date change)
- `POST   /api/slots/:id/exception`            – Exception for a specific date
- `PUT    /api/slots/:id/exception/:eid`       – Edit exception
- `DELETE /api/slots/:id/exception/:eid`       – Delete exception

## Example:
- Slot: "Monday 9-11 AM Team Meeting" → Every Monday by default
- Exception: "2025-10-06 Monday Team Meeting CANCELLED" → Only for 6 Oct

## DB Tables: slots, slot_exceptions
