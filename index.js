#!/usr/bin/env node

const { program } = require('commander');
const crypto = require('crypto');

// function to generate a password
function generatePassword(length = 8, includeNumbers = false, includeUppercase = false, includeSymbols = false) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const symbols = '!@#$%^&*()_+{}:"<>?[];,./';

  let characters = lowercase;

  if (includeNumbers) {
    characters += numbers;
  }

  if (includeUppercase) {
    characters += uppercase;
  }

  if (includeSymbols) {
    characters += symbols;
  }

  // Ensure password length is valid
  if (length < 1) {
    console.error('Error: Password length must be greater than 0.');
    process.exit(1);
  }

  // Generate the password using crypto
  return Array.from(crypto.randomBytes(length))
    .map((byte) => characters[byte % characters.length])
    .join('');
}

program
  .version('1.0.0')
  .description('CLI tool to generate random passwords')


  .option('-l, --length <number>', 'specify the length of the password (default: 8)', '8')

  .option('-n, --numbers', 'include numbers in the password')
  .option('-u, --uppercase', 'include uppercase letters in the password')
  .option('-s, --symbols', 'include symbols in the password')

  .on('--help', () => {
    console.log('');
    console.log('Example call:');
    console.log('  $ password-gen --length 12 --numbers --symbols');
  });

// Parse command line arguments
program.parse(process.argv);

// Extract options from the command
const options = program.opts();
const length = parseInt(options.length, 10) || 8;

// Generate and display the password
const password = generatePassword(length, options.numbers, options.uppercase, options.symbols);
console.log(`Generated Password: ${password}`);
