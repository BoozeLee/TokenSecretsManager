import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredProjects = [
  {
    id: 1,
    title: "c Project Talent",
    description: "Talent management and recruitment platform with advanced matching algorithms and collaborative features.",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "Baker Street Analytics",
    description: "Detective-themed data analysis toolkit for pattern recognition and insights generation.",
    tech: ["Python", "TensorFlow", "FastAPI"],
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Open Source Contributions",
    description: "Active contributor to various open source projects focused on developer tools and infrastructure.",
    tech: ["Various"],
    github: "#",
  },
];

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-20 px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="px-4 py-1" data-testid="badge-section-featured">
            Featured Work
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold" data-testid="text-featured-title">
            Selected Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-featured-subtitle">
            A showcase of my most impactful projects and contributions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              className="hover-elevate active-elevate-2 transition-all duration-200"
              data-testid={`card-project-${project.id}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span data-testid={`text-project-title-${project.id}`}>{project.title}</span>
                  {project.id === 1 && (
                    <Badge variant="default" className="text-xs">
                      Featured
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription data-testid={`text-project-desc-${project.id}`}>
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs"
                      data-testid={`badge-tech-${tech}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                    data-testid={`button-github-${project.id}`}
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  {project.demo && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                      data-testid={`button-demo-${project.id}`}
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
