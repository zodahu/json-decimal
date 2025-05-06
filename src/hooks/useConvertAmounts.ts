import { useCallback, useState } from 'react';

import {
  getTokenDecimals,
  getTokenSymbol,
  weiToDecimal,
} from '../utils/tokenDecimals';

export interface TokenMapping {
  tokenKey: string;
  amountKeys: string[];
}

/**
 * 用於處理 JSON 中 Wei 數值的轉換
 *
 * @example
 * 輸入 JSON:
 * {
 *   "tokenIn": "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
 *   "amountIn": "1000000000",
 *   "tokenOut": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
 *   "amountOut": "5000000",
 *   "nested": {
 *     "tokenIn": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
 *     "amountIn": "500000000"
 *   }
 * }
 *
 * 輸出 JSON:
 * {
 *   "tokenIn": "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
 *   "amountIn": "1000 USDT",
 *   "tokenOut": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
 *   "amountOut": "0.05 WBTC",
 *   "nested": {
 *     "tokenIn": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
 *     "amountIn": "500 USDC"
 *   }
 * }
 */
export const useConvertAmounts = (initialMappings: TokenMapping[] = []) => {
  const [mappings, setMappings] = useState<TokenMapping[]>(initialMappings);
  const [convertedJson, setConvertedJson] = useState<Record<
    string,
    unknown
  > | null>(null);

  /**
   * 更新映射關係
   */
  const updateMappings = useCallback((newMappings: TokenMapping[]) => {
    setMappings(newMappings);
  }, []);

  /**
   * 遞迴轉換 JSON 中的金額
   */
  const convertAmounts = useCallback(
    (json: Record<string, unknown>) => {
      if (!json) return null;

      try {
        // 獲取解析後的 JSON
        const parsedJson = typeof json === "string" ? JSON.parse(json) : json;

        // 深拷貝以避免修改原始數據
        const result = JSON.parse(JSON.stringify(parsedJson));

        // 首先，找出所有的代幣地址及其對應的解析信息
        const tokenInfo = collectTokenInfo(result);

        // 然後，使用收集到的代幣信息處理所有金額
        processWithTokenInfo(result, tokenInfo);

        setConvertedJson(result);
        return result;
      } catch (error) {
        console.error("Error converting amounts:", error);
        return json;
      }
    },
    [mappings]
  );

  // 收集所有代幣地址及對應的解析信息
  const collectTokenInfo = useCallback(
    (
      obj: Record<string, unknown> | unknown[] | null,
      path: string = "",
      info: Record<
        string,
        { address: string; decimals: number; symbol: string }
      > = {}
    ) => {
      if (!obj || typeof obj !== "object") return info;

      // 檢查是否有代幣地址鍵
      for (const mapping of mappings) {
        const tokenKey = mapping.tokenKey;

        if (
          !Array.isArray(obj) &&
          tokenKey in obj &&
          typeof obj[tokenKey] === "string"
        ) {
          const tokenAddress = (obj[tokenKey] as string).toLowerCase();
          const currentPath = path ? `${path}.${tokenKey}` : tokenKey;

          const decimals = getTokenDecimals(tokenAddress);
          const symbol = getTokenSymbol(tokenAddress);

          // 保存代幣信息，以及相關的路徑信息
          info[currentPath] = {
            address: tokenAddress,
            decimals,
            symbol,
          };
        }
      }

      // 遞迴處理數組
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          if (item && typeof item === "object") {
            collectTokenInfo(
              item as Record<string, unknown>,
              path ? `${path}[${index}]` : `[${index}]`,
              info
            );
          }
        });
      }
      // 遞迴處理對象
      else {
        Object.keys(obj).forEach((key) => {
          if (obj[key] && typeof obj[key] === "object") {
            collectTokenInfo(
              obj[key] as Record<string, unknown>,
              path ? `${path}.${key}` : key,
              info
            );
          }
        });
      }

      return info;
    },
    [mappings]
  );

  // 使用收集到的代幣信息處理所有金額
  const processWithTokenInfo = useCallback(
    (
      obj: Record<string, unknown> | unknown[] | null,
      tokenInfo: Record<
        string,
        { address: string; decimals: number; symbol: string }
      >,
      path: string = ""
    ) => {
      if (!obj || typeof obj !== "object") return;

      // 處理每個可能的金額鍵
      for (const mapping of mappings) {
        const tokenKey = mapping.tokenKey;
        const amountKeys = mapping.amountKeys;

        // 檢查這個對象的路徑是否有關聯的代幣信息
        const relevantTokenKeys: string[] = [];

        // 1. 檢查當前對象是否有代幣鍵
        const currentTokenPath = path ? `${path}.${tokenKey}` : tokenKey;
        if (tokenInfo[currentTokenPath]) {
          relevantTokenKeys.push(currentTokenPath);
        }

        // 2. 檢查父層級是否有代幣鍵 (向上查找最近的代幣信息)
        if (relevantTokenKeys.length === 0) {
          const pathParts = path.split(".");
          while (pathParts.length > 0) {
            const parentPath = pathParts.join(".");
            const parentTokenPath = parentPath
              ? `${parentPath}.${tokenKey}`
              : tokenKey;

            if (tokenInfo[parentTokenPath]) {
              relevantTokenKeys.push(parentTokenPath);
              break;
            }

            pathParts.pop();
          }
        }

        // 3. 檢查這個對象內部是否有 sellToken 或 buyToken
        if (
          !Array.isArray(obj) &&
          "sellToken" in obj &&
          tokenKey === "sellToken" &&
          typeof obj.sellToken === "string"
        ) {
          const currentTokenInfo = {
            address: obj.sellToken.toLowerCase(),
            decimals: getTokenDecimals(obj.sellToken.toLowerCase()),
            symbol: getTokenSymbol(obj.sellToken.toLowerCase()),
          };

          // 處理該對象內的 sellAmount
          for (const amountKey of amountKeys) {
            if (amountKey in obj && typeof obj[amountKey] === "string") {
              const convertedAmount = weiToDecimal(
                obj[amountKey] as string,
                currentTokenInfo.decimals
              );
              obj[amountKey] = currentTokenInfo.symbol
                ? `${convertedAmount} ${currentTokenInfo.symbol}`
                : `${convertedAmount}`;
            }
          }
        } else if (
          !Array.isArray(obj) &&
          "buyToken" in obj &&
          tokenKey === "buyToken" &&
          typeof obj.buyToken === "string"
        ) {
          const currentTokenInfo = {
            address: obj.buyToken.toLowerCase(),
            decimals: getTokenDecimals(obj.buyToken.toLowerCase()),
            symbol: getTokenSymbol(obj.buyToken.toLowerCase()),
          };

          // 處理該對象內的 buyAmount
          for (const amountKey of amountKeys) {
            if (amountKey in obj && typeof obj[amountKey] === "string") {
              const convertedAmount = weiToDecimal(
                obj[amountKey] as string,
                currentTokenInfo.decimals
              );
              obj[amountKey] = currentTokenInfo.symbol
                ? `${convertedAmount} ${currentTokenInfo.symbol}`
                : `${convertedAmount}`;
            }
          }
        }

        // 4. 處理 quote 和其他嵌套對象中的金額
        else if (relevantTokenKeys.length > 0) {
          const tokenPath = relevantTokenKeys[0]; // 使用找到的最匹配的代幣信息
          const { decimals, symbol } = tokenInfo[tokenPath];

          if (!Array.isArray(obj)) {
            for (const amountKey of amountKeys) {
              if (amountKey in obj && typeof obj[amountKey] === "string") {
                const convertedAmount = weiToDecimal(
                  obj[amountKey] as string,
                  decimals
                );
                obj[amountKey] = symbol
                  ? `${convertedAmount} ${symbol}`
                  : `${convertedAmount}`;
              }
            }
          }
        }
      }

      // 遞迴處理數組
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          if (item && typeof item === "object") {
            processWithTokenInfo(
              item as Record<string, unknown>,
              tokenInfo,
              path ? `${path}[${index}]` : `[${index}]`
            );
          }
        });
      }
      // 遞迴處理對象
      else {
        Object.keys(obj).forEach((key) => {
          if (obj[key] && typeof obj[key] === "object") {
            processWithTokenInfo(
              obj[key] as Record<string, unknown>,
              tokenInfo,
              path ? `${path}.${key}` : key
            );
          }
        });
      }
    },
    [mappings]
  );

  return {
    convertedJson,
    convertAmounts,
    mappings,
    updateMappings,
  };
};

export default useConvertAmounts;
