import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import OptsElements from './OptsElements';
import create from '../../Images/criar.svg';
import event from '../../Images/eventos.svg';
import savedR from '../../Images/rotasG.svg';

import { BtnRoute, BtnLinkRoute, BtnLinkEvent, BtnLinkLRoute } from '../Elements';

const featuredPosts = [

    {
        id: 1,
        title: 'Create an Event',
        description:
            'Create Events which can be shared with your peers.',
        image: create,
        imageText: 'Image Text',

    },
    {
        id: 2,
        title: 'Join an Event',
        description:
            'Join an event in which multiple volunteers follow the same path simultaneously.',
        image: event,
        imageText: 'Image Text',
        href: "/joinEvent",
    },
    {
        id: 3,
        title: 'Try out previous Events',
        description:
            'Experience a prior Event on your own. We have them all saved here!',
        image: savedR,
        imageText: 'Image Text',
        href: "/eventList",
    },
];

export default function RoutesOptions() {

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" >
                <main>
                    <Grid container spacing={4}>

                        {featuredPosts.map((post) => (
                            <OptsElements key={post.title} post={post} />
                        ))}
                    </Grid>
                    <BtnRoute>
                        <BtnLinkRoute to="/createEvent"> Create an Event! </BtnLinkRoute>
                    </BtnRoute>
                    <BtnRoute>
                        <BtnLinkEvent to="/joinEvent"> Join an Event! </BtnLinkEvent>
                    </BtnRoute>
                    <BtnRoute>
                        <BtnLinkLRoute to="/eventList"> Try a saved Event! </BtnLinkLRoute>
                    </BtnRoute>
                </main>
            </Container>
        </React.Fragment>
    );
}