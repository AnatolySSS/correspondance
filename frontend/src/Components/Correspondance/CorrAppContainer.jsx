import { connect } from "react-redux";
import { compose } from "redux";
import TableCraft from "./CorrApp";
import { requestData, addData, updateData, deleteData } from "../../redux/reducers/corr-app-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";
import { logout } from "../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {

  return {
    data: state.corrApp.data,
    columns: state.corrApp.columns,
    values: state.corrApp.values,
    filters: state.corrApp.filters,
    name: state.corrApp.name,
    message: state.corrApp.message,
    userAuth: state.auth,
    isFetching: state.corrApp.isFetching,
  };
};

let mapDispatchToProps =  {
    requestData,
    addData,
    updateData,
    deleteData,
    setVisible,
    logout,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(TableCraft);