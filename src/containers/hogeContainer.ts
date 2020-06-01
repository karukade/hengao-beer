import { connect } from "react-redux";
import { updateName, updateEmail } from "../actions/hoge-actions";
import HogeComponent from "../components/hogeComponents";
// types
import { Action } from "typescript-fsa";
import { Dispatch } from "redux";
import { StateType } from "../store";

export type HogeActions = {
  updateName: (arg: string) => Action<string>;
  updateEmail: (arg: string) => Action<string>;
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action<string>>
): HogeActions => {
  return {
    updateEmail: (arg) => dispatch(updateEmail(arg)),
    updateName: (arg) => dispatch(updateName(arg)),
  };
};

const mapStateToProps = (state: StateType) => ({ ...state.hoge });

export default connect(mapStateToProps, mapDispatchToProps)(HogeComponent);
