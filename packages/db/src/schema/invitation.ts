import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';
import { organization } from './organization';
import { user } from './user';

export const invitation = pgTable('invitation', {
  id: text('id')
    .primaryKey()
    .$default(() => uuidv7()),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  role: text('role'),
  status: text('status').default('pending').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  inviterId: text('inviter_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});
