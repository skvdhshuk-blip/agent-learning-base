import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import LessonPage from './components/LessonPage'
import { getLesson, lessons } from './data/lessons'

export default function App() {
  const [lessonId, setLessonId] = useState<number | null>(null)
  const lesson = lessonId !== null ? getLesson(lessonId) : undefined

  return (
    <Routes>
      <Route
        path="/"
        element={
          lesson ? (
            <LessonPage
              key={lesson.id}
              lesson={lesson}
              total={lessons.length}
              onBack={() => setLessonId(null)}
              onNav={(id) => setLessonId(id)}
            />
          ) : (
            <Home onOpenLesson={(id) => setLessonId(id)} />
          )
        }
      />
    </Routes>
  )
}
