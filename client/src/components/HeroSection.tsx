import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/Community_civic_engagement_hero_image_f0574b37.png";

interface HeroSectionProps {
  onReportClick: () => void;
}

export function HeroSection({ onReportClick }: HeroSectionProps) {
  return (
    <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Make Your Community Better
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          Report problems, track progress, and help improve your neighborhood
        </p>
        <Button
          size="lg"
          onClick={onReportClick}
          className="gap-2 text-lg px-8 py-6"
          data-testid="button-report-problem-hero"
        >
          Report a Problem
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
