const ErrorMessage = ({ error }: { error: string }) => {
	return (
		<div
			className='alert alert-danger m-3'
			role='alert'
		>
			<h4 className='alert-heading'>Hiba!</h4>
			<p>{error}</p>
		</div>
	);
};

export default ErrorMessage;
