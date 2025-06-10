import React from 'react';

export default function Registration() {
  return (
    <div className="min-h-screen bg-lilac/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary-dark mb-8 text-center">Registration</h1>

        {/* Deadlines Table */}
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-semibold text-primary-dark mb-4 text-center">Important Deadlines</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Abstract Submission</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">May 15, 2024</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Notification of Acceptance</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">June 15, 2024</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Early Bird Registration</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">July 15, 2024</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Final Registration</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">August 1, 2024</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Conference Dates</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">August 21-23, 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Registration Fees Table */}
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-semibold text-primary-dark mb-4 text-center">Registration Fees</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Faculty & Postdocs
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Industry
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Conference Talks Only</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Conference + Workshop</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹1,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Accommodation Details */}
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-semibold text-primary-dark mb-4 text-center">Accommodation</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-700 mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-semibold text-primary-dark mb-4 text-center">Registration Form</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-full overflow-hidden">
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSePKpJoDcRlLWQdHqQ3DNmibwrpG-Jt785lDQF9_YHV8ByGfA/viewform?embedded=true" 
                  className="w-full min-h-[2898px] border-0"
                  title="Registration Form"
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 