import { useData } from '../context/data-context';
import type { Toy } from '../types';

const ToyRow = ({ toy }: { toy: Toy }) => {
	const { deleteToy } = useData();

	return (
		<tr key={toy.id}>
			<td>{toy.name}</td>
			<td>{toy.material}</td>
			<td>{toy.weight}</td>

			<td className='text-end'>
				<button
					className='btn btn-sm btn-danger'
					onClick={() => deleteToy(toy.id)}
					title='Játék törlése'
				>
					Törlés
				</button>
			</td>
		</tr>
	);
};

export default ToyRow;
