import { Grid, Hidden, InputAdornment, MenuItem, Select, TextField, Typography, useTheme, useThemeProps } from "@mui/material";
import React, { useState } from "react";
import { formatFloat, parseAPIFloat, parseFloat } from "../utils/utils";
import t from '../utils/translateUtil'

function TextFieldCustom({
    input: { name, onChange, value, type },
    label, color, isEdit, placeholder, dataType, formatType,
    meta, inputCss, leftIcon, leftIconAction, leftIconColor, leftIconActionDisabled, endAdornment, startAdorment,
    onCustomChange, maxLength, startPrefix, large, disableEndAdornment, rightLabelComponent, isValueNull, valuez, customLabel, isValid,
    onCustomKeyDown,
    ...rest
}) {
    if (!color) color = 'label';
    let fieldFormat = rest.fieldFormat;
    let fieldParse = rest.fieldParse;
    let fieldParseOnBlur = rest.fieldParseOnBlur;
    if (formatType === 'float') {
        fieldFormat = formatFloat;
        fieldParse = parseFloat;
        fieldParseOnBlur = parseAPIFloat;
    }
    if (valuez) {
        onChange(valuez);
    }

    let _onChange = event => {
        if (onCustomChange) {
            onCustomChange(event.target.value);
        }
        if (rest && fieldFormat == formatFloat && fieldParse == parseFloat) {
            event.persist();
            const caretStart = event.target.selectionStart;
            let value = event.target.value;
            let parsedValue = fieldParse ? fieldParse(event.target.value) : value;
            let formatedValue = parsedValue;
            if (fieldFormat) {
                formatedValue = fieldFormat(formatedValue);
            }
            let newCaretStart = caretStart + formatedValue.length - value.length;
            onChange(parsedValue);
            window.requestAnimationFrame(() => {
                event.target.selectionStart = newCaretStart
                event.target.selectionEnd = newCaretStart
            })
        } else {
            if (fieldParse)
                onChange(fieldParse(event.target.value));
            else
                onChange(event);
        }

    }

    let _onBlur = event => {
        let trimmedVal = value;
        if (value)
            trimmedVal = value.toString().trim();
        if (fieldParseOnBlur) {
            onChange(fieldParseOnBlur(trimmedVal))
        } else
            onChange(trimmedVal);
    }

    let formattedValue = fieldFormat ? fieldFormat(value) : value;
    const { palette } = useTheme();
    return (
        <Grid item xs={12}>
            <Grid item xs={12} marginBottom={1}>
                {label && <Typography variant="body2">{label}{isValid && <Typography component={'span'} color={palette.error.main}>*</Typography>}</Typography>}
            </Grid>
            <TextField
                name={name}
                type={type}
                variant='outlined'
                helperText={meta.touched ? meta.error : undefined}
                error={meta.error && meta.touched}
                placeholder={placeholder}
                onChange={_onChange}
                value={isValueNull ? '' : (valuez ? valuez : formattedValue)}
                onBlur={_onBlur}
                onKeyDown={onCustomKeyDown ? onCustomKeyDown : undefined}
                InputProps={{
                    readOnly: !isEdit,
                    endAdornment: endAdornment && <InputAdornment position="end">
                        {endAdornment}
                    </InputAdornment>
                    ,
                    startAdornment: startAdorment && <InputAdornment position="start">
                        {startAdorment}
                    </InputAdornment>
                }}
            />
        </Grid>
    )
}

function SelectCustom({
    input: { name, onChange, value, inputlabelprops, type, ...restInput },
    label, color, placeholder, dataType,
    meta, inputCss, leftIcon, leftIconAction, leftIconColor, leftIconActionDisabled, selectData, defaultValueSelect, valueSelect,
    onCustomChange, maxLength, startPrefix, large, disableEndAdornment, rightLabelComponent, onSelectedChange, isEdit, onOpenCustom,
    isValid, keyName, keyLabel,isHideLabel,
    ...rest
}) {
    console.log("AAAA defaultValueSelect: ", defaultValueSelect)
    console.log("AAAA valueSelect: ", valueSelect)
    console.log("AAAA keyName: ", keyName)
    console.log("AAAA keyLabel: ", keyLabel)
    const { palette } = useTheme();
    if(!keyName) keyName = 'value';
    if(!keyLabel) keyLabel = 'label'
    return (
        <Grid xs={12} sm={12} item>
            <Grid xs={12} sm={12} item container marginBottom={1}>
                <Grid xs={6} sm={6} item>
                    {label && <Typography variant="body2" color={color}>{label}{isValid && <Typography component={'span'} color={palette.error.main}>*</Typography>}</Typography>}
                </Grid>
                <Grid xs={6} sm={6} item container justify="flex-end">
                    {rightLabelComponent}
                </Grid>
            </Grid>
            <Grid xs={12} sm={12} item container direction="row" alignItems='center'>
                {!valueSelect && <Grid xs={10} item><Typography >{placeholder ? placeholder : t("Please Select")}</Typography></Grid>}
                {selectData && <Select
                    value={valueSelect} 
                    // renderValue={(selected) => (selected && (selected.name?selected.name:(selected.label?selected.label:valueSelect)))}
                    onChange={e => {
                        onChange(e);
                        if (onSelectedChange)
                            onSelectedChange(e)
                    }}
                    // IconComponent={ArrowDownIcon}
                    displayEmpty={true}
                    disabled={!isEdit}
                    onOpen={onOpenCustom ? onOpenCustom : null}
                    sx={{
                        '& .MuiSelect-select': {
                            height: '1.4375em'
                        }
                    }}
                >
                    {selectData.map((item, index) => {
                        var SelectIcon = item.icon;
                        console.log(item[keyLabel])
                        return (<MenuItem key={index} value={item[keyName]}>
                            <Grid xs={12} item container>
                                {item.icon && <SelectIcon />}
                                <Hidden smDown={isHideLabel}>
                                    {isEdit ? <Typography marginLeft={2}>{item[keyLabel]}</Typography> : <Typography marginLeft={2}>{item[keyLabel]}</Typography>}
                                </Hidden>
                            </Grid>
                        </MenuItem>)
                    })}
                </Select>}
                {meta.touched && <Typography type="warning" color='error' >{meta.error}</Typography>}
            </Grid>
        </Grid>

    )
}

function DateTimeTextFieldCustom({
    input: { name, onChange, value, type },
    label, color, isEdit, placeholder, dataType, formatType,
    meta, inputCss, leftIcon, leftIconAction, leftIconColor, leftIconActionDisabled, endAdornment, startAdorment,
    onCustomChange, maxLength, startPrefix, large, disableEndAdornment, rightLabelComponent, isValueNull, valuez, customLabel,
    ...rest
}) {
    let _value = value ? value : valuez;
    console.log("AAAA DateTimeTextFieldCustom _value: ", _value)
    const [formattedValue, setFormattedValue] = useState(_value ? _value : "");
    console.log("AAAA DateTimeTextFieldCustom formattedValue: ", formattedValue)

    return (
        <Grid item xs={12}>
            <Grid item xs={12} marginBottom={1}>
                {label && <Typography variant="body2">{label}</Typography>}
            </Grid>
            <TextField
                name={name}
                type={type ? type : 'date'}
                variant='outlined'
                helperText={meta.touched ? meta.error : undefined}
                error={meta.error && meta.touched}
                placeholder={placeholder}
                onChange={event => {
                    console.log("AAAA value: ", event.target.value)
                    onChange(event.target.value)
                    setFormattedValue(event.target.value);
                    if(onCustomChange) onCustomChange(event.target.value);
                }}
                value={formattedValue ? formattedValue : _value}
                defaultValue={_value ? _value : formattedValue}
                InputProps={{
                    readOnly: !isEdit,
                    endAdornment: endAdornment && <InputAdornment position="end">
                        {endAdornment}
                    </InputAdornment>
                    ,
                    startAdornment: startAdorment && <InputAdornment position="start">
                        {startAdorment}
                    </InputAdornment>
                }}
            />
        </Grid>
    )
}

function TextAreaCustom({
    input: { name, onChange, value, inputlabelprops, color, large, ...restInput },
    label, labelColor, isEdit, placeholder, rows,
    meta,
    ...rest
}) {    
    return (
        <Grid item xs={12}>
            <Grid item xs={12} marginBottom={1}>
                {label && <Typography variant="body2">{label}</Typography>}
            </Grid>
            {isEdit ? <TextField
                name={name}
                type={'text'}
                multiline={true}
                rows={rows ? rows : 3}
                helperText={meta.touched ? meta.error : undefined}
                error={meta.error && meta.touched}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                InputProps={{
                    readOnly: !isEdit,
                }}
            /> : <Typography variant="body2">{value ? value : '_'}</Typography>}
        </Grid>
    )
}

export {
    TextFieldCustom,
    SelectCustom,
    DateTimeTextFieldCustom,
    TextAreaCustom,
}