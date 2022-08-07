import { createContext, Dispatch, useState } from "react";

type children = JSX.Element[] | JSX.Element;

const initialState: boolean = false;

export const InitialLoadContext = createContext<{
    loadState: boolean;
    setLoadState: Dispatch<any>;
}>({
    loadState: initialState,
    setLoadState: () => null,
});

export const InitialLoadContextProvider = ({ children }: { children: children }) => {
    const [loadState, setLoadState] = useState(initialState);

    return <InitialLoadContext.Provider value={{ loadState, setLoadState }}>{children}</InitialLoadContext.Provider>;
};
