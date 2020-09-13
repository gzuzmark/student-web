import React, { useState, ChangeEvent, useRef } from 'react';
import { FieldProps, FieldInputProps } from 'formik';
import { Theme } from '@material-ui/core';

import { stylesWithTheme } from 'utils';
import File from './File';
import { uploadFile } from 'pages/api';

const useStyles = stylesWithTheme(({ palette, breakpoints }: Theme) => ({
	input: {
		visibility: 'hidden',
	},
}));

interface FilesGroupFieldProps extends FieldProps {
	inputId: 'files-input';
}

interface FileElement {
	fileName: string;
	isLoading: boolean;
}

const updloadRecentFile = async (
	file: File,
	files: FileElement[],
	setFiles: Function,
	index: number,
	setFieldValue: Function,
	// eslint-disable-next-line
	field: FieldInputProps<any>,
	inputRef: HTMLInputElement | null,
) => {
	try {
		const fileID = await uploadFile(file);
		const newFile = { ...files[index], isLoading: false };

		setFiles([...files.slice(0, index), newFile, ...files.slice(index + 1)]);
		setFieldValue(field.name, [...field.value, fileID], false);
	} catch (e) {
		setFiles([...files.slice(0, index), ...files.slice(index + 1)]);
	} finally {
		if (inputRef) {
			inputRef.value = '';
		}
	}
};

const FilesGroupField = ({
	field,
	inputId,
	form: { touched, setFieldValue, setFieldTouched },
}: FilesGroupFieldProps) => {
	const [files, setFiles] = useState<FileElement[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const classes = useStyles();
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!touched) {
			setFieldTouched(field.name, true, false);
		}

		if (!e.target.files) {
			return;
		}

		const file = e.target.files[0];
		const fileObj = { fileName: file.name, isLoading: true };
		const newFiles = [...files, fileObj];
		setFiles(newFiles);
		updloadRecentFile(file, newFiles, setFiles, files.length, setFieldValue, field, inputRef.current);
	};
	const removeFile = (index: number) => () => {
		setFiles([...files.slice(0, index), ...files.slice(index + 1)]);
		setFieldValue(field.name, [...field.value.slice(0, index), ...field.value.slice(index + 1)], false);
	};

	return (
		<div>
			{files.map((file, index) => (
				<File key={`${file.fileName}-${index}`} {...file} onRemove={removeFile(index)} />
			))}
			<input ref={inputRef} id={inputId} type="file" className={classes.input} onChange={onChange} />
		</div>
	);
};

export default FilesGroupField;
