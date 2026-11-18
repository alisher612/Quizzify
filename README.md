
# Quizzify — Challenge Your Knowledge. Discover Your Potential.

Quizzify is a modern, responsive quiz platform built with **Next.js and Tailwind CSS**, designed to make learning more engaging through interactive quizzes, configurable challenges, instant feedback, and personalized performance tracking.

Featuring a premium dark interface, multiple knowledge categories, practice and challenge modes, detailed performance reports, and a persistent progress dashboard, Quizzify provides an engaging learning experience without requiring user authentication or a backend.

## Live Demo

**[Explore Quizzify] https://quizzify-pi.vercel.app**


## Features

### 1. Modern Landing Page
- Premium dark-themed interface with a clean, responsive layout.
- Dedicated hero section introducing the platform.
- Subject exploration section with categorized subjects.
- Feature highlights and platform overview.
- Clear navigation and calls to action.

### 2. Subject Explorer
- Explore quizzes across multiple knowledge categories.
- Search subjects by name.
- Filter subjects by category.
- View available question counts.
- Dynamically load quiz content from JSON question data.

**Available subjects:**
- Coding
- Mathematics
- Science
- History
- Geography
- Literature
- Art
- Music
- Sports

### 3. Quiz Configuration
Customize your quiz before starting:

- Select between Practice Mode and Challenge Mode.
- Choose the number of questions based on availability.
- Configure the countdown duration in Challenge Mode.
- Review your selected subject and quiz settings.
- View a quiz summary before starting.

### 4. Practice Mode
- Answer questions without time pressure.
- Receive immediate answer validation.
- Review correct answers after selecting an option.
- Focus on learning at your own pace.

### 5. Challenge Mode
- Test your knowledge against a countdown timer.
- Configure 10, 15, or 20 seconds per question.
- Automatically mark unanswered questions when time expires.
- Challenge your speed and accuracy.

### 6. Interactive Quiz Engine
- Dynamically load and shuffle questions.
- Validate selected answers instantly.
- Highlight correct and incorrect answers.
- Track correct, incorrect, and unanswered questions.
- Award **4 points for every correct answer**.
- Display quiz progress and remaining time.

### 7. Detailed Results Dashboard

After completing a quiz, users receive a detailed performance report containing:

- Total points earned.
- Correct answers.
- Incorrect answers.
- Unanswered questions.
- Overall percentage.
- Total time spent.
- Average time per question.
- Performance grade.

Additional functionality:
- Question-by-question answer review.
- Visual performance indicators.
- Confetti celebration for strong performances.
- Retake quiz functionality.
- Option to return to quiz configuration.

### 8. Personal Progress Dashboard

Quizzify includes a dedicated dashboard that tracks learning activity using browser LocalStorage.

**Dashboard features:**
- Total accumulated XP points.
- Total completed quizzes.
- Average quiz accuracy.
- Best quiz score.
- Learning streak tracking.
- Recent quiz history.
- Achievement tracking.

### 9. Achievement System

Users can unlock achievements through their quiz activity, including:

- First Steps
- Quiz Explorer
- Quiz Master
- High Achiever
- Perfect Score
- XP Collector

Achievement progress is maintained locally in the browser.

### 10. Responsive User Interface
- Responsive layouts for mobile, tablet, and desktop.
- Modern dark navy and violet visual theme.
- Consistent typography and spacing.
- Interactive buttons, cards, and navigation.
- Accessible semantic elements and visual feedback.

## Technologies Used

| Technology | Purpose |
|---|---|
| Next.js 14 | React framework and App Router |
| React 18 | Component-based user interface |
| JavaScript (ES6+) | Application logic |
| Tailwind CSS | Responsive styling |
| React Icons | Interface icons |
| react-confetti | Celebration effects |
| react-use | Window size utilities |
| LocalStorage | Persistent user progress |
| JSON | Quiz question data |
| Vercel | Deployment platform |

## Application Architecture

Quizzify uses a frontend-only architecture.

- **Frontend:** Next.js App Router and React.
- **Question Storage:** Static JSON files.
- **Progress Storage:** Browser LocalStorage.
- **State Management:** React Context API.
- **Styling:** Tailwind CSS.
- **Deployment:** Vercel.

No backend server, database, or authentication service is required.

## Project Structure

```text
Quizzify/
│
├── public/
│   ├── data/
│   │   └── questions.json
│   │
│   └── images/
│       └── quiz.png
│
├── src/
│   ├── app/
│   │   ├── configure/
│   │   │   └── [subject]/
│   │   │       └── page.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   │
│   │   ├── quiz/
│   │   │   └── [subject]/
│   │   │       └── page.jsx
│   │   │
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── QuestionTimer.jsx
│   │   ├── Results.jsx
│   │   ├── SubjectCard.jsx
│   │   └── SubjectExplorer.jsx
│   │
│   └── context/
│       └── PointsContext.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## Getting Started

Follow these steps to run Quizzify locally.

### 1. Clone the Repository

```bash
git clone https://github.com/alisher612/Quizzify.git
```

### 2. Navigate to the Project Directory

```bash
cd Quizzify
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open in Your Browser

Visit:

```text
http://localhost:3000
```

### 6. Create a Production Build

```bash
npm run build
```

### 7. Run the Production Server

```bash
npm run start
```

## Data and Progress Management

Quizzify uses two primary client-side storage mechanisms:

**Question Bank**
- Questions are stored in `public/data/questions.json`.
- Subject information and questions are loaded dynamically.
- The application does not require a database to retrieve quiz content.

**User Progress**
- XP points and quiz history are stored in browser LocalStorage.
- Dashboard statistics are calculated from saved quiz records.
- Achievements and learning streaks are maintained locally.
- Clearing browser storage can remove locally saved progress.

## Future Enhancements

Potential improvements for future versions include:

- Expand the question bank with additional subjects and questions.
- Introduce difficulty levels with categorized questions.
- Add question explanations and learning resources.
- Implement user authentication and cloud-based progress synchronization.
- Introduce online leaderboards and competitive multiplayer quizzes.
- Add backend integration for centralized question management.

## Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Test your implementation.
5. Submit a pull request.

## License

This project retains the licensing terms of its original source repository. Refer to the repository's `LICENSE` file for details.

---

**Quizzify — Challenge Your Knowledge. Discover Your Potential.**
