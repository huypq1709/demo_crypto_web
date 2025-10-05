import axios from 'axios';

// Crypto API configuration
const COIN_GECKO_API = 'https://api.coingecko.com/api/v3';
const COIN_MARKET_CAP_API = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const COIN_MARKET_CAP_API_KEY = 'YOUR_COINMARKETCAP_API_KEY_HERE'; // Get from https://coinmarketcap.com/api/

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  rank: number;
  image?: string;
  lastUpdated: string;
}

// Get top 10 cryptocurrencies by market cap
export const fetchTop10Cryptos = async (): Promise<CryptoData[]> => {
  try {
    // Try CoinGecko API first (free tier)
    const response = await axios.get(`${COIN_GECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h'
      }
    });

    return response.data.map((coin: any, index: number) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h || 0,
      volume24h: coin.total_volume,
      marketCap: coin.market_cap,
      rank: index + 1,
      image: coin.image,
      lastUpdated: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    // Fallback to mock data with current top 10 coins
    return getMockTop10Cryptos();
  }
};

// Mock data for top 10 cryptocurrencies (current as of 2024)
const getMockTop10Cryptos = (): CryptoData[] => {
  const currentTime = new Date().toISOString();
  
  return [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 43250.67,
      change24h: 2.34,
      volume24h: 28500000000,
      marketCap: 850000000000,
      rank: 1,
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      lastUpdated: currentTime
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2650.45,
      change24h: 1.87,
      volume24h: 15200000000,
      marketCap: 320000000000,
      rank: 2,
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      lastUpdated: currentTime
    },
    {
      id: 'tether',
      name: 'Tether',
      symbol: 'USDT',
      price: 1.0001,
      change24h: 0.01,
      volume24h: 45000000000,
      marketCap: 95000000000,
      rank: 3,
      image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
      lastUpdated: currentTime
    },
    {
      id: 'binancecoin',
      name: 'BNB',
      symbol: 'BNB',
      price: 315.78,
      change24h: -0.45,
      volume24h: 1200000000,
      marketCap: 48000000000,
      rank: 4,
      image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
      lastUpdated: currentTime
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      price: 98.45,
      change24h: 4.23,
      volume24h: 2800000000,
      marketCap: 42000000000,
      rank: 5,
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      lastUpdated: currentTime
    },
    {
      id: 'xrp',
      name: 'XRP',
      symbol: 'XRP',
      price: 0.6234,
      change24h: -1.23,
      volume24h: 1800000000,
      marketCap: 35000000000,
      rank: 6,
      image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
      lastUpdated: currentTime
    },
    {
      id: 'usd-coin',
      name: 'USD Coin',
      symbol: 'USDC',
      price: 1.0002,
      change24h: 0.02,
      volume24h: 8500000000,
      marketCap: 28000000000,
      rank: 7,
      image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
      lastUpdated: currentTime
    },
    {
      id: 'staked-ether',
      name: 'Lido Staked Ether',
      symbol: 'STETH',
      price: 2648.90,
      change24h: 1.89,
      volume24h: 450000000,
      marketCap: 25000000000,
      rank: 8,
      image: 'https://assets.coingecko.com/coins/images/13442/large/steth_logo.png',
      lastUpdated: currentTime
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      price: 0.4856,
      change24h: 3.12,
      volume24h: 1200000000,
      marketCap: 17000000000,
      rank: 9,
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      lastUpdated: currentTime
    },
    {
      id: 'avalanche-2',
      name: 'Avalanche',
      symbol: 'AVAX',
      price: 36.78,
      change24h: -2.15,
      volume24h: 850000000,
      marketCap: 14000000000,
      rank: 10,
      image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
      lastUpdated: currentTime
    }
  ];
};

// Format large numbers
export const formatNumber = (num: number): string => {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(1) + 'T';
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num.toFixed(2);
};

// Format price
export const formatPrice = (price: number): string => {
  if (price >= 1000) {
    return '$' + price.toLocaleString('en-US', { maximumFractionDigits: 0 });
  } else if (price >= 1) {
    return '$' + price.toFixed(2);
  } else {
    return '$' + price.toFixed(4);
  }
};

export default { fetchTop10Cryptos, formatNumber, formatPrice };
