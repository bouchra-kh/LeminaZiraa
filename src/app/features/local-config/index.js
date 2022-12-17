import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const configurationSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    SwitchMode: () => {
      var modeSwitch = document.querySelector(".mode-switch");
      document.documentElement.classList.toggle("light");
   //   modeSwitch.classList.toggle("active");
      document.querySelector(".feather").classList.toggle("active");
    },
    toGrid: () => {
      document.querySelector(".list").classList.remove("active");
      document.querySelector(".grid").classList.add("active");
      document
        .querySelector(".products-area-wrapper")
        .classList.add("gridView");
      document
        .querySelector(".products-area-wrapper")
        .classList.remove("tableView");
    },

    ToList: () => {
      document.querySelector(".list").classList.add("active");
      document.querySelector(".grid").classList.remove("active");
      document
        .querySelector(".products-area-wrapper")
        .classList.remove("gridView");
      document
        .querySelector(".products-area-wrapper")
        .classList.add("tableView");
    },
  },
});

export const { SwitchMode, toGrid, ToList } = configurationSlice.actions;

export default configurationSlice.reducer;
