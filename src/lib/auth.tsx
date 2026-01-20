import { createSignal, onMount, createResource, createContext, useContext, type ParentComponent } from 'solid-js';
import { authApi, type User } from './api';

interface AuthState {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<ReturnType<typeof makeAuthContext>>();

function makeAuthContext() {
    const [user, setUser] = createSignal<User | null>(null);
    const [loading, setLoading] = createSignal(true);

    const checkAuth = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            if (!token) {
                setUser(null);
                return;
            }
            const response = await authApi.getProfile();
            if (response.data.status === 'success') {
                setUser(response.data.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (token: string, refreshToken: string, user: User) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        setUser(user);
    };

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await authApi.logout(refreshToken);
            }
        } catch (e) {
            console.error("Logout error", e);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setUser(null);
            window.location.href = '/login';
        }
    };

    // Initial check
    onMount(() => {
        checkAuth();
    });

    return {
        user,
        loading,
        isAuthenticated: () => !!user(),
        checkAuth,
        login,
        logout
    };
}

export const AuthProvider: ParentComponent = (props) => {
    const auth = makeAuthContext();
    return (
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
