'use client';

import { useEffect, useMemo, useState } from 'react';

import { Advocate } from '../type/type';
import AdvocateList from '@/components/advocate-list';
import Header from '@/components/header';

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
      } catch (error: any) {
        console.log(`Error fetching advocates: ${error.message}`);
      }
    };

    fetchAdvocates();
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
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleChange}
        onReset={handleReset}
      />
      <AdvocateList advocates={filteredAdvocates} />
    </main>
  );
}
