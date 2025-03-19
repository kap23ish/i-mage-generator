# AI Image Generator

A beautiful and interactive web application for generating images using AI in real-time. This application allows users to type prompts and see images generate as they type, providing an intuitive and responsive experience.

## Features

- **Real-time Image Generation**: Images update as you type your prompt
- **Multiple Style Options**: Choose from realistic, artistic, cartoon, or 3D render styles
- **Circular Image Frames**: Beautiful circular frames for generated images
- **No API Key Required**: Uses Pixabay and Lorem Picsum APIs to generate real images without any setup
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with beautiful gradients and animations

## How It Works

1. Type your prompt in the input field
2. As you type, the application will generate preview images in real-time
3. Press Enter or click "Generate" for final high-quality images
4. Adjust the style using the options below the input field

## Image Generation

The application uses multiple methods to ensure reliable image generation:

1. **Pixabay API**: Fetches real photos based on your prompt
2. **Lorem Picsum**: Provides high-quality random images as a backup
3. **Fallback Pattern Generation**: If both APIs fail, the app creates unique visual patterns based on your prompt:
   - Different pattern types (circles, grids, waves, triangles)
   - Each pattern is deterministically generated from your prompt text

## Technical Details

This application is built with:
- HTML5
- CSS3 (with modern features like Grid, Flexbox, and CSS Variables)
- Vanilla JavaScript (no frameworks)
- Pixabay API for keyword-based image search
- Lorem Picsum for random high-quality images

## Getting Started

Simply open `index.html` in your web browser to start using the application.

```bash
# Clone this repository
git clone https://github.com/yourusername/ai-image-generator.git

# Navigate to the project directory
cd ai-image-generator

# Open in your browser
open index.html
```

## License

MIT License 