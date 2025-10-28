import { PersonalInfo } from "@/components/PersonalInfo";
import { Portfolio } from "@/components/Portfolio";
import HelpModal from "@/components/HelpModal";

export default function Home() {
  return (
    <main
      className={`grid grid-cols-1 lg:grid-cols-3 p-4 lg:p-9 text-overlay1 relative`}
      style={{ height: "100dvh" }}
    >
      <div className="flex items-center justify-center">
        <PersonalInfo />
      </div>
      <div className="col-span-1 lg:col-span-2">
        <Portfolio />
      </div>
      {/* Help indicator */}
      <div className="hidden lg:block absolute bottom-4 left-4 lg:bottom-9 lg:left-9 text-xs font-mono text-subtext0">
        help: ? , themes: shift+t
      </div>
      
      {/* Help Modal */}
      <HelpModal />
    </main>
  );
}
