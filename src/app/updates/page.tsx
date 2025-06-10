'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Update {
  id: number;
  date: string;
  title: string;
  content: string;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
}

export default function Updates() {
  // Sample updates - in a real app, this would come from a database
  const [updates] = useState<Update[]>([
    {
      id: 1,
      date: 'March 15, 2024',
      title: 'Conference Registration Now Open!',
      content: 'We are excited to announce that registration for the Data and Dynamics Summit 2024 is now open. Early bird registration is available until May 31, 2024.',
      type: 'text'
    },
    {
      id: 2,
      date: 'March 10, 2024',
      title: 'Keynote Speaker Announcement',
      content: 'We are thrilled to announce that Dr. Jane Smith will be our keynote speaker for the conference. Dr. Smith is a leading expert in data science and will be presenting on "The Future of Data Analysis".',
      type: 'text'
    },
    {
      id: 3,
      date: 'March 5, 2024',
      title: 'Conference Venue Details',
      content: 'The conference will be held at IISER Pune, featuring state-of-the-art facilities and beautiful campus surroundings.',
      type: 'image',
      mediaUrl: '/images/campus.jpg'
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-main mb-8">Latest Updates</h1>
      
      <div className="space-y-8">
        {updates.map((update) => (
          <div key={update.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex gap-6 items-start">
              {/* Timeline/Date */}
              <div className="flex flex-col items-center min-w-[100px]">
                <div className="bg-primary-main text-primary-light px-4 py-1 rounded-full text-sm mb-2">{update.date}</div>
                <div className="w-1 flex-1 bg-primary-light"></div>
              </div>
              {/* Content */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-primary-main mb-2">{update.title}</h2>
                <p className="text-gray-600 mb-4">{update.content}</p>
                {update.type === 'image' && update.mediaUrl && (
                  <div className="relative max-w-md h-64 mb-4">
                    <Image
                      src={update.mediaUrl}
                      alt={update.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                {update.type === 'video' && update.mediaUrl && (
                  <div className="max-w-md aspect-video mb-4">
                    <iframe
                      src={update.mediaUrl}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 