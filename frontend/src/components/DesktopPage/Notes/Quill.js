import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "../../../css/quill.snow.css";
import "../../../css/quill.bubble.css";

import { useDisableEdit } from "../../../context/DisableEditContext";

const Editor = ({ content, setContent }) => {
	const { disableEdit } = useDisableEdit();
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
						"#ffffff",
						"#facccc",
						"#ffebcc",
						"#ffffcc",
						"#cce8cc",
						"#cce0f5",
						"#ebd6ff",
						"#bbbbbb",
						"#f06666",
						"#ffc266",
						"#ffff66",
						"#66b966",
						"#66a3e0",
						"#c285ff",
						"#888888",
						"#a10000",
						"#b26b00",
						"#b2b200",
						"#006100",
						"#0047b2",
						"#6b24b2",
						"#444444",
						"#5c0000",
						"#663d00",
						"#666600",
						"#003700",
						"#002966",
						"#3d1466",
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
						"#ffffff",
						"#facccc",
						"#ffebcc",
						"#ffffcc",
						"#cce8cc",
						"#cce0f5",
						"#ebd6ff",
						"#bbbbbb",
						"#f06666",
						"#ffc266",
						"#ffff66",
						"#66b966",
						"#66a3e0",
						"#c285ff",
						"#888888",
						"#a10000",
						"#b26b00",
						"#b2b200",
						"#006100",
						"#0047b2",
						"#6b24b2",
						"#444444",
						"#5c0000",
						"#663d00",
						"#666600",
						"#003700",
						"#002966",
						"#3d1466",
					],
				},
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
				{ align: [] },
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
		"align",
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
		<>
			{/* <CustomToolbar /> */}
			<ReactQuill
				theme={theme}
				value={content}
				onChange={setContent}
				modules={modules}
				formats={formats}
				readOnly={readOnly}
				placeholder="Say something..."
			/>
		</>
	);
};

export default Editor;
