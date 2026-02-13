'use client';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-accent/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center logo-pulse">
                <span className="text-sm font-bold">PG</span>
              </div>
              <span className="text-lg font-bold text-foreground font-display">
                Phil Greene
              </span>
            </div>
            <p className="mt-3 text-sm text-foreground/70">
              Data analysis, AI automation, and full‑stack development.
            </p>
          </div>
          <div className="flex items-center gap-4 md:justify-center">
            <a
              href="mailto:hello@philgreene.net"
              className="text-foreground/70 hover:text-secondary underline-grow"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/WebCraftPhil"
              target="_blank"
              rel="me noopener noreferrer"
              className="text-foreground/70 hover:text-secondary underline-grow"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/phil.greene1"
              target="_blank"
              rel="me noopener noreferrer"
              className="text-foreground/70 hover:text-secondary underline-grow"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <div className="md:text-right">
            <div className="text-sm text-foreground/70">
              © {new Date().getFullYear()} Phil Greene
            </div>
            <div className="mt-2 text-sm text-foreground/60">
              Circuit patterns, fractal dividers, and clean typography.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
