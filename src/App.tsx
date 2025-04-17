
import React from 'react'
import { Github } from 'lucide-react'

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Github /> GitHub Repository Explorer
      </h1>
      <p>Welcome to the GitHub Repository Explorer!</p>
    </div>
  )
}

export default App
