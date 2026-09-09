import { ArrowLeft, CircleOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f3f5f4]">
            <div className="w-full max-w-md text-center">
                <div className="mx-auto grid w-16 place-items-center rounded-2xl bg-[#e6f0ee] text-[#315b5d]">
                    <CircleOff size={28} />
                </div>

                <p className="mt-6 text-5xl font-bold text-[#214f51]">
                    404
                </p>

                <h1 className="mt-3 text-xl font-semibold text-[#29494a]">
                    Page not found
                </h1>

                <p className="mt-2 text-sm text-[#849595]">
                    The page you're looking for doesn't exist
                    or may have been moved.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="mx-auto mt-6 flex items-center gap-2 rounded-lg bg-[#214f51] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#183f41]"
                >
                    <ArrowLeft size={15} />
                    Back to dashboard
                </button>
            </div>
        </div>
    );
}

export default NotFound;