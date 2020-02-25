import { createSlice } from "@reduxjs/toolkit";
import { appApi } from "../../helpers/api.helper";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    users: {},
    usersBySearch: [],
    user: null,
    loading: {}
  },
  reducers: {
    logout: {
      reducer(state, action) {
        if (action.status === "success") {
          state.user = null;
        }
        state.loading.logout = action.status === "pending";
      },
      prepare: () => ({
        payload: {
          promise: appApi.get("/v1/auth/logout")
        }
      })
    },

    loadAuthUser: {
      reducer(state, action) {
        if (action.ready) {
          state.user = action.payload.data;
        }
        state.loading.user = action.status === "pending";
      },
      prepare: () => ({
        payload: {
          promise: appApi.get("/v1/user/self")
        }
      })
    },

    loadUserById: {
      reducer(state, action) {
        if (action.ready) {
          const user = action.payload.data;
          state.users[user.usuarioId] = user;
        }
        state.loading.users = action.status === "pending";
      },
      prepare: userId => ({
        payload: {
          promise: appApi.get(`/v1/usuario/consulta?usuarioId=${userId}`),
          userId
        }
      })
    },

    loadUserBySearch: {
      reducer(state, action) {
        if (action.ready) {
          state.usersBySearch = action.payload.data;
        }
        state.loading.usersBySearch = action.status === "pending";
      },
      prepare: text => ({
        payload: {
          promise: appApi.get(`/v1/usuario/detalhamento/search/text/${text}`)
        }
      })
    },

    loginByPassword: {
      reducer(state, action) {
        if (action.ready) {
          state.user = action.payload.data;
        }
        state.loading.user = action.status === "pending";
      },
      prepare: slug => ({
        payload: {
          promise: appApi.get(`/v1/auth/login/password`, {
            params: {
              slug
            }
          })
        }
      })
    }
  }
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
