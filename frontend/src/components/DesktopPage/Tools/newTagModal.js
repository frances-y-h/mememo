import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTagModal } from "../../../context/TagModalContext";

import * as tagsActions from "../../../store/tags";

const NewTagModal = () => {
	const { toggleModal, setToggleModal } = useTagModal();
	const dispatch = useDispatch();

	const tags = useSelector((state) => state.tags);
	const [disable, setDisable] = useState(true);
	const [tagErr, setTagErr] = useState("");
	const [name, setName] = useState("");
	const [color, setColor] = useState("777777");

	const tagEl = useRef();
	const modalBg = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const tag = {
			name,
			color,
		};

		// dispatch action to reducer to create tag in database
		await dispatch(tagsActions.addNewTag(tag));

		// if created, close modal, clear fields, and tag dropdown open so new tag showing
		setName("");
		setColor("777777");

		setToggleModal("hidden");
	};

	// validator
	useEffect(() => {
		let tagAlreadyExists;
		if (Object.values(tags)[0]) {
			tagAlreadyExists = Object.values(tags).some((tag) => tag.name === name);
		}

		if (tagAlreadyExists) {
			setTagErr("Tag name already exists");
		} else if (!(name.length > 0 && name.length < 21)) {
			setTagErr("Tag name must be between 1 to 20 characters");
		} else {
			setTagErr("");
		}
	}, [name, tags]);

	// validator tooltip toggle and submit button toggle
	useEffect(() => {
		if (tagErr.length) {
			tagEl.current.classList.remove("hidden");
			setDisable(true);
		} else {
			tagEl.current.classList.add("hidden");
			setDisable(false);
		}
	}, [tagErr]);

	return (
		<div
			className={`modalBgTag ${toggleModal}`}
			ref={modalBg}
			onClick={() => setToggleModal("hidden")}
		>
			<form
				className="form-control"
				onSubmit={handleSubmit}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modal-x" onClick={() => setToggleModal("hidden")}>
					<i className="fa-solid fa-xmark fa-lg"></i>
				</div>
				<div className="form-group form-gap30">
					<div className="form-title">Create new tag</div>
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
					<button className="btn" type="submit" disabled={disable}>
						Create tag
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewTagModal;
