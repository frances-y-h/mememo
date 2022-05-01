import { useSelector } from "react-redux";

const NotebookPage = () => {
	const notebooks = Object.values(useSelector((state) => state.notebooks));

	return (
		<main>
			<h1>Notebook Page</h1>
			{notebooks[0] &&
				notebooks.map((notebook) => (
					<div key={notebook.id}>{notebook.name}</div>
				))}
		</main>
	);
};

export default NotebookPage;
