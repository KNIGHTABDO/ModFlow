# Contributing to MoodFlow

Thank you for your interest in contributing to MoodFlow! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/KNIGHTABDO/ModFlow/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment details (browser, OS, etc.)

### Suggesting Features

1. Check existing [Issues](https://github.com/KNIGHTABDO/ModFlow/issues) and [Pull Requests](https://github.com/KNIGHTABDO/ModFlow/pulls)
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Potential implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Write or update tests as needed
5. Ensure all tests pass: `npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to your fork: `git push origin feature/amazing-feature`
8. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ModFlow.git
cd ModFlow

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev

# Build for production
npm run build
```

## Coding Standards

- Use TypeScript for type safety
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Keep components focused and reusable
- Ensure responsive design works on all devices

## Testing

- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile devices
- Verify accessibility features
- Check performance with Lighthouse

## Privacy & Security

- Never commit sensitive data or credentials
- Follow privacy-first principles
- Only store necessary metadata
- Ensure all API calls are authenticated
- Use HTTPS for all external requests

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing to MoodFlow! 🎵✨
