export default (openai) => async (req, res) => {
    const prompt = req.body.prompt;
    const config = req.body?.config || {};
    console.log(req.body);
  
    try {
      if (prompt == null) {
        throw new Error("Uh oh, no prompt was provided");
      }

  
      const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [{role: 'user', content: prompt}]
      });
  
      console.debug(JSON.stringify(response.data));
  
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
  