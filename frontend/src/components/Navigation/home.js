import { Link } from "react-router-dom";

const Home = () => {
	return (
		<Link to="/desktop">
			<div className="nav-div">
				<div className="nav-div-left">
					<div className="nav-caret"></div>
					<i className="fa-solid fa-house-chimney"></i>
					<div>Home</div>
				</div>
			</div>
		</Link>
	);
};

export default Home;
