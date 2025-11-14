import type { Express } from "express";
import { createServer, type Server } from "http";
import { Octokit } from "@octokit/rest";
import Stripe from "stripe";

// Initialize GitHub API client
const octokit = process.env.GITHUB_TOKEN
  ? new Octokit({ auth: process.env.GITHUB_TOKEN })
  : new Octokit();

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-04-10" as any })
  : null;

// Configuration
const GITHUB_USERNAME = "BoozeLee";
const ORGANIZATION_NAME = "cProjectTalent";

export async function registerRoutes(app: Express): Promise<Server> {
  // GitHub API: Get authenticated user profile
  app.get("/api/github/user", async (req, res) => {
    try {
      let data;
      
      if (process.env.GITHUB_TOKEN) {
        // Try authenticated request if token is available
        try {
          const response = await octokit.rest.users.getAuthenticated();
          data = response.data;
        } catch (authError) {
          console.warn("GitHub authenticated request failed, falling back to public API");
          try {
            const response = await octokit.rest.users.getByUsername({ username: GITHUB_USERNAME });
            data = response.data;
          } catch (publicError) {
            // User doesn't exist, return friendly defaults
            data = null;
          }
        }
      } else {
        // Use public API if no token
        try {
          const response = await octokit.rest.users.getByUsername({ username: GITHUB_USERNAME });
          data = response.data;
        } catch (publicError) {
          // User doesn't exist, return friendly defaults
          data = null;
        }
      }
      
      if (!data) {
        // Return friendly default data
        res.json({
          login: "BoozeLee",
          name: "Booze Lee",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=BoozeLee",
          bio: "Distilling Code, Fermenting Futures — One Bug at a Time. I code like I brew: strong, bold, and with a kick that lingers. 47 projects and counting.",
          public_repos: 47,
          followers: 100,
          following: 42,
          html_url: "https://github.com/BoozeLee",
          location: "Baker Street 21B",
          email: "kiliaan@bakersteeet221b.store",
        });
      } else {
        res.json(data);
      }
    } catch (error: any) {
      console.error("GitHub user fetch error:", error);
      res.status(500).json({ 
        message: "Failed to fetch GitHub user",
        error: error.message 
      });
    }
  });

  // GitHub API: Get user repositories
  app.get("/api/github/repos", async (req, res) => {
    try {
      let data: any[] = [];
      
      if (process.env.GITHUB_TOKEN) {
        // Try authenticated request if token is available
        try {
          const response = await octokit.rest.repos.listForAuthenticatedUser({
            sort: "updated",
            per_page: 30,
            type: "owner",
          });
          data = response.data;
        } catch (authError) {
          console.warn("GitHub authenticated repos request failed, falling back to public API");
          try {
            const response = await octokit.rest.repos.listForUser({
              username: GITHUB_USERNAME,
              sort: "updated",
              per_page: 30,
              type: "owner",
            });
            data = response.data;
          } catch (publicError) {
            // User doesn't exist, return empty array
            data = [];
          }
        }
      } else {
        // Use public API if no token
        try {
          const response = await octokit.rest.repos.listForUser({
            username: GITHUB_USERNAME,
            sort: "updated",
            per_page: 30,
            type: "owner",
          });
          data = response.data;
        } catch (publicError) {
          // User doesn't exist, return empty array
          data = [];
        }
      }

      // Filter out forks by default
      const repos = data.filter((repo: any) => !repo.fork);
      res.json(repos);
    } catch (error: any) {
      console.error("GitHub repos fetch error:", error);
      // Return empty array instead of error for graceful degradation
      res.json([]);
    }
  });

  // GitHub API: Get organization info
  app.get("/api/github/organization", async (req, res) => {
    try {
      const { data } = await octokit.rest.orgs.get({
        org: ORGANIZATION_NAME,
      });
      res.json(data);
    } catch (error: any) {
      console.error("GitHub organization fetch error:", error);
      // Return friendly defaults if org doesn't exist
      res.json({
        login: "cProjectTalent",
        name: "c Project Talent",
        avatar_url: "https://api.dicebear.com/7.x/identicon/svg?seed=cProjectTalent",
        description: "Turning raw talent into distilled genius — 0 to IPO in 47 projects or less. We don't hire resumes. We hire reboots.",
        html_url: "https://github.com/cProjectTalent",
        public_repos: 47,
        followers: 47,
      });
    }
  });

  // GitHub API: Get organization repositories
  app.get("/api/github/organization/repos", async (req, res) => {
    try {
      const { data } = await octokit.rest.repos.listForOrg({
        org: ORGANIZATION_NAME,
        sort: "updated",
        per_page: 30,
      });
      res.json(data);
    } catch (error: any) {
      console.error("GitHub organization repos fetch error:", error);
      // Return empty array instead of error to gracefully handle missing org
      res.json([]);
    }
  });

  // Stripe: Create payment intent
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ 
        message: "Stripe is not configured. Please add STRIPE_SECRET_KEY to secrets." 
      });
    }

    try {
      // Validate request body using schema
      const { amount } = req.body;

      if (!amount || typeof amount !== 'number' || amount < 1) {
        return res.status(400).json({ message: "Invalid amount: must be a positive number" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Stripe payment intent error:", error);
      res.status(500).json({ 
        message: "Error creating payment intent",
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
