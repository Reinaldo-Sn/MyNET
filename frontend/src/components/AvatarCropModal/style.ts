import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
`;

export const Modal = styled.div`
  background: #111;
  border: 1px solid #1e1e1e;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  max-width: 420px;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  color: #e8e8e8;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const CropArea = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
`;

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SliderLabel = styled.span`
  font-size: 0.78rem;
  color: #666;
`;

export const Slider = styled.input`
  width: 100%;
  accent-color: #e94560;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const CancelButton = styled.button`
  padding: 0.5rem 1.1rem;
  background: transparent;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  color: #666;
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  &:hover { border-color: #444; color: #888; }
`;

export const SaveButton = styled.button`
  padding: 0.5rem 1.2rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  &:hover { background: #c73652; }
`;
