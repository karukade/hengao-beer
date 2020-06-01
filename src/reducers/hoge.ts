import { reducerWithInitialState } from "typescript-fsa-reducers";
import { updateEmail, updateName } from "../actions/hoge-actions";

export type HogeStateType = {
  name: string;
  email: string;
};

const initialState: HogeStateType = {
  name: "",
  email: "",
};

export const hogeReducer = reducerWithInitialState(initialState)
  .case(updateName, (state, name) => ({ ...state, name }))
  .case(updateEmail, (state, email) => ({ ...state, email }));
