import { Box, Card, Grid, Link, makeStyles, Typography } from "@mui/material";
import "./AboutUs.css";

interface CardValues {
  title: string;
  // description: string;
  email: string;
  githubLink: string;
  linkedinLink: string;
}

function AboutUs(): JSX.Element {
  function getUsCard(values: CardValues) {
    //TODO: sort css
    return (
      <Grid item xs={6}>
        <Card style={{ padding: "3vh", margin: "2vh" }}>
          <Typography sx={{ padding: "1vh" }}>{values.title}</Typography>
          {/* <Typography sx={{ padding: "1vh" }}>{values.description}</Typography> */}
          <Typography sx={{ padding: "1vh" }}>{values.email}</Typography>
          {/* <Typography sx={{ padding: "1vh" }}>{values.githubLink}</Typography> */}
          {/* <Typography sx={{ padding: "1vh" }}>{values.linkedinLink}</Typography> */}
          <Link target="_blank" href={values.githubLink}>
            Github
          </Link>
          <br />
          <Link target="_blank" href={values.linkedinLink}>
            Linkedin
          </Link>
        </Card>
      </Grid>
    );
  }

  return (
    <div className="AboutUs">
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ padding: "5vh" }}
      >
        {getUsCard({
          title: "Nir Katz",
          email: "nirkatz20exc@gmail.com",
          githubLink: "https://github.com/tamboor",
          linkedinLink: "https://www.linkedin.com/in/nir-katz20/",
        })}
        {getUsCard({
          title: "Alon Mintz",
          email: "alonmintz@gmail.com",
          githubLink: "https://github.com/alonmintz",
          linkedinLink: "https://www.linkedin.com/in/alon-mintz/",
        })}
        {getUsCard({
          title: "Ran Manor",
          email: "Raran937@gmail.com",
          githubLink: "https://github.com/ran-manor",
          linkedinLink: "https://www.linkedin.com/in/ran-manor-7b86ab186/",
        })}
      </Grid>
    </div>
  );
}

export default AboutUs;
