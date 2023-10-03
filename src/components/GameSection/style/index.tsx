import styled from "styled-components"

export const H1 = styled.h1`
  color: #48525D;
  font-family: 'Lato', sans-serif;
  font-size: 40px;
  font-weight: 600;
  // , sans-serif;
`

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: red;
  width: 100%;
  gap: 40px;
`
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const Header = styled.div`
  display: flex;
  font-family: 'Space Mono', monospace;
  font-weight: 600;
  text-transform: uppercase;
  color: #48525D;
  flex-direction: row nowrap;
  // border: 2px solid #626F7D;
  border-radius: 8px;
  background-color: rgba(239, 239, 239, 0.6);
`

export const RemainingTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
`

export const Timer = styled.div`
  font-weight: 600;
  font-size: 24px;
`

export const ScoresDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  & div:first-child {
    // border-bottom: 2px solid #626F7D;

  }
`

export const ScoreDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  padding: 4px 16px;
  flex-direction: row-nowrap;
  height: 50%;
`

export const StartButton = styled.button`
  border-radius: 0px;
  // background-color: rgba(170,177,187, 0.8);
  background-color: #913BF2;
  color: #FFFFFF;
  border: none;
  // outline: 2px solid #626F7D;
  padding: 16px;

  &:hover {
    background-color: rgba(170,177,187, 1.0);
    background-color: #7f11e0;
    transition: transform .2s ease-out;

  }
`
export const ColorWrapper = styled.div`
  // width: 100%;
  height: 240px;
  background-color: ${props => props.color ? props.color : '#FFFFFF'}

`
export const ComponentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row nowrap;
  // outline: 2px solid #626F7D;
  border-radius: 4px;
  gap: 16px;
`

export const ColorButton = styled.button`
  padding: 16px 16px;
  width: calc(100%/3);
  // outline: 2px solid #626F7D;
  border: none;
  background-color: rgba(239, 239, 239, 0.6);

  &:hover {
    background-color: rgba(239, 239, 239, 1.0);
  }
`

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #ccc;
  position: relative;
`

export const ProgressFill = styled.div`
  width: ${props => (props.timer / 30) * 100}%;
  height: 100%;
  background-color: ${props => {
    const percent = (props.timer / 30) * 100;
    if (percent >= 1 && percent <= 30) {
      return '#EB5757';
    } else if (percent >= 31 && percent <= 60) {
      return '#F2C94C';
    } else if (percent >= 61 && percent <= 100) {
      return '#219653';
    }
    return 'gray';
  }};
  transition: width 0.2s ease-in-out, background-color 0.2s ease-in-out;
`

export const StyledButton = styled.button`
  border-radius: 0px;
  background-color: rgba(236, 239, 245, 0.6);
  color: #333333;
  border: none;
  border-radius: 8px;
  padding: 16px;

  &:hover {
    background-color: rgba(236, 239, 245, 1);
    transition: transform .2s ease-out;
  }
`