"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Clock, User } from 'lucide-react';
import type { WeekData, LogEntry } from '@/utils/logs';

interface LogDisplayProps {
  weeks: WeekData[];
}

const ImageCollage = ({ images }: { images: string[] }) => {
  const displayImages = [...images.slice(0, 5), ...Array(5)].slice(0, 5).map(img => img || '/api/placeholder/300/300');
  const remainingCount = images.length > 5 ? images.length - 5 : 0;

  return (
    <div className="aspect-square w-full bg-gray-100">
      <div className="h-full grid grid-rows-2 gap-0.5">
        <div className="grid grid-cols-2 gap-0.5">
          <div className="relative bg-gray-200 overflow-hidden aspect-square">
            <Image 
              src={displayImages[0]} 
              alt="Collage 1" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="relative bg-gray-200 overflow-hidden aspect-square">
            <Image 
              src={displayImages[1]} 
              alt="Collage 2" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-0.5">
          <div className="relative bg-gray-200 overflow-hidden aspect-square">
            <Image 
              src={displayImages[2]} 
              alt="Collage 3" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="relative bg-gray-200 overflow-hidden aspect-square">
            <Image 
              src={displayImages[3]} 
              alt="Collage 4" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="relative bg-gray-200 overflow-hidden aspect-square">
            <Image 
              src={displayImages[4]} 
              alt="Collage 5" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            {remainingCount > 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-medium">+{remainingCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/*
const ImageCollage = ({ images }: { images: string[] }) => {
  // Always show 5 slots, use placeholder for missing images
  const displayImages = [...images.slice(0, 5), ...Array(5)].slice(0, 5).map(img => img || '/api/placeholder/300/300');
  const remainingCount = images.length > 5 ? images.length - 5 : 0;

  return (
    <div className="aspect-square w-full bg-gray-100">
      <div className="h-full grid grid-rows-2 gap-0.5">
        <div className="grid grid-cols-2 gap-0.5">
          <div className="relative bg-gray-200 overflow-hidden aspect-square">
            <img src={displayImages[0]} alt="Collage 1" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="relative bg-gray-200 overflow-hidden aspect-square">
            <img src={displayImages[1]} alt="Collage 2" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-0.5">
          <div className="relative bg-gray-200 overflow-hidden aspect-square">
            <img src={displayImages[2]} alt="Collage 3" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="relative bg-gray-200 overflow-hidden aspect-square">
            <img src={displayImages[3]} alt="Collage 4" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="relative bg-gray-200 overflow-hidden aspect-square">
            <img src={displayImages[4]} alt="Collage 5" className="absolute inset-0 w-full h-full object-cover" />
            {remainingCount > 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-medium">+{remainingCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
*/

export function LogDisplay({ weeks: originalWeeks }: LogDisplayProps) {
  const [expandedLog, setExpandedLog] = useState<LogEntry | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Combine week 4 logs into week 3, ensuring unique IDs
  const weeks = originalWeeks.reduce((acc, week, index) => {
    if (index === 3) { // Week 4
      const week3 = acc[2];
      if (week3) {
        // Ensure no duplicate logs
        const existingIds = new Set(week3.logs.map(log => log.id));
        const newLogs = week.logs.filter(log => !existingIds.has(log.id));
        week3.logs = [...week3.logs, ...newLogs];
      }
      return acc;
    }
    return [...acc, week];
  }, [] as WeekData[]);

  const LogTile = ({ log }: { log: LogEntry }) => {
  const lines = log.fullText
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.trim());

  // Calculate how many lines we can fit (11 lines + "..." line)
  const maxLines = 11;
  const displayLines = lines.slice(0, maxLines);

  return (
    <div 
      onClick={() => setExpandedLog(log)}
      className="flex-shrink-0 w-72 bg-blue-50 rounded-xl shadow-lg mr-6 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow flex flex-col"
    >
      <ImageCollage images={log.images} />
      
      <div className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <h3 className="font-bold text-gray-800 truncate">{log.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <span className="font-medium">Day {log.day}</span>
            <span>•</span>
            <Clock className="w-4 h-4" />
            <span>{log.date}</span>
          </div>
        </div>
        
        <div className="text-gray-800 px-4 pt-2 pb-3">
          <div className="space-y-0.5 min-h-[16.5rem] max-h-[16.5rem]">
            {displayLines.map((line, index) => (
              <p key={index} className={`leading-6 ${line.startsWith('-') ? 'ml-4' : ''}`}>
                {line}
              </p>
            ))}
            <p className="leading-6 flex justify-between items-center">
              <span>...</span>
              <button
                className="text-gray-800 font-bold pl-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedLog(log);
                }}
              >
                Read more
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  };

  const Modal = ({ log, onClose }: { log: LogEntry; onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-xl shadow-2xl w-[90vw] h-[85vh] max-w-7xl flex overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>

        <div 
          ref={containerRef}
          className="w-1/2 bg-black relative overflow-hidden"
        >
          {log.images.length > 0 && (
            <div className="relative w-full h-full">
              <Image 
                ref={imageRef}
                src={log.images[selectedImageIndex]} 
                alt={`Slide ${selectedImageIndex + 1}`}
                fill
                sizes="50vw"
                className="object-contain"
                style={{
                  transform: `scale(${zoom}) translate(${panPosition.x}%, ${panPosition.y}%)`,
                  cursor: zoom > 1 ? 'grab' : 'default'
                }}
              />
            </div>
          )}

          {selectedImageIndex > 0 && (
            <button 
              onClick={() => setSelectedImageIndex(prev => prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/75"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}
          
          {log.images.length > 0 && selectedImageIndex < log.images.length - 1 && (
            <button 
              onClick={() => setSelectedImageIndex(prev => prev + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/75"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
        </div>

        <div className="w-1/2 p-8 overflow-y-auto">
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <span className="font-medium">Day {log.day}</span>
            <span>•</span>
            <Clock className="w-4 h-4" />
            <span>{log.date}</span>
            <span>•</span>
            <User className="w-4 h-4" />
            <span>{log.author}</span>
          </div>
          
          <div className="prose max-w-none">
            {log.fullText.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /*
  const Modal = ({ log, onClose }: { log: LogEntry; onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-xl shadow-2xl w-[90vw] h-[85vh] max-w-7xl flex overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>

        <div 
          ref={containerRef}
          className="w-1/2 bg-black relative overflow-hidden"
        >
          {log.images.length > 0 && (
            <img 
              ref={imageRef}
              src={log.images[selectedImageIndex]} 
              alt={`Slide ${selectedImageIndex + 1}`}
              className="w-full h-full object-contain"
              style={{
                transform: `scale(${zoom}) translate(${panPosition.x}%, ${panPosition.y}%)`,
                cursor: zoom > 1 ? 'grab' : 'default'
              }}
            />
          )}

          {selectedImageIndex > 0 && (
            <button 
              onClick={() => setSelectedImageIndex(prev => prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/75"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}
          
          {log.images.length > 0 && selectedImageIndex < log.images.length - 1 && (
            <button 
              onClick={() => setSelectedImageIndex(prev => prev + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/75"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
        </div>

        <div className="w-1/2 p-8 overflow-y-auto">
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <span className="font-medium">Day {log.day}</span>
            <span>•</span>
            <Clock className="w-4 h-4" />
            <span>{log.date}</span>
            <span>•</span>
            <User className="w-4 h-4" />
            <span>{log.author}</span>
          </div>
          
          <div className="prose max-w-none">
            {log.fullText.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  */

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">Club Formation Journey</h2>
      
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">{week.title}</h3>
          
          <div className="relative">
            <div className="overflow-x-auto pb-4 flex snap-x snap-mandatory">
              {week.logs.map((log) => (
                <div key={log.id} className="snap-start">
                  <LogTile log={log} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {expandedLog && (
        <Modal 
          log={expandedLog} 
          onClose={() => {
            setExpandedLog(null);
            setSelectedImageIndex(0);
            setZoom(1);
            setPanPosition({ x: 0, y: 0 });
          }} 
        />
      )}
    </div>
  );
}