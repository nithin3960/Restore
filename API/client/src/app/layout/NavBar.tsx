import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

type Props = {
    toggleDarkMode: () => void;
    mode: "light" | "dark";
    
};

export default function NavBar({toggleDarkMode, mode}:Props) {
  return (
    <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
            RE-STORE
            </Typography>
            <IconButton color="inherit" onClick={toggleDarkMode}>
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        </Toolbar>
    </AppBar>
  )
}