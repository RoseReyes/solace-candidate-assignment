type CardProps<T> = {
  data: T;
};

export default function Card<T>({ data }: CardProps<T>) {
  return (
    <div className='w-full max-w-md rounded-lg border border-gray-200 shadow-md overflow-hidden bg-white'>
      {/* Header */}
      <div className='flex items-center gap-4 p-4 bg-gray-50'>
        {/* Avatar */}
        {avatar ? (
          <img className='h-14 w-14 rounded-full object-cover' />
        ) : (
          <div className='h-14 w-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold uppercase'>
            {}
          </div>
        )}

        <div className='flex flex-col'>
          <span className='text-lg font-semibold text-gray-900'>{name}</span>
          {degree && <span className='text-sm text-gray-600'>{degree}</span>}
          {location && (
            <span className='text-sm text-gray-500'>{location}</span>
          )}
          {phone && <span className='text-xs text-gray-400'>{phone}</span>}
        </div>
      </div>

      {/* Body */}
      <div className='p-4'>
        <p className='text-sm text-gray-700'>{bodyText}</p>
      </div>
    </div>
  );
}
