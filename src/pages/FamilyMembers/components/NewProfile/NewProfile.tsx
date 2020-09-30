import React, { ReactElement, useState, useCallback } from 'react';

import { stylesWithTheme } from 'utils';
import LinkUnderAgeAccount from 'pages/Confirmation/components/RightSide/LinkUnderAgeAccount';
import { createNewProfile } from 'pages/api';
import { User } from 'AppContext';

import NewProfileForm from './NewProfileForm';

const useStyles = stylesWithTheme(() => ({
	newProfileWrapper: {
		textAlign: 'left',
		padding: '0 26px 30px 26px',
	},
	linkAccountWrapper: {
		'&&': {
			padding: 0,
		},
	},
}));

interface NewProfileProps {
	currentUser: User | null | undefined;
	closeForm: () => void;
}

const NewProfile = ({ currentUser, closeForm }: NewProfileProps): ReactElement | null => {
	const classes = useStyles();
	const [newProfile, setNewProfile] = useState<User | null>(null);
	const onSubmitForm = (profile: User) => {
		setNewProfile(profile);
	};
	const postNewProfile = useCallback(async () => {
		if (newProfile) {
			await createNewProfile(newProfile);
		}
	}, [newProfile]);

	return (
		<div className={classes.newProfileWrapper}>
			{newProfile ? (
				<LinkUnderAgeAccount
					loggedUserName={currentUser?.name}
					activeUserName={newProfile.name}
					linkAction={postNewProfile}
					closeModalAction={closeForm}
					className={classes.linkAccountWrapper}
				/>
			) : (
				<NewProfileForm onSubmitForm={onSubmitForm} currentUser={currentUser} />
			)}
		</div>
	);
};

export default NewProfile;
