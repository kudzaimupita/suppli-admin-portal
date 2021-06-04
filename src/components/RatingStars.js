import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function HalfRating({ rating }) {
  const classes = useStyles();
  console.log(rating);
  return (
    <div className={classes.root}>
      <Rating
        name="size-small"
        precision={0.5}
        defaultValue={rating}
        size="small"
        readOnly
      />
    </div>
  );
}
