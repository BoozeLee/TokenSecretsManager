import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Users, Star, GitFork } from "lucide-react";
import type { GitHubUser } from "@shared/schema";

interface HeroSectionProps {
  user?: GitHubUser;
  isLoading?: boolean;
}

export function HeroSection({ user, isLoading }: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center pt-24 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" data-testid="text-hero-title">
                Building the Future,{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  One Commit at a Time
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl" data-testid="text-hero-subtitle">
                {isLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : user?.bio ? (
                  user.bio
                ) : (
                  "Professional developer specializing in full-stack development, open source contributions, and innovative solutions. Based at Baker Street 221B."
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                data-testid="button-view-projects"
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("support")}
                data-testid="button-support-work"
              >
                Support My Work
              </Button>
            </div>

            {/* GitHub Stats Bar */}
            {!isLoading && user && (
              <div className="flex flex-wrap gap-3" data-testid="stats-github">
                <Card className="px-4 py-3 hover-elevate">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-semibold" data-testid="text-followers">{user.followers}</span>
                    <span className="text-muted-foreground">Followers</span>
                  </div>
                </Card>
                <Card className="px-4 py-3 hover-elevate">
                  <div className="flex items-center gap-2 text-sm">
                    <GitFork className="w-4 h-4 text-primary" />
                    <span className="font-semibold" data-testid="text-repos">{user.public_repos}</span>
                    <span className="text-muted-foreground">Repositories</span>
                  </div>
                </Card>
                <Card className="px-4 py-3 hover-elevate">
                  <div className="flex items-center gap-2 text-sm">
                    <Github className="w-4 h-4 text-primary" />
                    <span className="font-semibold" data-testid="text-username">{user.login}</span>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="relative">
            {isLoading ? (
              <div className="aspect-square rounded-lg bg-card animate-pulse" />
            ) : user ? (
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl">
                  <img
                    src={user.avatar_url}
                    alt={user.name || user.login}
                    className="w-full h-full object-cover"
                    data-testid="img-avatar"
                  />
                </div>
                <Badge
                  className="absolute -top-3 -right-3 px-4 py-2 text-sm font-mono"
                  variant="default"
                  data-testid="badge-221b"
                >
                  221B
                </Badge>
              </div>
            ) : (
              <Card className="aspect-square rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Github className="w-20 h-20 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">GitHub profile loading...</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
