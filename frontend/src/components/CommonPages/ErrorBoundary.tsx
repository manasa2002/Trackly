import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError(): State {
        return {
            hasError: true,
        };
    }

    componentDidCatch(
        error: Error,
        errorInfo: ErrorInfo,
    ) {
        console.error(
            "Trackly application error:",
            error,
            errorInfo,
        );
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-[#f3f5f4] px-5">
                    <div className="w-full max-w-md rounded-2xl border border-[#dfe7e5] bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-[#f8eaea] text-[#a06060]">
                            <AlertTriangle size={25} />
                        </div>

                        <h1 className="mt-5 text-lg font-semibold text-[#29494a]">
                            Trackly ran into a problem
                        </h1>

                        <p className="mt-2 text-xs leading-5 text-[#849595]">
                            Something unexpected happened while
                            rendering this page. Please reload and
                            try again.
                        </p>

                        <button
                            type="button"
                            onClick={this.handleReload}
                            className="mx-auto mt-6 flex items-center gap-2 rounded-lg bg-[#214f51] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#183f41]"
                        >
                            <RefreshCcw size={14} />
                            Reload application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;