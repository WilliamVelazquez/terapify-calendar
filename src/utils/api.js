import { isEmptyObject } from 'Utils/validations';

import { GET_TYPE, POST_TYPE, PUT_TYPE, API_URL } from 'Constants/app';

class Api {
  apiGet = async (URL, callback, errorCallback, headerAccept, headerContentType) => {
    const service = API_URL + URL;
    this.apiHttpRequest(GET_TYPE, service, {}, callback, errorCallback, headerAccept, headerContentType);
  }

  apiPost = async (URL, body, callback, errorCallback, headerAccept, headerContentType) => {
    const service = API_URL + URL;
    this.apiHttpRequest(POST_TYPE, service, body, callback, errorCallback, headerAccept, headerContentType);
  }
  
  apiPut = async (URL, body, callback, errorCallback, headerAccept, headerContentType) => {
    const service = API_URL + URL;
    this.apiHttpRequest(PUT_TYPE, service, body, callback, errorCallback, headerAccept, headerContentType);
  }

  apiHttpRequest = async (methodType, service, body, callback, errorCallback, headerAccept, headerContentType) => {
    try {
      //DEBUG-->console.log("Env: ", process.env.NODE_ENV);
      //DEBUG-->console.log("body:",body)

      const requestConfig =
      {
        method: (methodType || 'GET'),
        headers: {
          Accept: (headerAccept || 'application/json'),
          'Content-Type': (headerContentType || 'application/json'),
        },
      };

      (body && !isEmptyObject(body)) ? requestConfig.body = JSON.stringify({ ...body }) : null;

      //DEBUG-->console.log("Request configuration:", requestConfig);

      //const requestURL = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'none')?PROD_API_URL:DEV_API_URL;
      const response = await fetch(service, requestConfig);

      if (response.status !== 200) {
        //DEBUG-->console.log(`Error code: ${response.status} | Message: ${response.message}`);
        throw Error(response.message);
      } else {
        const json = await response.json();
        //DEBUG-->console.log("JSON:",json);
        callback && await callback(json);
      }
    } catch (error) {
      console.log('Catch:', error);
      errorCallback && await errorCallback(error);
    }
  }
}

export default new Api();
