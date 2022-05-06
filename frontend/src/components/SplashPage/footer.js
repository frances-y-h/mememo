import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer>
			<div className="footer-top">
				<ul className="tech-wrap">
					<li>React</li>
					<li>Redux</li>
					<li>Flexbox</li>
					<li>Grid</li>
					<li>CSS Modules</li>
					<li>Express</li>
					<li>Sequelize</li>
					<li>PostgreSQL</li>
				</ul>
			</div>
			<div className="footer-copyright">
				<Link to="/about">copyright © Frances (Huang) Lau | Resource used</Link>
			</div>
		</footer>
	);
};

export default Footer;
