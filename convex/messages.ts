import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { api } from './_generated/api';

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
      alienReadableContent: args.content
        .split(' ')
        .map((word) =>
          word.toLowerCase().includes('e')
            ? Array(word.length)
                .fill('@#$%&?∆ßø¥'.split(''))
                .map(() => '@#$%&?∆ßø¥'[Math.floor(Math.random() * '@#$%&?∆ßø¥'.length)])
                .join('')
            : word,
        )
        .join(' '),
      isLoading: false,
      role: 'human',
    });
  },
});

export const writeAlienMessage = mutation({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert('messages', {
      humanReadableContent: '',
      alienReadableContent: args.content,
      isLoading: true,
      role: 'alien',
    });

    await ctx.scheduler.runAfter(0, api.messageActions.alienifyMessage, {
      id: messageId,
      content: args.content,
    });
  },
});

export const updateMessage = mutation({
  args: { id: v.id('messages'), content: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { humanReadableContent: args.content, isLoading: false });
  },
});
