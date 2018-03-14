(() => {
  class RequestError extends Error {
    constructor(response) {
      super(response.statusText);
      this.status = response.status;
      this.response = response;
    }
  }

  const requestApi = (apiUrl) => (method, path, params, headers = {}) => {
    const options = {
      method,
      headers: Object.assign({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, headers),
      body: params && JSON.stringify(params),
    };

    return fetch(`${apiUrl}/${path}`, options)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        if (response.status < 500) {
          return Promise.reject(new RequestError(response));
        }

        return Promise.reject('Server error');
      })
      .then((json) => {
        if (json.status && json.status === 'error') {
          throw json;
        }
        return json;
      });
  };

  window.requestApi = requestApi('https://sarrsmlpsg.execute-api.eu-west-1.amazonaws.com/v0');
})();