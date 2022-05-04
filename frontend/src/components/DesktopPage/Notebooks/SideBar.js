import { useParams } from "react-router-dom";

const SideBar = () => {
	const { notebookId, noteId } = useParams();
	// console.log(notebookId, noteId);

	return (
		<div>
			sidebar{notebookId}
			{noteId}
		</div>
	);
};

export default SideBar;
