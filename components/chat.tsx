'use client';
 
import { useChat } from 'ai/react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendHorizonalIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
 
export default function Chat() {
  const ref = useRef<HTMLDivElement>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat();
  useEffect(() => {
    if(ref.current === null) return
    ref.current.scrollTo(0, ref.current.scrollHeight)
  }, [messages])
  return (
    <section className="text-zinc-700">
        <div className="container flex h-screen flex-col items-center justify-content">
            <h1 className="font-sherif text-2x1 font-medium">AI Chatbot</h1>
            <div className="mt-4 w-full max-w-lg">
                {/*response container */}
                <ScrollArea className='mb-2 h-[400px] round-md border p-4'
                ref={ref}>
                    {error && (
                        <div className="text-sm text-red-400">{error.message}</div>
                    )}
                    {messages.map(m => (
                        <div key={m.id} className='mr-6 whitespace-pre-wrap md:mr-12'>
                            {m.role === 'user' && (
                                <div className='mb-6 flex gap-3'>
                                    <Avatar>
                                        <AvatarImage src='' />
                                        <AvatarFallback className='text-sm'>U</AvatarFallback>
                                    </Avatar>
                                    <div className='mt-1.5'>
                                        <p className='font-semibold'>You</p>
                                        <div className='mt-1.5 text-sm text-zinc-500'>
                                            {m.content}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {m.role === 'assistant' && (
                                <div className='mb-6 flex gap-3'>
                                    <Avatar>
                                        <AvatarImage src='' />
                                        <AvatarFallback className='text-sm'>AI</AvatarFallback>
                                    </Avatar>
                                    <div className='mt-1.5'>
                                        <p className='font-semibold'>You</p>
                                        <div className='mt-1.5 text-sm text-zinc-500'>
                                            {m.content}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                    ))}
                </ScrollArea>
                {/*input form */}
                <form onSubmit={handleSubmit} className="relative">
                    <Input 
                        className="pr-12 placeholder:italic placeholder:text-zinc-600"
                        value={input}
                        placeholder="Ask me anything..."
                        onChange={handleInputChange}
                    />
                    <Button 
                        size='icon'
                        type='submit'
                        variant='secondary'
                        disabled={isLoading}
                        className='absolute right-1 top-1 h-8 w-10'>
                        <SendHorizonalIcon className='h-5 w-5 text-emerald-500'/>
                        </Button>
                    
                </form>
            </div>
        </div>
    </section>
  );
}