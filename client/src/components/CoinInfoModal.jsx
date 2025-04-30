import { Divider, Tag, Typography } from "antd";
import { CoinInfo } from "./CoinInfo";

export const CoinInfoModal = ({ coin }) => {

  return (
    <>
      <CoinInfo coin={coin} withSymbol /> {/* analog => withSymbol={true} */}

      <Divider />

      <Typography.Paragraph>
        <Typography.Text strong>One hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red' }>{coin.priceChange1h} %</Tag>

        <Typography.Text strong>One day: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? 'green' : 'red' }>{coin.priceChange1d} %</Tag>

        <Typography.Text strong>One week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red' }>{coin.priceChange1w} %</Tag>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>
          {coin.price.toFixed(2)} $
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: </Typography.Text>
          {coin.priceBtc.toFixed(2)} $
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: </Typography.Text>
          {coin.marketCap}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Contract Address: </Typography.Text>
          {coin.contractAddress}
      </Typography.Paragraph>
    </>
  );
};
