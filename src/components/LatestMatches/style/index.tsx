import styled from "styled-components"

export const H3 = styled.h3`
  font-family: 'Space Mono', monospace;
  color: #48525D;
`
export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ECEFF5;
  padding: 8px 16px;
  width: 300px;
  height: 700px;
  overflow: auto; /* Adicione esta linha para a barra de rolagem interna */
`;

export const ColorSquare = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  padding: 4px;
  border-radius: 4px;
  background-color: ${props => props.color ? props.color : '#FFFFFF'}

`

export const HistoryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row-nowrap;
  padding: 16px;
  gap: 8px;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
`