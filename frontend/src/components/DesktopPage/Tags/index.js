import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import NoteTemplate from "../NoteTemplate";

const TagsPage = () => {
	const tags = Object.values(useSelector((state) => state.tags));

	return (
		<Switch>
			<Route path="/tags" exact>
				<NoteTemplate title={"Tags"} />
			</Route>
			<Route path="/tags/:id">
				<NoteTemplate title={"Tag"} />
			</Route>
		</Switch>
	);
};

export default TagsPage;
