import React from 'react';
import Link from 'next/link';
import FlowingWordCloud from '@/components/FlowingWordCloud';

export default function Home() {
  return (
    <div className="min-h-screen bg-lilac/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-dark mb-4">Data and Dynamics Summit</h1>
          <p className="text-xl text-text-secondary">
            Data Dynamics Summit (DDS) is a conference dedicated to emerging ideas in data-driven modeling. 
            With data as its central theme, this meeting aims to bring together researchers from emerging areas where 
            data-driven modeling is of paramount importance. It will provide a platform for young researchers to present
            their work and interact with experts in the field. The conference will also feature a poster session.
          </p>
        </div>

        {/* Word Cloud */}
        <div className="mb-16">
          <FlowingWordCloud />
        </div>

        {/* Three Container Boxes */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
          {/* Important Dates */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full md:w-1/3">
            <h2 className="text-2xl font-semibold text-primary-dark mb-4 text-center">Important Dates</h2>
            <ul className="space-y-2 text-text-secondary text-center">
              <li>Abstract Submission: TBA</li>
              <li>Registration: TBA</li>
              <li>Conference: August 21-23, 2024</li>
            </ul>
          </div>

          {/* Registration */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full md:w-1/3">
            <h2 className="text-2xl font-semibold text-primary-dark mb-4 text-center">Registration</h2>
            <p className="text-text-secondary mb-4 text-center">
              Registration details will be announced soon.
            </p>
            <div className="text-center">
              <Link 
                href="/registration" 
                className="inline-block bg-primary-main text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
              >
                Register Now
              </Link>
            </div>
          </div>

          {/* Call for Papers */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full md:w-1/3">
            <h2 className="text-2xl font-semibold text-primary-dark mb-4 text-center">Call for Papers</h2>
            <p className="text-text-secondary mb-4 text-center">
              We invite submissions for talks and posters. More details coming soon.
            </p>
            <div className="text-center">
              <Link 
                href="/program" 
                className="inline-block bg-primary-main text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
              >
                View Submission Guidelines
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
