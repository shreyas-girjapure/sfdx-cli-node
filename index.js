const express = require("express");
const os = require("os");
const { exec } = require("child_process");

const port = process.env.PORT || 3000;

const app = express();



app.get("/os", (req, res) => {
    const platform = os.platform();
    res.send(`This server is running on ${platform}`);
});
app.get('/execute', (req, res) => {
    const command = req.query.command;
    console.log(`command ${command}`)

    if (!command) {
        return res.status(400).send('No command provided.');
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.send(`Error executing command: ${error.message}`);
            return;
        }

        if (stderr) {
            res.send(`Command error: ${stderr}`);
            return;
        }

        res.send(`Command output:\n${stdout}`);
    });
});

//http://127.0.0.1:3000/scanAndGenerateReport?format=html&name=newClasses
app.get("/scanAndGenerateReport", (req, res) => {
    const format = req.query.format;
    const zipFileName = req.query.name;

    if (!zipFileName) {
        return res.status(400).send('No name provided.');
    }
    if (!format) {
        return res.status(400).send('No format provided.');
    }
    command = `shell-scripts/execute-scan.sh ${format} ${zipFileName}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.send(`Error executing command: ${error.message}`);
            return;
        }

        if (stderr) {
            res.send(`Command error: ${stderr}`);
            return;
        }

        res.send(`Command output:\n${stdout}`);
    });
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});
