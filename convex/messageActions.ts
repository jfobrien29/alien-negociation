/// Do stuff here

import { v } from 'convex/values';
import { action } from './_generated/server';
import { OpenAI } from 'openai';
import { api } from './_generated/api';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const alienifyMessage = action({
  args: { content: v.string(), id: v.id('messages') },
  handler: async (ctx, args) => {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an aggressive alien. Rewrite the given message in your voice, making it sound more alien and hostile. Keep the same exact meaning but add alien references and aggressive tones. Cold, sterile, and hostile.',
        },
        {
          role: 'user',
          content: args.content,
        },
      ],
    });

    const alienMessage = response.choices[0].message.content;

    console.log(alienMessage);

    await ctx.runMutation(api.messages.updateMessage, {
      id: args.id,
      content: alienMessage ?? args.content,
    });
    return alienMessage;
  },
});
