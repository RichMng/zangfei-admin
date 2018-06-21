import axios from 'axios';

let Common = {};
// let getToken = function(){
//   return localStorage.getItem("customerKey");
// };

Common.ajax = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30000,
});


export default Common;
