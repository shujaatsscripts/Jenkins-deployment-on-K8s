import React, { useEffect, useState } from "react";
import { MainContainer, SectionHeading } from "./styles/main.styles";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
// import Loading from '../../components/Loading';
import axios, { baseUrl } from "../../utils/axios";

const SourceCount = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      const res = await axios.get(`${baseUrl}/api/applicant/source`);
      setCount(res.data);
    };
    fetchCount();
  }, []);

  return !count ? (
    // <Loading />
    <></>
  ) : (
    <MainContainer>
      <SectionHeading bg="#7CB07C">Source Count</SectionHeading>
      <ResponsiveContainer width="100%" height={135}>
        <BarChart data={count}>
          <CartesianGrid strokeDasharray="3 3" opacity="0.3" />
          <defs>
            <linearGradient id="sourceCount" x1="0" y1="1" x2="1" y2="0">
              <stop offset="10%" stopColor="#cc40aa" stopOpacity={1} />
              <stop offset="90%" stopColor="#7322fe" stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="source" />
          <Legend />
          <Bar dataKey="value" fill="#cc40aa" maxBarSize={25} />
        </BarChart>
      </ResponsiveContainer>
    </MainContainer>
  );
};

export default SourceCount;
