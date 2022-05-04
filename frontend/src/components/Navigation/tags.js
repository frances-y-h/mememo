import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";

import NewTagModal from "../DesktopPage/Tools/newTagModal";

const Tags = () => {
	const { setToggleTagModal } = useModal();
	const tags = useSelector((state) => state.tags);
	const tagsOrdered = Object.values(tags).sort((a, b) =>
		b.updatedAt.localeCompare(a.updatedAt)
	);
	const [showTags, setShowTags] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);

	const tagsDDDiv = useRef();
	const tagsCaret = useRef();
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
						setToggleTagModal("");
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
				{tagsOrdered.map((tag) => (
					<Link to={`/tags/${tag?.id}`} key={tag?.id}>
						<div className="nav-dd-div nav-dd-div-tight">
							<div
								className="tag tag-sm"
								style={{ backgroundColor: `#${tag?.color}` }}
							>
								{tag?.name}
							</div>
						</div>
					</Link>
				))}
				<div
					className="nav-dd-div nav-new"
					onClick={() => setToggleTagModal("")}
				>
					<i className="fa-regular fa-plus"></i>
					<i className="fa-solid fa-tags"></i>
					<div className="nav-dd-title">New Tag</div>
				</div>
			</div>
		</>
	);
};

export default Tags;
