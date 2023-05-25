import { DataAPI } from "../../api/api";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import changeDateType from "../../function-helpers/changeDateType";

const SET_DATA = "correspondance/corr-app-reducer/SET_DATA";
const SET_UPLOAD_STATUS = "correspondance/corr-app-reducer/SET_UPLOAD_STATUS";
const TOGGLE_IS_FETCHING = "correspondance/corr-app-reducer/TOGGLE_IS_FETCHING";

let initialState = {
  columns: [],
  data: [],
  values: [],
  filters: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    incoming_number: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    incoming_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    outgoing_number: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    registration_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    doc_type: { value: null, matchMode: FilterMatchMode.IN },
    correspondante: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    court_name: { value: null, matchMode: FilterMatchMode.IN },
    plaintiff_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    soo_number: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    execution_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    executor: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    executor_transfer_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    answer_type: { value: null, matchMode: FilterMatchMode.IN },
    response_preparation_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    referral_method: { value: null, matchMode: FilterMatchMode.IN },
    comment: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    reason: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    entered_in_the_accounting_table: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    check_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    correction: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    responsible_for_document_analysis: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    document_analysis_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    summary: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    fixed: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  },
  uploadedStatus: false,
  name: "",
  message: "",
  isFetching: false,
};

const corrAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        columns: action.data.columns,
        data: action.data.lib,
        values: action.data.values,
        filters: {...state.filters},
        name: action.data.name,
        message: action.message,
      };
      case SET_UPLOAD_STATUS:
      return {
        ...state,
        uploadedStatus: action.uploadedStatus,
      };
      case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

const setData = (data, message) => ({ type: SET_DATA, data, message });
const setUploadStatus = (status) => ({ type: SET_UPLOAD_STATUS, uploadedStatus: status });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching });

//Изменение формата даты со строки на объект Date (необходимо для правильной фильтрации)
const changeDateFormat = (data) => {
  data.lib = data.lib.map((v) => {
    Object.keys(v).forEach((element) => {
      if (element.includes("date")) {
        if (v[element] !== null) {
          v[element] = new Date(v[element]);
            v[element] = new Date(v[element]).toLocaleString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              timeZone: "Europe/Moscow",
            });
            v[element] = changeDateType(v[element]);
            v[element] = Date.parse(v[element] + 'T00:00:00')
            v[element] = new Date(v[element]);
        }
      }
    })
    return v;
  })
  return data
};

export const requestData = () => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    DataAPI.getData("corrApp").then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setData(changeDateFormat(data)));
    });
  };
};

export const updateData = (rowData, rowId) => {
  return (dispatch) => {
    DataAPI.updateData("corrApp", rowData, rowId).then((message) => {
      DataAPI.getData("corrApp").then((data) => {
        dispatch(setData(changeDateFormat(data), message.message));
      });
    });
  };
};

export const deleteData = (rowId) => {
  return (dispatch) => {
    DataAPI.deleteData("corrApp", rowId).then((message) => {
      DataAPI.getData("corrApp").then((data) => {
        dispatch(setData(changeDateFormat(data), message.message));
      });
    });
  };
};

export const addData = (rowData) => {
  return (dispatch) => {
    DataAPI.addData("corrApp", rowData).then((data) => {
      DataAPI.getData("corrApp").then((data) => {
        dispatch(setData(changeDateFormat(data)));
      });
    });
  };
};

export const uploadData = (data) => {
  console.log(data);
  return (dispatch) => {
    DataAPI.uploadData("corrApp", data).then((data) => {
      dispatch(setUploadStatus(true));
    });
  };
};

export default corrAppReducer;
