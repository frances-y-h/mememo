const NoteContent = ({ content }) => {
	return (
		<div
			className="dk-note-content"
			dangerouslySetInnerHTML={{
				__html: content?.replace(/<([\w =":(,);\/-]+)>*/g, ""),
			}}
		></div>
	);
};

export default NoteContent;
