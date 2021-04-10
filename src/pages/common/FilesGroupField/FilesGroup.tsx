import React, { useState } from 'react';
import { FieldProps } from 'formik';
import { Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDropzone } from 'react-dropzone';
import { ReactComponent as BackArrow } from 'icons/straight-arrow-left.svg';

import { stylesWithTheme } from 'utils';
import File from './File';
import { uploadFile } from 'pages/api';

interface StylesProps {
	hasFiles: boolean;
}

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	input: {
		visibility: 'hidden',
	},
	dropzone: {
		borderWidth: 0.5,
		borderRadius: 3,
		borderStyle: 'dashed',
		borderColor: palette.info.main,
		backgroundColor: 'rgba(30,205,150,0.05)',
		color: '#bdbdbd',
		alignItems: 'center',
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		padding: '20px',
		outline: 'none',
		transition: 'border .24s ease-in-out',
		cursor: 'pointer',
		marginBottom: ({ hasFiles }: StylesProps) => (hasFiles ? '15px' : '0px'),
		[breakpoints.up('lg')]: {
			marginBottom: ({ hasFiles }: StylesProps) => (hasFiles ? '25px' : '0px'),
			display: 'block',
			padding: '20px 15px',
		},
	},
	uploadIcon: {
		width: '36px',
		height: '36px',
		boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
		backgroundColor: 'white',
		borderRadius: '50%',
		margin: '0 auto 17.5px',
		padding: '8.25px',
	},
	arrow: {
		'& > *': {
			stroke: palette.primary.main,
		},
		width: '36px',
		height: '36px',
		transform: 'rotate(90deg)',
	},
	labelText: {
		fontSize: '13px',
		lineHeight: '18px',
		[breakpoints.up('lg')]: {
			fontSize: '15px',
			lineHeight: '20px',
		},
	},
	optionalMobile: {
		fontSize: '11px',
		lineHeight: '18px',
		fontStyle: 'italic',
		color: palette.info.main,
		[breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	optionalDesktop: {
		display: 'none',
		[breakpoints.up('lg')]: {
			display: 'inline',
			fontSize: '15px',
			lineHeight: '20px',
			fontStyle: 'italic',
		},
	},
}));

interface FilesGroupFieldProps extends FieldProps {
	inputId: 'files-input';
	isOptional?: boolean;
	labelText?: string;
}

interface FileElement {
	fileName: string;
	isLoading: boolean;
}

const updloadRecentFile = async (
	droppedFiles: File[],
	newFiles: FileElement[],
	setFiles: Function,
	setFieldValue: Function,
	fieldValue: any,
) => {
	try {
		const fileIds = await Promise.all(droppedFiles.map((file) => uploadFile(file)));
		const loadedFiles = newFiles.map((newFile) => ({ ...newFile, isLoading: false }));

		setFiles(loadedFiles);
		setFieldValue([...fieldValue, ...fileIds]);
	} catch (e) {
		const filesWithoutFails = newFiles.filter(
			(file) => droppedFiles.findIndex((droppedFile) => droppedFile.name === file.fileName) > -1,
		);

		setFiles(filesWithoutFails);
	}
};

const FilesGroupField = ({
	field,
	form: { touched, setFieldValue, setFieldTouched },
	inputId,
	isOptional = false,
	labelText,
}: FilesGroupFieldProps) => {
	const [files, setFiles] = useState<FileElement[]>([]);
	const classes = useStyles({ hasFiles: files.length > 0 });
	const updateFieldValue = (value: any) => {
		setFieldValue(field.name, [...value], false);
	};
	const removeFile = (index: number) => () => {
		setFiles([...files.slice(0, index), ...files.slice(index + 1)]);
		setFieldValue(field.name, [...field.value.slice(0, index), ...field.value.slice(index + 1)], false);
	};
	const onDrop = (droppedFiles: File[]) => {
		if (!touched) {
			setFieldTouched(field.name, true, false);
		}

		const formattedFiles = droppedFiles.map((file) => ({ fileName: file.name, isLoading: true }));
		const newFiles = [...files, ...formattedFiles];

		setFiles(newFiles);
		updloadRecentFile(droppedFiles, newFiles, setFiles, updateFieldValue, field.value);
	};

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<div>
			<div {...getRootProps()} className={classes.dropzone}>
				<input {...getInputProps()} id={inputId} />
				<div className={classes.uploadIcon}>
					<BackArrow className={classes.arrow} />
				</div>
				{!!labelText && (
					<>
						<Typography component="span" className={classes.labelText}>
							{labelText}
						</Typography>{' '}
					</>
				)}
			</div>
			{files.map((file, index) => (
				<File key={`${file.fileName}-${index}`} {...file} onRemove={removeFile(index)} />
			))}
		</div>
	);
};

export default FilesGroupField;
