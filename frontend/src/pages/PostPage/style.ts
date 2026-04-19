import styled from "styled-components";

export const Container = styled.div`
  max-width: 580px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #555;
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
  padding: 0;
  align-self: flex-start;
  transition: color 0.15s;
  &:hover { color: #e8e8e8; }
`;
