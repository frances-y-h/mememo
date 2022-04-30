import { useSelector } from "react-redux";

const TrashPage = () => {
	const trash = Object.values(useSelector((state) => state.trash));
	return (
		<main>
			<h1>Trash Page</h1>
			{trash[0] && trash.map((el) => <div key={el.id}>{el.title}</div>)}
		</main>
	);
};

export default TrashPage;
