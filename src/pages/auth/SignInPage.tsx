import { ArrowRight, Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import { signInLocalAccount } from "../../services/auth/localAuth";
import { useAuthStore } from "../../store/authStore";
import "./SignUpPage.css";

export default function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await signInLocalAccount(email, password);
      setUser(user);
      const from = (location.state as { from?: { pathname?: string } } | null)
        ?.from?.pathname;
      navigate(from ?? ROUTES.dashboard, { replace: true });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to sign in.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-background-shape signup-shape-one" />
      <div className="signup-background-shape signup-shape-two" />

      <div className="signup-container">
        <Link to={ROUTES.home} className="signup-logo">
          <span className="signup-logo-mark">CQ</span>
          <span>CareerQuest</span>
        </Link>

        <section className="signup-card">
          <div className="signup-card-header">
            <div className="signup-icon">
              <LogIn size={21} />
            </div>
            <span className="signup-kicker">WELCOME BACK</span>
            <h1>
              Sign in to your
              <span> CareerQuest account.</span>
            </h1>
            <p>Continue building your career plan.</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-field">
              <label htmlFor="signin-email">Email address</label>
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="signup-field">
              <label htmlFor="signin-password">Password</label>
              <div className="signup-password-wrapper">
                <input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <div className="signup-error">{error}</div>}

            <button
              className="signup-submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
              {!isLoading && <ArrowRight size={17} />}
            </button>
          </form>

          <div className="signup-divider">
            <span>New to CareerQuest?</span>
          </div>

          <Link
            to={ROUTES.signUp}
            state={location.state}
            className="signup-signin-link"
          >
            Create an account
          </Link>
        </section>
      </div>
    </main>
  );
}