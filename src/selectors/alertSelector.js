import { createSelector } from "reselect";

const alertSelector = (state) => state.alert;

export const SelectAlert = createSelector([alertSelector], (alert) => alert);
