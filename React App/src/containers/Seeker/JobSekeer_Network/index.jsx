import React, { useState, useEffect } from "react";
import SearchBox from "./Search";
import TableData from "./Table";
import Mytable from "./Mytable";
import ProfileDetail from "./ProfileDetail";
import { Row, Col } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import axios, { baseUrl } from "../../../utils/axios";
import SearchBar from "../../searchBar";
import { Tabs } from "antd";

const { TabPane } = Tabs;
let searchData = [];
const Network = () => {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [seeker, setSeeker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const apiCall = async () => {
      let seekerId = null;
      if (typeof location.state !== "undefined") {
        console.log(location.state);
        seekerId = location.state.id;
        history.replace({
          pathname: "/jobseeker_Network",
          state: { id: null },
        });
      }
      setLoading(true);
      const events = await axios.get(
        `${baseUrl}/api/personalInfo/getAllSeekers`
      );
      console.log(events.data);
      searchData = events.data;
      setData(events.data);
      if (events?.data.length > 0) {
        if (seekerId !== null) {
          let seeker = events.data.find((item) => item.uuid == seekerId);
          console.log("seeker", seeker);
          setSeeker(seeker);
        } else setSeeker(events.data[0]);
      }
      setLoading(false);
    };
    apiCall();
  }, []);

  useEffect(() => {
    if (searchInput === "") {
      setData(searchData);
    }
  }, [searchInput]);

  const handleSeedInput = () => {
    let filteredSuggestions = searchData.filter(
      (d) =>
        JSON.stringify(d)
          .replace(" ", "")
          .toLowerCase()
          .indexOf(searchInput.replace(" ", "").toLowerCase()) > -1
    );
    setData(filteredSuggestions);
  };

  return (
    <div style={{ padding: "10px 40px" }}>
      <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
        <Col span={16}>
          {/* <SearchBox /> */}
          <SearchBar
            handleSeedInput={handleSeedInput}
            setDataSource={setData}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          {/* <TableData /> */}
          <Tabs defaultActiveKey="1">
            <TabPane tab="All" key="1">
              <Mytable data={data} setSeeker={setSeeker} />
            </TabPane>

            <TabPane tab="Following" key="2">
              <Mytable
                data={data.filter((item) => item.following_status === "1")}
                setSeeker={setSeeker}
              />
            </TabPane>
            <TabPane tab="Followers" key="3">
              <Mytable
                data={data.filter((item) => item.follower_status === "1")}
                setSeeker={setSeeker}
              />
            </TabPane>
          </Tabs>
        </Col>
        <Col span={8}>
          <ProfileDetail seeker={seeker} />
        </Col>
      </Row>
    </div>
  );
};

export default Network;
