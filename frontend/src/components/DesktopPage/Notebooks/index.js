import { useSelector } from "react-redux";

const NotebooksPage = () => {
	const notebooks = useSelector((state) => state.notebooks);

	return (
		<main>
			<h1>Notebook Page</h1>
			{Object.values(notebooks)[0] &&
				Object.values(notebooks).map((notebook) => (
					<div key={notebook.id}>{notebook.name}</div>
				))}
		</main>
	);
};

export default NotebooksPage;
