import { Button, Row, Col } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import io from 'socket.io-client';
import Styled from 'styled-components';
// import './App.css';
import { baseUrl } from '../../utils/axios';
import { VideoCameraOutlined, AudioOutlined, PhoneOutlined, AudioMutedOutlined, PauseOutlined } from '@ant-design/icons';
import logo from '../../images/whiteLogo.svg';

const VideoCall = ({ id, username }) => {
  // const [me, setMe] = useState('');
  const [stream, setStream] = useState();
  // const [receivingCall, setReceivingCall] = useState(false);
  // const [caller, setCaller] = useState('');
  // const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  // const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  // const [name, setName] = useState('');
  const [client, setClient] = useState('');
  // const [incomingStreams, setIncomingStreams] = useState([]);
  const myVideo = useRef();
  // const userVideo = useRef();
  // const connectionRef = useRef();
  const [socket, setSocket] = useState();
  const [audioStatus, setAudioStatus] = useState(true);
  const [videoStatus, setVideoStatus] = useState(true);

  const [audioIcon, setAudioIcon] = useState(true);
  const [videoIcon, setVideoIcon] = useState(true);
  const ROOM_ID = id;
  const allRefs = useRef();
  allRefs.current = [];
  const streamsArr = [];
  const peers = {};

  useEffect(() => {
    setSocket(
      io.connect(baseUrl, {
        query: { id, name: username },
      }),
    );
  }, [id, username]);

  const myPeer = new Peer(undefined);

  const toggleVideo = (stream) => {
    if (stream) {
      videoIcon ? setVideoIcon(false) : setVideoIcon(true);
      stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
      setVideoStatus(stream.getAudioTracks()[0].enabled);
    }
  };

  const toggleAudio = (stream) => {
    if (stream) {
      audioIcon ? setAudioIcon(false) : setAudioIcon(true);
      stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
      setAudioStatus(stream.getAudioTracks()[0].enabled);
    }
  };

  function addVideoStream(stream) {
    if (stream) {
      // console.log('before: ', allRefs.current);
      allRefs.current.srcObject = stream;
      // console.log('after: ', allRefs.current);
      setCallAccepted(true);
    }
  }

  function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    // toggleVideo(stream);

    call.on('stream', (userVideoStream) => {
      streamsArr.push(userVideoStream);
      addVideoStream(userVideoStream);
    });
    call.on('close', () => {
      console.log('call is being ended');
    });

    peers[userId] = call;
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
      if (socket) {
        myPeer.on('open', (id) => {
          socket.emit('join-room', ROOM_ID, id);
          console.log('join-room');
        });

        socket.on('user-connected', (userId) => {
          console.log('user-connected');
          connectToNewUser(userId, stream);
        });

        myPeer.on('call', (call) => {
          call.answer(stream);
          call.on('stream', (userVideoStream) => {
            addVideoStream(userVideoStream);
          });
        });

        socket.on('user-disconnected', (userId) => {
          console.log('user is being disconnected');
          setCallEnded(true);
          setCallAccepted(false);
          if (peers[userId]) peers[userId].close();
        });
      }
    });
  }, [socket]);

  const leaveCall = () => {
    socket.emit('disconnected');
    setCallEnded(true);
    setCallAccepted(false);
    socket.on('user-disconnected', (userId) => {
      if (peers[userId]) peers[userId].close();
    });
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', color: '#fff' }}>3Cix</h1>
      <div
        className='container'
        style={{
          backgroundColor: 'black',
          borderRadius: '20px',
          padding: '20px',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
        }}
      >
        <div className='video-container'>
          <Row>
            <Col span={18} style={{ height: '80vh' }}>
              {callAccepted ? (
                <div className='video'>
                  {callAccepted && !callEnded ? (
                    <video
                      playsInline
                      ref={allRefs}
                      autoPlay
                      style={{
                        height: '80vh',
                        width: '98%',
                        borderRadius: '20px',
                      }}
                    />
                  ) : null}
                </div>
              ) : !callAccepted ? (
                <div
                  style={{
                    color: 'grey',
                    height: '100%',
                    textAlign: 'center',
                    paddingTop: '35vh',
                    fontSize: '40px',
                  }}
                >
                  There is no one in the meeting right now
                </div>
              ) : (
                <></>
              )}
            </Col>
            <Col span={6}>
              <div
                className='video'
                style={{
                  textAlign: 'center',
                }}
              >
                {stream && (
                  <video
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                    style={{
                      width: '100%',
                      borderRadius: '10px',
                      border: '4px solid grey',
                    }}
                  />
                )}
                <br />
                <br />
                {videoIcon ? (
                  <StyledButton onClick={() => toggleVideo(stream)}>
                    <VideoCameraOutlined style={{ fontSize: '20px' }} />
                  </StyledButton>
                ) : (
                  <StyledButton
                    onClick={() => toggleVideo(stream)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      borderColor: 'red',
                    }}
                  >
                    <PauseOutlined style={{ fontSize: '20px' }} />
                  </StyledButton>
                )}
                &nbsp;&nbsp;&nbsp;
                {audioIcon ? (
                  <StyledButton onClick={() => toggleAudio(stream)}>
                    <AudioOutlined style={{ fontSize: '20px' }} />
                  </StyledButton>
                ) : (
                  <StyledButton
                    onClick={() => toggleAudio(stream)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      borderColor: 'red',
                    }}
                  >
                    <AudioMutedOutlined style={{ fontSize: '20px' }} />
                  </StyledButton>
                )}
                &nbsp;&nbsp;&nbsp;
                {callAccepted && !callEnded ? (
                  <StyledButton
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      borderColor: 'red',
                    }}
                    variant='contained'
                    color='secondary'
                    onClick={leaveCall}
                  >
                    <PhoneOutlined />
                  </StyledButton>
                ) : (
                  <></>
                )}
                <br />
                <br />
                <br />
                <br />
                <img
                  src={logo}
                  alt='logo'
                  style={{
                    height: '25%',
                    width: '50%',
                  }}
                />
              </div>
              {/* <div className="myId" style={{ width: "100%" }}>
                <div className="call-button" style={{ textAlign: "right" }}>
                  {callAccepted && !callEnded ? (
                    <StyledButton
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderColor: "red",
                      }}
                      variant="contained"
                      color="secondary"
                      onClick={leaveCall}
                    >
                      <PhoneOutlined />
                    </StyledButton>
                  ) : (
                    <></>
                  )}
                </div>
              </div> */}
            </Col>
          </Row>
        </div>
        {/* {client && !callAccepted ? (
          <div style={{ color: "black" }}>
            Another User has joined, start the call?
          </div>
        ) : !callAccepted ? (
          <div style={{ color: "black", border: "1px solid black" }}>
            There is no one in the meeting right now
          </div>
        ) : (
          <></>
        )} */}
      </div>
    </>
  );
};

const StyledButton = Styled.button`
padding: 0 6px 10px 8px;
border: 3px solid grey;
background-color: white;
text-align:center;
  border-radius: 100px;
  height: 38px;
`;

export default VideoCall;
