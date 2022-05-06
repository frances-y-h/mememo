import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import EachNote from "./EachNote";

import * as notesActions from "../../../store/notes";

const AllNotebook = ({ notebook }) => {
	const dispatch = useDispatch();

	const checkNotes = useSelector((state) => state.notes);

	const notes = useSelector((state) => {
		const arr = [];
		Object.values(state.notes).forEach((note) => {
			if (note?.notebookId === notebook?.id) {
				arr.push(note);
			}
		});
		return arr;
	});

	const [basket, setBasket] = useState([]);

	const [{ canDrop, isOver }, dropRef] = useDrop({
		accept: "note",
		drop: (item) =>
			setBasket((basket) =>
				!basket.some((el) => el.id === item.id) ? [...basket, item] : basket
			),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	useEffect(() => {
		setBasket(notes);
	}, [checkNotes]);

	useEffect(() => {
		if (
			basket[basket.length - 1] &&
			basket[basket.length - 1].notebookId !== notebook.id
		) {
			const moveNote = basket[basket.length - 1];
			moveNote.notebookId = notebook.id;
			dispatch(notesActions.editNote(moveNote.id, moveNote));
		}
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
			<div ref={dropRef}>
				{basket.map((note) => (
					<EachNote note={note} notebookId={notebook?.id} />
				))}
				<div className="notebook-dnd-div">
					<i className="fa-solid fa-circle-arrow-down"></i>
					Drag and drop to move notes in notebooks
				</div>
			</div>
		</div>
	);
};

export default AllNotebook;
