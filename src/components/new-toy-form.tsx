import { useState } from 'react';
import { useData } from '../context/data-context';
import { materials, type Material } from '../types';

const NewToyForm = () => {
	const { createToy } = useData();
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState('');
	const [material, setMaterial] = useState<Material | ''>('');
	const [weight, setWeight] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			await createToy({
				name,
				material: material as Material,
				weight: Number(weight),
			});
			setName('');
			setMaterial('');
			setWeight('');
			setIsOpen(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Hiba történt');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='card mb-4 w-50'>
			<div className='card-header'>
				<button
					className='btn btn-outline w-100'
					type='button'
					onClick={() => {
						setIsOpen(!isOpen);
						setError(null);
						setName('');
						setMaterial('');
						setWeight('');
					}}
					aria-expanded={isOpen}
				>
					{isOpen ? 'Űrlap bezárása' : 'Új játék hozzáadása'}
				</button>
			</div>
			<div className={`collapse ${isOpen ? 'show' : ''}`}>
				<div className='card-body'>
					<form onSubmit={handleSubmit}>
						<div className='mb-3'>
							<label
								htmlFor='toyName'
								className='form-label'
							>
								Név
							</label>
							<input
								type='text'
								className='form-control'
								id='toyName'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className='mb-3'>
							<label
								htmlFor='toyMaterial'
								className='form-label'
							>
								Anyag
							</label>
							<select
								className='form-select'
								id='toyMaterial'
								value={material}
								onChange={(e) => setMaterial(e.target.value as Material)}
							>
								<option value=''>-- Válassz anyagot --</option>
								{materials.map((mat) => (
									<option
										key={mat}
										value={mat}
									>
										{mat}
									</option>
								))}
							</select>
						</div>

						<div className='mb-3'>
							<label
								htmlFor='toyWeight'
								className='form-label'
							>
								Súly (kg)
							</label>
							<input
								type='number'
								className='form-control'
								id='toyWeight'
								value={weight}
								onChange={(e) => setWeight(e.target.value)}
								step='0.01'
								min='0'
							/>
						</div>

						{error && (
							<div
								className='alert alert-danger'
								role='alert'
							>
								{error.split('---').map((err, index) => (
									<div key={index}>{err.trim()}</div>
								))}
							</div>
						)}

						<button
							type='submit'
							className='btn btn-success'
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<span
										className='spinner-border spinner-border-sm me-2'
										role='status'
										aria-hidden='true'
									></span>
									Mentés...
								</>
							) : (
								'Mentés'
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default NewToyForm;
