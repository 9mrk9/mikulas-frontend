import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, redirect } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import Layout from './components/layout';
import Children from './pages/children';
import Toys from './pages/toys';
import DataProvider from './components/data-provider';
import NotFound from './pages/not-found';
import ManageToy from './pages/manage-toy';

document.documentElement.setAttribute('data-bs-theme', 'dark');

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				loader: () => redirect('/children'),
			},
			{
				path: 'children',
				children: [
					{ index: true, element: <Children /> },
					{
						path: 'manage/:childId',
						element: <ManageToy />,
					},
				],
			},
			{ path: 'toys', element: <Toys /> },
			{ path: '*', element: <NotFound /> },
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<DataProvider>
			<RouterProvider router={router} />
		</DataProvider>
	</StrictMode>
);
