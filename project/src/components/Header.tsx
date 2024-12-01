import React from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-7 h-7 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              CopyGenius
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#templates" className="text-gray-600 hover:text-blue-600 transition-colors">
              Templates
            </a>
            <button className="px-5 py-2.5 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105">
              Try for Free
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <a href="#features" className="block py-2 text-gray-600 hover:text-blue-600">
              Features
            </a>
            <a href="#pricing" className="block py-2 text-gray-600 hover:text-blue-600">
              Pricing
            </a>
            <a href="#templates" className="block py-2 text-gray-600 hover:text-blue-600">
              Templates
            </a>
            <button className="w-full mt-4 px-5 py-2.5 text-white bg-blue-600 rounded-full hover:bg-blue-700">
              Try for Free
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}