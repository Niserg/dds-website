'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/config/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-background-default shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16">
          {/* Home Icon */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-primary-main hover:text-primary-dark">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>

          {/* Navigation Items - Centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex space-x-12 list-none">
              {navigationItems.map((item) => (
                <li key={item.name} className="relative group">
                  <div className="flex items-center">
                    <Link
                      href={item.path}
                      onClick={(e) => {
                        if (item.name === 'Program') {
                          e.preventDefault();
                        }
                      }}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        pathname === item.path
                          ? 'border-primary-main text-primary-dark'
                          : 'border-transparent text-text-secondary hover:text-primary-main hover:border-primary-light'
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <span className="ml-1 text-text-secondary text-xs">▼</span>
                    )}
                  </div>
                  {item.dropdown && (
                    <ul className="absolute left-0 mt-2 bg-lilac shadow-lg rounded-md max-h-60 overflow-y-auto list-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.dropdown.map((dropdownItem) => (
                        <li key={dropdownItem.name}>
                          <Link 
                            href={dropdownItem.path} 
                            className="block px-4 py-2 hover:bg-primary-main text-text-secondary text-xs"
                          >
                            {dropdownItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 