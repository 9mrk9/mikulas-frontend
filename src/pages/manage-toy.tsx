import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import ErrorMessage from '../components/error-message';
import { useData } from '../context/data-context';

const ManageToy = () => {
	const { childId } = useParams<{ childId: string }>();
	const navigate = useNavigate();
	const { assignToyToChild, removeToyFromChild, toys, children } = useData();
	const [selectedToyId, setSelectedToyId] = useState<number | null>(null);

	if (!childId) {
		return <ErrorMessage error='A gyerek azonosítója hiányzik az URL-ből.' />;
	}

	const child = children.find((c) => c.id === Number(childId));

	if (!child) {
		return <ErrorMessage error='A gyerek nem található.' />;
	}

	const handleRemoveToy = async () => {
		if (child.toyId) {
			await removeToyFromChild(child.id);
			navigate('/children');
		}
	};

	const handleAssignToy = async () => {
		if (selectedToyId) {
			await assignToyToChild(child.id, selectedToyId);
			navigate('/children');
		}
	};

	return (
		<div className='container-fluid py-4'>
			<div className='row justify-content-center'>
				<div className='col-md-6'>
					<div className='card'>
						<div className='card-header'>
							<h3>Játék kezelése - {child.name}</h3>
						</div>
						<div className='card-body'>
							{child.toyId && child.toy ? (
								<div>
									<p className='lead'>{child.name} már kapott játékot!</p>
									<p className='d-flex column-gap-3'>
										<span>
											Játék ID: <strong>{child.toyId}</strong>
										</span>
										<span>{child.toy.name}</span>
										<span>{child.toy.material} anyag</span>
										<span>{child.toy.weight}kg</span>
									</p>
									<div className='d-flex gap-2'>
										<button
											className='btn btn-danger'
											onClick={handleRemoveToy}
										>
											Játék eltávolítása
										</button>
										<button
											className='btn btn-secondary'
											onClick={() => navigate('/children')}
										>
											Vissza
										</button>
									</div>
								</div>
							) : !child.wasGood ? (
								<div>
									<div
										className='alert alert-warning'
										role='alert'
									>
										<h5 className='alert-heading'>Rossz gyerek!</h5>
										<p className='mb-0'>
											{child.name} rossz volt, ezért nem kaphat játékot.
										</p>
									</div>
									<button
										className='btn btn-secondary'
										onClick={() => navigate('/children')}
									>
										Vissza
									</button>
								</div>
							) : (
								<div>
									<p className='lead mb-3'>
										Válassz játékot {child.name} számára:
									</p>
									<div className='mb-3'>
										<label
											htmlFor='toySelect'
											className='form-label'
										>
											Játék
										</label>
										<select
											id='toySelect'
											className='form-select'
											value={selectedToyId || ''}
											onChange={(e) => setSelectedToyId(Number(e.target.value))}
										>
											<option value=''>-- Válassz játékot --</option>
											{toys.map((toy) => (
												<option
													key={toy.id}
													value={toy.id}
												>
													{toy.name}
												</option>
											))}
										</select>
									</div>
									<div className='d-flex gap-2'>
										<button
											className='btn btn-primary'
											onClick={handleAssignToy}
											disabled={!selectedToyId}
										>
											Mentés
										</button>
										<button
											className='btn btn-secondary'
											onClick={() => navigate('/children')}
										>
											Mégse
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ManageToy;
