import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// import Modal from "./modal";

function TagPage({ title }) {
	const { id } = useParams();
	const tag = useSelector((state) => state.tags[id]);

	let count = null;
	let icon = "";
	if (title === "Tag" && tag) {
		count = (
			<div className="tag" style={{ backgroundColor: `#${tag.color}` }}>
				{tag.name}
			</div>
		);
		icon = <i className="fa-solid fa-tag"></i>;
	}

	return (
		<main className="note-control">
			{/* <Modal tag={tag} /> */}
			<div className="note-sidebar">
				<div className="note-title-box">
					<div className="note-title-wrap">
						<div className="note-title-icon">
							{icon}
							<div className="note-title">{title}</div>
						</div>
						<div className="note-title-edit">Edit Tag</div>
					</div>
					<div className="note-title-ctrl">
						<div className="note-title-ctrl-count">{count}</div>
						<div className="note-title-ctrl-ctrls">
							<i className="fa-solid fa-arrow-down-wide-short"></i>
							<i className="fa-solid fa-ellipsis"></i>
						</div>
					</div>
				</div>
				<div></div>
			</div>
			<div className="note-view">Right Side</div>
		</main>
	);
}

export default TagPage;
