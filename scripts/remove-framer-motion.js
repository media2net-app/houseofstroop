const fs = require('fs');
const path = require('path');

function removeFramerMotion(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove framer-motion import
  content = content.replace(/import\s*{\s*motion\s*}\s*from\s*['"]framer-motion['"];?\s*\n?/g, '');
  
  // Replace motion.div with div and add animation classes
  content = content.replace(/<motion\.div\s+([^>]*?)>/g, (match, props) => {
    // Extract animation props and convert to CSS classes
    let className = 'animate-fade-in-up';
    
    // Check for specific animation types
    if (props.includes('x: -20') || props.includes('x: -20')) {
      className = 'animate-fade-in-left';
    } else if (props.includes('x: 20') || props.includes('x: 20')) {
      className = 'animate-fade-in-right';
    }
    
    // Add delay if specified
    if (props.includes('delay:')) {
      const delayMatch = props.match(/delay:\s*(\d+(?:\.\d+)?)/);
      if (delayMatch) {
        const delay = parseFloat(delayMatch[1]);
        className += ` animation-delay-${Math.round(delay * 1000)}`;
      }
    }
    
    return `<div className="${className}">`;
  });
  
  // Replace motion.div closing tags
  content = content.replace(/<\/motion\.div>/g, '</div>');
  
  // Remove motion props from divs
  content = content.replace(/initial=\{[^}]*\}/g, '');
  content = content.replace(/animate=\{[^}]*\}/g, '');
  content = content.replace(/transition=\{[^}]*\}/g, '');
  content = content.replace(/whileInView=\{[^}]*\}/g, '');
  content = content.replace(/viewport=\{[^}]*\}/g, '');
  
  fs.writeFileSync(filePath, content);
  console.log(`Processed: ${filePath}`);
}

// Process about page
removeFramerMotion('./src/app/about/page.tsx');

// Process contact page
removeFramerMotion('./src/app/contact/page.tsx');

console.log('Framer Motion removed from all files!');
