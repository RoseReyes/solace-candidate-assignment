import { Bonheur_Royale } from 'next/font/google';
import { HeaderProps } from '../type/type';

const bonheurRoyale = Bonheur_Royale({
  weight: '400',
  subsets: ['latin'],
});

export default function Header({
  searchTerm,
  onSearchChange,
  onReset,
}: HeaderProps) {
  return (
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
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button
          onClick={onReset}
          className='px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded shadow-sm'>
          Reset
        </button>
      </div>
    </header>
  );
}
