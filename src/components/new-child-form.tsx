import { useState } from 'react';
import { useData } from '../context/data-context';

const NewChildForm = () => {
	const { createChild } = useData();
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [wasGood, setWasGood] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			await createChild({ name, address, wasGood });
			setName('');
			setAddress('');
			setWasGood(true);
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
						setAddress('');
						setWasGood(true);
					}}
					aria-expanded={isOpen}
				>
					{isOpen ? 'Űrlap bezárása' : 'Új gyerek hozzáadása'}
				</button>
			</div>
			<div className={`collapse ${isOpen ? 'show' : ''}`}>
				<div className='card-body'>
					<form onSubmit={handleSubmit}>
						<div className='mb-3'>
							<label
								htmlFor='childName'
								className='form-label'
							>
								Név
							</label>
							<input
								type='text'
								className='form-control'
								id='childName'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className='mb-3'>
							<label
								htmlFor='childAddress'
								className='form-label'
							>
								Cím
							</label>
							<input
								type='text'
								className='form-control'
								id='childAddress'
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>

						<div className='mb-3 form-check'>
							<label
								className='form-check-label'
								htmlFor='wasGood'
							>
								Jó volt?
							</label>
							<input
								type='checkbox'
								className='form-check-input'
								id='wasGood'
								checked={wasGood}
								onChange={(e) => setWasGood(e.target.checked)}
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

export default NewChildForm;
