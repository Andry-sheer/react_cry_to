import { Flex, Typography } from "antd"

export const CoinInfo = ({ coin, withSymbol }) => {
  return (
    <Flex align="center" justify="center" gap={10}>
      <img
        style={{ width: 30, height: 30, borderRadius: '50%', padding: '0.1rem', border: '1px solid #ccc'}}
        src={coin.icon}
        alt={coin.name} />
      <Typography.Title style={{margin: 0}} level={2}>
        {withSymbol && <span>({coin.symbol})</span>} {coin.name}
      </Typography.Title>
    </Flex>
  )
}