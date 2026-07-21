const express = require("express");
const { chromium } = require("playwright");

const app = express();

app.use(express.json());

app.post("/scrape", async (req, res) => {

    const { url } = req.body;

    try {

        const browser = await chromium.launch({
            headless: true
        });

        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: "networkidle"
        });

        const title = await page.title();

        const html = await page.content();

        await browser.close();

        res.json({
            success: true,
            title,
            html
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

app.listen(process.env.PORT || 3000);
