import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../Auth/auth.slice";
import SyncAlt from "@material-ui/icons/SyncAlt";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  userMenu: {
    position: "relative",
    textAlign: "right",
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(),
      width: "auto"
    }
  }
}));

const AppHeader = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authSlice);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    dispatch(authSliceActions.logout());
  }

  const open = Boolean(anchorEl);

  let userPhotoUrl =
    user && user.UserDetail && user.UserDetail.photoUrl
      ? user.UserDetail.photoUrl
      : null;

  return (
    <Fragment>
      <IconButton color="inherit" aria-label="Logo OnePhotos">
        <SyncAlt /> OnePhotos
      </IconButton>
      {/* <ProductHeader /> */}
      <div className={classes.grow} />
      {user && (
        <div className={classes.userMenu}>
          <IconButton
            aria-owns={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar
              aria-label="Recipe"
              className={classes.avatar}
              src={userPhotoUrl}
            >
              R
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem>Meu Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </div>
      )}
    </Fragment>
  );
};

export default AppHeader;
