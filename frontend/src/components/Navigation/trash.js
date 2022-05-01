import { Link } from "react-router-dom";

const Trash = () => {
	return (
		<Link to="/trash">
			<div className="nav-div">
				<div className="nav-div-left">
					<div className="nav-caret"></div>
					<i className="fa-solid fa-trash-can"></i>
					<div>Trash</div>
				</div>
			</div>
		</Link>
	);
};

export default Trash;
