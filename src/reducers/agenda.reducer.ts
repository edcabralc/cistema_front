import { Reducer } from "react";
import { ReserveType } from "../types/reserve.type";

type AddReserve = { type: "add-reserve"; payload: ReserveType };
type RemoveReserve = { type: "remove-reserve"; payload: { id: string } };
type EditReserve = { type: "edit-reserve"; payload: ReserveType };
type LoadReserve = { type: "load-reserve"; payload: ReserveType[] };

type ReserveReducerType =
  | AddReserve
  | RemoveReserve
  | EditReserve
  | LoadReserve;

const reserveReducer: Reducer<ReserveType[], ReserveReducerType> = (
  state,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case "add-reserve":
      return [...state, payload];

    case "remove-reserve":
      return state.filter(reserve => reserve.id !== payload.id);

    case "edit-reserve":
      return state.map(reserve =>
        reserve.id === payload.id ? { ...reserve, payload } : reserve
      );

    case "load-reserve":
      return payload;

    default:
      return state;
  }
};

export { reserveReducer };
