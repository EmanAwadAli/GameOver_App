import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import logo from "../../assets/logo.png";
import gaming from "../../assets/gaming.jpg";

export default function Login({ saveUserDate }) {
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().required("email is requried").email("invalid email"),
    password: Yup.string()
      .required("password is requried")
      .matches(
        /^[A-Z][a-z0-9]{0,5}/,
        "password must start with capital letter"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginUser,
  });

  async function loginUser(values) {
    setLoading(true);
    let data = await axios
      .post("https://route-ecommerce-app.vercel.app/api/v1/auth/signin", values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    if (data) {
      if (data.data.message === "success") {
        localStorage.setItem("userToken", data.data.token);
        saveUserDate();
        setLoading(false);
        navigate("/");
      }
    }
  }
  return (
    <>
      <section className="login game_form py-5">
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
                  <span className="logo">
                    <img src={logo} alt="" className="img-fluid" />
                  </span>
                  <h2 className="title">Log in to GameOver</h2>
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
                    <button type="submit" className="btn text-white">
                      {loading ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </form>
                  <p className="join">
                    <span>
                      You don't have account yet ?{" "}
                      <Link to="/register">Join Free Now</Link>
                    </span>
                    <span>
                      <Link to="/forgetpassword">Forget password</Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
