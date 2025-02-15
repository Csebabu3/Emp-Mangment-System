import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../Redux/Actions/loginaction";
import "bootstrap/dist/css/bootstrap.min.css";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "*Required";
  } else if (values.username.length > 12) {
    errors.username = "*Must be 12 characters or less";
  }
  if (!values.password) {
    errors.password = "*Required";
  } else if (values.password.length > 8) {
    errors.password = "*Maximum 8 characters";
  } else if (values.password.length < 4) {
    errors.password = "*Minimum 4 characters";
  }
  return errors;
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(loginRequest(values));
    },
  });

  // Reset form on successful login
  useEffect(() => {
    if (isAuthenticated) {
      formik.resetForm();
    }
  }, [isAuthenticated]); // Runs when `isAuthenticated` changes

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg w-50">
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Username..."
              name="username"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-danger">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password..."
              name="password"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
