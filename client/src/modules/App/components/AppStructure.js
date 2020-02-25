import {
  Grid,
  SwipeableDrawer,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppHeader from "./AppHeader";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1)
  }
}));

const LOCAL_STORAGE_VAR_NAME = "AppSkeleton";
const INITIAL_SIDE_MENU_STATE = true;

const AppStructure = ({ children, menu }) => {
  const theme = useTheme();
  let location = useLocation();
  const classes = useStyles();

  const isTemporaryMenu = useMediaQuery(theme.breakpoints.only("xs"));

  let localStorageVar = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_VAR_NAME)
  );

  const sideMenuIsOpen = localStorageVar
    ? localStorageVar.sideMenuIsOpen === "true"
    : INITIAL_SIDE_MENU_STATE;

  const [open, setOpen] = React.useState(sideMenuIsOpen);

  useEffect(() => {
    setOpen(!isTemporaryMenu);
  }, [isTemporaryMenu]);

  useEffect(() => {
    if (isTemporaryMenu) {
      handleDrawerClose();
    }
  }, [location.pathname]);

  const setLocalStorageSideMenu = value => {
    localStorage.setItem(
      LOCAL_STORAGE_VAR_NAME,
      JSON.stringify({ sideMenuIsOpen: value })
    );
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    setLocalStorageSideMenu("true");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setLocalStorageSideMenu("false");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <AppHeader />
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        variant={isTemporaryMenu ? "temporary" : "permanent"}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <div className={classes.toolbar}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid> </Grid>
            <Grid>
              <Typography variant="h5" style={{ color: "#e0e0e0" }}>
                OnePhotos
              </Typography>
            </Grid>
            <Grid>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </div>
        <Divider />

        {menu}
      </SwipeableDrawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default AppStructure;
