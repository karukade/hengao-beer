import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const updateName = actionCreator<string>("UPDATE_NAME");
export const updateEmail = actionCreator<string>("UPDATE_EMAIL");
