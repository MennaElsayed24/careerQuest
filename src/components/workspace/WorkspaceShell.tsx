import {
  ArrowRight,
  Bell,
  Menu,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { WORKSPACE_NAVIGATION } from "./workspaceNavigation";

import "./WorkspaceShell.css";

interface WorkspaceShellProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function WorkspaceShell({
  children,
  title,
  description,
  action,
}: WorkspaceShellProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const displayName = user?.fullName ?? "CareerQuest User";
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="workspace-shell">
      <aside
        className={`workspace-sidebar ${
          sidebarOpen ? "workspace-sidebar-open" : ""
        }`}
      >
        <div className="workspace-brand">
          <Link to="/" onClick={closeSidebar}>
            <span className="workspace-brand-mark">CQ</span>

            <span className="workspace-brand-text">
              <strong>
                Career<span>Quest</span>
              </strong>
            </span>
          </Link>

          <button
            type="button"
            className="workspace-close-sidebar"
            onClick={closeSidebar}
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>

        <div className="workspace-nav-section">
          <span className="workspace-nav-label">Workspace</span>

          <nav className="workspace-nav">
            {WORKSPACE_NAVIGATION.map((item) => {
              const Icon = item.icon;

              const isActive =
                location.pathname === item.path ||
                (item.path !== "/dashboard" &&
                  location.pathname.startsWith(`${item.path}/`));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`workspace-nav-link ${
                    isActive ? "workspace-nav-link-active" : ""
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="workspace-sidebar-bottom">
          <Link
            to="/profile"
            onClick={closeSidebar}
            className={`workspace-nav-link ${
              location.pathname === "/profile"
                ? "workspace-nav-link-active"
                : ""
            }`}
          >
            <UserRound size={18} strokeWidth={1.8} />
            <span>Profile</span>
          </Link>

          <Link
            to="/settings"
            onClick={closeSidebar}
            className={`workspace-nav-link ${
              location.pathname === "/settings"
                ? "workspace-nav-link-active"
                : ""
            }`}
          >
            <Settings size={18} strokeWidth={1.8} />
            <span>Settings</span>
          </Link>

          <Link to="/" onClick={closeSidebar} className="workspace-nav-link">
            <ArrowRight size={18} strokeWidth={1.8} />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="workspace-sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close navigation"
        />
      )}

      <main className="workspace-main">
        <header className="workspace-topbar">
            <button
              type="button"
              className="workspace-menu-button"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="workspace-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search anything..."
              aria-label="Search"
            />
          </div>

          <div className="workspace-topbar-right">
            <button
              type="button"
              className="workspace-notification"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span />
            </button>

            <Link to="/profile" className="workspace-user">
              <div className="workspace-avatar">{initials || "CQ"}</div>

              <div className="workspace-user-info">
                <strong>{displayName}</strong>
                <span>CareerQuest Member</span>
              </div>
            </Link>
          </div>
        </header>

        <div className="workspace-content">
          <section className="workspace-page-heading">
            <div>
              <span className="workspace-eyebrow">CAREERQUEST WORKSPACE</span>

              <h1>{title}</h1>

              {description && <p>{description}</p>}
            </div>

            {action && <div className="workspace-heading-action">{action}</div>}
          </section>

          {children}
        </div>
      </main>
    </div>
  );
}