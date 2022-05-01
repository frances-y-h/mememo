import { Switch, Route } from "react-router-dom";
import TagPage from "./tagPage";

const TagsPage = () => {
	return (
		<Switch>
			<Route path="/tags" exact>
				<TagPage title={"Tags"} />
			</Route>
			<Route path="/tags/:id">
				<TagPage title={"Tag"} />
			</Route>
		</Switch>
	);
};

export default TagsPage;
