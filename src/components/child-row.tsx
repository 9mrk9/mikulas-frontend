import { useNavigate } from 'react-router';
import { useData } from '../context/data-context';
import type { Child } from '../types';

const ChildRow = ({ child }: { child: Child }) => {
	const { deleteChild } = useData();
	const navigate = useNavigate();

	return (
		<tr key={child.id}>
			<td>{child.name}</td>
			<td>{child.address}</td>
			<td>
				<span className={`badge ${child.wasGood ? 'bg-success' : 'bg-danger'}`}>
					{child.wasGood ? 'Jó' : 'Rossz'}
				</span>
			</td>
			<td>
				{child.toyId ? (
					<span className='badge bg-info text-dark'>Igen</span>
				) : (
					<span className='badge bg-secondary'>Nem</span>
				)}
			</td>
			<td className='text-end'>
				<button
					className='btn btn-sm btn-primary me-2'
					onClick={() => navigate(`/children/manage/${child.id}`)}
				>
					Játék kezelése
				</button>

				<button
					className='btn btn-sm btn-danger'
					onClick={() => deleteChild(child.id)}
					title='Gyerek törlése'
				>
					Törlés
				</button>
			</td>
		</tr>
	);
};

export default ChildRow;
