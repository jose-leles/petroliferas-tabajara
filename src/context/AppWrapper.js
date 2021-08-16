import { createContext, useContext, useReducer } from 'react';
import { toasterReducer, initialState} from "./toasterReducer";
const AppContext = createContext();


export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(toasterReducer, initialState)

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}