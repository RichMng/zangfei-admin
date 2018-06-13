import axios from 'axios';

let Common = {};
// let getToken = function(){
//   return localStorage.getItem("customerKey");
// };

Common.ajax = axios.create({
  baseURL: '/',
  timeout: 30000,
});


export default Common;
