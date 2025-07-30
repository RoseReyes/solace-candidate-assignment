import {
  BriefcaseIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

import { Advocate } from '@/type/type';

export function AdvocateCard({ advocate }: { advocate: Advocate }) {
  return (
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
  );
}
