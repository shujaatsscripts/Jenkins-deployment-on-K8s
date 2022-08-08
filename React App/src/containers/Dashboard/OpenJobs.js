import React, { useEffect, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Label,
} from "recharts";
import { MainContainer, SectionHeading } from "./styles/main.styles";
// import Loading from '../../components/Loading';
import axios, { baseUrl } from "../../utils/axios";
import { SwitchToggle } from "./switchToggle";

const OpenJobs = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("YEARLY");

  let d = [
    { name: "Jan", Shortlisted: 2, Hired: 7, Rejected: 12 },
    { name: "Feb", Shortlisted: 2, Hired: 10, Rejected: 4 },
    { name: "March", Shortlisted: 2, Hired: 5, Rejected: 12 },
    { name: "April", Shortlisted: 2, Hired: 10, Rejected: 6 },
    { name: "May", Shortlisted: 4, Hired: 10, Rejected: 12 },
    { name: "June", Shortlisted: 2, Hired: 9, Rejected: 6 },
    { name: "July", Shortlisted: 2, Hired: 10, Rejected: 12 },
    { name: "Aug", Shortlisted: 5, Hired: 6, Rejected: 5 },
    { name: "Sept", Shortlisted: 2, Hired: 3, Rejected: 12 },
    { name: "Oct", Shortlisted: 2, Hired: 8, Rejected: 12 },
    { name: "Nov", Shortlisted: 2, Hired: 7, Rejected: 12 },
    { name: "Dec", Shortlisted: 2, Hired: 10, Rejected: 12 },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get(
        `${baseUrl}/api/candidate/dashboardActiveJobs/${period}`
      );
      setData(res.data);
      console.log("hello fraaand");
      console.log(res.data);
    };
    fetchJobs();
    // setData(d);
  }, [period]);

  /**
   * @returns new data object with name reduced to substring of first 10 letters and ... in front
   * ... only appears if length of name is > 10
   */
  // const mapData = (data) => {
  //   return data.map((item) => ({
  //     ...item,
  //     name: `${item.name.substring(0, 10)}${
  //       item.name.length > 10 ? "..." : ""
  //     }`,
  //   }));
  // };

  const barColors = ["#AF38EB", "#E04194", "#91A6B4", "#7CB07C", "#F48670"];
  const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
    x + width / 2
  }, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
    y + height
  } ${x + width}, ${y + height}
          Z`;

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // TriangleBar.propTypes = {
  //   fill: PropTypes.string,
  //   x: PropTypes.number,
  //   y: PropTypes.number,
  //   width: PropTypes.number,
  //   height: PropTypes.number,
  // };

  function firstLetterUC(text) {
    return text.charAt(0) + text.slice(1).toLowerCase();
  }

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <div
        style={{
          textAlign: "center",
          // padding: "30px 0 0px 0",
          display: "flex",
          justifyContent: "center",
          // marginTop: "400px",
          // border: "1px solid black",
          // marginBottom: "-25px",
        }}
      >
        {payload.map((entry, index) => (
          <span
            style={{
              fontSize: "12px",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              display: "flex",
              // border: "1px solid black",
              marginRight: "10%",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: `${entry.color}`,
                marginTop: "2px",
                marginRight: "10px",
                borderRadius: "3px",
              }}
            ></div>
            {firstLetterUC(entry.value)}
          </span>
        ))}
      </div>
      //   style={{ "list-style-type": "none", display: "block", float: "center" }}
      // >
      //   {payload.map((entry, index) => (
      //     <li key={`item-${index}`} style={{ float: "left" }}>
      //       {entry.value}
      //     </li>
      //   ))}
      // </ul>
    );
  };

  return !data ? (
    // <Loading />
    <></>
  ) : (
    <MainContainer style={{ paddingBottom: "0px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SectionHeading mb="1rem" bg="#808080">
          Active Jobs
        </SectionHeading>
        <SwitchToggle setPeriod={setPeriod} />
      </div>
      <ResponsiveContainer
        width="100%"
        height="85%"
        // height={330}
      >
        <BarChart
          // width={730}
          // height={200}
          data={data}
          barSize={10}
          style={{ paddingBottom: "0px" }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity="0.3" />
          {/* <defs>
            <linearGradient id="openJobs" x1="0" y1="1" x2="1" y2="0">
              <stop offset="10%" stopColor="#73b792" stopOpacity={1} />
              <stop offset="90%" stopColor="#4f619f" stopOpacity={1} />
            </linearGradient>
          </defs> */}
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            // content={(value) => {
            //   return <span style={{ color: "red" }}>{console.log(value)}</span>;
            // }}
          ></XAxis>
          {/* <YAxis /> */}
          <Tooltip cursor={{ fill: "transparent" }} />
          <Legend
            content={renderLegend}
            wrapperStyle={{
              paddingTop: "25px",
            }}
          />
          <Bar
            dataKey="SHORTLISTED"
            radius={[0, 0, 10, 10]}
            // shape={<TriangleBar />}
            stackId="a"
            fill="#FFB200"
          />
          <Bar dataKey="HIRED" stackId="a" fill="#34B53A" />
          <Bar
            dataKey="REJECTED"
            radius={[10, 10, 0, 0]}
            // shape={<TriangleBar />}
            stackId="a"
            fill="#E3543F"
          />

          {/* {mapData(data).map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={barColors[index % 20]}
                // width={28}
              />
            ))}
          </Bar> */}
        </BarChart>
      </ResponsiveContainer>
    </MainContainer>
  );
};

export default OpenJobs;
