import { useEffect, useState, type PropsWithChildren } from 'react';
import { DataContext } from '../context/data-context';
import type { Child, NewChild, NewToy, Toy } from '../types';

const API_URL = import.meta.env.VITE_API_URL as string;

export default function DataProvider({
	children: reactChildren,
}: PropsWithChildren) {
	const [children, setChildren] = useState<Array<Child>>([]);
	const [toys, setToys] = useState<Array<Toy>>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getChildren = async () => {
		setError(null);
		setIsLoading(true);

		const response = await fetch(`${API_URL}/children`);
		if (!response.ok) {
			setError('Failed to fetch children');
			setIsLoading(false);
			return;
		}
		const data = (await response.json()) as Array<Child>;

		setChildren([...data].sort((a, b) => a.id - b.id));
		setIsLoading(false);
	};

	const getToys = async () => {
		setError(null);
		setIsLoading(true);

		const response = await fetch(`${API_URL}/toys`);
		if (!response.ok) {
			setError('Failed to fetch toys');
			setIsLoading(false);
			return;
		}
		const data = (await response.json()) as Array<Toy>;

		setToys([...data].sort((a, b) => a.id - b.id));
		setIsLoading(false);
	};

	const deleteChild = async (id: number) => {
		try {
			await fetch(`${API_URL}/children/${id}`, { method: 'DELETE' });
			await getChildren();
		} catch (err) {
			if (err instanceof Error) {
				alert(`Failed to delete child: ${err.message}`);
			}
		}
	};

	const deleteToy = async (id: number) => {
		try {
			await fetch(`${API_URL}/toys/${id}`, { method: 'DELETE' });
			await getToys();
		} catch (err) {
			if (err instanceof Error) {
				alert(`Failed to delete toy: ${err.message}`);
			}
		}
	};

	const assignToyToChild = async (childId: number, toyId: number) => {
		try {
			await fetch(`${API_URL}/children/${childId}/toys/${toyId}`, {
				method: 'PUT',
			});
			await getChildren();
		} catch (err) {
			if (err instanceof Error) {
				alert(`Failed to assign toy to child: ${err.message}`);
			}
		}
	};

	const removeToyFromChild = async (childId: number) => {
		try {
			await fetch(`${API_URL}/children/${childId}/toy`, {
				method: 'DELETE',
			});
			await getChildren();
		} catch (err) {
			if (err instanceof Error) {
				alert(`Failed to remove toy from child: ${err.message}`);
			}
		}
	};

	const createChild = async (newChild: NewChild) => {
		const response = await fetch(`${API_URL}/children`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newChild),
		});

		if (!response.ok) {
			const errorData = await response.json();
			if (Array.isArray(errorData.message)) {
				throw new Error(errorData.message.join('---'));
			} else {
				throw new Error(errorData.message);
			}
		}

		const data = (await response.json()) as Child;
		if (data.id === undefined) {
			throw new Error('Invalid response from server');
		}

		await getChildren();
	};

	const createToy = async (newToy: NewToy) => {
		const response = await fetch(`${API_URL}/toys`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newToy),
		});
		if (!response.ok) {
			const errorData = await response.json();
			if (Array.isArray(errorData.message)) {
				throw new Error(errorData.message.join('---'));
			} else {
				throw new Error(errorData.message);
			}
		}

		const data = (await response.json()) as Toy;
		if (data.id === undefined) {
			throw new Error('Invalid response from server');
		}

		await getToys();
	};

	useEffect(() => {
		const main = () => {
			getChildren();
			getToys();
		};
		main();
	}, []);

	return (
		<DataContext.Provider
			value={{
				children,
				toys,
				error,
				isLoading,
				deleteChild,
				deleteToy,
				assignToyToChild,
				removeToyFromChild,
				createChild,
				createToy,
			}}
		>
			{reactChildren}
		</DataContext.Provider>
	);
}
