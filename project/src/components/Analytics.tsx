import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

const data = [
  { name: 'Jan', words: 4000 },
  { name: 'Feb', words: 3000 },
  { name: 'Mar', words: 2000 },
  { name: 'Apr', words: 2780 },
  { name: 'May', words: 1890 },
  { name: 'Jun', words: 2390 },
  { name: 'Jul', words: 3490 },
];

const stats = [
  { name: 'Total Words Generated', value: '2.7M', icon: BarChart3 },
  { name: 'Conversion Rate', value: '24.5%', icon: TrendingUp },
  { name: 'Active Users', value: '11.5k', icon: Users },
];

export default function Analytics() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32" id="analytics">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Track Your Content Performance
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get detailed insights into your content generation and performance metrics
          </p>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.name} className="flex flex-col bg-white px-6 py-8 rounded-2xl shadow-sm">
              <dt className="flex items-center gap-x-3 text-base leading-7 text-gray-600">
                <stat.icon className="h-5 w-5 flex-none text-blue-600" />
                {stat.name}
              </dt>
              <dd className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Words Generated Over Time</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="words" 
                  stroke="#2563eb" 
                  fill="#3b82f6" 
                  fillOpacity={0.1} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}