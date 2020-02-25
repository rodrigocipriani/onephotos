import { Grid, Input, FormControl, InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import config from "../../../config";
import { authSliceActions } from "../auth.slice";
import googleGLogo from "../images/google-G-logo.png";

const LASTFULLPATH_COOKIE_NAME = "lastFullPath";

const AuthHomeRoute = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.authSlice);
  const { pathname, search } = location;
  const [slug, setSlug] = useState("");

  const lastFullPath = `${pathname}${search}`;
  const isShowLogin = !user && !loading.user;

  console.log("111 user", user);

  useEffect(() => {
    if (isShowLogin) {
      dispatch(authSliceActions.loadAuthUser());
    }

    const cookieUrl = Cookies.get(LASTFULLPATH_COOKIE_NAME) || lastFullPath;
    let redirectUrl = cookieUrl;
    if (
      redirectUrl.startsWith("/auth/receive") ||
      redirectUrl.startsWith("/logout")
    ) {
      redirectUrl = "/";
    }
    Cookies.set(LASTFULLPATH_COOKIE_NAME, redirectUrl);
    if (pathname === "/auth/receive" || pathname === "/logout") {
      history.push(redirectUrl);
    }
  }, []);

  const handlePasswordLogin = () => {
    dispatch(authSliceActions.loginByPassword(slug));
  };

  return (
    <>
      <Dialog
        fullScreen={false}
        open={isShowLogin}
        // onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Grid container>
          <Grid item xs={12} style={{ padding: 16, textAlign: "center" }}>
            <Typography variant="h6" align="center">
              É necessário se identificar
            </Typography>
            <br />
            <Button
              variant="contained"
              style={{ backgroundColor: "#fff" }}
              href={`${config.apiUrl}/auth/google?redirect=${document.location.href}`}
            >
              <img
                src={googleGLogo}
                style={{ width: 25, marginRight: 10 }}
                alt="Google logo on sign in"
              />
              Continuar com Google
            </Button>
          </Grid>
          <Grid item xs={12} style={{ padding: 16, textAlign: "center" }}>
            Ou
          </Grid>
          <Grid item xs={12} style={{ padding: 16, textAlign: "center" }}>
            <FormControl>
              <InputLabel>Digite o seu usuário</InputLabel>
              <Input value={slug} onChange={e => setSlug(e.target.value)} />
              <Button
                onClick={handlePasswordLogin}
                variant="contained"
                color="primary"
              >
                Entrar
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Dialog>
      {!isShowLogin && children}
    </>
  );
};

export default AuthHomeRoute;
