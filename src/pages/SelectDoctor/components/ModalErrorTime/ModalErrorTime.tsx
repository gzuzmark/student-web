import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import AppContext from 'AppContext';
import React, { useContext } from 'react';
import useStyles from './styles';

interface ModalErrorTimeProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	onClose?: () => void;
	message: string;
	redirect?: boolean;
}

const ModalErrorTime = ({ isOpen, setIsOpen, onClose, message, redirect = false }: ModalErrorTimeProps) => {
	const classes = useStyles();
	const { useCase } = useContext(AppContext);

	const handleClose = (): void => {
		setIsOpen(false);
		if (onClose) {
			onClose();
		}
	};

	const onClick = () => {
		const baseUrl = window.location.origin;
		window.location.href = `${baseUrl}/seleccionar_doctor?malestar=${useCase?.id}`;
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth={'xs'}>
			<DialogTitle className="">¡¡ Lo sentimos !!</DialogTitle>
			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{redirect ? (
					<Button className={classes.dateButton} variant="contained" onClick={onClick}>
						Regresar
					</Button>
				) : (
					<Button className={classes.dateButton} variant="contained" onClick={handleClose}>
						Cerrar
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default ModalErrorTime;
