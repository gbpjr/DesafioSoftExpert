import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type GameResult = {
  correctColor: string
  guessedColor: string
  isCorrect: boolean
  time: number
  score: number
}

const initialState: GameResult [] = []

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    saveHistory: (state, action: PayloadAction<GameResult[]>) => {
      return action.payload
    },
    clearHistory: (state, action: PayloadAction<GameResult[]>) => {
      return action.payload
    }
  }
})

export const { saveHistory, clearHistory } = historySlice.actions

export default historySlice.reducer