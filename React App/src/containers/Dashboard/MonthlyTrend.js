import React, { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  Legend,
  Line,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { SectionHeading, MainContainer } from "./styles/main.styles";
// import Loading from '../../components/Loading';
import axios, { baseUrl } from "../../utils/axios";
import { Progress } from "antd";

const MonthlyTrend = () => {
  const [trends, setTrends] = useState(null);
  let data = [
    { name: "Glassdoor", percent: 30 },
    { name: "Indeed", percent: 47 },
    { name: "LinkedIn", percent: 83 },
    { name: "Gmail", percent: 65 },
    { name: "Rozee", percent: 92 },
  ];
  const barColors = ["#28B446", "#006EFF", "#02A0FC", "#FF3A29", "#FBBB00"];

  useEffect(() => {
    setTrends(data);
    // const fetchTrends = async () => {
    //   const res = await axios.get(
    //     `${baseUrl}//api/job-description/jobs/hiring/organization/trend`
    //   );
    //   setTrends(res.data.data);
    // };
    // fetchTrends();
  }, []);

  return !trends ? (
    // <Loading />
    <></>
  ) : (
    <MainContainer>
      <SectionHeading style={{ marginBottom: "30px" }} bg="#990000" mb="1rem">
        By Source
      </SectionHeading>

      {trends.map((item, index) => (
        <div style={{ marginBottom: "20px" }}>
          <span
            style={{
              fontWeight: "bolder",
              fontSize: "13px",
              fontFamily: "Montserrat",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {item.name}
            <span
              style={{
                float: "right",
                color: `${barColors[index % barColors.length]}`,
              }}
            >
              {item.percent}
            </span>
          </span>
          <Progress
            percent={item.percent}
            strokeColor={barColors[index % barColors.length]}
            showInfo={false}
          />
        </div>
      ))}
      {/* <ResponsiveContainer width="100%" height={350}>
        <LineChart data={trends}>
          <CartesianGrid strokeDasharray="3 3" opacity="0.3" />

          <defs>
            <linearGradient id="colorUv" x1="0" y1="1" x2="1" y2="0">
              <stop offset="10%" stopColor="#fdb67b" stopOpacity={1} />
              <stop offset="90%" stopColor="#ee4157" stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" opacity="0.3" />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#colorUv)"
            strokeWidth="5px"
          />
        </LineChart>
      </ResponsiveContainer> */}
    </MainContainer>
  );
};

export default MonthlyTrend;
