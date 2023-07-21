export default (openai) => async (req, res) => {
  const prompt = req.body.prompt;
  const config = req.body?.config || {};
  console.log(req.body);

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }

    // trigger OpenAI completion
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
    });

    console.debug(JSON.stringify(response.data));

    // retrieve the completion text from response
    const completion = response.data.choices[0].text;

    //  const completion = response.data.choices[0].message.content;

    // return the result
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
};
