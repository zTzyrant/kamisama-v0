import { Title } from "@solidjs/meta";
import { Upload, Search, Filter, MoreHorizontal, Image as ImageIcon, File, Trash2, Download } from "lucide-solid";
import { createSignal } from "solid-js";

export default function MediaLibrary() {
    return (
        <>
            <Title>Media Library | DAKOTA ADMIN</Title>

            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 class="text-5xl md:text-7xl font-oswald font-black italic uppercase leading-none text-foreground">
                        Media Library
                    </h1>
                </div>
                <button class="bg-foreground text-background font-oswald font-bold uppercase py-3 px-6 hover:opacity-90 transition-colors flex items-center gap-2">
                    <Upload class="w-4 h-4" />
                    Upload Assets
                </button>
            </div>

            {/* Toolbar */}
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                <div class="md:col-span-8 relative">
                    <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                    <input
                        class="w-full bg-background border-2 border-accent text-sm font-bold p-4 pl-12 uppercase focus:ring-0 focus:border-primary placeholder-neutral-500 transition-colors text-foreground outline-none"
                        placeholder="SEARCH ASSETS..."
                        type="text"
                    />
                </div>
                <div class="md:col-span-2">
                    <button class="w-full h-full bg-background border-2 border-accent flex items-center justify-between px-4 font-bold uppercase text-xs text-neutral-500 hover:border-primary transition-colors">
                        <span>Filter: All</span>
                        <Filter class="w-4 h-4" />
                    </button>
                </div>
                <div class="md:col-span-2">
                    <div class="w-full h-full bg-background border-2 border-accent flex items-center justify-center gap-2 text-neutral-500">
                        <span class="font-mono text-xs font-bold">42 ITEMS</span>
                    </div>
                </div>
            </div>

            {/* Dropzone (Visual) */}
            <div class="border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-accent/5 h-32 flex flex-col items-center justify-center mb-12 hover:border-primary hover:bg-accent/10 transition-all cursor-pointer group">
                <Upload class="text-neutral-400 group-hover:text-primary w-8 h-8 mb-3 transition-colors" />
                <p class="font-oswald font-bold text-neutral-400 group-hover:text-foreground uppercase transition-colors">Drag and drop files to upload</p>
                <p class="font-mono text-[10px] text-neutral-400 mt-1 uppercase">Max size: 10MB // Supported: JPG, PNG, GIF, WEBP</p>
            </div>

            {/* Media Grid */}
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* Item 1 */}
                <div class="aspect-square bg-accent/20 border-2 border-transparent hover:border-primary relative group cursor-pointer overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                    <div class="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between">
                        <span class="text-[10px] font-mono font-bold text-white uppercase truncate">abstract_01.jpg</span>
                        <button class="text-white hover:text-primary"><MoreHorizontal class="w-4 h-4" /></button>
                    </div>
                </div>

                {/* Item 2 */}
                <div class="aspect-square bg-accent/20 border-2 border-transparent hover:border-primary relative group cursor-pointer overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                    <div class="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between">
                        <span class="text-[10px] font-mono font-bold text-white uppercase truncate">neon_signs.png</span>
                        <button class="text-white hover:text-primary"><MoreHorizontal class="w-4 h-4" /></button>
                    </div>
                </div>

                {/* Item 3 */}
                <div class="aspect-square bg-accent/20 border-2 border-transparent hover:border-primary relative group cursor-pointer overflow-hidden">
                    <div class="w-full h-full flex flex-col items-center justify-center bg-accent/10 text-neutral-500">
                        <File class="w-12 h-12 mb-2" />
                        <span class="font-oswald font-bold text-xs uppercase">DOCUMENT.PDF</span>
                    </div>
                    <div class="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between">
                        <span class="text-[10px] font-mono font-bold text-white uppercase truncate">brief_v2.pdf</span>
                        <button class="text-white hover:text-primary"><MoreHorizontal class="w-4 h-4" /></button>
                    </div>
                </div>

                {/* Placeholders */}
                {Array.from({ length: 7 }).map((_, i) => (
                    <div class="aspect-square bg-accent/10 border-2 border-transparent hover:border-primary relative group cursor-pointer overflow-hidden flex items-center justify-center">
                        <ImageIcon class="w-8 h-8 text-neutral-300 dark:text-neutral-600" />
                        <div class="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between">
                            <span class="text-[10px] font-mono font-bold text-white uppercase truncate">placeholder_{i + 1}.jpg</span>
                            <button class="text-white hover:text-primary"><MoreHorizontal class="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
