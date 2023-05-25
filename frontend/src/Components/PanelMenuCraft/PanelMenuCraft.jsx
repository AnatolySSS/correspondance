import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { NavLink } from "react-router-dom";
import { PanelMenu } from "primereact/panelmenu";
import { classNames } from "primereact/utils";

const PanelMenuCraft = (props) => {

  const items = [
    {
      label: "Корреспонденция",
      icon: "pi pi-fw pi-file",
      items: [
        {
          template: (item, options) => {
            return (
                <NavLink to="/corr/app"
                  className={classNames(options.className,"w-full p-link flex align-items-center")}
                  style={{
                    textDecoration: "none",
                    color: "#495057",
                  }}>
                  <i className="pi pi-fw pi-print mr-2"></i>
                  Истец Потребитель
                </NavLink>
            );
          },
        },
        {
          template: (item, options) => {
            return (
                <NavLink to="/corr/fo"
                  className={classNames(options.className,"w-full p-link flex align-items-center")}
                  style={{
                    textDecoration: "none",
                    color: "#495057",
                  }}>
                  <i className="pi pi-fw pi-print mr-2"></i>
                  Истец ФО
                </NavLink>
            );
          },
        },
        {
          template: (item, options) => {
            return (
                <NavLink to="/corr/fu"
                  className={classNames(options.className,"w-full p-link flex align-items-center")}
                  style={{
                    textDecoration: "none",
                    color: "#495057",
                  }}>
                  <i className="pi pi-fw pi-print mr-2"></i>
                  Ответчик ФУ
                </NavLink>
            );
          },
        },
      ],
    },
    {
      label: "Загрузить данные",
      icon: "pi pi-fw pi-download",
      items: [
        {
          template: (item, options) => {
            return (
                <NavLink to="/upload"
                  className={classNames(options.className,"w-full p-link flex align-items-center")}
                  style={{
                    textDecoration: "none",
                    color: "#495057",
                  }}>
                  <i className="pi pi-fw pi-download mr-2"></i>
                  Загрузить данные
                </NavLink>
            );
          },
        },
      ],
    },
  ];

  return (
    <div className="card flex justify-content-center mt-2">
      <PanelMenu model={items} className="w-full md:w-25rem" />
    </div>
  );
};

export default PanelMenuCraft;
