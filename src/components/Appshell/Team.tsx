import { useMemo, useState } from "react";
import {
    BriefcaseBusiness,
    Crown,
    Mail,
    MoreHorizontal,
    Pencil,
    Plus,
    Search,
    ShieldCheck,
    Trash2,
    UserCheck,
    UserPlus,
    Users,
    X,
} from "lucide-react";

/* =====================================================
   TYPES
===================================================== */

type MemberRole =
    | "Admin"
    | "Project Manager"
    | "Developer"
    | "Designer"
    | "Member";

type MemberStatus = "active" | "inactive";

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: MemberRole;
    status: MemberStatus;
    projects: number;
    completedTasks: number;
}

/* =====================================================
   INITIAL DATA
===================================================== */

const initialMembers: TeamMember[] = [
    {
        id: "1",
        name: "Manasa",
        email: "manasa@trackly.com",
        role: "Admin",
        status: "active",
        projects: 4,
        completedTasks: 28,
    },
    {
        id: "2",
        name: "Alex Johnson",
        email: "alex@trackly.com",
        role: "Project Manager",
        status: "active",
        projects: 5,
        completedTasks: 34,
    },
    {
        id: "3",
        name: "Riya Sharma",
        email: "riya@trackly.com",
        role: "Designer",
        status: "active",
        projects: 3,
        completedTasks: 21,
    },
    {
        id: "4",
        name: "David Lee",
        email: "david@trackly.com",
        role: "Developer",
        status: "active",
        projects: 4,
        completedTasks: 31,
    },
    {
        id: "5",
        name: "Sophia Wilson",
        email: "sophia@trackly.com",
        role: "Developer",
        status: "inactive",
        projects: 2,
        completedTasks: 15,
    },
];

/* =====================================================
   MAIN COMPONENT
===================================================== */

function Team() {
    const [members, setMembers] =
        useState<TeamMember[]>(initialMembers);

    const [searchQuery, setSearchQuery] =
        useState("");

    const [roleFilter, setRoleFilter] =
        useState<"all" | MemberRole>("all");

    const [showInviteModal, setShowInviteModal] =
        useState(false);

    const [editingMember, setEditingMember] =
        useState<TeamMember | null>(null);

    /* =====================================================
       FILTERED MEMBERS
    ===================================================== */

    const filteredMembers = useMemo(() => {
        const search =
            searchQuery.toLowerCase().trim();

        return members.filter((member) => {
            const searchMatches =
                !search ||
                member.name
                    .toLowerCase()
                    .includes(search) ||
                member.email
                    .toLowerCase()
                    .includes(search) ||
                member.role
                    .toLowerCase()
                    .includes(search);

            const roleMatches =
                roleFilter === "all" ||
                member.role === roleFilter;

            return (
                searchMatches &&
                roleMatches
            );
        });
    }, [
        members,
        searchQuery,
        roleFilter,
    ]);

    /* =====================================================
       STATISTICS
    ===================================================== */

    const statistics = useMemo(() => {
        const total =
            members.length;

        const active =
            members.filter(
                (member) =>
                    member.status ===
                    "active",
            ).length;

        const admins =
            members.filter(
                (member) =>
                    member.role ===
                    "Admin",
            ).length;

        const managers =
            members.filter(
                (member) =>
                    member.role ===
                    "Project Manager",
            ).length;

        return {
            total,
            active,
            admins,
            managers,
        };
    }, [members]);

    /* =====================================================
       ADD MEMBER
    ===================================================== */

    function addMember(
        member: Omit<
            TeamMember,
            | "id"
            | "projects"
            | "completedTasks"
        >,
    ) {
        const newMember: TeamMember = {
            ...member,
            id: crypto.randomUUID(),
            projects: 0,
            completedTasks: 0,
        };

        setMembers(
            (previousMembers) => [
                ...previousMembers,
                newMember,
            ],
        );

        setShowInviteModal(false);
    }

    /* =====================================================
       UPDATE MEMBER
    ===================================================== */

    function updateMember(
        updatedMember: TeamMember,
    ) {
        setMembers(
            (previousMembers) =>
                previousMembers.map(
                    (member) =>
                        member.id ===
                            updatedMember.id
                            ? updatedMember
                            : member,
                ),
        );

        setEditingMember(null);
    }

    /* =====================================================
       DELETE MEMBER
    ===================================================== */

    function deleteMember(
        memberId: string,
    ) {
        const shouldDelete =
            window.confirm(
                "Are you sure you want to remove this team member?",
            );

        if (!shouldDelete) return;

        setMembers(
            (previousMembers) =>
                previousMembers.filter(
                    (member) =>
                        member.id !==
                        memberId,
                ),
        );
    }

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <div className="mx-auto max-w-[1400px]">

            {/* HEADER */}

            <section className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#849595]">
                        Workspace
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#29494a]">
                        Team
                    </h1>

                    <p className="mt-2 text-sm text-[#849595]">
                        Manage your workspace members and collaborate with your team.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        setShowInviteModal(
                            true,
                        )
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#214f51] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#183f41]"
                >
                    <UserPlus size={17} />

                    Invite Member
                </button>

            </section>

            {/* STATISTICS */}

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <TeamStatCard
                    icon={
                        <Users size={19} />
                    }
                    label="Total Members"
                    value={
                        statistics.total
                    }
                />

                <TeamStatCard
                    icon={
                        <UserCheck
                            size={19}
                        />
                    }
                    label="Active Members"
                    value={
                        statistics.active
                    }
                />

                <TeamStatCard
                    icon={
                        <Crown size={19} />
                    }
                    label="Administrators"
                    value={
                        statistics.admins
                    }
                />

                <TeamStatCard
                    icon={
                        <BriefcaseBusiness
                            size={19}
                        />
                    }
                    label="Project Managers"
                    value={
                        statistics.managers
                    }
                />

            </section>

            {/* SEARCH + FILTER */}

            <section className="mt-7 rounded-2xl border border-[#e1e7e5] bg-[#f9faf9] p-4">

                <div className="flex flex-col gap-3 md:flex-row">

                    <div className="relative flex-1">

                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9b9b]"
                        />

                        <input
                            value={
                                searchQuery
                            }
                            onChange={(
                                event,
                            ) =>
                                setSearchQuery(
                                    event.target
                                        .value,
                                )
                            }
                            placeholder="Search team members..."
                            className="w-full rounded-xl border border-[#dce4e2] bg-white py-2.5 pl-10 pr-4 text-sm text-[#29494a] outline-none placeholder:text-[#a7b3b3] focus:border-[#527273]"
                        />

                    </div>

                    <select
                        value={
                            roleFilter
                        }
                        onChange={(
                            event,
                        ) =>
                            setRoleFilter(
                                event.target
                                    .value as
                                | "all"
                                | MemberRole,
                            )
                        }
                        className="rounded-xl border border-[#dce4e2] bg-white px-4 py-2.5 text-sm text-[#527273] outline-none focus:border-[#527273]"
                    >
                        <option value="all">
                            All Roles
                        </option>

                        <option value="Admin">
                            Admin
                        </option>

                        <option value="Project Manager">
                            Project Manager
                        </option>

                        <option value="Developer">
                            Developer
                        </option>

                        <option value="Designer">
                            Designer
                        </option>

                        <option value="Member">
                            Member
                        </option>

                    </select>

                </div>

                <p className="mt-3 text-xs text-[#849595]">

                    Showing{" "}

                    <span className="font-semibold text-[#527273]">
                        {
                            filteredMembers.length
                        }
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold text-[#527273]">
                        {
                            members.length
                        }
                    </span>

                    {" "}members

                </p>

            </section>

            {/* MEMBERS */}

            <section className="mt-7">

                {filteredMembers.length ===
                    0 ? (

                    <div className="rounded-2xl border border-dashed border-[#d6dfdc] bg-[#fafbfa] px-6 py-16 text-center">

                        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#e6f0ee] text-[#315b5d]">
                            <Users size={22} />
                        </div>

                        <h2 className="mt-5 text-lg font-semibold text-[#29494a]">
                            No team members found
                        </h2>

                        <p className="mt-2 text-sm text-[#849595]">
                            Try changing your search or invite a new member.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                        {filteredMembers.map(
                            (member) => (

                                <TeamMemberCard
                                    key={
                                        member.id
                                    }
                                    member={
                                        member
                                    }
                                    onEdit={() =>
                                        setEditingMember(
                                            member,
                                        )
                                    }
                                    onDelete={() =>
                                        deleteMember(
                                            member.id,
                                        )
                                    }
                                />

                            ),
                        )}

                    </div>

                )}

            </section>

            {/* INVITE MODAL */}

            {showInviteModal && (

                <InviteMemberModal
                    onClose={() =>
                        setShowInviteModal(
                            false,
                        )
                    }
                    onInvite={
                        addMember
                    }
                />

            )}

            {/* EDIT MODAL */}

            {editingMember && (

                <EditMemberModal
                    member={
                        editingMember
                    }
                    onClose={() =>
                        setEditingMember(
                            null,
                        )
                    }
                    onSave={
                        updateMember
                    }
                />

            )}

        </div>
    );
}

/* =====================================================
   STAT CARD
===================================================== */

function TeamStatCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
}) {
    return (
        <div className="rounded-2xl border border-[#e1e7e5] bg-[#f9faf9] p-5">

            <div className="flex items-center justify-between">

                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e6f0ee] text-[#315b5d]">
                    {icon}
                </div>

                <p className="text-2xl font-semibold text-[#29494a]">
                    {value}
                </p>

            </div>

            <p className="mt-4 text-sm text-[#849595]">
                {label}
            </p>

        </div>
    );
}

/* =====================================================
   TEAM MEMBER CARD
===================================================== */

function TeamMemberCard({
    member,
    onEdit,
    onDelete,
}: {
    member: TeamMember;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const [showMenu, setShowMenu] =
        useState(false);

    const initials =
        member.name
            .split(" ")
            .map(
                (part) =>
                    part.charAt(0),
            )
            .join("")
            .slice(0, 2)
            .toUpperCase();

    const roleStyles: Record<
        MemberRole,
        string
    > = {
        Admin:
            "bg-[#e2ecea] text-[#315b5d]",

        "Project Manager":
            "bg-[#e8edf6] text-[#52658c]",

        Developer:
            "bg-[#e7f0ec] text-[#4c8774]",

        Designer:
            "bg-[#f4eaf3] text-[#9a5f90]",

        Member:
            "bg-[#f1efea] text-[#7d725e]",
    };

    return (
        <div className="relative rounded-2xl border border-[#e1e7e5] bg-[#f9faf9] p-5 transition hover:-translate-y-0.5 hover:shadow-md">

            {/* TOP */}

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#dcebea] text-sm font-semibold text-[#315b5d]">
                        {initials}
                    </div>

                    <div>

                        <h3 className="text-sm font-semibold text-[#29494a]">
                            {member.name}
                        </h3>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-[#849595]">

                            <Mail
                                size={12}
                            />

                            <span className="max-w-[150px] truncate">
                                {
                                    member.email
                                }
                            </span>

                        </div>

                    </div>

                </div>

                <button
                    type="button"
                    onClick={() =>
                        setShowMenu(
                            (previous) =>
                                !previous,
                        )
                    }
                    className="rounded-lg p-1.5 text-[#849595] transition hover:bg-[#edf1f0]"
                >
                    <MoreHorizontal
                        size={18}
                    />
                </button>

                {showMenu && (

                    <div className="absolute right-5 top-14 z-10 w-36 rounded-xl border border-[#e1e7e5] bg-white p-1.5 shadow-lg">

                        <button
                            type="button"
                            onClick={() => {
                                setShowMenu(
                                    false,
                                );

                                onEdit();
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-[#527273] transition hover:bg-[#eef2f1]"
                        >
                            <Pencil
                                size={14}
                            />

                            Edit
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setShowMenu(
                                    false,
                                );

                                onDelete();
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-[#c65b50] transition hover:bg-[#fde8e4]"
                        >
                            <Trash2
                                size={14}
                            />

                            Remove
                        </button>

                    </div>

                )}

            </div>

            {/* ROLE */}

            <div className="mt-5 flex items-center justify-between gap-3">

                <span
                    className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold ${roleStyles[
                        member.role
                    ]
                        }`}
                >
                    {member.role}
                </span>

                <span className="flex items-center gap-1.5 text-[10px] font-medium text-[#718282]">

                    <span
                        className={`h-2 w-2 rounded-full ${member.status ===
                            "active"
                            ? "bg-[#4c8774]"
                            : "bg-[#b0b8b6]"
                            }`}
                    />

                    {member.status ===
                        "active"
                        ? "Active"
                        : "Inactive"}

                </span>

            </div>

            {/* STATS */}

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#e6ece9] pt-5">

                <div>

                    <p className="text-[10px] uppercase tracking-wider text-[#8a9b9b]">
                        Projects
                    </p>

                    <p className="mt-1 text-lg font-semibold text-[#29494a]">
                        {
                            member.projects
                        }
                    </p>

                </div>

                <div>

                    <p className="text-[10px] uppercase tracking-wider text-[#8a9b9b]">
                        Completed
                    </p>

                    <p className="mt-1 text-lg font-semibold text-[#29494a]">
                        {
                            member.completedTasks
                        }
                    </p>

                </div>

            </div>

        </div>
    );
}

/* =====================================================
   INVITE MEMBER MODAL
===================================================== */

function InviteMemberModal({
    onClose,
    onInvite,
}: {
    onClose: () => void;
    onInvite: (
        member: Omit<
            TeamMember,
            | "id"
            | "projects"
            | "completedTasks"
        >,
    ) => void;
}) {
    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [role, setRole] =
        useState<MemberRole>(
            "Member",
        );

    function handleSubmit(
        event: React.FormEvent,
    ) {
        event.preventDefault();

        if (
            !name.trim() ||
            !email.trim()
        ) {
            return;
        }

        onInvite({
            name:
                name.trim(),
            email:
                email.trim(),
            role,
            status:
                "active",
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#163536]/30 p-4 backdrop-blur-sm">

            <form
                onSubmit={
                    handleSubmit
                }
                className="w-full max-w-md rounded-2xl bg-[#f9faf9] p-6 shadow-2xl"
            >

                {/* HEADER */}

                <div className="flex items-start justify-between">

                    <div>

                        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#849595]">
                            Workspace
                        </p>

                        <h2 className="mt-2 text-xl font-semibold text-[#29494a]">
                            Invite Team Member
                        </h2>

                        <p className="mt-2 text-sm text-[#849595]">
                            Add a new member to your workspace.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        className="grid h-9 w-9 place-items-center rounded-lg text-[#718282] transition hover:bg-[#edf1f0]"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* NAME */}

                <div className="mt-6">

                    <label className="text-xs font-medium text-[#527273]">
                        Full Name
                    </label>

                    <input
                        autoFocus
                        value={
                            name
                        }
                        onChange={(
                            event,
                        ) =>
                            setName(
                                event.target
                                    .value,
                            )
                        }
                        placeholder="Enter member name"
                        className="mt-2 w-full rounded-xl border border-[#dce4e2] bg-white px-4 py-3 text-sm text-[#29494a] outline-none placeholder:text-[#a7b3b3] focus:border-[#527273]"
                    />

                </div>

                {/* EMAIL */}

                <div className="mt-5">

                    <label className="text-xs font-medium text-[#527273]">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={
                            email
                        }
                        onChange={(
                            event,
                        ) =>
                            setEmail(
                                event.target
                                    .value,
                            )
                        }
                        placeholder="Enter email address"
                        className="mt-2 w-full rounded-xl border border-[#dce4e2] bg-white px-4 py-3 text-sm text-[#29494a] outline-none placeholder:text-[#a7b3b3] focus:border-[#527273]"
                    />

                </div>

                {/* ROLE */}

                <div className="mt-5">

                    <label className="text-xs font-medium text-[#527273]">
                        Role
                    </label>

                    <select
                        value={
                            role
                        }
                        onChange={(
                            event,
                        ) =>
                            setRole(
                                event.target
                                    .value as MemberRole,
                            )
                        }
                        className="mt-2 w-full rounded-xl border border-[#dce4e2] bg-white px-4 py-3 text-sm text-[#29494a] outline-none focus:border-[#527273]"
                    >

                        <option value="Admin">
                            Admin
                        </option>

                        <option value="Project Manager">
                            Project Manager
                        </option>

                        <option value="Developer">
                            Developer
                        </option>

                        <option value="Designer">
                            Designer
                        </option>

                        <option value="Member">
                            Member
                        </option>

                    </select>

                </div>

                {/* ACTIONS */}

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#718282] transition hover:bg-[#edf1f0]"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-xl bg-[#214f51] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#183f41]"
                    >
                        <Plus
                            size={16}
                        />

                        Invite Member
                    </button>

                </div>

            </form>
        </div>
    );
}

/* =====================================================
   EDIT MEMBER MODAL
===================================================== */

function EditMemberModal({
    member,
    onClose,
    onSave,
}: {
    member: TeamMember;
    onClose: () => void;
    onSave: (
        member: TeamMember,
    ) => void;
}) {
    const [name, setName] =
        useState(
            member.name,
        );

    const [email, setEmail] =
        useState(
            member.email,
        );

    const [role, setRole] =
        useState<MemberRole>(
            member.role,
        );

    const [status, setStatus] =
        useState<MemberStatus>(
            member.status,
        );

    function handleSubmit(
        event: React.FormEvent,
    ) {
        event.preventDefault();

        if (
            !name.trim() ||
            !email.trim()
        ) {
            return;
        }

        onSave({
            ...member,
            name:
                name.trim(),
            email:
                email.trim(),
            role,
            status,
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#163536]/30 p-4 backdrop-blur-sm">

            <form
                onSubmit={
                    handleSubmit
                }
                className="w-full max-w-md rounded-2xl bg-[#f9faf9] p-6 shadow-2xl"
            >

                {/* HEADER */}

                <div className="flex items-start justify-between">

                    <div>

                        <h2 className="text-xl font-semibold text-[#29494a]">
                            Edit Member
                        </h2>

                        <p className="mt-2 text-sm text-[#849595]">
                            Update team member information.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        className="grid h-9 w-9 place-items-center rounded-lg text-[#718282] transition hover:bg-[#edf1f0]"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* NAME */}

                <div className="mt-6">

                    <label className="text-xs font-medium text-[#527273]">
                        Full Name
                    </label>

                    <input
                        value={
                            name
                        }
                        onChange={(
                            event,
                        ) =>
                            setName(
                                event.target
                                    .value,
                            )
                        }
                        className="mt-2 w-full rounded-xl border border-[#dce4e2] bg-white px-4 py-3 text-sm text-[#29494a] outline-none focus:border-[#527273]"
                    />

                </div>

                {/* EMAIL */}

                <div className="mt-5">

                    <label className="text-xs font-medium text-[#527273]">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={
                            email
                        }
                        onChange={(
                            event,
                        ) =>
                            setEmail(
                                event.target
                                    .value,
                            )
                        }
                        className="mt-2 w-full rounded-xl border border-[#dce4e2] bg-white px-4 py-3 text-sm text-[#29494a] outline-none focus:border-[#527273]"
                    />

                </div>

                {/* ROLE + STATUS */}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                    <div>

                        <label className="text-xs font-medium text-[#527273]">
                            Role
                        </label>

                        <select
                            value={
                                role
                            }
                            onChange={(
                                event,
                            ) =>
                                setRole(
                                    event.target
                                        .value as MemberRole,
                                )
                            }
                            className="mt-2 w-full rounded-xl border border-[#dce4e2] bg-white px-4 py-3 text-sm text-[#29494a] outline-none focus:border-[#527273]"
                        >

                            <option value="Admin">
                                Admin
                            </option>

                            <option value="Project Manager">
                                Project Manager
                            </option>

                            <option value="Developer">
                                Developer
                            </option>

                            <option value="Designer">
                                Designer
                            </option>

                            <option value="Member">
                                Member
                            </option>

                        </select>

                    </div>

                    <div>

                        <label className="text-xs font-medium text-[#527273]">
                            Status
                        </label>

                        <select
                            value={
                                status
                            }
                            onChange={(
                                event,
                            ) =>
                                setStatus(
                                    event.target
                                        .value as MemberStatus,
                                )
                            }
                            className="mt-2 w-full rounded-xl border border-[#dce4e2] bg-white px-4 py-3 text-sm text-[#29494a] outline-none focus:border-[#527273]"
                        >

                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>

                        </select>

                    </div>

                </div>

                {/* ACTIONS */}

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#718282] transition hover:bg-[#edf1f0]"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-xl bg-[#214f51] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#183f41]"
                    >
                        <ShieldCheck
                            size={16}
                        />

                        Save Changes
                    </button>

                </div>

            </form>
        </div>
    );
}

export default Team;