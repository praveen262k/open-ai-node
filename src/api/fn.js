export default (openai) => async (req, res) => {
  const prompt = req.body.prompt;
  const config = req.body?.config || {};
  const data = {
    model: "gpt-3.5-turbo-0613",
    messages: [{ role: "user", content: prompt }],
    functions: [
      {
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city and state, e.g. San Francisco, CA",
            },
            unit: {
              type: "string",
              enum: ["celcius", "fahrenheit"],
            },
          },
          required: ["location"],
        },
      },
    ],
  };

  console.log(req.body);

  const getWeather = (location, unit = "fahrenheit") =>
    JSON.stringify({
      location: location,
      temperature: "30",
      unit: unit,
      forecast: ["sunny", "windy"],
    });

  try {
    
    if (!prompt) {
      throw new Error("Uh oh, no prompt was provided");
    }

    let response = await openai.createChatCompletion(data);

    let choice = response.data.choices[0];

    while (choice.finish_reason !== "stop") {
      let function_call = null;
      let fnResponse = null;
      
      if (
        choice.finish_reason === "function_call" &&
        choice.message.role === "assistant"
      ) {

        function_call = choice.message.function_call;
        const args = JSON.parse(function_call.arguments);

        switch (function_call.name) {
          case "get_current_weather":
            fnResponse = getWeather(args.location, args.unit);
            break;
          default:
            throw new Error("Unknown function " + function_call.name);
        }
      } // end of function callbacks

      data.messages.push({
        role: "function",
        name: function_call.name,
        content: fnResponse,
      });

      response = await openai.createChatCompletion(data);
      choice = response.data.choices[0];
    } // end of while loop

    const completion = response.data.choices[0].message.content;

    // return the result
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
};
