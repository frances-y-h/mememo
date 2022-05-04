import { useState, useContext, createContext } from "react";

export const NewNotebookModalContext = createContext();
export const useNewNotebookModal = () => useContext(NewNotebookModalContext);

export default function NewNotebookModalProvider({ children }) {
	const [toggleNewNotebookModal, setToggleNewNotebookModal] =
		useState("hidden");

	return (
		<NewNotebookModalContext.Provider
			value={{ toggleNewNotebookModal, setToggleNewNotebookModal }}
		>
			{children}
		</NewNotebookModalContext.Provider>
	);
}
