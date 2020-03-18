import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { scrollbarWidth } from '../../util';
const useStyles = createUseStyles(({
    hideBodyScrollbar: {
        position: 'absolute',
        zIndex: -1
    }
}));

const HideBodyScrollbar = () => {
    const classes = useStyles();
    useEffect(() => {
        if (window.innerWidth > document.documentElement.clientWidth) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.paddingRight = null;
            document.body.style.overflow = null;
        };
    }, []);

    return <div className={classes.hideBodyScrollbar}></div>;
};

export { HideBodyScrollbar };