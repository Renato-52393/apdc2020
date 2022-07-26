import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),

  },
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default function EventCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleCheck = () => {
    //if(Checkbox.checkedIcon)
    setOpen(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.layout}>
        <Card className={classes.root}>
          <CardHeader
          /*
            avatar={
              <Avatar aria-label="recipe" className={classes.large}>
                R
              </Avatar>
            }
            */
            titleTypographyProps={{ variant: 'h5' }}
            title={props.event.eventsName}

          />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p" id="date" type="date">
              Date: {props.event.date}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p" id="hour">
              Time: {props.event.time}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p" id="begin">
              Start: {props.event.origin}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <FormControlLabel
              onChange={handleCheck}
              control={<Checkbox
                icon={
                  <DirectionsRunIcon color="disabled" fontSize="large" />}
                checkedIcon={
                  <DirectionsRunIcon color="primary" fontSize="large" />
                }
                name="checked" />}
              label="Join the Event"
            />
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              backgroundcolor="white"
              message="Welcome to the Event!"
            />
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography color="primary">Description:</Typography>
              <Typography color="textSecondary" id="description" paragraph>
                {props.event.description}
              </Typography>
              <Typography color="primary">Stops:</Typography>
              <Typography color="textSecondary" id="stops" paragraph>
                {props.event.markers}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </div>

  );
}