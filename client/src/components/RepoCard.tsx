import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, ExternalLink } from "lucide-react";
import type { GitHubRepo } from "@shared/schema";

interface RepoCardProps {
  repo: GitHubRepo;
}

const languageColors: Record<string, string> = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-500",
  Python: "bg-blue-600",
  Java: "bg-orange-600",
  Go: "bg-cyan-500",
  Rust: "bg-orange-500",
  Ruby: "bg-red-600",
  PHP: "bg-purple-500",
  C: "bg-gray-600",
  "C++": "bg-pink-600",
  "C#": "bg-green-600",
  Swift: "bg-orange-400",
  Kotlin: "bg-purple-700",
  Dart: "bg-blue-400",
  Shell: "bg-green-500",
  HTML: "bg-orange-600",
  CSS: "bg-blue-500",
};

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="hover-elevate active-elevate-2 transition-all duration-200" data-testid={`card-repo-${repo.id}`}>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-1">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-2"
              data-testid={`link-repo-${repo.id}`}
            >
              {repo.name}
              <ExternalLink className="w-4 h-4" />
            </a>
          </CardTitle>
        </div>
        <CardDescription className="line-clamp-2 min-h-[2.5rem]">
          {repo.description || "No description available"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {repo.topics.slice(0, 4).map((topic) => (
              <Badge
                key={topic}
                variant="secondary"
                className="text-xs"
                data-testid={`badge-topic-${topic}`}
              >
                {topic}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {repo.language && (
            <div className="flex items-center gap-1.5" data-testid={`text-language-${repo.id}`}>
              <span
                className={`w-3 h-3 rounded-full ${
                  languageColors[repo.language] || "bg-gray-400"
                }`}
              />
              <span>{repo.language}</span>
            </div>
          )}
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1" data-testid={`text-stars-${repo.id}`}>
              <Star className="w-4 h-4" />
              <span>{repo.stargazers_count}</span>
            </div>
          )}
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1" data-testid={`text-forks-${repo.id}`}>
              <GitFork className="w-4 h-4" />
              <span>{repo.forks_count}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
