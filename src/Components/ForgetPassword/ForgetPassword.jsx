import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import logo from "../../assets/logo.png";
import gaming from "../../assets/gaming.jpg";

export default function ForgetPassword() {
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().required("email is requried").email("invalid email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPassword,
  });

  async function forgetPassword(values) {
    setLoading(true);
    let data = await axios
      .post(
        "https://route-ecommerce-app.vercel.app/api/v1/auth/forgotPasswords",
        values
      )
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    if (data) {
      if (data.data.statusMsg === "success") {
        setSuccessMessage(data.data.message);
        setLoading(false);
        navigate("/verifyRestCode");
      }
    }
  }
  return (
    <>
      <section className="forgetpassword game_form py-5">
        <div className="container">
          <div className="form-wrapper">
            <div className="row">
              <div className="col-md-6 pe-md-0">
                <div className="image">
                  <img src={gaming} alt="" className="img-fluid" />
                </div>
              </div>
              <div className="col-md-6 ps-md-0">
                <div className="form text-center">
                  <span className="logo mb-2">
                    <img src={logo} alt="" className="img-fluid" />
                  </span>
                  <form onSubmit={formik.handleSubmit}>
                    {apiError ? (
                      <div className="alert alert-danger w-100 p-2">
                        {apiError}
                      </div>
                    ) : (
                      ""
                    )}
                    {successMessage ? (
                      <div className="alert alert-success">
                        {successMessage}
                      </div>
                    ) : (
                      ""
                    )}
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
                        <span className="d-block err">
                          {formik.errors.email}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <button type="submit" className="btn text-white">
                      {loading ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "Send Code"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
