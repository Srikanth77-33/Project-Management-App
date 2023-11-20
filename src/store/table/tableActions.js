import axios from "axios";
import {
  FILTER_TABLE_DATA,
  SET_DATA,
  SET_ERR,
  SET_LOADING,
  UPDATE_CURRENT_PAGE_DATA,
} from "./actionTypes";

export const getTableData = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  axios
    .get("https://mocki.io/v1/89786173-c32e-44c9-9cee-c2abb6022381") //mocki.io
    .then((res) => {
      dispatch({ type: SET_DATA, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERR, payload: "Fetching table data failed!." });
    });
};

export const updatePageData = (page) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_PAGE_DATA, payload: page });
};

export const filterTableData = (filter) => (dispatch) => {
  dispatch({ type: FILTER_TABLE_DATA, payload: filter });
  dispatch({ type: UPDATE_CURRENT_PAGE_DATA, payload: 1 });
};
