// Ethereum token decimals mapping
export interface TokenInfo {
  decimals: number;
  symbol: string;
}

export const defaultTokenDecimals: Record<string, TokenInfo> = {
  // 保留舊有非 18 decimals 的 tokens
  "0x5b7533812759b45c2b44c19e320ba2cd2681b542": { decimals: 8, symbol: "AGIX" },
  "0x9eead9ce15383caeed975427340b3a369410cfbf": {
    decimals: 6,
    symbol: "AlloyUSDT",
  },
  "0xd46ba6d942050d489dbd938a2c909a5d5039a161": { decimals: 9, symbol: "AMPL" },
  "0xdac17f958d2ee523a2206206994597c13d831ec7": { decimals: 6, symbol: "USDT" },
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { decimals: 6, symbol: "USDC" },
  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": { decimals: 8, symbol: "WBTC" },

  // 新增用戶提供的非 18 decimals tokens
  "0x00000000efe302beaa2b3e6e1b18d08d69a9012a": { decimals: 6, symbol: "AUSD" },
  "0x9be89d2a4cd102d8fecc6bf9da793be995c22541": { decimals: 8, symbol: "BBTC" },
  "0x0590cc9232ebf68d81f6707a119898219342ecb9": { decimals: 9, symbol: "BCAT" },
  "0xbea0000029ad1c77d3d5d23ba2d8893db9d1efab": { decimals: 6, symbol: "BEAN" },
  "0x72e4f9f808c49a2a61de9c5896298920dc4eeea9": {
    decimals: 8,
    symbol: "BITCOIN",
  },
  "0x8c41455aaa8d6aba3150058d4964349294bf78a3": { decimals: 9, symbol: "BULL" },
  "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf": {
    decimals: 8,
    symbol: "CbBTC",
  },
  "0xc581b735a1688071a1746c968e0798d642ede491": { decimals: 6, symbol: "EURT" },
  "0xdb25f211ab05b1c97d595516f45794528a807ad8": { decimals: 2, symbol: "EURS" },
  "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c": { decimals: 6, symbol: "EURC" },
  "0xc96de26018a54d51c097160568752c4e3bd6c364": { decimals: 8, symbol: "FBTC" },
  "0xfd56a3dcfc0690881a466ae432d71bb2db588083": {
    decimals: 6,
    symbol: "FLEET",
  },
  "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e": {
    decimals: 9,
    symbol: "FLOKI",
  },
  "0x465a5a630482f3abd6d3b84b39b29b07214d19e5": {
    decimals: 8,
    symbol: "FUSDC",
  },
  "0xd1d2eb1b1e90b638588728b4130137d262c87cae": { decimals: 8, symbol: "GALA" },
  "0xe3c408bd53c31c085a1746af401a4042954ff740": {
    decimals: 8,
    symbol: "GreenMT",
  },
  "0x8390a1da07e376ef7add4be859ba74fb83aa02d5": { decimals: 9, symbol: "GROK" },
  "0x393f1d49425d94f47b26e591a9d111df5cd61065": { decimals: 2, symbol: "GUA" },
  "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd": { decimals: 2, symbol: "GUSD" },
  "0x3819f64f282bf135d62168c1e513280daf905e06": { decimals: 9, symbol: "HDRN" },
  "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39": { decimals: 8, symbol: "HEX" },
  "0xb8919522331c59f5c16bdfaa6a121a6e03a91f62": { decimals: 6, symbol: "HOME" },
  "0x20157dbabbe84e3bbfe68c349d0d44e48ae7b5ad2": {
    decimals: 8,
    symbol: "IBTC",
  },
  "0xfc4913214444af5c715cc9f7b52655e788a569ed": { decimals: 9, symbol: "ICSA" },
  "0x1fdd61ef9a5c31b9a2abc7d39c139c779e8412af": { decimals: 9, symbol: "JJ" },
  "0xceb67a66c2c8a90980da3a50a3f96c07525a26cb": {
    decimals: 9,
    symbol: "KABOSU",
  },
  "0x96543ef8d2c75c26387c1a319ae69c0bee6f3fe7": { decimals: 6, symbol: "KUJI" },
  "0x8236a87084f8b84306f72007f36f2618a5634494": { decimals: 8, symbol: "LBTC" },
  "0x5401b8620e5fb570064ca9114fd1e135fd77d57c": {
    decimals: 8,
    symbol: "LBTCv",
  },
  "0xc673ef7791724f0dcca38adb47fbb3aef3db6c80": {
    decimals: 8,
    symbol: "LiquidBeraBTC",
  },
  "0x5f46d540b6ed704c3c8789105f30e075aa900726": {
    decimals: 8,
    symbol: "LiquidBTC",
  },
  "0x08c6f91e2b681faf5e17227f2a44c307b3c1364c": {
    decimals: 6,
    symbol: "LiquidUSD",
  },
  "0x08a1c30bbb26425c1031ee9e43fa0b9960742539": { decimals: 6, symbol: "LNDX" },
  "0x866a2bf4e572cbcf37d5071a7a58503bfb36be1b": { decimals: 6, symbol: "M" },
  "0x812ba41e071c7b7fa4ebcfb62df5f45f6fa853ee": {
    decimals: 9,
    symbol: "Neiro",
  },
  "0xb60fdf036f2ad584f79525b5da76c5c531283a1b": { decimals: 9, symbol: "NEMO" },
  "0xcfeaead4947f0705a14ec42ac3d44129e1ef3ed5": { decimals: 8, symbol: "NOTE" },
  "0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5": { decimals: 9, symbol: "OHM" },
  "0x9e18d5bab2fa94a6a95f509ecb38f8f68322abd3": {
    decimals: 9,
    symbol: "OMIKAMI",
  },
  "0xd3043d66afe00344c115f7f81d18277c5c718ff8": {
    decimals: 6,
    symbol: "OmUSD",
  },
  "0xf469fbd2abcd6b9de8e169d128226c0fc90a012e": {
    decimals: 8,
    symbol: "PumpBTC",
  },
  "0x6c3ea9036406852006290770bedfcaba0e23a0e8": {
    decimals: 6,
    symbol: "PYUSD",
  },
  "0x690031313d70c2545357f4487c6a3f134c434507": { decimals: 9, symbol: "QQQ" },
  "0x4123a133ae3c521fd134d7b13a2dec35b56c2463": { decimals: 8, symbol: "QRDO" },
  "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d": {
    decimals: 8,
    symbol: "RenBTC",
  },
  "0x2bd1f344a2398340c2b1119da98816ea723f5f0f": { decimals: 6, symbol: "ROME" },
  "0xa43d9f9982ba219e8cbc442aec1304ad014caaa5": {
    decimals: 6,
    symbol: "RsGIF",
  },
  "0x526be1c610616be0e8e69893fc6766fddfbada61": { decimals: 6, symbol: "RTBL" },
  "0xd31a59c85ae9d8edefec411d448f90841571b89c": { decimals: 9, symbol: "SOL" },
  "0xa670d7237398238de01267472c6f13e5b8010fd1": { decimals: 6, symbol: "SOMM" },
  "0xe0f63a424a4439cbe457d80e4f4b51ad25b2c56c": { decimals: 8, symbol: "SPX" },
  "0x7ac168c81f4f3820fa3f22603ce5864d6ab3c547": {
    decimals: 8,
    symbol: "StACME",
  },
  "0xb60acd2057067dc9ed8c083f5aa227a244044fd6": {
    decimals: 9,
    symbol: "StTAO",
  },
  "0x8db2350d78abc13f5673a411d4700bcf87864dde": {
    decimals: 8,
    symbol: "SwBTC",
  },
  "0x0258f474786ddfd37abce6df6bbb1dd5dfc4434a": {
    decimals: 8,
    symbol: "ORN",
  },

  // decimals 為 18 的 tokens
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": {
    decimals: 18,
    symbol: "ETH",
  },
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
    decimals: 18,
    symbol: "WETH",
  },
  "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0": {
    decimals: 18,
    symbol: "wstETH",
  },
  "0x8f08b70456eb22f6109f57b8fafe862ed28e6040": {
    decimals: 18,
    symbol: "KING",
  },
};

// 保存當前的 tokenDecimals 對象
let tokenDecimals: Record<string, TokenInfo> = { ...defaultTokenDecimals };

// 更新 tokenDecimals 對象
export const updateTokenDecimals = (
  newTokenDecimals: Record<string, TokenInfo>
): void => {
  // 創建一個新的對象，將所有地址轉為小寫
  const normalizedTokenDecimals: Record<string, TokenInfo> = {};

  for (const [address, info] of Object.entries(newTokenDecimals)) {
    normalizedTokenDecimals[address.toLowerCase()] = info;
  }

  tokenDecimals = normalizedTokenDecimals;
};

// 獲取當前的 tokenDecimals 對象
export const getTokenDecimalsList = (): Record<string, TokenInfo> => {
  return { ...tokenDecimals };
};

// 獲取 token 的小數位數
export const getTokenDecimals = (tokenAddress: string): number => {
  if (!tokenAddress) return 18;

  // 將地址轉為小寫以便比較
  const normalizedAddress = tokenAddress.toLowerCase();

  // 尋找對應的 decimals
  return tokenDecimals[normalizedAddress]?.decimals || 18;
};

// 獲取 token 的 symbol
export const getTokenSymbol = (tokenAddress: string): string => {
  if (!tokenAddress) return "";

  // 將地址轉為小寫以便比較
  const normalizedAddress = tokenAddress.toLowerCase();

  // 尋找對應的 symbol
  return tokenDecimals[normalizedAddress]?.symbol || "";
};

// 將 Wei 轉換為小數單位
export const weiToDecimal = (amount: string, decimals: number): string => {
  try {
    if (!amount) return "0";

    // 處理科學記數法
    const amountStr = amount.toString();
    if (amountStr.includes("e")) {
      const parts = amountStr.split("e");
      const base = parseFloat(parts[0]);
      const exponent = parseInt(parts[1]);

      if (exponent > 0) {
        return (base * Math.pow(10, exponent)).toString();
      } else {
        // 處理非常小的數字
        return base.toFixed(Math.abs(exponent) + 6);
      }
    }

    // 正常處理
    if (amountStr === "0") return "0";

    // 將數字字符串轉為 BigInt
    const amountBigInt = BigInt(amountStr);
    const divisor = BigInt(10) ** BigInt(decimals);

    // 計算整數部分
    const integerPart = amountBigInt / divisor;

    // 計算小數部分
    const remainder = amountBigInt % divisor;
    let fractionalPart = remainder.toString().padStart(decimals, "0");

    // 移除尾部的 0
    while (fractionalPart.endsWith("0") && fractionalPart.length > 1) {
      fractionalPart = fractionalPart.slice(0, -1);
    }

    if (fractionalPart === "0") {
      return integerPart.toString();
    }

    return `${integerPart}.${fractionalPart}`;
  } catch (error) {
    console.error("Error converting Wei to decimal:", error);
    return amount;
  }
};
