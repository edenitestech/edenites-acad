import styled from 'styled-components';

export const WaveContainer = styled.div`
  position: absolute;
  ${({ position }) => position === 'top' ? 'top: 0;' : 'bottom: 0;'}
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: ${({ flip }) => flip ? 'rotate(180deg)' : 'none'};
  z-index: 1;
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: ${({ position }) => position === 'top' ? '150px' : '120px'};
  }
`;