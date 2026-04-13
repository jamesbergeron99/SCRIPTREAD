const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/api/tts', async (req, res) => {
    try {
        const response = await fetch("https://api.inworld.ai/tts/v1/voice", {
            method: "POST",
            headers: { 
                "Authorization": `Basic ${process.env.REACT_APP_INWORLD_KEY}`, 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                text: req.body.text, 
                voiceId: req.body.voiceId || "Abby", 
                modelId: "inworld-tts-1.5-max" 
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: "Server Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));