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
  uniqueIndex,
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
// Teams
// ─────────────────────────────────────────────────

export const teams = pgTable(
  'teams',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 50 }).notNull(),
    ownerClerkUserId: varchar('owner_clerk_user_id', { length: 255 }).notNull(),
    avatarUrl: text('avatar_url'),
    slackWebhookUrl: text('slack_webhook_url'),
    slackChannelName: varchar('slack_channel_name', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('idx_teams_slug').on(table.slug),
    index('idx_teams_owner').on(table.ownerClerkUserId),
  ],
);

// ─────────────────────────────────────────────────
// Team Members
// ─────────────────────────────────────────────────

export type TeamRole = 'admin' | 'editor' | 'viewer';

export const teamMembers = pgTable(
  'team_members',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    teamId: uuid('team_id')
      .notNull()
      .references(() => teams.id, { onDelete: 'cascade' }),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
    role: varchar('role', { length: 20 })
      .notNull()
      .$type<TeamRole>(),
    joinedAt: timestamp('joined_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('idx_team_members_team').on(table.teamId),
    index('idx_team_members_user').on(table.clerkUserId),
    uniqueIndex('idx_team_members_unique').on(table.teamId, table.clerkUserId),
  ],
);

// ─────────────────────────────────────────────────
// Team Invitations
// ─────────────────────────────────────────────────

export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'revoked';

export const teamInvitations = pgTable(
  'team_invitations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    teamId: uuid('team_id')
      .notNull()
      .references(() => teams.id, { onDelete: 'cascade' }),
    email: varchar('email', { length: 255 }).notNull(),
    role: varchar('role', { length: 20 })
      .notNull()
      .$type<TeamRole>(),
    invitedByClerkUserId: varchar('invited_by_clerk_user_id', { length: 255 }).notNull(),
    token: varchar('token', { length: 128 }).notNull(),
    status: varchar('status', { length: 20 })
      .notNull()
      .$type<InvitationStatus>(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    acceptedAt: timestamp('accepted_at'),
  },
  (table) => [
    index('idx_invitations_team').on(table.teamId),
    uniqueIndex('idx_invitations_token').on(table.token),
    index('idx_invitations_email').on(table.email),
  ],
);

// ─────────────────────────────────────────────────
// Shared Collections
// ─────────────────────────────────────────────────

export const sharedCollections = pgTable(
  'shared_collections',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    collectionId: uuid('collection_id')
      .notNull()
      .references(() => collections.id, { onDelete: 'cascade' }),
    publicSlug: varchar('public_slug', { length: 100 }).notNull(),
    isPublic: boolean('is_public').notNull().default(true),
    allowEmbed: boolean('allow_embed').notNull().default(true),
    password: varchar('password', { length: 255 }),
    viewCount: integer('view_count').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('idx_shared_collections_slug').on(table.publicSlug),
    index('idx_shared_collections_collection').on(table.collectionId),
  ],
);

// ─────────────────────────────────────────────────
// Generated Icons
// ─────────────────────────────────────────────────

export const generatedIcons = pgTable(
  'generated_icons',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
    teamId: uuid('team_id').references(() => teams.id, { onDelete: 'set null' }),
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
    parentIconId: uuid('parent_icon_id'),
    referenceImageUrl: text('reference_image_url'),
    cdnSlug: varchar('cdn_slug', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('idx_icons_user_created').on(table.clerkUserId, table.createdAt),
    index('idx_icons_cdn_slug').on(table.clerkUserId, table.cdnSlug),
    index('idx_icons_team').on(table.teamId),
  ],
);

// ─────────────────────────────────────────────────
// Collections
// ─────────────────────────────────────────────────

export const collections = pgTable(
  'collections',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
    teamId: uuid('team_id').references(() => teams.id, { onDelete: 'set null' }),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    parentCollectionId: uuid('parent_collection_id'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('idx_collections_team').on(table.teamId),
  ],
);

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
// Style Templates
// ─────────────────────────────────────────────────

export const styleTemplates = pgTable(
  'style_templates',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
    teamId: uuid('team_id').references(() => teams.id, { onDelete: 'set null' }),
    name: varchar('name', { length: 255 }).notNull(),
    promptModifier: text('prompt_modifier'),
    style: varchar('style', { length: 50 })
      .$type<IconStyle>(),
    color: varchar('color', { length: 50 }),
    strokeWeight: real('stroke_weight'),
    animation: varchar('animation', { length: 50 }),
    trigger: varchar('trigger', { length: 50 }),
    duration: real('duration'),
    isShared: boolean('is_shared').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('idx_templates_user').on(table.clerkUserId),
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
    teamId: uuid('team_id').references(() => teams.id, { onDelete: 'set null' }),
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
    teamId: uuid('team_id').references(() => teams.id, { onDelete: 'set null' }),
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
export type StyleTemplate = typeof styleTemplates.$inferSelect;
export type NewStyleTemplate = typeof styleTemplates.$inferInsert;
export type GenerationEvent = typeof generationEvents.$inferSelect;
export type NewGenerationEvent = typeof generationEvents.$inferInsert;
export type BatchJob = typeof batchJobs.$inferSelect;
export type NewBatchJob = typeof batchJobs.$inferInsert;

export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type TeamInvitation = typeof teamInvitations.$inferSelect;
export type NewTeamInvitation = typeof teamInvitations.$inferInsert;
export type SharedCollection = typeof sharedCollections.$inferSelect;
export type NewSharedCollection = typeof sharedCollections.$inferInsert;

export type PlanType = 'free' | 'pro' | 'team' | 'enterprise';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due';
export type IconStyle = 'line' | 'solid' | 'outline' | 'duotone' | 'pixel' | 'isometric' | 'hand-drawn';
export type GenerationEventType = 'generate' | 'refine' | 'export' | 'delete';
export type BatchStatus = 'queued' | 'processing' | 'completed' | 'failed';
