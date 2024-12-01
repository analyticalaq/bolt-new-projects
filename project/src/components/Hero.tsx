import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 pt-16">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-600">
              <Sparkles className="h-4 w-4" />
              AI-Powered Content Creation
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Create engaging content
            <span className="block text-blue-600">in seconds with AI</span>
          </h1>
          <p className="mt-8 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Generate high-converting copy for ads, emails, product descriptions, and more. 
            Powered by advanced AI to create content that converts.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#demo"
              className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Start Writing Free <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#templates" className="text-base font-semibold text-gray-900 flex items-center gap-2">
              View Templates <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}