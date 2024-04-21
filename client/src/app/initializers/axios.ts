import axios from 'axios';
import { eHttpResponse } from '../../enums';
import { toast } from 'react-toastify';

const axiosInit = async () => {
  axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;
  axios.defaults.withCredentials = true;
  axios.interceptors.response.use(null, async (error) => {
    if (error.response) {
      if (error.response.status === eHttpResponse.Unauthorized) {
        const urlRedirect = '/';
        window.location.href = urlRedirect;
      }
      if (error.response.data.message) {
        toast.error(error.response.message);
      }
    }
    return error;
  });
};

export default axiosInit;
