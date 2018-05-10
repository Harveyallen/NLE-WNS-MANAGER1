// 返回处理过的token数据
function tokenData(value) {
  return `Bearer ${value}`;
}

// 将本地数据移除
function removeToken(key) {
  localStorage.setItem(key, '');
  sessionStorage.setItem(key, '');
}

// 将数据添加到本地
function addToken(keep, key, val) {
  if (keep) {
    localStorage.setItem(key, val);
  } else {
    sessionStorage.setItem(key, val);
  }
  return val;
}

// 获取到本地数据
function getData(kye) {
  return localStorage.getItem(kye) || sessionStorage.getItem(kye) || '';
}

const token = {
  namespaced: true,
  state: {
    token: '',
    // id: '',
  },
  mutations: {
    // 写入token
    getToken(state) {
      state.token = getData('TOKEN');
      // state.id = getData('ID');
    },
    // 添加token
    addToken(state, data) {
      console.log(addToken(data.keep, 'TOKEN', tokenData(data.token)));
      state.token = addToken(data.keep, 'TOKEN', tokenData(data.token));
      // state.id = addToken(data.keep, 'ID', data.id);
    },
    // 删除token
    delToken(state) {
      state.token = '';
      removeToken('TOKEN');
    },
  },
};

export default token;
