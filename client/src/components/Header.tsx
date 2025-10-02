import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Home, Map, Shield } from "lucide-react";

export function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity" data-testid="link-home">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
            Problem Reporter
          </a>
        </Link>

        <nav className="flex items-center gap-2">
          <Link href="/">
            <Button
              variant={location === "/" ? "secondary" : "ghost"}
              className="gap-2"
              data-testid="button-nav-home"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
          
          <Link href="/map">
            <Button
              variant={location === "/map" ? "secondary" : "ghost"}
              className="gap-2"
              data-testid="button-nav-map"
            >
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Map</span>
            </Button>
          </Link>
          
          <Link href="/admin">
            <Button
              variant={location === "/admin" ? "secondary" : "ghost"}
              className="gap-2"
              data-testid="button-nav-admin"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
