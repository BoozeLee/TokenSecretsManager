import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const skills = {
  languages: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Go",
    "Java",
    "Rust",
  ],
  frameworks: [
    "React",
    "Node.js",
    "Express",
    "Next.js",
    "FastAPI",
    "Django",
  ],
  tools: [
    "Git",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "AWS",
  ],
  personal: [
    "Award Winning Napper",
    "Running",
  ],
};

export function SkillsSection() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold" data-testid="text-skills-title">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-skills-subtitle">
            The tools and technologies I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Languages */}
          <Card className="p-6" data-testid="card-languages">
            <h3 className="text-xl font-semibold mb-4">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                  data-testid={`badge-lang-${skill}`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Frameworks */}
          <Card className="p-6" data-testid="card-frameworks">
            <h3 className="text-xl font-semibold mb-4">Frameworks</h3>
            <div className="flex flex-wrap gap-2">
              {skills.frameworks.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                  data-testid={`badge-framework-${skill}`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Tools */}
          <Card className="p-6" data-testid="card-tools">
            <h3 className="text-xl font-semibold mb-4">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                  data-testid={`badge-tool-${skill}`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Personal Skills */}
          <Card className="p-6" data-testid="card-personal">
            <h3 className="text-xl font-semibold mb-4">Beyond Code</h3>
            <div className="flex flex-wrap gap-2">
              {skills.personal.map((skill) => (
                <Badge
                  key={skill}
                  variant="default"
                  className="text-sm px-3 py-1"
                  data-testid={`badge-personal-${skill}`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
