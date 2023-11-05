
export const HEADER = {
    H_MOBILE: 64,
    H_DESKTOP: 80,
    H_DESKTOP_OFFSET: 80 - 16,
};

export const NAV = {
    WIDTH: 280,
};

export const SPACING = 8;

export const portal_config = {
    default_language: 'VN',
    default_list_languages: [
        {
            value: 'VN',
            label: 'Việt Nam',
            trans_label: 'vietnam',
            icon: '/assets/flags/vn.png'
        },
        {
            value: 'EN',
            label: 'English',
            trans_label: 'english',
            icon: '/assets/flags/en.png'
        },
    ],
    default_currency: 'đ',
    default_currency_code: 'VND',
}
