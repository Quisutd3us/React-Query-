import { useRandom } from "./hooks/useRandom";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@mui/material";
import { ElectricBolt } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  padding: "2rem 1rem",
}));

export const AppReactQuery = () => {
  const query = useRandom();
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
            {query.isFetching ? (
              <Typography>Loading...</Typography>
            ) : (
              !query.isError && (
                <Typography
                  component="p"
                  variant="h5"
                >
                  Crypto Random Number: {query.data}
                </Typography>
              )
            )}
            {query.isError && <h2>{`${query.error}`}</h2>}
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
            onClick={() => query.refetch()}
            disabled={query.isFetching}
            variant="contained"
            endIcon={<ElectricBolt />}
            size={"large"}
          >
            New
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
