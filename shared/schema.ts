import { z } from "zod";

// GitHub API Types
export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location?: string;
  email?: string;
  company?: string;
  twitter_username?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  fork: boolean;
}

export interface GitHubOrganization {
  login: string;
  name: string;
  avatar_url: string;
  description: string | null;
  public_repos: number;
  html_url: string;
}

// Stripe Payment Intent Request
export const createPaymentIntentSchema = z.object({
  amount: z.number().min(1),
  description: z.string().optional(),
});

export type CreatePaymentIntentRequest = z.infer<typeof createPaymentIntentSchema>;

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
