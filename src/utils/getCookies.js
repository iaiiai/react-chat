const getCookies = (cookies) => {
  const formattedCookies = cookies.split(';').map((element) => element.split('=').reduce((name, value) => ({ [name]: value })));
  return formattedCookies;
};

export default getCookies;
