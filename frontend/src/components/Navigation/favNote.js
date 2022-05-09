import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";

const FavNote = ({ index, moveFavorite, noteId }) => {
	const notes = useSelector((state) => state.notes);

	const ref = useRef(null);
	const [{ handlerId }, drop] = useDrop({
		accept: "favorite",
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determin mouse position on screen
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Draggin upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Time to actually perform the actions
			moveFavorite(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: "favorite",
		item: () => {
			return { noteId, index };
		},
		collection: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	return (
		<div
		// ref={ref} data-handler-id={handlerId}
		>
			<Link to={`/notes/${noteId}`}>
				<div className="nav-dd-div ">
					<i className="fa-regular fa-star nav"></i>
					<div className="nav-dd-title">{notes[noteId]?.title}</div>
					{isDragging && "😱"}
				</div>
			</Link>
		</div>
	);
};

export default FavNote;
