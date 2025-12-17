# Git Rail Control – Branch Operations Trainer

A rail-operations themed trainer that turns Git concepts into dispatchable routes. Navigate branching, merges, and recoveries with a visual control board, dispatcher guidance, and gamified track points (TP).

## 🌟 Features

- **Interactive Route Scenarios**: Visualize 15+ Git operations from beginner to advanced with search & filter
- **Training Simulator**: Practice any Git command with validation and real-time visualization
- **Dispatcher Guidance**: Get beginner-friendly explanations using rail/dispatch analogies
- **Onboarding Tour**: First-time welcome modal guides you through key concepts
- **Comprehensive Help**: In-app help dialog with usage guide and pro tips
- **Gamification**: Earn TP (track points), level up, and unlock badges as you master Git concepts
- **Progress Tracking**: All progress stays in your browser—no account needed
- **Modern UI**: Light, accessible design with visual feedback for completed routes
- **GitHub Pages Compatible**: Deploy your own instance or use the live demo

## 🚀 Live Demo

Visit the live demo at: `https://thomast1906.github.io/git-rail-control-learn/`

## 🎮 How It Works

### Browser-Based Storage
Git Rail Control uses **browser localStorage** to save your progress, achievements, and learning history. Everything stays in your browser—no server or database required. This means:
- ✅ Your progress persists across sessions
- ✅ No account creation needed
- ✅ Works completely offline (after initial load)
- ✅ Privacy-friendly - your data never leaves your device

### Educational Content
The app provides comprehensive learning resources:

- Pre-written educational content covering all major Git concepts
- Pattern-based command validation
- Git state simulation for common operations
- Beginner-friendly explanations using rail/dispatch analogies

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## 🌐 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

2. **Push to main branch** - the workflow will automatically deploy

3. **Access your site** at `https://[your-username].github.io/[repo-name]/`

## 🔧 Configuration

The app automatically adapts based on the deployment environment:

- **Base Path**: Configured automatically for GitHub Pages
- **Storage**: Uses browser localStorage in all environments

## 📚 Learning Path

1. **Welcome Tour**: New users see a 4-step onboarding guide explaining the platform
2. **Browse Routes**: Search and filter scenarios by difficulty (beginner → intermediate → advanced)
3. **Complete Routes**: Follow guided scenarios with visual Git graph feedback
4. **Try Training Simulator**: Practice commands in a safe sandbox environment
5. **Get Help**: Click the Help button for usage guides and pro tips
6. **Track Your Progress**: View achievements, TP, and completed routes
7. **Review Your Dispatch Log**: See your learning history in the mission log
8. **Share Feedback**: Use the feedback button to report issues or suggest features

## 🎯 Supported Git Concepts

- Commits & Branching
- Merging & Rebasing
- Remote Repositories (push/pull)
- Stashing & Cherry-picking
- Tags & Releases
- Conflict Resolution
- Reset & Revert
- Interactive Rebase
- And more!

## 🛠️ Technology Stack

- **React 19** with TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **D3.js** for Git graph visualization
- **Framer Motion** for animations
- **Browser localStorage** for data persistence

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - See LICENSE file for details.

## 🚦 Roll Out

Begin your Git journey today—master version control from the dispatch deck and keep every branch on schedule. 🚂
