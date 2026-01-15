import { NavLink, Outlet } from 'react-router';

const Layout = () => {
	return (
		<div className='min-vh-100 w-100 d-flex flex-column'>
			<header className='bg-body-tertiary sticky-top'>
				<nav className='navbar navbar-expand-lg my-2'>
					<div className='container-fluid'>
						<NavLink
							to={'/'}
							className='navbar-brand'
						>
							Mikulás Ajándékok
						</NavLink>
						<button
							className='navbar-toggler'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#navbarNav'
							aria-controls='navbarNav'
							aria-expanded='false'
							aria-label='Toggle navigation'
						>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div
							className='collapse navbar-collapse'
							id='navbarNav'
						>
							<ul className='navbar-nav'>
								<li className='nav-item'>
									<NavLink
										to={'/children'}
										className='nav-link'
									>
										Gyerekek
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink
										to={'/toys'}
										className='nav-link'
									>
										Játékok
									</NavLink>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>
			<main className='flex-grow-1 w-100 p-3 container-fluid'>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
