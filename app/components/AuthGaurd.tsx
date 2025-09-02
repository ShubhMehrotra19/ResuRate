import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { usePuterStore } from '~/lib/puter';

export const useAuthGuard = (requireAuth: boolean = true) => {
    const { auth, isLoading, puterReady } = usePuterStore();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Wait for Puter to be ready and loading to finish
        if (!puterReady || isLoading) return;

        if (requireAuth && !auth.isAuthenticated) {
            // User needs to be authenticated but isn't - redirect to login
            const currentPath = location.pathname + location.search;
            navigate(`/auth?next=${encodeURIComponent(currentPath)}`, { replace: true });
        } else if (!requireAuth && auth.isAuthenticated) {
            // User shouldn't be authenticated but is - redirect to home
            navigate('/', { replace: true });
        }
    }, [auth.isAuthenticated, isLoading, puterReady, requireAuth, navigate, location]);

    return {
        isAuthenticated: auth.isAuthenticated,
        isLoading: isLoading || !puterReady,
        user: auth.user,
        canRender: puterReady && !isLoading && (
            (requireAuth && auth.isAuthenticated) ||
            (!requireAuth && !auth.isAuthenticated)
        )
    };
};

// Loading component for protected routes
export const AuthLoadingScreen = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking authentication...</p>
        </div>
    </div>
);

// HOC for protecting routes
export const withAuthGuard = (
    Component: React.ComponentType<any>,
    requireAuth: boolean = true
) => {
    return function ProtectedComponent(props: any) {
        const { canRender } = useAuthGuard(requireAuth);

        if (!canRender) {
            return <AuthLoadingScreen />;
        }

        return <Component {...props} />;
    };
};