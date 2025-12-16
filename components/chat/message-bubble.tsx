import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageBubbleProps {
    role: "user" | "ai" | "system";
    content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
    return (
        <div className={cn("flex w-full gap-4 p-4", role === "user" ? "justify-end" : "justify-start")}>
            {role !== "user" && (
                <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/ai-avatar.png" alt="AI" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
                </Avatar>
            )}

            <div className={cn(
                "max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed",
                role === "user"
                    ? "bg-black text-white shadow-sm"
                    : role === "system"
                        ? "bg-transparent text-neutral-500 w-full text-center border-none shadow-none italic text-xs"
                        : "bg-neutral-50 text-neutral-800 border border-neutral-100"
            )}>
                {content}
            </div>

            {role === "user" && (
                <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/user-avatar.png" alt="User" />
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">ME</AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}
