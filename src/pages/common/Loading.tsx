import React, { ReactNode } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as LoadingIcon } from 'icons/rotation-right.svg';
import { stylesWithTheme } from 'utils';

const useStyles = stylesWithTheme(() => ({
	'@global': {
		'@keyframes spin': {
			'0%': {
				transform: 'rotate(0deg)',
			},
			'100%': {
				transform: 'rotate(360deg)',
			},
		},
	},
	wrapper: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		minHeight: '102px',
		minWidth: '202px',
		padding: '31px 26px 39px',
	},
	iconWrapper: {
		paddingBottom: '12px',
	},
	icon: {
		animation: 'spin 1.5s linear infinite',
		transform: 'rotate(0deg)',
	},
	waitMsgWrapper: {
		paddingBottom: '12px',
	},
	loadingMessage: {
		width: '180px',
		textAlign: 'center',
	},
}));

interface LoadingContainerProps {
	fullScreen: boolean;
	children: ReactNode;
}

interface LoadingProps {
	fullScreen?: boolean;
	loadingMessage?: string;
}

const LoadingContainer = ({ fullScreen = false, children }: LoadingContainerProps) =>
	fullScreen ? <Dialog open={true}>{children}</Dialog> : <div>{children}</div>;

const Loading = ({ fullScreen = false, loadingMessage }: LoadingProps) => {
	const classes = useStyles();

	return (
		<LoadingContainer fullScreen={fullScreen}>
			<div className={classes.wrapper}>
				<div className={classes.iconWrapper}>
					<LoadingIcon className={classes.icon} />
				</div>
				<div className={classes.waitMsgWrapper}>
					<Typography variant="h3">UN MOMENTO</Typography>
				</div>
				<Typography className={classes.loadingMessage}>{loadingMessage}</Typography>
			</div>
		</LoadingContainer>
	);
};

export default Loading;
