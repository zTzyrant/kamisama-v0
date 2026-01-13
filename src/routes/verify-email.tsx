import { createSignal, onMount, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { A, useSearchParams, useNavigate } from "@solidjs/router";
import { authApi } from "~/lib/api";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = createSignal<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = createSignal("");

    onMount(async () => {
        const token = searchParams.token;
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link: No token provided.');
            return;
        }

        try {
            const res = await authApi.verifyEmail(token as string);
            if (res.data.status === 'success') {
                setStatus('success');
                setMessage('Email verified successfully! You can now login.');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setStatus('error');
                setMessage(res.data.message || 'Verification failed.');
            }
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data) {
                setStatus('error');
                setMessage(err.response.data.message || 'Verification failed.');
            } else {
                setStatus('error');
                setMessage('Network error or server unreachable.');
            }
        }
    });

    return (
        <div class="min-h-screen bg-background text-foreground font-mono flex items-center justify-center p-4 relative overflow-hidden">
            <Title>Verify Email | DAKOTA ADMIN</Title>

            {/* Background Decor */}
            <div class="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div class="w-full max-w-md bg-surface border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 p-8 text-center">
                <div class="mb-8 border-b-4 border-black pb-6">
                    <h1 class="font-oswald text-3xl font-black italic uppercase tracking-wider mb-2">
                        EMAIL <span class="bg-primary text-black px-2 border-2 border-black">VERIFICATION</span>
                    </h1>
                </div>

                <Show when={status() === 'verifying'}>
                    <div class="py-8">
                        <div class="animate-spin w-12 h-12 border-4 border-black border-t-primary rounded-full mx-auto mb-4"></div>
                        <p class="font-bold uppercase text-neutral-500 animate-pulse">Verifying token...</p>
                    </div>
                </Show>

                <Show when={status() === 'success'}>
                    <div class="py-8">
                        <div class="w-16 h-16 bg-green-500 text-black border-4 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-black">
                            ✓
                        </div>
                        <h2 class="text-xl font-bold uppercase text-green-500 mb-2">Verified!</h2>
                        <p class="text-sm font-bold text-neutral-500">{message()}</p>
                        <div class="mt-6 text-xs font-mono">
                            Redirecting to login in 3s...
                        </div>
                    </div>
                </Show>

                <Show when={status() === 'error'}>
                    <div class="py-8 text-center">
                        <div class="w-16 h-16 bg-red-500 text-white border-4 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-black">
                            !
                        </div>
                        <h2 class="text-xl font-bold uppercase text-red-500 mb-2">Failed</h2>
                        <p class="text-sm font-bold text-neutral-500 mb-6">{message()}</p>

                        <A href="/login" class="inline-block w-full bg-black text-white font-oswald font-bold uppercase text-lg py-3 border-2 border-transparent hover:bg-neutral-800 transition-colors">
                            Return to Login
                        </A>
                    </div>
                </Show>

            </div>
        </div>
    );
}
