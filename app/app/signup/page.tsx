'use client';

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { api } from "@/components/utils/routes";

interface SignupProps {
  heading?: string;
  subheading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
}

const Signup = ({
  heading = "Signup",
  subheading = "Create a new account",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "/login",
}: SignupProps) => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [fetching, setFetching] = useState(false);
    const handleSignup = async () => {
        try {
            setError(null); // Reset error state
            setFetching(true);
        const response = await api.post("/api/auth/register", formData);
        if (response.status === 200) {
            redirect("/login");
        }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }finally {
            setFetching(false);
        }
    };

  return (




    <section className="h-screen bg-muted">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8">
          <div className="flex flex-col items-center gap-y-2">
            {/* Logo */}
            <div className="flex items-center gap-1 lg:justify-start">
              <a href="https://shadcnblocks.com">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-12"
                />
              </a>
            </div>
            <h1 className="text-3xl font-semibold">{heading}</h1>
            <p className="text-sm text-muted-foreground">{subheading}</p>
          </div>
          <div className="flex w-full flex-col gap-8 rounded-md border border-muted bg-white px-6 py-12 shadow-md">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Username</Label>
                <Input
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  type="text"
                  placeholder="Enter your username"
                  required
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <Input
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="bg-white"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Button type="submit" className="mt-2 w-full" onClick={() => handleSignup()} disabled={fetching}>
                  {signupText}
                </Button>
                
                {/* <Button variant="outline" className="w-full">
                  <FcGoogle className="mr-2 size-5" />
                  {googleText}
                </Button> */}
              </div>
            {error && (
                    <div className="text-red-500 text-sm text-center mb-2">{error}</div>
                )}
            </div>
          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{loginText}</p>
            <a
              href={loginUrl}
              className="font-medium text-primary hover:underline"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
