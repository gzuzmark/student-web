import { createRatingDoctor } from 'pages/api/rating';
import React from 'react';
import { useParams } from 'react-router';

const RatingDoctor = () => {
	const { id } = useParams<{ id: string }>();

	const saveButton = async () => {
		await createRatingDoctor(id, 3, 'Doctor es muy bueno');
	};

	return (
		<>
			<div>{id}</div>
			<div>
				<button onClick={saveButton}>Guardar</button>
			</div>
		</>
	);
};

export default RatingDoctor;
