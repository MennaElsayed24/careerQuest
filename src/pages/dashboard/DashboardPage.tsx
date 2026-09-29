
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Compass,
  Flame,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Target,
  TrendingUp,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "Career Explorer", path: "/careers", icon: Compass },
  { label: "My Assessment", path: "/assessment", icon: Target },
  { label: "Skill Gap", path: "/skill-gap", icon: ChartNoAxesCombined },
  { label: "My Roadmap", path: "/roadmap", icon: TrendingUp },
  { label: "Learning Resources", path: "/resources", icon: BookOpen },
];

const activities = [
  {
    title: "Assessment completed",
    description: "Your career profile is ready to explore.",
    time: "Today, 10:42 AM",
    icon: CheckCircle2,
    color: "#16a34a",
    background: "#dcfce7",
  },
  {
    title: "New career match",
    description: "Frontend Engineer matches your interests.",
    time: "Yesterday",
    icon: BriefcaseBusiness,
    color: "#6366f1",
    background: "#e0e7ff",
  },
  {
    title: "Learning milestone",
    description: "You completed Introduction to TypeScript.",
    time: "2 days ago",
    icon: BookOpen,
    color: "#d97706",
    background: "#fef3c7",
  },
];

const weeklyProgress = [
  { day: "Mon", value: 35 },
  { day: "Tue", value: 60 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 80 },
  { day: "Fri", value: 55 },
  { day: "Sat", value: 90 },
  { day: "Sun", value: 65 },
];

export default function DashboardPage() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePeriod, setActivePeriod] = useState("Week");

  return (
    <div className="cq-dashboard">
      <style>{`
        .cq-dashboard {
          --cq-primary: #635bdb;
          --cq-primary-light: #eeedff;
          --cq-text: #20213a;
          --cq-muted: #85869b;
          --cq-border: #eeedf3;
          display: flex;
          min-height: 100vh;
          background: #f8f8fc;
          color: var(--cq-text);
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }

        .cq-sidebar {
          width: 250px;
          flex-shrink: 0;
          background: #fff;
          border-right: 1px solid var(--cq-border);
          padding: 27px 18px;
          display: flex;
          flex-direction: column;
          transition: transform .25s ease;
        }

        .cq-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 0 10px;
          margin-bottom: 45px;
          color: var(--cq-text);
          text-decoration: none;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -.8px;
        }

        .cq-brand-mark {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 12px;
          color: white;
          background: linear-gradient(135deg, #766af0, #5549c9);
          font-size: 15px;
          letter-spacing: -1px;
        }

        .cq-nav-label {
          padding: 0 12px;
          margin-bottom: 13px;
          color: #a0a0b2;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .cq-nav {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .cq-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 10px;
          color: #77788e;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: .2s;
        }

        .cq-nav-link:hover {
          background: #f7f6ff;
          color: var(--cq-primary);
        }

        .cq-nav-link.active {
          background: var(--cq-primary-light);
          color: var(--cq-primary);
          font-weight: 700;
        }

        .cq-sidebar-bottom {
          margin-top: auto;
        }

        .cq-help-card {
          padding: 17px;
          margin-bottom: 22px;
          border: 1px solid #eeedfa;
          border-radius: 14px;
          background: linear-gradient(145deg, #f9f8ff, #f1f0ff);
        }

        .cq-help-card h4 {
          margin: 10px 0 5px;
          font-size: 13px;
        }

        .cq-help-card p {
          margin: 0 0 12px;
          color: var(--cq-muted);
          font-size: 11px;
          line-height: 1.6;
        }

        .cq-help-card a {
          color: var(--cq-primary);
          text-decoration: none;
          font-size: 11px;
          font-weight: 700;
        }

        .cq-main {
          flex: 1;
          min-width: 0;
        }

        .cq-topbar {
          height: 76px;
          padding: 0 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border-bottom: 1px solid var(--cq-border);
        }

        .cq-search {
          width: 280px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 13px;
          background: #f8f8fb;
          border: 1px solid #f0eff4;
          border-radius: 9px;
          color: #9a9aac;
        }

        .cq-search input {
          width: 100%;
          border: 0;
          outline: none;
          background: transparent;
          color: var(--cq-text);
          font: inherit;
          font-size: 12px;
        }

        .cq-top-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .cq-icon-button {
          position: relative;
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border: 1px solid var(--cq-border);
          border-radius: 10px;
          background: #fff;
          color: #74758b;
          cursor: pointer;
        }

        .cq-notification-dot {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ef6262;
          border: 1px solid white;
        }

        .cq-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-left: 17px;
          border-left: 1px solid var(--cq-border);
        }

        .cq-avatar {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #e9e6ff;
          color: #5b51c9;
          font-size: 12px;
          font-weight: 800;
        }

        .cq-user-name {
          font-size: 12px;
          font-weight: 700;
        }

        .cq-user-role {
          margin-top: 3px;
          color: var(--cq-muted);
          font-size: 10px;
        }

        .cq-content {
          max-width: 1500px;
          margin: 0 auto;
          padding: 34px 36px 50px;
        }

        .cq-welcome {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 27px;
        }

        .cq-eyebrow {
          margin-bottom: 9px;
          color: var(--cq-primary);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .cq-welcome h1 {
          margin: 0;
          font-size: clamp(23px, 3vw, 29px);
          font-weight: 800;
          letter-spacing: -1px;
        }

        .cq-welcome p {
          margin: 9px 0 0;
          color: var(--cq-muted);
          font-size: 13px;
        }

        .cq-primary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 12px 17px;
          border: 0;
          border-radius: 9px;
          background: var(--cq-primary);
          color: white;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: .2s;
        }

        .cq-primary-button:hover {
          background: #5047c2;
          transform: translateY(-1px);
        }

        .cq-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 17px;
          margin-bottom: 22px;
        }

        .cq-stat-card {
          padding: 20px;
          background: white;
          border: 1px solid var(--cq-border);
          border-radius: 13px;
          box-shadow: 0 3px 12px rgba(31, 30, 70, .025);
        }

        .cq-stat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .cq-stat-icon {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border-radius: 11px;
        }

        .cq-stat-label {
          color: var(--cq-muted);
          font-size: 11px;
          font-weight: 600;
        }

        .cq-stat-value {
          margin-top: 7px;
          font-size: 27px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .cq-stat-foot {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 9px;
          color: var(--cq-muted);
          font-size: 10px;
        }

        .cq-positive {
          color: #16a34a;
          font-weight: 700;
        }

        .cq-panels {
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) minmax(270px, 1fr);
          gap: 19px;
          margin-bottom: 20px;
        }

        .cq-panel {
          min-width: 0;
          padding: 22px;
          background: #fff;
          border: 1px solid var(--cq-border);
          border-radius: 13px;
          box-shadow: 0 3px 12px rgba(31, 30, 70, .025);
        }

        .cq-panel-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 23px;
        }

        .cq-panel-heading h2 {
          margin: 0;
          font-size: 14px;
          font-weight: 800;
        }

        .cq-panel-heading p {
          margin: 5px 0 0;
          color: var(--cq-muted);
          font-size: 11px;
        }

        .cq-select {
          padding: 8px 10px;
          border: 1px solid var(--cq-border);
          border-radius: 8px;
          background: white;
          color: #73748b;
          font: inherit;
          font-size: 11px;
          cursor: pointer;
        }

        .cq-chart {
          height: 190px;
          display: flex;
          align-items: flex-end;
          gap: 15px;
          padding: 10px 5px 0;
          border-bottom: 1px solid #eeeef4;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 46px,
            #f1f0f5 47px,
            transparent 48px
          );
        }

        .cq-chart-column {
          height: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 9px;
        }

        .cq-bar {
          width: min(34px, 80%);
          min-height: 5px;
          border-radius: 6px 6px 0 0;
          background: #dedbff;
          transition: height .4s;
        }

        .cq-bar.highlight {
          background: linear-gradient(180deg, #8177f0, #6156d6);
        }

        .cq-chart-day {
          padding-bottom: 10px;
          color: #9292a5;
          font-size: 10px;
        }

        .cq-career-match {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 13px 0;
          border-bottom: 1px solid #f1f0f5;
        }

        .cq-career-match:last-child {
          border-bottom: 0;
        }

        .cq-career-icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: #f0efff;
          color: #645bd8;
        }

        .cq-career-info {
          flex: 1;
          min-width: 0;
        }

        .cq-career-info strong {
          display: block;
          font-size: 12px;
        }

        .cq-career-info span {
          display: block;
          margin-top: 5px;
          color: var(--cq-muted);
          font-size: 10px;
        }

        .cq-match-score {
          color: #16a34a;
          font-size: 13px;
          font-weight: 800;
        }

        .cq-bottom-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) minmax(270px, 1fr);
          gap: 19px;
        }

        .cq-activity {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 13px 0;
          border-bottom: 1px solid #f1f0f5;
        }

        .cq-activity:last-child {
          border-bottom: 0;
        }

        .cq-activity-icon {
          width: 37px;
          height: 37px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .cq-activity-info {
          flex: 1;
        }

        .cq-activity-info strong {
          display: block;
          font-size: 12px;
        }

        .cq-activity-info p {
          margin: 5px 0 0;
          color: var(--cq-muted);
          font-size: 10px;
        }

        .cq-activity-time {
          color: #a0a0b1;
          font-size: 10px;
          white-space: nowrap;
        }

        .cq-roadmap {
          padding: 18px;
          border-radius: 11px;
          background: #f8f7ff;
          border: 1px solid #eeecff;
        }

        .cq-roadmap-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .cq-roadmap-top strong {
          font-size: 12px;
        }

        .cq-roadmap-percent {
          color: var(--cq-primary);
          font-size: 17px;
          font-weight: 800;
        }

        .cq-progress-track {
          height: 7px;
          margin: 14px 0;
          border-radius: 20px;
          background: #e5e3f4;
          overflow: hidden;
        }

        .cq-progress-fill {
          width: 38%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #8278f1, #5c51d2);
        }

        .cq-roadmap p {
          margin: 0;
          color: var(--cq-muted);
          font-size: 10px;
          line-height: 1.7;
        }

        .cq-roadmap-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 16px;
          color: var(--cq-primary);
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
        }

        .cq-streak {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-top: 15px;
          padding: 15px;
          border: 1px solid #f5e9d2;
          border-radius: 11px;
          background: #fffbf3;
        }

        .cq-streak-icon {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: #fff0d1;
          color: #d97706;
        }

        .cq-streak strong {
          display: block;
          font-size: 12px;
        }

        .cq-streak span {
          display: block;
          margin-top: 4px;
          color: var(--cq-muted);
          font-size: 10px;
        }

        .cq-mobile-menu {
          display: none;
        }

        @media (max-width: 1100px) {
          .cq-sidebar { width: 220px; }
          .cq-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .cq-content { padding: 28px 24px; }
          .cq-topbar { padding: 0 24px; }
        }

        @media (max-width: 760px) {
          .cq-sidebar {
            position: fixed;
            z-index: 20;
            top: 0;
            bottom: 0;
            left: 0;
            width: 260px;
            transform: translateX(-100%);
            box-shadow: 15px 0 40px rgba(0,0,0,.08);
          }
          .cq-sidebar.open { transform: translateX(0); }
          .cq-mobile-menu { display: grid; }
          .cq-topbar { height: 65px; padding: 0 15px; gap: 10px; }
          .cq-search { flex: 1; width: auto; }
          .cq-user { padding-left: 10px; }
          .cq-user-details { display: none; }
          .cq-top-actions { gap: 9px; }
          .cq-content { padding: 25px 15px; }
          .cq-panels, .cq-bottom-grid { grid-template-columns: 1fr; }
          .cq-welcome { align-items: flex-start; flex-direction: column; }
          .cq-welcome .cq-primary-button { width: 100%; }
        }

        @media (max-width: 420px) {
          .cq-stats { gap: 10px; }
          .cq-stat-card { padding: 14px; }
          .cq-stat-value { font-size: 23px; }
          .cq-panel { padding: 16px; }
          .cq-activity-time { display: none; }
          .cq-search input { font-size: 11px; }
        }
      `}</style>

      <aside className={`cq-sidebar ${sidebarOpen ? "open" : ""}`}>
        <Link to="/" className="cq-brand">
          <span className="cq-brand-mark">CQ</span>
          CareerQuest
        </Link>

        <div className="cq-nav-label">Workspace</div>

        <nav className="cq-nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`cq-nav-link ${active ? "active" : ""}`}
              >
                <Icon size={17} strokeWidth={1.9} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="cq-nav-label" style={{ marginTop: 35 }}>
          Preferences
        </div>

        <nav className="cq-nav">
          <Link to="/profile" className="cq-nav-link">
            <UserRound size={17} />
            My Profile
          </Link>
          <Link to="/settings" className="cq-nav-link">
            <Settings size={17} />
            Settings
          </Link>
        </nav>

        <div className="cq-sidebar-bottom">
          <div className="cq-help-card">
            <CircleHelp size={20} color="#635bdb" />
            <h4>Need a little help?</h4>
            <p>Explore our guides and learn how to make the most of CareerQuest.</p>
            <Link to="/resources">Visit help center →</Link>
          </div>

          <Link to="/" className="cq-nav-link">
            <LogOut size={17} />
            Back to Home
          </Link>
        </div>
      </aside>

      <main className="cq-main">
        <header className="cq-topbar">
          <button
            className="cq-icon-button cq-mobile-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="cq-search">
            <Search size={16} />
            <input placeholder="Search anything..." aria-label="Search" />
          </div>

          <div className="cq-top-actions">
            <button className="cq-icon-button" aria-label="Notifications">
              <Bell size={17} />
              <span className="cq-notification-dot" />
            </button>

            <div className="cq-user">
              <div className="cq-avatar">JD</div>
              <div className="cq-user-details">
                <div className="cq-user-name">John Doe</div>
                <div className="cq-user-role">Career Explorer</div>
              </div>
              <ChevronDown size={14} color="#999" />
            </div>
          </div>
        </header>

        <div className="cq-content">
          <section className="cq-welcome">
            <div>
              <div className="cq-eyebrow">Your career journey</div>
              <h1>Welcome back, John! 👋</h1>
              <p>Here's what's happening with your career development today.</p>
            </div>

            <Link to="/assessment" className="cq-primary-button">
              <Plus size={16} />
              Continue Assessment
              <ArrowRight size={15} />
            </Link>
          </section>

          <section className="cq-stats">
            <div className="cq-stat-card">
              <div className="cq-stat-top">
                <span className="cq-stat-label">Career Matches</span>
                <span className="cq-stat-icon" style={{ background: "#eeedff", color: "#635bdb" }}>
                  <BriefcaseBusiness size={19} />
                </span>
              </div>
              <div className="cq-stat-value">12</div>
              <div className="cq-stat-foot">
                <ArrowUpRight size={14} className="cq-positive" />
                <span className="cq-positive">3 new</span>
                <span>matches this week</span>
              </div>
            </div>

            <div className="cq-stat-card">
              <div className="cq-stat-top">
                <span className="cq-stat-label">Skills Developed</span>
                <span className="cq-stat-icon" style={{ background: "#e2f7ed", color: "#159b67" }}>
                  <Zap size={19} />
                </span>
              </div>
              <div className="cq-stat-value">8</div>
              <div className="cq-stat-foot">
                <ArrowUpRight size={14} className="cq-positive" />
                <span className="cq-positive">2 completed</span>
                <span>this month</span>
              </div>
            </div>

            <div className="cq-stat-card">
              <div className="cq-stat-top">
                <span className="cq-stat-label">Learning Hours</span>
                <span className="cq-stat-icon" style={{ background: "#fff0db", color: "#d97706" }}>
                  <Clock3 size={19} />
                </span>
              </div>
              <div className="cq-stat-value">24.5</div>
              <div className="cq-stat-foot">
                <ArrowUpRight size={14} className="cq-positive" />
                <span className="cq-positive">12%</span>
                <span>more than last month</span>
              </div>
            </div>

            <div className="cq-stat-card">
              <div className="cq-stat-top">
                <span className="cq-stat-label">Profile Alignment</span>
                <span className="cq-stat-icon" style={{ background: "#e8f2ff", color: "#3682d7" }}>
                  <Target size={19} />
                </span>
              </div>
              <div className="cq-stat-value">87%</div>
              <div className="cq-stat-foot">
                <ArrowDownRight size={14} className="cq-positive" />
                <span className="cq-positive">+5%</span>
                <span>since your last assessment</span>
              </div>
            </div>
          </section>

          <section className="cq-panels">
            <div className="cq-panel">
              <div className="cq-panel-heading">
                <div>
                  <h2>Learning Activity</h2>
                  <p>Track your learning consistency over time.</p>
                </div>
                <select
                  className="cq-select"
                  value={activePeriod}
                  onChange={(event) => setActivePeriod(event.target.value)}
                  aria-label="Activity period"
                >
                  <option>Week</option>
                  <option>Month</option>
                </select>
              </div>

              <div className="cq-chart">
                {weeklyProgress.map((item, index) => (
                  <div className="cq-chart-column" key={item.day}>
                    <div
                      className={`cq-bar ${index === 5 ? "highlight" : ""}`}
                      style={{
                        height: `${activePeriod === "Week" ? item.value : Math.min(item.value + 10, 100)}%`,
                      }}
                      title={`${item.value}% activity`}
                    />
                    <span className="cq-chart-day">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cq-panel">
              <div className="cq-panel-heading">
                <div>
                  <h2>Top Career Matches</h2>
                  <p>Based on your assessment results.</p>
                </div>
                <Link to="/careers" style={{ color: "#635bdb", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
                  View all
                </Link>
              </div>

              {[
                { title: "Frontend Engineer", category: "Engineering", score: "94%", icon: "FE" },
                { title: "UI/UX Designer", category: "Design", score: "89%", icon: "UX" },
                { title: "Full-Stack Developer", category: "Engineering", score: "85%", icon: "FS" },
              ].map((career) => (
                <div className="cq-career-match" key={career.title}>
                  <div className="cq-career-icon">
                    <span style={{ fontSize: 11, fontWeight: 800 }}>{career.icon}</span>
                  </div>
                  <div className="cq-career-info">
                    <strong>{career.title}</strong>
                    <span>{career.category}</span>
                  </div>
                  <div className="cq-match-score">{career.score}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="cq-bottom-grid">
            <div className="cq-panel">
              <div className="cq-panel-heading">
                <div>
                  <h2>Recent Activity</h2>
                  <p>Your latest achievements and updates.</p>
                </div>
                <button className="cq-select">View history</button>
              </div>

              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div className="cq-activity" key={activity.title}>
                    <div
                      className="cq-activity-icon"
                      style={{
                        color: activity.color,
                        background: activity.background,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="cq-activity-info">
                      <strong>{activity.title}</strong>
                      <p>{activity.description}</p>
                    </div>
                    <span className="cq-activity-time">{activity.time}</span>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="cq-panel">
                <div className="cq-panel-heading">
                  <div>
                    <h2>Your Roadmap</h2>
                    <p>Keep moving toward your career goals.</p>
                  </div>
                  <TrendingUp size={19} color="#635bdb" />
                </div>

                <div className="cq-roadmap">
                  <div className="cq-roadmap-top">
                    <strong>Frontend Engineer Path</strong>
                    <span className="cq-roadmap-percent">38%</span>
                  </div>
                  <div className="cq-progress-track">
                    <div className="cq-progress-fill" />
                  </div>
                  <p>You're making progress! Complete the next learning milestone to keep your momentum going.</p>
                  <Link to="/roadmap" className="cq-roadmap-link">
                    Continue roadmap <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="cq-streak">
                <div className="cq-streak-icon">
                  <Flame size={21} />
                </div>
                <div>
                  <strong>5-day learning streak!</strong>
                  <span>Keep it up. Consistency builds expertise.</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}