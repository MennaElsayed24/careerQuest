import { ArrowRight, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import WorkspaceShell from "../../components/workspace/WorkspaceShell";
import { ROUTES } from "../../routes/paths";
import { signOutFromAuth } from "../../services/auth/platziAuth";
import { useAuthStore } from "../../store/authStore";
import "./SettingsPage.css";

export default function SettingsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState("");
  const displayName = user?.fullName ?? "CareerQuest User";
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  const handleSignOut = async () => {
    setError("");
    setIsSigningOut(true);
    try {
      await signOutFromAuth();
      navigate(ROUTES.home, { replace: true, flushSync: true });
      clearUser();
    } catch (signOutError) {
      setError(
        signOutError instanceof Error
          ? signOutError.message
          : "Unable to sign out.",
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <WorkspaceShell
      title="Settings"
      description="Manage your account and current session."
    >
      <div className="settings-layout">
        <section className="settings-panel settings-account-panel">
          <div className="settings-section-heading">
            <div className="settings-heading-icon">
              <UserRound size={18} />
            </div>
            <div>
              <span>ACCOUNT</span>
              <h2>Personal information</h2>
            </div>
          </div>

          <div className="settings-account-summary">
            <div className="settings-avatar">{initials || "CQ"}</div>
            <div>
              <strong>{displayName}</strong>
              <span>{user?.email ?? "No email available"}</span>
            </div>
          </div>

          <dl className="settings-details">
            <div>
              <dt>Account created</dt>
              <dd>{createdDate}</dd>
            </div>
          </dl>

          <Link to={ROUTES.profile} className="settings-profile-link">
            Edit profile
            <ArrowRight size={15} />
          </Link>
        </section>

        <section className="settings-panel settings-session-panel">
          <div className="settings-section-heading">
            <div className="settings-heading-icon settings-session-icon">
              <ShieldCheck size={18} />
            </div>
            <div>
              <span>SESSION</span>
              <h2>Signed in</h2>
            </div>
          </div>

          <p className="settings-session-copy">
            You are signed in as <strong>{user?.email}</strong> on this browser.
          </p>

          {error && <p role="alert" className="settings-error">{error}</p>}

          <button
            type="button"
            className="settings-signout-button"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            <LogOut size={16} />
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>
        </section>
      </div>
    </WorkspaceShell>
  );
}