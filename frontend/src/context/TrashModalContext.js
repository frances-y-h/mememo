import { useState, useContext, createContext } from "react";

export const TrashModalContext = createContext();
export const useTrashModal = () => useContext(TrashModalContext);

export default function TrashModalProvider({ children }) {
	const [toggleTrashModal, setToggleTrashModal] = useState("hidden");

	return (
		<TrashModalContext.Provider
			value={{ toggleTrashModal, setToggleTrashModal }}
		>
			{children}
		</TrashModalContext.Provider>
	);
}
