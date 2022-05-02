import { useState, useContext, createContext } from "react";

export const TagModalContext = createContext();
export const useTagModal = () => useContext(TagModalContext);

export default function TagModalProvider({ children }) {
	const [toggleModal, setToggleModal] = useState("hidden");

	return (
		<TagModalContext.Provider value={{ toggleModal, setToggleModal }}>
			{children}
		</TagModalContext.Provider>
	);
}
