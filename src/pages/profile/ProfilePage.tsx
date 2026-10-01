import { ArrowRight, Check, Edit3, Mail, Save, UserRound, X } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import WorkspaceShell from "../../components/workspace/WorkspaceShell";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ROUTES } from "../../routes/paths";
import { updateAuthProfile } from "../../services/auth/platziAuth";
import { useAuthStore } from "../../store/authStore";
import { useRoadmapStore } from "../../store/roadmapStore";
import type { Career } from "../../types/career";
import "./ProfilePage.css";

interface ProfilePreferences {
  skills: string[];
}

const emptyPreferences: ProfilePreferences = { skills: [] };

export default function ProfilePage() {
  const authUser = useAuthStore((state) => state.user);
  const setAuthSession = useAuthStore((state) => state.setSession);
  const roadmap = useRoadmapStore((state) => state.roadmap);
  const [preferences, setPreferences] = useLocalStorage<ProfilePreferences>(
    "careerquest_profile",
    emptyPreferences,
  );
  const [savedCareers] = useLocalStorage<Career[]>(
    "careerquest_saved_careers",
    [],
  );
  const [targetCareerId] = useLocalStorage<string | null>(
    "careerquest_target_career_id",
    null,
  );
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const displayName = authUser?.fullName || "CareerQuest User";
  const displayEmail = authUser?.email ?? "";
  const targetCareer = savedCareers.find(
    (career) => career.id === targetCareerId,
  );
  const completedSkills =
    roadmap?.items.filter((item) => item.status === "completed").length ?? 0;
  const roadmapSkillCount = roadmap?.items.length ?? 0;
  const roadmapProgress = roadmapSkillCount
    ? Math.round((completedSkills / roadmapSkillCount) * 100)
    : 0;
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const [form, setForm] = useState({
    name: displayName,
    skills: preferences.skills.join(", "),
  });

  const startEditing = () => {
    setForm({
      name: displayName,
      skills: preferences.skills.join(", "),
    });
    setSaveError("");
    setEditing(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveError("");
    if (!form.name.trim()) {
      setSaveError("Enter your name before saving.");
      return;
    }

    setIsSaving(true);
    try {
      let savedName = displayName;
      if (authUser && form.name.trim() !== authUser.fullName) {
        const updatedSession = await updateAuthProfile(form.name);
        setAuthSession(updatedSession);
        savedName = updatedSession.user.fullName;
      }

      setPreferences({
        skills: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });
      setForm((current) => ({ ...current, name: savedName }));
      setEditing(false);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Unable to save your profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <WorkspaceShell
      title="My Profile"
      description="Your account identity and career-planning progress."
      action={
        !editing ? (
          <button
            type="button"
            className="profile-edit-button"
            onClick={startEditing}
          >
            <Edit3 size={15} />
            Edit profile
          </button>
        ) : null
      }
    >
      <section className="profile-overview">
        <div className="profile-identity-card">
          <div className="profile-large-avatar">{initials || "CQ"}</div>
          <div className="profile-identity">
            <span>ACCOUNT PROFILE</span>
            <h2>{displayName}</h2>
            <div className="profile-email">
              <Mail size={13} />
              {displayEmail || "No email available"}
            </div>
            <div className="profile-track-pill">
              {targetCareer?.title ?? "No target career selected"}
            </div>
          </div>
        </div>

        <div className="profile-progress-card">
          <div className="profile-progress-top">
            <div>
              <span>ROADMAP PROGRESS</span>
              <strong>{roadmapProgress}%</strong>
            </div>
            <div className="profile-progress-icon"><Check size={17} /></div>
          </div>
          <div
            className="profile-progress-bar"
            role="progressbar"
            aria-label="Roadmap progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={roadmapProgress}
          >
            <span style={{ width: `${roadmapProgress}%` }} />
          </div>
          <p>
            {roadmapSkillCount
              ? `${completedSkills} of ${roadmapSkillCount} roadmap skills completed`
              : "Create a roadmap to track your progress."}
          </p>
        </div>
      </section>

      {!editing ? (
        <section className="profile-details-grid">
          <article className="profile-card">
            <div className="profile-card-heading">
              <UserRound size={17} />
              <div>
                <span>ACCOUNT</span>
                <h3>Personal information</h3>
              </div>
            </div>
            <div className="profile-detail-list">
              <div>
                <span>Name</span>
                <strong>{displayName}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{displayEmail || "Not available"}</strong>
              </div>
              <div>
                <span>Target career</span>
                <strong>{targetCareer?.title ?? "Not selected"}</strong>
              </div>
            </div>
          </article>

          <article className="profile-card">
            <div className="profile-card-heading">
              <Check size={17} />
              <div>
                <span>YOUR SKILLS</span>
                <h3>Skills I already have</h3>
              </div>
            </div>
            {preferences.skills.length > 0 ? (
              <div className="profile-skills">
                {preferences.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            ) : (
              <div className="profile-skills-empty">
                <p>Add skills you already have to make your Skill Gap comparison useful.</p>
                <button type="button" onClick={startEditing}>Add skills</button>
              </div>
            )}
          </article>
        </section>
      ) : (
        <section className="profile-edit-card">
          <div className="profile-card-heading">
            <Edit3 size={17} />
            <div>
              <span>EDIT PROFILE</span>
              <h3>Update your account details</h3>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <label>
              Display name
              <input
                value={form.name}
                autoComplete="name"
                required
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
              />
            </label>

            <label>
              Email
              <input type="email" value={displayEmail} readOnly />
              <small>Email is managed by the authentication API.</small>
            </label>

            <label className="profile-form-wide">
              Skills you already have
              <input
                value={form.skills}
                onChange={(event) =>
                  setForm((current) => ({ ...current, skills: event.target.value }))
                }
                placeholder="e.g. HTML, JavaScript, customer research"
              />
              <small>Separate skills with commas. Stored in this browser for Skill Gap matching.</small>
            </label>

            <div className="profile-form-actions">
              <button
                type="button"
                className="profile-cancel-button"
                onClick={() => setEditing(false)}
              >
                <X size={14} />
                Cancel
              </button>
              <button
                type="submit"
                className="profile-save-button"
                disabled={isSaving}
              >
                <Save size={14} />
                {isSaving ? "Saving..." : "Save profile"}
              </button>
            </div>

            {saveError && <p className="profile-save-error" role="alert">{saveError}</p>}
          </form>
        </section>
      )}

      {!targetCareer && (
        <p className="profile-next-step">
          <Link to={ROUTES.careers}>Explore careers to choose a target <ArrowRight size={14} /></Link>
        </p>
      )}
    </WorkspaceShell>
  );
}
