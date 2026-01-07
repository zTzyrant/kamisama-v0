import { ParentProps, createSignal } from "solid-js";
import Sidebar from "~/components/dashboard/Sidebar";
import Navbar from "~/components/dashboard/Navbar";

export default function DashboardLayout(props: ParentProps) {
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(false);

  return (
    <div class="min-h-screen bg-background text-foreground font-mono selection:bg-primary selection:text-black">
      <Sidebar
        isOpen={isSidebarOpen()}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Wrapper */}
      {/* ml-0 on mobile, ml-64 on desktop */}
      <div class="flex flex-col min-h-screen transition-all duration-300 md:ml-64">
        <Navbar
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen())}
        />
        <main class="flex-1 p-4 md:p-12 relative overflow-x-hidden">
          {props.children}
        </main>
      </div>
    </div>
  );
}
