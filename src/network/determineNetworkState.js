const determineNetworkState = (state) => {
  const networkStates = {
    CONNECTED: 'Connected sucessfully.',
    PENDING: 'Waiting for connection...',
    FAILED: 'Can not connect to the network.',
  };
  return networkStates[state];
};

export default determineNetworkState;
