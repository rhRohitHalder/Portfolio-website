"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { AnimatedStars } from "./animated-stars";

export function PortfolioHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadCV = () => {
    // Open CV in a new tab
    window.open('https://drive.google.com/file/d/1h-mehy2nRLhl8pqutczwL8UWj5rVQDIY/view?usp=sharing', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">
      <AnimatedStars />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-muted/30 z-0" />
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-2xl">
              <img
                src="/profile-image.png"
                alt="Profile"
                className="w-full h-full rounded-full object-cover bg-muted"
              />
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-balance">
            Rohit Halder
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 text-balance">
            Computer Science Engineering Student
          </p>

          {/* Introduction */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-pretty">
            Passionate about creating innovative solutions through code.
            Specializing in full-stack development, machine learning, and
            building scalable applications that make a difference.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View My Work
            </Button>
            <Button
              onClick={downloadCV}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-transparent flex items-center gap-2"
            >
              <Download size={20} />
              Download CV
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-muted-foreground text-muted-foreground hover:bg-muted hover:text-foreground px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12">
            <a
              href="https://github.com/rhRohitHalder"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/rohit-halder4225/"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:rohit.halder4225@gmail.com"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <ChevronDown
            className="mx-auto text-muted-foreground animate-bounce cursor-pointer hover:text-primary transition-colors duration-300"
            size={32}
            onClick={scrollToProjects}
          />
        </div>
      </div>
    </section>
  );
}
