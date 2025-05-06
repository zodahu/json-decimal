# JSON-Decimal

A specialized tool for converting Ethereum token amounts from Wei format to human-readable decimal values in JSON data.

## Demo

**Live Demo**: [https://zodahu.github.io/json-decimal/](https://zodahu.github.io/json-decimal/)

Try the tool directly in your browser without any installation.

## Features

- **Real-time JSON Conversion**: Instantly converts Wei values to readable decimal amounts with token symbols
- **Token Mapping Configuration**: Customize which fields should be treated as token addresses and amounts
- **Token Decimal Management**: Set and update decimals for different tokens
- **Interactive UI**: Split-pane interface with JSON editor and converted result
- **Support for Nested Data**: Handles complex, nested JSON structures common in blockchain data
- **Token Symbol Display**: Shows token symbols alongside converted amounts

## Technology Stack

- React with TypeScript
- Monaco Editor for advanced JSON editing
- Ethers.js for cryptocurrency utilities
- Tailwind CSS for styling

## Installation

```bash
# Clone the repository
git clone https://github.com/zodahu/json-decimal.git

# Navigate to the project directory
cd json-decimal

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

1. **Input JSON**: Enter or paste JSON data containing Wei token amounts in the left panel
2. **Configure Token Mappings**: Define which JSON fields contain token addresses and amounts
3. **View Results**: See the converted, human-readable values in the right panel
4. **Customize Token Settings**: Add or update token decimal information as needed

## Supported Tokens

The tool comes pre-configured with decimal information for many popular tokens, including:

- ETH (18 decimals)
- USDC (6 decimals)
- USDT (6 decimals)
- Many ERC-20 tokens

Additional tokens can be easily added through the settings interface.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Deployment

### Re-deploying to GitHub Pages

After making changes to the project, follow these steps to update the live demo:

1. Commit and push your changes to the main branch

   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```

2. Run the deploy command to update the GitHub Pages site

   ```bash
   npm run deploy
   ```

3. Wait a few minutes for GitHub Pages to update (typically 1-3 minutes)

### Taking Down GitHub Pages

If you need to remove the GitHub Pages deployment:

1. Delete the gh-pages branch

   ```bash
   git push origin --delete gh-pages
   ```

2. Or alternatively, in the GitHub repository:

   - Go to Settings > Pages
   - Change the Source to "None"
   - Click "Save"

3. To completely disable GitHub Pages:
   - Go to Settings > Pages
   - Under "Build and deployment", select "Deploy from a branch"
   - Set the branch to "None"
   - Click "Save"

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
