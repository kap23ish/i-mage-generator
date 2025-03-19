document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const promptInput = document.getElementById('prompt-input');
    const generateBtn = document.getElementById('generate-btn');
    const statusText = document.getElementById('status-text');
    const currentPromptText = document.getElementById('current-prompt-text');
    const statusIndicator = document.querySelector('.realtime-status');
    const imageCards = document.querySelectorAll('.image-card');
    const imageCount = document.getElementById('image-count');
    const imageStyle = document.getElementById('image-style');
    const apiKeyContainer = document.querySelector('.api-key-container');
    const saveButtons = document.querySelectorAll('.save-btn');
    const galleryLink = document.getElementById('gallery-link');
    const generatorSection = document.getElementById('generator');
    const gallerySection = document.getElementById('gallery');
    const savedImagesContainer = document.querySelector('.saved-images-container');
    
    // Hide the API key container since we're not using it
    apiKeyContainer.style.display = 'none';
    
    // Variables
    let typingTimer;
    const doneTypingInterval = 1000; // Time in ms after user stops typing
    let currentPrompt = '';
    let isGenerating = false;
    let savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    
    // Initialize gallery
    updateGalleryView();
    
    // Hide image placeholders initially
    imageCards.forEach(card => {
        const placeholder = card.querySelector('.image-placeholder');
        placeholder.style.display = 'none';
    });
    
    // Event Listeners
    promptInput.addEventListener('input', () => {
        currentPromptText.textContent = promptInput.value ? `"${promptInput.value}"` : '';
    });
    
    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleGenerateClick();
        }
    });
    
    generateBtn.addEventListener('click', handleGenerateClick);
    
    // Add event listeners to save buttons
    saveButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            saveImage(index);
        });
    });
    
    // Gallery navigation
    galleryLink.addEventListener('click', (e) => {
        e.preventDefault();
        showGallery();
    });
    
    // Add event listener to HOME link
    document.querySelector('.nav-links li:first-child a').addEventListener('click', (e) => {
        e.preventDefault();
        showGenerator();
    });
    
    // Functions
    function handleGenerateClick() {
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            updateStatus('error', 'Please enter a prompt');
            return;
        }
        
        if (isGenerating) return;
        
        generateImages(prompt);
    }
    
    function generateImages(prompt) {
        isGenerating = true;
        updateStatus('generating', 'Generating images...');
        
        // Show loading state
        imageCards.forEach(card => {
            const placeholder = card.querySelector('.image-placeholder');
            placeholder.style.display = 'flex';
            placeholder.classList.add('loading-blur');
            placeholder.innerHTML = '<span>Generating...</span>';
            
            // Update prompt preview
            const promptPreview = card.querySelector('.prompt-preview');
            promptPreview.textContent = prompt;
        });
        
        // Use setTimeout to simulate API call and show loading state
        setTimeout(() => {
            // Generate images
            const imageUrls = [];
            
            // Generate 4 different images using Lorem Picsum
            for (let i = 0; i < 4; i++) {
                const randomId = Math.floor(Math.random() * 1000);
                imageUrls.push(`https://picsum.photos/id/${randomId}/500/500`);
            }
            
            // Update image placeholders with the generated images
            imageCards.forEach((card, index) => {
                const placeholder = card.querySelector('.image-placeholder');
                placeholder.classList.remove('loading-blur');
                
                if (index < imageUrls.length) {
                    placeholder.innerHTML = `<img src="${imageUrls[index]}" alt="${prompt}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                    placeholder.style.background = 'none';
                    
                    // Store the image URL for saving
                    card.dataset.imageUrl = imageUrls[index];
                }
            });
            
            currentPrompt = prompt;
            updateStatus('ready', 'Generation complete');
            isGenerating = false;
        }, 1500);
    }
    
    function updateStatus(state, message) {
        statusText.textContent = message;
        
        // Remove all state classes
        statusIndicator.classList.remove('generating', 'error');
        
        // Add appropriate state class
        if (state === 'generating') {
            statusIndicator.classList.add('generating');
        } else if (state === 'error') {
            statusIndicator.classList.add('error');
        }
    }
    
    function updateGradientStyle(element, style) {
        // Remove existing gradient classes
        element.classList.remove('gradient-bg');
        
        // Add style-specific gradient
        switch (style) {
            case 'realistic':
                element.style.background = 'linear-gradient(135deg, #6a11cb, #2575fc)';
                break;
            case 'artistic':
                element.style.background = 'linear-gradient(135deg, #ff6b6b, #ffd56b)';
                break;
            case 'cartoon':
                element.style.background = 'linear-gradient(135deg, #00c6ff, #0072ff)';
                break;
            case '3d':
                element.style.background = 'linear-gradient(135deg, #4caf50, #8bc34a)';
                break;
            default:
                element.style.background = 'linear-gradient(135deg, #6a11cb, #2575fc)';
        }
    }
    
    // Save image to gallery
    function saveImage(index) {
        const card = imageCards[index];
        const saveBtn = card.querySelector('.save-btn');
        const prompt = card.querySelector('.prompt-preview').textContent;
        const imageUrl = card.dataset.imageUrl;
        
        if (!imageUrl) {
            updateStatus('error', 'No image to save');
            return;
        }
        
        // Check if this image is already saved
        const existingIndex = savedImages.findIndex(img => img.imageUrl === imageUrl);
        
        if (existingIndex !== -1) {
            // Image already saved, remove it
            savedImages.splice(existingIndex, 1);
            saveBtn.classList.remove('saved');
            saveBtn.title = 'Save to Gallery';
            updateStatus('ready', 'Image removed from gallery');
        } else {
            // Add image to saved images
            savedImages.push({
                prompt,
                imageUrl,
                date: new Date().toISOString(),
                id: Date.now() + Math.random().toString(36).substr(2, 9)
            });
            
            saveBtn.classList.add('saved');
            saveBtn.title = 'Remove from Gallery';
            
            // Show success message
            updateStatus('ready', 'Image saved to gallery');
            
            // Show save animation
            saveBtn.classList.add('save-animation');
            setTimeout(() => {
                saveBtn.classList.remove('save-animation');
            }, 1000);
        }
        
        // Save to localStorage
        localStorage.setItem('savedImages', JSON.stringify(savedImages));
        
        // Update gallery view if it's visible
        if (gallerySection.classList.contains('active')) {
            updateGalleryView();
        }
    }
    
    // Show gallery section
    function showGallery() {
        generatorSection.style.display = 'none';
        document.querySelector('.realtime-status').style.display = 'none';
        document.querySelector('.gallery-section').style.display = 'none';
        gallerySection.classList.add('active');
        
        // Update gallery view
        updateGalleryView();
        
        // Update navigation
        document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
        document.querySelector('.nav-links li:nth-child(2)').classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Show generator section
    function showGenerator() {
        gallerySection.classList.remove('active');
        generatorSection.style.display = 'block';
        document.querySelector('.realtime-status').style.display = 'flex';
        document.querySelector('.gallery-section').style.display = 'block';
        
        // Update navigation
        document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
        document.querySelector('.nav-links li:first-child').classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Update gallery view
    function updateGalleryView() {
        // Clear current gallery
        savedImagesContainer.innerHTML = '';
        
        if (savedImages.length === 0) {
            // Show empty gallery message
            savedImagesContainer.innerHTML = `
                <div class="empty-gallery">
                    <i class="fas fa-images"></i>
                    <p>No saved images yet. Generate some images and save them to see them here!</p>
                </div>
            `;
            return;
        }
        
        // Add saved images to gallery
        savedImages.forEach(image => {
            const date = new Date(image.date);
            const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            
            const imageCard = document.createElement('div');
            imageCard.className = 'saved-image-card';
            imageCard.innerHTML = `
                <img src="${image.imageUrl}" alt="${image.prompt}" class="saved-image">
                <div class="saved-image-info">
                    <div class="saved-image-prompt">${image.prompt}</div>
                    <div class="saved-image-date">${formattedDate}</div>
                    <button class="delete-btn" data-id="${image.id}" title="Delete from Gallery">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            savedImagesContainer.appendChild(imageCard);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                deleteImage(id);
            });
        });
    }
    
    // Delete image from gallery
    function deleteImage(id) {
        const index = savedImages.findIndex(img => img.id === id);
        
        if (index !== -1) {
            savedImages.splice(index, 1);
            
            // Save to localStorage
            localStorage.setItem('savedImages', JSON.stringify(savedImages));
            
            // Update gallery view
            updateGalleryView();
            
            // Show success message
            updateStatus('ready', 'Image deleted from gallery');
        }
    }
    
    // Initialize with ready message
    updateStatus('ready', 'Ready to generate');
}); 