import { useSelector } from "react-redux";

const TagsPage = () => {
	const tags = Object.values(useSelector((state) => state.tags));

	return (
		<main>
			<h1>Tags</h1>
			{tags[0] && tags.map((tag) => <div key={tag.id}>{tag.name}</div>)}
		</main>
	);
};

export default TagsPage;
