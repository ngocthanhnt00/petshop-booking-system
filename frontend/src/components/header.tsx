'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 py-4 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <Image src="/logo.jpg" alt="Petshop Logo" width={80} height={80} />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            {['Home', 'About', 'Services', 'Contact'].map(item => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="transition-all duration-200 hover:text-gray-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <nav className="bg-gray-700 p-4 text-white md:hidden">
          <ul className="flex flex-col space-y-3">
            {['Home', 'About', 'Services', 'Contact'].map(item => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="block py-2 transition-all duration-200 hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
