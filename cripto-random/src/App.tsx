import { useEffect, useReducer, useState } from "react";

import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ElectricBolt } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  padding: "2rem 1rem",
}));

const getRandomNumberFromAPI = async (): Promise<number> => {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );
  // throw new Error("Something is Wrong ...");
  const numberString = await res.text();
  return +numberString;
};

export const App = () => {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string>();
  const [key, forceRefetch] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setIsLoading(true);
    getRandomNumberFromAPI()
      .then((promiseNumber) => setNumber(promiseNumber))
      .catch((error) => setIsError(error.message));
  }, [key]);

  useEffect(() => {
    if (number) setIsLoading(false);
  }, [number]);

  useEffect(() => {
    if (isError) setIsLoading(false);
  }, [isError]);

  return (
    <>
      <Grid
        container
        spacing={2}
        direction={"column"}
        wrap="nowrap"
        justifyContent={"space-evenly"}
        alignItems={"center"}
        gap={5}
        sx={{
          // border: "solid",
          padding: "20% ",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            // border: "solid blue",
            textAlign: "center",
          }}
        >
          <Typography variant="h3">Cryptographic Numbers App</Typography>
        </Grid>

        <Grid
          item
          flexGrow={3}
          xs={12}
          sx={
            {
              // border: "solid green",
            }
          }
        >
          <Item>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              !isError && (
                <Typography
                  component="p"
                  variant="h5"
                >
                  Crypto Random Number: {number}
                </Typography>
              )
            )}
            {isError && <h2>{isError}</h2>}
          </Item>
        </Grid>

        <Grid
          item
          sx={
            {
              // border: "solid red",
            }
          }
        >
          <Button
            onClick={forceRefetch}
            disabled={isLoading}
            variant="contained"
            endIcon={<ElectricBolt/>}
            size={"large"}
          >
            New 
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
