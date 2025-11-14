import { Github, Mail, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-card/50 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <button
                onClick={scrollToTop}
                className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover-elevate rounded-md px-2 py-1"
                data-testid="button-footer-brand"
              >
                Booze Lee
              </button>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                Baker Street 21B
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Distilling code, fermenting futures. 47 projects and counting.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4" data-testid="text-footer-links-title">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-projects"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    document.getElementById("repos")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-repos"
                >
                  Repositories
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    document.getElementById("support")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-support"
                >
                  Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4" data-testid="text-footer-social-title">
              Connect
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                asChild
                data-testid="button-footer-github"
              >
                <a
                  href="https://github.com/BoozeLee"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                data-testid="button-footer-email"
              >
                <a
                  href="mailto:kiliaan@bakersteeet221b.store"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                data-testid="button-footer-coffee"
              >
                <a
                  href="https://www.buymeacoffee.com/boozlee"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Buy Me a Coffee"
                >
                  <Coffee className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold mb-4" data-testid="text-footer-tech-title">
              Built With
            </h3>
            <p className="text-sm text-muted-foreground">
              React, TypeScript, Tailwind CSS, Express.js
            </p>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              Deployed on Replit
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              © {currentYear} Booze Lee. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground font-mono" data-testid="text-easter-egg">
              "Destiny's like a locked door — pick it wisely." - Dad's wisdom, 21B
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
