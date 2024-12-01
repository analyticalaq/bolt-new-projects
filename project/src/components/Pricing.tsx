import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '0',
    description: 'Perfect for trying out our AI writing tools',
    features: [
      '500 words per month',
      '5 templates',
      'Basic AI writing',
      'Email support',
      'Basic analytics'
    ],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Pro',
    price: '29',
    description: 'Best for professional content creators',
    features: [
      '50,000 words per month',
      'All templates',
      'Advanced AI writing',
      'Priority support',
      'Advanced analytics',
      'API access',
      'Custom templates'
    ],
    cta: 'Start Pro Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams and businesses',
    features: [
      'Unlimited words',
      'Custom AI model training',
      'Dedicated account manager',
      'SSO & team management',
      'Custom integrations',
      'SLA & premium support'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="bg-white py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the perfect plan for your content creation needs
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                tier.popular ? 'ring-2 ring-blue-600 scale-105' : ''
              }`}
            >
              <div>
                {tier.popular && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-600 mb-8">
                    Most Popular
                  </div>
                )}
                <div className="flex items-baseline gap-x-2">
                  {tier.price !== 'Custom' && (
                    <>
                      <span className="text-4xl font-bold tracking-tight text-gray-900">$</span>
                      <span className="text-5xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                      <span className="text-base font-semibold leading-7 text-gray-600">/month</span>
                    </>
                  )}
                  {tier.price === 'Custom' && (
                    <span className="text-5xl font-bold tracking-tight text-gray-900">Custom</span>
                  )}
                </div>
                <p className="mt-4 text-base leading-7 text-gray-600">{tier.description}</p>
                <ul role="list" className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-blue-600" />
                      <span className="text-sm leading-6 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`mt-8 w-full rounded-full px-3 py-4 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}