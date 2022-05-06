import React from "react";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";

const EachNote = ({ note, notebookId }) => {
	const [{ isDragging }, dragRef] = useDrag({
		type: "note",
		item: { ...note },
		collection: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<div className="all-note-div" ref={dragRef}>
			<i className="fa-solid fa-grip grip"></i>
			<Link
				to={`/notebooks/${notebookId}/${note?.id}`}
				className="all-note-div-note"
			>
				<i className="fa-solid fa-file-lines"></i>
				{note?.title}
				{isDragging && "😱"}
			</Link>
		</div>
	);
};

export default EachNote;
