import React, { useState, useEffect, useRef } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { classNames } from 'primereact/utils';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { MultiStateCheckbox } from 'primereact/multistatecheckbox';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import changeDateType from './../../../function-helpers/changeDateType.js'

const DialogCraftFurniture = (props) => {
  let { data, columns, values, requestData, addData, updateData } = props;
  const [ItemDialog, setItemDialog] = useState(false);
  const toast = useRef(null);
  let emptyItem, location, type, serviceable, workplace_type
  emptyItem = {}
  
  if (values) {
    // emptyItem = columns.map(obj => obj.field)
    location = values.map(obj => obj.location).filter(obj => obj !== null)
    type = values.map(obj => obj.type).filter(obj => obj !== null)
    serviceable = values.map(obj => obj.serviceable).filter(obj => obj !== null)
    workplace_type = values.map(obj => obj.workplace_type).filter(obj => obj !== null)
  }

  columns.map((obj) => {
    let dataType;
    switch (obj.dataType) {
      case "text":
        dataType = null;
        break;
      case "date":
        dataType = null;
        break;
      case "boolean":
        dataType = null;
        break;
      case "numeric":
        dataType = 0;
        break;
      default:
        break;
    }
    emptyItem[obj.field] = dataType;
  });
  const [item, setItem] = useState(emptyItem);

  const hideNew = () => {
    setItemDialog(false);
  };

  const saveItem = () => {
    if (item.name.trim()) {
      let _item = { ...item };

      Object.keys(_item).forEach(element => {
        if (element.includes("date")) {
          if (_item[element] !== null) {
            _item[element] = formatDate(_item[element])
            _item[element] = changeDateType(_item[element])
          }
        }
      })

      if (_item.id) {
        updateData(_item, _item.id);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Item Updated",
          life: 3000,
        });
      } else {
        _item.id = createId();
        addData(_item);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "New Item Created",
          life: 3000,
        });
      }
      setItemDialog(false);
      setItem(emptyItem);
    }
  };

  const createId = () => {
    return data.length + 1
  };

  useEffect(() => {
    requestData();
  }, []);

  const getDropdownOptions = (col) => {
    switch (col) {
      case "serviceable":
        serviceable.push("");
        return serviceable

      case "location":
        location.push("");
        return location

      case "type":
        type.push("");
        return type

      case "workplace_type":
        workplace_type.push("");
        return workplace_type

      default:
        type.push("");
        return type
    }
  };

  const formatDate = (date) => {
    date ?
    date = new Date(date).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Moscow",
    }) :  date = null
    return date
  }

  const multiStateCheckboxOptions = [
    { value: "true", icon: "pi pi-check" },
    { value: "false", icon: "pi pi-times" },
    { value: "null", icon: "pi pi-question" },
  ];

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _item = { ...item };

    _item[`${name}`] = val;

    setItem(_item);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _item = { ...item };

    _item[`${name}`] = val;

    setItem(_item);
  };

  const itemDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideNew} />
      <Button label="Save" icon="pi pi-check" onClick={saveItem} />
    </React.Fragment>
  );

  return (
    <Dialog
      visible={ItemDialog}
      style={{ width: "48rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Описание предмета"
      modal
      className="p-fluid"
      footer={itemDialogFooter}
      onHide={hideNew}
    >
      {/* {item.image && (
          <img
            src={`https://primefaces.org/cdn/primereact/images/item/${item.image}`}
            alt={item.image}
            className="product-image block m-auto pb-3"
          />
        )} */}
      <div className="field">
        <label htmlFor="name" className="font-bold">
          Наименование
        </label>
        <InputText
          id="name"
          value={item.name || ""}
          onChange={(e) => onInputChange(e, "name")}
          required
          autoFocus
          // className={classNames({ "p-invalid": submitted && !item.name })}
        />
        {/* {submitted && !item.name && (
            <small className="p-error">Name is required.</small>
          )} */}
      </div>
      <div className="field">
        <div className="grid">
          <div className="field col-6 mb-0">
            <label htmlFor="inventary_number" className="font-bold">
              Инвентарный номер
            </label>
            <InputText
              id="inventary_number"
              value={item.inventary_number || ""}
              onChange={(e) => onInputChange(e, "inventary_number")}
              required
              autoFocus
            />
          </div>
          <div className="field col-6 mb-0">
            <label htmlFor="qr_code" className="font-bold">
              QRCODE
            </label>
            <InputText
              id="qr_code"
              value={item.qr_code || ""}
              onChange={(e) => onInputChange(e, "qr_code")}
              required
              autoFocus
            />
          </div>
        </div>
      </div>
      <div className="field">
        <div className="grid">
          <div className="field col-6 mb-0">
            <label htmlFor="type" className="font-bold">
              Тип
            </label>
            <Dropdown
              id="type"
              value={item.type || ""}
              options={getDropdownOptions("type")}
              onChange={(e) => onInputChange(e, "type")}
              placeholder={item.type || ""}
              itemTemplate={(option) => {
                return option; //<Tag value={option} severity={getSeverity(option)}></Tag>
              }}
            />
          </div>
          <div className="field col-6 mb-0">
            <label htmlFor="location" className="font-bold">
              Где установлено
            </label>
            <Dropdown
              id="location"
              value={item.location || ""}
              options={getDropdownOptions("location")}
              onChange={(e) => onInputChange(e, "location")}
              placeholder={item.location || ""}
              itemTemplate={(option) => {
                return option; //<Tag value={option} severity={getSeverity(option)}></Tag>
              }}
            />
          </div>
        </div>
      </div>
      <div className="field">
        <div className="grid">
          <div className="field col-6 mb-0">
            <label htmlFor="serviceable" className="font-bold">
              Состояние исправности
            </label>
            <Dropdown
              id="serviceable"
              value={item.serviceable || ""}
              options={getDropdownOptions("serviceable")}
              onChange={(e) => onInputChange(e, "serviceable")}
              placeholder={item.serviceable || ""}
              itemTemplate={(option) => {
                return option; //<Tag value={option} severity={getSeverity(option)}></Tag>
              }}
            />
          </div>
          <div className="field col-6 mb-0">
            <label htmlFor="price" className="font-bold">
              Стоимость
            </label>
            <InputNumber
              id="purchase_price"
              value={item.purchase_price || 0}
              onChange={(e) => onInputNumberChange(e, "purchase_price")}
              mode="currency"
              currency="RUB"
              locale="ru-RU"
            />
          </div>
        </div>
      </div>
      <div className="field">
        <div className="grid">
          <div className="field col-6 mb-0">
            <label htmlFor="purchase_date" className="font-bold">
              Дата приобретения
            </label>
            <Calendar
              id="purchase_date"
              value={item.purchase_date || null}
              onChange={(e) => onInputChange(e, "purchase_date")}
              dateFormat="dd.mm.yy"
              placeholder={formatDate(item.purchase_date || null)}
              mask="99.99.9999"
            />
          </div>
          <div className="field col-6 mb-0">
            <label htmlFor="release_date" className="font-bold">
              Дата выпуска
            </label>
            <Calendar
              id="release_date"
              value={item.release_date || null}
              onChange={(e) => onInputChange(e, "release_date")}
              dateFormat="dd.mm.yy"
              placeholder={formatDate(item.release_date || null)}
              mask="99.99.9999"
            />
          </div>
        </div>
      </div>
      <div className="field">
        <div className="grid">
          <div className="field col-6 mb-0">
            <MultiStateCheckbox
              inputid="is_workplace"
              value={
                item.is_workplace != undefined
                  ? item.is_workplace.toString()
                  : null
              }
              onChange={(e) => onInputChange(e, "is_workplace")}
              options={multiStateCheckboxOptions}
              optionValue="value"
            />
            <span htmlFor="is_workplace" className="font-bold ml-2">
              Рабочее место
            </span>
          </div>
          <div className="field col-6 mb-0">
            <MultiStateCheckbox
              inputid="was_deleted"
              value={
                item.was_deleted != undefined
                  ? item.was_deleted.toString()
                  : null
              }
              onChange={(e) => onInputChange(e, "was_deleted")}
              options={multiStateCheckboxOptions}
              optionValue="value"
            />
            <span htmlFor="was_deleted" className="font-bold ml-2">
              Удалено
            </span>
          </div>
        </div>
      </div>
      <div className="field">
        <label htmlFor="note" className="font-bold">
          Описание
        </label>
        <InputTextarea
          id="note"
          value={item.note || ""}
          onChange={(e) => onInputChange(e, "note")}
          required
          rows={3}
          cols={20}
        />
      </div>
    </Dialog>
  );
};

export default DialogCraftFurniture;
