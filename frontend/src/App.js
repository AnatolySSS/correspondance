import React from "react";
import { connect } from "react-redux";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "./redux/reducers/app-reducer";
import SidebarCraftContainer from "./Components/SidebarCraft/SidebarCraftContainer";
import CorrAppContainer from "./Components/Correspondance/CorrAppContainer";
import UploadCraftContainer from "./Components/UploadCraft/UploadCraftContainer";
import LoginCraftContainer from "./Components/LoginCraft/LoginCraftContainer";
import CorrFoContainer from "./Components/Correspondance/CorrFoContainer";
import CorrFuContainer from "./Components/Correspondance/CorrFuContainer";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <div> */}
            <SidebarCraftContainer />
          {/* </div> */}
          <div className="max-w-screen h-screen">
            <Routes>
              <Route path="/" element={<LoginCraftContainer />} />
              <Route path="/login" element={<LoginCraftContainer />} />
              <Route path="/corr/app" element={<CorrAppContainer />} />
              <Route path="/corr/fo" element={<CorrFoContainer />} />
              <Route path="/corr/fu" element={<CorrFuContainer />} />
              <Route path="/upload" element={<UploadCraftContainer />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
    isFetching: state.corrApp.isFetching,
  };
};

const mapDispatchToProps = {
  initializeApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
