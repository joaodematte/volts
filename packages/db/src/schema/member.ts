import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';
import { organization } from './organization';
import { user } from './user';

export const member = pgTable('member', {
  id: text('id')
    .primaryKey()
    .$default(() => uuidv7()),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: text('role').default('member').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
