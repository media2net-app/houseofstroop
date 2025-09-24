const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function uploadImagesViaAPI() {
  console.log('Uploading images via API...');

  const images = [
    '_OP14687.jpg',
    '_OP14749.jpg', 
    '_OP14946.jpg',
    '_OP15078.jpg',
    '_OP24522.jpg'
  ];

  const uploadedImages = {};

  for (const imageName of images) {
    try {
      const imagePath = path.join(__dirname, '..', 'public', 'highlights', imageName);
      
      if (!fs.existsSync(imagePath)) {
        console.log(`Image not found: ${imageName}`);
        continue;
      }

      console.log(`Uploading ${imageName}...`);
      
      const formData = new FormData();
      formData.append('file', fs.createReadStream(imagePath));

      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        uploadedImages[imageName] = data.url;
        console.log(`✅ Uploaded ${imageName}: ${data.url}`);
      } else {
        const error = await response.text();
        console.log(`❌ Failed to upload ${imageName}: ${error}`);
      }
      
    } catch (error) {
      console.error(`❌ Failed to upload ${imageName}:`, error.message);
    }
  }

  console.log('\n📋 Upload Summary:');
  console.log(JSON.stringify(uploadedImages, null, 2));

  // Save URLs to a file for reference
  fs.writeFileSync(
    path.join(__dirname, '..', 'uploaded-images.json'), 
    JSON.stringify(uploadedImages, null, 2)
  );

  console.log('\n✅ Image upload complete! URLs saved to uploaded-images.json');
}

uploadImagesViaAPI().catch(console.error);
