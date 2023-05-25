import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Sidebar } from "primereact/sidebar";
import PanelMenuCraft from "../PanelMenuCraft/PanelMenuCraft";

const SidebarCraft = (props) => {
  return (
    <div className="">
      <Sidebar className="flex" visible={props.visible} onHide={() => props.setVisible(false)}>
        <PanelMenuCraft />
      </Sidebar>
    </div>
  );
};

export default SidebarCraft;
