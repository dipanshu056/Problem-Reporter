import { HeroSection } from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <div className="bg-background">
      <HeroSection onReportClick={() => console.log("Report clicked")} />
    </div>
  );
}
