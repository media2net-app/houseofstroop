const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

// Imgur API (free, no authentication needed for small uploads)
const IMGUR_CLIENT_ID = '546c25a59c58ad7'; // Public client ID

async function uploadToImgur(imagePath, filename) {
  try {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    formData.append('title', filename);

    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.data.link;
    } else {
      const error = await response.text();
      throw new Error(`Imgur upload failed: ${error}`);
    }
  } catch (error) {
    console.error(`Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function uploadAllImages() {
  console.log('Uploading images to Imgur...');

  const images = [
    { file: '_OP14687.jpg', name: 'Instagram Post 2' },
    { file: '_OP14749.jpg', name: 'Fresh Stroopwafels' },
    { file: '_OP14946.jpg', name: 'Instagram Post 3' },
    { file: '_OP15078.jpg', name: 'Instagram Post 1' },
    { file: '_OP24522.jpg', name: 'Hero Background' }
  ];

  const uploadedImages = {};

  for (const img of images) {
    const imagePath = path.join(__dirname, '..', 'public', 'highlights', img.file);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`❌ Image not found: ${img.file}`);
      continue;
    }

    console.log(`📤 Uploading ${img.file}...`);
    const url = await uploadToImgur(imagePath, img.name);
    
    if (url) {
      uploadedImages[img.file] = url;
      console.log(`✅ Uploaded: ${url}`);
    }
  }

  // Save URLs to file
  fs.writeFileSync(
    path.join(__dirname, '..', 'uploaded-images.json'), 
    JSON.stringify(uploadedImages, null, 2)
  );

  console.log('\n📋 Upload Summary:');
  console.log(JSON.stringify(uploadedImages, null, 2));
  console.log('\n✅ All images uploaded! URLs saved to uploaded-images.json');
}

uploadAllImages().catch(console.error);
