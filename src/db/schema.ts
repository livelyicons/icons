import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  real,
  boolean,
  timestamp,
  jsonb,
  index,
  primaryKey,
} from 'drizzle-orm/pg-core';

// ─────────────────────────────────────────────────
// Subscriptions
// ─────────────────────────────────────────────────

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull().unique(),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }).notNull(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  planType: varchar('plan_type', { length: 50 })
    .notNull()
    .$type<'free' | 'pro' | 'team' | 'enterprise'>(),
  status: varchar('status', { length: 50 })
    .notNull()
    .$type<'active' | 'canceled' | 'past_due'>(),
  tokensBalance: integer('tokens_balance').notNull().default(0),
  topUpTokens: integer('top_up_tokens').notNull().default(0),
  tokensRefreshDate: timestamp('tokens_refresh_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─────────────────────────────────────────────────
// Generated Icons
// ─────────────────────────────────────────────────

export const generatedIcons = pgTable(
  'generated_icons',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    prompt: text('prompt').notNull(),
    style: varchar('style', { length: 50 })
      .notNull()
      .$type<'line' | 'solid' | 'outline' | 'duotone' | 'pixel' | 'isometric' | 'hand-drawn'>(),
    animation: varchar('animation', { length: 50 }).notNull(),
    trigger: varchar('trigger', { length: 50 }).notNull(),
    svgCode: text('svg_code').notNull(),
    componentCode: text('component_code').notNull(),
    previewUrl: text('preview_url').notNull(),
    blobStorageKey: text('blob_storage_key').notNull(),
    tags: text('tags').array(),
    color: varchar('color', { length: 50 }),
    strokeWeight: real('stroke_weight'),
    duration: real('duration'),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('idx_icons_user_created').on(table.clerkUserId, table.createdAt),
  ],
);

// ─────────────────────────────────────────────────
// Collections
// ─────────────────────────────────────────────────

export const collections = pgTable('collections', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  parentCollectionId: uuid('parent_collection_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─────────────────────────────────────────────────
// Collection Icons (join table)
// ─────────────────────────────────────────────────

export const collectionIcons = pgTable(
  'collection_icons',
  {
    collectionId: uuid('collection_id')
      .notNull()
      .references(() => collections.id, { onDelete: 'cascade' }),
    iconId: uuid('icon_id')
      .notNull()
      .references(() => generatedIcons.id, { onDelete: 'cascade' }),
    addedAt: timestamp('added_at').defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.collectionId, table.iconId] }),
  ],
);

// ─────────────────────────────────────────────────
// Generation Events (analytics)
// ─────────────────────────────────────────────────

export const generationEvents = pgTable(
  'generation_events',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
    eventType: varchar('event_type', { length: 50 })
      .notNull()
      .$type<'generate' | 'refine' | 'export' | 'delete'>(),
    iconId: uuid('icon_id').references(() => generatedIcons.id, {
      onDelete: 'set null',
    }),
    tokensUsed: integer('tokens_used').notNull(),
    metadata: jsonb('metadata').$type<Record<string, unknown>>(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('idx_events_user_created').on(table.clerkUserId, table.createdAt),
  ],
);

// ─────────────────────────────────────────────────
// Batch Jobs
// ─────────────────────────────────────────────────

export const batchJobs = pgTable(
  'batch_jobs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
    status: varchar('status', { length: 50 })
      .notNull()
      .$type<'queued' | 'processing' | 'completed' | 'failed'>(),
    totalPrompts: integer('total_prompts').notNull(),
    completedCount: integer('completed_count').default(0),
    failedCount: integer('failed_count').default(0),
    prompts: jsonb('prompts').notNull().$type<string[]>(),
    style: varchar('style', { length: 50 }).notNull(),
    animation: varchar('animation', { length: 50 }),
    iconIds: jsonb('icon_ids').$type<string[]>(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    completedAt: timestamp('completed_at'),
  },
  (table) => [
    index('idx_batches_user_created').on(table.clerkUserId, table.createdAt),
  ],
);

// ─────────────────────────────────────────────────
// Type exports for use in application code
// ─────────────────────────────────────────────────

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type GeneratedIcon = typeof generatedIcons.$inferSelect;
export type NewGeneratedIcon = typeof generatedIcons.$inferInsert;
export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;
export type GenerationEvent = typeof generationEvents.$inferSelect;
export type NewGenerationEvent = typeof generationEvents.$inferInsert;
export type BatchJob = typeof batchJobs.$inferSelect;
export type NewBatchJob = typeof batchJobs.$inferInsert;

export type PlanType = 'free' | 'pro' | 'team' | 'enterprise';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due';
export type IconStyle = 'line' | 'solid' | 'outline' | 'duotone' | 'pixel' | 'isometric' | 'hand-drawn';
export type GenerationEventType = 'generate' | 'refine' | 'export' | 'delete';
export type BatchStatus = 'queued' | 'processing' | 'completed' | 'failed';
