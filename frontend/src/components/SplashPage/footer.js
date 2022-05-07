import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer>
			<div className="footer-top">
				<ul className="tech-wrap">
					<li>
						<a href="https://reactjs.org/" target="_blank">
							React
						</a>
					</li>
					<li>
						<a href="https://redux.js.org/" target="_blank">
							Redux
						</a>
					</li>
					<li>
						<a
							href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox"
							target="_blank"
						>
							Flexbox
						</a>
					</li>
					<li>
						<a
							href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns"
							target="_blank"
						>
							Grid
						</a>
					</li>
					<li>
						<a
							href="https://developer.mozilla.org/en-US/docs/Web/CSS"
							target="_blank"
						>
							CSS Modules
						</a>
					</li>
					<li>
						<a href="https://expressjs.com/" target="_blank">
							Express
						</a>
					</li>
					<li>
						<a href="https://sequelize.org/" target="_blank">
							Sequelize
						</a>
					</li>
					<li>
						<a href="https://www.postgresql.org/" target="_blank">
							PostgreSQL
						</a>
					</li>
				</ul>
			</div>
			<div className="footer-copyright">
				<Link to="/about">copyright © Frances (Huang) Lau | Resource used</Link>
			</div>
		</footer>
	);
};

export default Footer;
