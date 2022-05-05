import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.core.css";

const MyEditor = () => {
	const [value, setValue] = useState("");

	return <ReactQuill theme="snow" value={value} onChange={setValue} />;
};

export default MyEditor;
