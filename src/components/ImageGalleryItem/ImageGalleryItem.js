import React from 'react';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ images, onClick }) {
  const { webformatURL, tags } = images;

  return (
    <li className="ImageGalleryItem" onClick={onClick}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
