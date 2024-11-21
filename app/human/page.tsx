'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ResetChatButton } from '@/components/reset';
import { Skeleton } from '@/components/ui/skeleton';

export default function ChatPage() {
  const messages = useQuery(api.messages.getAll);
  const humanSendMessage = useMutation(api.messages.writeHumanMessage);
  const pathname = usePathname();

  const schema = yup.object({
    message: yup.string().required('Message is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { message: string }) => {
    await humanSendMessage({ content: data.message });
    reset();
  };

  return (
    <>
      <ResetChatButton />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              You are <span className="bg-blue-100 px-2 py-1 rounded">Human</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full pr-4">
              {messages?.map((message) => (
                <div
                  key={message._id}
                  className="mb-4 p-3 bg-white rounded-lg shadow flex gap-2 border"
                >
                  <div
                    className={`px-2 py-1 rounded text-xs ${message.role === 'human' ? 'bg-blue-100' : 'bg-green-100'}`}
                  >
                    {message.role === 'human' ? 'Humans' : 'Aliens'}
                  </div>
                  <div>
                    {message.isLoading ? (
                      <Skeleton className="h-4 w-3/4" />
                    ) : (
                      message.humanReadableContent
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-2">
              <div className="flex-grow">
                <Input
                  {...register('message')}
                  type="text"
                  placeholder="Type a message..."
                  className={errors.message ? 'border-red-500' : ''}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              <Button type="submit">Send</Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
