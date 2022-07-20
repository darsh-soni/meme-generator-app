import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  FormControl,
  TextField,
  Button,
  Box,
  makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  btnMargin: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  btnWidth: {
    width: '40%',
  },
  memeImg: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  textInput: {
    width: '48%',
    marginBottom: '1rem',
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
}));

const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;

const Form = () => {
  const [top, setTop] = useState('');
  const [meme, setMeme] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);

  const history = useHistory();

  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  useEffect(() => {
    axios.get('https://api.imgflip.com/get_memes').then((res) => {
      const memes = res.data.data.memes;
      shuffleMemes(memes);
      setMeme(memes);
    });
  }, []);

  useEffect(() => {
    if (meme.length) {
      setCaptions(Array(meme[memeIndex].box_count).fill(''));
    }
  }, [memeIndex, meme]);

  const fillCaption = (e, index) => {
    const text = e.target.value || '';
    setTop(e.target.value);
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const generateMeme = () => {
    const currentMeme = meme[memeIndex];
    const formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);
    formData.append('template_id', currentMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

    if (top !== '') {
      fetch('https://api.imgflip.com/caption_image', {
        method: 'POST',
        body: formData,
      }).then((res) => {
        res.json().then((res) => {
          console.log(res.data.url)
          history.push(`/generated?url=${res.data.url}`);
        });
      });
    }
  };

  const classes = useStyles();
  return (
    <>
      <Box align="center" className={classes.btnMargin}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={generateMeme}
          className={classes.btnWidth}
        >
          Generate
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => {
            setMemeIndex(memeIndex + 1);
          }}
          className={classes.btnWidth}
        >
          Skip
        </Button>
      </Box>
      <div className={classes.memeImg}>
        {meme.length ? (
          <img
            src={meme[memeIndex].url}
            alt={meme[memeIndex].name}
            style={{ maxWidth: '65%', margin: 'auto', display: 'block' }}
          />
        ) : (
          ''
        )}
      </div>
      <FormControl
        className={classes.formControl}
        margin="normal"
        fullWidth={true}
      >
        {captions.map((c, index) => (
          <TextField
            key={index}
            className={classes.textInput}
            variant="outlined"
            type="text"
            label={`Enter Text ${index + 1}`}
            onChange={(e) => fillCaption(e, index)}
            multiline
          />
        ))}
      </FormControl>
    </>
  );
};

export default Form;
