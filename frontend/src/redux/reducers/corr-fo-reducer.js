import { DataAPI } from "../../api/api";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import changeDateType from "../../function-helpers/changeDateType";

const SET_DATA = "correspondance/corr-fo-reducer/SET_DATA";
const SET_UPLOAD_STATUS = "correspondance/corr-fo-reducer/SET_UPLOAD_STATUS";

let initialState = {
  columns: [],
  data: [],
  values: [],
  filters: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    inventary_number: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    qr_code: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    serial: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    type: { value: null, matchMode: FilterMatchMode.IN },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    purchase_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    purchase_price: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    incoming_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    last_setup_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    ad_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    owner: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    prev_owner: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    set_with: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    workplace_type: { value: null, matchMode: FilterMatchMode.IN },
    serviceable: { value: null, matchMode: FilterMatchMode.IN },
    note: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    is_workplace: { value: null, matchMode: FilterMatchMode.EQUALS },
    location: { value: null, matchMode: FilterMatchMode.IN },
    was_deleted: { value: null, matchMode: FilterMatchMode.EQUALS },
    release_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
  },
  uploadedStatus: false,
  name: "",
  message: "",
};

const corrFoReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

const setData = (data, message) => ({ type: SET_DATA, data, message });
const setUploadStatus = (status) => ({ type: SET_UPLOAD_STATUS, uploadedStatus: status });

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
    DataAPI.getData("corrFo").then((data) => {
      dispatch(setData(changeDateFormat(data)));
    });
  };
};

export const updateData = (rowData, rowId) => {
  return (dispatch) => {
    DataAPI.updateData("corrFo", rowData, rowId).then((message) => {
      DataAPI.getData("corrFo").then((data) => {
        dispatch(setData(changeDateFormat(data), message.message));
      });
    });
  };
};

export const deleteData = (rowId) => {
  return (dispatch) => {
    DataAPI.deleteData("corrFo", rowId).then((message) => {
      DataAPI.getData("corrFo").then((data) => {
        dispatch(setData(changeDateFormat(data), message.message));
      });
    });
  };
};

export const addData = (rowData) => {
  return (dispatch) => {
    DataAPI.addData("corrFo", rowData).then((data) => {
      DataAPI.getData("corrFo").then((data) => {
        dispatch(setData(changeDateFormat(data)));
      });
    });
  };
};

export const uploadData = (data) => {
  return (dispatch) => {
    DataAPI.uploadData("corrFo", data).then((data) => {
      dispatch(setUploadStatus(true));
    });
  };
};

export default corrFoReducer;
