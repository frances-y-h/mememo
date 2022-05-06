import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "../../../context/NotificationContext";
import * as sessionActions from "../../../store/session";

const Favorite = ({ noteId }) => {
	const dispatch = useDispatch();
	const star = useRef();
	const favorites = useSelector((state) => state.session.user.favorite);
	const { setToggleNotification, setNotificationMsg } = useNotification();

	const toggleFavorite = async (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (!noteId) {
			setNotificationMsg("Please save note first");
			setToggleNotification("");

			setTimeout(() => {
				setToggleNotification("notification-move");
			}, 2000);
			return;
		}
		if (favorites.some((id) => id === noteId)) {
			// if it is, remove from favorite
			await dispatch(sessionActions.removeFromFavorite(noteId));

			star?.current?.classList.remove("fa-solid");
			star?.current?.classList.add("fa-regular");
		} else {
			// if it is not, unshift to favorite array
			await dispatch(sessionActions.addToFavorite(noteId));

			star?.current?.classList.add("fa-solid");
			star?.current?.classList.remove("fa-regular");
		}
	};

	useEffect(() => {
		if (favorites.some((id) => id === noteId)) {
			star?.current?.classList.add("fa-solid");
			star?.current?.classList.remove("fa-regular");
		} else {
			star?.current?.classList.remove("fa-solid");
			star?.current?.classList.add("fa-regular");
		}
	}, [noteId, favorites]);

	return (
		<i className="fa-star fa-solid" ref={star} onClick={toggleFavorite}></i>
	);
};

export default Favorite;
