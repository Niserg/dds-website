import React from 'react';

interface Organizer {
  id: number;
  name: string;
  title: string;
  imageUrl: string;
  homepage?: string;
}

const facultyOrganizers: Organizer[] = [
  {
    id: 1,
    name: "Faculty Member 1",
    title: "Professor",
    imageUrl: "/images/speakers/placeholder.jpg",
  },
  {
    id: 2,
    name: "Faculty Member 2",
    title: "Professor",
    imageUrl: "/images/speakers/placeholder.jpg",
  },
];

const studentOrganizers: Organizer[] = [
  {
    id: 1,
    name: "Student 1",
    title: "PhD Student",
    imageUrl: "/images/speakers/placeholder.jpg",
  },
  {
    id: 2,
    name: "Student 2",
    title: "PhD Student",
    imageUrl: "/images/speakers/placeholder.jpg",
  },
  {
    id: 3,
    name: "Student 3",
    title: "Postdoc",
    imageUrl: "/images/speakers/placeholder.jpg",
  },
  {
    id: 4,
    name: "Student 4",
    title: "PhD Student",
    imageUrl: "/images/speakers/placeholder.jpg",
  },
];

export default function GeneralInfo() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-primary-dark mb-4">
          General Information
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Venue Information with Map */}
        <div className="bg-background-paper p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-primary-dark mb-4">Venue</h2>
          
          {/* Map and Address Container */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Map Snippet */}
            <div className="w-full md:w-1/3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.5897891383106!2d73.80539937519232!3d18.54743048255129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf178755c7b1%3A0xd0e6d0861972dfca!2sIndian%20Institute%20of%20Science%20Education%20and%20Research%2C%20Pune(IISER%20pune)!5e0!3m2!1sen!2sin!4v1749476733361!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-md"
              ></iframe>
            </div>

            {/* Address Details */}
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-semibold text-primary-dark mb-3">Indian Institute of Science Education and Research (IISER) Pune</h3>
              <div className="space-y-2 text-text-secondary">
                <p>Dr. Homi Bhabha Road</p>
                <p>Pune, Maharashtra 411008</p>
                <p>India</p>
                <div className="mt-4">
                  <a 
                    href="https://maps.google.com/?q=IISER+Pune,+Dr.+Homi+Bhabha+Road,+Pune,+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-main hover:text-primary-dark inline-flex items-center"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                      />
                    </svg>
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-background-paper p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-primary-dark mb-4">Contact Information</h2>
          <p className="text-text-secondary">
            For any queries regarding the conference, please contact us at:
            <br />
            <span className="font-medium">Email:</span> coming soon...
          </p>
        </div>

        {/* Organizers Section */}
        <div className="mt-24 mb-16 bg-lilac/20 p-8 rounded-xl">
          <h2 className="text-3xl font-semibold text-primary-dark mb-12 text-center">Organizers</h2>
          
          {/* Faculty Organizers */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-primary-dark mb-6 text-center">Faculty</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {facultyOrganizers.map((organizer) => (
                <div key={organizer.id} className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-lg overflow-hidden mb-3 shadow-md bg-white">
                    <img
                      src={organizer.imageUrl}
                      alt={organizer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-primary-dark text-center">
                    {organizer.homepage ? (
                      <a href={organizer.homepage} className="hover:text-primary-main transition-colors">
                        {organizer.name}
                      </a>
                    ) : (
                      organizer.name
                    )}
                  </h3>
                  <p className="text-sm text-text-secondary text-center mt-1">
                    {organizer.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Student and Postdoc Organizers */}
          <div>
            <h3 className="text-2xl font-semibold text-primary-dark mb-6 text-center">Students and Postdocs</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {studentOrganizers.map((organizer) => (
                <div key={organizer.id} className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-lg overflow-hidden mb-3 shadow-md bg-white">
                    <img
                      src={organizer.imageUrl}
                      alt={organizer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-primary-dark text-center">
                    {organizer.homepage ? (
                      <a href={organizer.homepage} className="hover:text-primary-main transition-colors">
                        {organizer.name}
                      </a>
                    ) : (
                      organizer.name
                    )}
                  </h3>
                  <p className="text-sm text-text-secondary text-center mt-1">
                    {organizer.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 