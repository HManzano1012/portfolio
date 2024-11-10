import { PersonalInfo } from "@/components/PersonalInfo";
import { Portfolio } from "@/components/Portfolio";

export default function Home() {
  return (
    <main
      className={`grid  grid-cols-3 p-9 text-overlay1`}
      style={{ height: "100dvh" }}
    >
      <div className="flex items-center justify-center">
        <PersonalInfo />
      </div>
      <div className="col-span-2">
        <Portfolio />
      </div>
    </main>
  );
}
