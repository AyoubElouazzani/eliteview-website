import { pgTable, text, timestamp, boolean, integer, serial, decimal, varchar } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables: IPTV Platform -------------------------------------------

export const subscriptionPlans = pgTable('subscriptionPlans', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  billingCycle: varchar('billingCycle', { length: 20 }).notNull().default('monthly'), // monthly, yearly
  maxDevices: integer('maxDevices').notNull().default(5),
  features: text('features').notNull(), // JSON array stored as text
  isActive: boolean('isActive').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  planId: integer('planId').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('active'), // active, paused, cancelled, expired
  stripeSubscriptionId: text('stripeSubscriptionId'),
  currentPeriodStart: timestamp('currentPeriodStart').notNull(),
  currentPeriodEnd: timestamp('currentPeriodEnd').notNull(),
  cancelledAt: timestamp('cancelledAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const devices = pgTable('devices', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  deviceName: varchar('deviceName', { length: 100 }).notNull(),
  deviceType: varchar('deviceType', { length: 50 }).notNull(), // smartphone, tablet, smart_tv, computer
  deviceId: varchar('deviceId', { length: 255 }).notNull().unique(),
  ipAddress: varchar('ipAddress', { length: 45 }),
  lastActive: timestamp('lastActive'),
  isActive: boolean('isActive').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  planId: integer('planId').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  stripePaymentIntentId: text('stripePaymentIntentId').notNull().unique(),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, succeeded, failed, cancelled
  billingCycle: varchar('billingCycle', { length: 20 }).notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const watchHistory = pgTable('watchHistory', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  channelId: varchar('channelId', { length: 100 }).notNull(),
  channelName: varchar('channelName', { length: 100 }).notNull(),
  watchedAt: timestamp('watchedAt').notNull().defaultNow(),
  duration: integer('duration').notNull().default(0), // in seconds
})

export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  channelId: varchar('channelId', { length: 100 }).notNull(),
  channelName: varchar('channelName', { length: 100 }).notNull(),
  addedAt: timestamp('addedAt').notNull().defaultNow(),
})

export const supportTickets = pgTable('supportTickets', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  subject: varchar('subject', { length: 200 }).notNull(),
  description: text('description').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('open'), // open, in_progress, resolved, closed
  priority: varchar('priority', { length: 10 }).notNull().default('normal'), // low, normal, high, urgent
  attachments: text('attachments'), // JSON array
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  resolvedAt: timestamp('resolvedAt'),
})

export const adminUsers = pgTable('adminUsers', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('moderator'), // admin, moderator, support
  permissions: text('permissions').notNull(), // JSON array
  isActive: boolean('isActive').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const contactSubmissions = pgTable('contactSubmissions', {
  id: serial('id').primaryKey(),
  fullName: varchar('fullName', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

