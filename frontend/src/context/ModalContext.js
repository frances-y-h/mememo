import { useState, useContext, createContext } from "react";

export const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
	const [toggleNewNotebookModal, setToggleNewNotebookModal] =
		useState("hidden");
	const [toggleTagModal, setToggleTagModal] = useState("hidden");
	const [toggleTrashModal, setToggleTrashModal] = useState("hidden");
	const [toggleEditNotebookModal, setToggleEditNotebookModal] =
		useState("hidden");

	return (
		<ModalContext.Provider
			value={{
				toggleNewNotebookModal,
				setToggleNewNotebookModal,
				toggleTagModal,
				setToggleTagModal,
				toggleTrashModal,
				setToggleTrashModal,
				toggleEditNotebookModal,
				setToggleEditNotebookModal,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}
