import React, { useState, useEffect } from "react";
import { Row, Col, Spin, message, Steps } from "antd";
import {
  Heading,
  Caption,
  ButtonWrapper,
  PageContainer,
  TopRowWrapper,
} from "../../styles/main.styles";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import axios, { baseUrl } from "../../../utils/axios";
import { useHistory, useParams } from "react-router-dom";
import { countries, nationalities, timeZones } from "../../../utils/data";
import moment from "moment";
import styled from "styled-components";
import { StyledButton } from "../JobDetails";
import Multiselect from "multiselect-react-dropdown";
import { skills } from "../../../utils/skills";
import { MultiSelect } from "react-multi-select-component";
import CreatableSelect from "react-select/creatable";

const AddJob = () => {
  const { action } = useParams();
  const editJob = action === "edit";

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [jobUUID, setJobUUID] = useState(null);
  const [openingDate, setOpeningDate] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [joining, setJoining] = useState("");
  const [exp_salary, setExpectedSalary] = useState("");
  const [title, setTitle] = useState("");
  const [years, setYears] = useState("");
  const [tools, setTools] = useState("");
  const [qualification, setQualification] = useState("Undergrad/Bachelor");
  const [benefits, setBenefits] = useState("");
  const [level, setLevel] = useState(null);
  const [desc, setDesc] = useState("");
  const [certifications, setCertifications] = useState(null);
  const [sponsorships, setSponsorships] = useState(null);
  const [nationality, setNationality] = useState(["Prefer not to say"]);
  const [city, setCity] = useState("");
  const [citiesArray, setCitiesArray] = useState([]);
  const [location, setLocation] = useState("Spain");
  const [jobType, setJobType] = useState(null);
  const [numOfPositions, setNumOfPositions] = useState(1);
  const [duration, setDuration] = useState("");
  const [gender, setGender] = useState("Prefer not to say");
  const [timezone, setTimezone] = useState();
  const [rate, setRate] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [current, setCurrent] = useState(0);
  const [skillOptions, setSkillOptions] = useState(skills.slice(1, 30));
  /**
   * Sets Editable fields values if current page is Edit Job Page
   * If current page is edit job & no info is received in history state, redirect to /jobs
   */
  useEffect(() => {
    setLoading(true);
    if (editJob) {
      if (history?.location?.query?.data) {
        const { data } = history.location.query;
        console.log("hahawawa");
        console.log(data);
        setTitle(data.jobTitle);
        setExpectedSalary(data.salary);
        setDesc(data.detailedJobDescription);
        setLevel(data.level);
        setYears(data.experience);
        setQualification(data.qualification);
        setLocation(data.location);
        setNationality(data.nationalityPreference);
        setOpeningDate(new Date(data.openingDate).toISOString().split("T")[0]);
        // setOpeningDate(data.openingDate.replace(/\//g, "-"));
        setClosingDate(new Date(data.closingDate).toISOString().split("T")[0]);
        setJoining(new Date(data.joiningDate).toISOString().split("T")[0]);
        setCertifications(data.certification);
        setSponsorships(data.sponsorshipRequired);
        setTools(data.toolsHandlingExperience);
        setBenefits(data.benefits);
        setJobType(data.jobType);
        setNumOfPositions(data.positions);
        setCity("");
        // if city is null, set empty array, else if is array spread, else make array with current city
        setCitiesArray(
          !data.city
            ? []
            : typeof data.city === "object"
            ? [...data.city]
            : [data.city]
        );
        setGender(data.preferredGender);
        setTimezone(data.preferredTimezone);
        setRate(data.rate);
        setCurrency(data.currency);
        setDuration(data.contractDuration);
        setJobUUID(data.uuid);
      } else history.push("/jobs");
    }
    setLoading(false);
  }, []);

  const resetFields = () => {
    setTitle("");
    setLevel(null);
    setYears("");
    setQualification("Undergrad/Bachelor");
    setExpectedSalary("");
    setLocation("Spain");
    setNationality(["Prefer not to say"]);
    setOpeningDate("");
    setClosingDate("");
    setJoining("");
    setCertifications(null);
    setSponsorships(null);
    setTools("");
    setBenefits("");
    setDesc("");
    setJobType(null);
    setNumOfPositions("");
    setCity("");
    setCitiesArray([]);
    setGender("Prefer not to say");
    setTimezone("");
    setRate(null);
    setCurrency("");
  };

  const onSubmit = async (e) => {
    console.log("hi submit");
    e.preventDefault();
    console.log(current);
    if (current === 4) {
      setLoading(true);
      try {
        let payload = {
          openingDate: moment.utc(openingDate).format(),
          closingDate: moment.utc(closingDate).format(),
          joiningDate: moment.utc(joining).format(),
          salary: exp_salary,
          jobTitle: title,
          level,
          experience: years,
          toolsHandlingExperience: tools,
          qualification,
          benefits,
          detailedJobDescription: desc,
          rate,
          currency,
          positions: parseInt(numOfPositions),
          jobType,
          preferredGender: gender?.toUpperCase()?.split(" ")?.join("_"),
        };
        if (timezone) payload["preferredTimezone"] = timezone;
        if (duration) payload["contractDuration"] = duration;
        if (citiesArray?.length > 0) payload["city"] = citiesArray;
        if (certifications) payload["certification"] = certifications;
        if (sponsorships) payload["sponsorshipRequired"] = sponsorships;
        if (location) payload["location"] = location;
        if (nationality?.length > 0)
          payload["nationalityPreference"] = nationality;
        else payload["nationalityPreference"] = ["Prefer not to saye"];

        if (editJob) {
          console.log("hi submit edit");
          payload["preferredTimezone"] = timezone;
          payload["city"] = citiesArray;
          payload["certification"] = certifications;
          payload["sponsorshipRequired"] = sponsorships;
          payload["location"] = location;
          payload["nationalityPreference"] = nationality;
          if (jobType === "Contractual") payload["contractDuration"] = duration;

          await axios.put(`${baseUrl}/api/job-description/${jobUUID}`, payload);
          message.success("Success");
          history.push("/jobs");
        } else {
          console.log("hi submit add");
          const res = await axios.post(
            `${baseUrl}/api/job-description`,
            payload
          );
          resetFields();
          if (res && res.status === 200) history.push("/jobs");
        }
      } catch (err) {
        console.log("hi submit error");
        console.log(err);
      } finally {
        console.log("hi submit finally");
        setLoading(false);
      }
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  /**
   * List of all currencies that aur currently supported
   */
  const supportedCurrencies = [
    "USD",
    "PKR",
    "QR",
    "AED",
    "GBP",
    "INR",
    "EUR",
    "SAR",
  ];

  const { Step } = Steps;

  const onChange = (current) => {
    console.log(current);
    setCurrent(current);
  };

  // const skills = [
  //   "customer relationship management",
  //   "customer support chat",
  //   "cypress",
  //   "d3.js",
  //   "d3 js",
  //   "dart",
  //   "dash",
  // ];

  const onSelect = (selectedList, selectedItem = null) => {
    // alert(selectedList);
    let toolsString = "";
    selectedList.forEach((element, index) => {
      toolsString += element.value;
      if (index < selectedList.length - 1) toolsString += ",";
    });
    console.log(toolsString);
    setTools(toolsString);
  };

  const stringToOptions = (str) => {
    return str.split(",").map((elem) => {
      return { label: elem, value: elem };
    });
  };

  const arrayToOptions = (arr) => {
    return arr.map((elem) => {
      return { label: elem, value: elem };
    });
  };

  const onSearch = (skill) => {
    console.log("skill", skill);
    // try {
    //   let skills = await axios.get(`${baseUrl}/skill-search/${skill}`);
    //   setSkills(skills.data);
    // } catch (error) {
    //   console.log(error);
    // }

    let count = 0;
    let filteredSkills = [];
    for (let i = 0; i < skills.length; i += 1) {
      if (count > 24) {
        break;
      } else {
        // if (skills[i].includes(skill)) {
        if (
          skills[i].value
            .replace(" ", "")
            .toLowerCase()
            .indexOf(skill.replace(" ", "").toLowerCase()) > -1
        ) {
          filteredSkills.push(skills[i]);
          count += 1;
        }
      }
    }

    console.log("skills", filteredSkills);
    setSkillOptions(filteredSkills);
  };

  return (
    <Spin spinning={loading}>
      <Row style={{ border: "0px solid black" }} justify="center">
        <Col span={22} style={{ border: "0px solid black" }}>
          <TopRowWrapper>
            <div>
              <Heading>Job Description</Heading>
              <Caption>
                {editJob
                  ? `Edit your desired fields and click save.`
                  : `Please fill in the details below to proceed.`}
              </Caption>
            </div>
          </TopRowWrapper>
          <Row style={{ padding: "0px" }} gutter={20}>
            <Col span={8}>
              <StyledBox>
                <Steps
                  style={{ border: "0px solid black", width: "100%" }}
                  direction="vertical"
                  size="small"
                  current={current}
                  onChange={onChange}
                >
                  <Step title="Job Details" disabled={true} />
                  <Step title="Qualification & Salary" disabled={true} />
                  <Step
                    title="Job Location"
                    disabled={true}
                    // description="This is a description."
                  />
                  <Step title="Job Date" disabled={true} />
                  <Step title="Job Description" disabled={true} />
                </Steps>
              </StyledBox>
            </Col>
            <Col span={16}>
              <StyledBox style={{ paddingTop: "16px" }}>
                {current === 0 ? (
                  <form onSubmit={onSubmit}>
                    <Row gutter={[80, 0]}>
                      {/* <Col span={24} style={{ fontWeight: "bolder" }}>
                        Job Details
                      </Col> */}
                      <Col xs={24} md={12} lg={12}>
                        <Input
                          inputType="withLabel"
                          label="Job Title"
                          type="text"
                          placeholder="E.g. Finance Manager"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </Col>

                      <Col xs={24} md={12} lg={12}>
                        <Select
                          type="withLabel"
                          label="Job Type"
                          options={["Permanent", "Contractual"]}
                          value={jobType}
                          placeholder="e.g. Permanent"
                          onChange={(value) => setJobType(value)}
                          required
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Input
                          inputType="withLabel"
                          label="No. Of Positions"
                          type="number"
                          placeholder="E.g. 1"
                          min={1}
                          value={numOfPositions}
                          onChange={(e) => setNumOfPositions(e.target.value)}
                          required
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Input
                          inputType="withLabel"
                          label="Experience Upto (Years)"
                          type="number"
                          placeholder="E.g. 5"
                          min={1}
                          value={years}
                          onChange={(e) => setYears(e.target.value)}
                          required
                        />
                      </Col>

                      {/* <Col xs={24} md={12} lg={12}>
                        <Row gutter={30}>
                          <Col xs={24} md={10} lg={10}>
                            <Input
                              inputType="withLabel"
                              label="No. Of Positions"
                              type="number"
                              placeholder="E.g. 1"
                              min={1}
                              value={numOfPositions}
                              onChange={(e) =>
                                setNumOfPositions(e.target.value)
                              }
                              required
                            />
                          </Col>
                          <Col xs={24} md={14} lg={14}>
                            <Input
                              inputType="withLabel"
                              label="Experience Upto (Years)"
                              type="number"
                              placeholder="E.g. 5"
                              min={1}
                              value={years}
                              onChange={(e) => setYears(e.target.value)}
                              required
                            />
                          </Col>
                        </Row>
                      </Col> */}

                      <Col xs={24} md={12} lg={12}>
                        <Select
                          type="withLabel"
                          label="Level"
                          options={[
                            "Internship",
                            "Entry Level",
                            "Intermediate",
                            "Advanced",
                            "Expert",
                          ]}
                          value={level}
                          placeholder="E.g. Expert"
                          onChange={(value) => setLevel(value)}
                          required
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Input
                          inputType="withLabel"
                          label="Contract Duration"
                          placeholder="E.g. 6 months"
                          type="text"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          disabled={jobType?.toLowerCase() !== "contractual"}
                          required
                        />
                      </Col>

                      <Col xs={20} md={24}>
                        <div style={{ marginBottom: "6px" }}>Skills</div>
                        {skillOptions ? (
                          <CreatableSelect
                            isMulti
                            value={tools ? stringToOptions(tools) : null}
                            onChange={onSelect}
                            options={skillOptions}
                            onInputChange={onSearch}
                          />
                        ) : null}

                        {/* <Input
                          inputType="withLabel"
                          label="Skills"
                          type="string"
                          placeholder="E.g. MATLAB, VS Code"
                          value={tools}
                          onChange={(e) => setTools(e.target.value)}
                          required
                        /> */}
                        <br />
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <div style={{ textAlign: "right" }}>
                          <StyledButton htmlType="submit">
                            Save Draft
                          </StyledButton>
                        </div>
                      </Col>
                    </Row>
                  </form>
                ) : null}
                {current === 1 ? (
                  <form onSubmit={onSubmit}>
                    <Row gutter={[80, 0]}>
                      <Col xs={24} md={12} lg={12}>
                        {/* <Input
                          inputType="withLabel"
                          label="Qualification"
                          type="string"
                          placeholder="E.g. Bachelors"
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                          required
                        /> */}
                        <Styledlabel>Degree</Styledlabel>
                        <Select
                          className="Selectcolor"
                          type="withLabel"
                          dropdownStyle={{
                            minWidth: "20%",
                          }}
                          options={[
                            "Secondary Education",
                            "Higher Secondary Education",
                            "College/Diploma",
                            "Undergrad/Bachelor",
                            "Post Graduate/Masters",
                            "Doctrate/PHD",
                            "Postdoc/Specialization",
                          ]}
                          name="degree"
                          value={qualification}
                          placeholder="Title"
                          onChange={(e) => setQualification(e)}
                          required
                          style={{
                            // width: "50%",
                            borderRadius: "5px",
                            marginTop: "-5px",
                          }}
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Select
                          type="withLabel"
                          options={["Male", "Female", "Prefer not to say"]}
                          label="Gender Preference"
                          value={gender}
                          placeholder="E.g. Male"
                          onChange={(value) => setGender(value)}
                          required
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Input
                          inputType="withLabel"
                          label="Salary"
                          type="number"
                          placeholder="E.g. 1000"
                          value={exp_salary}
                          min={1}
                          onChange={(e) => setExpectedSalary(e.target.value)}
                          // required
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Select
                          type="withLabel"
                          label="Salary Rate"
                          options={[
                            "Hourly",
                            "Daily",
                            "Weekly",
                            "Monthly",
                            "Annually",
                          ]}
                          value={rate}
                          placeholder="e.g. Monthly"
                          onChange={(value) => setRate(value)}
                          required
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Select
                          type="withLabel"
                          label="Currency"
                          options={supportedCurrencies}
                          value={currency}
                          placeholder="E.g. USD"
                          onChange={(value) => setCurrency(value)}
                          required
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Input
                          inputType="withLabel"
                          label="Certifications"
                          type="text"
                          value={certifications}
                          onChange={(e) => setCertifications(e.target.value)}
                          placeholder="E.g. AWS Certified..."
                        />
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <div style={{ textAlign: "right" }}>
                          <StyledButtonCancel
                            onClick={() => {
                              setCurrent((prev) => prev - 1);
                            }}
                          >
                            Back
                          </StyledButtonCancel>
                          &nbsp;&nbsp;&nbsp;
                          <StyledButton htmlType="submit">
                            Save Draft
                          </StyledButton>
                        </div>
                      </Col>
                    </Row>
                  </form>
                ) : null}
                {current === 2 ? (
                  <form onSubmit={onSubmit}>
                    <Row gutter={[80, 0]}>
                      <Col xs={24} md={12} lg={12}>
                        <Select
                          type="withLabel"
                          options={countries}
                          placeholder="E.g: Spain"
                          label="Location"
                          value={location}
                          onChange={(value) => setLocation(value)}
                          required
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Input
                          inputType="withLabel"
                          label="City"
                          type="text"
                          placeholder="E.g. Islamabad"
                          value={city}
                          // tags={citiesArray}
                          // onRemoveTag={(tag) =>
                          //   setCitiesArray((prev) =>
                          //     prev?.filter((item) => item !== tag)
                          //   )
                          // }
                          onChange={(e) => setCity(e.target.value)}
                          // onKeyPress={(e) => {
                          //   if (e.key === "Enter") {
                          //     e.preventDefault();
                          //     setCitiesArray((prev) => [
                          //       ...prev,
                          //       e.target.value,
                          //     ]);
                          //     setCity("");
                          //   }
                          // }}
                          required
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Select
                          mode="multiple"
                          type="withLabel"
                          value={nationality}
                          options={nationalities}
                          placeholder="Prefer not to say"
                          label="Nationality"
                          onChange={(value) => {
                            setNationality(value);
                            console.log("Nationality", value);
                          }}
                          // required
                        />
                      </Col>
                      <Col xs={20} md={12} lg={12}>
                        <Select
                          type="withLabel"
                          options={timeZones}
                          label="Timezone"
                          value={timezone}
                          onChange={(value) =>
                            setTimezone(value.split(")")[0].substring(1))
                          }
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Select
                          type="withLabelBoolean"
                          label="Sponsorships"
                          value={sponsorships}
                          onChange={(value) => setSponsorships(value)}
                        />
                      </Col>
                      <Col xs={20} md={12} lg={12}>
                        <Input
                          inputType="withLabel"
                          label="Benefits"
                          type="string"
                          placeholder="E.g. Medical"
                          value={benefits}
                          onChange={(e) => setBenefits(e.target.value)}
                          // required
                        />
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <div style={{ textAlign: "right" }}>
                          <StyledButtonCancel
                            onClick={() => {
                              setCurrent((prev) => prev - 1);
                            }}
                          >
                            Back
                          </StyledButtonCancel>
                          &nbsp;&nbsp;&nbsp;
                          <StyledButton htmlType="submit">
                            Save Draft
                          </StyledButton>
                        </div>
                      </Col>
                    </Row>
                  </form>
                ) : null}
                {current === 3 ? (
                  <form onSubmit={onSubmit}>
                    <Row gutter={[80, 0]}>
                      <Col xs={24} md={12} lg={12}>
                        <Input
                          inputType="withLabel"
                          label="Position Opening Date"
                          type="date"
                          value={openingDate}
                          // onChange={(e) => setOpeningDate(e.target.value)}
                          onChange={(e) => {
                            let cDate = closingDate
                              ? new Date(closingDate)
                              : false;
                            let jDate = joining ? new Date(joining) : false;
                            let oDate = new Date(e.target.value);
                            if (
                              (oDate < cDate || !cDate) &&
                              (oDate < jDate || !jDate)
                            ) {
                              setOpeningDate(e.target.value);
                            } else {
                              alert(
                                "opening date can not be greater than closing/joining date."
                              );
                            }
                          }}
                          required
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Input
                          inputType="withLabel"
                          label="Position Closing Date"
                          type="date"
                          value={closingDate}
                          // onChange={(e) => setClosingDate(e.target.value)}
                          onChange={(e) => {
                            let oDate = openingDate
                              ? new Date(openingDate)
                              : false;
                            let jDate = joining ? new Date(joining) : false;
                            let cDate = new Date(e.target.value);
                            if (
                              (cDate > oDate || !oDate) &&
                              (cDate < jDate || !jDate)
                            ) {
                              setClosingDate(e.target.value);
                            } else {
                              if (openingDate && joining) {
                                alert(
                                  "closing date must be in between opening and joining date."
                                );
                              } else if (!openingDate && joining) {
                                alert(
                                  "closing date can not be greater than joining date."
                                );
                              } else {
                                alert(
                                  "closing date can not be smaller than opening date."
                                );
                              }
                            }
                          }}
                          required
                        />
                      </Col>
                      <Col xs={24} md={12} lg={12}>
                        <Input
                          inputType="withLabel"
                          label="Expected Joining Date"
                          type="date"
                          value={joining}
                          // onChange={(e) => setJoining(e.target.value)}
                          onChange={(e) => {
                            let oDate = openingDate
                              ? new Date(openingDate)
                              : false;
                            let cDate = closingDate
                              ? new Date(closingDate)
                              : false;
                            let jDate = new Date(e.target.value);
                            if (
                              (jDate > cDate || !cDate) &&
                              (jDate > oDate || !oDate)
                            ) {
                              setJoining(e.target.value);
                            } else {
                              alert(
                                "joining date can not be smaller than opening/closing date."
                              );
                            }
                          }}
                          required
                        />
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <div style={{ textAlign: "right" }}>
                          <StyledButtonCancel
                            onClick={() => {
                              setCurrent((prev) => prev - 1);
                            }}
                          >
                            Back
                          </StyledButtonCancel>
                          &nbsp;&nbsp;&nbsp;
                          <StyledButton htmlType="submit">
                            Save Draft
                          </StyledButton>
                        </div>
                      </Col>
                    </Row>
                  </form>
                ) : null}
                {current === 4 ? (
                  <form onSubmit={onSubmit}>
                    <Row gutter={[80, 0]}>
                      <Col xs={24} md={24} lg={24}>
                        <Input
                          inputType="textarea_withLabel"
                          label="Detailed Job Description"
                          placeholder="Description"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          required
                        />
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <div style={{ textAlign: "right" }}>
                          <StyledButtonCancel
                            onClick={() => {
                              setCurrent((prev) => prev - 1);
                            }}
                          >
                            Back
                          </StyledButtonCancel>
                          &nbsp;&nbsp;&nbsp;
                          <StyledButton htmlType="submit">
                            {editJob ? "Edit" : "Create"} Job
                          </StyledButton>
                        </div>
                      </Col>
                    </Row>
                  </form>
                ) : null}
              </StyledBox>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <PageContainer>
        <form onSubmit={onSubmit}>
          <Row gutter={36} justify="center">
             <Col xs={24} md={12} lg={12}>
                    <Input
                      inputType="withLabel"
                      label="Job Title"
                      type="text"
                      placeholder="E.g. Finance Manager"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </Col>

                  <Col xs={24} md={12} lg={12}>
                    <Select
                      type="withLabel"
                      label="Job Type"
                      options={["Permanent", "Contractual"]}
                      value={jobType}
                      placeholder="e.g. Permanent"
                      onChange={(value) => setJobType(value)}
                      required
                    />
                  </Col>
                  
            <Col xs={24} md={11} lg={10}>
              <Input
                inputType="withLabel"
                label="Contract Duration"
                placeholder="E.g. 6 months"
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                disabled={jobType?.toLowerCase() !== "contractual"}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Input
                inputType="withLabel"
                label="Number Of Positions"
                type="number"
                placeholder="E.g. 1"
                min={1}
                value={numOfPositions}
                onChange={(e) => setNumOfPositions(e.target.value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Select
                type="withLabel"
                label="Level"
                options={[
                  "Internship",
                  "Entry Level",
                  "Intermediate",
                  "Advanced",
                  "Expert",
                ]}
                value={level}
                placeholder="E.g. Experienced"
                onChange={(value) => setLevel(value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Input
                inputType="withLabel"
                label="Experience (Years)"
                type="number"
                placeholder="E.g. 5"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Input
                inputType="withLabel"
                label="Qualification"
                type="string"
                placeholder="E.g. Bachelors"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Input
                inputType="withLabel"
                label="Salary Range"
                type="number"
                placeholder="E.g. 1000"
                value={exp_salary}
                min={1}
                onChange={(e) => setExpectedSalary(e.target.value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Select
                type="withLabel"
                label="Currency"
                options={supportedCurrencies}
                value={currency}
                placeholder="E.g. USD"
                onChange={(value) => setCurrency(value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Select
                type="withLabel"
                label="Rate"
                options={["Hourly", "Daily", "Weekly", "Monthly", "Annually"]}
                value={rate}
                placeholder="e.g. Monthly"
                onChange={(value) => setRate(value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Select
                type="withLabel"
                options={countries}
                placeholder="E.g: Spain"
                label="Location"
                value={location}
                onChange={(value) => setLocation(value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Input
                inputType="withLabel"
                label="City"
                type="text"
                placeholder="E.g. Islamabad"
                value={city}
                tags={citiesArray}
                onRemoveTag={(tag) =>
                  setCitiesArray((prev) => prev?.filter((item) => item !== tag))
                }
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setCitiesArray((prev) => [...prev, e.target.value]);
                    setCity("");
                  }
                }}
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Select
                mode="multiple"
                type="withLabel"
                options={nationalities}
                placeholder="E.g. American"
                label="Nationality"
                onChange={(value) => setNationality(value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Input
                inputType="withLabel"
                label="Position Opening Date"
                type="date"
                value={openingDate}
                onChange={(e) => setOpeningDate(e.target.value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Input
                inputType="withLabel"
                label="Position Closing Date"
                type="date"
                value={closingDate}
                onChange={(e) => setClosingDate(e.target.value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Input
                inputType="withLabel"
                label="Expected Joining Date"
                type="date"
                value={joining}
                onChange={(e) => setJoining(e.target.value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Select
                type="withLabel"
                options={["Male", "Female", "Prefer not to say"]}
                label="Gender Preference"
                value={gender}
                placeholder="E.g. Male"
                onChange={(value) => setGender(value)}
                required
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Input
                inputType="withLabel"
                label="Certifications"
                type="text"
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
                placeholder="E.g. AWS Certified..."
              />
            </Col>

            <Col xs={24} md={11} lg={10}>
              <Select
                type="withLabelBoolean"
                label="Sponsorships Required"
                value={sponsorships}
                onChange={(value) => setSponsorships(value)}
              />
            </Col>

            <Col xs={20} md={11} lg={10}>
              <Select
                type="withLabel"
                options={timeZones}
                label="Timezone"
                value={timezone}
                onChange={(value) =>
                  setTimezone(value.split(")")[0].substring(1))
                }
              />
            </Col>

            <Col xs={20} md={11} lg={10}>
              <Input
                inputType="withLabel"
                label="Skills"
                type="string"
                placeholder="E.g. MATLAB, VS Code"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                required
              />
            </Col>

            <Col xs={20} md={11} lg={10}>
              <Input
                inputType="withLabel"
                label="Benefits"
                type="string"
                placeholder="E.g. Medical"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                required
              />
            </Col>

            <Col xs={24} md={22} lg={20}>
              <Input
                inputType="textarea_withLabel"
                label="Detailed Job Description"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </Col>

            <Col xs={20}>
              <ButtonWrapper>
                <Button
                  btnType="basic_gradient"
                  text={editJob ? "Save Changes" : "Create Job"}
                  htmlType="submit"
                  disabled={loading}
                />
              </ButtonWrapper>
            </Col>
          </Row>
        </form>
      </PageContainer> */}
    </Spin>
  );
};

export default AddJob;

const StyledBox = styled.div`
  padding: 30px 30px 30px 30px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  border-radius: 15px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  align-items: center;
  height: 100%;
`;

const StyledButtonCancel = styled.button`
  /* border: none; */
  padding: 0 17px 0 17px;
  /* width: 7%; */
  border: 1px solid #1a77f2;
  background-color: white;
  height: 35px;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: bolder;
  color: #1a77f2;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
    /* border-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    background-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    color: ${(props) => (props.selected ? "white" : "grey")}; */
  }
`;

const Styledlabel = styled.div`
  font-family: "Montserrat-Regular";
  /* margin-top: auto; */
  /* margin-bottom: -5px; */
  font-size: 14px;
  margin-top: 15px;
  //   width: 25%;
`;

{
  /* <Multiselect
                            // filterOption={createFilter({ ignoreAccents: false })}
                            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                            // displayValue="name" // Property name to display in the dropdown options
                            // ===> old multi select
                            isObject={false}
                            options={skillOptions} // Options to display in the dropdown
                            onSelect={onSelect} // Function will trigger on select event
                            onRemove={onSelect} // Function will trigger on remove event
                            onSearch={onSearch}

                            // ===> new multi select
                            // hasSelectAll={false}
                            // onSearch={onSearch}
                            // options={options}
                            // value={selected}
                            // onChange={(a) =>
                            //   setSelected((prev) => {
                            //     console.log([...prev, ...a]);
                            //     return [...prev, ...a];
                            //   })
                            // }
                            // labelledBy="Select"
                          /> */
}
