import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  return (
    <button type="button" onClick={props.onClick} className="Button">
      {props.children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: 'smooth',
// });

// Мой вариант
// element.scrollIntoView({
//     behavior: 'smooth',
//     block: 'end',
// });
