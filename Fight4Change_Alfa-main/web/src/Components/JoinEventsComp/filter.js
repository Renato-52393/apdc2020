import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import { FilterBtn, BtnLink } from '../Elements';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            width: 'auto',
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(6),
            marginRight: theme.spacing(6),
        },
    },

    textField: {
        width: 200,
    },

    filter: {
        marginLeft: theme.spacing(6),
    },

    apl: {
        marginLeft: theme.spacing(70),
    }
}));

export default function FormPropsTextFields() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={classes.filter}>
            <FilterBtn
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                Filters
            </FilterBtn>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="date"
                            label="Data do Evento"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="begin"
                            label="Local de Partida"
                        />

                    </div>

                </form><BtnLink className={classes.apl}>Show</BtnLink>
            </Collapse>
        </div>
    );
}