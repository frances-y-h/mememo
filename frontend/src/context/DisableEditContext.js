import { useState, useContext, createContext } from "react";

export const DisableEditContext = createContext();
export const useDisableEdit = () => useContext(DisableEditContext);

export default function DisableEditProvider({ children }) {
	const [disableEdit, setDisableEdit] = useState(true);

	return (
		<DisableEditContext.Provider
			value={{
				disableEdit,
				setDisableEdit,
			}}
		>
			{children}
		</DisableEditContext.Provider>
	);
}
