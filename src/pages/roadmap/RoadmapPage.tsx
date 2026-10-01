import {
  ArrowRight,
  BookOpenCheck,
  Check,
  Circle,
  ExternalLink,
  Map,
  Play,
  RotateCcw,
} from "lucide-react";
import WorkspaceShell from "../../components/workspace/WorkspaceShell";
import { useCareerDetails } from "../../hooks/useCareerDetails";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ROUTES } from "../../routes/paths";
import { useRoadmapStore } from "../../store/roadmapStore";
import type { Career } from "../../types/career";
import type { RoadmapItemStatus } from "../../types/roadmap";
import "./RoadmapPage.css";

export default function RoadmapPage() {
  const [savedCareers] = useLocalStorage<Career[]>(
    "careerquest_saved_careers",
    [],
  );
  const [targetCareerId] = useLocalStorage<string | null>(
    "careerquest_target_career_id",
    null,
  );
  const targetCareer = savedCareers.find(
    (career) => career.id === targetCareerId,
  );
  const roadmap = useRoadmapStore((state) => state.roadmap);
  const setRoadmap = useRoadmapStore((state) => state.setRoadmap);
  const updateItemStatus = useRoadmapStore((state) => state.updateItemStatus);
  const { data, isLoading, isError, error } = useCareerDetails(
    targetCareer?.id ?? "",
  );
  const roadmapForTarget = Boolean(
    roadmap && targetCareer && roadmap.careerId === targetCareer.id,
  );

  const createRoadmap = () => {
    if (!targetCareer || !data?.essentialSkills.length) return;

    const now = new Date().toISOString();
    setRoadmap({
      id: crypto.randomUUID(),
      careerId: targetCareer.id,
      createdAt: now,
      updatedAt: now,
      items: data.essentialSkills.map((skill) => ({
        id: skill.id,
        title: skill.title,
        description: `ESCO identifies this as an essential skill for ${data.preferredLabel}.`,
        skillId: skill.id,
        resourceIds: [],
        status: "available",
      })),
    });
  };

  const changeStatus = (itemId: string, status: RoadmapItemStatus) => {
    updateItemStatus(itemId, status);
  };

  if (!targetCareer) {
    return (
      <WorkspaceShell
        title="My Roadmap"
        description="Build a skill plan around a career you want to pursue."
      >
        <section className="roadmap-empty">
          <div className="roadmap-empty-icon"><Map size={23} /></div>
          <span className="roadmap-eyebrow">NO TARGET CAREER</span>
          <h2>Choose a career before building your roadmap.</h2>
          <p>
            Save a career in Career Explorer and set it as your target. The
            roadmap will use its essential skills from ESCO.
          </p>
          <a className="roadmap-primary-link" href={ROUTES.careers}>
            Explore careers <ArrowRight size={15} />
          </a>
        </section>
      </WorkspaceShell>
    );
  }

  if (isLoading) {
    return (
      <WorkspaceShell title="My Roadmap" description={`Target: ${targetCareer.title}`}>
        <div className="roadmap-state" role="status" aria-live="polite">
          Loading essential skills from ESCO...
        </div>
      </WorkspaceShell>
    );
  }

  if (isError || !data) {
    return (
      <WorkspaceShell title="My Roadmap" description={`Target: ${targetCareer.title}`}>
        <section className="roadmap-state roadmap-state-error" role="alert">
          <strong>The career skill data could not be loaded.</strong>
          <span>{error instanceof Error ? error.message : "Try again later."}</span>
          <a href={ROUTES.careers} className="roadmap-secondary-link">Choose another career</a>
        </section>
      </WorkspaceShell>
    );
  }

  if (!data.essentialSkills.length) {
    return (
      <WorkspaceShell title="My Roadmap" description={`Target: ${targetCareer.title}`}>
        <section className="roadmap-state">
          <BookOpenCheck size={25} />
          <strong>ESCO returned no essential skills for this career.</strong>
          <span>Choose another career to build a skill plan from available data.</span>
          <a href={ROUTES.careers} className="roadmap-secondary-link">Explore careers</a>
        </section>
      </WorkspaceShell>
    );
  }

  const currentRoadmap = roadmapForTarget ? roadmap : null;
  const completedCount =
    currentRoadmap?.items.filter((item) => item.status === "completed").length ?? 0;
  const progress = currentRoadmap?.items.length
    ? Math.round((completedCount / currentRoadmap.items.length) * 100)
    : 0;

  return (
    <WorkspaceShell
      title="My Roadmap"
      description={`Essential skill plan for ${data.preferredLabel}.`}
      action={
        currentRoadmap ? (
          <button
            type="button"
            className="roadmap-secondary-button"
            onClick={createRoadmap}
          >
            <RotateCcw size={14} />
            Rebuild from ESCO
          </button>
        ) : undefined
      }
    >
      {!currentRoadmap ? (
        <section className="roadmap-create-panel">
          <div className="roadmap-create-icon"><Map size={22} /></div>
          <span className="roadmap-eyebrow">ESCO SKILL PLAN</span>
          <h2>{data.preferredLabel}</h2>
          <p>
            ESCO lists {data.essentialSkills.length} essential skills for this
            occupation. Create a personal checklist and track your progress.
            Skills are shown as requirements, not a prescribed learning order.
          </p>
          <div className="roadmap-preview-skills">
            {data.essentialSkills.slice(0, 6).map((skill) => (
              <span key={skill.id}>{skill.title}</span>
            ))}
            {data.essentialSkills.length > 6 && (
              <span>+{data.essentialSkills.length - 6} more</span>
            )}
          </div>
          <button type="button" className="roadmap-primary-button" onClick={createRoadmap}>
            Create skill plan
            <ArrowRight size={15} />
          </button>
        </section>
      ) : (
        <>
          <section className="roadmap-summary">
            <div className="roadmap-summary-head">
              <div>
                <span className="roadmap-eyebrow">SKILL PLAN</span>
                <h2>{data.preferredLabel}</h2>
              </div>
              <strong>{progress}%</strong>
            </div>
            <div
              className="roadmap-progress-track"
              role="progressbar"
              aria-label="Roadmap progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <span style={{ width: `${progress}%` }} />
            </div>
            <p>{completedCount} of {currentRoadmap.items.length} skills completed</p>
          </section>

          <section className="roadmap-items-panel">
            <div className="roadmap-items-heading">
              <div>
                <span className="roadmap-eyebrow">ESSENTIAL SKILLS</span>
                <h3>Your checklist</h3>
              </div>
              <span>From ESCO</span>
            </div>

            <div className="roadmap-items-list">
              {currentRoadmap.items.map((item, index) => (
                <RoadmapSkillItem
                  item={item}
                  index={index}
                  onStatusChange={changeStatus}
                  key={item.id}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </WorkspaceShell>
  );
}

function RoadmapSkillItem({
  item,
  index,
  onStatusChange,
}: {
  item: import("../../types/roadmap").RoadmapItem;
  index: number;
  onStatusChange: (itemId: string, status: RoadmapItemStatus) => void;
}) {
  const nextStatus: RoadmapItemStatus =
    item.status === "completed"
      ? "available"
      : item.status === "in-progress"
        ? "completed"
        : "in-progress";
  const actionLabel =
    item.status === "completed"
      ? "Reopen"
      : item.status === "in-progress"
        ? "Mark complete"
        : "Start";

  return (
    <article className={`roadmap-item roadmap-item-${item.status}`}>
      <span className="roadmap-item-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="roadmap-item-content">
        <span className="roadmap-item-status">
          {item.status === "completed" ? <Check size={13} /> : <Circle size={12} />}
          {item.status.replace("-", " ")}
        </span>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>
      {item.skillId && (
        <a
          className="roadmap-skill-source"
          href={`https://ec.europa.eu/esco/api/resource/skill?uri=${encodeURIComponent(item.skillId)}&language=en`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ESCO details for ${item.title}`}
        >
          <ExternalLink size={15} />
        </a>
      )}
      <button
        type="button"
        className="roadmap-item-action"
        onClick={() => onStatusChange(item.id, nextStatus)}
      >
        {item.status === "available" && <Play size={13} />}
        {actionLabel}
      </button>
    </article>
  );
}
