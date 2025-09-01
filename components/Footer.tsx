'use client';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/70 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-bold text-white">PG</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Phil Greene</span>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Data analysis, AI automation, and full‑stack development.
            </p>
          </div>
          <div className="flex items-center gap-4 md:justify-center">
            <a href="mailto:hello@philgreene.net" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
            <a href="https://github.com/philgreene" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/phil-greene" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <div className="md:text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Phil Greene</div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Built with Next.js, Tailwind, and love.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
