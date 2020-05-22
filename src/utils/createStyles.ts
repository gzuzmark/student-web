import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// eslint-disabled-next-line
type stylesFactory = (theme: Theme) => any;

export const stylesWithTheme = (stylesCallback: stylesFactory) =>
	makeStyles((theme: Theme) => createStyles(stylesCallback(theme)));
