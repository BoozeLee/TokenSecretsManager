import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { OrganizationRepos } from "@/components/OrganizationRepos";
import { PersonalRepos } from "@/components/PersonalRepos";
import { MonetizationSection } from "@/components/MonetizationSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import type { GitHubUser, GitHubRepo, GitHubOrganization } from "@shared/schema";

export default function Home() {
  const { data: githubUser, isLoading: isLoadingUser } = useQuery<GitHubUser>({
    queryKey: ["/api/github/user"],
  });

  const { data: orgRepos = [], isLoading: isLoadingOrgRepos } = useQuery<GitHubRepo[]>({
    queryKey: ["/api/github/organization/repos"],
  });

  const { data: personalRepos = [], isLoading: isLoadingPersonalRepos } = useQuery<GitHubRepo[]>({
    queryKey: ["/api/github/repos"],
  });

  const { data: organization } = useQuery<GitHubOrganization>({
    queryKey: ["/api/github/organization"],
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection user={githubUser} isLoading={isLoadingUser} />
      <FeaturedProjects />
      <OrganizationRepos
        organization={organization}
        repos={orgRepos}
        isLoading={isLoadingOrgRepos}
      />
      <PersonalRepos repos={personalRepos} isLoading={isLoadingPersonalRepos} />
      <MonetizationSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
