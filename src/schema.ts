import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const bookings = sqliteTable('bookings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  adults: integer('adults').notNull(),
  children: integer('children').notNull(),
  createdAt: text('created_at').notNull().default("(datetime('now'))"),
});
