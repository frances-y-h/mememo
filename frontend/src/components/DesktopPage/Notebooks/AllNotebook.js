import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import EachNote from "./EachNote";

const AllNotebook = ({ notebook }) => {
	const notes = useSelector((state) => {
		const arr = [];
		Object.values(state.notes).forEach((note) => {
			if (note?.notebookId === notebook?.id) {
				arr.push(note);
			}
		});
		return arr;
	});

	const [basket, setBasket] = useState(notes);

	const [{ isOver }, dropRef] = useDrop({
		accept: "note",
		drop: (item) =>
			setBasket((basket) =>
				!basket.some((el) => el.id === item.id) ? [...basket, item] : basket
			),
		collect: (monitor) => ({ isOver: monitor.isOver() }),
	});

	useEffect(() => {
		console.log(basket);
	}, [basket]);

	return (
		<div>
			<Link to={`/notebooks/${notebook?.id}`}>
				<div className="all-notebook-div" key={notebook?.id}>
					<i className="fa-solid fa-book"></i>
					{notebook?.name}
					<div className="all-notebook-total">Total {notes?.length} notes</div>
				</div>
			</Link>
			{/* <div>
				{notes.map((note) => (
					<EachNote
						draggable
						note={note}
						key={note?.id}
						notebookId={notebook?.id}
					/>
				))}
			</div> */}
			<div style={{ height: "100px" }} ref={dropRef}>
				{basket.map((note) => (
					<EachNote note={note} notebookId={notebook?.id} />
				))}
				{isOver && <div>Drop Here!</div>}
			</div>
		</div>
	);
};

export default AllNotebook;
