export type QuestionType = 'mcq' | 'short_answer' | 'long_answer' | 'rating'

export interface BaseQuestion {
  id: string
  type: QuestionType
  text: string
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq'
  options: string[]
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short_answer'
}

export interface LongAnswerQuestion extends BaseQuestion {
  type: 'long_answer'
}

export interface RatingQuestion extends BaseQuestion {
  type: 'rating'
  maxRating: number
}

export type Question = MCQQuestion | ShortAnswerQuestion | LongAnswerQuestion | RatingQuestion