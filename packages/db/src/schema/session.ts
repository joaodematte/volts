import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';
import { user } from './user';

export const session = pgTable('session', {
  id: text('id')
    .primaryKey()
    .$default(() => uuidv7()),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});
