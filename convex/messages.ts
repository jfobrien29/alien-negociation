import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getAll = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query('messages').collect();
  },
});

export const reset = mutation({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query('messages').collect();
    await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
  },
});

export const writeHumanMessage = mutation({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('messages', {
      humanReadableContent: args.content,
      alienReadableContent: args.content,
      role: 'human',
    });
  },
});

export const writeAlienMessage = mutation({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('messages', {
      humanReadableContent: args.content,
      alienReadableContent: args.content,
      role: 'alien',
    });
  },
});
