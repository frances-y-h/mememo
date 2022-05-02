import Home from "./home.js";
import User from "./user.js";
import Notes from "./notes.js";
import Notebooks from "./notebooks.js";
import Tags from "./tags.js";
import Trash from "./trash.js";

const Navigation = ({ sessionUser, notes }) => {
	return (
		<nav className="navbar">
			<User sessionUser={sessionUser} />
			<Home />
			<Notes notes={notes} />
			<Notebooks />
			<Tags />
			<Trash />
		</nav>
	);
};

export default Navigation;
