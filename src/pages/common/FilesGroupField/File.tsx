import React from 'react';
import { LinearProgress, Typography, Theme } from '@material-ui/core';

import { ReactComponent as FilledCloseIcon } from 'icons/filledClose.svg';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	wrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: '255px',
		backgroundColor: 'white',
		padding: '8px 14px 8px 18px',
		marginBottom: '10px',
	},
	iconWrapper: {
		height: '20px',
	},
}));

interface FileProps {
	fileName: string;
	isLoading: boolean;
	onRemove: () => void;
}

const File = ({ fileName, onRemove, isLoading }: FileProps) => {
	const classes = useStyles();

	return isLoading ? (
		<LinearProgress color="primary" />
	) : (
		<div className={classes.wrapper}>
			<Typography>{fileName}</Typography>
			<div className={classes.iconWrapper}>
				<FilledCloseIcon onClick={onRemove} />
			</div>
		</div>
	);
};

export default File;
