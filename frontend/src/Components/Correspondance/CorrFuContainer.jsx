import { connect } from "react-redux";
import { compose } from "redux";
import TableCraft from "./CorrApp";
import { requestData, addData, updateData, deleteData } from "../../redux/reducers/corr-fu-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";
import { logout } from "../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {

  return {
    data: state.corrFu.data,
    columns: state.corrFu.columns,
    values: state.corrFu.values,
    filters: state.corrFu.filters,
    name: state.corrFu.name,
    message: state.corrFu.message,
    userAuth: state.auth,
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