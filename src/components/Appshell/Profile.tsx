import { useRef, useState } from "react";
import type { ReactNode } from "react";
import {
    Camera,
    Check,
    Mail,
    MapPin,
    Pencil,
    ShieldCheck,
    User,
    X,
} from "lucide-react";

interface ProfileData {
    name: string;
    email: string;
    role: string;
    location: string;
    bio: string;
    avatar: string;
}

const STORAGE_KEY = "trackly-profile";

const defaultProfile: ProfileData = {
    name: "Manasa",
    email: "manasa@example.com",
    role: "Frontend Developer",
    location: "Andhra Pradesh, India",
    bio: "Frontend developer passionate about building clean, useful and user-friendly applications.",
    avatar: "",
};

function getStoredProfile(): ProfileData {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            return {
                ...defaultProfile,
                ...JSON.parse(stored),
            };
        }

        return defaultProfile;
    } catch {
        return defaultProfile;
    }
}

function Profile() {
    const [profile, setProfile] =
        useState<ProfileData>(getStoredProfile);

    const [formData, setFormData] =
        useState<ProfileData>(getStoredProfile);

    const [isEditing, setIsEditing] = useState(false);
    const [saved, setSaved] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const updateField = (
        field: keyof ProfileData,
        value: string
    ) => {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleEdit = () => {
        setFormData(profile);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData(profile);
        setIsEditing(false);
    };

    const handleSave = () => {
        setProfile(formData);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(formData)
        );

        setIsEditing(false);
        setSaved(true);

        window.setTimeout(() => {
            setSaved(false);
        }, 2500);
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Please select an image smaller than 2MB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const image = reader.result;

            if (typeof image === "string") {
                updateField("avatar", image);
            }
        };

        reader.readAsDataURL(file);

        event.target.value = "";
    };

    const handleRemoveAvatar = () => {
        updateField("avatar", "");
    };

    const initials = profile.name
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const currentInitials = formData.name
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="mx-auto max-w-[1000px]">

            {/* PAGE HEADER */}

            <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="text-xs font-medium text-[#789090]">
                        Account
                    </p>

                    <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#29494a]">
                        Profile
                    </h1>

                    <p className="mt-1.5 text-sm text-[#849595]">
                        Manage your personal information and account details.
                    </p>
                </div>

                {!isEditing ? (
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="flex items-center justify-center gap-2 rounded-lg bg-[#214f51] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#183f41]"
                    >
                        <Pencil size={15} />
                        Edit profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center gap-2 rounded-lg border border-[#dfe7e5] bg-white px-4 py-2.5 text-sm font-medium text-[#527273] transition hover:bg-[#f4f7f6]"
                        >
                            <X size={15} />
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex items-center gap-2 rounded-lg bg-[#214f51] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#183f41]"
                        >
                            <Check size={15} />
                            Save changes
                        </button>
                    </div>
                )}
            </section>

            {/* SUCCESS */}

            {saved && (
                <div className="mb-5 flex items-center gap-2 rounded-xl border border-[#cfe0dc] bg-[#edf6f3] px-4 py-3 text-sm font-medium text-[#315b5d]">
                    <Check size={16} />
                    Profile updated successfully.
                </div>
            )}

            {/* MAIN PROFILE CARD */}

            <section className="overflow-hidden rounded-2xl border border-[#dfe7e5] bg-white shadow-[0_4px_20px_rgba(23,63,64,0.04)]">

                {/* COVER */}

                <div className="relative h-[110px] bg-[#214f51]">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#214f51] to-[#315b5d]" />
                </div>

                {/* PROFILE SUMMARY */}

                <div className="relative border-b border-[#e5eae9] px-5 pb-5 sm:px-7">

                    <div className="-mt-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                        {/* AVATAR + NAME */}

                        <div className="flex items-end gap-4">

                            <div className="relative shrink-0">

                                {isEditing ? (
                                    <button
                                        type="button"
                                        onClick={handleAvatarClick}
                                        className="group relative block"
                                        title="Upload profile photo"
                                    >
                                        <div className="h-[76px] w-[76px] overflow-hidden rounded-2xl border-4 border-white bg-[#dbe9e7] shadow-md">
                                            {formData.avatar ? (
                                                <img
                                                    src={formData.avatar}
                                                    alt="Profile"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="grid h-full w-full place-items-center text-xl font-semibold text-[#315b5d]">
                                                    {currentInitials}
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute inset-0 grid place-items-center rounded-2xl bg-black/40 opacity-0 transition group-hover:opacity-100">
                                            <Camera
                                                size={20}
                                                className="text-white"
                                            />
                                        </div>

                                        <div className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#315b5d] text-white shadow-sm">
                                            <Camera size={13} />
                                        </div>
                                    </button>
                                ) : (
                                    <div className="h-[76px] w-[76px] overflow-hidden rounded-2xl border-4 border-white bg-[#dbe9e7] shadow-md">
                                        {profile.avatar ? (
                                            <img
                                                src={profile.avatar}
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="grid h-full w-full place-items-center text-xl font-semibold text-[#315b5d]">
                                                {initials}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                />
                            </div>

                            <div className="pb-1">

                                <h2 className="text-lg font-semibold text-[#29494a]">
                                    {profile.name}
                                </h2>

                                <p className="mt-1 text-xs text-[#849595]">
                                    {profile.role}
                                </p>

                                {isEditing && (
                                    <div className="mt-2 flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={handleAvatarClick}
                                            className="text-[11px] font-medium text-[#315b5d] hover:underline"
                                        >
                                            Change photo
                                        </button>

                                        {formData.avatar && (
                                            <button
                                                type="button"
                                                onClick={handleRemoveAvatar}
                                                className="text-[11px] font-medium text-[#a06060] hover:underline"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* VERIFIED */}

                        <div className="flex w-fit items-center gap-2 rounded-lg bg-[#edf6f3] px-3 py-2 text-[11px] font-medium text-[#527273]">
                            <ShieldCheck size={14} />
                            Account verified
                        </div>
                    </div>
                </div>

                {/* PERSONAL INFORMATION */}

                <div className="p-5 sm:p-7">

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-[#29494a]">
                            Personal information
                        </h3>

                        <p className="mt-1 text-xs text-[#8a9b9b]">
                            Your basic profile information.
                        </p>
                    </div>

                    <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">

                        <ProfileField
                            icon={<User size={15} />}
                            label="Full name"
                            value={formData.name}
                            editing={isEditing}
                            onChange={(value) =>
                                updateField("name", value)
                            }
                        />

                        <ProfileField
                            icon={<Mail size={15} />}
                            label="Email address"
                            value={formData.email}
                            editing={isEditing}
                            onChange={(value) =>
                                updateField("email", value)
                            }
                        />

                        <ProfileField
                            icon={<User size={15} />}
                            label="Job title"
                            value={formData.role}
                            editing={isEditing}
                            onChange={(value) =>
                                updateField("role", value)
                            }
                        />

                        <ProfileField
                            icon={<MapPin size={15} />}
                            label="Location"
                            value={formData.location}
                            editing={isEditing}
                            onChange={(value) =>
                                updateField("location", value)
                            }
                        />
                    </div>

                    {/* ABOUT */}

                    <div className="mt-5">

                        <label className="block">
                            <span className="mb-2 block text-xs font-medium text-[#527273]">
                                About
                            </span>

                            {isEditing ? (
                                <textarea
                                    value={formData.bio}
                                    onChange={(event) =>
                                        updateField(
                                            "bio",
                                            event.target.value
                                        )
                                    }
                                    rows={4}
                                    className="w-full resize-none rounded-lg border border-[#dfe7e5] bg-white px-3 py-3 text-xs leading-5 text-[#29494a] outline-none transition focus:border-[#8eaaaa] focus:ring-2 focus:ring-[#315b5d]/10"
                                />
                            ) : (
                                <div className="rounded-lg border border-[#e5eae9] bg-[#fafcfb] px-3 py-3 text-xs leading-5 text-[#718282]">
                                    {profile.bio}
                                </div>
                            )}
                        </label>
                    </div>
                </div>
            </section>

            {/* ACCOUNT INFORMATION */}

            <section className="mt-5 rounded-2xl border border-[#dfe7e5] bg-white p-5 shadow-[0_4px_20px_rgba(23,63,64,0.03)] sm:p-6">

                <div className="flex items-start gap-3">

                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e8f1ef] text-[#315b5d]">
                        <ShieldCheck size={17} />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-[#29494a]">
                            Account information
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-[#8a9b9b]">
                            Your profile information is currently stored
                            locally. It will be connected to the backend
                            authentication system when Node.js and PostgreSQL
                            are implemented.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ProfileField({
    icon,
    label,
    value,
    editing,
    onChange,
}: {
    icon: ReactNode;
    label: string;
    value: string;
    editing: boolean;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <span className="mb-2 flex items-center gap-1.5 text-xs font-medium text-[#527273]">
                {icon}
                {label}
            </span>

            {editing ? (
                <input
                    type="text"
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    className="h-10 w-full rounded-lg border border-[#dfe7e5] bg-white px-3 text-xs text-[#29494a] outline-none transition focus:border-[#8eaaaa] focus:ring-2 focus:ring-[#315b5d]/10"
                />
            ) : (
                <div className="flex h-10 items-center rounded-lg border border-[#e5eae9] bg-[#fafcfb] px-3 text-xs text-[#718282]">
                    {value}
                </div>
            )}
        </div>
    );
}

export default Profile;