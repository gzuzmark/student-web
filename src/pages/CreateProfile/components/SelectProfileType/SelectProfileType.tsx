import React, { useState } from 'react';
import { Theme } from '@material-ui/core/styles';

import { FloatCard } from 'pages/common';
import { stylesWithTheme } from 'utils';

import SelectType from './SelectType';
import NewAdultProfile from './NewAdultProfile';
import NewMinorProfile from './NewMinorProfile';

const ADULT_PROFILE = 'ADULT_PROFILE';
const MINOR_PROFILE = 'MINOR_PROFILE';

interface StylesProps {
	profileType: string;
}

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		marginTop: '66px',
		padding: '0 20px',
		[breakpoints.up('lg')]: {
			marginTop: '135px',
			padding: '0',
		},
	},
	cardContent: {
		textAlign: 'center',
		[breakpoints.up('lg')]: {
			padding: ({ profileType }: StylesProps) => (profileType === MINOR_PROFILE ? '49px 0 0 69px' : '82px 0 0 0'),
		},
	},
}));

interface SelectProfileTypeProps {
	onSubmit: (familyRelationship: string) => void;
}

const SelectProfileType = ({ onSubmit }: SelectProfileTypeProps) => {
	const [profileType, setProfileType] = useState<string>('');
	const classes = useStyles({ profileType });
	const onSelectAdultType = () => {
		setProfileType(ADULT_PROFILE);
	};
	const onSelectMinorType = () => {
		setProfileType(MINOR_PROFILE);
	};
	const cardHeight = profileType === MINOR_PROFILE ? '375' : '312';

	return (
		<div className={classes.wrapper}>
			<FloatCard width="856" height={cardHeight}>
				<div className={classes.cardContent}>
					{profileType === '' ? (
						<SelectType onSelectAdult={onSelectAdultType} onSelectMinor={onSelectMinorType} />
					) : null}
					{profileType === ADULT_PROFILE ? <NewAdultProfile /> : null}
					{profileType === MINOR_PROFILE ? <NewMinorProfile onSubmit={onSubmit} /> : null}
				</div>
			</FloatCard>
		</div>
	);
};

export default SelectProfileType;
