import React from 'react';

const Star = ({ handleClick }) => {
  const [background, setBackground] = React.useState('none');
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={background}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onMouseEnter={() => setBackground('currentColor')}
      onMouseLeave={() => setBackground('none')}
      className="pointer"
      onClick={() => handleClick()}
      data-testid="starMessage"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default Star;
