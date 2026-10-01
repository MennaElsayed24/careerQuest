import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { useDeferredValue, useState } from "react";
import { Link, useParams } from "react-router-dom";
import WorkspaceShell from "../../components/workspace/WorkspaceShell";
import { useCareerDetails } from "../../hooks/useCareerDetails";
import { useCareerRecommendations } from "../../hooks/useCareerRecommendations";
import { useCareers } from "../../hooks/useCareers";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ROUTES } from "../../routes/paths";
import type { Career } from "../../types/career";
import "./CareersPage.css";

const SAVED_CAREERS_KEY = "careerquest_saved_careers";
const TARGET_CAREER_KEY = "careerquest_target_career_id";

interface CareerCardProps {
  career: Career;
  isSaved: boolean;
  isTarget: boolean;
  onToggleSaved: (career: Career) => void;
  onSetTarget: (career: Career) => void;
  index: number;
}

function CareerCard({
  career,
  isSaved,
  isTarget,
  onToggleSaved,
  onSetTarget,
  index,
}: CareerCardProps) {
  return (
    <article
      className="career-result-card"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <div className="career-result-card-top">
        <div className="career-result-icon">
          <BriefcaseBusiness size={18} />
        </div>
        <button
          type="button"
          className={`career-save-button ${isSaved ? "is-saved" : ""}`}
          onClick={() => onToggleSaved(career)}
          aria-label={isSaved ? `Remove ${career.title} from saved careers` : `Save ${career.title}`}
          aria-pressed={isSaved}
          title={isSaved ? "Remove saved career" : "Save career"}
        >
          {isSaved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
        </button>
      </div>

      <span className="career-source-label">ESCO OCCUPATION</span>
      <h2>{career.title}</h2>
      <p>{career.description || "No description provided by ESCO."}</p>

      {isTarget && (
        <span className="career-target-indicator">
          <Target size={13} />
          Skill-gap target
        </span>
      )}

      <div className="career-result-actions">
        <Link
          className="career-result-link"
          to={ROUTES.careerDetails.replace(
            ":careerId",
            encodeURIComponent(career.id),
          )}
        >
          View details
          <ArrowRight size={15} />
        </Link>
        <button
          type="button"
          className={`career-target-button ${isTarget ? "is-target" : ""}`}
          onClick={() => onSetTarget(career)}
          aria-pressed={isTarget}
        >
          {isTarget ? "Target selected" : "Set as target"}
        </button>
      </div>
    </article>
  );
}

function CareerDetails({ careerUri }: { careerUri: string }) {
  const { data, isLoading, isError, error } = useCareerDetails(careerUri);
  const [savedCareers, setSavedCareers] = useLocalStorage<Career[]>(
    SAVED_CAREERS_KEY,
    [],
  );
  const [targetCareerId, setTargetCareerId] = useLocalStorage<string | null>(
    TARGET_CAREER_KEY,
    null,
  );

  if (isLoading) {
    return (
      <WorkspaceShell title="Career Details">
        <div className="career-state" role="status" aria-live="polite">
          Loading career details...
        </div>
      </WorkspaceShell>
    );
  }

  if (isError || !data) {
    return (
      <WorkspaceShell title="Career Details">
        <section className="career-state career-state-error" role="alert">
          <BriefcaseBusiness size={24} />
          <strong>Career details could not be loaded.</strong>
          <span>{error instanceof Error ? error.message : "Try again later."}</span>
          <Link to={ROUTES.careers} className="career-back-link">
            <ArrowLeft size={15} />
            Back to careers
          </Link>
        </section>
      </WorkspaceShell>
    );
  }

  const relatedSkills = [
    ...data.essentialSkills,
    ...data.optionalSkills,
  ];
  const career: Career = {
    id: data.uri,
    title: data.preferredLabel || "Career title unavailable",
    description: data.description,
    category: "occupation",
    requiredSkills: data.essentialSkills.map((skill) => skill.title),
  };
  const isSaved = savedCareers.some((item) => item.id === career.id);
  const isTarget = targetCareerId === career.id;
  const toggleSaved = () => {
    setSavedCareers((current) =>
      isSaved
        ? current.filter((item) => item.id !== career.id)
        : [career, ...current],
    );
  };
  const setAsTarget = () => {
    setSavedCareers((current) =>
      current.some((item) => item.id === career.id)
        ? current
        : [career, ...current],
    );
    setTargetCareerId(career.id);
  };

  return (
    <WorkspaceShell title={data.preferredLabel ?? "Career Details"}>
      <div className="career-detail-page">
        <Link to={ROUTES.careers} className="career-back-link">
          <ArrowLeft size={15} />
          Back to careers
        </Link>

        <section className="career-detail-panel">
          <div className="career-detail-icon">
            <BriefcaseBusiness size={22} />
          </div>
          <span className="career-source-label">ESCO OCCUPATION</span>
          <h2>{data.preferredLabel ?? "Career title unavailable"}</h2>
          {data.description ? (
            <p className="career-detail-description">{data.description}</p>
          ) : (
            <p className="career-detail-description career-detail-muted">
              ESCO has not provided a description for this occupation.
            </p>
          )}
          <div className="career-detail-actions">
            <button
              type="button"
              className="career-secondary-action"
              onClick={toggleSaved}
              aria-pressed={isSaved}
            >
              {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              {isSaved ? "Saved career" : "Save career"}
            </button>
            <button
              type="button"
              className="career-primary-action"
              onClick={setAsTarget}
              aria-pressed={isTarget}
            >
              <Target size={16} />
              {isTarget ? "Current skill-gap target" : "Use for skill gap"}
            </button>
          </div>
        </section>

        {relatedSkills.length > 0 && (
          <section className="career-detail-section">
            <span className="career-source-label">ESSENTIAL SKILLS FROM ESCO</span>
            <div className="career-alternate-labels">
              {relatedSkills.slice(0, 18).map((skill) => (
                <a href={skill.href} target="_blank" rel="noreferrer" key={skill.id}>
                  {skill.title}
                  <small>{skill.type}</small>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </WorkspaceShell>
  );
}

export default function CareersPage() {
  const { careerId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"explore" | "saved">("explore");
  const [savedCareers, setSavedCareers] = useLocalStorage<Career[]>(
    SAVED_CAREERS_KEY,
    [],
  );
  const [targetCareerId, setTargetCareerId] = useLocalStorage<string | null>(
    TARGET_CAREER_KEY,
    null,
  );
  const deferredSearch = useDeferredValue(searchTerm.trim());
  const careerUri = careerId
    ? (() => {
        try {
          return decodeURIComponent(careerId);
        } catch {
          return careerId;
        }
      })()
    : "";
  const { data, isLoading, isError, error } = useCareers(deferredSearch);
  const recommendations = useCareerRecommendations();

  if (careerId) return <CareerDetails careerUri={careerUri} />;

  const isSavedView = view === "saved";
  const isSearching = deferredSearch.length >= 2;
  const visibleCareers = isSavedView
    ? savedCareers.filter((career) => {
        const query = deferredSearch.toLowerCase();
        return (
          !query ||
          career.title.toLowerCase().includes(query) ||
          career.description.toLowerCase().includes(query)
        );
      })
    : isSearching
      ? data ?? []
      : recommendations.data ?? [];
  const isCurrentLoading = isSavedView
    ? false
    : isSearching
      ? isLoading
      : recommendations.isLoading;
  const isCurrentError = isSavedView
    ? false
    : isSearching
      ? isError
      : recommendations.isError;
  const currentError = isSearching ? error : recommendations.error;

  const toggleSaved = (career: Career) => {
    setSavedCareers((current) =>
      current.some((item) => item.id === career.id)
        ? current.filter((item) => item.id !== career.id)
        : [career, ...current],
    );
  };

  const setAsTarget = (career: Career) => {
    setSavedCareers((current) =>
      current.some((item) => item.id === career.id)
        ? current
        : [career, ...current],
    );
    setTargetCareerId(career.id);
  };

  return (
    <WorkspaceShell
      title="Career Explorer"
      description="Search occupations from the ESCO career database."
    >
      <section className="careers-search-panel">
        <label className="careers-search" htmlFor="career-search">
          <Search size={17} />
          <input
            id="career-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search job titles or career areas..."
            autoComplete="off"
          />
        </label>
        <span>Search the ESCO occupation database or browse current suggestions.</span>
      </section>

      <div className="career-view-switch" role="tablist" aria-label="Career lists">
        <button
          type="button"
          role="tab"
          aria-selected={view === "explore"}
          className={view === "explore" ? "is-active" : ""}
          onClick={() => setView("explore")}
        >
          Explore careers
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "saved"}
          className={view === "saved" ? "is-active" : ""}
          onClick={() => setView("saved")}
        >
          Saved careers <span>{savedCareers.length}</span>
        </button>
      </div>

      {isCurrentLoading && (
        <div className="career-state" role="status" aria-live="polite">
          <span className="career-loading-mark" />
          {isSavedView ? "Loading saved careers..." : "Loading ESCO careers..."}
        </div>
      )}

      {isCurrentError && (
        <section className="career-state career-state-error" role="alert">
          <BriefcaseBusiness size={24} />
          <strong>Career data is temporarily unavailable.</strong>
          <span>{currentError instanceof Error ? currentError.message : "Try again later."}</span>
          {!isSavedView && !isSearching && (
            <button
              type="button"
              className="career-secondary-action"
              onClick={() => void recommendations.refetch()}
            >
              Try recommendations again
            </button>
          )}
        </section>
      )}

      {!isCurrentLoading && !isCurrentError && isSavedView && visibleCareers.length === 0 && (
        <section className="career-state career-state-prompt">
          <Bookmark size={24} />
          <strong>{deferredSearch ? "No saved careers match your search" : "Your saved list is empty"}</strong>
          <span>Save a career to keep it here and choose a target for your skill gap.</span>
          <button type="button" className="career-primary-action" onClick={() => setView("explore")}>Explore careers</button>
        </section>
      )}

      {!isCurrentLoading && !isCurrentError && !isSavedView && !isSearching && visibleCareers.length === 0 && (
        <section className="career-state">
          <Sparkles size={24} />
          <strong>No recommendations are available right now</strong>
          <span>Search for a role directly, or try the suggestions again later.</span>
        </section>
      )}

      {!isCurrentLoading && !isCurrentError && !isSavedView && isSearching && visibleCareers.length === 0 && (
        <section className="career-state">
          <Search size={24} />
          <strong>No matching careers found</strong>
          <span>Try another title or a broader search term.</span>
        </section>
      )}

      {!isCurrentLoading && !isCurrentError && visibleCareers.length > 0 && (
        <>
          <div className="career-results-heading" aria-live="polite">
            <span>
              {isSavedView
                ? "SAVED CAREERS"
                : isSearching
                  ? "SEARCH RESULTS"
                  : "SUGGESTED FROM ESCO"}
            </span>
            <strong>{visibleCareers.length} occupations</strong>
          </div>

          <section className="career-results-grid">
            {visibleCareers.map((career, index) => (
              <CareerCard
                career={career}
                key={career.id}
                index={index}
                isSaved={savedCareers.some((item) => item.id === career.id)}
                isTarget={targetCareerId === career.id}
                onToggleSaved={toggleSaved}
                onSetTarget={setAsTarget}
              />
            ))}
          </section>
        </>
      )}
    </WorkspaceShell>
  );
}