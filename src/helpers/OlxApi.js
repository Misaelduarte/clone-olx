import Cookies from 'js-cookie';
import qs from 'qs';

const BASE_API = 'http://alunos.b7web.com.br:501';

const apiFetchPost = async (endpoint, body) => {

  if(!body.token) {
    let token = Cookies.get('token');
    if(token) {
      body.token = token;
    }
  }

  const res = await fetch(BASE_API+endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(body )
  });

  const json = await res.json();

  if(json.notallowed) {
    window.location.href = '/';
  }

  return json;
}

const apiFetchGet = async (endpoint, body = []) => {

  if(!body.token) {
    let token = Cookies.get('token');
    if(token) {
      body.token = token;
    }
  }

  const res = await fetch(`${BASE_API+endpoint}?${qs.stringify(body)}`);

  const json = await res.json();

  if(json.notallowed) {
    window.location.href = '/';
  }

  return json;
}

const OlxApi = {

  login:async (email, password) => {
    const json = await apiFetchPost(
      '/user/signin',
      {email, password}
    );
    return json;
  },

  register:async (name, email, password, states) => {
    const json = await apiFetchPost(
      '/user/signup',
      {name, email, password, state:states}
    );
    return json;
  },

  getState:async () => {
    const json = await apiFetchGet(
      '/states'
    );
    return json.states;
  },

  getCategories:async () => {
    const json = await apiFetchGet(
      '/categories'
    );
    return json.categories;
  },

  getAds:async (options) => {
    const json = await apiFetchGet(
      '/ad/list',
      options
    );
    return json;
  },

  getAd:async (id, other = false) => {
    const json = await apiFetchGet(
      '/ad/item',
      {id, other}
    );
      return json;
  }

};

export default () => OlxApi;
