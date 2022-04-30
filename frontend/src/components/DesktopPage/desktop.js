import { useSelector } from "react-redux";

const Desktop = () => {
	const { username } = useSelector((state) => state.session.user);
	const now = Date.now();
	return (
		<main className="desktop-ctrl">
			<div className="desktop-greeting-wrap">
				<div className="desktop-greeting">Good Morning, {username}</div>
				<div>{now}</div>
			</div>
			<div>Notes and Scratch pad divs</div>
			{/* <div>Recently catured</div> */}
		</main>
	);
};

export default Desktop;
