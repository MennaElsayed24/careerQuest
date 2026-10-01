import {
  ArrowRight,
  Brain,
  Check,
  Code2,
  Database,
  Gauge,
  Layers3,
  Network,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/paths";

const processSteps = [
  {
    number: "01",
    icon: Target,
    title: "Discover",
    description:
      "Understand your interests, strengths, preferences, and natural working style through a structured assessment.",
  },
  {
    number: "02",
    icon: Network,
    title: "Connect",
    description:
      "Connect your profile with real career paths and understand why each direction may fit your profile.",
  },
  {
    number: "03",
    icon: Gauge,
    title: "Measure",
    description:
      "See your current skill alignment and identify the capabilities you need to develop next.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Progress",
    description:
      "Turn your career direction into a practical roadmap with focused learning and measurable progress.",
  },
];

const actionSteps = [
  {
    icon: Brain,
    title: "Take the Assessment",
    description:
      "Answer a focused set of questions about your interests, work preferences, and technology interests.",
  },
  {
    icon: Target,
    title: "See Your Matches",
    description:
      "Explore career directions that align with the profile you built during the assessment.",
  },
  {
    icon: Layers3,
    title: "Find Your Gaps",
    description:
      "Understand the skills connected to your target career and where your current profile stands.",
  },
  {
    icon: Sparkles,
    title: "Build Your Roadmap",
    description:
      "Follow a clear sequence of skills and resources designed to move you forward.",
  },
];

const technologyTracks = [
  {
    icon: Code2,
    title: "Frontend Engineer",
    category: "Engineering",
    description:
      "Build modern interfaces and interactive digital experiences.",
    skills: ["React", "TypeScript", "CSS"],
  },
  {
    icon: Database,
    title: "Data Scientist",
    category: "Data & AI",
    description:
      "Turn data into insights, models, and intelligent solutions.",
    skills: ["Python", "SQL", "Machine Learning"],
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    category: "Security",
    description:
      "Protect applications, systems, networks, and digital information.",
    skills: ["Security", "Networks", "Linux"],
  },
  {
    icon: Network,
    title: "Cloud Engineer",
    category: "Infrastructure",
    description:
      "Design and operate scalable cloud infrastructure and services.",
    skills: ["AWS", "Docker", "Linux"],
  },
  {
    icon: Brain,
    title: "AI / ML Engineer",
    category: "Artificial Intelligence",
    description:
      "Develop intelligent systems using data, algorithms, and machine learning.",
    skills: ["Python", "ML", "AI"],
  },
  {
    icon: Layers3,
    title: "Full-Stack Developer",
    category: "Engineering",
    description:
      "Build complete products across frontend, backend, and data layers.",
    skills: ["React", "Node.js", "SQL"],
  },
];

const testimonials = [
  {
    quote:
      "CareerQuest helped me turn a vague interest in technology into a direction I could actually work toward.",
    name: "Sarah M.",
    role: "Computer Science Student",
  },
  {
    quote:
      "Instead of randomly collecting courses, I could see which skills mattered for the career path I was exploring.",
    name: "Daniel K.",
    role: "Junior Developer",
  },
  {
    quote:
      "The roadmap made the process feel much more manageable. I finally knew what I should focus on next.",
    name: "Mariam A.",
    role: "Career Explorer",
  },
];

export default function HomePage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-container landing-header-inner">
          <Link to="/" className="landing-logo">
            <span className="landing-logo-mark">CQ</span>
            <span>CareerQuest</span>
          </Link>

          <nav className="landing-nav">
            <a href="#how-it-works">How it works</a>
            <a href="#career-tracks">Career tracks</a>
            <a href="#stories">Stories</a>
            <Link to="/careers">Explore careers</Link>
          </nav>

          <div className="landing-header-actions">
            <Link to={ROUTES.signIn} className="landing-header-link">
              Sign in
            </Link>

            <Link to={ROUTES.signUp} className="landing-header-cta">
              Get started
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-container landing-hero-grid">
            <div className="landing-hero-content">
              <div className="landing-eyebrow">
                <span className="landing-eyebrow-line" />
                CAREER INTELLIGENCE PLATFORM
              </div>

              <h1>
                DISCOVER YOUR NEXT
                <span> CAREER.</span>
              </h1>

              <p className="landing-hero-description">
                Stop navigating your career by guesswork. Discover where your
                strengths intersect with opportunity, identify the skills you
                need, and build a path forward with clarity.
              </p>

              <div className="landing-hero-actions">
                <Link to={ROUTES.signUp} className="landing-primary-button">
                  Discover your path
                  <ArrowRight size={17} />
                </Link>

                <a href="#how-it-works" className="landing-play-button">
                  <span className="landing-play-icon">
                    <Play size={12} fill="currentColor" />
                  </span>
                  See how it works
                </a>
              </div>

              <div className="landing-hero-proof">
                <div className="landing-avatar-stack">
                  <span>AM</span>
                  <span>SK</span>
                  <span>JD</span>
                  <span>+</span>
                </div>

                <div>
                  <strong>Built for ambitious learners</strong>
                  <p>Explore careers with a plan, not a guess.</p>
                </div>
              </div>
            </div>

            <div className="landing-hero-visual">
              <div className="landing-visual-card">
                <div className="landing-visual-top">
                  <div>
                    <span className="landing-mini-label">
                      CAREER PROFILE
                    </span>
                    <strong>Your potential is multidimensional.</strong>
                  </div>

                  <span className="landing-visual-menu">•••</span>
                </div>

                <div className="landing-orbit">
                  <div className="landing-orbit-ring landing-orbit-ring-one" />
                  <div className="landing-orbit-ring landing-orbit-ring-two" />

                  <div className="landing-orbit-center">
                    <span>CQ</span>
                  </div>

                  <div className="landing-orbit-node node-one">
                    <Target size={14} />
                    <span>Interests</span>
                  </div>

                  <div className="landing-orbit-node node-two">
                    <Brain size={14} />
                    <span>Strengths</span>
                  </div>

                  <div className="landing-orbit-node node-three">
                    <TrendingUp size={14} />
                    <span>Skills</span>
                  </div>

                  <div className="landing-orbit-node node-four">
                    <Users size={14} />
                    <span>Goals</span>
                  </div>
                </div>

                <div className="landing-visual-footer">
                  <div>
                    <span>Profile alignment</span>
                    <strong>87%</strong>
                  </div>

                  <div className="landing-score-bar">
                    <span />
                  </div>
                </div>
              </div>

              <div className="landing-floating-card landing-floating-card-top">
                <span className="landing-floating-icon">
                  <Sparkles size={15} />
                </span>
                <div>
                  <strong>Career match</strong>
                  <span>Software Engineering</span>
                </div>
              </div>

              <div className="landing-floating-card landing-floating-card-bottom">
                <span className="landing-floating-icon">
                  <Check size={15} />
                </span>
                <div>
                  <strong>Next skill</strong>
                  <span>TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="landing-proof-strip">
          <div className="landing-container landing-proof-strip-inner">
            <span>DATA-INFORMED</span>
            <span>SKILL-BASED</span>
            <span>CAREER-FOCUSED</span>
            <span>PERSONALIZED</span>
            <span>BUILT FOR ACTION</span>
          </div>
        </div>

        <section
          id="how-it-works"
          className="landing-section landing-section-light"
        >
          <div className="landing-container">
            <div className="landing-section-intro">
              <div>
                <span className="landing-section-kicker">
                  THE CAREERQUEST METHOD
                </span>

                <h2>
                  Stop guessing your trajectory.
                  <span> Engineer it with empirical precision.</span>
                </h2>
              </div>

              <p>
                A structured approach that turns self-discovery into
                actionable career intelligence.
              </p>
            </div>

            <div className="landing-process-grid">
              {processSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <article
                    className="landing-process-card"
                    key={step.number}
                  >
                    <div className="landing-card-number">
                      {step.number}
                    </div>

                    <div className="landing-process-icon">
                      <Icon size={18} />
                    </div>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>

                    <span className="landing-card-arrow">
                      <ArrowRight size={15} />
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="landing-section landing-section-warm">
          <div className="landing-container">
            <div className="landing-centered-intro">
              <span className="landing-section-kicker">YOUR JOURNEY</span>

              <h2>
                From ambiguity to action
                <span> in 10 minutes.</span>
              </h2>

              <p>
                Four simple steps. One clearer direction. Start with where you
                are and let CareerQuest help you understand where to go next.
              </p>
            </div>

            <div className="landing-action-grid">
              {actionSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    className="landing-action-card"
                    key={step.title}
                  >
                    <div className="landing-action-top">
                      <span className="landing-action-number">
                        0{index + 1}
                      </span>

                      <div className="landing-action-icon">
                        <Icon size={17} />
                      </div>
                    </div>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>

                    <div className="landing-action-line" />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="career-tracks"
          className="landing-section landing-section-light"
        >
          <div className="landing-container">
            <div className="landing-section-intro landing-track-intro">
              <div>
                <span className="landing-section-kicker">
                  CAREER EXPLORATION
                </span>

                <h2>
                  Featured Technology
                  <span> Tracks</span>
                </h2>
              </div>

              <div className="landing-track-controls">
                <button type="button" className="landing-filter active">
                  All tracks
                </button>
                <button type="button" className="landing-filter">
                  Engineering
                </button>
                <button type="button" className="landing-filter">
                  Data &amp; AI
                </button>
                <button type="button" className="landing-filter">
                  Security
                </button>
              </div>
            </div>

            <div className="landing-track-grid">
              {technologyTracks.map((track) => {
                const Icon = track.icon;

                return (
                  <article
                    className="landing-track-card"
                    key={track.title}
                  >
                    <div className="landing-track-card-top">
                      <div className="landing-track-icon">
                        <Icon size={19} />
                      </div>

                      <span className="landing-track-category">
                        {track.category}
                      </span>
                    </div>

                    <h3>{track.title}</h3>

                    <p>{track.description}</p>

                    <div className="landing-skill-list">
                      {track.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>

                    <Link to="/careers" className="landing-track-link">
                      Explore track
                      <ArrowRight size={14} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="stories"
          className="landing-section landing-section-warm"
        >
          <div className="landing-container">
            <div className="landing-section-intro">
              <div>
                <span className="landing-section-kicker">REAL STORIES</span>

                <h2>
                  From calibrated
                  <span> to hired.</span>
                </h2>
              </div>

              <p>
                Career direction becomes more useful when it turns into
                meaningful action.
              </p>
            </div>

            <div className="landing-testimonial-grid">
              {testimonials.map((testimonial) => (
                <article
                  className="landing-testimonial-card"
                  key={testimonial.name}
                >
                  <div className="landing-quote-mark">“</div>

                  <p>{testimonial.quote}</p>

                  <div className="landing-testimonial-person">
                    <div className="landing-testimonial-avatar">
                      <UserRound size={16} />
                    </div>

                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-cta-section">
          <div className="landing-container">
            <div className="landing-final-cta">
              <div>
                <span className="landing-section-kicker">
                  YOUR NEXT MOVE
                </span>

                <h2>
                  Ready to discover
                  <span> your path?</span>
                </h2>

                <p>
                  Start with a few questions. Leave with a clearer direction.
                </p>
              </div>

              <Link to={ROUTES.signUp} className="landing-final-button">
                Start my assessment
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-container">
          <div className="landing-footer-main">
            <div>
              <Link to="/" className="landing-logo">
                <span className="landing-logo-mark">CQ</span>
                <span>CareerQuest</span>
              </Link>

              <p>
                Career intelligence for the next generation of builders,
                creators, analysts, and technologists.
              </p>
            </div>

            <div className="landing-footer-columns">
              <div>
                <strong>Explore</strong>
                <Link to="/careers">Careers</Link>
                <Link to="/assessment">Assessment</Link>
                <Link to="/roadmap">Roadmaps</Link>
              </div>

              <div>
                <strong>Product</strong>
                <a href="#how-it-works">How it works</a>
                <a href="#career-tracks">Career tracks</a>
                <a href="#stories">Stories</a>
              </div>

              <div>
                <strong>Connect</strong>
                <a href="#stories">Community</a>
                <a href="#how-it-works">About</a>
                <a href="#top">Contact</a>
              </div>
            </div>
          </div>

          <div className="landing-footer-bottom">
            <span>© 2026 CareerQuest. All rights reserved.</span>

            <div>
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="landing-social-link"
              >
                <span className="landing-linkedin-mark">in</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}