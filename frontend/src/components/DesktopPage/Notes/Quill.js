import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "../../../css/quill.snow.css";
import "../../../css/quill.bubble.css";

import { useDisableEdit } from "../../../context/DisableEditContext";
import { set } from "draft-js/lib/EditorState";

const Quill = ({ content, setContent }) => {
	const { disableEdit, setDisableEdit } = useDisableEdit();
	const [readOnly, setReadonly] = useState(false);
	const [theme, setTheme] = useState("snow");

	const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{
					color: [
						"#000000",
						"#e60000",
						"#ff9900",
						"#ffff00",
						"#008a00",
						"#0066cc",
						"#9933ff",
					],
				},
				{
					background: [
						"#000000",
						"#e60000",
						"#ff9900",
						"#ffff00",
						"#008a00",
						"#0066cc",
						"#9933ff",
					],
				},
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link", "image"],
			["clean"],
		],
	};

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"color",
		"background",
		"list",
		"bullet",
		"indent",
		"link",
		"image",
	];

	useEffect(() => {
		if (disableEdit) {
			setReadonly(true);
			setTheme("bubble");
		} else {
			setReadonly(false);
			setTheme("snow");
		}
	}, [disableEdit]);

	return (
		<ReactQuill
			theme={theme}
			value={content}
			onChange={setContent}
			modules={modules}
			formats={formats}
			readOnly={readOnly}
		/>
	);
};

export default Quill;
