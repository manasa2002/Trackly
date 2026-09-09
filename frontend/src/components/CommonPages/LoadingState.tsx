import { Loader2 } from "lucide-react";

interface LoadingStateProps {
    message?: string;
    fullPage?: boolean;
}

function LoadingState({
    message = "Loading...",
    fullPage = false,
}: LoadingStateProps) {
    return (
        <div
            className={`
                flex items-center justify-center
                ${fullPage ? "min-h-[60vh]" : "py-16"}
            `}
        >
            <div className="flex flex-col items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e6f0ee]">
                    <Loader2
                        size={20}
                        className="animate-spin text-[#315b5d]"
                    />
                </div>

                <p className="text-xs font-medium text-[#718282]">
                    {message}
                </p>
            </div>
        </div>
    );
}

export default LoadingState;