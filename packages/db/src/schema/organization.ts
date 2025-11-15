import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';

export const organization = pgTable('organization', {
  id: text('id')
    .primaryKey()
    .$default(() => uuidv7()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logo: text('logo'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  metadata: text('metadata'),
});
