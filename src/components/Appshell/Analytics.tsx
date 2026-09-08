import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    CheckCircle2,
    Clock3,
    FolderKanban,
    Target,
    TrendingUp,
} from "lucide-react";

import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

/* =====================================================
   DATA
===================================================== */

const weeklyProductivity = [
    {
        day: "Mon",
        completed: 12,
        created: 8,
    },
    {
        day: "Tue",
        completed: 18,
        created: 11,
    },
    {
        day: "Wed",
        completed: 14,
        created: 16,
    },
    {
        day: "Thu",
        completed: 22,
        created: 13,
    },
    {
        day: "Fri",
        completed: 26,
        created: 17,
    },
    {
        day: "Sat",
        completed: 10,
        created: 6,
    },
    {
        day: "Sun",
        completed: 7,
        created: 4,
    },
];

const taskStatusData = [
    {
        name: "To Do",
        value: 18,
        color: "#c7d6d2",
    },
    {
        name: "In Progress",
        value: 24,
        color: "#789a96",
    },
    {
        name: "Completed",
        value: 58,
        color: "#315b5d",
    },
];

const priorityData = [
    {
        name: "High",
        tasks: 18,
    },
    {
        name: "Medium",
        tasks: 34,
    },
    {
        name: "Low",
        tasks: 48,
    },
];

const projectPerformance = [
    {
        name: "Website Redesign",
        progress: 82,
        tasks: 32,
    },
    {
        name: "Mobile Application",
        progress: 68,
        tasks: 24,
    },
    {
        name: "Marketing Campaign",
        progress: 54,
        tasks: 18,
    },
    {
        name: "Dashboard System",
        progress: 39,
        tasks: 14,
    },
];

/* =====================================================
   MAIN COMPONENT
===================================================== */

function Analytics() {
    return (
        <div className="mx-auto max-w-[1400px]">

            {/* =====================================================
               HEADER
            ===================================================== */}

            <section className="mb-8">

                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#849595]">
                    Workspace Insights
                </p>

                <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

                    <div>

                        <h1 className="text-3xl font-semibold tracking-tight text-[#29494a]">
                            Analytics
                        </h1>

                        <p className="mt-2 text-sm text-[#849595]">
                            Understand your productivity and project performance.
                        </p>

                    </div>

                    <select className="rounded-xl border border-[#dce4e2] bg-white px-4 py-2.5 text-sm text-[#527273] outline-none focus:border-[#527273]">

                        <option>
                            Last 7 days
                        </option>

                        <option>
                            Last 30 days
                        </option>

                        <option>
                            Last 3 months
                        </option>

                    </select>

                </div>

            </section>

            {/* =====================================================
               OVERVIEW CARDS
            ===================================================== */}

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <AnalyticsCard
                    title="Completion Rate"
                    value="78%"
                    change="+12.4%"
                    positive
                    icon={
                        <Target size={19} />
                    }
                />

                <AnalyticsCard
                    title="Tasks Completed"
                    value="128"
                    change="+18 this month"
                    positive
                    icon={
                        <CheckCircle2 size={19} />
                    }
                />

                <AnalyticsCard
                    title="Avg. Completion Time"
                    value="2.8d"
                    change="-0.6 days"
                    positive
                    icon={
                        <Clock3 size={19} />
                    }
                />

                <AnalyticsCard
                    title="Active Projects"
                    value="6"
                    change="2 finishing soon"
                    icon={
                        <FolderKanban size={19} />
                    }
                />

            </section>

            {/* =====================================================
               PRODUCTIVITY CHART
            ===================================================== */}

            <section className="mt-6 rounded-2xl border border-[#e1e7e5] bg-[#f9faf9] p-5 lg:p-6">

                <div className="flex items-start justify-between">

                    <div>

                        <div className="flex items-center gap-2">

                            <Activity
                                size={18}
                                className="text-[#315b5d]"
                            />

                            <h2 className="text-sm font-semibold text-[#29494a]">
                                Weekly Productivity
                            </h2>

                        </div>

                        <p className="mt-1 text-xs text-[#849595]">
                            Completed tasks compared with newly created tasks.
                        </p>

                    </div>

                    <div className="hidden items-center gap-4 text-xs text-[#849595] sm:flex">

                        <div className="flex items-center gap-2">

                            <span className="h-2 w-2 rounded-full bg-[#315b5d]" />

                            Completed

                        </div>

                        <div className="flex items-center gap-2">

                            <span className="h-2 w-2 rounded-full bg-[#b8c9c6]" />

                            Created

                        </div>

                    </div>

                </div>

                <div className="mt-8 h-[300px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <AreaChart
                            data={
                                weeklyProductivity
                            }
                        >

                            <defs>

                                <linearGradient
                                    id="completedGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >

                                    <stop
                                        offset="0%"
                                        stopColor="#315b5d"
                                        stopOpacity={0.35}
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#315b5d"
                                        stopOpacity={0}
                                    />

                                </linearGradient>

                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={
                                    false
                                }
                                stroke="#e4ebe8"
                            />

                            <XAxis
                                dataKey="day"
                                axisLine={
                                    false
                                }
                                tickLine={
                                    false
                                }
                                tick={{
                                    fontSize: 11,
                                    fill: "#849595",
                                }}
                            />

                            <YAxis
                                axisLine={
                                    false
                                }
                                tickLine={
                                    false
                                }
                                tick={{
                                    fontSize: 11,
                                    fill: "#849595",
                                }}
                            />

                            <Tooltip />

                            <Area
                                type="monotone"
                                dataKey="completed"
                                stroke="#315b5d"
                                strokeWidth={3}
                                fill="url(#completedGradient)"
                            />

                            <Area
                                type="monotone"
                                dataKey="created"
                                stroke="#b8c9c6"
                                strokeWidth={2}
                                fill="transparent"
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </div>

            </section>

            {/* =====================================================
               SECOND ROW
            ===================================================== */}

            <section className="mt-6 grid gap-6 xl:grid-cols-2">

                {/* TASK STATUS */}

                <div className="rounded-2xl border border-[#e1e7e5] bg-[#f9faf9] p-5 lg:p-6">

                    <div>

                        <h2 className="text-sm font-semibold text-[#29494a]">
                            Task Distribution
                        </h2>

                        <p className="mt-1 text-xs text-[#849595]">
                            Current task status across your workspace.
                        </p>

                    </div>

                    <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">

                        <div className="h-[240px] w-full sm:w-1/2">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <PieChart>

                                    <Pie
                                        data={
                                            taskStatusData
                                        }
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={
                                            60
                                        }
                                        outerRadius={
                                            90
                                        }
                                        paddingAngle={
                                            4
                                        }
                                    >

                                        {taskStatusData.map(
                                            (
                                                entry,
                                            ) => (

                                                <Cell
                                                    key={
                                                        entry.name
                                                    }
                                                    fill={
                                                        entry.color
                                                    }
                                                />

                                            ),
                                        )}

                                    </Pie>

                                    <Tooltip />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                        <div className="w-full space-y-4 sm:w-1/2">

                            {taskStatusData.map(
                                (
                                    item,
                                ) => (

                                    <div
                                        key={
                                            item.name
                                        }
                                        className="flex items-center justify-between"
                                    >

                                        <div className="flex items-center gap-2">

                                            <span
                                                className="h-2.5 w-2.5 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        item.color,
                                                }}
                                            />

                                            <span className="text-xs text-[#718282]">
                                                {
                                                    item.name
                                                }
                                            </span>

                                        </div>

                                        <span className="text-sm font-semibold text-[#29494a]">
                                            {
                                                item.value
                                            }%
                                        </span>

                                    </div>

                                ),
                            )}

                        </div>

                    </div>

                </div>

                {/* PRIORITY */}

                <div className="rounded-2xl border border-[#e1e7e5] bg-[#f9faf9] p-5 lg:p-6">

                    <div>

                        <h2 className="text-sm font-semibold text-[#29494a]">
                            Tasks by Priority
                        </h2>

                        <p className="mt-1 text-xs text-[#849595]">
                            See where your team's attention is focused.
                        </p>

                    </div>

                    <div className="mt-7 h-[240px]">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart
                                data={
                                    priorityData
                                }
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={
                                        false
                                    }
                                    stroke="#e4ebe8"
                                />

                                <XAxis
                                    dataKey="name"
                                    axisLine={
                                        false
                                    }
                                    tickLine={
                                        false
                                    }
                                    tick={{
                                        fontSize: 11,
                                        fill: "#849595",
                                    }}
                                />

                                <YAxis
                                    axisLine={
                                        false
                                    }
                                    tickLine={
                                        false
                                    }
                                    tick={{
                                        fontSize: 11,
                                        fill: "#849595",
                                    }}
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="tasks"
                                    radius={[
                                        6,
                                        6,
                                        0,
                                        0,
                                    ]}
                                    fill="#315b5d"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </section>

            {/* =====================================================
               PROJECT PERFORMANCE
            ===================================================== */}

            <section className="mt-6 rounded-2xl border border-[#e1e7e5] bg-[#f9faf9] p-5 lg:p-6">

                <div className="flex items-center justify-between">

                    <div>

                        <div className="flex items-center gap-2">

                            <BarChart3
                                size={18}
                                className="text-[#315b5d]"
                            />

                            <h2 className="text-sm font-semibold text-[#29494a]">
                                Project Performance
                            </h2>

                        </div>

                        <p className="mt-1 text-xs text-[#849595]">
                            Progress across your active projects.
                        </p>

                    </div>

                    <TrendingUp
                        size={20}
                        className="text-[#315b5d]"
                    />

                </div>

                <div className="mt-7 space-y-6">

                    {projectPerformance.map(
                        (
                            project,
                        ) => (

                            <div
                                key={
                                    project.name
                                }
                            >

                                <div className="flex items-center justify-between gap-4">

                                    <div>

                                        <p className="text-sm font-medium text-[#29494a]">
                                            {
                                                project.name
                                            }
                                        </p>

                                        <p className="mt-1 text-xs text-[#849595]">
                                            {
                                                project.tasks
                                            } tasks
                                        </p>

                                    </div>

                                    <span className="text-sm font-semibold text-[#315b5d]">
                                        {
                                            project.progress
                                        }%
                                    </span>

                                </div>

                                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e4ebe8]">

                                    <div
                                        className="h-full rounded-full bg-[#315b5d] transition-all"
                                        style={{
                                            width: `${project.progress}%`,
                                        }}
                                    />

                                </div>

                            </div>

                        ),
                    )}

                </div>

            </section>

            {/* =====================================================
               INSIGHTS
            ===================================================== */}

            <section className="mt-6 grid gap-6 xl:grid-cols-3">

                <InsightCard
                    icon={
                        <TrendingUp
                            size={19}
                        />
                    }
                    title="Productivity is improving"
                    description="Your team completed 18% more tasks compared to the previous period."
                    positive
                />

                <InsightCard
                    icon={
                        <Target
                            size={19}
                        />
                    }
                    title="Strong completion rate"
                    description="78% of tasks were completed within their planned deadlines."
                />

                <InsightCard
                    icon={
                        <Clock3
                            size={19}
                        />
                    }
                    title="Focus on active tasks"
                    description="24 tasks are currently in progress and need continued attention."
                />

            </section>

        </div>
    );
}

/* =====================================================
   ANALYTICS CARD
===================================================== */

function AnalyticsCard({
    title,
    value,
    change,
    icon,
    positive = false,
}: {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    positive?: boolean;
}) {
    return (
        <div className="rounded-2xl border border-[#e1e7e5] bg-[#f9faf9] p-5 transition hover:-translate-y-0.5 hover:shadow-sm">

            <div className="flex items-center justify-between">

                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e6f0ee] text-[#315b5d]">
                    {icon}
                </div>

                {positive ? (
                    <ArrowUpRight
                        size={17}
                        className="text-[#4c8774]"
                    />
                ) : (
                    <ArrowDownRight
                        size={17}
                        className="text-[#849595]"
                    />
                )}

            </div>

            <p className="mt-5 text-xs text-[#849595]">
                {title}
            </p>

            <p className="mt-1 text-2xl font-semibold text-[#29494a]">
                {value}
            </p>

            <p className="mt-2 text-[10px] text-[#849595]">
                {change}
            </p>

        </div>
    );
}

/* =====================================================
   INSIGHT CARD
===================================================== */

function InsightCard({
    icon,
    title,
    description,
    positive = false,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    positive?: boolean;
}) {
    return (
        <div className="rounded-2xl border border-[#e1e7e5] bg-[#f9faf9] p-5">

            <div
                className={`grid h-10 w-10 place-items-center rounded-xl ${positive
                        ? "bg-[#dceee8] text-[#4c8774]"
                        : "bg-[#e6f0ee] text-[#315b5d]"
                    }`}
            >
                {icon}
            </div>

            <h3 className="mt-5 text-sm font-semibold text-[#29494a]">
                {title}
            </h3>

            <p className="mt-2 text-xs leading-6 text-[#849595]">
                {description}
            </p>

        </div>
    );
}

export default Analytics;