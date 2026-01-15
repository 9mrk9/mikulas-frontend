import { useData } from '../context/data-context';
import ToyRow from './toy-row';

const ToysTable = () => {
	const { toys, isLoading } = useData();

	if (toys.length === 0 && !isLoading) {
		return (
			<div
				className='alert alert-info'
				role='alert'
			>
				Egy játék sem található.
			</div>
		);
	}
	return (
		<div className='table-responsive'>
			<table className='table table-hover table-striped'>
				<thead className='table-dark'>
					<tr>
						<th>Név</th>
						<th>Anyag</th>
						<th>Súly (kg)</th>
						<th className='text-end'></th>
					</tr>
				</thead>
				<tbody>
					{toys.map((toy) => (
						<ToyRow
							key={toy.id}
							toy={toy}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ToysTable;
