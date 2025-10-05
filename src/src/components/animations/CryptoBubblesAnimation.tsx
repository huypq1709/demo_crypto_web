import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fetchTop10Cryptos, CryptoData } from '../../api/cryptoApi';

interface CryptoBubble {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  marketCap: number;
  color: string;
  size: number;
  x: number;
  y: number;
  baseSize: number;
  vx: number; // velocity x
  vy: number; // velocity y
  targetX: number; // target position x
  targetY: number; // target position y
}

const CryptoBubblesAnimation: React.FC = () => {
  const [bubbles, setBubbles] = useState<CryptoBubble[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Fetch real-time crypto data
  const fetchRealTimeData = useCallback(async (): Promise<CryptoData[]> => {
    try {
      const cryptoData = await fetchTop10Cryptos();
      // Add some variation to make it look more real-time
      const variedData = cryptoData.map(crypto => ({
        ...crypto,
        price: crypto.price * (0.98 + Math.random() * 0.04), // ±2% variation
        change24h: crypto.change24h + (Math.random() - 0.5) * 2, // ±1% variation
      }));
      return variedData;
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      // Fallback data - Top 20 cryptocurrencies with real-time-like variations
      const baseData = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 43250.67, change24h: 2.5, volume24h: 28500000000, marketCap: 850000000000, rank: 1, image: '', lastUpdated: new Date().toISOString() },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 2650.45, change24h: 1.8, volume24h: 15200000000, marketCap: 320000000000, rank: 2, image: '', lastUpdated: new Date().toISOString() },
        { id: 'tether', name: 'Tether', symbol: 'USDT', price: 1.0001, change24h: 0.01, volume24h: 45000000000, marketCap: 95000000000, rank: 3, image: '', lastUpdated: new Date().toISOString() },
        { id: 'binancecoin', name: 'BNB', symbol: 'BNB', price: 315.78, change24h: 0.7, volume24h: 1200000000, marketCap: 48000000000, rank: 4, image: '', lastUpdated: new Date().toISOString() },
        { id: 'solana', name: 'Solana', symbol: 'SOL', price: 98.45, change24h: 3.2, volume24h: 2800000000, marketCap: 42000000000, rank: 5, image: '', lastUpdated: new Date().toISOString() },
        { id: 'ripple', name: 'XRP', symbol: 'XRP', price: 0.6234, change24h: -1.2, volume24h: 1800000000, marketCap: 33000000000, rank: 6, image: '', lastUpdated: new Date().toISOString() },
        { id: 'usd-coin', name: 'USD Coin', symbol: 'USDC', price: 1.0002, change24h: 0.02, volume24h: 10000000000, marketCap: 28000000000, rank: 7, image: '', lastUpdated: new Date().toISOString() },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.4856, change24h: -0.5, volume24h: 400000000, marketCap: 17000000000, rank: 8, image: '', lastUpdated: new Date().toISOString() },
        { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.0823, change24h: 4.3, volume24h: 1200000000, marketCap: 12000000000, rank: 9, image: '', lastUpdated: new Date().toISOString() },
        { id: 'tron', name: 'TRON', symbol: 'TRX', price: 0.1234, change24h: 1.5, volume24h: 900000000, marketCap: 11000000000, rank: 10, image: '', lastUpdated: new Date().toISOString() },
        { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', price: 14.23, change24h: -1.5, volume24h: 600000000, marketCap: 8000000000, rank: 11, image: '', lastUpdated: new Date().toISOString() },
        { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', price: 36.78, change24h: 4.1, volume24h: 700000000, marketCap: 13000000000, rank: 12, image: '', lastUpdated: new Date().toISOString() },
        { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 6.78, change24h: 1.2, volume24h: 500000000, marketCap: 8000000000, rank: 13, image: '', lastUpdated: new Date().toISOString() },
        { id: 'toncoin', name: 'Toncoin', symbol: 'TON', price: 2.45, change24h: 3.8, volume24h: 350000000, marketCap: 7500000000, rank: 14, image: '', lastUpdated: new Date().toISOString() },
        { id: 'shiba-inu', name: 'Shiba Inu', symbol: 'SHIB', price: 0.0000089, change24h: -1.2, volume24h: 200000000, marketCap: 5000000000, rank: 15, image: '', lastUpdated: new Date().toISOString() },
        { id: 'polygon', name: 'Polygon', symbol: 'MATIC', price: 0.89, change24h: -2.1, volume24h: 800000000, marketCap: 8000000000, rank: 16, image: '', lastUpdated: new Date().toISOString() },
        { id: 'sui', name: 'Sui', symbol: 'SUI', price: 1.23, change24h: 5.2, volume24h: 250000000, marketCap: 3200000000, rank: 17, image: '', lastUpdated: new Date().toISOString() },
        { id: 'hedera', name: 'Hedera', symbol: 'HBAR', price: 0.0567, change24h: 0.9, volume24h: 180000000, marketCap: 2100000000, rank: 18, image: '', lastUpdated: new Date().toISOString() },
        { id: 'stellar', name: 'Stellar', symbol: 'XLM', price: 0.1234, change24h: 2.1, volume24h: 100000000, marketCap: 3500000000, rank: 19, image: '', lastUpdated: new Date().toISOString() },
        { id: 'bitcoin-cash', name: 'Bitcoin Cash', symbol: 'BCH', price: 245.67, change24h: 1.5, volume24h: 150000000, marketCap: 4800000000, rank: 20, image: '', lastUpdated: new Date().toISOString() },
      ];
      
      // Add real-time-like variations to fallback data
      return baseData.map(crypto => ({
        ...crypto,
        price: crypto.price * (0.98 + Math.random() * 0.04), // ±2% variation
        change24h: crypto.change24h + (Math.random() - 0.5) * 2, // ±1% variation
      }));
    }
  }, []);

  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number): string => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const newR = Math.max(0, Math.min(255, r + amount));
    const newG = Math.max(0, Math.min(255, g + amount));
    const newB = Math.max(0, Math.min(255, b + amount));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  // Professional color palette with blue theme option
  const getCryptoColor = (symbol: string): string => {
    // Option 1: Professional blue theme (unified)
    const blueTheme = {
      'BTC': '#3b82f6', // Blue
      'ETH': '#1d4ed8', // Darker blue
      'USDT': '#06b6d4', // Cyan
      'BNB': '#0ea5e9', // Sky blue
      'SOL': '#2563eb', // Indigo
      'XRP': '#1e40af', // Deep blue
      'USDC': '#0284c7', // Blue
      'ADA': '#0369a1', // Blue
      'DOGE': '#0f766e', // Teal
      'TRX': '#dc2626', // Red (exception)
      'LINK': '#1e3a8a', // Navy
      'AVAX': '#dc2626', // Red (exception)
      'DOT': '#7c3aed', // Purple (exception)
      'TON': '#0891b2', // Cyan
      'SHIB': '#ea580c', // Orange (exception)
      'MATIC': '#7c2d12', // Brown
      'SUI': '#0d9488', // Teal
      'HBAR': '#374151', // Gray
      'XLM': '#1f2937', // Dark gray
      'BCH': '#059669', // Green
      'LTC': '#6b7280', // Gray
      'UNI': '#be185d', // Pink (exception)
      'ATOM': '#1e40af', // Blue
      'XMR': '#92400e', // Amber
      'ETC': '#374151', // Gray
      'FIL': '#0ea5e9', // Sky blue
      'NEAR': '#0d9488', // Teal
      'FTM': '#1d4ed8', // Blue
      'ALGO': '#374151', // Gray
      'VET': '#0891b2', // Cyan
      'ICP': '#2563eb', // Indigo
      'THETA': '#0284c7', // Blue
      'FLOW': '#059669', // Green
      'EGLD': '#374151', // Gray
      'MANA': '#dc2626', // Red (exception)
      'SAND': '#0ea5e9', // Sky blue
    };

    // Removed mixedTheme as it's not used

    // Use blue theme for unified look, or mixed theme for diversity
    return blueTheme[symbol as keyof typeof blueTheme] || '#3b82f6'; // Default to blue
  };

  // Initialize and update bubbles
  const initializeBubbles = useCallback(async () => {
    const cryptoData = await fetchRealTimeData();
    
    // Create bubbles with grid-based positioning to avoid overlaps
    const newBubbles: CryptoBubble[] = [];
    const containerWidth = containerSize.width || 1200;
    const containerHeight = containerSize.height || 600;
    
    // Define safe areas - STRICTLY RIGHT HALF ONLY with comprehensive UI/UX avoidance
    const margin = 100; // Increased margin for better separation
    const headerHeight = 150; // Header height with buffer
    const footerHeight = 180; // Footer height with buffer
    const leftContentWidth = containerWidth * 0.5; // Left half for content
    const buttonAreaHeight = 200; // Button area height (top right buttons) with buffer
    const profileAreaHeight = 200; // Profile pictures area with buffer
    const textAreaBuffer = 120; // Buffer around text content areas
    const edgeBuffer = 50; // Buffer from screen edges
    
    const availableAreas = [
      // Main central right area - AVOID ALL UI/UX ELEMENTS AND EDGES
      { 
        x: leftContentWidth + margin + textAreaBuffer + edgeBuffer, // Avoid left content, text, and edges
        y: headerHeight + buttonAreaHeight + margin + textAreaBuffer + edgeBuffer, // Avoid header, buttons, text, and edges
        width: (containerWidth - leftContentWidth - margin * 2 - textAreaBuffer * 2 - edgeBuffer * 2) * 0.8, // Smaller width to avoid UI and edges
        height: (containerHeight - headerHeight - buttonAreaHeight - footerHeight - margin * 2 - textAreaBuffer * 2 - edgeBuffer * 2) * 0.7, // Smaller height to avoid UI and edges
        priority: 3 // Highest priority for largest bubbles
      },
      // Secondary central right area - AVOID UI/UX AND EDGES
      { 
        x: leftContentWidth + margin + textAreaBuffer + edgeBuffer, 
        y: headerHeight + buttonAreaHeight + margin + textAreaBuffer + edgeBuffer, // Avoid button area, text, and edges
        width: containerWidth - leftContentWidth - margin * 2 - textAreaBuffer * 2 - edgeBuffer * 2, 
        height: containerHeight - headerHeight - buttonAreaHeight - footerHeight - margin * 2 - textAreaBuffer * 2 - edgeBuffer * 2,
        priority: 2 // Medium priority
      },
      // Top right corner - AVOID BUTTONS, TEXT, AND EDGES
      { 
        x: containerWidth * 0.7 + margin + edgeBuffer, 
        y: headerHeight + buttonAreaHeight + textAreaBuffer + edgeBuffer, 
        width: containerWidth * 0.25 - margin * 2 - edgeBuffer * 2, 
        height: 100 - margin * 2 - edgeBuffer * 2,
        priority: 1 // Low priority
      },
      // Bottom right area - AVOID PROFILE, TEXT, AND EDGES
      { 
        x: containerWidth * 0.7 + margin + edgeBuffer, 
        y: containerHeight - profileAreaHeight - textAreaBuffer - edgeBuffer, 
        width: containerWidth * 0.25 - margin * 2 - edgeBuffer * 2, 
        height: 80 - margin * 2 - edgeBuffer * 2,
        priority: 1 // Low priority
      },
    ];
    
    // Sort crypto data by market cap (largest first) - Use exactly 20 unique coins
    const sortedCryptoData = [...cryptoData].sort((a, b) => b.marketCap - a.marketCap);
    
    // Create exactly 20 bubbles - duplicate the data to get 20 unique bubbles
    const extendedCryptoData = [];
    
    // Add original 20 coins
    extendedCryptoData.push(...sortedCryptoData);
    
    // If we have less than 20, add some popular altcoins to reach 20
    if (extendedCryptoData.length < 20) {
      const additionalCoins = [
        { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', price: 72.34, change24h: 0.8, volume24h: 400000000, marketCap: 5500000000, rank: 15, image: '', lastUpdated: new Date().toISOString() },
        { id: 'uniswap', name: 'Uniswap', symbol: 'UNI', price: 7.45, change24h: 4.3, volume24h: 300000000, marketCap: 4500000000, rank: 16, image: '', lastUpdated: new Date().toISOString() },
        { id: 'cosmos', name: 'Cosmos', symbol: 'ATOM', price: 8.45, change24h: -0.8, volume24h: 80000000, marketCap: 2800000000, rank: 17, image: '', lastUpdated: new Date().toISOString() },
        { id: 'monero', name: 'Monero', symbol: 'XMR', price: 145.67, change24h: 1.2, volume24h: 120000000, marketCap: 2600000000, rank: 18, image: '', lastUpdated: new Date().toISOString() },
        { id: 'ethereum-classic', name: 'Ethereum Classic', symbol: 'ETC', price: 18.23, change24h: -0.5, volume24h: 150000000, marketCap: 2400000000, rank: 19, image: '', lastUpdated: new Date().toISOString() },
        { id: 'filecoin', name: 'Filecoin', symbol: 'FIL', price: 4.56, change24h: 2.1, volume24h: 180000000, marketCap: 2200000000, rank: 20, image: '', lastUpdated: new Date().toISOString() },
      ];
      
      // Add coins until we have exactly 20
      while (extendedCryptoData.length < 20) {
        const coinIndex: number = extendedCryptoData.length - sortedCryptoData.length;
        const coinToAdd: CryptoData | undefined = additionalCoins[coinIndex];
        if (coinToAdd) {
          extendedCryptoData.push(coinToAdd);
        } else {
          break;
        }
      }
    }
    
    // Ensure we have exactly 20 unique bubbles - no duplicates
    const finalCryptoData = extendedCryptoData.slice(0, 20);
    
    // If we still don't have 20, add more unique coins from additional list
    if (finalCryptoData.length < 20) {
      const additionalUniqueCoins = [
        { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', price: 72.34, change24h: 0.8, volume24h: 400000000, marketCap: 5500000000, rank: 15, image: '', lastUpdated: new Date().toISOString() },
        { id: 'uniswap', name: 'Uniswap', symbol: 'UNI', price: 7.45, change24h: 4.3, volume24h: 300000000, marketCap: 4500000000, rank: 16, image: '', lastUpdated: new Date().toISOString() },
        { id: 'cosmos', name: 'Cosmos', symbol: 'ATOM', price: 8.45, change24h: -0.8, volume24h: 80000000, marketCap: 2800000000, rank: 17, image: '', lastUpdated: new Date().toISOString() },
        { id: 'monero', name: 'Monero', symbol: 'XMR', price: 145.67, change24h: 1.2, volume24h: 120000000, marketCap: 2600000000, rank: 18, image: '', lastUpdated: new Date().toISOString() },
        { id: 'ethereum-classic', name: 'Ethereum Classic', symbol: 'ETC', price: 18.23, change24h: -0.5, volume24h: 150000000, marketCap: 2400000000, rank: 19, image: '', lastUpdated: new Date().toISOString() },
        { id: 'filecoin', name: 'Filecoin', symbol: 'FIL', price: 4.56, change24h: 2.1, volume24h: 180000000, marketCap: 2200000000, rank: 20, image: '', lastUpdated: new Date().toISOString() },
        { id: 'near', name: 'NEAR Protocol', symbol: 'NEAR', price: 3.45, change24h: 2.8, volume24h: 200000000, marketCap: 3500000000, rank: 21, image: '', lastUpdated: new Date().toISOString() },
        { id: 'fantom', name: 'Fantom', symbol: 'FTM', price: 0.45, change24h: -1.2, volume24h: 150000000, marketCap: 1200000000, rank: 22, image: '', lastUpdated: new Date().toISOString() },
        { id: 'algorand', name: 'Algorand', symbol: 'ALGO', price: 0.18, change24h: 0.5, volume24h: 80000000, marketCap: 1400000000, rank: 23, image: '', lastUpdated: new Date().toISOString() },
        { id: 'vechain', name: 'VeChain', symbol: 'VET', price: 0.023, change24h: 1.8, volume24h: 60000000, marketCap: 1800000000, rank: 24, image: '', lastUpdated: new Date().toISOString() },
        { id: 'internet-computer', name: 'Internet Computer', symbol: 'ICP', price: 12.45, change24h: -2.1, volume24h: 90000000, marketCap: 5500000000, rank: 25, image: '', lastUpdated: new Date().toISOString() },
        { id: 'theta-token', name: 'Theta Network', symbol: 'THETA', price: 1.23, change24h: 3.2, volume24h: 70000000, marketCap: 1200000000, rank: 26, image: '', lastUpdated: new Date().toISOString() },
        { id: 'flow', name: 'Flow', symbol: 'FLOW', price: 0.89, change24h: -0.8, volume24h: 50000000, marketCap: 900000000, rank: 27, image: '', lastUpdated: new Date().toISOString() },
        { id: 'elrond-erd-2', name: 'MultiversX', symbol: 'EGLD', price: 45.67, change24h: 1.5, volume24h: 40000000, marketCap: 1200000000, rank: 28, image: '', lastUpdated: new Date().toISOString() },
        { id: 'decentraland', name: 'Decentraland', symbol: 'MANA', price: 0.45, change24h: 2.3, volume24h: 80000000, marketCap: 850000000, rank: 29, image: '', lastUpdated: new Date().toISOString() },
        { id: 'the-sandbox', name: 'The Sandbox', symbol: 'SAND', price: 0.67, change24h: -1.1, volume24h: 60000000, marketCap: 1500000000, rank: 30, image: '', lastUpdated: new Date().toISOString() },
      ];
      
      // Add unique coins until we have 20
      let coinIndex = 0;
      while (finalCryptoData.length < 20 && coinIndex < additionalUniqueCoins.length) {
        const coinToAdd = additionalUniqueCoins[coinIndex];
        // Check if this coin already exists
        const exists = finalCryptoData.some(coin => coin.symbol === coinToAdd.symbol);
        if (!exists) {
          finalCryptoData.push(coinToAdd);
        }
        coinIndex++;
      }
    }
    
    // Remove any duplicate symbols to ensure uniqueness
    const uniqueCryptoData = finalCryptoData.filter((coin, index, self) => 
      index === self.findIndex(c => c.symbol === coin.symbol)
    );
    
    // Distribute bubbles across all available areas
    uniqueCryptoData.slice(0, 20).forEach((crypto: CryptoData, index: number) => {
      // Calculate size based on market cap (larger market cap = larger bubble)
      const maxMarketCap = Math.max(...cryptoData.map(c => c.marketCap));
      const minMarketCap = Math.min(...cryptoData.map(c => c.marketCap));
      const marketCapRatio = (crypto.marketCap - minMarketCap) / (maxMarketCap - minMarketCap);
      const baseSize = Math.max(40, Math.min(120, 40 + marketCapRatio * 80));
      
      // Simple random area selection for all bubbles
      const chosenArea = availableAreas[Math.floor(Math.random() * availableAreas.length)];
      
      // Simple random positioning within the chosen area
      const x = chosenArea.x + Math.random() * chosenArea.width;
      const y = chosenArea.y + Math.random() * chosenArea.height;
      
      // Ensure position is within STRICT RIGHT HALF ONLY and AVOID UI/UX AND EDGES
      const headerBuffer = 150; // Extra buffer around header
      const leftContentBuffer = containerWidth * 0.5; // STRICT LEFT HALF BOUNDARY
      const buttonAreaBuffer = 200; // Buffer around button area
      const footerBuffer = 180; // Buffer around footer
      const textBuffer = 120; // Buffer around text content
      const edgeBuffer = 50; // Buffer from screen edges
      
      const boundedX = Math.max(
        baseSize/2 + leftContentBuffer + textBuffer + edgeBuffer, // STRICT RIGHT HALF ONLY with text and edge buffer
        Math.min(containerWidth - baseSize/2 - edgeBuffer, x) // Avoid right edge
      );
      const boundedY = Math.max(
        baseSize/2 + headerBuffer + buttonAreaBuffer + textBuffer + edgeBuffer, // Avoid header, buttons, text, AND top edge
        Math.min(containerHeight - baseSize/2 - footerBuffer - textBuffer - edgeBuffer, y) // Avoid footer, text, AND bottom edge
      );
      
      // Simple collision detection and positioning
      let finalX = boundedX;
      let finalY = boundedY;
      let attempts = 0;
      const maxAttempts = 500; // More attempts for wide spacing
      
      while (attempts < maxAttempts) {
        let hasCollision = false;
        
        for (const existingBubble of newBubbles) {
          const distance = Math.sqrt(
            Math.pow(finalX - existingBubble.x, 2) + 
            Math.pow(finalY - existingBubble.y, 2)
          );
          const minDistance = (baseSize + existingBubble.size) / 2 + 200; // 200px buffer for wide spacing
          
          if (distance < minDistance) {
            hasCollision = true;
            break;
          }
        }
        
        if (!hasCollision) break;
        
        // Try a new random position
        finalX = chosenArea.x + Math.random() * chosenArea.width;
        finalY = chosenArea.y + Math.random() * chosenArea.height;
        
        // Ensure new position is within bounds and AVOID UI/UX AND EDGES
        finalX = Math.max(baseSize/2 + leftContentBuffer + textBuffer + edgeBuffer, Math.min(containerWidth - baseSize/2 - edgeBuffer, finalX));
        finalY = Math.max(baseSize/2 + headerBuffer + buttonAreaBuffer + textBuffer + edgeBuffer, Math.min(containerHeight - baseSize/2 - footerBuffer - textBuffer - edgeBuffer, finalY));
        
        attempts++;
      }
      
      // If still colliding, place it in a random position
      if (attempts >= maxAttempts) {
        finalX = chosenArea.x + Math.random() * chosenArea.width;
        finalY = chosenArea.y + Math.random() * chosenArea.height;
        finalX = Math.max(baseSize/2 + leftContentBuffer + textBuffer + edgeBuffer, Math.min(containerWidth - baseSize/2 - edgeBuffer, finalX));
        finalY = Math.max(baseSize/2 + headerBuffer + buttonAreaBuffer + textBuffer + edgeBuffer, Math.min(containerHeight - baseSize/2 - footerBuffer - textBuffer - edgeBuffer, finalY));
      }
      
      // Final collision check with all existing bubbles
      let finalCollision = true;
      while (finalCollision) {
        finalCollision = false;
        for (const existingBubble of newBubbles) {
          const distance = Math.sqrt(
            Math.pow(finalX - existingBubble.x, 2) + 
            Math.pow(finalY - existingBubble.y, 2)
          );
          const minDistance = (baseSize + existingBubble.size) / 2 + 200; // 200px buffer for wide spacing
          
          if (distance < minDistance) {
            finalCollision = true;
            // Try multiple angles to find a good position
            let bestAngle = 0;
            let bestDistance = 0;
            
            for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 16) {
              const testX = finalX + Math.cos(angle) * 300;
              const testY = finalY + Math.sin(angle) * 300;
              
              let minTestDistance = Infinity;
              for (const otherBubble of newBubbles) {
                const testDistance = Math.sqrt(
                  Math.pow(testX - otherBubble.x, 2) + 
                  Math.pow(testY - otherBubble.y, 2)
                );
                minTestDistance = Math.min(minTestDistance, testDistance);
              }
              
              if (minTestDistance > bestDistance) {
                bestDistance = minTestDistance;
                bestAngle = angle;
              }
            }
            
            finalX += Math.cos(bestAngle) * 300;
            finalY += Math.sin(bestAngle) * 300;
            break;
          }
        }
      }
      
      newBubbles.push({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        price: crypto.price,
        change: crypto.change24h,
        marketCap: crypto.marketCap,
        color: getCryptoColor(crypto.symbol),
        size: baseSize,
        x: finalX,
        y: finalY,
        baseSize: baseSize,
        vx: 0, // No movement
        vy: 0, // No movement
        targetX: finalX,
        targetY: finalY
      });
    });

    setBubbles(newBubbles);
  }, [containerSize, fetchRealTimeData]);

  // Update container size
  useEffect(() => {
    const updateSize = () => {
      setContainerSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Initialize bubbles when container size is available
  useEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0) {
      initializeBubbles();
    }
  }, [containerSize, initializeBubbles]);

  // Update bubbles with real-time data every 15 seconds for more frequent updates
  useEffect(() => {
    const interval = setInterval(async () => {
      const cryptoData = await fetchRealTimeData();
      setBubbles(prevBubbles => {
        // Calculate new sizes based on updated market caps
        const maxMarketCap = Math.max(...cryptoData.map(c => c.marketCap));
        const minMarketCap = Math.min(...cryptoData.map(c => c.marketCap));
        
        return prevBubbles.map(bubble => {
          // Find matching crypto by id
          const updatedCrypto = cryptoData.find((crypto: CryptoData) => crypto.id === bubble.id);
          
          if (updatedCrypto) {
            // Recalculate size based on market cap ratio
            const marketCapRatio = (updatedCrypto.marketCap - minMarketCap) / (maxMarketCap - minMarketCap);
            const newBaseSize = Math.max(40, Math.min(120, 40 + marketCapRatio * 80));
            
            // Add real-time variation to make it look more dynamic
            const priceVariation = 0.98 + Math.random() * 0.04; // ±2% variation
            const changeVariation = (Math.random() - 0.5) * 2; // ±1% variation
            
            return {
              ...bubble,
              price: updatedCrypto.price * priceVariation,
              change: updatedCrypto.change24h + changeVariation,
              marketCap: updatedCrypto.marketCap,
              baseSize: newBaseSize,
              size: newBaseSize,
            };
          }
          return bubble;
        });
      });
    }, 5000); // Update every 5 seconds for more real-time feel

    return () => clearInterval(interval);
  }, [fetchRealTimeData]);

  // Static positioning with size animation only
  useEffect(() => {
    const animationFrame = () => {
      setBubbles(prevBubbles => {
        return prevBubbles.map(bubble => {
          // NO MOVEMENT - bubbles stay in fixed positions
          // Only animate size based on percentage change
          
          // Animate size based on percentage change
          const changePercent = bubble.change;
          const baseSize = bubble.baseSize || bubble.size;
          
          // Calculate size multiplier based on percentage change
          let sizeMultiplier = 1;
          if (changePercent > 0) {
            // Positive change - grow slightly
            sizeMultiplier = 1 + Math.min(changePercent / 100, 0.2); // Max 20% growth
          } else if (changePercent < 0) {
            // Negative change - shrink slightly
            sizeMultiplier = 1 + Math.max(changePercent / 100, -0.2); // Max 20% shrink
          }
          
          // Apply size animation with smooth transition
          bubble.size = baseSize * sizeMultiplier;
          
          return bubble;
        });
      });
      
      requestAnimationFrame(animationFrame);
    };
    
    const frameId = requestAnimationFrame(animationFrame);
    return () => cancelAnimationFrame(frameId);
  }, [containerSize, bubbles]); // Add bubbles dependency for smooth updates

  // Format price for display - always 2 decimal places
  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return `$${price.toFixed(4)}`;
    } else if (price < 1) {
      return `$${price.toFixed(3)}`;
    } else {
      return `$${price.toFixed(2)}`;
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 120" preserveAspectRatio="none">
          <defs>
            <pattern id="bubbleGrid" width="50" height="60" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bubbleGrid)" />
        </svg>
      </div>

      {/* Crypto bubbles - Static positions with size animations */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full flex flex-col items-center justify-center text-white font-bold cursor-pointer backdrop-blur-sm"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x - bubble.size/2,
            top: bubble.y - bubble.size/2,
            background: `${bubble.color}`,
            border: `2px solid ${adjustColor(bubble.color, 30)}`,
            boxShadow: `
              0 4px 8px rgba(0, 0, 0, 0.3),
              0 0 20px ${bubble.color}40,
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `,
            backdropFilter: 'blur(10px)',
          }}
          animate={{
            scale: [
              1, 
              1 + (bubble.change > 0 ? bubble.change / 50 : 0), // More pronounced scaling
              1
            ],
            opacity: [0.9, 1, 0.9],
            boxShadow: [
              `0 4px 8px rgba(0, 0, 0, 0.3), 0 0 20px ${bubble.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)`,
              `0 6px 12px rgba(0, 0, 0, 0.4), 0 0 25px ${bubble.color}60, inset 0 2px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 0 rgba(0, 0, 0, 0.2)`,
              `0 4px 8px rgba(0, 0, 0, 0.3), 0 0 20px ${bubble.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)`
            ]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 }
          }}
        >
          <div className={`font-bold mb-1 text-white ${bubble.size < 60 ? 'text-xs' : bubble.size < 80 ? 'text-sm' : 'text-base'}`}>
            {bubble.symbol}
          </div>
          <div className={`font-bold text-white ${bubble.size < 60 ? 'text-xs' : bubble.size < 80 ? 'text-sm' : 'text-base'}`}>
            {formatPrice(bubble.price)}
          </div>
          <div className={`font-bold ${bubble.change >= 0 ? 'text-green-300' : 'text-red-300'} ${bubble.size < 60 ? 'text-xs' : bubble.size < 80 ? 'text-sm' : 'text-base'}`}>
            {bubble.change >= 0 ? '+' : ''}{bubble.change.toFixed(2)}%
          </div>
        </motion.div>
      ))}

      {/* Connection lines between nearby bubbles */}
      {bubbles.map((bubble, index) => 
        bubbles.slice(index + 1).map((otherBubble) => {
          const distance = Math.sqrt(
            Math.pow(bubble.x - otherBubble.x, 2) + 
            Math.pow(bubble.y - otherBubble.y, 2)
          );
          
          if (distance < 250) { // Only connect nearby bubbles
            const opacity = Math.max(0, 0.2 - distance / 250);
            return (
              <motion.line
                key={`connection-${bubble.id}-${otherBubble.id}`}
                x1={bubble.x}
                y1={bubble.y}
                x2={otherBubble.x}
                y2={otherBubble.y}
                stroke="url(#connectionGradient)"
                strokeWidth="1"
                opacity={opacity}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            );
          }
          return null;
        })
      )}

      {/* Gradient definitions */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Subtle floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  );
};

export default CryptoBubblesAnimation;