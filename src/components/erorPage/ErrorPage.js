import './errorPage.scss';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
		<div>
			<div className="gif">
				<img src="https://cdn.marvel.com/content/u/open-html-assets/marvel-error-pages/deadpool-char.2aea1ef9.gif" alt="gif_ing" />
			</div>
			<div className="content">
				<h1 className="main-heading"><span>Error</span> 404</h1>
				<p>
					...maybe the page you're looking for is not found or never existed.
				</p>
				<Link to="/">
					<button className='btn'>
						Back
					</button>
				</Link>
			</div>
		</div>
    )
}

export default ErrorPage;