import React from 'react'
import { useSelector } from 'react-redux'

import { 
  H3,
  HistoryRow,
  ColorSquare, 
  SectionWrapper 
} from './style'

import checkSVG from '../../assets/check.svg'
import errorSVG from '../../assets/error.svg'

const LatestMatches: React.FC = () => {

  const history  = useSelector((state) => state.history)

  return (
    <SectionWrapper>
      <H3>
        Current/Latest game
      </H3>
      {
        history ? (
          history.map((history, index) => (
            <HistoryRow
              key={index}
            >
              <ColorSquare
                color={history.guessedColor}
              >
                {history.guessedColor}
              </ColorSquare>
              {history.isCorrect ? <img src={checkSVG}/> :  <img src={errorSVG}/>} {history.time}s
            </HistoryRow>
          ))
        ) : <></>
      }
      
    </SectionWrapper>
  )
}

export default LatestMatches