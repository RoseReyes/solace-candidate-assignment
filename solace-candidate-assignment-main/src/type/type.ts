import { InferSelectModel } from 'drizzle-orm';
import { advocates } from '@/db/schema';

export type Advocate = InferSelectModel<typeof advocates>;

export type HeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
};
