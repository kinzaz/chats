const express = require('express');
const cors = require('cors');
const events = require('events');

const emitter = new events.EventEmitter();

const app = express();

const PORT = 5000;
app.use(cors());
app.use(express.json());

app.get('/get-messages', (req, res) => {
	emitter.once('newMessage', message => {
		res.json(message);
	});
});

app.post('/new-message', (req, res) => {
	const message = req.body;
	emitter.emit('newMessage', message);
	res.status(200);
});

app.listen(PORT, () => {
	console.log(`Подключено к PORT ${PORT}`);
});
