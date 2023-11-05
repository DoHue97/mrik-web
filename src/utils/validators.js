import i18next from 'i18next';

const required = value => (value ? undefined : i18next.t("required"));
const validEmail = value => (value && !value.match(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) ? i18next.t('enter_valid_email') : undefined);
const mustBeNumberRequired = value => (!value||isNaN(value) ? i18next.t("must_be_enter_number") : undefined);

const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);

export default {
    composeValidators,
    required,
    validEmail,
    mustBeNumberRequired,
}