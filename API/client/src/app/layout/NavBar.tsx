import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ShoppingCart } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../../features/account/accountApi";

type Props = {
  toggleDarkMode: () => void;
  mode: "light" | "dark";

};

const midlinks = [
  { Title: 'catalog', path: '/catalog' },
  { Title: 'about', path: '/about' },
  { Title: 'contact', path: '/contact' },
]

const rightlinks = [
  { Title: 'login', path: '/login' },
  { Title: 'register', path: '/register' },
]

const Navstyles = {
  color: 'inherit', Typography: 'h6',
  textDecoration: 'none',
  '&:hover': {
    color: 'grey.500',
  },
  '&.active': {
    color: '#baecf9'
  },
}
export default function NavBar(
  { toggleDarkMode, mode }: Props) {

  const {data: user} = useUserInfoQuery();
  const { isLoading } = useAppSelector(state => state.ui);
  const { data: basket } = useFetchBasketQuery();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
        <Box display="flex" alignItems='center'>
          <Typography component={NavLink} sx={Navstyles} to='/' variant="h6">
            RE-STORE
          </Typography>
          <IconButton color="inherit" sx={{ flexGrow: 0.01 }} onClick={toggleDarkMode}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <List sx={{ display: 'flex' }}>
          {midlinks.map(({ Title, path }) =>
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={Navstyles}>{Title.toUpperCase()}</ListItem>
          )}
        </List>
        <Box display="flex" alignItems='center'>
          <IconButton component={Link} to='/basket' size="large" sx={{ color: 'inherit' }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>

          </IconButton>
          {user? (
            <UserMenu user={user}/>
          ):(
            <List sx={{ display: 'flex' }}>
            {rightlinks.map(({ Title, path }) =>
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={Navstyles}>{Title.toUpperCase()}</ListItem>
            )}
          </List>
          )}
          
        </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: '100%' }}> <LinearProgress color="secondary" />
          <LinearProgress color="success" />
          <LinearProgress color="inherit" /></Box>
      )}
    </AppBar>
  )
}