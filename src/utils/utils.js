import { format, getTime, formatDistanceToNow } from 'date-fns';
import numeral from 'numeral';
import i18next from 'i18next';

// ----------------------------------------------------------------------

//#region number
export function fShortenNumber(number) {
    const format = number ? numeral(number).format('0.00a') : '';
    return result(format, '.00');
}

function result(format, key = '.00') {
    const isInteger = format.includes(key);
    return isInteger ? format.replace(key, '') : format;
}

export function fNumber(number) {
    return numeral(number).format();
}

export function formatFloat(value) {
    if (!value)
        return '';
    if (value == '')
        return;
    let val = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return val;
}

export function parseFloat(value) {
    if (!value)
        return '';
    if (value == '')
        return;
    let val = value.toString().replace(/,/g, '');
    //val = val.toString().match(/\d*\.?\d{0,2}/);
    val = val.toString().match(/\d*\.?\d*/);
    //val = numeral(val[0]).format('0.00');
    val = val[0];
    //console.log('Parse Float: ' + value + ' to ' + val);
    return val;
}

export function parseAPIFloat(value) {
    if (!value)
        return '';
    if (value == '')
        return;
    let val = value.toString().replace(/,/g, '');
    val = val.toString().match(/\d*\.?\d{0,2}/);
    val = numeral(val[0]).format('0.00');
    // console.log('Parse Float for API: ' + value + ' to ' + val);
    return val;
}
//#endregion

//#region datetime

export function fDate(date, newFormat) {
    const fm = newFormat || 'dd MMM yyyy';

    return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
    const fm = newFormat || 'dd MMM yyyy p';

    return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
    return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
    return date
        ? formatDistanceToNow(new Date(date), {
            addSuffix: true,
        })
        : '';
}

export function formatDateToDDMMYYYYFrEpoch(epochTime, normal) {
    var d = new Date(epochTime * 1000); // The 0 there is the key, which sets the date to the epoch
    return normal ? formatDateToDDMMYYYY(d) : formatDateToMonthNameAndDayOfWeek(d);
}

export function formatDateTimeFrEpoch(epochTime, isOrg, disableSecond) {
    var d = new Date(epochTime * 1000); // The 0 there is the key, which sets the date to the epoch
    if (isOrg) return d;
    return formatDateTime(epochTime, disableSecond);
}

export function formatDateTime(epochTime, disableSecond) {
    var date = new Date(epochTime * 1000);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var hours = date.getHours()
    var minutes = date.getMinutes();
    var second = date.getSeconds();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (second < 10) second = '0' + second;
    var time = hours + ":" + minutes;
    if (!disableSecond) {
        time = time + ":" + second;
    }
    var dateFormatted = day + '/' + month + '/' + date.getFullYear() + " " + time;

    return dateFormatted;
}
export function formatDateToDDMMYYYY(date) {
    var date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    var dateFormatted = day + '/' + month + '/' + date.getFullYear();
    return dateFormatted;
}

export function formatDateToDDMMYYYYHHSSFrEpoch(epochTime, withDate) {
    var d = new Date(epochTime * 1000); // The 0 there is the key, which sets the date to the epoch
    return formatDateTimeToMonthNameAndDayOfWeek(d, withDate);
}

export function formatDateToShortMonthName(date) {
    var date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth();
    if (day < 10) day = '0' + day;
    var months = createShortMonth();
    month = months[month];
    var dateFormatted = day + ' ' + month + ' ' + date.getFullYear();
    return dateFormatted;
}

export function formatDateTimeToMonthNameAndDayOfWeek(date, withDate) {
    var date = new Date(date);
    var dayOfWeeks = createShortDayOfWeek();
    var dayOfWeek = dayOfWeeks[date.getDay()];
    if (withDate) return dayOfWeek + '. ' + formatDateTimeToShortMonthName(date);
    else return formatDateTimeToShortMonthName(date);
}
export function formatDateTimeToShortMonthName(date, withSecond) {
    var date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth();
    if (day < 10) day = '0' + day;
    var months = createShortMonth();
    month = months[month];
    var hours = date.getHours()
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (second < 10) second = '0' + second;
    var time = hours + ":" + minutes
    if (withSecond)
        time = time + ":" + second;
    var dateFormatted = day + ' ' + month + ' ' + date.getFullYear() + " " + time;
    return dateFormatted;
}

export function formatDateToDDMMYYYYHHMMFrEpoch(epochTime, withSecond) {
    var d = new Date(epochTime * 1000); // The 0 there is the key, which sets the date to the epoch
    return formatDateTimeToShortMonthName(d, withSecond);
}

export function formatDateToMonthNameAndDayOfWeek(date) {
    var date = new Date(date);
    var dayOfWeeks = createShortDayOfWeek();
    var dayOfWeek = dayOfWeeks[date.getDay()];

    return dayOfWeek + '. ' + formatDateToShortMonthName(date);
}
export function createShortDayOfWeek() {
    var day = i18next.t('SHORTDAYS', { returnObjects: true });
    let days = [
        day.SUNDAY,
        day.MONDAY,
        day.TUESDAY,
        day.WEDNESDAY,
        day.THURSDAY,
        day.FRIDAY,
        day.SATURDAY,
    ];
    return days;
}
export function createShortMonth() {
    var month = i18next.t('SHORTMONTH', { returnObjects: true });
    let months = [
        month.JAN,
        month.FEB,
        month.MAR,
        month.APR,
        month.MAY,
        month.JUN,
        month.JUL,
        month.AUG,
        month.SEP,
        month.OCT,
        month.NOV,
        month.DEC,
    ];

    return months;
}
export function createFullMonth() {
    var month = i18next.t('MONTH', { returnObjects: true });
    let months = [
        month.JAN,
        month.FEB,
        month.MAR,
        month.APR,
        month.MAY,
        month.JUN,
        month.JUL,
        month.AUG,
        month.SEP,
        month.OCT,
        month.NOV,
        month.DEC,
    ];

    return months;
}

export function createDayOfWeek() {
    let day = i18next.t('DAYS', { returnObjects: true })
    let days = [
        day.SUNDAY,
        day.MONDAY,
        day.TUESDAY,
        day.WEDNESDAY,
        day.THURSDAY,
        day.FRIDAY,
        day.SATURDAY,
    ];
    return days;
}

//#endregion


export function mappingValue(value) {
    let translateValue = "";
    if (value) {
        if (value == 'DRAFT') {
            translateValue = 'draft'
        } else if (value == 'CANCELLED') {
            translateValue = 'cancelled'
        } else if (value == 'NEW') {
            translateValue = 'new'
        } else if (value == 'COMPLETED') {
            translateValue = 'completed'
        } else if (value == 'PENDING') {
            translateValue = 'pending'
        } else if (value == 'ORDER') {
            translateValue = 'order'
        } else if (value == 'PAYMENT') {
            translateValue = 'payment'
        } else if (value == 'INVOICE') {
            translateValue = 'invoice'
        } else if (value == 'IN_PROGRESS') {
            translateValue = 'in_progress'
        } else if (value == 'PAID') {
            translateValue = 'paid'
        } else if (value == 'DELIVERED') {
            translateValue = 'delivered'
        } else if (value == 'STOCK_OUT_REQUEST') {
            translateValue = 'stock_out_request'
        } else {
            translateValue = value
        }
    }
    return translateValue;
}

export function mappingRoleTypes(type, t) {
    if (type == 'ADMIN') {
        return t('admin_role');
    } else if (type == 'ACCOUNTANT') {
        return t('accountant_role')
    } else if (type == 'BUSINESS') {
        return t('business_role')
    } else if (type == 'PRODUCTS_OFFERS') {
        return t('products_offers_role')
    }
    else return type;
}

export function replaceParamTranslation(string, params) {
    let str = string;
    if (!str) {
        return string;
    }
    if (params && params.length > 0) {
        for (let i = 0; i < params.length; i++) {
            let value = params[i];
            str = str.replace(`{${i}}`, value);
        }
    }
    return str;
}
