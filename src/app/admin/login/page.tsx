'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import config from '@/config';

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    // Debug: Check if environment variables are loaded
    console.log('Environment variables:', {
      username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || config.admin.username,
      password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || config.admin.password
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get credentials from environment variables or config
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || config.admin.username;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || config.admin.password;

    // Debug: Log the comparison
    console.log('Login attempt:', {
      provided: credentials,
      expected: { username: adminUsername, password: adminPassword }
    });

    if (credentials.username === adminUsername && credentials.password === adminPassword) {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin/updates');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-lilac/10 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-primary-dark">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-main focus:border-primary-main focus:z-10 sm:text-sm"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-main focus:border-primary-main focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-main hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 