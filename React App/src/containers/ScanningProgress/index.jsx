import React, { useEffect, useState } from 'react';
import {
  StyledProgress,
  MainDiv,
  ScanningText,
  Success,
  Caption,
} from './main.styles';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import { CheckCircleTwoTone } from '@ant-design/icons';
import axios, { baseUrl } from '../../utils/axios';

const ScanningProgress = () => {
  const history = useHistory();

  // data received from redirect
  const totalResumes = history?.location?.state?.totalResumes;
  const id = history?.location?.state?.id;

  // 80% of total resumes
  const stopCountAt =
    totalResumes !== 1 ? Math.floor(totalResumes * 0.8) : 1;

  // state of progress bar
  const [current, setCurrent] = useState(1);
  const [percentage, setPercentage] = useState(
    (1 / totalResumes) * 100
  );
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (!totalResumes || !id) && history.push('/jobs');
  }, [totalResumes, id, history]);

  /**
   * Update current number after every 45secs until we reach 80% of total resumes
   */
  useEffect(() => {
    const interval = setInterval(async () => {
      setCurrent((prev) => (prev !== stopCountAt ? prev + 1 : prev));
      try {
        const res = await axios.get(
          `${baseUrl}/api/job-description/fetch-results/${id}`
        );
        if (res?.status === 200) {
          if (res.data.length > 0) {
            console.log(res.data);
            setData(res.data);
            setCurrent(totalResumes);
            if (totalResumes === 1) setSuccess(true);
            clearInterval(interval);
          }
        } else {
          if (res?.status === 401) {
            clearInterval(interval);
            history.push('/login');
          }
        }
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          clearInterval(interval);
          history.push('/login');
        }
      }
    }, 3000);
  }, [totalResumes, stopCountAt, id]);

  /**
   * Update percentage when current number changes
   */
  useEffect(() => {
    console.log('totalResumes', totalResumes);
    if (totalResumes > 1) {
      let p = (current / totalResumes) * 100;
      setPercentage(Math.floor(p));
      p === 100 && setSuccess(true);
    }
  }, [current, totalResumes]);

  return (
    <MainDiv>
      {success && (
        <>
          <CheckCircleTwoTone
            twoToneColor="#52c41a"
            style={{ fontSize: '64px' }}
          />
          <br />
          <Success>Screening Successful</Success>
          <Caption>
            Your screening was successful. Click the button below to
            view the results.
          </Caption>
          <div>
            <Button
              btnType="basic_gradient"
              height="50px"
              text="View Results"
              onClick={() => {
                history.push('/screened_result', {
                  data,
                  jobDescriptionID: id,
                });
              }}
            />
          </div>
        </>
      )}
      {!success && (
        <>
          <StyledProgress
            percent={Math.floor(percentage)}
            status={'active'}
            strokeColor={'#098ce7'}
            strokeLinecap="square"
          />
          <div>
            <ScanningText>
              <i>
                Analyzing {current} of {totalResumes}...
              </i>
            </ScanningText>
          </div>
        </>
      )}
    </MainDiv>
  );
};

export default ScanningProgress;
