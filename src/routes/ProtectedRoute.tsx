import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ROUTES } from "./paths";
import "./ProtectedRoute.css";

export default function ProtectedRoute() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const isLoading = useAuthStore((state) => state.isLoading);
	const location = useLocation();

	if (isLoading) {
		return (
			<main className="auth-session-loading" role="status" aria-live="polite">
				Checking your session...
			</main>
		);
	}

	if (!isAuthenticated) {
		return (
			<Navigate
				to={ROUTES.signIn}
				state={{ from: location }}
				replace
			/>
		);
	}

	return <Outlet />;
}
