import {
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    NavLink,
    Outlet,
    useNavigate,
} from "react-router-dom";

import {
    BarChart3,
    CalendarDays,
    CheckSquare,
    ChevronLeft,
    ChevronRight,
    FolderKanban,
    House,
    Menu,
    Search,
    Settings,
    UserRound,
    X,
} from "lucide-react";

interface NavigationItem {
    name: string;
    path: string;
    icon: ReactNode;
}

interface ProfileData {
    name: string;
    email: string;
    role: string;
    location: string;
    bio: string;
    avatar: string;
}

const navigationItems: NavigationItem[] = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <House size={19} />,
    },
    {
        name: "Projects",
        path: "/projects",
        icon: <FolderKanban size={19} />,
    },
    {
        name: "My Tasks",
        path: "/tasks",
        icon: <CheckSquare size={19} />,
    },
    {
        name: "Calendar",
        path: "/calendar",
        icon: <CalendarDays size={19} />,
    },
    {
        name: "Team",
        path: "/team",
        icon: <UserRound size={19} />,
    },
    {
        name: "Analytics",
        path: "/analytics",
        icon: <BarChart3 size={19} />,
    },
];

const defaultProfile: ProfileData = {
    name: "Manasa",
    email: "manasa@example.com",
    role: "Frontend Developer",
    location: "Andhra Pradesh, India",
    bio: "",
    avatar: "",
};

function getProfile(): ProfileData {
    try {
        const stored =
            localStorage.getItem("trackly-profile");

        if (!stored) {
            return defaultProfile;
        }

        return {
            ...defaultProfile,
            ...JSON.parse(stored),
        };
    } catch {
        return defaultProfile;
    }
}

function AppShell() {
    const navigate = useNavigate();

    const [isCollapsed, setIsCollapsed] =
        useState(false);

    const [isMobileOpen, setIsMobileOpen] =
        useState(false);

    const [profile, setProfile] =
        useState<ProfileData>(getProfile);

    const [unreadCount, setUnreadCount] =
        useState(0);

    useEffect(() => {
        const updateProfile = () => {
            setProfile(getProfile());
        };

        const updateNotifications = () => {
            try {
                const stored =
                    localStorage.getItem(
                        "trackly-notifications",
                    );

                if (!stored) {
                    setUnreadCount(0);
                    return;
                }

                const notifications = JSON.parse(
                    stored,
                );

                setUnreadCount(
                    Array.isArray(notifications)
                        ? notifications.filter(
                            (item) => !item.read,
                        ).length
                        : 0,
                );
            } catch {
                setUnreadCount(0);
            }
        };

        updateProfile();
        updateNotifications();

        window.addEventListener(
            "storage",
            updateProfile,
        );

        window.addEventListener(
            "storage",
            updateNotifications,
        );

        const interval = window.setInterval(() => {
            updateProfile();
            updateNotifications();
        }, 1000);

        return () => {
            window.removeEventListener(
                "storage",
                updateProfile,
            );

            window.removeEventListener(
                "storage",
                updateNotifications,
            );

            window.clearInterval(interval);
        };
    }, []);

    const initials =
        profile.name
            .trim()
            .split(" ")
            .filter(Boolean)
            .map((word) => word.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase() || "M";

    return (
        <div className="min-h-screen bg-[#f3f5f4]">

            {/* MOBILE OVERLAY */}

            {isMobileOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() =>
                        setIsMobileOpen(false)
                    }
                    className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
                />
            )}

            {/* SIDEBAR */}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-40
                    flex flex-col
                    bg-[#173f40]
                    transition-all duration-300

                    ${isCollapsed
                        ? "w-[78px]"
                        : "w-[240px]"
                    }

                    ${isMobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }
                `}
            >

                {/* LOGO */}

                <div
                    className={`
                        flex h-[76px] items-center
                        border-b border-white/10
                        px-4

                        ${isCollapsed
                            ? "justify-center"
                            : "justify-between"
                        }
                    `}
                >
                    <div className="flex items-center gap-3 overflow-hidden">

                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#315b5d] text-sm font-bold text-white">
                            T
                        </div>

                        {!isCollapsed && (
                            <div>
                                <h1 className="text-sm font-semibold text-white">
                                    Trackly
                                </h1>

                                <p className="text-[10px] text-[#9db6b5]">
                                    Workspace
                                </p>
                            </div>
                        )}
                    </div>

                    {!isCollapsed && (
                        <button
                            type="button"
                            onClick={() =>
                                setIsCollapsed(true)
                            }
                            aria-label="Collapse sidebar"
                            className="hidden text-[#a8c1c1] transition hover:text-white lg:block"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() =>
                            setIsMobileOpen(false)
                        }
                        aria-label="Close sidebar"
                        className="text-[#a8c1c1] lg:hidden"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* EXPAND */}

                {isCollapsed && (
                    <button
                        type="button"
                        onClick={() =>
                            setIsCollapsed(false)
                        }
                        aria-label="Expand sidebar"
                        className="hidden h-[50px] items-center justify-center border-b border-white/10 text-[#a8c1c1] transition hover:text-white lg:flex"
                    >
                        <ChevronRight size={18} />
                    </button>
                )}

                {/* CURRENT PROJECT */}

                {!isCollapsed && (
                    <div className="px-4 py-5">
                        <div className="rounded-xl bg-white/5 p-3">
                            <p className="text-[10px] font-medium uppercase tracking-wider text-[#86a6a5]">
                                Current Project
                            </p>

                            <div className="mt-3 flex items-center gap-3">
                                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#ef8b7a] text-xs font-bold text-white">
                                    W
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-xs font-semibold text-white">
                                        Website Redesign
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-[#91adac]">
                                        12 tasks active
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* NAVIGATION */}

                <nav className="flex-1 overflow-y-auto px-3">
                    <p
                        className={`
                            mb-3 px-2 text-[10px]
                            font-semibold uppercase
                            tracking-wider text-[#7f9d9d]

                            ${isCollapsed
                                ? "hidden"
                                : ""
                            }
                        `}
                    >
                        Workspace
                    </p>

                    <div className="space-y-1">
                        {navigationItems.map(
                            (item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    title={
                                        isCollapsed
                                            ? item.name
                                            : undefined
                                    }
                                    onClick={() =>
                                        setIsMobileOpen(
                                            false,
                                        )
                                    }
                                    className={({
                                        isActive,
                                    }) =>
                                        `
                                        flex h-11
                                        items-center
                                        rounded-xl
                                        transition-all

                                        ${isCollapsed
                                            ? "justify-center"
                                            : "gap-3 px-3"
                                        }

                                        ${isActive
                                            ? "bg-[#315b5d] text-white"
                                            : "text-[#a7c0bf] hover:bg-white/5 hover:text-white"
                                        }
                                        `
                                    }
                                >
                                    {item.icon}

                                    {!isCollapsed && (
                                        <span className="text-sm font-medium">
                                            {item.name}
                                        </span>
                                    )}
                                </NavLink>
                            ),
                        )}
                    </div>
                </nav>

                {/* SETTINGS */}

                <div className="border-t border-white/10 p-3">
                    <NavLink
                        to="/settings"
                        onClick={() =>
                            setIsMobileOpen(false)
                        }
                        title={
                            isCollapsed
                                ? "Settings"
                                : undefined
                        }
                        className={({ isActive }) =>
                            `
                            flex h-11 items-center
                            rounded-xl transition

                            ${isCollapsed
                                ? "justify-center"
                                : "gap-3 px-3"
                            }

                            ${isActive
                                ? "bg-[#315b5d] text-white"
                                : "text-[#a7c0bf] hover:bg-white/5 hover:text-white"
                            }
                            `
                        }
                    >
                        <Settings size={19} />

                        {!isCollapsed && (
                            <span className="text-sm font-medium">
                                Settings
                            </span>
                        )}
                    </NavLink>
                </div>
            </aside>

            {/* MAIN */}

            <div
                className={`
                    min-h-screen
                    transition-all duration-300

                    ${isCollapsed
                        ? "lg:ml-[78px]"
                        : "lg:ml-[240px]"
                    }
                `}
            >

                {/* HEADER */}

                <header className="sticky top-0 z-20 flex min-h-[76px] items-center justify-between border-b border-[#e2e7e5] bg-[#f8f9f8]/95 px-4 backdrop-blur-sm sm:px-5 lg:px-7">

                    {/* LEFT */}

                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                        <button
                            type="button"
                            onClick={() =>
                                setIsMobileOpen(true)
                            }
                            aria-label="Open sidebar"
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#dfe5e3] bg-white text-[#29494a] lg:hidden"
                        >
                            <Menu size={19} />
                        </button>

                        <div className="min-w-0">
                            <p className="truncate text-[11px] text-[#8a9b9b] sm:text-xs">
                                Trackly Workspace
                            </p>

                            <h2 className="truncate text-xs font-semibold text-[#29494a] sm:text-sm">
                                Website Redesign
                            </h2>
                        </div>
                    </div>

                    {/* RIGHT */}

                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">

                        {/* SEARCH */}

                        <div className="hidden items-center gap-2 rounded-lg border border-[#dfe5e3] bg-white px-3 py-2 md:flex">
                            <Search
                                size={16}
                                className="text-[#9aa8a8]"
                            />

                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-[130px] bg-transparent text-xs outline-none placeholder:text-[#a7b3b3] lg:w-[170px]"
                            />
                        </div>

                        {/* NOTIFICATIONS */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/notifications",
                                )
                            }
                            aria-label="Notifications"
                            title="Notifications"
                            className="relative grid h-9 w-9 place-items-center rounded-lg border border-[#dfe5e3] bg-white text-[#527273] transition hover:bg-[#edf3f1]"
                        >
                            <span className="text-sm">
                                🔔
                            </span>

                            {unreadCount > 0 && (
                                <span className="absolute -right-1 -top-1 grid min-h-[17px] min-w-[17px] place-items-center rounded-full bg-[#ef8b7a] px-1 text-[9px] font-bold text-white">
                                    {unreadCount > 9
                                        ? "9+"
                                        : unreadCount}
                                </span>
                            )}
                        </button>

                        {/* LOGGED-IN USER */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/profile")
                            }
                            title={`${profile.name} - View profile`}
                            aria-label="View profile"
                            className="group flex items-center gap-2 rounded-lg p-1 transition hover:bg-[#edf3f1]"
                        >
                            <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white bg-[#dbe9e7] text-xs font-semibold text-[#315b5d] shadow-sm">
                                {profile.avatar ? (
                                    <img
                                        src={profile.avatar}
                                        alt={profile.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    initials
                                )}
                            </div>

                            <div className="hidden text-left xl:block">
                                <p className="max-w-[110px] truncate text-xs font-semibold text-[#29494a]">
                                    {profile.name}
                                </p>

                                <p className="max-w-[110px] truncate text-[10px] text-[#8a9b9b]">
                                    {profile.role}
                                </p>
                            </div>
                        </button>
                    </div>
                </header>

                {/* ROUTE CONTENT */}

                <main className="p-4 sm:p-5 lg:p-7">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppShell;