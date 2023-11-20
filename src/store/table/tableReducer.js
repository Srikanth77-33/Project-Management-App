import {
  SET_DATA,
  SET_ERR,
  SET_LOADING,
  UPDATE_CURRENT_PAGE_DATA,
  FILTER_TABLE_DATA,
} from "./actionTypes";

const tableData = {
  tableData: [],
  currentPageData: [],
  loading: false,
  errorMsg: "",
  dataLength: 0,
  filteredData: [],
};

export const tableReducer = (state = tableData, { type, payload }) => {
  let newData;

  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };

    case SET_ERR:
      return { ...state, loading: false, errorMsg: payload };

    case SET_DATA:
      const pageData = payload.slice(0, 9);
      return {
        errorMsg: "",
        loading: false,
        tableData: [...payload],
        currentPageData: pageData,
        dataLength: payload.length,
        filteredData: [...payload],
      };

    case UPDATE_CURRENT_PAGE_DATA:
      newData =
        9 * payload > state.dataLength
          ? [...state.filteredData.slice(9 * (payload - 1))]
          : [...state.filteredData.slice(payload * 9 - 9, payload * 9)];
      return { ...state, currentPageData: newData };

    case FILTER_TABLE_DATA:
      if (payload === "all") {
        newData = state.tableData;
      } else {
        newData = state.tableData.filter((item) => {
          let currentDate = new Date();
          let date = new Date(item.dueDate);

          if (currentDate > date && item.action !== "success") {
            if (payload === "delay") {
              return true;
            } else {
              return false;
            }
          } else {
            if (item.action === payload) {
              return true;
            } else {
              return false;
            }
          }
        });
      }
      return { ...state, filteredData: newData, dataLength: newData.length };

    default:
      return state;
  }
};
