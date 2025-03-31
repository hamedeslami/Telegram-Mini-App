import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const BoxStyled = styled(Box)(() => ({
  '& .loginPageHeader': {
    "& h1": {
      fontSize: "1.18rem",
      fontWeight: "bold"
    },
    '& p': {
        margin: "10px 0",
        '& a': {
            marginLeft: "10px",
            textDecoration: "none"
        }
    }
  },
  '& .loginPageForm': {
    marginTop: "25px",
  }
}));
