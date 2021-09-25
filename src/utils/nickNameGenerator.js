const generateNickName = () => {
  const nickNames = [['Thunder', 'Paper', 'Rock', 'Impressive', 'Light', 'Dude'], ['Hawk', 'Fire', 'Cool', 'Black', 'Free', 'Funny']];
  return (`nickName=${nickNames[Math.round(Math.random() * 1)][Math.floor(Math.random() * 5)]}${nickNames[Math.round(Math.random() * 1)][Math.floor(Math.random() * 5)]}`);
};

export default generateNickName;
