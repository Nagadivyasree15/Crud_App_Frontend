import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyle = makeStyles({
  header: {
    background: '#111111',
  },
  tabs: {
    color: '#FFFFFF',
    textDecoration: 'none',
    marginRight: 20,
    fontSize: 20,
  },
});

const NavBar = () => {
  const classes = useStyle();
  return (
    <AppBar className={classes.header} position="static">
      <Toolbar>
        <NavLink to="./" className={classes.tabs}>
          All Users
        </NavLink>
        <NavLink to="add" className={classes.tabs}>
          Add User
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
