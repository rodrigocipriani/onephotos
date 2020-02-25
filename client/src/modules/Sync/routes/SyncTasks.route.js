import { Grid } from "@material-ui/core";
import React from "react";
import TitleComponent from "../../../components/TitleComponent";
import FrameContainer from "../../../components/FrameContainer";

const SyncTasksRoute = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TitleComponent
          title="Tarefas"
          subtitle="Caso você ainda não tem acesso, solicite ao síndico ou ao conselho."
        />
      </Grid>
      <Grid item xs={12}>
        <img src="https://trello.com/b/WjwOdi69.png" />
        {/* <FrameContainer url="https://trello.com/b/WjwOdi69/residencial-boulevard-caymmi" /> */}
      </Grid>
    </Grid>
  );
};
export default SyncTasksRoute;
