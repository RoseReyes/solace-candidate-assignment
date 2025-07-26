'use client';

import {
  BriefcaseIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useMemo, useState } from 'react';

import { Bonheur_Royale } from 'next/font/google';
import { InferSelectModel } from 'drizzle-orm';
import { advocates } from '@/db/schema';

type Advocate = InferSelectModel<typeof advocates>;

const bonheurRoyale = Bonheur_Royale({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/advocates');
        if (!response.ok) throw new Error('Network response was not ok');
        const responseData = await response.json();

        setAdvocates(responseData.data);
      } catch (error: any) {
        console.log(`Error fetching advocates: ${error.message}`);
        setLoading(false);
      }
    };

    fetchAdvocates();
    //setLoading(false);
  }, []);

  const filteredAdvocates = useMemo(() => {
    const term = searchTerm.trim().toLocaleLowerCase();
    if (!term) return advocates;

    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLocaleLowerCase().includes(term) ||
        advocate.lastName.toLowerCase().includes(term) ||
        advocate.city.toLowerCase().includes(term) ||
        advocate.degree.toLowerCase().includes(term) ||
        advocate.yearsOfExperience.toString().includes(term) ||
        advocate.specialties.some((specialty) =>
          specialty.toLocaleLowerCase().includes(term)
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
        <h1
          className={`${bonheurRoyale.className} text-4xl text-green-950 font-bold`}>
          Solace Advocates
        </h1>

        <div className='flex items-center gap-2 w-full sm:max-w-md'>
          <input
            type='text'
            placeholder='Search advocates...'
            className='flex-1 px-4 py-2 border border-gray-300 rounded-3xl shadow focus:outline-none transition-all duration-150'
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
        {!loading ? (
          filteredAdvocates.map((advocate) => (
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
                    <span className='flex items-center gap-1 font-bold'>
                      <MapPinIcon className='h-4 w-4 text-green-700 font-extrabold' />
                      {advocate.city}
                    </span>
                    <span className='flex items-center gap-1 font-bold'>
                      <DevicePhoneMobileIcon className='h-4 w-4 text-indigo-700' />
                      {advocate.phoneNumber}
                    </span>
                    <span className='flex items-center gap-1 font-bold'>
                      <BriefcaseIcon className='h-4 w-4 text-cyan-700' />
                      {advocate.yearsOfExperience} years of experience
                    </span>
                  </div>
                </div>
              </div>

              {/* Body Section */}
              <div className='text-sm text-gray-700 mb-2'>
                <strong className='text-slate-800'>Specialties:</strong>{' '}
                {advocate.specialties.join(', ')}
              </div>

              {/* Optional Tag */}
              <div className='mt-4'>
                <span className='inline-block bg-blue-50 text-slate-700 text-xs px-2 py-1 rounded-full'>
                  Verified Advocate
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className='p-3 items-center text-green-950'>
            Loading advocates...
          </p>
        )}
      </section>
    </main>
  );
}
