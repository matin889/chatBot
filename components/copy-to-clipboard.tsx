'use client'

import { useClipboard } from "@/hooks/use-clipboard"
import { cn } from "@/lib/utils"
import { type Message } from "ai"
import { Button } from "./ui/button"
import { CheckIcon, CopyIcon } from "lucide-react"

interface ChatMessageActionProps extends React.ComponentProps<'div'> {
    message: Message
}

export default function CopyToClipboard ({
    message,
    className,
    ...props
}: ChatMessageActionProps) {
    const { isCopied, copyToClipboard } = useClipboard({ timeout: 2000})

    const onCopy = () => {
        if (isCopied) return
        copyToClipboard(message.content)
    }

    return (
        <div className={cn('', className)} {...props}>
            <Button
            variant='secondary'
            size='icon'
            className="h-8 w-8"
            onClick={onCopy}>
                {isCopied ? (
                    <CheckIcon className="h-4 w-4 text-emerald" />
                ): (
                    <CopyIcon className="h-4 w-4 text-zinc-500" />
                )}
                <span className="sr-only">Copy Message</span>
            </Button>
        </div>
    )
}