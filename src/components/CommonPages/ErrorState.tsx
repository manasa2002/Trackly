import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}

function ErrorState({
    title = "Something went wrong",
    description = "We couldn't load this content. Please try again.",
    onRetry,
}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#eadede] bg-[#fffafa] px-6 py-14 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#f8eaea] text-[#a06060]">
                <AlertTriangle size={22} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-[#594545]">
                {title}
            </h3>

            <p className="mt-1.5 max-w-md text-xs leading-5 text-[#927878]">
                {description}
            </p>

            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-5 flex items-center gap-2 rounded-lg bg-[#214f51] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#183f41]"
                >
                    <RefreshCcw size={14} />
                    Try again
                </button>
            )}
        </div>
    );
}

export default ErrorState;