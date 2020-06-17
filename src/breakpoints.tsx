interface Breakpoint {
    min: string | null;
    max: string | null;
    container: string;
    paddingX: string;
    paddingY: string;
    paddingYsm: string;
}

interface Breakpoints {
    [key: string]: Breakpoint;
}

const breakpoints: Breakpoints = {

    xs: {
        min: null,
        max: '575px',
        container: '100%',
        paddingX: '1rem',
        paddingY: '1rem',
        paddingYsm: '1rem',
    },

    sm: {
        min: '576px',
        max: '767px',
        container: '100%',
        paddingX: '1rem',
        paddingY: '1rem',
        paddingYsm: '1rem',
    },

    md: {
        min: '768px',
        max: '991px',
        container: '100%',
        paddingX: '1rem',
        paddingY: '1rem',
        paddingYsm: '1rem',
    },

    lg: {
        min: '992px',
        max: '1199px',
        container: '100%',
        paddingX: '2rem',
        paddingY: '1rem',
        paddingYsm: '1rem',
    },

    xl: {
        min: '1200px',
        max: '1599px',
        container: '1140px',
        paddingX: '2rem',
        paddingY: '2rem',
        paddingYsm: '1rem',
    },

    xxl: {
        min: '1600px',
        max: null,
        container: '1400px',
        paddingX: '2.5rem',
        paddingY: '2rem',
        paddingYsm: '1rem',
    },
};

export default breakpoints;
