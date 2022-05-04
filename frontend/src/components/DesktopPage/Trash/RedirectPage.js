import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const RedirectPage = () => {
	const trash = useSelector((state) => state.trash);
	const trashOrdered = Object.values(trash).sort((a, b) =>
		b.updatedAt.localeCompare(a.updatedAt)
	);

	if (trashOrdered.length) {
		return <Redirect to={`/trash/${trashOrdered[0]?.id}`} />;
	} else {
		return (
			<div className="notebook-bg">
				<div className="notebook-container">
					<img src="/images/logo.svg" alt="bee" className="fly-bee" />
					<div className="notebook-ctnr-title">No notes in trash can</div>
				</div>
			</div>
		);
	}
};

export default RedirectPage;
