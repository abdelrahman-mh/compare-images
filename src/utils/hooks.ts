import React from "react";
import SideContext from "../context/SideContext";
import { useDispatch, useSelector } from "react-redux";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type { RootState };

export const useSide = () => {
  const context = React.useContext(SideContext);
  if (context === undefined) {
    throw new Error("None Valid value for Side");
  }
  return context;
};
