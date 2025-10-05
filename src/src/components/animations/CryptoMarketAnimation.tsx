import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CryptoData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  color: string;
}

const CryptoMarketAnimation: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    { name: 'Bitcoin', symbol: 'BTC', price: 43250.67, change: 2.5, color: '#f7931a' },
    { name: 'Ethereum', symbol: 'ETH', price: 2650.45, change: 1.8, color: '#627eea' },
    { name: 'Cardano', symbol: 'ADA', price: 0.4856, change: -0.5, color: '#0033ad' },
    { name: 'Solana', symbol: 'SOL', price: 98.45, change: 3.2, color: '#9945ff' },
    { name: 'Polkadot', symbol: 'DOT', price: 6.78, change: 1.2, color: '#e6007a' },
  ]);

  // Update prices randomly for animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.02),
        change: (Math.random() - 0.5) * 4
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Central blockchain network */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Central node */}
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(147, 51, 234, 0.8)",
                "0 0 20px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <span className="text-white font-bold text-lg">₿</span>
          </motion.div>

          {/* Orbiting nodes */}
          {cryptoData.map((crypto, index) => {
            const angle = (index * 72) * (Math.PI / 180);
            const radius = 80;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={crypto.symbol}
                className="absolute w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${crypto.color}40, ${crypto.color}80)`,
                  border: `2px solid ${crypto.color}`,
                  left: `calc(50% + ${x}px - 24px)`,
                  top: `calc(50% + ${y}px - 24px)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.5
                  },
                  rotate: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                <span className="text-white font-bold text-xs">{crypto.symbol}</span>
              </motion.div>
            );
          })}

          {/* Connection lines */}
          {cryptoData.map((_, index) => {
            const angle = (index * 72) * (Math.PI / 180);
            const radius = 80;

            return (
              <motion.div
                key={`line-${index}`}
                className="absolute w-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left"
                style={{
                  left: '50%',
                  top: '50%',
                  height: '2px',
                  transformOrigin: '0 0',
                  transform: `rotate(${angle}rad)`,
                  width: `${radius}px`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scaleX: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.3
                }}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Floating price cards */}
      {cryptoData.map((crypto, index) => {
        const positions = [
          { top: '10%', left: '5%' },
          { top: '20%', right: '10%' },
          { top: '60%', left: '8%' },
          { top: '70%', right: '5%' },
          { top: '40%', left: '2%' },
        ];

        return (
          <motion.div
            key={`price-${crypto.symbol}`}
            className="absolute bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-700"
            style={positions[index]}
            animate={{
              y: [0, -10, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3 + index * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.8
            }}
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: crypto.color }}
              >
                <span className="text-white text-xs font-bold">{crypto.symbol[0]}</span>
              </div>
              <div>
                <div className="text-xs text-gray-400">{crypto.name}</div>
                <div className="text-sm font-medium text-white">
                  ${crypto.price.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </div>
                <div className={`text-xs ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Data flow particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.5
          }}
        />
      ))}

      {/* Market trend indicators */}
      <motion.div
        className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        Market Up 2.4%
      </motion.div>

    </div>
  );
};

export default CryptoMarketAnimation;
