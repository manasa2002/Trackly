import { useEffect, useState } from "react";
import {
    Bell,
    Check,
    Globe,
    Palette,
    Save,
    Settings as SettingsIcon,
    Shield,
    Trash2,
} from "lucide-react";

interface SettingsData {
    workspaceName: string;
    workspaceDescription: string;
    emailNotifications: boolean;
    taskReminders: boolean;
    activityUpdates: boolean;
    weeklySummary: boolean;
    language: string;
    timezone: string;
    theme: "light" | "dark";
}

const STORAGE_KEY = "trackly-settings";

const defaultSettings: SettingsData = {
    workspaceName: "Trackly Workspace",
    workspaceDescription:
        "Manage projects, tasks and team collaboration.",
    emailNotifications: true,
    taskReminders: true,
    activityUpdates: true,
    weeklySummary: false,
    language: "English",
    timezone: "India Standard Time (IST)",
    theme: "light",
};

function Settings() {
    const [settings, setSettings] =
        useState<SettingsData>(() => {
            try {
                const stored =
                    localStorage.getItem(STORAGE_KEY);

                return stored
                    ? JSON.parse(stored)
                    : defaultSettings;
            } catch {
                return defaultSettings;
            }
        });

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(settings)
        );
    }, [settings]);

    const updateSetting = <K extends keyof SettingsData>(
        key: K,
        value: SettingsData[K]
    ) => {
        setSettings((current) => ({
            ...current,
            [key]: value,
        }));

        setSaved(false);
    };

    const saveSettings = () => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(settings)
        );

        setSaved(true);

        window.setTimeout(() => {
            setSaved(false);
        }, 2500);
    };

    const resetSettings = () => {
        const confirmed = window.confirm(
            "Reset all settings to their default values?"
        );

        if (!confirmed) return;

        setSettings(defaultSettings);
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultSettings)
        );
    };

    return (
        <div className="mx-auto max-w-[1100px]">
            {/* PAGE HEADER */}

            <section className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="text-xs font-medium text-[#789090]">
                        Workspace
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e6f0ee] text-[#315b5d]">
                            <SettingsIcon size={20} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-[#29494a]">
                                Settings
                            </h1>

                            <p className="mt-1 text-sm text-[#849595]">
                                Manage your workspace preferences.
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={saveSettings}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#214f51] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#183f41]"
                >
                    {saved ? (
                        <>
                            <Check size={16} />
                            Saved
                        </>
                    ) : (
                        <>
                            <Save size={16} />
                            Save changes
                        </>
                    )}
                </button>
            </section>

            <div className="space-y-6">
                {/* GENERAL */}

                <SettingsSection
                    icon={<SettingsIcon size={18} />}
                    title="General"
                    description="Basic information about your workspace."
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <InputField
                            label="Workspace name"
                            value={settings.workspaceName}
                            onChange={(value) =>
                                updateSetting(
                                    "workspaceName",
                                    value
                                )
                            }
                        />

                        <InputField
                            label="Workspace description"
                            value={settings.workspaceDescription}
                            onChange={(value) =>
                                updateSetting(
                                    "workspaceDescription",
                                    value
                                )
                            }
                        />
                    </div>
                </SettingsSection>

                {/* NOTIFICATIONS */}

                <SettingsSection
                    icon={<Bell size={18} />}
                    title="Notifications"
                    description="Choose which workspace updates you want to receive."
                >
                    <div className="divide-y divide-[#e8edeb]">
                        <ToggleRow
                            title="Email notifications"
                            description="Receive important workspace notifications by email."
                            checked={
                                settings.emailNotifications
                            }
                            onChange={(value) =>
                                updateSetting(
                                    "emailNotifications",
                                    value
                                )
                            }
                        />

                        <ToggleRow
                            title="Task reminders"
                            description="Get reminders when task deadlines are approaching."
                            checked={
                                settings.taskReminders
                            }
                            onChange={(value) =>
                                updateSetting(
                                    "taskReminders",
                                    value
                                )
                            }
                        />

                        <ToggleRow
                            title="Activity updates"
                            description="Receive updates about changes made by your team."
                            checked={
                                settings.activityUpdates
                            }
                            onChange={(value) =>
                                updateSetting(
                                    "activityUpdates",
                                    value
                                )
                            }
                        />

                        <ToggleRow
                            title="Weekly summary"
                            description="Receive a weekly summary of your team's progress."
                            checked={
                                settings.weeklySummary
                            }
                            onChange={(value) =>
                                updateSetting(
                                    "weeklySummary",
                                    value
                                )
                            }
                        />
                    </div>
                </SettingsSection>

                {/* APPEARANCE */}

                <SettingsSection
                    icon={<Palette size={18} />}
                    title="Appearance"
                    description="Customize how Trackly looks for you."
                >
                    <div>
                        <p className="mb-3 text-xs font-medium text-[#527273]">
                            Theme
                        </p>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <ThemeOption
                                title="Light"
                                description="Clean and bright interface."
                                selected={
                                    settings.theme ===
                                    "light"
                                }
                                onClick={() =>
                                    updateSetting(
                                        "theme",
                                        "light"
                                    )
                                }
                            />

                            <ThemeOption
                                title="Dark"
                                description="A darker interface for low-light environments."
                                selected={
                                    settings.theme ===
                                    "dark"
                                }
                                onClick={() =>
                                    updateSetting(
                                        "theme",
                                        "dark"
                                    )
                                }
                            />
                        </div>
                    </div>
                </SettingsSection>

                {/* REGIONAL */}

                <SettingsSection
                    icon={<Globe size={18} />}
                    title="Regional preferences"
                    description="Set your language and timezone."
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <SelectField
                            label="Language"
                            value={settings.language}
                            options={[
                                "English",
                                "Telugu",
                                "Hindi",
                            ]}
                            onChange={(value) =>
                                updateSetting(
                                    "language",
                                    value
                                )
                            }
                        />

                        <SelectField
                            label="Timezone"
                            value={settings.timezone}
                            options={[
                                "India Standard Time (IST)",
                                "Greenwich Mean Time (GMT)",
                                "Eastern Standard Time (EST)",
                                "Pacific Standard Time (PST)",
                            ]}
                            onChange={(value) =>
                                updateSetting(
                                    "timezone",
                                    value
                                )
                            }
                        />
                    </div>
                </SettingsSection>

                {/* SECURITY */}

                <SettingsSection
                    icon={<Shield size={18} />}
                    title="Security"
                    description="Manage workspace security preferences."
                >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-sm font-medium text-[#29494a]">
                                Workspace access
                            </p>

                            <p className="mt-1 text-xs leading-5 text-[#8a9b9b]">
                                Team members can access projects
                                according to their assigned roles.
                            </p>
                        </div>

                        <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#e7f1ef] px-3 py-2 text-xs font-medium text-[#527273]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#5f9389]" />
                            Protected
                        </span>
                    </div>
                </SettingsSection>

                {/* DANGER ZONE */}

                <section className="rounded-2xl border border-[#eadbd8] bg-[#fffafa] p-5">
                    <div className="flex items-start gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#f8e9e6] text-[#a06f67]">
                            <Trash2 size={17} />
                        </div>

                        <div className="flex-1">
                            <h2 className="text-sm font-semibold text-[#674b47]">
                                Danger zone
                            </h2>

                            <p className="mt-1 text-xs leading-5 text-[#927773]">
                                Reset your local Trackly
                                preferences. This will not delete
                                your projects or tasks.
                            </p>

                            <button
                                type="button"
                                onClick={resetSettings}
                                className="mt-4 rounded-lg border border-[#e5cfcb] px-3 py-2 text-xs font-medium text-[#8b625c] transition hover:bg-[#f9eeec]"
                            >
                                Reset settings
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

/* ---------------- SECTION ---------------- */

function SettingsSection({
    icon,
    title,
    description,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#e1e7e5] bg-[#f9faf9]">
            <div className="flex items-start gap-3 border-b border-[#e5eae9] px-5 py-5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e6f0ee] text-[#315b5d]">
                    {icon}
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-[#29494a]">
                        {title}
                    </h2>

                    <p className="mt-1 text-xs text-[#8a9b9b]">
                        {description}
                    </p>
                </div>
            </div>

            <div className="p-5">{children}</div>
        </section>
    );
}

/* ---------------- INPUT ---------------- */

function InputField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-xs font-medium text-[#527273]">
                {label}
            </span>

            <input
                type="text"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className="h-10 w-full rounded-lg border border-[#dfe7e5] bg-white px-3 text-xs text-[#29494a] outline-none transition placeholder:text-[#a7b3b3] focus:border-[#8eaaaa] focus:ring-2 focus:ring-[#315b5d]/10"
            />
        </label>
    );
}

/* ---------------- SELECT ---------------- */

function SelectField({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-xs font-medium text-[#527273]">
                {label}
            </span>

            <select
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className="h-10 w-full rounded-lg border border-[#dfe7e5] bg-white px-3 text-xs text-[#29494a] outline-none transition focus:border-[#8eaaaa] focus:ring-2 focus:ring-[#315b5d]/10"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}

/* ---------------- TOGGLE ---------------- */

function ToggleRow({
    title,
    description,
    checked,
    onChange,
}: {
    title: string;
    description: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0">
            <div>
                <p className="text-sm font-medium text-[#29494a]">
                    {title}
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-[#8a9b9b]">
                    {description}
                </p>
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`
                    relative h-6 w-11 shrink-0 rounded-full
                    transition-colors duration-200
                    ${checked
                        ? "bg-[#315b5d]"
                        : "bg-[#cbd6d4]"
                    }
                `}
            >
                <span
                    className={`
                        absolute top-1 h-4 w-4 rounded-full
                        bg-white shadow-sm transition-transform
                        ${checked
                            ? "translate-x-6"
                            : "translate-x-1"
                        }
                    `}
                />
            </button>
        </div>
    );
}

/* ---------------- THEME ---------------- */

function ThemeOption({
    title,
    description,
    selected,
    onClick,
}: {
    title: string;
    description: string;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                flex items-center justify-between
                rounded-xl border p-4 text-left
                transition

                ${selected
                    ? "border-[#315b5d] bg-[#edf4f2]"
                    : "border-[#e1e7e5] bg-white hover:border-[#bdcfcc]"
                }
            `}
        >
            <div>
                <p className="text-xs font-semibold text-[#29494a]">
                    {title}
                </p>

                <p className="mt-1 text-[11px] text-[#8a9b9b]">
                    {description}
                </p>
            </div>

            <div
                className={`
                    grid h-5 w-5 place-items-center rounded-full border
                    ${selected
                        ? "border-[#315b5d] bg-[#315b5d] text-white"
                        : "border-[#ccd8d6]"
                    }
                `}
            >
                {selected && <Check size={12} />}
            </div>
        </button>
    );
}

export default Settings;