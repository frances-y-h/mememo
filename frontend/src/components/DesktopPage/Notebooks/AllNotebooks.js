import { useSelector } from "react-redux";

import AllNotebook from "./AllNotebook";

const AllNotebooks = () => {
	const notebooks = useSelector((state) => state.notebooks);
	return (
		<div className="all-notebooks-backdrop">
			<div className="all-notebooks-ctnr">
				<div className="all-notebooks-title">
					All Notebooks
					<span className="all-notebooks-subtitle">
						Total {Object.values(notebooks).length} notebooks
					</span>
				</div>
				{Object.values(notebooks).map((notebook) => (
					<AllNotebook notebook={notebook} key={notebook.id} />
				))}
			</div>
		</div>
	);
};

export default AllNotebooks;
