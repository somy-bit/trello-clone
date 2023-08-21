const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey:process.env.OPEN_API_KEY
});

const openApi = new OpenAIApi(configuration)

export default openApi