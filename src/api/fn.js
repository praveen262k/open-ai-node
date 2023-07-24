import registry from "./function/registry";

export default (openai) => async (req, res) => {
  const prompt = req.body.prompt;
  const config = req.body?.config || {};
  
  const data = {
    model: "gpt-3.5-turbo-0613",
    messages: [{ role: "user", content: prompt }],
    functions: registry.meta,
  };

  console.debug(req.body);

  try {
    if (!prompt) {
      throw new Error("Uh oh, no prompt was provided");
    }

    let response = await openai.createChatCompletion(data);

    let choice = response.data.choices[0];
    let limit = 0;

    while (choice.finish_reason !== "stop" && limit < 10) {
      let function_call = null;
      let fnResponse = null;

      if (
        choice.finish_reason === "function_call" &&
        choice.message.role === "assistant"
      ) {
        function_call = choice.message.function_call;
        const args = JSON.parse(function_call.arguments);
        const callableFn = registry.fn[function_call.name];

        if (!callableFn) throw new Error("Invalid function");

        fnResponse = callableFn.apply(null, args);
      } // end of function callbacks

      data.messages.push({
        role: "function",
        name: function_call.name,
        content: fnResponse,
      });

      response = await openai.createChatCompletion(data);
      choice = response.data.choices[0];
      limit++;
    } // end of while loop

    const completion = response.data.choices[0].message.content;
    console.log('Request complete');
    // return the result
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
};
