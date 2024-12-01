import React from 'react';
import { Bot, Sparkles, Globe, BarChart3, Zap, Lock } from 'lucide-react';

const features = [
  {
    name: 'Advanced AI Writing',
    description: 'Powered by GPT-4 to generate human-like, engaging content that converts.',
    icon: Bot,
  },
  {
    name: 'Smart Templates',
    description: '50+ pre-built templates for every type of content you need.',
    icon: Sparkles,
  },
  {
    name: '25+ Languages',
    description: 'Create content in multiple languages to reach a global audience.',
    icon: Globe,
  },
  {
    name: 'Performance Analytics',
    description: 'Track content performance and optimize for better results.',
    icon: BarChart3,
  },
  {
    name: 'Instant Generation',
    description: 'Get your content in seconds with our high-speed AI processing.',
    icon: Zap,
  },
  {
    name: 'Data Security',
    description: 'Enterprise-grade security to protect your content and data.',
    icon: Lock,
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-600">
            <Sparkles className="h-4 w-4" />
            Powerful Features
          </div>
          <p className="mt-6 text-4xl font-bold tracking-tight text-gray-900">
            Everything you need to create
            <span className="block text-blue-600">amazing content</span>
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our AI-powered platform provides all the tools you need to create, optimize, and scale your content creation.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-5 w-5 flex-none text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}