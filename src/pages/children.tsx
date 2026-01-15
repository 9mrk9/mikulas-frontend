import ChildrenTable from '../components/children-table';
import ErrorMessage from '../components/error-message';
import Loading from '../components/loading';
import NewChildForm from '../components/new-child-form';
import { useData } from '../context/data-context';

const Children = () => {
	const { isLoading, error } = useData();

	if (isLoading) {
		return <Loading />;
	}

	if (error && error.includes('children')) {
		return <ErrorMessage error={error} />;
	}

	return (
		<div className='container-fluid py-4'>
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<h2>Gyerekek</h2>
				<NewChildForm />
			</div>

			<ChildrenTable />
		</div>
	);
};

export default Children;
