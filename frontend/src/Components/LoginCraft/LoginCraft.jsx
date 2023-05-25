import React, { useState, useRef } from 'react'
import { Navigate } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { classNames } from 'primereact/utils';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from 'primereact/message'

const LoginSchema = Yup.object().shape({
  login: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    password: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const LoginInput = ({ field, form, form: { touched, errors }, ...props }) => {
  const { setPasswordMt} = props
  return (
    <div
      className={"mb-2"}
      onInput={() => {
        if ((errors.login) || (errors.login && errors.password) || !touched.login) {
          setPasswordMt("mt-2");
        }
        if ((!errors.login && !errors.password && touched.login && touched.password)) {
          setPasswordMt("mt-4");
        }
      }}
      onBlur={() => {
        if ((errors.login) || (errors.login && errors.password) || !touched.login) {
          setPasswordMt("mt-2");
        }
        if ((!errors.login && !errors.password && touched.login && touched.password)) {
          setPasswordMt("mt-4");
        }
      }}
    >
      <span className="p-input-icon-right p-float-label">
        <InputText
          id="login"
          {...field}
          type="text"
          className={
            touched[field.name] && errors[field.name] && "p-invalid" // || (meta.warning && ""))
          }
          aria-describedby="login-help"
        />
        {!touched[field.name] && <i className="pi pi-user" />}
        {touched[field.name] &&
          ((errors[field.name] && (
            <i className="pi pi-exclamation-circle" style={{ color: "red" }} />
          )) || <i className="pi pi-user" />)}
        <label htmlFor="login">Login</label>
      </span>
      <div className="mt-1">
        {touched[field.name] && errors[field.name] && (
          <div className="text-right">
            <small id="login-help" style={{ color: "red" }}>
              {errors[field.name]}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

const PasswordInput = ({ field, form, form: { touched, errors }, ...props }) => {
  const {passwordMt, setPasswordMt} = props
  // const [passwordMt, setPasswordMt] = useState("mt-2");
  return (
    <div className={classNames(passwordMt, "mb-2")}>
      <span
        className="p-input-icon-right p-float-label"
        onBlur={() => {
          if (errors.login || (errors.login && errors.password) || (!touched.login && errors.password)) {
            setPasswordMt("mt-2");
          }
        }}
      >
        <Password
          id="password"
          {...field}
          type="text"
          onFocus={() => {
            if (!errors.login || !touched.login) {
              setPasswordMt("mt-4");
            }
          }}
          className={
            touched[field.name] && errors[field.name] && "p-invalid" // || (meta.warning && ""))
          }
          aria-describedby="password-help"
          toggleMask
        />
        <label htmlFor="password">Password</label>
      </span>
      <div className="mt-1 text-right">
        {touched[field.name] && errors[field.name] && (
          <small id="password-help" style={{ color: "red" }}>
            {errors[field.name]}
          </small>
        )}
      </div>
    </div>
  );
};

const LoginCraft = (props) => {
  const [passwordMt, setPasswordMt] = useState("mt-2");
  const messageRef = useRef(null)
  const { login, isAuth, message } = props;

  const submit = (values) => {
    login(values.login, values.password);
  };

  if (isAuth) return <Navigate to={"/corr/app"} />

  return (
    <div className="h-screen flex align-items-center justify-content-center">
      <div ref={messageRef} className="flex flex-column">
        <Formik
          initialValues={{
            login: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={submit}
        >
          <Form>
            <Field
              name="login"
              component={LoginInput}
              message={message}
              passwordMt={passwordMt}
              setPasswordMt={setPasswordMt}
            />
            <Field
              name="password"
              component={PasswordInput}
              message={message}
              passwordMt={passwordMt}
              setPasswordMt={setPasswordMt}
            />
            <div className="mb-2">
              {message && <Message style={{width: messageRef.current.offsetWidth}} severity="error" text={message} /> }
            </div>
             <div className='justify-content-center'>
              <Button type="submit" className='w-full justify-content-center' onClick={submit}>Login</Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginCraft;