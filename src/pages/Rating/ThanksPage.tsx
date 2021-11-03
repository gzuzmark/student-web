import { Theme, Typography } from '@material-ui/core';
import { MainLayout } from 'pages';
import React from 'react';
import { stylesWithTheme } from 'utils';
import { ReactComponent as ImgLike } from 'icons/imgLike.svg';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	layout: {
		[breakpoints.up('lg')]: {
			padding: '58px 0',
		},
	},
	container: {
		display: 'flex',
		backgroundColor: '#FFFFFF',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '40px 24px',
		[breakpoints.up('lg')]: {
			maxWidth: '1128px',
			margin: 'auto',
			paddingTop: '84px',
			paddingBottom: '53px',
			borderRadius: '0px 0px 8px 8px',
		},
	},
	title: {
		padding: '50px 8px 39px 8px',
		fontWeight: '700',
		fontFamily: 'Mulish, sans-serif',
		color: '#676F8F',
		fontSize: '24px',
		textAlign: 'center',
		[breakpoints.up('lg')]: {
			fontSize: '32px',
			padding: '36px 0',
		},
	},
	box: {
		border: '1px solid #676F8F',
		borderRadius: '16px',
		width: '100%',
		textAlign: 'center',
		[breakpoints.up('lg')]: {
			maxWidth: '500px',
		},
	},
	subtitle: {
		fontWeight: 'bold',
		fontFamily: 'Mulish, sans-serif',
		fontSize: '16px',
		color: '#676F8F',
		paddingTop: '17px',
		paddingBottom: '13px',
		borderBottom: '1px solid #676F8F',
	},
	text: {
		paddingTop: '20px',
		paddingBottom: '24px',
		fontFamily: 'Mulish',
		fontSize: '14px',
		fontWeight: '700',
	},
	footer: {
		color: '#A3ABCC',
		fontFamily: 'Mulish',
		fontSize: '10px',
		fontWeight: '600',
		lineHeight: '12px',
		padding: '36px 0',
		[breakpoints.up('lg')]: {
			fontSize: '12px',
			fontWeight: '400',
			padding: '37px 0 0',
		},
	},
}));
const ThanksPage = () => {
	const classes = useStyles();
	return (
		<>
			<MainLayout>
				<div className={classes.layout}>
					<div className={classes.container}>
						<ImgLike className={classes.clockIcon} />
						<Typography className={classes.title}>Gracias por ayudarnos a seguir mejorando</Typography>
						<div className={classes.box}>
							<Typography className={classes.subtitle}>¿Te quedaron dudas de tu cita?</Typography>
							<Typography className={classes.text}>
								Coméntanos todas tus dudas en el preriodo de estos siete días para consultarlas a tu doctor. Dejános tus
								comentarios aquí
							</Typography>
						</div>
						<Typography className={classes.footer}>Periodo de siete días desde la cita</Typography>
					</div>
				</div>
			</MainLayout>
		</>
	);
};
export default ThanksPage;
