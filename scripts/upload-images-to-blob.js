const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadImagesToBlob() {
  console.log('Starting image upload to Vercel Blob...');

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

      const fileBuffer = fs.readFileSync(imagePath);
      const filename = `house-of-stroop-${Date.now()}-${imageName}`;
      
      console.log(`Uploading ${imageName}...`);
      
      const blob = await put(filename, fileBuffer, {
        access: 'public',
        contentType: 'image/jpeg',
      });

      uploadedImages[imageName] = blob.url;
      console.log(`✅ Uploaded ${imageName}: ${blob.url}`);
      
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

uploadImagesToBlob().catch(console.error);
