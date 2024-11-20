import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  chats: defineTable({
    name: v.string(),
  }),
  messages: defineTable({
    chatId: v.id('chats'),
    content: v.string(),
    role: v.string(),
  }).index('by_chat', ['chatId']),
});
