# AI-Enhanced Learning Management System (LMS)

A modern Learning Management System with advanced AI features built using Next.js, React, Tailwind CSS, and Framer Motion.

## Overview

This LMS platform combines beautiful neomorphic design with AI-powered features to create an engaging learning experience. The system includes a dashboard, course player with interactive features, an AI tutor interface, a virtual classroom for live lectures, and a messaging system for assignments and collaboration.

## Key Features

### Dashboard
- Neomorphic design with soft shadows and rounded corners
- Dynamic grid of course cards that auto-rearrange
- Floating AI assistant button with pulse animation
- Progress heatmap with gradient color coding
- Weekly learning progress tracking

### Course Player
- Video panel with interactive transcript
- AR preview button that triggers 3D overlays
- Animated knowledge check popups during playback
- Emotion recognition status indicator
- Course navigation and lesson tracking

### AI Tutor Chat Interface
- 3D avatar panel with visualization
- Conversation thread with concept visualizations
- Quick action buttons for common learning requests
- Sentiment-responsive color backgrounds
- Code snippet display with syntax highlighting

### Virtual Classroom
- Zoom-like video conferencing interface
- Multiple view layouts (gallery, speaker, shared screen)
- Chat messaging with participant list
- Interactive controls (microphone, camera, screen sharing)
- Hand raising feature for student participation
- Real-time participant status indicators

### Messaging System
- Direct messaging between students and teachers
- Class group conversations for collaborative learning
- Assignment creation and distribution functionality
- File sharing and attachment support
- Message status indicators (read receipts)
- Contact filtering by role (teachers, students, classes)

## Tech Stack

- **Next.js & React** - Frontend framework
- **TailwindCSS** - Styling and UI components
- **Framer Motion** - Animations and transitions
- **shadcn/ui** - UI component library
- **Lucide Icons** - Modern icon set

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-lms.git
cd ai-lms
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # Main dashboard
│   ├── layout.tsx          # Root layout with dark mode
│   ├── globals.css         # Global styles and theme
│   ├── course/[id]/        # Course player page
│   └── ai-tutor/           # AI tutor chat interface
├── components/
│   └── ui/                 # Reusable UI components
└── lib/
    └── utils.ts            # Utility functions
```

## Interactions and Flows

1. **Dashboard → Course Selection**
   - View course progress
   - Click on a course card to open the course player

2. **Video Playback → AR Activation**
   - Watch video content
   - Click AR button to activate 3D visualization
   - Answer knowledge check popups

3. **AI Tutor Chat → Concept Map Display**
   - Ask questions to AI tutor
   - Receive visual explanations and code samples
   - Use quick actions for common queries
   
4. **Virtual Classroom → Live Learning**
   - Join live lectures with instructors
   - Participate in real-time discussions via chat
   - Raise hand to ask questions during the lecture
   - View shared screens and presentations

5. **Messaging → Assignments & Collaboration**
   - Communicate with teachers and fellow students
   - Receive and submit assignments
   - Share study materials and resources
   - Form study groups for collaborative learning

## Design System

- **Dark Mode Primary**: #1a1b1e
- **AI Accent Color**: #45f0df
- **Neomorphic UI**: Soft shadows and subtle gradients
- **Animations**: Microinteractions for better user engagement

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The project uses mock data for demonstration purposes
- Inspired by modern ed-tech platforms and AI-powered learning tools
