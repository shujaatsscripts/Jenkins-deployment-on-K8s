import React, { useEffect, useState } from "react";
import { Col, message, Modal } from "antd";
import { ContentContainer, StyledAlert } from "./styles/main.styles.js";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import SeekerNavbar from "./SeekerNav";
import Loading from "../../../components/Loading";
import Button from "../../../components/Button";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import axios, { baseUrl } from "../../../utils/axios";

const urlsWithoutNavbar = ["/create_profile", "/terms"];

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = history.location;

  const [errorMsg, setErrorMsg] = useState(null);
  const [completelyBlock, setCompletelyBlock] = useState(false);

  const { isLoggedIn, userType, userRole } = useSelector((state) => state.auth);
  const { data: blockUserData } = useSelector((state) => state.blockUser);
  const token = localStorage.getItem("bcix_auth");

  const makePayment = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/stripe/create-checkout-session`
      );
      window.location.href = res.data.url;
      // console.log(res);
    } catch (err) {
      message.error("Error making payment");
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchExpiryStatus = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/organization/quota`);
        console.log(res);
        const { quota } = res?.data;

        if (quota?.freeze) {
          setErrorMsg(
            "Your account has been blocked. Please contact support@3cix.com"
          );
          setCompletelyBlock(true);
        } else if (quota?.trialExpired) {
          setErrorMsg(
            "Your free trial has expired. Please contact support@3cix.com"
          );
          setCompletelyBlock(true);
        } else if (quota?.paymentRequired || quota?.planExpired) {
          setErrorMsg(
            `You need to purchase a plan in-order to continue using 3cix. Please contact support@3cix.com to change your plan settings.
          ${
            userRole === "ADMIN"
              ? "To make a payment, click the button below."
              : "Please contact your admin to make a payment."
          }`
          );
          setCompletelyBlock(true);
        } else if (quota?.jobsLimitExpired) {
          setErrorMsg(
            "The number of allowed Job postings on this plan have been exhausted. Please contact support@3cix.com."
          );
          // Set global state in-order to restrict user from performing job related actions
          dispatch({ type: "jobsExpired/setExpired", payload: true });
        } else if (quota?.userLimitExpired)
          setErrorMsg(
            "The number of allowed Users on this plan have been exhausted. Please contact support@3cix.com."
          );
        else setErrorMsg(null);
        dispatch({ type: "blockUser/setData", payload: res?.data?.quota });
      } catch (error) {
        console.log(error);
      }
    };

    if (!blockUserData && userRole !== "JOB_SEEKER") fetchExpiryStatus();
  }, [blockUserData]);

  useEffect(() => {
    if (!isLoggedIn || jwt_decode(token).exp < Date.now() / 1000) {
      // apply job from external link
      if (pathname.includes("/jobs/apply/")) {
        localStorage.removeItem("bcix_auth");
        localStorage.removeItem("bcix_userType");
        localStorage.setItem("applied_job", pathname.split("/")[3]);

        // to send source key in payload of add applicant call
        localStorage.setItem("source", "true");

        history.push("/sign_up_job_seeker");
      }
      // regular flow
      else {
        localStorage.removeItem("bcix_auth");
        localStorage.removeItem("bcix_userType");
        history.push("/login");
      }
    }
  }, [isLoggedIn, history, token]);

  return isLoggedIn ? (
    urlsWithoutNavbar.includes(pathname) ? (
      children
    ) : (
      <>
        {userType === "RECRUITER" && <Navbar history={history} />}
        {userType === "JOB_SEEKER" && <SeekerNavbar history={history} />}
        {/* <SeekerNavbar
          // style={{ position: "fixed", width: "100%" }}
          history={history}
        /> */}
        <ContentContainer style={{ marginTop: "0px" }}>
          {blockUserData && errorMsg && completelyBlock ? (
            <Modal visible={true} footer={null} closable={false}>
              <h5
                style={{
                  fontFamily: "Montserrat-Regular",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Payment Expired
              </h5>
              <hr />
              <center>{errorMsg}</center>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {blockUserData.paymentRequired && userRole === "ADMIN" && (
                  <span style={{ marginRight: "1rem" }}>
                    <center>
                      <br />
                      <Button
                        btnType="auth"
                        text="Make Payment"
                        width="130px"
                        onClick={makePayment}
                      />
                    </center>
                  </span>
                )}
                <center>
                  <br />
                  <Button
                    btnType="auth"
                    text="Log Out"
                    width="130px"
                    onClick={() => dispatch({ type: "auth/auth_logout" })}
                  />
                </center>
              </div>
            </Modal>
          ) : (
            errorMsg && <StyledAlert message={errorMsg} type="error" />
          )}
          <Col xs={24}>{children}</Col>
        </ContentContainer>
      </>
    )
  ) : (
    <Loading />
  );
};

export default Layout;
