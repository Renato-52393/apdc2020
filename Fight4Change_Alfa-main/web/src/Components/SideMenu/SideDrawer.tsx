import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Avatar, Grid} from '@material-ui/core';
import './SideDrawer.css';

import {BtnLinkMenu } from '../Elements';

type Anchor = 'Menu';

export default function SideDrawer() {
    const [state, setState] = React.useState({
        Menu: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (

        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
           
            <ListItem button>
                <ListItemIcon>
                    <h1><i className="fas fa-id-card"></i></h1>
                </ListItemIcon>
                <BtnLinkMenu to="/profile"> Profile </BtnLinkMenu>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <h1><i className="fas fa-map-marked-alt"></i></h1>
                </ListItemIcon>
                <BtnLinkMenu to="/myEvents"> My Events </BtnLinkMenu>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <h1><i className="fas fa-medal"></i></h1>
                </ListItemIcon>
                <BtnLinkMenu to="/points"> Points </BtnLinkMenu>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <h1><i className="fas fa-users"></i></h1>
                </ListItemIcon>
                <BtnLinkMenu to="/companions"> Volunteer Companions </BtnLinkMenu>
            </ListItem>
            <Divider />
            <ListItem button>
                <ListItemIcon>
                    <h1><i className="fas fa-sign-out-alt"></i></h1>
                </ListItemIcon>
                <BtnLinkMenu to="/"> Log Out </BtnLinkMenu>
            </ListItem>
        </div>
    );

    return (
        <div className = 'MenuB'>
            {(['Menu'] as Anchor[]).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor} </Button>
                    <SwipeableDrawer
                        anchor="left"
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}

/* <div>
                <Grid container justify="center">
                    <Avatar alt="profilePic" src="/static/images/avatar/1.jpg" />
                </Grid>
            </div>*/