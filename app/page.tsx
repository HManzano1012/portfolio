import { PersonalInfo } from "@/components/personalInfo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" style={{height:'100dvh'}}>
      <PersonalInfo />
    </main>
  );
}
