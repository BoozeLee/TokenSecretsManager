import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Coffee } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="flex items-center space-x-2 hover-elevate rounded-md px-3 py-2" data-testid="link-home">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Booze Lee
              </span>
              <span className="text-xs text-muted-foreground font-mono">221B</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("projects")}
              data-testid="button-nav-projects"
            >
              Projects
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("repos")}
              data-testid="button-nav-repos"
            >
              Repositories
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contact")}
              data-testid="button-nav-contact"
            >
              Contact
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("support")}
              className="text-primary"
              data-testid="button-nav-support"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Support
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                onClick={() => scrollToSection("projects")}
                className="justify-start"
                data-testid="button-mobile-projects"
              >
                Projects
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("repos")}
                className="justify-start"
                data-testid="button-mobile-repos"
              >
                Repositories
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("contact")}
                className="justify-start"
                data-testid="button-mobile-contact"
              >
                Contact
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("support")}
                className="justify-start text-primary"
                data-testid="button-mobile-support"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Support My Work
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
