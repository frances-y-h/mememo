import { useRef, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import update from "react-addons-update"; // ES6

import FavNote from "./favNote";

import * as sessionActions from "../../store/session";

const Favorite = () => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.session.user.favorite);

	const [showFavorites, setShowFavorites] = useState(false);
	const [basket, setBasket] = useState([]);

	const favDDDiv = useRef();
	const favCaret = useRef();

	const moveFavorite = useCallback((dragIndex, hoverIndex) => {
		setBasket((prevBasket) =>
			update(prevBasket, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, prevBasket[dragIndex]],
				],
			})
		);
	}, []);

	const renderMove = useCallback((noteId, index) => {
		return (
			<FavNote
				key={noteId}
				index={index}
				noteId={noteId}
				moveFavorite={moveFavorite}
			/>
		);
	});

	// show or hide favorite depending on favorite state
	useEffect(() => {
		if (showFavorites) {
			favDDDiv?.current?.classList.remove("nav-dropdown-hide");
			favCaret.current.classList.add("nav-caret-down");
		} else {
			favDDDiv?.current?.classList.add("nav-dropdown-hide");
			favCaret.current.classList.remove("nav-caret-down");
		}
	}, [showFavorites]);

	useEffect(() => {
		dispatch(sessionActions.updateFavoritesArr(basket));
	}, [basket]);

	// set basket on initial load
	useEffect(() => {
		setBasket(favorites);
	}, [JSON.stringify(favorites)]);

	return (
		<>
			<div
				className="nav-div"
				onClick={(e) => {
					e.stopPropagation();
					setShowFavorites(!showFavorites);
				}}
			>
				<div className="nav-div-left">
					<div className="nav-caret" ref={favCaret}>
						<i className="fa-solid fa-caret-right"></i>
					</div>
					<i className="fa-solid fa-star nav"></i>
					<div>Favorites</div>
				</div>
			</div>
			{/* favorite dropdown */}
			<div className="nav-dd  nav-dropdown-hide" ref={favDDDiv}>
				{basket?.map((noteId, i) => renderMove(noteId, i))}
			</div>
		</>
	);
};

export default Favorite;
