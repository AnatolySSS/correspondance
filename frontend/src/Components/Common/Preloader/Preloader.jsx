import React from "react";
import { connect } from "react-redux";
// import { ProgressBar } from 'primereact/progressbar'
import preloader from "./../../../assets/logoInfinity_3.svg";
import { getPercentCompleted } from "../../../redux/reducers/preloader-reducer";

const Preloader = (props) => {
  // const { percentCompleted } = props
  // const [percent, setPercent] = useState(percentCompleted);

  // useEffect(() => {
  //   setPercent(percentCompleted)
  // }, [percentCompleted])
  return <div>
    <img src={preloader} alt=""/>
    {/* <ProgressBar value={percent}/> */}
  </div>;
};

const mapStateToProps = (state) => {
  return {
    percentCompleted: state.preloader.percentCompleted,
  };
};

const mapDispatchToProps = {
  getPercentCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(Preloader);