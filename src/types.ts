export const materials = ['wood', 'metal', 'plastic', 'other'] as const;
export type Material = (typeof materials)[number];

export type Toy = {
	id: number;
	name: string;
	weight: number;
	material: Material;
};

export type Child = {
	id: number;
	name: string;
	address: string;
	wasGood: boolean;
	toyId: number | null;
	toy: Toy | null;
};

export type NewChild = Omit<Child, 'id' | 'toy' | 'toyId'>;

export type NewToy = Omit<Toy, 'id'>;
