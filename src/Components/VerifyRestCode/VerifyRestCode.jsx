import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../../assets/logo.png";
import gaming from "../../assets/gaming.jpg";

export default function VerifyresetCode() {
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    resetCode: Yup.string().required("code is requried"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: resetCode,
  });

  async function resetCode(values) {
    setLoading(true);
    let { data } = await axios
      .post(
        "https://route-ecommerce-app.vercel.app/api/v1/auth/verifyResetCode",
        values
      )
      .catch((err) => {
        setApiError(err.response.data.message);
        setLoading(false);
      });
    if (data) {
      if (data.status === "Success") {
        setLoading(false);
        navigate("/resetPassword");
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
                        type="text"
                        name="resetCode"
                        id="resetCode"
                        className="form-control"
                        placeholder="Code"
                        value={formik.values.resetCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.resetCode && formik.touched.resetCode ? (
                        <span className="d-block err">
                          {formik.errors.resetCode}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <button type="submit" className="btn text-white">
                      {loading ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "Verify Code"
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
