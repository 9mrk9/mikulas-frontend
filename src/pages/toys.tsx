import ErrorMessage from '../components/error-message';
import Loading from '../components/loading';
import NewToyForm from '../components/new-toy-form';
import ToysTable from '../components/toys-table';
import { useData } from '../context/data-context';

const Toys = () => {
	const { isLoading, error } = useData();

	if (isLoading) {
		return <Loading />;
	}

	if (error && error.includes('toys')) {
		return <ErrorMessage error={error} />;
	}

	return (
		<div className='container-fluid py-4'>
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<h2>Játékok</h2>
				<NewToyForm />
			</div>

			<ToysTable />
		</div>
	);
};

export default Toys;
