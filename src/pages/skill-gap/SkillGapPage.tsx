import { ArrowRight, Check, CircleHelp, Target } from "lucide-react";
import { Link } from "react-router-dom";
import WorkspaceShell from "../../components/workspace/WorkspaceShell";
import { useCareerDetails } from "../../hooks/useCareerDetails";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ROUTES } from "../../routes/paths";
import type { Career } from "../../types/career";
import "./SkillGapPage.css";

interface ProfileSkills {
  skills: string[];
}

export default function SkillGapPage() {
  const [savedCareers] = useLocalStorage<Career[]>(
    "careerquest_saved_careers",
    [],
  );
  const [targetCareerId] = useLocalStorage<string | null>(
    "careerquest_target_career_id",
    null,
  );
  const [profile] = useLocalStorage<ProfileSkills>("careerquest_profile", {
    skills: [],
  });
  const targetCareer = savedCareers.find(
    (career) => career.id === targetCareerId,
  );
  const { data, isLoading, isError, error } = useCareerDetails(
    targetCareer?.id ?? "",
  );

  if (!targetCareer) {
    return (
      <WorkspaceShell
        title="Skill Gap"
        description="Compare your skills with the requirements of a career you want to pursue."
      >
        <section className="skill-gap-empty">
          <div className="skill-gap-empty-icon">
            <Target size={22} />
          </div>
          <span className="skill-gap-eyebrow">NO TARGET CAREER</span>
          <h2>Choose a career to see your skill gap.</h2>
          <p>
            Save a career in Career Explorer and set it as your target. Its
            essential skills will be loaded from ESCO here.
          </p>
          <Link to={ROUTES.careers} className="skill-gap-primary-link">
            Explore careers
            <ArrowRight size={15} />
          </Link>
        </section>
      </WorkspaceShell>
    );
  }

  if (isLoading) {
    return (
      <WorkspaceShell title="Skill Gap" description={`Target: ${targetCareer.title}`}>
        <div className="skill-gap-state" role="status" aria-live="polite">
          Loading essential skills from ESCO...
        </div>
      </WorkspaceShell>
    );
  }

  if (isError || !data) {
    return (
      <WorkspaceShell title="Skill Gap" description={`Target: ${targetCareer.title}`}>
        <section className="skill-gap-state skill-gap-state-error" role="alert">
          <CircleHelp size={22} />
          <strong>Required skills could not be loaded.</strong>
          <span>{error instanceof Error ? error.message : "Try again later."}</span>
          <Link to={ROUTES.careers} className="skill-gap-secondary-link">
            Choose another career
          </Link>
        </section>
      </WorkspaceShell>
    );
  }

  const userSkills = profile.skills ?? [];
  const normalizedUserSkills = new Set(
    userSkills.map((skill) => skill.trim().toLowerCase()),
  );
  const requiredSkills = data.essentialSkills;
  const matchedSkills = requiredSkills.filter((skill) =>
    normalizedUserSkills.has(skill.title.trim().toLowerCase()),
  );
  const missingSkills = requiredSkills.filter(
    (skill) => !normalizedUserSkills.has(skill.title.trim().toLowerCase()),
  );
  const matchPercent = requiredSkills.length
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
    : 0;

  return (
    <WorkspaceShell
      title="Skill Gap"
      description={`Your current skills compared with ESCO requirements for ${data.preferredLabel}.`}
      action={
        <Link to={ROUTES.careers} className="skill-gap-secondary-link">
          Change target
        </Link>
      }
    >
      <section className="skill-gap-summary">
        <div className="skill-gap-summary-top">
          <div>
            <span className="skill-gap-eyebrow">TARGET CAREER</span>
            <h2>{data.preferredLabel}</h2>
          </div>
          <span className="skill-gap-source">ESCO</span>
        </div>

        <div className="skill-gap-progress-row">
          <div
            className="skill-gap-progress"
            role="progressbar"
            aria-label="Essential skills matched"
            aria-valuemin={0}
            aria-valuemax={requiredSkills.length}
            aria-valuenow={matchedSkills.length}
          >
            <span style={{ width: `${matchPercent}%` }} />
          </div>
          <strong>{matchPercent}%</strong>
        </div>

        <div className="skill-gap-counts">
          <span><Check size={14} /> {matchedSkills.length} matched</span>
          <span>{missingSkills.length} to build</span>
          <span>{requiredSkills.length} essential skills</span>
        </div>
      </section>

      {userSkills.length === 0 && (
        <section className="skill-gap-profile-prompt">
          <div>
            <strong>Add your current skills</strong>
            <span>Skill matching improves when your Profile includes skills you already have.</span>
          </div>
          <Link to={ROUTES.profile}>
            Edit profile
            <ArrowRight size={14} />
          </Link>
        </section>
      )}

      {requiredSkills.length === 0 ? (
        <section className="skill-gap-state">
          <CircleHelp size={22} />
          <strong>ESCO returned no essential skills for this career.</strong>
          <span>Try another occupation from Career Explorer.</span>
        </section>
      ) : (
        <section className="skill-gap-panel">
          <div className="skill-gap-panel-heading">
            <div>
              <span className="skill-gap-eyebrow">ESCO ESSENTIAL SKILLS</span>
              <h3>Skills for this occupation</h3>
            </div>
            <span>{requiredSkills.length} skills</span>
          </div>

          <div className="skill-gap-list">
            {requiredSkills.map((skill) => {
              const isMatched = normalizedUserSkills.has(
                skill.title.trim().toLowerCase(),
              );

              return (
                <a
                  key={skill.id}
                  className={`skill-gap-row ${isMatched ? "is-matched" : "is-missing"}`}
                  href={skill.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="skill-gap-status-icon">
                    {isMatched ? <Check size={15} /> : <CircleHelp size={15} />}
                  </span>
                  <strong>{skill.title}</strong>
                  <span>{isMatched ? "In your profile" : "Not in your profile"}</span>
                  <ArrowRight size={14} />
                </a>
              );
            })}
          </div>
        </section>
      )}
    </WorkspaceShell>
  );
}