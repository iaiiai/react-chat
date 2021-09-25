import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import getCookies from '../../utils/getCookies';

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [nick, setNick] = useState('unknown');
  const [channelID, setChannelID] = useState(null);
  const sendMessageRequest = async (text, from) => {
    try {
      return await axios.post(`http://localhost:5000/api/v1/channels/${channelID}/messages`, {
        data: {
          attributes: {
            text,
            from,
          },
        },
      });
    } catch (error) {
      return `Some error occured due sending message: ${error}`;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessageRequest(messageText, nick);
    setMessageText('');
  };

  useEffect(() => {
    const socket = io();
    const [{ nickName }] = getCookies(document.cookie);
    const splittedHash = window.location.hash.split('/');
    setChannelID(() => splittedHash[splittedHash.length - 1]);
    setNick(nickName);
    socket.on('connect', () => { /* Some stuff gonna be here */ });

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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-arrow-right-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                        />
                      </svg>
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
