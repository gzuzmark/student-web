import React, { MouseEvent } from 'react';

import { ReactComponent as PencilIcon } from 'icons/pencil.svg';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(() => ({
	overlay: {
		alignItems: 'center',
		backgroundColor: 'rgba(53, 53, 53, 0.6)',
		borderRadius: '4px',
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
}));

interface EditOverlayProps {
	onClick?: (e: MouseEvent) => void;
}

const EditOverlayPatient = ({ onClick }: EditOverlayProps) => {
	const classes = useStyles();

	return (
		<div className={classes.overlay} onClick={onClick}>
			<PencilIcon />
		</div>
	);
};

export default EditOverlayPatient;
