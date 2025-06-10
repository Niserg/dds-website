import React from 'react';

interface Speaker {
  id: number;
  name: string;
  institute: string;
  imageUrl: string;
  homepage?: string;
}

interface TalkPanel {
  title: string;
  speakers: Speaker[];
}

const generateDummySpeakers = (count: number): Speaker[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Speaker ${i + 1}`,
    institute: `Institute ${i + 1}`,
    imageUrl: '/images/speakers/placeholder.jpg', // Updated path to use the new structure
  }));
};

const talkPanels: TalkPanel[] = [
  {
    title: 'Keynote Talks',
    speakers: generateDummySpeakers(12),
  },
  {
    title: 'Invited Talks',
    speakers: generateDummySpeakers(12),
  },
  {
    title: 'Inaugural Speech',
    speakers: generateDummySpeakers(12),
  },
  {
    title: 'Evening Talks',
    speakers: generateDummySpeakers(12),
  },
];

export default function SpeakersPage() {
  return (
    <div className="min-h-screen bg-lilac/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary-dark mb-12 text-center">Speakers</h1>
        
        {talkPanels.map((panel, index) => (
          <div 
            key={panel.title} 
            className={`mb-16 p-8 rounded-xl ${
              index === 0 ? 'bg-lilac/30' : 
              index === 1 ? 'bg-lilac/40' :
              index === 2 ? 'bg-lilac/50' :
              'bg-lilac/60'
            }`}
          >
            <h2 className="text-2xl font-semibold text-primary-dark mb-8 border-b-2 border-primary-main pb-2">
              {panel.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {panel.speakers.map((speaker) => (
                <div key={speaker.id} className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-lg overflow-hidden mb-3 shadow-md bg-white">
                    <img
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-primary-dark text-center">
                    {speaker.homepage ? (
                      <a href={speaker.homepage} className="hover:text-primary-main transition-colors">
                        {speaker.name}
                      </a>
                    ) : (
                      speaker.name
                    )}
                  </h3>
                  <p className="text-sm text-text-secondary text-center mt-1">
                    {speaker.institute}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 