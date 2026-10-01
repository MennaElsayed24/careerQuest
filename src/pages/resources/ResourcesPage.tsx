import { ArrowUpRight, BookOpen, Search, Sparkles } from "lucide-react";
import { useDeferredValue, useState } from "react";
import WorkspaceShell from "../../components/workspace/WorkspaceShell";
import { useLearningResources } from "../../hooks/useLearningResources";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { LearningResource } from "../../types/resource";
import "./ResourcesPage.css";

interface ProfileSkills {
  skills: string[];
}

function formatDate(value: string | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearch = useDeferredValue(searchTerm.trim());
  const { data, isLoading, isError, error, refetch } =
    useLearningResources(deferredSearch);
  const [profile] = useLocalStorage<ProfileSkills>("careerquest_profile", {
    skills: [],
  });
  const resources: LearningResource[] = data ?? [];
  const hasSearch = deferredSearch.length > 1;

  return (
    <WorkspaceShell
      title="Learning Resources"
      description="Search real articles from Dev.to by the skill you want to practice."
    >
      <section className="resources-toolbar">
        <label className="resources-search" htmlFor="resource-skill-search">
          <Search size={16} />
          <input
            id="resource-skill-search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search a skill, e.g. react..."
            autoComplete="off"
          />
        </label>
      </section>

      {profile.skills.length > 0 && !hasSearch && (
        <section className="resources-skill-suggestions" aria-label="Your skills">
          <span>SEARCH YOUR SKILLS</span>
          <div>
            {profile.skills.map((skill) => (
            <button
              type="button"
                key={skill}
                onClick={() => setSearchTerm(skill)}
                className="resources-category"
            >
                {skill}
            </button>
            ))}
          </div>
        </section>
      )}

      {isLoading && (
        <div className="resources-empty" role="status" aria-live="polite">
          <span className="resources-loading-mark" />
          <strong>Searching Dev.to...</strong>
          <span>Loading articles tagged with “{deferredSearch}”.</span>
        </div>
      )}

      {isError && (
        <div className="resources-empty resources-empty-error" role="alert">
          <Search size={24} />
          <strong>Resources couldn’t be loaded.</strong>
          <span>{error instanceof Error ? error.message : "Check your connection and try again."}</span>
          <button type="button" className="resources-retry-button" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      )}

      {!hasSearch && !isLoading && (
        <div className="resources-empty">
          <Sparkles size={24} />
          <strong>Choose a skill to explore resources.</strong>
          <span>Results are retrieved from the Dev.to API when you search.</span>
        </div>
      )}

      {hasSearch && !isLoading && !isError && resources.length === 0 && (
        <div className="resources-empty">
          <Search size={24} />
          <strong>No articles found for “{deferredSearch}”.</strong>
          <span>Try another skill tag.</span>
        </div>
      )}

      {hasSearch && !isLoading && !isError && resources.length > 0 && (
        <>
          <div className="resources-results-heading">
            <span>DEV.TO ARTICLES</span>
            <strong>{resources.length} results for “{deferredSearch}”</strong>
          </div>
          <section className="resources-grid">
            {resources.map((resource, index) => {
              const publishedDate = formatDate(resource.publishedAt);

              return (
                <article
                  className="resource-card"
                  key={resource.id}
                  style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
                >
                  <div className="resource-card-top">
                    <div className="resource-icon"><BookOpen size={18} /></div>
                    <span>{resource.source}</span>
                  </div>
                  <h2>{resource.title}</h2>
                  <p>{resource.description || "No description provided by the author."}</p>
                  <div className="resource-meta">
                    {resource.author && <span>By {resource.author}</span>}
                    {publishedDate && <span>{publishedDate}</span>}
                  </div>
                  {resource.tags.length > 0 && (
                    <div className="resource-tags">
                      {resource.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  )}
                  <a href={resource.url} target="_blank" rel="noreferrer" className="resource-visit">
                    Visit article
                    <ArrowUpRight size={14} />
                  </a>
                </article>
              );
            })}
          </section>
        </>
      )}

      <section className="resources-footer-card">
        <div className="resources-footer-icon">
          <BookOpen size={21} />
        </div>

        <div>
          <span>KEEP LEARNING</span>
          <h2>Small consistent steps build strong technical foundations.</h2>
        </div>
      </section>
    </WorkspaceShell>
  );
}