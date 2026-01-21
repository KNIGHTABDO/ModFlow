# MoodFlow

<div align="center">
  <h1>🎵 MoodFlow</h1>
  <p>Your emotional journey, beautifully visualized</p>
  
  <p>
    <strong>A premium dark-mode web app that connects via OAuth to music streaming services, analyzes behavioral metadata, and uses AI to infer emotional patterns with a living, animated emotional timeline UI.</strong>
  </p>
</div>

## ✨ Features

### 🎨 Premium Dark-Mode UI
- **Glassmorphism Design**: Beautiful frosted-glass effects throughout the interface
- **Smooth Micro-Animations**: Powered by Framer Motion for fluid, Apple-level UX
- **Mood-Based Gradients**: Dynamic color schemes that reflect your emotional state
- **Responsive Layout**: Perfect experience on any device

### 🔐 Privacy-First Authentication
- **Firebase Auth Integration**: Secure OAuth authentication
- **YouTube/Google Sign-In**: Connect with your YouTube account
- **Apple Music Sign-In**: Seamless Apple ID integration
- **Spotify Support**: Ready for Spotify OAuth integration
- **Zero Data Storage**: Only behavioral metadata is analyzed, never your actual music data

### 🤖 AI-Powered Insights
- **GitHub Models AI**: Leverages GPT-4o for emotional pattern analysis
- **Natural Language Queries**: Ask questions about your emotional journey
- **Pattern Recognition**: Identifies trends and provides actionable insights
- **Personalized Suggestions**: Get recommendations for emotional well-being

### 📊 Emotional Timeline
- **Living Timeline**: Animated, interactive visualization of your mood over time
- **Rich Data Visualization**: Beautiful charts powered by Recharts
- **Mood Tracking**: Manual and automatic mood entry from music listening
- **Historical Analysis**: View trends and patterns across days, weeks, and months

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase account (for authentication and database)
- GitHub account with access to GitHub Models (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KNIGHTABDO/ModFlow.git
   cd ModFlow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `VITE_FIREBASE_API_KEY`: Your Firebase API key
   - `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
   - `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
   - `VITE_FIREBASE_APP_ID`: Your Firebase app ID
   - `VITE_GITHUB_TOKEN`: Your GitHub personal access token (for Models API)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Tech Stack

### Frontend
- **React 19**: Latest React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready animation library

### Backend & Services
- **Firebase Authentication**: Secure OAuth and user management
- **Firebase Firestore**: Real-time database for mood entries
- **GitHub Models AI**: GPT-4o for emotional analysis and insights
- **React Router**: Client-side routing

### Data Visualization
- **Recharts**: Composable charting library for React
- **Lucide React**: Beautiful, consistent icons

## 📱 Features in Detail

### Authentication Flow
1. Users sign in with YouTube/Google or Apple ID
2. OAuth tokens are used to access music service metadata
3. Only behavioral data (genres, tempo, energy) is analyzed
4. No actual music data or listening history is stored

### Emotional Analysis
1. **Metadata Collection**: Gather behavioral patterns from music choices
2. **AI Processing**: GitHub Models AI analyzes patterns for emotional insights
3. **Pattern Recognition**: Identify trends, triggers, and correlations
4. **Insight Generation**: Provide personalized, actionable recommendations

### Timeline Visualization
- **Interactive Charts**: Beautiful area and line charts showing mood intensity over time
- **Mood Cards**: Recent mood entries with color-coded indicators
- **Trend Analysis**: Visual representation of emotional patterns
- **Real-time Updates**: Live updates as new moods are tracked

## 🔒 Privacy & Security

MoodFlow is built with privacy as a core principle:

- **No Music Storage**: Never stores your actual music or playlists
- **Metadata Only**: Only behavioral metadata is analyzed (genres, tempo, energy levels)
- **Local Processing**: Analysis happens with encrypted API calls
- **User Control**: Full data export and deletion capabilities
- **Secure Auth**: Industry-standard OAuth 2.0 authentication
- **Encrypted Transit**: All data transmitted over HTTPS

## 🎯 Roadmap

- [x] Core authentication and routing
- [x] Glassmorphism UI components
- [x] Emotional timeline visualization
- [x] AI-powered insights
- [x] Natural language query interface
- [ ] Spotify OAuth integration
- [ ] Apple Music API integration
- [ ] Advanced pattern recognition
- [ ] Export and sharing features
- [ ] Mobile app (React Native)
- [ ] Weekly/monthly emotional reports

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- Powered by GitHub Models AI
- Icons by Lucide
- Design inspired by Apple's Human Interface Guidelines

---

<div align="center">
  <p>Made with 🎵 and ✨</p>
  <p>For questions or support, please open an issue on GitHub</p>
</div>
