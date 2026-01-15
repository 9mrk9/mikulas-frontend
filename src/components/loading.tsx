const Loading = () => {
	return (
		<div
			className='d-flex justify-content-center align-items-center'
			style={{ minHeight: '400px' }}
		>
			<div
				className='spinner-border text-primary'
				role='status'
			>
				<span className='visually-hidden'>Betöltés...</span>
			</div>
		</div>
	);
};

export default Loading;
