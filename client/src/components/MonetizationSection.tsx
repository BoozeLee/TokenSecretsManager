import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, CreditCard, Heart } from "lucide-react";
import { useLocation } from "wouter";

export function MonetizationSection() {
  const [, setLocation] = useLocation();

  return (
    <section id="support" className="py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold" data-testid="text-support-title">
            Support My Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-support-subtitle">
            Help me continue building open source projects and creating quality content
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Stripe - Commission Work */}
          <Card className="hover-elevate active-elevate-2 transition-all duration-200" data-testid="card-hire">
            <CardHeader className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Commission Work</CardTitle>
                <CardDescription className="text-base">
                  Need a custom project or professional consultation? Let's build something amazing together.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">Custom</span>
                  <span className="text-muted-foreground">pricing</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Tailored solutions for your specific needs
                </p>
              </div>
              <Button
                size="lg"
                className="w-full"
                onClick={() => setLocation("/checkout")}
                data-testid="button-hire"
              >
                Get Started
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Secure payment via Stripe
              </p>
            </CardContent>
          </Card>

          {/* Buy Me a Coffee */}
          <Card className="hover-elevate active-elevate-2 transition-all duration-200" data-testid="card-coffee">
            <CardHeader className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Coffee className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Buy Me a Coffee</CardTitle>
                <CardDescription className="text-base">
                  Support my open source work with a one-time contribution. Every coffee helps!
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$5</span>
                  <span className="text-muted-foreground">per coffee</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <Heart className="w-3 h-3 inline mr-1" />
                  Join the supporters
                </p>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                asChild
                data-testid="button-coffee"
              >
                <a
                  href="https://www.buymeacoffee.com/boozlee"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Buy Me a Coffee
                </a>
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                One-time contribution
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-social-proof">
            Trusted by developers and organizations worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
