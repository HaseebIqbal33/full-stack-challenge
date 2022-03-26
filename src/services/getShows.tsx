import axios from "axios";

export const getShowsBySearch = (search: string) => {
  return axios.get(`http://localhost:5000/shows/${search}`).then((res) => {
    return res.data;
  });
};
