import { createSignal, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { A, useNavigate } from "@solidjs/router";
import api from "~/lib/api";

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal<string | null>(null);
    const [success, setSuccess] = createSignal<string | null>(null);

    const [username, setUsername] = createSignal("admin");
    const [email, setEmail] = createSignal("admin@dakopi.com");
    const [password, setPassword] = createSignal("rahasia");

    const handleRegister = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const payload = {
                username: username(),
                email: email(),
                password: password()
            };

            const res = await api.post('/api/auth/register', payload);
            const data = res.data;

            if (data.status === 'success') {
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'An error occurred');
            } else {
                setError('Network error or server unreachable');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="min-h-screen bg-background text-foreground font-mono flex items-center justify-center p-4 relative overflow-hidden">
            <Title>Register | DAKOTA ADMIN</Title>

            {/* Background Decor */}
            <div class="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div class="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-accent/20 blur-[100px] rounded-full pointer-events-none"></div>

            <div class="w-full max-w-md bg-surface border-2 border-accent shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 p-8">
                <div class="mb-8 text-center border-b-2 border-accent pb-6">
                    <h1 class="font-oswald text-4xl font-black italic uppercase tracking-wider mb-2">
                        NEW <span class="text-primary">ACCESS</span>
                    </h1>
                    <p class="text-xs font-bold uppercase text-neutral-500 tracking-[0.2em]">Create your account</p>
                </div>

                <Show when={error()}>
                    <div class="mb-6 p-4 bg-red-500/10 border-2 border-red-500 text-red-500 text-xs font-bold uppercase">
                        ERROR: {error()}
                    </div>
                </Show>

                <Show when={success()}>
                    <div class="mb-6 p-4 bg-green-500/10 border-2 border-green-500 text-green-500 text-xs font-bold uppercase">
                        SUCCESS: {success()}
                    </div>
                </Show>

                <form onSubmit={handleRegister} class="space-y-6">
                    <div>
                        <label class="block text-xs font-bold uppercase text-neutral-500 mb-2">Username</label>
                        <input
                            type="text"
                            value={username()}
                            onInput={(e) => setUsername(e.currentTarget.value)}
                            class="w-full bg-background border-2 border-accent p-3 font-bold text-foreground focus:border-primary outline-none transition-colors placeholder-neutral-500"
                            placeholder="USERNAME"
                        />
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-neutral-500 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email()}
                            onInput={(e) => setEmail(e.currentTarget.value)}
                            class="w-full bg-background border-2 border-accent p-3 font-bold text-foreground focus:border-primary outline-none transition-colors placeholder-neutral-500"
                            placeholder="EMAIL@EXAMPLE.COM"
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

                    <button
                        type="submit"
                        disabled={loading()}
                        class="w-full bg-primary text-black font-oswald font-bold uppercase text-lg py-4 border-2 border-transparent hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading() ? 'Registering...' : 'Initialize Account'}
                    </button>
                </form>

                <div class="mt-8 pt-6 border-t-2 border-accent text-center">
                    <p class="text-xs font-mono font-bold text-neutral-500 uppercase">
                        Already have access? <A href="/login" class="text-primary hover:underline">Login here</A>
                    </p>
                </div>
            </div>
        </div>
    );
}
