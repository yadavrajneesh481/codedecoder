const axios = require("axios");

exports.explainController =  async (req, res) => {
    try {
        let { code } = req.body;

        if (!code.trim()) {
            return res.status(400).json({ error: "No Code Provided!..." })
        }

        const prompt = `Explain the following code in proper markdown format so it can be formatted using React.Markdown and only include the code explanation in response :
        ${code}`

        const result = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.1-8b-instant",
                messages: [{ role: "user", content: prompt }]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 30000,
            }
        );

        const aiText =
            result?.data?.choices?.[0]?.message?.content ||
            result?.data?.choices?.[0]?.text ||
            null;

        if (!aiText) {
            return res.status(502).json({ error: "No AI output received." });
        }

        return res.json({ output: aiText });

    } catch (error) {
        console.log('Error explaining code:', error.response?.data || error.message);

        if (error.response) {
            return res.status(error.response.status).json({
                error: "API Request Failed",
                details: error.response.data,
            });
        }

        return res.status(500).json({
            error: "AI request failed",
            message: error.message
        });
    }
};
