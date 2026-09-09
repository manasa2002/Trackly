import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
    title: string;
    description?: string;
    action?: ReactNode;
}

function EmptyState({
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d7e2df] bg-[#fafcfb] px-6 py-14 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#e8f1ef] text-[#527273]">
                <Inbox size={22} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-[#29494a]">
                {title}
            </h3>

            {description && (
                <p className="mt-1.5 max-w-md text-xs leading-5 text-[#8a9b9b]">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-5">
                    {action}
                </div>
            )}
        </div>
    );
}

export default EmptyState;