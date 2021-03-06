import hydrate from 'preact-iso/hydrate';
import { LocationProvider, Router } from 'preact-iso/router';
import { ErrorBoundary } from 'preact-iso/lazy';
import pages from 'ls:./pages';

export function App() {
	return (
		<LocationProvider>
			<div class="app">
				<ErrorBoundary>
					<Router>
						<Home path="/" />
						<About path="/about" />
						<NotFound default />
					</Router>
				</ErrorBoundary>
			</div>
		</LocationProvider>
	);
}

hydrate(<App />);

export async function prerender(data) {
	const { default: prerender } = await import('preact-iso/prerender');
	return await prerender(<App {...data} />);
}
