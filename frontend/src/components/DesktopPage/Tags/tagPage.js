import { useParams, Redirect, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";
import * as tagsActions from "../../../store/tags";
import * as notesActions from "../../../store/notes";

import NoteCard from "./noteCard";
import NotePage from "./notePage";

function TagPage({ title }) {
	const dispatch = useDispatch();
	const { id } = useParams();
	const tags = Object.values(useSelector((state) => state.tags));
	const tag = useSelector((state) => state.tags[id]);
	const userId = useSelector((state) => state.session.user.id);

	const [disable, setDisable] = useState(true);
	const [tagErr, setTagErr] = useState("");
	const [name, setName] = useState("");
	const [color, setColor] = useState("");
	const [tagNotes, setTagNotes] = useState("");

	const editTag = useRef();
	const modalBg = useRef();
	const tagEl = useRef();
	const deleteBtn = useRef();

	let count = null;
	let icon = "";

	if (title === "Tag" && tag) {
		count = (
			<div className="tag" style={{ backgroundColor: `#${tag?.color}` }}>
				{tag?.name}
			</div>
		);
		icon = <i className="fa-solid fa-tag"></i>;
	} else if (title === "Tags") {
		count = `${tags?.length} tags`;
		icon = <i className="fa-solid fa-tags"></i>;
	}

	const closeModal = () => {
		modalBg.current?.classList.add("hidden");
		setName(tag?.name);
		setColor(tag?.color);
	};

	const openModal = () => {
		modalBg.current?.classList.remove("hidden");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const tagToUpdate = {
			name,
			color,
		};

		// dispatch action to reducer to create tag in database
		await dispatch(tagsActions.updateTag(id, tagToUpdate));
		await dispatch(notesActions.getAllNotes(userId));
		modalBg.current.classList.add("hidden");
	};

	const mouseEnterDelete = () => {
		if (tag?.Notes?.length > 0) {
			deleteBtn.current.classList.remove("hidden");
		}
	};

	const mouseLeaveDelete = () => {
		deleteBtn.current.classList.add("hidden");
	};

	// Delete tags
	const handleDelete = async (e) => {
		e.preventDefault();

		await dispatch(tagsActions.deleteOldTag(tag.id));
		// need to make sure notes tag info updated
		await dispatch(notesActions.getAllNotes(userId));
		modalBg.current.classList.add("hidden");
		<Redirect to="/tags" />;
	};

	useEffect(() => {
		if (id) {
			setName(tag?.name);
			setColor(tag?.color);
			setTagNotes(tag?.Notes?.length);
			editTag.current.classList.remove("hidden");
		} else {
			setName("");
			setColor("");
			editTag.current.classList.add("hidden");
		}
	}, [id, tag?.name, tag?.color, tag?.Notes?.length]);

	// validator
	useEffect(() => {
		let tagAlreadyExists;
		if (tags[0]) {
			tagAlreadyExists = tags?.some(
				(tag) => tag.name === name && tag.id !== parseInt(id, 10)
			);
		}

		if (tagAlreadyExists) {
			setTagErr("Tag name already exists");
		} else if (!(name?.length > 0 && name?.length < 21)) {
			setTagErr("Tag name must be between 1 to 20 characters");
		} else {
			setTagErr("");
		}
	}, [name, tags, id]);

	// validator tooltip toggle and submit button toggle
	useEffect(() => {
		if (tagErr?.length) {
			tagEl.current.classList.remove("hidden");
			setDisable(true);
		} else {
			tagEl.current.classList.add("hidden");
			setDisable(false);
		}
	}, [tagErr]);

	return (
		<>
			<main className="note-control">
				<div className="note-sidebar">
					<div className="note-title-box">
						<div className="note-title-wrap">
							<div className="note-title-icon">
								{icon}
								<div className="note-title">{title}</div>
							</div>
							<div
								className="note-title-edit"
								ref={editTag}
								onClick={openModal}
							>
								Edit Tag
							</div>
						</div>
						<div className="note-title-ctrl">
							<div className="note-title-ctrl-count">{count}</div>
							<div className="note-title-ctrl-ctrls">
								{/* <i className="fa-solid fa-arrow-down-wide-short"></i> */}
							</div>
						</div>
					</div>
					<div>
						<NoteCard tagId={id} />
					</div>
				</div>
				<div className="note-view">
					<Switch>
						<Route path="/tags/:tagId/notes/:noteId">
							<NotePage />
						</Route>
					</Switch>
				</div>
			</main>
			{/* Edit Modal */}
			<div className="modalBg5 hidden" ref={modalBg} onClick={closeModal}>
				<form
					className="form-control"
					onSubmit={handleSubmit}
					onClick={(e) => e.stopPropagation()}
				>
					<div className="modal-x" onClick={closeModal}>
						<i className="fa-solid fa-xmark fa-lg"></i>
					</div>
					<div className="form-group form-gap30">
						<div className="form-title">
							Edit Tag{" "}
							<i
								className="fa-solid fa-tag"
								style={{ color: `#${tag?.color}` }}
							></i>
							{tag?.name}
						</div>
						<div className="form-description">
							Tags let you add keywords to notes, making them easier to find and
							browse.
						</div>
						<div className="form-input-ctrl tooltip">
							<i className="fa-solid fa-tag"></i>
							<input
								type="text"
								required
								placeholder="Tag name"
								className="input"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<span ref={tagEl} className="tooltiptext hidden">
								{tagErr}
							</span>
						</div>
						<div className="color-picker">
							<div className="color-picker-title">Pick your color</div>
							<div className="color-palette">
								<label className="color-ctnr">
									Default
									<input
										type="radio"
										name="color"
										onChange={() => setColor("777777")}
										checked={color === "777777"}
									/>
									<span
										className="color"
										style={{ backgroundColor: "#777777" }}
									></span>
								</label>
								<label className="color-ctnr">
									Black
									<input
										type="radio"
										name="color"
										onChange={() => setColor("000814")}
										checked={color === "000814"}
									/>
									<span
										className="color"
										style={{ backgroundColor: "#000814" }}
									></span>
								</label>
								<label className="color-ctnr">
									Brown
									<input
										type="radio"
										name="color"
										onChange={() => setColor("473335")}
										checked={color === "473335"}
									/>
									<span
										className="color"
										style={{ backgroundColor: "#473335" }}
									></span>
								</label>
								<label className="color-ctnr">
									Red
									<input
										type="radio"
										name="color"
										onChange={() => setColor("c84639")}
										checked={color === "c84639"}
									/>
									<span
										className="color"
										style={{ backgroundColor: "#c84639" }}
									></span>
								</label>
								<label className="color-ctnr">
									Orange
									<input
										type="radio"
										name="color"
										onChange={() => setColor("ce763b")}
										checked={color === "ce763b"}
									/>
									<span
										className="color"
										style={{ backgroundColor: "#ce763b" }}
									></span>
								</label>
								<label className="color-ctnr">
									Golden
									<input
										type="radio"
										name="color"
										onChange={() => setColor("e2af47")}
										checked={color === "e2af47"}
									/>
									<span
										className="color"
										style={{ backgroundColor: "#e2af47" }}
									></span>
								</label>
								<label className="color-ctnr">
									Yellow
									<input
										type="radio"
										name="color"
										onChange={() => setColor("e9d6af")}
										checked={color === "e9d6af"}
									/>
									<span
										className="color"
										style={{ backgroundColor: "#e9d6af" }}
									></span>
								</label>
								<label className="color-ctnr">
									Teal
									<input
										type="radio"
										name="color"
										onChange={() => setColor("6bb4b1")}
										checked={color === "6bb4b1"}
									/>
									<span
										className="color"
										style={{ backgroundColor: "#6bb4b1" }}
									></span>
								</label>
								<label className="color-ctnr">
									Deep Ocean
									<input
										type="radio"
										name="color"
										onChange={() => setColor("32687a")}
										checked={color === "32687a"}
									/>
									<span
										className="color"
										style={{ backgroundColor: "#32687a" }}
									></span>
								</label>
								<label className="color-ctnr">
									Purple
									<input
										type="radio"
										name="color"
										onChange={() => setColor("6c5ba5")}
										checked={color === "6c5ba5"}
									/>
									<span
										className="color"
										style={{ backgroundColor: "#6c5ba5" }}
									></span>
								</label>
							</div>
						</div>
						<div className="btn-wrap-gap20">
							<button className="btn" type="submit" disabled={disable}>
								Update Tag
							</button>
							<div className="tooltip">
								<button
									className="btn btn-mid1"
									onMouseEnter={mouseEnterDelete}
									onMouseLeave={mouseLeaveDelete}
									onClick={handleDelete}
								>
									Delete Tag
								</button>
								<span ref={deleteBtn} className="tooltiptext hidden">
									You have {tagNotes} notes with this tag. Are you sure you want
									to delete?
								</span>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default TagPage;
