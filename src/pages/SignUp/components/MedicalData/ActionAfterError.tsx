import { useState, useEffect } from 'react';

interface ActionAfterErrorProps {
	submitCount: number;
	isValid: boolean;
	isSubmitting: boolean;
	onSubmitError: Function;
}

const ActionAfterError = ({ submitCount, isValid, onSubmitError, isSubmitting }: ActionAfterErrorProps) => {
	const [lastHandled, setLastHandled] = useState(0);
	useEffect(() => {
		if (submitCount > lastHandled && !isSubmitting && !isValid) {
			onSubmitError();
			setLastHandled(submitCount);
		}
	}, [submitCount, isValid, onSubmitError, lastHandled, isSubmitting]);

	return null;
};

export default ActionAfterError;
