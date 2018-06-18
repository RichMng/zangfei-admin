import axios from 'axios';

let Common = {};
// let getToken = function(){
//   return localStorage.getItem("customerKey");
// };

Common.ajax = axios.create({
  baseURL: 'http://192.168.1.108:3000',
  timeout: 30000,
});


export default Common;
