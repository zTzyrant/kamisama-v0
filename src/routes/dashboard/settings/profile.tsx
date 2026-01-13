import { createSignal, createResource, Show, onMount } from "solid-js";
import { Title } from "@solidjs/meta";
import { authApi } from "~/lib/api";
import { useAuth } from "~/lib/auth";

export default function Profile() {
    const { user, checkAuth } = useAuth();

    // 2FA Setup State
    const [setupStep, setSetupStep] = createSignal<'idle' | 'qr' | 'success'>('idle');
    const [qrData, setQrData] = createSignal<{ secret: string, qr_code_url: string } | null>(null);
    const [confirmCode, setConfirmCode] = createSignal("");
    const [backupCodes, setBackupCodes] = createSignal<string[]>([]);

    // Disable 2FA State
    const [disablePassword, setDisablePassword] = createSignal("");
    const [showDisableConfirm, setShowDisableConfirm] = createSignal(false);

    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal<string | null>(null);
    const [success, setSuccess] = createSignal<string | null>(null);

    const start2FASetup = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await authApi.setup2fa();
            if (res.data.status === 'success') {
                setQrData({
                    secret: res.data.data.secret,
                    qr_code_url: res.data.data.qr_code_url
                });
                setSetupStep('qr');
            } else {
                setError(res.data.message || 'Failed to start 2FA setup');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to start 2FA setup');
        } finally {
            setLoading(false);
        }
    };

    const confirm2FASetup = async (e: Event) => {
        e.preventDefault();
        if (!qrData()) return;

        setLoading(true);
        setError(null);
        try {
            const res = await authApi.confirm2fa({
                secret: qrData()!.secret,
                code: confirmCode()
            });

            if (res.data.status === 'success') {
                setBackupCodes(res.data.data.backup_codes);
                setSetupStep('success');
                await checkAuth(); // Refresh user state
            } else {
                setError(res.data.message || 'Verification failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDisable2FA = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await authApi.disable2fa(disablePassword());
            if (res.data.status === 'success') {
                setSuccess('Two-Factor Authentication disabled.');
                setShowDisableConfirm(false);
                setDisablePassword("");
                await checkAuth(); // Refresh user state
            } else {
                setError(res.data.message || 'Failed to disable 2FA');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to disable 2FA');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="p-8 max-w-4xl mx-auto space-y-8 font-mono">
            <Title>Profile | Dashboard</Title>

            <header class="border-b-4 border-black pb-6">
                <h1 class="font-oswald text-5xl font-black uppercase tracking-tighter">
                    USER <span class="bg-primary text-black px-2 border-2 border-black inline-block transform -skew-x-12">PROFILE</span>
                </h1>
                <p class="text-neutral-500 font-bold uppercase tracking-widest mt-2">Manage your identity and security</p>
            </header>

            <Show when={user()} fallback={<div class="animate-pulse">Loading profile...</div>}>
                <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Identity Card */}
                    <div class="bg-surface border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                        <h2 class="font-oswald text-2xl font-bold uppercase mb-6 border-b-2 border-black pb-2">Identity</h2>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-xs font-bold uppercase text-neutral-500 mb-1">Username</label>
                                <div class="font-bold text-xl">{user()?.username}</div>
                            </div>
                            <div>
                                <label class="block text-xs font-bold uppercase text-neutral-500 mb-1">Email</label>
                                <div class="font-bold text-xl">{user()?.email}</div>
                            </div>
                            <div>
                                <label class="block text-xs font-bold uppercase text-neutral-500 mb-1">Roles</label>
                                <div class="flex gap-2 flex-wrap">
                                    {user()?.roles.map(role => (
                                        <span class="bg-accent text-background px-2 py-1 text-xs font-bold uppercase rounded-none">
                                            {role.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Card */}
                    <div class="bg-surface border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                        <h2 class="font-oswald text-2xl font-bold uppercase mb-6 border-b-2 border-black pb-2">Security</h2>

                        <Show when={error()}>
                            <div class="mb-4 p-3 bg-red-500/10 border-2 border-red-500 text-red-500 text-xs font-bold uppercase">
                                {error()}
                            </div>
                        </Show>

                        <Show when={success()}>
                            <div class="mb-4 p-3 bg-green-500/10 border-2 border-green-500 text-green-500 text-xs font-bold uppercase">
                                {success()}
                            </div>
                        </Show>

                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <span class="font-bold uppercase">Two-Factor Auth</span>
                                <span class={`px-3 py-1 font-bold text-xs uppercase border-2 border-black ${user()?.two_factor_enabled ? 'bg-green-400' : 'bg-neutral-200'}`}>
                                    {user()?.two_factor_enabled ? 'ENABLED' : 'DISABLED'}
                                </span>
                            </div>

                            <Show when={!user()?.two_factor_enabled}>
                                <Show when={setupStep() === 'idle'}>
                                    <p class="text-sm text-neutral-600">Protect your account with an extra layer of security using an authenticator app.</p>
                                    <button
                                        onClick={start2FASetup}
                                        disabled={loading()}
                                        class="w-full bg-black text-white font-oswald font-bold uppercase py-3 border-2 border-transparent hover:bg-primary hover:text-black transition-colors"
                                    >
                                        Setup 2FA
                                    </button>
                                </Show>

                                <Show when={setupStep() === 'qr'}>
                                    <div class="bg-white p-4 border-2 border-black text-center">
                                        <p class="text-xs font-bold uppercase mb-2">Scan this QR Code</p>
                                        <div class="bg-neutral-100 p-2 mb-4 mx-auto w-48 h-48 flex items-center justify-center border border-dashed border-black">
                                            {/* In a real app we would use a QR code library to render qr_code_url */}
                                            {/* For now we just assume qr_code_url is the image URL or we'd need qrcode.react equivelant */}
                                            <img src={qrData()?.qr_code_url} alt="QR Code" class="w-full h-full object-contain" />
                                        </div>
                                        <p class="text-[10px] break-all font-mono bg-neutral-100 p-2 mb-4">Secret: {qrData()?.secret}</p>

                                        <form onSubmit={confirm2FASetup} class="space-y-3">
                                            <input
                                                type="text"
                                                value={confirmCode()}
                                                onInput={(e) => setConfirmCode(e.currentTarget.value)}
                                                placeholder="ENTER 6-DIGIT CODE"
                                                class="w-full border-2 border-black p-2 text-center font-bold tracking-widest outline-none focus:bg-primary/20"
                                                maxLength={6}
                                            />
                                            <div class="flex gap-2">
                                                <button type="button" onClick={() => setSetupStep('idle')} class="flex-1 py-2 text-xs font-bold uppercase text-neutral-500 hover:text-black hover:underline">Cancel</button>
                                                <button type="submit" disabled={loading()} class="flex-1 bg-black text-white font-bold uppercase text-xs py-2 hover:bg-neutral-800">Verify & Enable</button>
                                            </div>
                                        </form>
                                    </div>
                                </Show>

                                <Show when={setupStep() === 'success'}>
                                    <div class="bg-green-50 border-2 border-green-500 p-4">
                                        <h3 class="font-bold text-green-700 uppercase mb-2">2FA Enabled Successfully!</h3>
                                        <p class="text-sm text-green-900 mb-4">Store these backup codes safely. You will not see them again.</p>
                                        <div class="bg-white border border-green-200 p-3 grid grid-cols-2 gap-2 mb-4 font-mono text-xs">
                                            {backupCodes().map(code => <div>{code}</div>)}
                                        </div>
                                        <button onClick={() => setSetupStep('idle')} class="w-full bg-green-500 text-white font-bold uppercase py-2">Done</button>
                                    </div>
                                </Show>
                            </Show>

                            <Show when={user()?.two_factor_enabled}>
                                <Show when={!showDisableConfirm()}>
                                    <button
                                        onClick={() => setShowDisableConfirm(true)}
                                        class="w-full border-2 border-red-500 text-red-500 font-oswald font-bold uppercase py-3 hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        Disable 2FA
                                    </button>
                                </Show>

                                <Show when={showDisableConfirm()}>
                                    <div class="border-2 border-red-500 p-4 bg-red-50">
                                        <p class="text-xs font-bold uppercase text-red-600 mb-3">Enter password to disable 2FA</p>
                                        <form onSubmit={handleDisable2FA} class="space-y-3">
                                            <input
                                                type="password"
                                                value={disablePassword()}
                                                onInput={(e) => setDisablePassword(e.currentTarget.value)}
                                                placeholder="PASSWORD"
                                                class="w-full border-2 border-red-300 p-2 font-bold outline-none focus:border-red-500"
                                            />
                                            <div class="flex gap-2">
                                                <button type="button" onClick={() => setShowDisableConfirm(false)} class="flex-1 py-2 text-xs font-bold uppercase text-red-400 hover:text-red-600">Cancel</button>
                                                <button type="submit" disabled={loading()} class="flex-1 bg-red-500 text-white font-bold uppercase text-xs py-2 hover:bg-red-600">Confirm Disable</button>
                                            </div>
                                        </form>
                                    </div>
                                </Show>
                            </Show>

                        </div>
                    </div>
                </section>
            </Show>
        </div>
    );
}
