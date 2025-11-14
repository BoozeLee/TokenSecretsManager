import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { RepoCard } from "./RepoCard";
import type { GitHubRepo } from "@shared/schema";

interface PersonalReposProps {
  repos: GitHubRepo[];
  isLoading?: boolean;
}

export function PersonalRepos({ repos, isLoading }: PersonalReposProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRepos = useMemo(() => {
    if (!searchQuery.trim()) return repos;
    
    const query = searchQuery.toLowerCase();
    return repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(query) ||
        repo.description?.toLowerCase().includes(query) ||
        repo.topics?.some((topic) => topic.toLowerCase().includes(query))
    );
  }, [repos, searchQuery]);

  return (
    <section className="py-20 px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="px-4 py-1" data-testid="badge-section-personal">
            Personal Projects
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold" data-testid="text-personal-title">
            My Repositories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-personal-subtitle">
            Explore my open source contributions and personal projects
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
              data-testid="input-search-repos"
            />
          </div>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <p className="text-center text-sm text-muted-foreground mb-6" data-testid="text-results-count">
            Found {filteredRepos.length} {filteredRepos.length === 1 ? "repository" : "repositories"}
          </p>
        )}

        {/* Repositories Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-48 rounded-lg bg-card animate-pulse"
                data-testid={`skeleton-personal-${i}`}
              />
            ))}
          </div>
        ) : filteredRepos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground" data-testid="text-no-results">
              No repositories found matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground" data-testid="text-empty-personal">
              No repositories available
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
