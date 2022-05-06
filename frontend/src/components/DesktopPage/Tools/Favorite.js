import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as sessionActions from "../../../store/session";

const Favorite = ({ noteId }) => {
	const dispatch = useDispatch();
	const star = useRef();
	const favorites = useSelector((state) => state.session.user.favorite);
	const [isFavorite, setIsFavorite] = useState();

	const toggleFavorite = async () => {
		if (isFavorite) {
			// if it is, remove from favorite
			await dispatch(sessionActions.removeFromFavorite(noteId));
			setIsFavorite(false);
			star?.current?.classList.remove("fa-solid");
			star?.current?.classList.add("fa-regular");
		} else {
			// if it is not, unshift to favorite array
			await dispatch(sessionActions.addToFavorite(noteId));
			setIsFavorite(true);
			star?.current?.classList.add("fa-solid");
			star?.current?.classList.remove("fa-regular");
		}
	};

	// console.log(favorites.some((id) => id === noteId));

	useEffect(() => {
		if (favorites.some((id) => id === noteId)) {
			setIsFavorite(true);
			star?.current?.classList.add("fa-solid");
			star?.current?.classList.remove("fa-regular");
		} else {
			setIsFavorite(false);
			star?.current?.classList.remove("fa-solid");
			star?.current?.classList.add("fa-regular");
		}
		console.log(isFavorite);
	}, [noteId]);

	return (
		<i className="fa-star fa-solid" ref={star} onClick={toggleFavorite}></i>
	);
};

export default Favorite;
