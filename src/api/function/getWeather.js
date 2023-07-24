const getWeather = (location, greeting = 'Namashte', unit = "fahrenheit") =>
  JSON.stringify({
    location: location,
    temperature: "30",
    unit: unit,
    greeting,
    forecast: ["sunny", "windy"],
  });

const getWeatherMeta = {
  name: "get_current_weather",
  description: "Get the current weather in a given location",
  parameters: {
    type: "object",
    properties: {
      unit: {
        type: "string",
        enum: ["celcius", "fahrenheit"],
      },
      greeting: {
        type: "string",
        description: "Greeting message to be returned to display to the customer",
      },
      location: {
        type: "string",
        description: "The city and state, e.g. San Francisco, CA",
      },
    },
    required: ["location"],
  },
};

export default {
  fn: getWeather,
  meta: getWeatherMeta,
};
