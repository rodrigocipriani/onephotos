import { Tooltip, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { Home, Mail, RssFeed, AssignmentTurnedIn } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRouteSelector } from "./../../../helpers/router/Route.hook";

const useStyles = makeStyles(theme => ({
  linkItem: {
    textDecoration: "none",
    color: "#333"
  }
}));

const AppMenu = () => {
  const classes = useStyles();
  const { appRoutes, syncSlugRoutes } = useRouteSelector();
  const { syncSlug } = useSelector(store => store.syncSlice);

  return (
    <div style={{ height: "100%" }}>
      <Divider />
      <List>
        {appRoutes && (
          <Link to={appRoutes.AppHomeRoute.path} className={classes.linkItem}>
            <ListItem button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
        )}
        <Divider />
        {/* {appRoutes && (
          <Link
            to={appRoutes.AppSuggestsPage.path}
            className={classes.linkItem}
          >
            <ListItem button>
              <ListItemIcon>
                <Mail />
              </ListItemIcon>
              <ListItemText primary={"Sugestões"} />
            </ListItem>
          </Link>
        )} */}
      </List>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          color: "#e0e0e0",
          fontSize: "90%"
        }}
      >
        <Tooltip title="Criado por 🞄 Rodrigo Cipriani da Rosa">
          <Typography variant="caption" style={{ color: "#e0e0e0" }}>
            OnePhotos - V1
          </Typography>
        </Tooltip>
      </div>
    </div>
  );
};

export default AppMenu;
