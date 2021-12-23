export default {


  // LOGIN
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });

    // const response = await fetch(
    //   "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLSrUq6uM8vT4SSq9lFQXMqAeKuHJn2vA",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: payload.email,
    //       password: payload.password,
    //       returnSecuredToken: true,
    //     }),
    //   }
    // );

    // const responseData = await response.json();

    // if (!response.ok) {
    //   console.log(responseData);
    //   const error = new Error(
    //     responseData.message || "Failed to authenticate. Check you login data"
    //   );
    //   throw error;
    // }

    // console.log(responseData.idToken);

    // context.commit("setUser", {
    //   token: responseData.idToken,
    //   userId: responseData.localId,
    //   tokenExpiration: responseData.expiresIn,
    // });

    // console.log('checking in data');
    // console.log(context.rootGetters)
  },


  // SIGN UP
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
    
    // const response = await fetch(
    //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLSrUq6uM8vT4SSq9lFQXMqAeKuHJn2vA",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: payload.email,
    //       password: payload.password,
    //       returnSecuredToken: true,
    //     }),
    //   }
    // );

    // const responseData = await response.json();

    // if (!response.ok) {
    //   console.log(responseData);
    //   const error = new Error(
    //     responseData.message || "Failed to authenticate. Check you login data"
    //   );
    //   throw error;
    // }

    // console.log(responseData);

    // context.commit("setUser", {
    //   token: responseData.idToken,
    //   userId: responseData.localId,
    //   tokenExpiration: responseData.expiresIn,
    // });
  },


  // AUTH ACTION
  async auth(context, payload){
    const mode = payload.mode;
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLSrUq6uM8vT4SSq9lFQXMqAeKuHJn2vA";

    if(mode === 'signup'){
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLSrUq6uM8vT4SSq9lFQXMqAeKuHJn2vA"
    }
    
    const response = await fetch( url,
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecuredToken: true,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to authenticate. Check you login data"
      );
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    // timer = setTimeout( function() {
    //   context.dispatch('autoLogout');
    // }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });

    console.log(responseData);
  },


  // AUTO LOGIN
  tryLogin(context){
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if(expiresIn < 0){
      return;
    }

    // timer = setTimeout( function() {
    //   context.dispatch('autoLogout');
    // }, expiresIn);

    if(token && userId){
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },
  


  // LOG OUT
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    // clearTimeout(timer);
    
    context.commit('setUser', {
      token: null,
      userId: null,
    })

    console.log('User Logged out!');
  },



  // AUTO LOG OUT
  autoLogout (context){
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
