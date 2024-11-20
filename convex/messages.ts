import { v } from 'convex/values';
import { mutation, internalMutation, query } from './_generated/server';

export const lastChat = query({
  args: {},
  handler: async (ctx) => {
    // Grab the single most recent messages.
    return await ctx.db.query('chats').order('desc').first();
  },
});

export const getChatMessages = query({
  args: { chatId: v.id('chats') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('messages')
      .withIndex('by_chat', (q) => q.eq('chatId', args.chatId))
      .collect();
  },
});
