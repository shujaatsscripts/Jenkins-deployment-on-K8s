import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import NotFound from '../404';
import Candidates from "../Candidates/ListCandidates";
import JobBank from "../Jobs/JobBank";
import RecruiterDashboard from "../Dashboard";
import EmailVerification from "../EmailVerification";
import ForgotPassword from "../ForgotPassword";
import GettingStarted from "../GettingStarted";
import AddJob from "../Jobs/AddJob";
import Shortlisted from "../Shortlisted";
import ChatBox from "../ChatBox";
import PersonalInfo from "../Information/PersonalInfo";

import AddResume from "../Jobs/AddResume";
import DisplayJobs from "../Jobs/DisplayJobs";
import ScreenedResult from "../Candidates/ScreenedResult";
import JobSeekerDashboard from "../JobSeekerDashboard";
import JobSeekerJobs from "../Seeker/Jobs";
import Network from "../Seeker/JobSekeer_Network";
// import Login from '../Login';
import NewLogin from "../NewLogin";
import JobSeekerSignUp from "../SignUp/JobSeeker";
import RecruiterSignUp from "../SignUp/Recruiter";
import Reschedule from "../Reschedule";
import Layout from "./Layout";
import VideoCall from "../VideoCall";
import ScanningProgress from "../ScanningProgress";
import ApplyJob from "../Jobs/Apply";
import TermsAndCondition from "../TermsAndConditions";
import Schedule from "../Schedule";
import JobDetails from "../Jobs/JobDetails";

const Navigation = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={NewLogin} />
        <Route exact path="/login" component={NewLogin} />
        <Route exact path="/sign_up_job_seeker" component={JobSeekerSignUp} />
        <Route exact path="/sign_up_recruiter" component={RecruiterSignUp} />
        <Route exact path="/forgot_password" component={ForgotPassword} />
        <Route exact path="/verify_email" component={EmailVerification} />
        <Route path="/reschedule_interview" component={Reschedule} />
        <Route path="/call" component={VideoCall} />
        <Route path="/terms" component={TermsAndCondition} />

        {/* Protected Routes With Navbar*/}
        <Layout>
          <Route exact path="/jobs" component={DisplayJobs} />
          <Route exact path="/jobs/details" component={JobDetails} />
          <Route exact path="/job/:action" component={AddJob} />
          <Route exact path="/screened_result" component={ScreenedResult} />
          <Route exact path="/add_resume" component={AddResume} />
          <Route exact path="/dashboard" component={JobSeekerDashboard} />
          <Route exact path="/jobseeker_jobs" component={JobSeekerJobs} />
          <Route exact path="/jobseeker_Network" component={Network} />
          <Route exact path="/personal_information" component={PersonalInfo} />
          <Route exact path="/shortlisted" component={Shortlisted} />
          <Route exact path="/chatbox" component={ChatBox} />
          <Route
            exact
            path="/recruiter_dashboard"
            component={RecruiterDashboard}
          />
          <Route exact path="/candidates" component={Candidates} />
          <Route exact path="/jobbank" component={JobBank} />
          <Route exact path="/schedules" component={Schedule} />
          <Route exact path="/create_profile" component={GettingStarted} />
          <Route exact path="/scanning_progress" component={ScanningProgress} />
          <Route exact path="/jobs/apply/:id" component={ApplyJob} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Navigation;
