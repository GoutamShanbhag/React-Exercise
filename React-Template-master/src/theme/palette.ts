import {
    alpha,
    PaletteColorOptions,
    PaletteOptions,
    SimplePaletteColorOptions
} from '@mui/material';

const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
    500_8: alpha('#919EAB', 0.08),
    500_12: alpha('#919EAB', 0.12),
    500_16: alpha('#919EAB', 0.16),
    500_24: alpha('#919EAB', 0.24),
    500_32: alpha('#919EAB', 0.32),
    500_48: alpha('#919EAB', 0.48),
    500_56: alpha('#919EAB', 0.56),
    500_80: alpha('#919EAB', 0.8)
};

const PRIMARY: PaletteColorOptions = {
    light: '#6A39F1',
    main: '#00AB55',
    dark: '#3E0EC3',
    contrastText: '#fff'
};

const SECONDARY: PaletteColorOptions = {
    light: '#84A9FF',
    main: '#3366FF',
    dark: '#1939B7',
    contrastText: '#fff'
};

const INFO: PaletteColorOptions = {
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    contrastText: '#fff'
};

const SUCCESS: PaletteColorOptions = {
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    contrastText: GREY[800]
};
const WARNING: PaletteColorOptions = {
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    contrastText: GREY[800]
};
const ERROR: PaletteColorOptions = {
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    contrastText: '#fff'
};

export const WHITE = {
    main: '#FFFFFF'
};

export const NEUTRAL = {
    default: '#555770',
    darker: '#1C1C28',
    dark: '#8E90A6',
    light: '#EBEBF0',
    main: '#28293D',
    contrastText: '#fff'
};

export const PURPLE = {
    lighter: '#FFE5FF',
    dark: '#6600CC'
};
export const palette: PaletteOptions = {
    common: { black: '#000', white: '#fff' },
    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    info: { ...INFO },
    success: { ...SUCCESS },
    warning: { ...WARNING },
    error: { ...ERROR },
    grey: GREY,
    divider: GREY[500_24],
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: '#fff', default: '#fff' },
    action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48
    }
};
