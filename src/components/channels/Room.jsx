import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import sendMessageRequest from '../../network/sendMessageRequest';
import getCookies from '../../utils/getCookies';
import determineNetworkState from '../../network/determineNetworkState';
import ArrowRight from '../svg/ArrowRight.svg';

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [nick, setNick] = useState('unknown');
  const [channelID, setChannelID] = useState(null);
  const [networkState, setNetworkState] = useState('PENDING'); // CONNECTED, PENDING, FAILED

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessageRequest(messageText, nick, channelID, setNetworkState);
    setMessageText('');
  };

  useEffect(() => {
    const socket = io();
    const [{ nickName }] = getCookies(document.cookie);
    const splittedHash = window.location.hash.split('/');
    setChannelID(() => splittedHash[splittedHash.length - 1]);
    setNick(nickName);

    socket.on('connect', () => setNetworkState('CONNECTED'));
    socket.on('connect_error', () => setNetworkState('FAILED'));

    socket.on('newMessage', ({ data }) => {
      const locationHash = window.location.hash.split('/');
      if (data.attributes.channelId !== Number(locationHash[locationHash.length - 1])) return;
      setMessages((prevMessages) => ([...prevMessages, data]));
      window.scrollTo(0, document.body.scrollHeight);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <h4>
            You joined as
            <strong className="badge bg-primary text-wrap text-light">{` ${nick}`}</strong>
            .
          </h4>
          <h1>{ determineNetworkState(networkState) }</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="container-fluid imessage">
            {messages.length === 0 ? <h1 className="text-muted text-center mt-5">Start dialog...</h1> : null}
            {messages.map((message) => (
              message.attributes.from === nick ? (
                <div className="row mt-2 d-flex flex-row-reverse" key={message.attributes.id}>
                  <div className="col-lg-12 d-flex flex-column">
                    <p className="from-me">
                      {message.attributes.text}
                    </p>
                    <span className="sender-name text-right">You</span>
                  </div>
                </div>
              )
                : (
                  <div className="row mt-2 d-flex">
                    <div className="col-lg-12 d-flex flex-column">
                      <p className="from-them">
                        {message.attributes.text}
                      </p>
                      <span className="sender-name text-left">{message.attributes.from}</span>
                    </div>
                  </div>
                )
            ))}
            <div className="row">
              <div className="col-xl-12">
                <form onSubmit={handleSubmit} id="input" className="message-input d-flex justify-content-center">
                  <div className="iinput">
                    <input
                      type="text"
                      className="input-field col-xl-10"
                      value={messageText}
                      required
                      placeholder="Message"
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <button type="submit" className="send-message col-xl-2 p-0" form="input">
                      <ArrowRight />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
