// Simple Image Generator App
document.addEventListener('DOMContentLoaded', function() {
    // Basic DOM elements
    const generateBtn = document.getElementById('generate-btn');
    const promptInput = document.getElementById('prompt-input');
    const statusText = document.getElementById('status-text');
    const imageContainers = document.querySelectorAll('.image-placeholder');
    const promptPreviews = document.querySelectorAll('.prompt-preview');
    const saveButtons = document.querySelectorAll('.save-btn');
    const galleryLink = document.getElementById('gallery-link');
    const generatorSection = document.getElementById('generator');
    const gallerySection = document.getElementById('gallery');
    const realTimeStatus = document.querySelector('.realtime-status');
    const galleryContainer = document.querySelector('.gallery-section');
    const savedImagesContainer = document.querySelector('.saved-images-container');
    const currentPromptText = document.getElementById('current-prompt-text');
    const imageStyle = document.getElementById('image-style');
    
    // Initialize
    let savedImages = JSON.parse(localStorage.getItem('savedImages') || '[]');
    
    // Predefined image sets for different categories
    const imageSets = {
        // Nature images
        nature: [
            'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        // People images
        people: [
            'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        // City images
        city: [
            'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        // Animals images
        animals: [
            'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        // Food images
        food: [
            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        // Technology images
        technology: [
            'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        // Sports images
        sports: [
            'https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        // Art images
        art: [
            'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1568607/pexels-photo-1568607.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        // Default images
        default: [
            'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1420440/pexels-photo-1420440.jpeg?auto=compress&cs=tinysrgb&w=500'
        ]
    };
    
    // Additional image sets for specific prompts
    const specificPrompts = {
        'boy': [
            'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1374509/pexels-photo-1374509.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1599832/pexels-photo-1599832.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1462975/pexels-photo-1462975.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'girl': [
            'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'dog': [
            'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'cat': [
            'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'beach': [
            'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1533720/pexels-photo-1533720.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'mountain': [
            'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'bike': [
            'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1595483/pexels-photo-1595483.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/163407/bike-mountain-mountain-biking-trail-163407.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'car': [
            'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'boy on a bike': [
            'https://images.pexels.com/photos/1139246/pexels-photo-1139246.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/2387319/pexels-photo-2387319.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1710358/pexels-photo-1710358.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=500'
        ]
    };
    
    // Add these additional image sets for more specific prompts
    const additionalPrompts = {
        'dog wearing a ribbon': [
            'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'sunset over mountains': [
            'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'futuristic city': [
            'https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1434580/pexels-photo-1434580.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'cat in a hat': [
            'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'underwater scene': [
            'https://images.pexels.com/photos/3801990/pexels-photo-3801990.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3100361/pexels-photo-3100361.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3369526/pexels-photo-3369526.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3805983/pexels-photo-3805983.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'space exploration': [
            'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/39896/space-station-moon-landing-apollo-15-james-irwin-39896.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&w=500'
        ],
        'fantasy castle': [
            'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/2832077/pexels-photo-2832077.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/2739273/pexels-photo-2739273.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/2883380/pexels-photo-2883380.jpeg?auto=compress&cs=tinysrgb&w=500'
        ]
    };
    
    // Merge the additional prompts into specificPrompts
    Object.assign(specificPrompts, additionalPrompts);
    
    // Hide images initially
    imageContainers.forEach(container => {
        container.style.display = 'none';
    });
    
    // Update gallery view on load
    updateGalleryView();
    
    // Main generate function
    function generateImages() {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            statusText.textContent = 'Please enter a prompt';
            return;
        }
        
        // Update current prompt text
        currentPromptText.textContent = `"${prompt}"`;
        
        // Show loading state
        statusText.textContent = 'Generating...';
        
        // Show and update all image containers
        imageContainers.forEach((container, index) => {
            // Show container with loading effect
            container.style.display = 'flex';
            container.innerHTML = '<span>Loading...</span>';
            container.style.background = 'linear-gradient(135deg, #6a11cb, #2575fc)';
            container.classList.add('loading-blur');
            
            // Update prompt text
            promptPreviews[index].textContent = prompt;
            
            // Reset save button
            saveButtons[index].classList.remove('saved');
            saveButtons[index].innerHTML = '<i class="fas fa-save"></i>';
        });
        
        // Generate images after a short delay (simulating API call)
        setTimeout(() => {
            // Get selected style
            const style = imageStyle.value;
            
            // Get images based on prompt
            const imageUrls = getImagesByPrompt(prompt);
            
            // Update each image container
            imageContainers.forEach((container, index) => {
                // Remove loading blur
                container.classList.remove('loading-blur');
                
                if (index < imageUrls.length) {
                    // Create image element
                    const img = document.createElement('img');
                    img.src = imageUrls[index];
                    img.alt = prompt;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '50%';
                    
                    // Add load event to handle errors
                    img.onerror = function() {
                        // If image fails to load, show a colored background with text
                        container.innerHTML = `<span>${prompt}</span>`;
                        updateGradientStyle(container, style);
                    };
                    
                    // Clear container and add image
                    container.innerHTML = '';
                    container.appendChild(img);
                    container.style.background = 'none';
                    
                    // Store image URL for saving
                    container.dataset.imageUrl = imageUrls[index];
                }
            });
            
            // Update status
            statusText.textContent = 'Images generated successfully!';
        }, 1500);
    }
    
    // Get images based on prompt
    function getImagesByPrompt(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        
        // Check for exact matches in our specific prompts
        if (specificPrompts[lowerPrompt]) {
            return specificPrompts[lowerPrompt];
        }
        
        // Check for partial matches in specific prompts
        for (const [key, images] of Object.entries(specificPrompts)) {
            if (lowerPrompt.includes(key)) {
                return images;
            }
        }
        
        // Check for keywords in the prompt
        const keywords = {
            'nature': ['nature', 'tree', 'forest', 'mountain', 'lake', 'river', 'ocean', 'beach', 'landscape', 'garden', 'park', 'flower', 'plant', 'sunset', 'sunrise'],
            'people': ['people', 'person', 'man', 'woman', 'boy', 'girl', 'child', 'family', 'portrait', 'face', 'human', 'crowd', 'group'],
            'city': ['city', 'urban', 'building', 'architecture', 'skyline', 'street', 'downtown', 'town', 'skyscraper', 'bridge', 'road'],
            'animals': ['animal', 'dog', 'cat', 'bird', 'wildlife', 'pet', 'zoo', 'fish', 'horse', 'lion', 'tiger', 'elephant', 'bear', 'monkey', 'rabbit'],
            'food': ['food', 'meal', 'restaurant', 'cooking', 'kitchen', 'dinner', 'lunch', 'breakfast', 'fruit', 'vegetable', 'meat', 'dessert', 'cake', 'pizza', 'burger'],
            'technology': ['technology', 'computer', 'digital', 'phone', 'tech', 'device', 'electronic', 'robot', 'ai', 'artificial intelligence', 'machine', 'gadget', 'laptop', 'smartphone'],
            'sports': ['sport', 'athlete', 'game', 'ball', 'soccer', 'football', 'basketball', 'tennis', 'baseball', 'golf', 'swimming', 'running', 'cycling', 'fitness', 'exercise'],
            'art': ['art', 'painting', 'drawing', 'creative', 'design', 'artist', 'museum', 'sculpture', 'gallery', 'craft', 'illustration', 'sketch', 'canvas']
        };
        
        // Check each category for matching keywords
        for (const [category, words] of Object.entries(keywords)) {
            for (const word of words) {
                if (lowerPrompt.includes(word)) {
                    return imageSets[category];
                }
            }
        }
        
        // If no matches, try to combine images from different categories based on the prompt
        const words = lowerPrompt.split(' ');
        const matchedCategories = new Set();
        
        for (const word of words) {
            for (const [category, keywordList] of Object.entries(keywords)) {
                if (keywordList.includes(word) || keywordList.some(keyword => keyword.includes(word))) {
                    matchedCategories.add(category);
                }
            }
        }
        
        if (matchedCategories.size > 0) {
            // Combine images from matched categories
            let combinedImages = [];
            for (const category of matchedCategories) {
                combinedImages = combinedImages.concat(imageSets[category]);
            }
            
            // Shuffle and take the first 4
            return shuffleArray(combinedImages).slice(0, 4);
        }
        
        // If still no matches, return default images
        return imageSets.default;
    }
    
    // Update gradient style based on selected style
    function updateGradientStyle(element, style) {
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
        const container = imageContainers[index];
        const imageUrl = container.dataset.imageUrl;
        const prompt = promptPreviews[index].textContent;
        const saveBtn = saveButtons[index];
        
        if (!imageUrl) {
            statusText.textContent = 'No image to save';
            return;
        }
        
        // Check if already saved
        const alreadySaved = savedImages.some(img => img.imageUrl === imageUrl);
        
        if (alreadySaved) {
            // Remove from saved images
            savedImages = savedImages.filter(img => img.imageUrl !== imageUrl);
            saveBtn.classList.remove('saved');
            saveBtn.innerHTML = '<i class="fas fa-save"></i>';
            statusText.textContent = 'Image removed from gallery';
        } else {
            // Add image to saved images
            savedImages.push({
                id: Date.now() + '-' + index,
                imageUrl: imageUrl,
                prompt: prompt,
                date: new Date().toISOString()
            });
            
            // Update button state
            saveBtn.classList.add('saved');
            saveBtn.innerHTML = '<i class="fas fa-check"></i>';
            
            // Show confirmation
            statusText.textContent = 'Image saved to gallery!';
            
            // Show save animation
            saveBtn.classList.add('save-animation');
            setTimeout(() => {
                saveBtn.classList.remove('save-animation');
            }, 1000);
        }
        
        // Save to localStorage
        localStorage.setItem('savedImages', JSON.stringify(savedImages));
        
        // Update gallery if visible
        if (gallerySection.style.display === 'block') {
            updateGalleryView();
        }
    }
    
    // Show gallery
    function showGallery() {
        // Hide generator sections
        generatorSection.style.display = 'none';
        realTimeStatus.style.display = 'none';
        galleryContainer.style.display = 'none';
        
        // Show gallery
        gallerySection.style.display = 'block';
        
        // Update navigation
        document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
        document.querySelector('.nav-links li:nth-child(2)').classList.add('active');
        
        // Update gallery view
        updateGalleryView();
    }
    
    // Show generator
    function showGenerator() {
        // Hide gallery
        gallerySection.style.display = 'none';
        
        // Show generator sections
        generatorSection.style.display = 'block';
        realTimeStatus.style.display = 'flex';
        galleryContainer.style.display = 'block';
        
        // Update navigation
        document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
        document.querySelector('.nav-links li:first-child').classList.add('active');
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
            
            // Create image HTML with error handling
            const imageHtml = `
                <div class="saved-image-container">
                    <img src="${image.imageUrl}" alt="${image.prompt}" class="saved-image" 
                        onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\\'fallback-image\\'>${image.prompt}</div>';">
                </div>
                <div class="saved-image-info">
                    <div class="saved-image-prompt">${image.prompt}</div>
                    <div class="saved-image-date">${formattedDate}</div>
                    <button class="delete-btn" data-id="${image.id}" title="Delete from Gallery">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            imageCard.innerHTML = imageHtml;
            savedImagesContainer.appendChild(imageCard);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteImage(id);
            });
        });
    }
    
    // Delete image from gallery
    function deleteImage(id) {
        // Remove from saved images
        savedImages = savedImages.filter(img => img.id !== id);
        
        // Save to localStorage
        localStorage.setItem('savedImages', JSON.stringify(savedImages));
        
        // Update gallery view
        updateGalleryView();
        
        // Show confirmation
        statusText.textContent = 'Image deleted from gallery';
    }
    
    // Event listeners
    generateBtn.addEventListener('click', generateImages);
    
    promptInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            generateImages();
        }
    });
    
    saveButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => saveImage(index));
    });
    
    // Gallery navigation
    galleryLink.addEventListener('click', function(e) {
        e.preventDefault();
        showGallery();
    });
    
    // Home navigation
    document.querySelector('.nav-links li:first-child a').addEventListener('click', function(e) {
        e.preventDefault();
        showGenerator();
    });

    // Add event listeners for suggestion chips
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function() {
            const prompt = this.getAttribute('data-prompt');
            promptInput.value = prompt;
            currentPromptText.textContent = `"${prompt}"`;
            generateImages(prompt);
        });
    });

    // All Categories button
    const allCategoriesBtn = document.getElementById('all-categories-btn');
    if (allCategoriesBtn) {
        allCategoriesBtn.addEventListener('click', function() {
            // Set the prompt input to "all categories"
            promptInput.value = "Show all categories";
            currentPromptText.textContent = '"Show all categories"';
            
            // Generate images from all categories
            generateImages("Show all categories");
        });
    }

    // Shuffle array function
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}); 