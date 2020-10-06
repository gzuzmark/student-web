import React, { useState, FC, useContext } from 'react';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

import { stylesWithTheme } from 'utils';
import { RightLayout, ProfileList, EditOverlay } from 'pages/common';
import AppContext, { User } from 'AppContext';

import EditFamilyMemberForm from './EditFamilyMemberForm';
import { NewProfile } from './NewProfile';

const useStyles = stylesWithTheme(({ breakpoints }: Theme) => ({
	wrapper: {
		textAlign: 'center',
		padding: '28px 0',
		[breakpoints.up('lg')]: {
			textAlign: 'left',
			padding: '87px 0 0 0',
		},
	},
	title: {
		paddingBottom: '34px',
		[breakpoints.up('lg')]: {
			paddingBottom: '41px',
		},
	},
	profileList: {
		paddingBottom: '44px',
		[breakpoints.up('lg')]: {
			'&&': {
				justifyContent: 'flex-start',
				paddingBottom: '47px',
			},
		},
	},
	editWrapper: {
		padding: '0 26px 30px 26px',
		[breakpoints.up('lg')]: {
			padding: '0 0 87px 0',
		},
	},
	editTitleWrapper: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between',
		paddingBottom: '37px',
		[breakpoints.up('lg')]: {
			width: '403px',
		},
	},
	editButtonWrapper: {
		textAlign: 'center',
	},
	editButton: {
		fontSize: '15px',
		padding: '10px 15px',
		textTransform: 'none',
		width: '197px',
		[breakpoints.up('lg')]: {
			padding: '6.5px 15px',
		},
	},
	deleteButton: {
		textTransform: 'none',
		padding: '10px 15px',
		fontSize: '15px',
		[breakpoints.up('lg')]: {
			padding: '6.5px 15px',
		},
	},
}));

interface EditOverlayWrapperProps {
	user: User;
}

const EditOverlayWrapper = (onClick: (user: User) => () => void): FC<EditOverlayWrapperProps> => ({
	user,
}: {
	user: User;
}) => <EditOverlay onClick={onClick(user)} />;

const RightSide = () => {
	const { t } = useTranslation('familyMembers');
	const classes = useStyles();
	const [editEnable, setEditEnable] = useState<boolean>(false);
	const [showEditForm, setShowEditForm] = useState<boolean>(false);
	const [editableUser, setEditableUser] = useState<User>();
	const [isShowingNewProfile, setIsShowingNewProfile] = useState<boolean>(false);
	const { user, updateState: updateContextState } = useContext(AppContext);
	const toggleEditEnable = () => {
		setEditEnable(!editEnable);
	};
	const closeNewProfileForm = () => {
		setIsShowingNewProfile(false);
	};
	const onClickOverlay = (user: User) => () => {
		setShowEditForm(true);
		setEditableUser(user);
	};
	const cancelAction = () => {
		setEditEnable(false);
		setShowEditForm(false);
		setEditableUser(undefined);
	};
	const redirectNewAccountCallback = () => {
		setIsShowingNewProfile(true);
	};
	const onUserCardClick = (user: User) => {
		if (updateContextState) {
			updateContextState({
				user,
				reservationAccountID: user.id,
				patientUser: null,
			});
		}
	};

	return (
		<RightLayout>
			<div className={classes.wrapper}>
				{showEditForm && editableUser ? (
					<div className={classes.editWrapper}>
						<div className={classes.editTitleWrapper}>
							<Typography variant="h1">
								<b>{t('familyMembers.editProfile.title')}</b>
							</Typography>
							<Button className={classes.deleteButton} variant="outlined">
								{t('familyMembers.editProfile.delete')}
							</Button>
						</div>
						<EditFamilyMemberForm user={editableUser} cancelAction={cancelAction} />
					</div>
				) : null}
				{isShowingNewProfile ? <NewProfile currentUser={user} closeForm={closeNewProfileForm} /> : null}
				{!(showEditForm && editableUser) && !isShowingNewProfile ? (
					<>
						<Typography className={classes.title} variant="h1">
							<b>{t('familyMembers.title')}</b>
						</Typography>
						<ProfileList
							className={classes.profileList}
							editEnable={editEnable}
							editOverlay={EditOverlayWrapper(onClickOverlay)}
							onUserCardClick={onUserCardClick}
							redirectNewAccountCallback={redirectNewAccountCallback}
							addUserLabel={t('familyMembers.linkAccount.label')}
						/>
						<div className={classes.editButtonWrapper}>
							<Button onClick={toggleEditEnable} className={classes.editButton} variant="outlined">
								{editEnable ? t('familyMembers.disableEditProfile') : t('familyMembers.editProfile')}
							</Button>
						</div>
					</>
				) : null}
			</div>
		</RightLayout>
	);
};

export default RightSide;
