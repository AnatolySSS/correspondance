import { connect } from "react-redux";
import { compose } from "redux";
import TableCraft from "./CorrApp";
import { requestData, addData, updateData, deleteData } from "../../redux/reducers/corr-fo-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";
import { logout } from "../../redux/reducers/auth-reducer";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {

  return {
    data: state.corrFo.data,
    columns: state.corrFo.columns,
    values: state.corrFo.values,
    filters: state.corrFo.filters,
    name: state.corrFo.name,
    message: state.corrFo.message,
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