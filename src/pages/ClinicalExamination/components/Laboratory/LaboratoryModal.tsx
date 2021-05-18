import React, { ReactElement } from 'react';
import { Divider, Modal, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
// import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';
import { FloatCard } from 'pages/common';
import { Laboratory } from 'types';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	card: {
		left: '50%',
		position: 'relative',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		width: '327px',
		// [breakpoints.up('lg')]: {
		// 	width: '856px',
		// },
	},
	wrapper: {
		// textAlign: 'center',
		padding: '58px 30px 58px',
		[breakpoints.up('lg')]: {
			// padding: '75px 107px 0',
		},
	},
	title: {
		paddingBottom: '28px',
		[breakpoints.up('lg')]: {
			paddingBottom: '39px',
		},
	},
	actions: {
		[breakpoints.up('lg')]: {
			display: 'flex',
			justifyContent: 'space-between',
		},
	},
	action: {
		// width: '180px',
		// marginBottom: '25px',
		[breakpoints.up('lg')]: {
			width: '300px',
			marginBottom: '0',
		},
		margin: '0 auto',
		width: 'fit-content',
		marginTop: '2rem',
		marginBottom: '2rem',
		padding: '18px 0',
		textTransform: 'none',
	},
	divider: {
		marginBottom: '37px',
	},
}));

interface LaboratoryModalProps {
	laboratory: Laboratory | null;
	isOpen: boolean;
	onClose: () => void;
}

const LaboratoryModal = ({ laboratory, isOpen, onClose }: LaboratoryModalProps): ReactElement | null => {
	// const { t } = useTranslation('selectDoctor');
	const classes = useStyles();
	const matches = useMediaQuery(({ breakpoints }: Theme) => breakpoints.up('lg'));

	return (
		<Modal open={isOpen} onClose={onClose} style={{ margin: '0 auto !important' }}>
			<FloatCard className={classes.card} height={matches ? 450 : 365} width={matches ? 500 : 327} mobile>
				<div className={classes.wrapper}>
					{/* <Typography variant="h2" className={classes.title}> */}
					{/* Detalles de exámenes a realizar 						 */}
					{/* </Typography> */}
					<h2 className={classes.title}>Detalles de exámenes a realizar</h2>

					<div className={classes.fieldWrapper}>
						{laboratory?.laboratory_exams.map((x) => (
							<p style={{ display: 'flex' }} key={x.name}>
								<span>{x.name}</span>
								<span style={{ margin: '0 0 0 auto' }}>S/. {x.price}</span>
							</p>
						))}
						<Divider className={classes.divider} />
						<p style={{ display: 'flex' }}>
							<span>Costo de servicio</span>
							<span style={{ margin: '0 0 0 auto' }}>S/. 0</span>
						</p>
						<p style={{ display: 'flex', fontWeight: 'bold' }}>
							<span>Total:</span>
							<span style={{ margin: '0 0 0 auto' }}>S/. {laboratory?.total_cost}</span>
						</p>
					</div>
					<div className={classes.actions}>
						<Button className={classes.action} variant="outlined" onClick={onClose}>
							<span>Listo</span>
						</Button>
					</div>
				</div>
			</FloatCard>
		</Modal>
	);
};
export default LaboratoryModal;
