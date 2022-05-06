const NoteContent = ({ content }) => {
	return (
		<div
			className="note-content"
			dangerouslySetInnerHTML={{
				__html: content?.replace(/<([\w =":(,);/-]+)>*/g, ""),
			}}
		></div>
	);
};

export default NoteContent;
