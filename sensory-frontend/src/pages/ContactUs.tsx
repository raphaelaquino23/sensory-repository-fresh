import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  },
  form: {
    backgroundColor: "white",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  submitButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
      marginLeft: 0,
      width: "100%",
    },
  },
}));

const ContactUs = () => {
  const classes = useStyles();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const email = "sensawaree@gmail.com";
    const subject = "Contact Us Form Submission";
    const body = `Name: ${data.get("name")}\nEmail: ${data.get(
      "email"
    )}\nMessage: ${data.get("message")}`;
    window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(
      body
    )}`;
  };

  return (
    <div className={classes.hero}>
      <Container>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <h1>Interested in partnerships or want to give us feedback?</h1>
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    fullWidth
                    variant="outlined"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={5}
                    name="message"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.submitButton}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactUs;
