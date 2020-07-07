import React, { useState } from 'react';
import { Theme } from '@material-ui/core/styles';

import { Container, Circle } from 'pages/common';
import { stylesWithTheme } from 'utils';
import { BACKGROUND_DEFAULT } from 'theme';

import SelectProfileType from './components/SelectProfileType';
import MinorSignUp from './components/MinorSignUp';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	container: {
		backgroundColor: BACKGROUND_DEFAULT,
		minHeight: 'calc(100vh - 50px)',
		[breakpoints.up('lg')]: {
			display: 'flex',
			justifyContent: 'center',
			minHeight: 'calc(100vh - 80px)',
			position: 'relative',
			overflow: 'hidden',
		},
	},
	wrapper: {
		paddingTop: '127px',
		textAlign: 'center',
	},
	prefix: {
		paddingBottom: '5px',
	},
	title: {
		paddingBottom: '20px',
		[breakpoints.up('lg')]: {
			paddingBottom: '51px',
		},
	},
	desktopCircle: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'block',
		},
	},
}));

const SELECT_PROFILE_TYPE = 'SELECT_PROFILE_TYPE';
const MINOR_SIGN_UP = 'MINOR_SIGN_UP';

const CreateProfile = () => {
	const [step, setStep] = useState(SELECT_PROFILE_TYPE);
	const [familyRelationship, setFamilyRealtionship] = useState('');
	const classes = useStyles();
	const createMinorProfile = (relation: string) => {
		setStep(MINOR_SIGN_UP);
		setFamilyRealtionship(relation);
	};

	return (
		<Container className={classes.container}>
			{step === SELECT_PROFILE_TYPE ? <SelectProfileType onSubmit={createMinorProfile} /> : null}
			{step === MINOR_SIGN_UP ? <MinorSignUp familyRelationship={familyRelationship} /> : null}
			<Circle className={classes.desktopCircle} radius="80" right="-104" bottom="-122" />
		</Container>
	);
};

export default CreateProfile;
