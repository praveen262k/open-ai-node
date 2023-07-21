import React, {useEffect, useRef} from "react";
import { Helmet } from "react-helmet";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Input from "@mui/base/Input";
import {
  Box,
  Button,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import axios from 'axios';

const App = () => {
  const [query, setQuery] = React.useState<string>("What is the typical weather in Chennai, does it rain xa lot");
  const defaultTheme = createTheme();

  useEffect(()=> {
    setQuery('');
  },[]);

  const queryInputElm = useRef('What is the typical weather in Chennai, does it rain xa lot');
  const modelElm = useRef();

  function sendToOpenAI(): void {
    const prompt = queryInputElm?.current?.value;
    console.log('Selected model: ' + modelElm.value);
    let endPoint = '/api/openai/ask';

    switch (modelElm.current.selectedOptions[0].value) {
      case 'text-davinci-003':
        endPoint = '/api/openai/ask';
        break;
      
      case 'gpt-3.5-turbo':
        endPoint = '/api/openai/chat';
        break;
      
      case 'gpt-3.5-turbo-0613': 
        endPoint = '/api/openai/fn';
        break;

      default:
        endPoint = '/api/openai/ask';
        break;
    }

    // if (modelElm.current.selectedOptions[0].value === 'text-davinci-003')
    axios.post(endPoint, {
      prompt
    }).then(response => {
      console.log(response.data);
      // promptResElm.innerHtml = response.data;
      setQuery(response.data.message);
    });
  }

  // function queryOnChange(evt): void {
  //   setQuery(evt.target.value);
  // }

  return (
    <div>
      <Helmet>
        <title>Explore!!!</title>
      </Helmet>
      <style
          dangerouslySetInnerHTML={{__html: `/* CSS styles for your chat interface */
          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f6f9;
          }

          #chat-container {
            width: 400px;
            margin: 50px auto;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }

          #message-container {
            padding: 20px;
            height: 300px;
            overflow-y: scroll;
          }

          .message {
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 4px;
            background-color: #f1f1f1;
          }

          .user-message {
            text-align: right;
            background-color: #0062ff;
            color: #fff;
          }

          .bot-message {
            text-align: left;
          }

          #input-container {
            display: flex;
            align-items: center;
            padding: 10px;
            background-color: #f7f7f7;
          }

          #input-field {
            flex-grow: 1;
            padding: 8px;
            border-radius: 4px;
            border: none;
          }

          #send-button {
            padding: 8px 16px;
            margin-left: 10px;
            border: none;
            border-radius: 4px;
            background-color: #0062ff;
            color: #fff;
            cursor: pointer;
          }

          #send-button:hover {
            background-color: #004cce;
          }`}}
        >
          
        </style>
      {/* <ThemeProvider theme={defaultTheme}>
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                OpenAI - Get Started
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Quick starter kit to experiment with OpenAI APIs.
              </Typography>
              <Input
                required
                id="outlined-required"
                label="Required"
                defaultValue="Hello World"
              />

              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">Main call to action</Button>
              </Stack>
            </Container>
          </Box>
        </main>
      </ThemeProvider> */}

      <div id="chat-container">
        <div id="message-container">
          {/* <!-- Messages will be dynamically added here --> */}
          {query}
        </div>
        <div id="input-container">
          <input ref={queryInputElm} type="text" id="input-field" placeholder="Type your message..." />
          <button id="send-button" onClick={sendToOpenAI}>Send</button>
        </div>
        <div id="input-container">
          <select ref={modelElm} id="model" name="model">
            <option value="text-davinci-003">text-davinci-003</option>
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            <option value="gpt-3.5-turbo-0613">function</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default App;

