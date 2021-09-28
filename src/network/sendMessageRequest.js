import axios from 'axios';

const sendMessageRequest = async (text, from, channelID, setNetworkState) => {
  try {
    setNetworkState('PENDING');
    const response = await axios.post(`https://chat-app-n1.herokuapp.com/api/v1/channels/${channelID}/messages`, {
      data: {
        attributes: {
          text,
          from,
        },
      },
    });
    setNetworkState('CONNECTED');
    return response;
  } catch (error) {
    setNetworkState('FAILED');
    return `Some error occured due sending message: ${error}`;
  }
};

export default sendMessageRequest;
