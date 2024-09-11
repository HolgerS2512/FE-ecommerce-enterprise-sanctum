import React, { useState } from 'react'

const WebImage = ({ src, alt = '', fallbackSrc, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      {...props}
    />
  );
};

export default WebImage
