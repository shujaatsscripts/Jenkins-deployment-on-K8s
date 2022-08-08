import axios, { baseUrl } from "../../../utils/axios";
import statusCode from "../../../utils/statusCodes";

export const sign_up_recruiter =
  ({
    firstName,
    lastName,
    email,
    password,
    userType,
    organization,
    organizationStatus,
    googleLogin,
    googleId,
    linkedinLogin,
    linkedinId,
  }) =>
  async (dispatch) => {
    return new Promise(async (resolve) => {
      try {
        const googleObj = {
          firstName,
          lastName,
          userType,
          organization,
          organizationStatus: organizationStatus ? "EXISTING" : "NEW",
          email,
          googleLogin,
          googleId,
        };

        const linkedinObj = {
          firstName,
          lastName,
          userType,
          organization,
          organizationStatus: organizationStatus ? "EXISTING" : "NEW",
          email,
          linkedinLogin,
          linkedinId,
        };

        const regularObj = {
          firstName: "",
          lastName: "",
          email,
          password,
          userType,
          organization,
          organizationStatus: organizationStatus ? "EXISTING" : "NEW",
        };

        let payload = {};
        if (googleLogin) {
          payload = googleObj;
        } else if (linkedinLogin) {
          payload = linkedinObj;
        } else {
          payload = regularObj;
        }

        const res = await axios.post(`${baseUrl}/api/register`, payload);
        console.log(res);
        if (res.status === 200) {
          resolve(statusCode.success);
        } else {
          resolve(res.data.message);
        }
      } catch (err) {
        console.log(err);
        console.log("first");
        resolve(err.response.data.message);
      }
    });
  };

export const sign_up_job_seeker =
  ({
    firstName,
    lastName,
    email,
    password,
    userType,
    googleLogin,
    googleId,
    linkedinLogin,
    linkedinId,
  }) =>
  async (dispatch) => {
    return new Promise(async (resolve) => {
      try {
        const googleObj = {
          firstName,
          lastName,
          email,
          userType,
          googleLogin,
          googleId,
        };

        const linkedinObj = {
          firstName,
          lastName,
          email,
          userType,
          linkedinLogin,
          linkedinId,
        };

        const regularObj = {
          firstName,
          lastName,
          email,
          password,
          userType,
        };

        let payload = {};
        if (googleLogin) {
          payload = googleObj;
        } else if (linkedinLogin) {
          payload = linkedinObj;
        } else {
          payload = regularObj;
        }

        const res = await axios.post(`${baseUrl}/api/register`, payload);
        if (res.status === 200) {
          resolve(statusCode.success);
        } else if (res?.status === 400) {
          resolve(res.data.message);
        } else {
          resolve("Something went wrong!");
        }
      } catch (err) {
        err.response.status === 400
          ? resolve(err.response.data.message)
          : resolve("Something went wrong!");
      }
    });
  };

export const login = (email, password) => async (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      const res = await axios.post(`${baseUrl}/api/login`, { email, password });
      if (res.status === 200) {
        console.log(res.data);
        dispatch({
          type: "auth/auth_login",
          payload: {
            token: res.data.token,
            userType: res.data.userType,
            userRole: res.data.role,
            organizationID: res.data.organizationID,
            userId: res.data.userId,
            userName: res.data.userName,
            profileURL: res.data.profileURL,
          },
        });
        resolve({
          status: statusCode.success,
          type: res.data.userType,
          step: res.data.step,
        });
      } else {
        resolve(res?.data?.message);
      }
    } catch (err) {
      console.log(err.response);
      // status 403
      resolve(err?.response?.data?.message);
    }
  });
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "auth/auth_logout" });
  return statusCode.success;
};
