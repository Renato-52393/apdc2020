import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './FormP.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: theme.spacing(-62),
  },
  formControl: {
    marginTop: theme.spacing(2),
  },
  formControl1: {
    marginLeft: theme.spacing(-8),
    marginTop: theme.spacing(5),
    
  },
  formControl2: {

    marginTop: theme.spacing(5),
  },
}));

export default function CheckboxesGroup() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    cat0: false,
    cat1: false,
    cat2: false,
    cat3: false,
    cat4: false,
    cat5: false,
    cat6: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { cat0, cat1, cat2, cat3, cat4, cat5, cat6} = state;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <label className="profile-label">Choose your Preferences</label>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={cat0} onChange={handleChange} name="cat0" color="secondary"/>}
            label="Food"
          />
          <FormControlLabel
            control={<Checkbox checked={cat1} onChange={handleChange} name="cat1" color="primary"/>}
            label="Animals"
          />
          <FormControlLabel
            control={<Checkbox checked={cat2} onChange={handleChange} name="cat2" color="primary"/>}
            label="Children"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl1}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={cat3} onChange={handleChange} name="cat3" color="primary"/>}
            label="Donation"
          />
          <FormControlLabel
            control={<Checkbox checked={cat4} onChange={handleChange} name="cat4" color="primary"/>}
            label="Hospital"
          />
          <FormControlLabel
            control={<Checkbox checked={cat5} onChange={handleChange} name="cat5" color="primary"/>}
            label="Elders"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl2}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={cat6} onChange={handleChange} name="cat6" color="primary"/>}
            label="Personal Requests"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}