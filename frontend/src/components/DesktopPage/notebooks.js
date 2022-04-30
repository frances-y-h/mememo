import { useSelector } from "react-redux";

const NotebookPage = () => {
	const notebooks = Object.values(useSelector((state) => state.notebooks));

	return (
		<main>
			<h1>Notebook Page</h1>
		</main>
	);
};

export default NotebookPage;
