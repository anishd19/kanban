import { Card } from "@mui/material";
import { styled } from "@mui/material";

export const CardsListContainer = styled(Card)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: ${theme.spacing(3)};
    padding: ${theme.spacing(3)};
    min-width: 350px;
    background-color: ${theme.palette.grey.lighter};
  `
);
