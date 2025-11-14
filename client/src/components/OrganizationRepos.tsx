import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RepoCard } from "./RepoCard";
import type { GitHubRepo, GitHubOrganization } from "@shared/schema";

interface OrganizationReposProps {
  organization?: GitHubOrganization;
  repos: GitHubRepo[];
  isLoading?: boolean;
}

type FilterType = "all" | "stars" | "recent";

export function OrganizationRepos({ organization, repos, isLoading }: OrganizationReposProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const sortedRepos = [...repos].sort((a, b) => {
    if (filter === "stars") {
      return b.stargazers_count - a.stargazers_count;
    }
    if (filter === "recent") {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
    return 0;
  });

  return (
    <section id="repos" className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="px-4 py-1" data-testid="badge-section-org">
            Organization
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold" data-testid="text-org-title">
            {organization?.name || "c Project Talent"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-org-subtitle">
            {organization?.description || "Collaborative projects and organizational repositories"}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            data-testid="button-filter-all"
          >
            All
          </Button>
          <Button
            variant={filter === "stars" ? "default" : "outline"}
            onClick={() => setFilter("stars")}
            data-testid="button-filter-stars"
          >
            Most Stars
          </Button>
          <Button
            variant={filter === "recent" ? "default" : "outline"}
            onClick={() => setFilter("recent")}
            data-testid="button-filter-recent"
          >
            Recently Updated
          </Button>
        </div>

        {/* Repositories Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-48 rounded-lg bg-card animate-pulse"
                data-testid={`skeleton-repo-${i}`}
              />
            ))}
          </div>
        ) : sortedRepos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground font-mono" data-testid="text-empty-repos">
              More projects brewing at 221B...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
