CREATE TABLE "batch_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"status" varchar(50) NOT NULL,
	"total_prompts" integer NOT NULL,
	"completed_count" integer DEFAULT 0,
	"failed_count" integer DEFAULT 0,
	"prompts" jsonb NOT NULL,
	"style" varchar(50) NOT NULL,
	"animation" varchar(50),
	"icon_ids" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "collection_icons" (
	"collection_id" uuid NOT NULL,
	"icon_id" uuid NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "collection_icons_collection_id_icon_id_pk" PRIMARY KEY("collection_id","icon_id")
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"parent_collection_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generated_icons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"prompt" text NOT NULL,
	"style" varchar(50) NOT NULL,
	"animation" varchar(50) NOT NULL,
	"trigger" varchar(50) NOT NULL,
	"svg_code" text NOT NULL,
	"component_code" text NOT NULL,
	"preview_url" text NOT NULL,
	"blob_storage_key" text NOT NULL,
	"tags" text[],
	"color" varchar(50),
	"stroke_weight" real,
	"duration" real,
	"is_active" boolean DEFAULT true NOT NULL,
	"parent_icon_id" uuid,
	"reference_image_url" text,
	"cdn_slug" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "generation_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"icon_id" uuid,
	"tokens_used" integer NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "style_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"prompt_modifier" text,
	"style" varchar(50),
	"color" varchar(50),
	"stroke_weight" real,
	"animation" varchar(50),
	"trigger" varchar(50),
	"duration" real,
	"is_shared" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"stripe_customer_id" varchar(255) NOT NULL,
	"stripe_subscription_id" varchar(255),
	"plan_type" varchar(50) NOT NULL,
	"status" varchar(50) NOT NULL,
	"tokens_balance" integer DEFAULT 0 NOT NULL,
	"top_up_tokens" integer DEFAULT 0 NOT NULL,
	"tokens_refresh_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscriptions_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
ALTER TABLE "collection_icons" ADD CONSTRAINT "collection_icons_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_icons" ADD CONSTRAINT "collection_icons_icon_id_generated_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."generated_icons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_events" ADD CONSTRAINT "generation_events_icon_id_generated_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."generated_icons"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_batches_user_created" ON "batch_jobs" USING btree ("clerk_user_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_icons_user_created" ON "generated_icons" USING btree ("clerk_user_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_icons_cdn_slug" ON "generated_icons" USING btree ("clerk_user_id","cdn_slug");--> statement-breakpoint
CREATE INDEX "idx_events_user_created" ON "generation_events" USING btree ("clerk_user_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_templates_user" ON "style_templates" USING btree ("clerk_user_id");