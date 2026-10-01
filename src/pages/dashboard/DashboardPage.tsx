import {
  ArrowRight,
  Bell,
  BookOpen,
  CheckCircle2,
  Clock3,
  Menu,
  Settings,
  Target,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { WORKSPACE_NAVIGATION } from "../../components/workspace/workspaceNavigation";
import { useAuthStore } from "../../store/authStore";
import "./DashboardPage.css";

const tasks = [
  {
    title: "Complete React Hooks lesson",
    category: "React",
    priority: "High",
    status: "In Progress",
  },
  {
    title: "Review JavaScript ES6+",
    category: "JavaScript",
    priority: "Medium",
    status: "Pending",
  },
  {
    title: "Watch React Router video",
    category: "Routing",
    priority: "Medium",
    status: "Pending",
  },
  {
    title: "Prepare Dashboard wireframe",
    category: "Project",
    priority: "High",
    status: "Done",
  },
];

const resources = [
  {
    title: "React Basics Guide",
    category: "React",
    description: "Build a strong foundation with React fundamentals.",
  },
  {
    title: "JavaScript ES6+ Handbook",
    category: "JavaScript",
    description: "Review modern JavaScript syntax and concepts.",
  },
  {
    title: "CSS Flexbox & Grid",
    category: "CSS",
    description: "Create responsive layouts with modern CSS.",
  },
];

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Target;
}) {
  return (
    <article className="dashboard-stat-card">
      <div className="dashboard-stat-icon">
        <Icon size={19} strokeWidth={1.8} />
      </div>

      <div className="dashboard-stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
    </article>
  );
}

export default function DashboardPage() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const displayName = user?.fullName || user?.email || "CareerQuest User";
  const firstName = displayName.split(/\s+/)[0];
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const filteredTasks =
    activeTab === "All"
      ? tasks
      : tasks.filter((task) => task.status === activeTab);

  return (
    <div className="dashboard-page">
      {/* SIDEBAR */}
      <aside
        className={`dashboard-sidebar ${
          sidebarOpen ? "dashboard-sidebar-open" : ""
        }`}
      >
        <div className="dashboard-sidebar-top">
          <Link to="/" className="dashboard-brand">
            <span className="dashboard-brand-mark">CQ</span>

            <span className="dashboard-brand-name">
              Career<span>Quest</span>
            </span>
          </Link>

          <div className="dashboard-workspace-label">WORKSPACE</div>

          <nav className="dashboard-nav">
            {WORKSPACE_NAVIGATION.map((item) => {
              const Icon = item.icon;
              const active =
                location.pathname === item.path ||
                (item.path !== "/dashboard" &&
                  location.pathname.startsWith(`${item.path}/`));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`dashboard-nav-link ${
                    active ? "dashboard-nav-active" : ""
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="dashboard-sidebar-bottom">
          <Link to="/profile" className="dashboard-nav-link">
            <UserRound size={18} strokeWidth={1.8} />
            <span>Profile</span>
          </Link>

          <Link to="/settings" className="dashboard-nav-link">
            <Settings size={18} strokeWidth={1.8} />
            <span>Settings</span>
          </Link>

          <Link to="/" className="dashboard-nav-link">
            <ArrowRight size={18} strokeWidth={1.8} />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="dashboard-overlay"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <main className="dashboard-main">
        {/* TOPBAR */}
        <header className="dashboard-topbar">
          <div className="dashboard-topbar-left">
            <button
              className="dashboard-mobile-menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="dashboard-search">
              <span>⌕</span>
              <input placeholder="Search anything..." />
            </div>
          </div>

          <div className="dashboard-topbar-right">
            <button className="dashboard-notification" aria-label="Notifications">
              <Bell size={19} strokeWidth={1.8} />
              <i />
            </button>

            <div className="dashboard-user">
              <div className="dashboard-avatar">{initials || "CQ"}</div>

              <div className="dashboard-user-info">
                <strong>{displayName}</strong>
                <span>CareerQuest Member</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* HERO */}
          <section className="dashboard-hero">
            <div>
              <span className="dashboard-eyebrow">STUDENT DASHBOARD</span>

              <h1>
                Good morning,
                <br />
                <span>{firstName}.</span>
              </h1>

              <p>
                Keep building your skills and stay on track
                <br className="dashboard-desktop-break" />
                with your learning journey.
              </p>
            </div>

            <Link to="/roadmap" className="dashboard-primary-button">
              Continue learning
              <ArrowRight size={17} />
            </Link>
          </section>

          {/* STATS */}
          <section className="dashboard-stats">
            <StatCard
              label="Today's Progress"
              value="8/12"
              detail="tasks completed"
              icon={CheckCircle2}
            />

            <StatCard
              label="Learning Progress"
              value="67%"
              detail="Front-End Track"
              icon={TrendingUp}
            />

            <StatCard
              label="Recent Tasks"
              value="3"
              detail="tasks remaining"
              icon={Clock3}
            />

            <StatCard
              label="Learning Hours"
              value="24.5"
              detail="this month"
              icon={BookOpen}
            />
          </section>

          {/* MAIN GRID */}
          <section className="dashboard-grid">
            {/* TASKS */}
            <article className="dashboard-card dashboard-tasks-card">
              <div className="dashboard-card-header">
                <div>
                  <span className="dashboard-card-eyebrow">YOUR WORK</span>
                  <h2>Recent Tasks</h2>
                </div>

                <Link to="/roadmap" className="dashboard-small-button">
                  View roadmap
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="dashboard-tabs">
                {["All", "Pending", "In Progress", "Done"].map((tab) => (
                  <button
                    key={tab}
                    className={activeTab === tab ? "active" : ""}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="dashboard-task-list">
                {filteredTasks.map((task) => (
                  <div className="dashboard-task" key={task.title}>
                    <div
                      className={`dashboard-task-icon ${
                        task.status === "Done" ? "done" : ""
                      }`}
                    >
                      {task.status === "Done" ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        <Clock3 size={17} />
                      )}
                    </div>

                    <div className="dashboard-task-info">
                      <strong>{task.title}</strong>
                      <span>{task.category}</span>
                    </div>

                    <span
                      className={`dashboard-priority ${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>

                    <span
                      className={`dashboard-status ${task.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {task.status}
                    </span>
                  </div>
                ))}

                {filteredTasks.length === 0 && (
                  <div className="dashboard-empty">
                    <CheckCircle2 size={28} />
                    <strong>You're all caught up.</strong>
                    <span>No tasks in this category.</span>
                  </div>
                )}
              </div>

              <Link to="/tasks" className="dashboard-bottom-link">
                View all tasks
                <ArrowRight size={14} />
              </Link>
            </article>

            {/* RIGHT COLUMN */}
            <div className="dashboard-right-column">
              {/* PROGRESS */}
              <article className="dashboard-card dashboard-progress-card">
                <div className="dashboard-card-header">
                  <div>
                    <span className="dashboard-card-eyebrow">
                      YOUR LEARNING
                    </span>
                    <h2>Learning Progress</h2>
                  </div>

                  <strong className="dashboard-percent">67%</strong>
                </div>

                <div className="dashboard-progress-track">
                  <div className="dashboard-progress-fill" />
                </div>

                <div className="dashboard-progress-labels">
                  <span>Front-End Track</span>
                  <span>React Fundamentals</span>
                </div>

                <p>
                  You're making steady progress. Keep completing your lessons
                  to move through the track.
                </p>

                <Link to="/roadmap" className="dashboard-bottom-link">
                  Continue track
                  <ArrowRight size={14} />
                </Link>
              </article>

              {/* QUICK ACTIONS */}
              <article className="dashboard-card dashboard-actions-card">
                <div className="dashboard-card-header">
                  <div>
                    <span className="dashboard-card-eyebrow">
                      QUICK ACTIONS
                    </span>
                    <h2>What would you like to do?</h2>
                  </div>
                </div>

                <Link to="/assessment" className="dashboard-action">
                  <div className="dashboard-action-icon">
                    <Target size={18} />
                  </div>

                  <div>
                    <strong>Take Assessment</strong>
                    <span>Continue your career assessment</span>
                  </div>

                  <ArrowRight size={16} />
                </Link>

                <Link to="/resources" className="dashboard-action">
                  <div className="dashboard-action-icon">
                    <BookOpen size={18} />
                  </div>

                  <div>
                    <strong>Browse Resources</strong>
                    <span>Explore learning materials</span>
                  </div>

                  <ArrowRight size={16} />
                </Link>
              </article>
            </div>
          </section>

          {/* RESOURCES */}
          <section className="dashboard-card dashboard-resources-card">
            <div className="dashboard-card-header">
              <div>
                <span className="dashboard-card-eyebrow">KEEP LEARNING</span>
                <h2>Recommended Resources</h2>
              </div>

              <Link to="/resources" className="dashboard-small-button">
                View all
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="dashboard-resource-grid">
              {resources.map((resource) => (
                <article
                  className="dashboard-resource"
                  key={resource.title}
                >
                  <div className="dashboard-resource-top">
                    <div className="dashboard-resource-icon">
                      <BookOpen size={18} />
                    </div>

                    <span>{resource.category}</span>
                  </div>

                  <h3>{resource.title}</h3>

                  <p>{resource.description}</p>

                  <Link to="/resources">
                    Explore resource
                    <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}