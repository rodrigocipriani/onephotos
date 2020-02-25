import React, { Fragment } from "react";
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

const TitleComponent = ({ title, subtitle, anchorName, actions }) => {
  return (
    <List style={{ padding: 0 }}>
      <ListItem style={{ padding: 0 }}>
        <ListItemText
          style={{ padding: 0 }}
          primary={
            <Fragment>
              <Typography id={anchorName} variant="h4">
                {title}
              </Typography>
              <Divider />
            </Fragment>
          }
          secondary={
            subtitle && <Typography variant="body1">{subtitle}</Typography>
          }
        />
        <ListItemSecondaryAction>{actions}</ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};
export default TitleComponent;
