import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useTagModal } from "../../context/TagModalContext";

import * as tagsActions from "../../store/tags";
import NewTagModal from "./newTagModal";

const Tags = () => {
	const { toggleModal, setToggleModal } = useTagModal();
	const dispatch = useDispatch();

	const tags = Object.values(useSelector((state) => state.tags));
	const user = useSelector((state) => state.session.user);
	const [showTags, setShowTags] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [tagErr, setTagErr] = useState("");
	const [name, setName] = useState("");
	const [color, setColor] = useState("777777");

	const tagsDDDiv = useRef();
	const tagsCaret = useRef();
	const tagEl = useRef();

	const tooltip = useRef();

	useEffect(() => {
		if (showTags) {
			tagsDDDiv.current.classList.remove("nav-dropdown-hide");
			tagsCaret.current.classList.add("nav-caret-down");
		} else {
			tagsDDDiv.current.classList.add("nav-dropdown-hide");
			tagsCaret.current.classList.remove("nav-caret-down");
		}
	}, [showTags]);

	useEffect(() => {
		if (showTooltip) {
			tooltip.current.classList.remove("hidden");
		} else {
			tooltip.current.classList.add("hidden");
		}
	}, [showTooltip]);

	return (
		<>
			<NewTagModal />
			<div
				className="nav-div"
				onClick={(e) => {
					e.stopPropagation();
					setShowTags(!showTags);
				}}
			>
				<div className="nav-div-left">
					<div
						className="nav-caret"
						ref={tagsCaret}
						onClick={(e) => {
							e.stopPropagation();
							setShowTags(!showTags);
						}}
					>
						<i className="fa-solid fa-caret-right"></i>
					</div>
					<i className="fa-solid fa-tags"></i>
					<div>Tags</div>
				</div>
				<div
					className="nav-div-right  tooltip"
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					onClick={(e) => {
						e.stopPropagation();
						setToggleModal("");
					}}
				>
					<i className="fa-solid fa-circle-plus nav-add"></i>
					<span className="navTooltiptext hidden" ref={tooltip}>
						New Tag
					</span>
				</div>
			</div>
			{/* Tags Dropdown */}
			<div className="nav-dd  nav-dropdown-hide" ref={tagsDDDiv}>
				{tags[0] &&
					tags.map((tag) => (
						<Link to={`/tags/${tag.id}`} key={tag.id}>
							<div className="nav-dd-div nav-dd-div-tight">
								<div
									className="tag tag-sm"
									style={{ backgroundColor: `#${tag.color}` }}
								>
									{tag.name}
								</div>
							</div>
						</Link>
					))}
				<div className="nav-dd-div nav-new" onClick={() => setToggleModal("")}>
					<i className="fa-regular fa-plus"></i>
					<i className="fa-solid fa-tags"></i>
					<div className="nav-dd-title">New Tag</div>
				</div>
			</div>
		</>
	);
};

export default Tags;
