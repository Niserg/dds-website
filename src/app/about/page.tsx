import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-dark mb-12 text-center">About</h1>

        <div className="bg-lilac/20 p-8 rounded-xl">
          <div className="prose prose-lg max-w-none text-text-secondary">
            <p>
              Data Dynamics Summit (DDS) is a conference dedicated to emerging ideas in data-driven modeling. 
              With data as its central theme, this meeting aims to bring together researchers from emerging areas where 
              data-driven modeling is of paramount importance. It will provide a platform for young researchers to present
              their work and interact with experts in the field. The conference will also feature a poster session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 