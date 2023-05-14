import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../../assets/logo.png";
import gaming from "../../assets/gaming.jpg";

export default function ResetPassword({ saveUserDate }) {
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().required("email is requried").email("invalid email"),
    newPassword: Yup.string()
      .required("password is requried")
      .matches(
        /^[A-Z][a-z0-9]{0,5}/,
        "password must start with capital letter"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetUserPassword,
  });

  async function resetUserPassword(values) {
    setLoading(true);
    let { data } = await axios
      .put(
        "https://route-ecommerce-app.vercel.app/api/v1/auth/resetPassword",
        values
      )
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    if (data) {
      if (data.token !== null) {
        localStorage.setItem("userToken", data.token);
        saveUserDate();
        setLoading(false);
        navigate("/login");
      }
    }
  }
  return (
    <>
      <section className="game_form py-5">
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
                    <div className="form-group">
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="form-control"
                        placeholder="New Password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.newPassword &&
                      formik.touched.newPassword ? (
                        <span className="d-block err">
                          {formik.errors.newPassword}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <button type="submit" className="btn text-white">
                      {loading ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "Reset Password"
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
