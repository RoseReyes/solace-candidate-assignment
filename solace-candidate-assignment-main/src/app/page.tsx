'use client';

import {
  BriefcaseIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useMemo, useState } from 'react';

import { InferSelectModel } from 'drizzle-orm';
import { advocates } from '@/db/schema';

type Advocate = InferSelectModel<typeof advocates>;

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await fetch('/api/advocates');
        if (!response.ok) throw new Error('Network response was not ok');
        const responseData = await response.json();

        setAdvocates(responseData.data);
      } catch (error) {
        console.error('Error fetching advocates:', error);
      }
    };

    fetchAdvocates();
  }, []);

  const filteredAdvocates = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return advocates;

    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(term) ||
        advocate.lastName.toLowerCase().includes(term) ||
        advocate.city.toLowerCase().includes(term) ||
        advocate.degree.toLowerCase().includes(term) ||
        advocate.yearsOfExperience.toString().includes(term) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(term)
        )
      );
    });
  }, [searchTerm, advocates]);

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleReset = () => {
    setSearchTerm('');
  };

  return (
    <main className='min-h-screen bg-gray-50 px-4 py-10 container mx-auto max-w-7xl'>
      {/* Header */}
      <header className='flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/80 backdrop-blur-md border border-gray-200 p-6 rounded-xl shadow-md mb-10'>
        <h1 className='text-2xl font-bold text-blue-600 flex items-center gap-2 mb-4 sm:mb-0'>
          <span className='inline-block w-3 h-3 bg-blue-500 rounded-full animate-pulse'></span>
          Solace Advocates
        </h1>

        <div className='flex items-center gap-2 w-full sm:max-w-md'>
          <input
            type='text'
            placeholder='Search advocates...'
            className='flex-1 px-4 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150'
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
          />
          <button
            onClick={handleReset}
            className='px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded shadow-sm'>
            Reset
          </button>
        </div>
      </header>

      {/* Advocate Cards */}
      <section className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredAdvocates.map((advocate) => (
          <div
            key={advocate.phoneNumber}
            className='bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-100 transition duration-300'>
            {/* Header Section */}
            <div className='flex items-center gap-4 mb-4'>
              <div className='h-12 w-12 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 rounded-full font-bold uppercase hover:scale-105 transition-transform'>
                {advocate.firstName.charAt(0)}
              </div>
              <div>
                <h2 className='text-lg font-semibold text-gray-800'>
                  {advocate.firstName} {advocate.lastName}, {advocate.degree}
                </h2>
                <div className='text-xs text-gray-500 flex flex-col gap-1 mt-1'>
                  <span className='flex items-center gap-1'>
                    <MapPinIcon className='h-4 w-4 text-gray-400' />
                    {advocate.city}
                  </span>
                  <span className='flex items-center gap-1'>
                    <PhoneIcon className='h-4 w-4 text-gray-400' />
                    {advocate.phoneNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Body Section */}
            <div className='text-sm text-gray-700 mb-2'>
              <strong className='text-blue-600'>Specialties:</strong>{' '}
              {advocate.specialties.join(', ')}
            </div>

            <div className='text-xs text-gray-500 mt-2 flex items-center gap-1'>
              <BriefcaseIcon className='h-4 w-4 text-blue-400' />
              {advocate.yearsOfExperience} years of experience
            </div>

            {/* Optional Tag */}
            <div className='mt-4'>
              <span className='inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full'>
                Verified Advocate
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
