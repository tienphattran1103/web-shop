import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import style from './Helmet.module.scss'

function Helmet({ title, children }) {
    document.title = 'Yolo - ' + title;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <div>{children}</div>;
}

Helmet.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default Helmet;
