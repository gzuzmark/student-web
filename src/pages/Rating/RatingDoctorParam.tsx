import { createRatingDoctor } from 'pages/api/rating';
import React, { useState } from 'react';
import { useParams } from 'react-router';

const RatingDoctor = () => {
	const { id } = useParams<{ id: string }>();
	const [message, setMessage] = useState<string | null>(null);

	const saveButton = async () => {
		const resp = await createRatingDoctor(id, 3, 'Doctor es muy bueno', 2);
		if (resp.ok) {
			// mensaje cuando es registrado
			setMessage(resp.message);
		} else {
			// mensaje cuando falla el POST
			setMessage(resp.message);
		}
	};

	return (
		<>
			<div>{id}</div>
			<div>
				<button onClick={saveButton}>Guardar</button>
			</div>
			{message != null && <span>{message}</span>}
		</>
	);
};

export default RatingDoctor;
