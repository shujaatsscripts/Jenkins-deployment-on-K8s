import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Popup from './Popup';
import Meeting from './Meeting';
import { message, Spin } from 'antd';
import bcrypt from 'bcryptjs';

const VideoCall = () => {
  const history = useHistory();
  let query = new URLSearchParams(useLocation().search);

  const candidateId = query.get('candidateId');
  const token = query.get('token');
  const validation = query.get('validation');

  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (candidateId && token && validation) {
        // const decrypted = CryptoJS.AES.decrypt(
        //   token,
        //   'W/BFEIyoGTvKrQYAWVwivTlwTyGeK7HBnuN0wLOK7Ko='
        // ).toString(CryptoJS.enc.Utf8);

        // if (decrypted)
        // if (new Date().getTime() > new Date(decrypted).getTime()) {
        setError(null);
        // } else
        //     setError(
        //       `This meeting has not yet started. Please click ok to be directed to our home page.`
        //     );
        // else history.push('/');
      } else history.push('/');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [candidateId, token, validation, history]);

  const handle = async (pass) => {
    const authenticated = await bcrypt.compare(pass, validation);
    if (authenticated) {
      setOpen(false);
      setVerified(true);
    } else message.error('Invalid Password');
  };

  return (
    <Spin spinning={loading}>
      {verified ? (
        <Meeting id={candidateId} username={''} />
      ) : (
        <Popup visible={open} handle={handle} error={error} history={history} />
      )}
    </Spin>
  );
};

export default VideoCall;
