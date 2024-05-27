import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const MarqueeContainer = styled(Box)({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  background: '#0fedfc',
});

const MarqueeContent = styled(Box)({
  display: 'inline-block',
  paddingRight: '100%',
  animation: 'marquee 25s linear infinite',
});

const marqueeKeyframes = `
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
`;

const MarqueeSlider = ({ children }) => {
  return (
    <MarqueeContainer>
      <style>
        {marqueeKeyframes}
      </style>
      <MarqueeContent>
        {children}
      </MarqueeContent>
    </MarqueeContainer>
  );
};

export default MarqueeSlider;
