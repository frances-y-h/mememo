import { Switch, Route } from "react-router-dom";
import TagPage from "./tagPage";

const TagsPage = () => {
	return (
		<Switch>
			<Route path="/tags/:id">
				<TagPage />
			</Route>
		</Switch>
	);
};

export default TagsPage;
