// Main entry point for the Node.js application

console.log('Hello, Node.js!');
console.log('Node version:', process.version);
console.log('Platform:', process.platform);

// Example: Simple function
function greet(name) {
  return `Welcome to Node.js, ${name}!`;
}

const message = greet('Developer');
console.log(message);

// Example: Working with modules
const path = require('path');
const currentDir = path.basename(__dirname);
console.log('Current directory:', currentDir);

console.log('\n✅ Node.js project is running successfully!');
