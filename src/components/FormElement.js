import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TextFieldCustom(props) {
    const { t } = useTranslation();
    const { value, defaultValue, name, type, label, endIcon, startIcon, onChange, onBlur } = props;
    return (
        <TextField
            name={name}
            label={t(label)}
            type={type}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {startIcon}
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        {endIcon}
                    </InputAdornment>
                ),
            }}
            value={value ? value : defaultValue}
            onChange={(event) => {
                onChange(event)
            }}
            onBlur={(event) => {
                onBlur(event)
            }}
        />
    )
}