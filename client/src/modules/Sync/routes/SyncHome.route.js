import { Grid } from "@material-ui/core";
import React from "react";
import TitleComponent from "../../../components/TitleComponent";

const SyncHomeRoute = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TitleComponent title="Sincronizar" />
      </Grid>
      <Grid item xs={12}>
        Sincronizar
      </Grid>
    </Grid>
  );
};
export default SyncHomeRoute;
