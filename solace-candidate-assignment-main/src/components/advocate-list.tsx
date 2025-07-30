import { Advocate } from '@/type/type';
import { AdvocateCard } from './advocate-card';

export default function AdvocateList({ advocates }: { advocates: Advocate[] }) {
  return (
    <section className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {advocates.map((advocate) => (
        <AdvocateCard
          key={advocate.phoneNumber}
          advocate={advocate}
        />
      ))}
    </section>
  );
}
