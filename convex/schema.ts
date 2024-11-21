import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  messages: defineTable({
    humanReadableContent: v.string(),
    alienReadableContent: v.string(),
    role: v.string(),
  }),
});
