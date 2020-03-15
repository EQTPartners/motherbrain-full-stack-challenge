import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';

interface MenuBarProps {
  isBackArrowVisible: boolean;
  handleBackButtonClick: () => void;
  title: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'absolute',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const MenuBar: React.FC<MenuBarProps> = (props: MenuBarProps) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        {props.isBackArrowVisible ? (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => props.handleBackButtonClick()}
          >
            <ArrowBack />
          </IconButton>
        ) : null}
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
