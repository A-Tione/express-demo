import express from 'express';
const app = express();
const port = 3000;

app.get('/xx', (req, res) => res.send('你好'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
