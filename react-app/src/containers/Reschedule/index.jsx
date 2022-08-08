import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios, { baseUrl } from '../../utils/axios';
import { Calendar } from 'antd';
import { TopRowWrapper, Heading, PageContainer } from '../styles/main.styles';
import { BoldText, NormalText } from './styles/main.styles';
import { Row, Col, Spin, message } from 'antd';
import moment from 'moment';
import Button from '../../components/Button';
import styled from 'styled-components';

const Reschedule = () => {
  const history = useHistory();
  let query = new URLSearchParams(useLocation().search);

  const candidateId = query.get('candidateId');
  const token = query.get('token');

  const [recruiterBusyTime, setRecruiterBusyTime] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loadBusyTimes, setLoadBusyTimes] = useState(true);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [dateBusyTime, setDateBusyTime] = useState(null);
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  useEffect(() => {
    const getBusyDateTimes = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/api/public/change-time?id=${candidateId}&data=${encodeURIComponent(
            token
          )}`
        );
        console.log(res);
        setRecruiterBusyTime(
          res.data.recruiterBusyTime.reduce((accumulator, currentValue) => {
            let date = new Date(currentValue);
            let dateString = moment.utc(date).format('YYYY-MM-DD');
            let time = date.getUTCHours();

            accumulator[dateString] && accumulator[dateString].length > 0
              ? accumulator[dateString].push(time)
              : (accumulator[dateString] = [time]);
            return accumulator;
          }, {})
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoadBusyTimes(false);
      }
    };

    try {
      if (candidateId && token) {
        // const decrypted = CryptoJS.AES.decrypt(token, 'W/BFEIyoGTvKrQYAWVwivTlwTyGeK7HBnuN0wLOK7Ko=').toString(CryptoJS.enc.Utf8);

        // if (decrypted) {
        // if (new Date().getTime() > new Date(decrypted).getTime()) {
        // console.log('link expired');
        // } else
        getBusyDateTimes();
        // } else {
        // console.log('invalid token');
        // }
      } else history.push('/');
    } catch (err) {
      alert('Unable to fetch busy time of recruiter');
      setLoading(true);
      console.log(err);
    }
  }, [candidateId, token, history]);

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  const submit = async () => {
    let date = new Date(selectedDate);
    let time = new Date();
    time.setHours(selectedTime);

    let payload = {
      time:
        moment
          .utc(
            new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              time.getHours(),
              0,
              0
            )
          )
          .local()
          .format()
          .slice(0, -6) + '.000Z',
    };
    try {
      setLoading(true);
      const res = await axios.put(
        `${baseUrl}/api/public/change-time?id=${candidateId}&data=${encodeURIComponent(
          token
        )}`,
        payload
      );
      // console.log(res);
      message.success('Your interview has been rescheduled');
      history.push('/login');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopRowWrapper>
        <div>
          <Heading>Interview Scheduled</Heading>
        </div>
      </TopRowWrapper>
      <Spin spinning={loadBusyTimes || loading}>
        <PageContainer>
          <br />
          <Row>
            <Col xs={24} md={24} lg={12} xl={12}>
              <BoldText>Dear Candidate</BoldText>
              <br />
              <NormalText>
                An email has been sent to you with information about your
                interview schedule. You can change the slot for your interview
                from the time and date options provided. <br />
                Please confirm your changes after clicking on the button below.
              </NormalText>
              <br />
              <br />
              Pick Date from given calendar below:
              <Calendar
                fullscreen={false}
                onChange={(date, dateString) => {
                  setSelectedDate(date);
                }}
                onSelect={(date) => {
                  setSelectedDate(date);
                  let tempDate = moment(date).format('YYYY-MM-DD');
                  let busyArray = recruiterBusyTime[tempDate]
                    ? recruiterBusyTime[tempDate]
                    : [];
                  setDateBusyTime(busyArray);
                }}
                onPanelChange={onPanelChange}
              />
            </Col>

            <Col xs={24} md={24} lg={12} xl={12} style={{ margin: 'auto' }}>
              <StyledRow>
                <Col span={24}>
                  Pick Time from given slots below (Note: the timezone is
                  UTC+00):
                  <br />
                  {/* <br />
                  <StyledDatePicker placeholder='Interview Date' value={selectedDate} onChange={(date, dateString) => setSelectedDate(date)} />
                </Col>
                <Col xs={11} md={{ span: 10 }}>
                  <BoldText>Interview Time</BoldText>
                  <br />
                  <StyledTimePicker
                    placeholder='Interview Time'
                    showMinute={false}
                    showSecond={false}
                    showNow={false}
                    hideDisabledOptions={true}
                    clearIcon={false}
                    value={selectedTime}
                    disabledHours={() => {
                      let date = moment.utc(selectedDate).format('YYYY-MM-DD');
                      return recruiterBusyTime[date] ? recruiterBusyTime[date] : [];
                    }}
                    onOk={(time) => setSelectedTime(time)}
                  />
                  {selectedDate && selectedTime && <Button text='Change Slot' btnType='confirmSlot' onClick={submit} />}
 */}
                  <br />
                </Col>

                {selectedDate ? (
                  hours.map((h) => {
                    return (
                      <Col span={4}>
                        <TimeSlot
                          disabled={dateBusyTime.includes(parseInt(h))}
                          active={active === h}
                          onClick={() => {
                            setActive(h);
                            setSelectedTime(h);
                          }}
                        >
                          {h < 10 ? `0${h}:00` : `${h}:00`}
                        </TimeSlot>
                      </Col>
                    );
                  })
                ) : (
                  <></>
                )}
                <Col span={24}>
                  <br />
                  <div>
                    {selectedDate && selectedTime && (
                      <Button
                        text="Change Slot"
                        btnType="confirmSlot"
                        onClick={submit}
                      />
                    )}
                  </div>
                </Col>
              </StyledRow>
            </Col>
          </Row>
        </PageContainer>
      </Spin>
    </>
  );
};

const StyledRow = styled(Row)`
  @media (min-width: 980px) {
    padding: 50px;
  }
`;

const TimeSlot = styled.button`
  border: 1px solid grey;
  margin-right: 6px;
  margin-bottom: 6px;
  background-color: ${(props) =>
    props.disabled ? 'gray' : props.active ? '#2a82f3' : 'white'};
  color: ${(props) =>
    props.disabled ? 'black' : props.active ? 'white' : 'black'};
  height: 30px;
  width: 70px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => (props.disabled ? 'gray' : '#2a82f3')};
    color: ${(props) => (props.disabled ? 'black' : 'white')};
  }
`;

export default Reschedule;
