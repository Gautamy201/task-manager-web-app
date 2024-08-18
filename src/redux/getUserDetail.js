import { jwtDecode } from "jwt-decode";
export const getUserDetail = (token) => {
  if (!token) return "";
  const decord = jwtDecode(token);
  return decord;
};

export const tokenIsExpired = (token) => {
  if (!token) return true;
  const decord = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decord.exp < currentTime;
};

export const getTaskDate = (d) => {
  // const date = d.getDate()
  const date = new Date(d);
  return date.toLocaleDateString();
};
