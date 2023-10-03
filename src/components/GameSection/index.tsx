import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import {
  H1,
  SectionWrapper,
  ComponentsContainer,
  HeaderContainer,
  Header,
  RemainingTime,
  Timer,
  StartButton,
  ScoresDiv,
  ScoreDiv,
  ColorWrapper,
  ButtonsContainer,
  ColorButton,
  ProgressFill,
  ProgressBar,
  StyledButton
} from './style'
import { saveHistory } from '../../redux/historySlice'
import { useDispatch } from 'react-redux'

const GameSection: React.FC = () => {

  type GameResult = {
    correctColor: string
    guessedColor: string
    isCorrect: boolean
    time: number
    score: number
  }

  const dispatch = useDispatch()
  const [currentColor, setCurrentColor] = useState<string>('')
  const [options, setOptions] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState<number>(0)
  const [highScore, setHighScore] = useState<number>(
    Number(localStorage.getItem('highScore')) || 0
  )
  const [gameHistory, setGameHistory] = useState<GameResult[]>(
    JSON.parse(localStorage.getItem('gameHistory') || '[]')
  )
  const [timer, setTimer] = useState<number>(30)
  const [roundTimer, setRoundTimer] = useState<number>(10)

  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [gameTimerInterval, setGameTimerInterval] = useState<NodeJS.Timeout | null>(null)

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const startGame = () => {
    setGameStarted(true)
    startRound()

    const gameInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1)
    }, 1000)

    setGameTimerInterval(gameInterval)

    setTimeout(() => {
      clearInterval(gameInterval)
      setGameStarted(false)
    }, 30000)
  }

  const startRound = () => {
    const newColor = generateRandomColor()
    const newOptions = generateOptions(newColor)

    setCurrentColor(newColor)
    setOptions(newOptions)
    setIsCorrect(null)

    const interval = setInterval(() => {
      setRoundTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1
        } else {
          clearInterval(interval)
          return 0
        }
      })
    }, 1000)

    setIntervalId(interval)

    setTimeout(() => {
      clearInterval(interval)
    }, 10000)
  }

  const generateRandomColor = (): string => {
    return (
      '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    )
  }

  const generateOptions = (correctColor: string): string[] => {
    const options = [correctColor]
    const hexOptions = []

    while (hexOptions.length < 3) {
      const randomColor = generateRandomColor()

      if (!options.includes(randomColor)) {
        hexOptions.push(randomColor)
      }
    }

    const randomIndex = Math.floor(Math.random() * 3)
    hexOptions[randomIndex] = correctColor

    return shuffleArray(hexOptions)
  }

  const shuffleArray = (array: string[]): string[] => {
    const shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = shuffledArray[i]
      shuffledArray[i] = shuffledArray[j]
      shuffledArray[j] = temp
    }
    return shuffledArray
  }

  const checkAnswer = (selectedColor: string) => {
    if (selectedColor === currentColor && roundTimer > 0) {
      setIsCorrect(true)
      setScore((prevScore) => prevScore + 5)
      if (score >= highScore)
        setHighScore(score)
      
    } else if (selectedColor !== currentColor && roundTimer > 0) {
      setIsCorrect(false)
      setScore((prevScore) => (prevScore - 1 > 0 ? prevScore - 1 : 0))
    } else {
      setIsCorrect(false)
      setScore((prevScore) => (prevScore - 2 > 0 ? prevScore - 2 : 0))
    }
  
    clearInterval(intervalId)
  
    if (timer < 10)
      setRoundTimer(timer)
    else
      setRoundTimer(10)


    const gameResult: GameResult = {
      correctColor: currentColor,
      guessedColor: selectedColor,
      isCorrect: selectedColor === currentColor,
      time: 10 - roundTimer,
      score: score
    }
    setGameHistory((prevHistory) => [...prevHistory, gameResult])
    handleSaveHistory(gameResult)
    startRound()
  }

  const endGame = () => {
    setGameStarted(false)
    clearInterval(gameTimerInterval)
    clearInterval(intervalId)
  }
  
  const restartGame = () => {
    endGame() 
  
    setTimeout(() => {
      startGame()
    }, 1000)
  }
  
  const eraseData = () => {
    setHighScore(0)
    setGameHistory([])
    localStorage.removeItem('highScore')
    localStorage.removeItem('gameHistory')
    endGame()
    setCurrentColor('')
    setOptions([])
    setIsCorrect(null)
    setScore(0)
    setTimer(30)
    setRoundTimer(10)
  }
  
  
  useEffect(() => {
    if (!gameStarted) {
      setCurrentColor('')
      setOptions([])
      setIsCorrect(null)
      setScore(0)
      setTimer(30)
      clearInterval(intervalId!)
    }
  }, [gameStarted])

  useEffect(() => {
    if (roundTimer <= 0 && timer > 0) {
      const gameResult: GameResult = {
        correctColor: currentColor,
        guessedColor: '',
        isCorrect: false,
        time: 10 - roundTimer,
        score: score
      }
      setGameHistory((prevHistory) => [...prevHistory, gameResult])
      setRoundTimer(10)
      startRound()
    }
  }, [roundTimer])

  const handleSaveHistory = (history: GameResult) => {
    dispatch(
      saveHistory(gameHistory)
    )
  }

  return (
    <SectionWrapper>
      <H1>Color-o-matic</H1>
      <ComponentsContainer>
        <HeaderContainer>
          <ProgressBar>
            <ProgressFill key={timer} timer={timer} />
          </ProgressBar>
          <Header>
            <RemainingTime>
              Remaining Time (s):
              <Timer>
                {
                  gameStarted ? roundTimer : '-'
                }
              </Timer>
            </RemainingTime>
            <StyledButton
              onClick={restartGame}
            >
              RESTART
            </StyledButton>
            <ScoresDiv>
              <ScoreDiv>
                <span>
                  High Score:
                </span>
                <span>
                  {highScore}
                </span>
              </ScoreDiv>
              <ScoreDiv>
                <span>
                  Score:
                </span>
                <span>
                  {score}
                </span>
              </ScoreDiv>
            </ScoresDiv>
          </Header>
        </HeaderContainer>
        {
          gameStarted ? 
          <>
            <ColorWrapper
              color={currentColor}
            />
            <ButtonsContainer>
            {
              options.map(color => {
                return (
                <ColorButton
                  key={color}
                  onClick={() => checkAnswer(color)}
                >
                  { color }
                </ColorButton>)
              })
            }
            </ButtonsContainer>
          </>
          : 
          <StartButton
            onClick={startGame}
          >
            Start Game
          </StartButton>
        }
      </ComponentsContainer>
      <StyledButton onClick={eraseData}>RESET ALL DATA</StyledButton>
    </SectionWrapper>
  )
}

export default GameSection