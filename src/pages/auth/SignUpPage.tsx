import { ArrowRight, Check, Eye, EyeOff, UserRound } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import { registerLocalAccount } from "../../services/auth/localAuth";
import { useAuthStore } from "../../store/authStore";
import "./SignUpPage.css";

export default function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useAuthStore((state) => state.setUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordLength = password.length >= 8;
  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (!passwordLength) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const user = await registerLocalAccount(name, email, password);
      setUser(user);
      const from = (location.state as { from?: { pathname?: string } } | null)
        ?.from?.pathname;
      navigate(from ?? ROUTES.dashboard, { replace: true });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to create your account.",
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
        <Link to="/" className="signup-logo">
          <span className="signup-logo-mark">CQ</span>
          <span>CareerQuest</span>
        </Link>

        <section className="signup-card">
          <div className="signup-card-header">
            <div className="signup-icon">
              <UserRound size={21} />
            </div>

            <span className="signup-kicker">START YOUR JOURNEY</span>

            <h1>
              Create your
              <span> CareerQuest account.</span>
            </h1>

            <p>
              Build your profile, explore career paths, and turn your next
              move into a clear plan.
            </p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-field">
              <label htmlFor="signup-name">Full name</label>

              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>

            <div className="signup-field">
              <label htmlFor="signup-email">Email address</label>

              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="signup-field">
              <label htmlFor="signup-password">Password</label>

              <div className="signup-password-wrapper">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="signup-password-rule">
              <span className={passwordLength ? "is-valid" : ""}>
                <Check size={13} />
                At least 8 characters
              </span>
            </div>

            <div className="signup-field">
              <label htmlFor="signup-confirm-password">
                Confirm password
              </label>

              <div className="signup-password-wrapper">
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((value) => !value)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {confirmPassword && (
              <div
                className={`signup-match ${
                  passwordsMatch ? "is-valid" : "is-invalid"
                }`}
              >
                {passwordsMatch
                  ? "Passwords match."
                  : "Passwords do not match."}
              </div>
            )}

            {error && <div className="signup-error">{error}</div>}

            <button
              className="signup-submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}

              {!isLoading && <ArrowRight size={17} />}
            </button>
          </form>

          <div className="signup-divider">
            <span>Already have an account?</span>
          </div>

          <Link
            to={ROUTES.signIn}
            state={location.state}
            className="signup-signin-link"
          >
            Sign in to CareerQuest
          </Link>

        </section>

        <p className="signup-footer">
          By continuing, you agree to use CareerQuest as your personal
          career-planning workspace.
        </p>
      </div>
    </main>
  );
}