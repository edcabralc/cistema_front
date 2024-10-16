import { reserveReducer } from "@/reducers/agenda.reducer";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { ReserveType } from "../@types/reserve.type";

type AgendaContextType = {
  reserves: ReserveType[];
  addReserve: (reserve: ReserveType) => void;
  removeReserve: (id: string) => void;
  editReserve: (reserve: ReserveType) => void;
  loadReserves: (reserves: ReserveType[]) => void;
};

const AgendaContext = createContext<AgendaContextType | null>(null);

const AgendaProvider = ({ children }: { children: ReactNode }) => {
  const [reserves, dispatch] = useReducer(reserveReducer, []);

  const addReserve = (reserve: ReserveType) =>
    dispatch({ type: "add-reserve", payload: reserve });

  const removeReserve = (id: string) => {
    dispatch({ type: "remove-reserve", payload: { id } });
  };

  const editReserve = (reserve: ReserveType) => {
    dispatch({ type: "edit-reserve", payload: reserve });
  };

  const loadReserves = (reserves: ReserveType[]) => {
    dispatch({ type: "load-reserve", payload: reserves });
  };

  return (
    <AgendaContext.Provider
      value={{ reserves, addReserve, removeReserve, editReserve, loadReserves }}
    >
      {children}
    </AgendaContext.Provider>
  );
};

const useAgenda = () => useContext(AgendaContext);

export { AgendaProvider, useAgenda };
