import { Title } from "@solidjs/meta";
import { Upload, CheckCircle, Save, Trash2 } from "lucide-solid";

export default function SettingsProfile() {
    return (
        <>
            <Title>Settings | DAKOTA ADMIN</Title>
            <div class="mx-auto">
                <div class="flex justify-between items-end mb-12 border-b border-accent pb-6">
                    <div>
                        <h1 class="text-5xl md:text-6xl font-oswald font-black italic uppercase tracking-tight mb-2 text-foreground">Profile Settings</h1>
                        <p class="text-neutral-500 font-mono text-sm uppercase">Manage your personal information and security.</p>
                    </div>
                    <div class="hidden md:block">
                        <span class="bg-accent/10 border border-accent px-2 py-1 text-xs font-mono uppercase text-foreground">Role: Administrator</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Avatar Section */}
                    <div class="md:col-span-1">
                        <h2 class="text-2xl font-oswald font-bold uppercase mb-6 border-l-4 border-primary pl-3 text-foreground">Avatar</h2>
                        <div class="aspect-square w-full bg-accent/5 border border-accent flex flex-col items-center justify-center relative group cursor-pointer mb-4 overflow-hidden">
                            <div class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity z-0"></div>
                            {/* Placeholder Avatar */}
                            <div class="absolute inset-0 flex items-center justify-center text-neutral-400 group-hover:scale-105 transition-transform duration-500">
                                <span class="font-oswald text-4xl">IMG</span>
                            </div>
                            <div class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Upload class="text-white w-10 h-10" />
                            </div>
                        </div>
                        <p class="text-xs text-neutral-500 font-mono mb-4 text-justify">
                            RECOMMENDED: 800x800px JPG or PNG. MAX SIZE: 2MB. BRUTALIST AESTHETIC FAVORS HIGH CONTRAST PORTRAITS.
                        </p>
                        <button class="w-full border border-accent py-2 text-xs font-bold uppercase hover:bg-primary hover:text-black hover:border-primary transition-colors text-foreground">
                            Remove Photo
                        </button>
                    </div>

                    {/* Form Section */}
                    <div class="md:col-span-2 space-y-10">
                        <section>
                            <h2 class="text-2xl font-oswald font-bold uppercase mb-6 border-l-4 border-primary pl-3 text-foreground">Personal Information</h2>
                            <div class="grid grid-cols-1 gap-6">
                                <div class="group">
                                    <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-neutral-500 group-focus-within:text-primary transition-colors">Display Name</label>
                                    <div class="border border-accent bg-transparent focus-within:border-primary transition-colors">
                                        <input class="w-full bg-transparent border-none text-lg p-4 focus:ring-0 placeholder-neutral-500 text-foreground font-mono outline-none" type="text" value="Dakota Johnson" />
                                    </div>
                                </div>
                                <div class="group">
                                    <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-neutral-500 group-focus-within:text-primary transition-colors">Email Address</label>
                                    <div class="border border-accent bg-transparent flex items-center focus-within:border-primary transition-colors">
                                        <input class="w-full bg-transparent border-none text-lg p-4 focus:ring-0 placeholder-neutral-500 text-foreground font-mono outline-none" type="email" value="dakota@example.com" />
                                        <CheckCircle class="text-green-500 mr-4 w-5 h-5" />
                                    </div>
                                </div>
                                <div class="group">
                                    <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-neutral-500 group-focus-within:text-primary transition-colors">Bio / Slug</label>
                                    <div class="border border-accent bg-transparent focus-within:border-primary transition-colors">
                                        <textarea class="w-full bg-transparent border-none text-sm p-4 focus:ring-0 placeholder-neutral-500 text-foreground font-mono resize-none outline-none" rows="4">Digital nomad. Brutalist enthusiast. Developing the next generation of web interfaces.</textarea>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 class="text-2xl font-oswald font-bold uppercase mb-6 border-l-4 border-primary pl-3 text-foreground">Security</h2>
                            <div class="space-y-6">
                                <div class="border border-accent p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-accent/5">
                                    <div>
                                        <h3 class="text-lg font-bold uppercase mb-1 text-foreground">Multi-Factor Auth</h3>
                                        <p class="text-xs font-mono text-neutral-500">Add an extra layer of security to your account.</p>
                                    </div>
                                    <button class="bg-accent/20 text-foreground px-6 py-2 text-xs font-bold uppercase hover:bg-primary hover:text-black transition-colors min-w-[120px]">
                                        Enable MFA
                                    </button>
                                </div>
                                <div class="group">
                                    <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-neutral-500 group-focus-within:text-primary transition-colors">Change Password</label>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div class="border border-accent bg-transparent focus-within:border-primary transition-colors">
                                            <input class="w-full bg-transparent border-none text-sm p-4 focus:ring-0 placeholder-neutral-500 text-foreground font-mono outline-none" placeholder="NEW PASSWORD" type="password" />
                                        </div>
                                        <div class="border border-accent bg-transparent focus-within:border-primary transition-colors">
                                            <input class="w-full bg-transparent border-none text-sm p-4 focus:ring-0 placeholder-neutral-500 text-foreground font-mono outline-none" placeholder="CONFIRM PASSWORD" type="password" />
                                        </div>
                                    </div>
                                    <button class="mt-4 w-full sm:w-auto bg-foreground text-background px-8 py-3 font-bold uppercase text-sm hover:bg-primary hover:text-black transition-colors">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section class="mt-12 pt-8 border-t border-red-900/30">
                            <h2 class="text-2xl font-oswald font-bold uppercase mb-6 text-red-600 dark:text-red-500">Danger Zone</h2>
                            <div class="border border-red-600/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-red-50 dark:bg-red-900/10">
                                <div>
                                    <h3 class="text-lg font-bold uppercase mb-1 text-red-700 dark:text-red-400">Delete Account</h3>
                                    <p class="text-xs font-mono text-red-600/70 dark:text-red-400/70">Once you delete your account, there is no going back. Please be certain.</p>
                                </div>
                                <button class="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-2 text-xs font-bold uppercase transition-colors whitespace-nowrap flex items-center gap-2">
                                    <Trash2 class="w-4 h-4" />
                                    Delete Account
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="h-24"></div>
            </div>

            <div class="h-16 border-t border-accent flex items-center justify-between px-8 bg-surface fixed bottom-0 left-64 right-0 z-10 w-auto">
                <span class="text-xs font-mono text-neutral-500">LAST SAVED: TODAY AT 10:42 AM</span>
                <div class="flex gap-4">
                    <button class="text-xs font-bold uppercase text-neutral-500 hover:text-foreground px-4 py-2 hover:bg-accent/10 transition-colors">Discard</button>
                    <button class="bg-primary text-black px-8 py-2 text-sm font-bold uppercase hover:bg-foreground hover:text-background transition-colors">Save Changes</button>
                </div>
            </div>
        </>
    );
}
