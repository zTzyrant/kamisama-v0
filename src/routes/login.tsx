import { createSignal, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { A, useNavigate } from "@solidjs/router";
import api from "~/lib/api";

export default function Login() {
    const navigate = useNavigate();
    const [step, setStep] = createSignal<'login' | '2fa'>('login');
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal<string | null>(null);

    // Login Form State
    const [loginId, setLoginId] = createSignal("superadmin");
    const [password, setPassword] = createSignal("superpassword123");
    const [rememberMe, setRememberMe] = createSignal(false);

    // 2FA Form State
    const [tempToken, setTempToken] = createSignal("");
    const [twoFactorCode, setTwoFactorCode] = createSignal("");

    const handleLogin = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                login_id: loginId(),
                password: password(),
                remember_me: rememberMe()
            };

            // NOTE: In a real scenario, remove the mock response and use api.post
            // For demonstration if backend is not running, we might need a mock mode.
            // But user asked to use axios, so I will implement the real call.

            const res = await api.post('/api/auth/login', payload);
            const data = res.data;

            if (data.status === 'success') {
                // Normal Success
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('refresh_token', data.data.refresh_token);
                navigate('/dashboard');
            } else if (data.code === 'TWO_FACTOR_REQUIRED') {
                // 2FA Required
                setTempToken(data.data.temp_token);
                setStep('2fa');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data) {
                // Check if it's the 2FA error response format (some APIs return it as 4xx)
                const data = err.response.data;
                if (data.code === 'TWO_FACTOR_REQUIRED') {
                    setTempToken(data.data.temp_token);
                    setStep('2fa');
                } else {
                    setError(data.message || 'An error occurred');
                }
            } else {
                setError('Network error or server unreachable');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerify2FA = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                temp_token: tempToken(),
                code: twoFactorCode()
            };

            const res = await api.post('/api/auth/2fa/verify-login', payload);
            const data = res.data;

            if (data.status === 'success') {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('refresh_token', data.data.refresh_token);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Verification failed');
            }

        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Verification failed');
            } else {
                setError('Network error');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="min-h-screen bg-background text-foreground font-mono flex items-center justify-center p-4 relative overflow-hidden">
            <Title>Login | DAKOTA ADMIN</Title>

            {/* Background Decor */}
            <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div class="w-full max-w-md bg-surface border-2 border-accent shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 p-8">
                <div class="mb-8 text-center border-b-2 border-accent pb-6">
                    <h1 class="font-oswald text-4xl font-black italic uppercase tracking-wider mb-2">
                        <span class="bg-primary text-black px-2 mr-1">DAKOTA</span> ADMIN
                    </h1>
                    <p class="text-xs font-bold uppercase text-neutral-500 tracking-[0.2em]">Secure Access Terminal</p>
                </div>

                <Show when={error()}>
                    <div class="mb-6 p-4 bg-red-500/10 border-2 border-red-500 text-red-500 text-xs font-bold uppercase">
                        ERROR: {error()}
                    </div>
                </Show>

                <Show when={step() === 'login'}>
                    <form onSubmit={handleLogin} class="space-y-6">
                        <div>
                            <label class="block text-xs font-bold uppercase text-neutral-500 mb-2">Login ID</label>
                            <input
                                type="text"
                                value={loginId()}
                                onInput={(e) => setLoginId(e.currentTarget.value)}
                                class="w-full bg-background border-2 border-accent p-3 font-bold text-foreground focus:border-primary outline-none transition-colors placeholder-neutral-500"
                                placeholder="USERNAME"
                            />
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase text-neutral-500 mb-2">Password</label>
                            <input
                                type="password"
                                value={password()}
                                onInput={(e) => setPassword(e.currentTarget.value)}
                                class="w-full bg-background border-2 border-accent p-3 font-bold text-foreground focus:border-primary outline-none transition-colors placeholder-neutral-500"
                                placeholder="••••••••"
                            />
                        </div>
                        <div class="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe()}
                                onChange={(e) => setRememberMe(e.currentTarget.checked)}
                                class="appearance-none w-5 h-5 border-2 border-accent bg-background checked:bg-primary checked:border-primary cursor-pointer relative"
                            />
                            {/* Custom Checkmark logic handled by CSS or just simple usage for now */}
                            <label for="remember" class="text-xs font-bold uppercase text-neutral-500 cursor-pointer select-none">Remember access</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading()}
                            class="w-full bg-primary text-black font-oswald font-bold uppercase text-lg py-4 border-2 border-transparent hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading() ? 'Authenticating...' : 'Enter System'}
                        </button>
                    </form>
                </Show>

                <Show when={step() === '2fa'}>
                    <form onSubmit={handleVerify2FA} class="space-y-6">
                        <div class="text-center mb-6">
                            <p class="text-sm font-bold uppercase text-foreground">Two-Factor Required</p>
                            <p class="text-xs text-neutral-500 mt-1">Please enter the verification code sent to your device.</p>
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase text-neutral-500 mb-2">Verification Code</label>
                            <input
                                type="text"
                                value={twoFactorCode()}
                                onInput={(e) => setTwoFactorCode(e.currentTarget.value)}
                                class="w-full bg-background border-2 border-accent p-4 text-center font-mono text-2xl tracking-[0.5em] font-bold text-foreground focus:border-primary outline-none transition-colors placeholder-neutral-700"
                                placeholder="000000"
                                maxLength={6}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading()}
                            class="w-full bg-primary text-black font-oswald font-bold uppercase text-lg py-4 border-2 border-transparent hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading() ? 'Verifying...' : 'Unlock Access'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep('login')}
                            class="w-full text-xs font-bold uppercase text-neutral-500 hover:text-foreground mt-4"
                        >
                            Cancel / Back to Login
                        </button>
                    </form>
                </Show>

                <div class="mt-8 pt-6 border-t-2 border-accent text-center">
                    <p class="text-xs font-mono font-bold text-neutral-500 uppercase">
                        Don't have an account? <A href="/register" class="text-primary hover:underline">Register Access</A>
                    </p>
                </div>
            </div>
        </div>
    );
}
