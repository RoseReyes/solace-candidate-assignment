'use client';

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
    <main style={{ margin: '24px' }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id='search-term'></span>
        </p>
        <input
          value={searchTerm}
          style={{ border: '1px solid black' }}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button onClick={handleReset}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.phoneNumber}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, index) => (
                    <div key={index}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
