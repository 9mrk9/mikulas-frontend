import { createContext, useContext } from 'react';
import type { Child, NewChild, NewToy, Toy } from '../types';

type DataContextType = {
	children: Array<Child>;
	toys: Array<Toy>;
	isLoading: boolean;
	error: string | null;
	deleteChild: (id: number) => Promise<void>;
	deleteToy: (id: number) => Promise<void>;
	assignToyToChild: (childId: number, toyId: number) => Promise<void>;
	removeToyFromChild: (childId: number) => Promise<void>;
	createChild: (child: NewChild) => Promise<void>;
	createToy: (toy: NewToy) => Promise<void>;
};

export const DataContext = createContext<DataContextType | null>(null);

export function useData() {
	const context = useContext(DataContext);

	if (context === null) {
		throw new Error('useData must be used within a DataProvider');
	}

	if (!import.meta.env.VITE_API_URL) {
		throw new Error('VITE_API_URL is not defined');
	}

	return context;
}
