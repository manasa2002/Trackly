import { useEffect, useState } from "react";
import {
    Bell,
    Check,
    CheckCheck,
    CircleCheck,
    Clock3,
    MessageSquare,
    Trash2,
    UserPlus,
    X,
} from "lucide-react";

type NotificationType =
    | "task"
    | "completed"
    | "comment"
    | "deadline"
    | "team";

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    read: boolean;
}

const STORAGE_KEY = "trackly-notifications";

const defaultNotifications: Notification[] = [
    {
        id: "1",
        type: "task",
        title: "New task assigned",
        message: "You have been assigned a new task in Website Redesign.",
        time: "10 minutes ago",
        read: false,
    },
    {
        id: "2",
        type: "deadline",
        title: "Task deadline approaching",
        message: "Responsive header is due tomorrow.",
        time: "1 hour ago",
        read: false,
    },
    {
        id: "3",
        type: "completed",
        title: "Task completed",
        message: "Riya completed the Project Brief task.",
        time: "2 hours ago",
        read: false,
    },
    {
        id: "4",
        type: "comment",
        title: "New comment",
        message: "Alex commented on Design Landing Page.",
        time: "4 hours ago",
        read: true,
    },
    {
        id: "5",
        type: "team",
        title: "New team member",
        message: "Rahul joined your Website Redesign project.",
        time: "Yesterday",
        read: true,
    },
];

function getNotifications(): Notification[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            return JSON.parse(stored);
        }

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultNotifications)
        );

        return defaultNotifications;
    } catch {
        return defaultNotifications;
    }
}

function Notifications() {
    const [notifications, setNotifications] =
        useState<Notification[]>(getNotifications);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(notifications)
        );
    }, [notifications]);

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    const markAsRead = (id: string) => {
        setNotifications((current) =>
            current.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((current) =>
            current.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
    };

    const deleteNotification = (id: string) => {
        setNotifications((current) =>
            current.filter(
                (notification) => notification.id !== id
            )
        );
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="mx-auto max-w-[1000px]">
            {/* HEADER */}
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="text-xs font-medium text-[#789090]">
                        Workspace
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e6f0ee] text-[#315b5d]">
                            <Bell size={20} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-[#29494a]">
                                Notifications
                            </h1>

                            <p className="mt-1 text-sm text-[#849595]">
                                Stay updated with your workspace activity.
                            </p>
                        </div>
                    </div>
                </div>

                {unreadCount > 0 && (
                    <button
                        type="button"
                        onClick={markAllAsRead}
                        className="flex items-center justify-center gap-2 rounded-lg border border-[#dfe7e5] bg-white px-4 py-2.5 text-xs font-medium text-[#315b5d] transition hover:bg-[#f2f6f5]"
                    >
                        <CheckCheck size={16} />
                        Mark all as read
                    </button>
                )}
            </div>

            {/* SUMMARY */}
            <div className="mb-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#e1e7e5] bg-[#f9faf9] p-4">
                    <p className="text-xs text-[#849595]">
                        Total notifications
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-[#29494a]">
                        {notifications.length}
                    </p>
                </div>

                <div className="rounded-2xl border border-[#e1e7e5] bg-[#f9faf9] p-4">
                    <p className="text-xs text-[#849595]">
                        Unread notifications
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-[#315b5d]">
                        {unreadCount}
                    </p>
                </div>
            </div>

            {/* NOTIFICATIONS */}
            <div className="overflow-hidden rounded-2xl border border-[#e1e7e5] bg-[#f9faf9]">
                <div className="flex items-center justify-between border-b border-[#e5eae9] px-5 py-4">
                    <div>
                        <h2 className="text-sm font-semibold text-[#29494a]">
                            Recent notifications
                        </h2>

                        <p className="mt-1 text-xs text-[#8a9b9b]">
                            Updates from your Trackly workspace
                        </p>
                    </div>

                    {notifications.length > 0 && (
                        <button
                            type="button"
                            onClick={clearAll}
                            className="flex items-center gap-1.5 text-xs font-medium text-[#9a7772] transition hover:text-[#7d5752]"
                        >
                            <Trash2 size={14} />
                            Clear all
                        </button>
                    )}
                </div>

                {notifications.length === 0 ? (
                    <EmptyNotifications />
                ) : (
                    <div className="divide-y divide-[#e8edeb]">
                        {notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onRead={markAsRead}
                                onDelete={deleteNotification}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function NotificationItem({
    notification,
    onRead,
    onDelete,
}: {
    notification: Notification;
    onRead: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <div
            className={`
                group flex gap-4 px-5 py-5 transition
                ${notification.read
                    ? "bg-[#f9faf9]"
                    : "bg-white"
                }
                hover:bg-[#f5f8f7]
            `}
        >
            {/* ICON */}
            <div
                className={`
                    grid h-10 w-10 shrink-0 place-items-center rounded-xl
                    ${notification.read
                        ? "bg-[#edf2f1] text-[#718282]"
                        : "bg-[#e2efed] text-[#315b5d]"
                    }
                `}
            >
                {getNotificationIcon(notification.type)}
            </div>

            {/* CONTENT */}
            <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <h3
                            className={`
                                text-sm
                                ${notification.read
                                    ? "font-medium text-[#527273]"
                                    : "font-semibold text-[#29494a]"
                                }
                            `}
                        >
                            {notification.title}
                        </h3>

                        {!notification.read && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#315b5d]" />
                        )}
                    </div>

                    <span className="text-[10px] text-[#9aa8a8]">
                        {notification.time}
                    </span>
                </div>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-[#849595]">
                    {notification.message}
                </p>

                {/* ACTIONS */}
                <div className="mt-3 flex items-center gap-4">
                    {!notification.read && (
                        <button
                            type="button"
                            onClick={() => onRead(notification.id)}
                            className="flex items-center gap-1.5 text-[11px] font-medium text-[#315b5d] transition hover:text-[#214f51]"
                        >
                            <Check size={13} />
                            Mark as read
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => onDelete(notification.id)}
                        className="flex items-center gap-1.5 text-[11px] font-medium text-[#9a7772] opacity-0 transition group-hover:opacity-100 hover:text-[#7d5752]"
                    >
                        <X size={13} />
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

function getNotificationIcon(type: NotificationType) {
    switch (type) {
        case "completed":
            return <CircleCheck size={19} />;

        case "comment":
            return <MessageSquare size={19} />;

        case "deadline":
            return <Clock3 size={19} />;

        case "team":
            return <UserPlus size={19} />;

        default:
            return <Bell size={19} />;
    }
}

function EmptyNotifications() {
    return (
        <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#e8f0ee] text-[#527273]">
                <Bell size={24} />
            </div>

            <h3 className="mt-5 text-sm font-semibold text-[#29494a]">
                You're all caught up
            </h3>

            <p className="mt-2 max-w-sm text-xs leading-5 text-[#8a9b9b]">
                There are no notifications to show right now.
                We'll let you know when something important happens.
            </p>
        </div>
    );
}

export default Notifications;