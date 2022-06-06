import { Box, Card, Grid, makeStyles, Typography } from "@mui/material";
import "./AboutUs.css";

interface CardValues {
  title: string;
  description: string;
  email: string;
  phone: string;
  city: string;
  githubLink: string;
  linkedinLink: string;
}

function AboutUs(): JSX.Element {
  function getUsCard(values: CardValues) {
    //TODO: sort css
    return (
      <Grid item xs={6}>
        <Card style={{ padding: "3vh" }}>
          <Typography sx={{ padding: "1vh" }}>{values.title}</Typography>
          <Typography sx={{ padding: "1vh" }}>{values.description}</Typography>
          <Typography sx={{ padding: "1vh" }}>{values.email}</Typography>
          <Typography sx={{ padding: "1vh" }}>{values.phone}</Typography>
          <Typography sx={{ padding: "1vh" }}>{values.city}</Typography>
          <Typography sx={{ padding: "1vh" }}>{values.githubLink}</Typography>
          <Typography sx={{ padding: "1vh" }}>{values.linkedinLink}</Typography>
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
          title: "Alon Mintz",
          description: "Fullstack Developer",
          email: "alon mail",
          phone: "054-1234567(Fake)",
          city: "Tel Aviv",
          githubLink: "githubLink",
          linkedinLink: "LinkedinLink",
        })}
      </Grid>
    </div>
  );
}

export default AboutUs;
