import { PersonalInfo } from "@/components/PersonalInfo";
import { Portfolio } from "@/components/Portfolio";
import HelpModal from "@/components/HelpModal";

export default function Home() {
  return (
    <main
      className={`grid  grid-cols-3 p-9 text-overlay1 relative`}
      style={{ height: "100dvh" }}
    >
      <div className="flex items-center justify-center">
        <PersonalInfo />
      </div>
      <div className="col-span-2">
        <Portfolio />
      </div>
      {/* Help indicator */}
      <div className="absolute bottom-9 left-9 text-xs font-mono text-subtext0">
        help:?
      </div>
      
      {/* Help Modal */}
      <HelpModal />
    </main>
  );
}
