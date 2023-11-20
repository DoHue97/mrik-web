import { Box, Button, Grid, Stack, Typography, alpha, useTheme } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone'
import { useTranslation } from "react-i18next";
import { DeleteIcon, FileDownloadIcon, iconFontSize } from "./Icons";
import Modal from "./Modal";
import PropTypes from "prop-types";

function UploadFile(props) {
    const { t } = useTranslation();
    const { onUploadFile, isMultipleFile } = props;
    const { palette } = useTheme();

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewIndex, setPreviewIndex] = useState(undefined);
    const [allFile, setAllFiles] = useState([]);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [showPreview, setShowPreview] = useState(true);

    const onDrop = (acceptedFiles) => {
        var _allFile = acceptedFiles;
        if (showPreview) {
            acceptedFiles.forEach((file) => {
                console.log("AAAA file: ", file);
                Object.assign(file, {
                    uri: file ? URL.createObjectURL(file) : null,
                    // formattedSize: formattedSize(file.size),
                    id: new Date().getTime(),
                    // file_type: file.type,
                    // file_name: file.name,
                    // file_size: file.size,
                })
                let blob = new Blob([file], { type: file.type });
                setSelectedFile(file);
                setPreviewIndex(0);
                setDownloadUrl(window.URL.createObjectURL(blob));
            })
            _allFile = allFile;
            if (isMultipleFile) _allFile.push(...acceptedFiles);
            else {
                _allFile = [...acceptedFiles]
            }
            setAllFiles(_allFile);
            // if (onUploadFile) onUploadFile(_allFile);
        }
    }

    const formattedSize = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        let k = 1024;
        let dm = decimals < 0 ? 0 : decimals;
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat(bytes / Math.pow(k, i)).toFixed(dm) + ' ' + sizes[i];
    }

    const onDeleteFile = (file, i) => {
        let filterFiles = allFile.filter((f, index) => index != i);
        setAllFiles(filterFiles);
    }

    const onSave = () => {
        if (props.onUploadFile) props.onUploadFile(allFile);
        props.onClose();
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <Modal isOpen={props.isOpen}
            onClose={props.onClose}
            title={t('upload_file')}
            enableCloseButton
        >
            <section>
                <center>
                    {(!allFile || (allFile.length == 0)) && <div {...getRootProps()} style={{
                        border: '1px solid ' + alpha(palette.grey[500], 0.24),
                        padding: 10,
                        borderRadius: 8,
                        cursor: 'pointer'
                    }}>
                        <FileDownloadIcon size={iconFontSize.xxl} />
                        <input {...getInputProps()} />
                        <Typography variant="subtitle2">{t('upload_file_desc')}</Typography>
                    </div>}
                </center>
                {showPreview && <Grid item container justifyContent={'center'} xs={12} marginTop={2}>
                    {allFile.map((f, i) => {
                        return (
                            <Box key={i} position={'relative'} width={'100%'} height={'100%'} marginRight={1}>
                                <img alt={f.name} src={f.uri} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                <Box position={'absolute'} right={0} top={0} onClick={() => onDeleteFile(f, i)}>
                                    <Box sx={{ cursor: 'pointer' }} display={'flex'} my={0.5} mx={0.5} justifyContent={'center'} alignItems='center' width={25} height={25} borderRadius={1} backgroundColor={palette.background.main}>
                                        <DeleteIcon size={'18px'} />
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                </Grid>}
                <Stack direction={'row'} justifyContent={'flex-end'} spacing={1} alignItems={'center'} mt={2}>
                    <Button variant='contained' onClick={() => onSave()}>{t('btn_save')}</Button>
                    <Button variant='outlined' onClick={props.onClose}>{t('btn_cancel')}</Button>
                </Stack>
            </section>
        </Modal>
    )
}

UploadFile.propTypes = {
    isOpen: PropTypes.bool,
    isMultipleFile: PropTypes.bool,
    onClose: PropTypes.func,
    onUploadFile: PropTypes.func,
}

export default UploadFile;