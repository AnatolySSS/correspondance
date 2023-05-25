import { connect } from "react-redux";
import { compose } from "redux";
import UploadCraft from "./UploadCraft";
import { uploadData as uploadCorrAppData } from "../../redux/reducers/corr-app-reducer";
import { uploadData as uploadCorrFoData } from "../../redux/reducers/corr-fo-reducer";
import { uploadData as uploadCorrFuData } from "../../redux/reducers/corr-fu-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";

let mapStateToProps = (state) => {
  return {
    uploadedStatusCorrApp: state.corrApp.uploadedStatus,
    uploadedStatusCorrFo: state.corrFo.uploadedStatus,
    uploadedStatusCorrFu: state.corrFu.uploadedStatus,
  };
};

let mapDispatchToProps =  {
  uploadCorrAppData,
  uploadCorrFoData,
  uploadCorrFuData,
  setVisible,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthNavigate
)(UploadCraft);