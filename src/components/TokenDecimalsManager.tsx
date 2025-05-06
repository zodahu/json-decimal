import React, { useEffect, useState } from 'react';

import type { TokenInfo } from '../utils/tokenDecimals';

export interface TokenDecimal {
  address: string;
  decimals: number;
  symbol: string;
}

interface TokenDecimalsManagerProps {
  tokenDecimals: Record<string, TokenInfo>;
  onUpdate: (newTokenDecimals: Record<string, TokenInfo>) => void;
}

const TokenDecimalsManager: React.FC<TokenDecimalsManagerProps> = ({
  tokenDecimals,
  onUpdate,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newTokenAddress, setNewTokenAddress] = useState("");
  const [newTokenDecimals, setNewTokenDecimals] = useState("18");
  const [newTokenSymbol, setNewTokenSymbol] = useState("");
  const [tokenList, setTokenList] = useState<TokenDecimal[]>([]);
  const [editingToken, setEditingToken] = useState<string | null>(null);
  const [editDecimals, setEditDecimals] = useState("");
  const [editSymbol, setEditSymbol] = useState("");

  // 將物件轉換為陣列方便處理
  useEffect(() => {
    const list = Object.entries(tokenDecimals).map(([address, tokenInfo]) => ({
      address,
      decimals: tokenInfo.decimals,
      symbol: tokenInfo.symbol || "",
    }));
    setTokenList(list);
  }, [tokenDecimals]);

  // 過濾後的列表
  const filteredTokens = tokenList.filter(
    (token) =>
      token.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (token.symbol &&
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 新增代幣
  const handleAddToken = () => {
    if (!newTokenAddress || !newTokenDecimals) return;

    const decimals = parseInt(newTokenDecimals, 10);
    if (isNaN(decimals)) return;

    // 確保地址使用小寫
    const normalizedAddress = newTokenAddress.toLowerCase();

    const newTokens = {
      ...tokenDecimals,
      [normalizedAddress]: {
        decimals,
        symbol: newTokenSymbol || "",
      },
    };

    onUpdate(newTokens);
    setNewTokenAddress("");
    setNewTokenDecimals("18");
    setNewTokenSymbol("");
  };

  // 刪除代幣
  const handleDeleteToken = (address: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [address]: _, ...rest } = tokenDecimals;
    onUpdate(rest);
  };

  // 開始編輯
  const handleStartEdit = (token: TokenDecimal) => {
    setEditingToken(token.address);
    setEditDecimals(token.decimals.toString());
    setEditSymbol(token.symbol || "");
  };

  // 保存編輯
  const handleSaveEdit = () => {
    if (!editingToken) return;

    const decimals = parseInt(editDecimals, 10);
    if (isNaN(decimals)) return;

    const newTokens = { ...tokenDecimals };
    // 使用原有的地址鍵（它已經是小寫的，因為來自 tokenDecimals）
    newTokens[editingToken] = {
      decimals,
      symbol: editSymbol || "",
    };

    onUpdate(newTokens);
    setEditingToken(null);
  };

  // 取消編輯
  const handleCancelEdit = () => {
    setEditingToken(null);
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      {/* 搜尋框 */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜尋代幣地址或符號..."
          style={{
            width: "100%",
            padding: "8px 12px",
            backgroundColor: "#2d2d2d",
            border: "1px solid #444",
            borderRadius: "4px",
            color: "white",
          }}
        />
      </div>

      {/* 新增代幣區域 */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          value={newTokenAddress}
          onChange={(e) => setNewTokenAddress(e.target.value)}
          placeholder="代幣地址 (0x...)"
          style={{
            flex: "3 1 300px",
            padding: "8px 12px",
            backgroundColor: "#2d2d2d",
            border: "1px solid #444",
            borderRadius: "4px",
            color: "white",
          }}
        />
        <input
          type="text"
          value={newTokenSymbol}
          onChange={(e) => setNewTokenSymbol(e.target.value)}
          placeholder="符號 (選填)"
          style={{
            flex: "1 1 100px",
            padding: "8px 12px",
            backgroundColor: "#2d2d2d",
            border: "1px solid #444",
            borderRadius: "4px",
            color: "white",
          }}
        />
        <input
          type="number"
          value={newTokenDecimals}
          onChange={(e) => setNewTokenDecimals(e.target.value)}
          placeholder="小數位 (例: 18)"
          style={{
            flex: "1 1 80px",
            padding: "8px 12px",
            backgroundColor: "#2d2d2d",
            border: "1px solid #444",
            borderRadius: "4px",
            color: "white",
          }}
        />
        <button
          onClick={handleAddToken}
          style={{
            padding: "8px 16px",
            backgroundColor: "#0e639c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            flex: "0 0 auto",
          }}
        >
          新增代幣
        </button>
      </div>

      {/* 代幣列表 */}
      <div
        style={{
          border: "1px solid #333",
          borderRadius: "4px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{ backgroundColor: "#252526", position: "sticky", top: 0 }}
            >
              <th
                style={{
                  padding: "8px 12px",
                  textAlign: "left",
                  borderBottom: "1px solid #444",
                }}
              >
                代幣地址
              </th>
              <th
                style={{
                  padding: "8px 12px",
                  textAlign: "center",
                  borderBottom: "1px solid #444",
                }}
              >
                小數位
              </th>
              <th
                style={{
                  padding: "8px 12px",
                  textAlign: "right",
                  borderBottom: "1px solid #444",
                }}
              >
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token, index) => (
                <tr
                  key={token.address}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#1e1e1e" : "#252526",
                  }}
                >
                  <td
                    style={{
                      padding: "8px 12px",
                      color: "#9cdcfe",
                      wordBreak: "break-all",
                    }}
                  >
                    {token.address}
                    {token.symbol && (
                      <span style={{ marginLeft: "8px", color: "#ce9178" }}>
                        ({token.symbol})
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "8px 12px", textAlign: "center" }}>
                    {editingToken === token.address ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="number"
                          value={editDecimals}
                          onChange={(e) => setEditDecimals(e.target.value)}
                          style={{
                            width: "60px",
                            padding: "4px 8px",
                            backgroundColor: "#2d2d2d",
                            border: "1px solid #444",
                            borderRadius: "4px",
                            color: "white",
                            textAlign: "center",
                          }}
                        />
                        <input
                          type="text"
                          value={editSymbol}
                          onChange={(e) => setEditSymbol(e.target.value)}
                          placeholder="符號"
                          style={{
                            width: "80px",
                            padding: "4px 8px",
                            backgroundColor: "#2d2d2d",
                            border: "1px solid #444",
                            borderRadius: "4px",
                            color: "white",
                            textAlign: "center",
                          }}
                        />
                      </div>
                    ) : (
                      <span style={{ color: "#b5cea8" }}>{token.decimals}</span>
                    )}
                  </td>
                  <td style={{ padding: "8px 12px", textAlign: "right" }}>
                    {editingToken === token.address ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={handleSaveEdit}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#0e639c",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          保存
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#333",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={() => handleStartEdit(token)}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#333",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => handleDeleteToken(token.address)}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#5a1e1e",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          刪除
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    color: "#888",
                  }}
                >
                  {searchTerm ? "沒有符合搜尋條件的代幣" : "沒有代幣資料"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenDecimalsManager;
