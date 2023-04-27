import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import logo from "../../assets/logo.png";
import gaming from "../../assets/gaming.jpg";

export default function Register() {
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is requried")
      .min(3, "minimum characters allowed is 3")
      .max(10, "minimum characters allowed is 10"),
    email: Yup.string().required("email is requried").email("invalid email"),
    password: Yup.string()
      .required("password is requried")
      .matches(
        /^[A-Z][a-z0-9]{0,5}/,
        "password must start with capital letter"
      ),
    rePassword: Yup.string()
      .required("confirming password is requried")
      .oneOf([Yup.ref("password")], "password doesn't match"),
    phone: Yup.string()
      .required("phone is requried")
      .matches(/^(02)?(01)[0125][0-9]{8}$/, "invalid phone number"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerUser,
  });

  async function registerUser(values) {
    setLoading(true);
    let data = await axios
      .post("https://route-ecommerce-app.vercel.app/api/v1/auth/signup", values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    if (data) {
      if (data.data.message === "success") {
        setLoading(false);
        navigate("/Login");
      }
    }
  }
  return (
    <section className="register game_form py-5 text-center">
      <div className="container">
        <div className="form-wrapper">
          <div className="row">
            <div className="col-md-6 pe-md-0">
              <div className="image">
                <img src={gaming} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6 ps-md-0">
              <div className="form">
                <span className="logo">
                  <img src={logo} alt="" className="img-fluid" />
                </span>
                <h2 className="title">Create My Account!</h2>
                <form onSubmit={formik.handleSubmit}>
                  {apiError ? (
                    <div className="alert alert-danger w-100 p-2">
                      {apiError}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.name && formik.touched.name ? (
                      <span className="d-block err">{formik.errors.name}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <span className="d-block err">{formik.errors.email}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <span className="d-block err">
                        {formik.errors.password}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="rePassword"
                      id="rePassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={formik.values.rePassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.rePassword && formik.touched.rePassword ? (
                      <span className="d-block err">
                        {formik.errors.rePassword}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="form-control"
                      placeholder="Phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.phone && formik.touched.phone ? (
                      <span className="d-block err">{formik.errors.phone}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <button type="submit" className="btn text-white">
                    {loading ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      "Join Free"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
