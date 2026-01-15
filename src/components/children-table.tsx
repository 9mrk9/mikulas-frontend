import { useData } from '../context/data-context';
import ChildRow from './child-row';

const ChildrenTable = () => {
	const { children, isLoading } = useData();

	if (children.length === 0 && !isLoading) {
		return (
			<div
				className='alert alert-info'
				role='alert'
			>
				Egy gyerek sem található.
			</div>
		);
	}
	return (
		<div className='table-responsive'>
			<table className='table table-hover table-striped'>
				<thead className='table-dark'>
					<tr>
						<th>Név</th>
						<th>Cím</th>
						<th>Jó/Rossz</th>
						<th>Van játéka?</th>
						<th className='text-end'></th>
					</tr>
				</thead>
				<tbody>
					{children.map((child) => (
						<ChildRow
							key={child.id}
							child={child}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ChildrenTable;
