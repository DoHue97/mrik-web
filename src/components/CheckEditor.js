import React, { useState } from "react";
import PropTypes from "prop-types";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box } from "@mui/material";
import './ckeditor.css'

function CheckEditor(props) {
    const { data, id, onChange, minHeight, height } = props;

    return (
        <Box minHeight={minHeight ? minHeight : 250} height={height ? height : undefined}>
            <CKEditor
                editor={ClassicEditor}
                id={id}
                data={data}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    let contentHtml = editor.getData();
                    console.log({ event, editor, data });
                    if (onChange) onChange(contentHtml);
                }}
                onBlur={(event, editor) => {
                }}
                onFocus={(event, editor) => {
                }}
            />
        </Box>
    )
}
CheckEditor.propTypes = {
    id: PropTypes.string,
    disabled: PropTypes.bool,
    data: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
}

export default CheckEditor;
