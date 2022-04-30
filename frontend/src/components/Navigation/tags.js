import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

const Tags = ({tags}) => {
  const [showTags, setShowTags] = useState(false);

  const tagsDDDiv = useRef();
  const tagsCaret = useRef();

  useEffect(() => {
    if (showTags) {
      tagsDDDiv.current.classList.remove("nav-dropdown-hide");
      tagsCaret.current.classList.add("nav-caret-down");
    } else {
      tagsDDDiv.current.classList.add("nav-dropdown-hide");
      tagsCaret.current.classList.remove("nav-caret-down");
    }
	}, [showTags]);

  return (
    <>
			<div className="nav-div" onClick={() => setShowTags(!showTags)}>
				<div className="nav-div-left">
					<div className="nav-caret" ref={tagsCaret}>
						<i className="fa-solid fa-caret-right"></i>
					</div>
					<i className="fa-solid fa-tags"></i>
					<div>Tags</div>
				</div>
				<div className="nav-div-right">
					<i className="fa-solid fa-circle-plus nav-add"></i>
				</div>
			</div>
      {/* Tags Dropdown */}
      <div className="nav-dd  nav-dropdown-hide" ref={tagsDDDiv}>
        {tags && tags.map((tag) => (
          <div className="nav-dd-div" key={tag.id}>
            <div className="tag" style={{backgroundColor: `#${tag.color}`}}>{tag.name}</div>
          </div>
        ))}
        <div className="nav-dd-div nav-new">
					<i className="fa-regular fa-plus"></i>
					<i className="fa-solid fa-tags"></i>
					<div className="nav-dd-title">New Tag</div>
				</div>
      </div>
    </>
  )
};


export default Tags;
