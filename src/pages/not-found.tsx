const NotFound = () => {
	return (
		<div className='container-fluid py-5'>
			<div className='row justify-content-center'>
				<div className='col-md-6 text-center'>
					<h1 className='display-1 fw-bold text-danger'>404</h1>
					<h2 className='mb-4'>Page Not Found</h2>
					<p className='lead mb-4'>
						Oops! The page you're looking for doesn't exist.
					</p>
					<a
						href='/'
						className='btn btn-primary'
					>
						Go Home
					</a>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
