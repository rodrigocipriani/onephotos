import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";

const AppOopsRoute = () => {
  let location = useLocation();

  return (
    <Grid container>
      <Grid item xs={12} style={{ marginBottom: 16 }}>
        {location.pathname === "/oops" && (
          <Typography
            variant="h5"
            color="textSecondary"
            gutterBottom
            align="center"
          >
            Oops...
            <br />
            Essa funcionalidade ainda não está pronta!
            <br />
            Aproveite e deixe uma mensagem abaixo.
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2}>
          <iframe
            title="Formulario"
            width="100%"
            height="1100px"
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAQvrnMxUMUhEMlg3WEM4Uk9RNTY4RzRaWEJPSzFQVy4u&embed=true"
            frameBorder="0"
            marginWidth="0"
            marginHeight="0"
            style={{ border: "none", maxWidth: "100%" }}
            allowFullScreen
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            msallowfullscreen="true"
          >
            {" "}
          </iframe>
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 16 }}>
        <Typography align="center">
          Caso queira entrar em contato diretamente:
          <br />
          Rodrigo Cipriani da Rosa
          <br />
          contatoonephotos@gmail.com.br
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AppOopsRoute;
