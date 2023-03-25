import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LongPulling = () => {
	const [message, setMessage] = useState([]);
	const [value, setValue] = useState('');

	useEffect(() => {
		subscribe();
	}, []);

	const subscribe = async () => {
		try {
			const { data } = await axios.get('http://localhost:5000/get-messages');
			setMessage(prev => [data, ...prev]);
			await subscribe();
		} catch (error) {
			setTimeout(() => {
				subscribe();
			}, 500);
		}
	};

	const sendMessage = async () => {
		await axios.post('http://localhost:5000/new-message', {
			message: value,
			id: Date.now(),
		});
	};

	return (
		<div className="center">
			<div>
				<div className="form">
					<input
						onChange={e => setValue(e.target.value)}
						value={value}
						type="text"
					/>
					<button onClick={sendMessage}>Отправить</button>
				</div>
				<div className="messages">
					{message.map(mess => (
						<div key={mess.id} className="message">
							{mess.message}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default LongPulling;
