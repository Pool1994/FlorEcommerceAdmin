import { router } from '@/plugins/1.router/index';
import axios from 'axios';
import { ofetch } from 'ofetch';
export const $api = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  async onRequest({ options }) {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },
  async onResponseError({ request, options, error }) {
    alert('onResponseError')
  },
  onRequestError({ request, options, response }) {
    alert('onRequestError')
  },

})

export const $axiosIns = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// / ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
$axiosIns.interceptors.request.use(config => {
  // Retrieve token from localStorage
  const token = useCookie('accessToken').value;

  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {}

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = token ? `Bearer ${token}` : ''
  }

  // Return modified config
  return config
})

// ℹ️ Add response interceptor to handle 401 response
$axiosIns.interceptors.response.use(response => {
  return response
}, error => {
  // Handle error
  if (error.response.status === 401) {
    useCookie('accessToken').value = null;
    useCookie('userData');
    router.push("/login");
    useCookie('userAbilityRules').value = null
  }
  else {
    return Promise.reject(error)
  }
});
