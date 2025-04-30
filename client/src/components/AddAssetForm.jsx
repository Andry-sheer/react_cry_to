import { Button, Divider, Select, Space, Typography, Form, InputNumber, DatePicker, Result } from "antd"
import { useRef, useState } from "react"
import { useCrypto } from "../context/crypto-context"
import { CoinInfo } from "./CoinInfo"

export const AddAssetForm = ({ onClose }) => {
  const { crypto, addAsset } = useCrypto()
  const [coin, setCoin] = useState(null)
  const [form] = Form.useForm()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const assetRef = useRef()

  if (isSubmitted) {
    return (
      <Result
        status="success"
        title="Successfully Added Asset!"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>
      ]}
    />
    )
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        placeholder="Select a coin"
        onSelect={(v) => setCoin((crypto.find((c)=> c.id === v)))}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
      optionRender={(option) => (
        <Space>
          <img
            style={{ width: 20, height: 20 }}
            src={option.data.icon}
            alt={option.data.label}
          />
          {option.data.label}
        </Space>
      )}
    />
    )
  }

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    }
    assetRef.current = newAsset
    setIsSubmitted(true)
    addAsset(newAsset)
  }

  const handleAmountChange = (value)=> {
    const price = form.getFieldValue('price')
    form.setFieldsValue({
      total: +(value * price).toFixed(2)
    })
  }

  const handlePriceChange = (value)=> {
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(amount * value).toFixed(2)
    })
  }

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}"
    }
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >

      <CoinInfo coin={coin} />
        
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, type: 'number', min: 0}]}
      >
        <InputNumber 
          placeholder="Enter coin amount" 
          onChange={handleAmountChange}
          style={{ width: '100%' }} 
        />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
      >
        <InputNumber 
          placeholder="Enter price" 
          onChange={handlePriceChange} 
          style={{ width: '100%' }} 
        />
      </Form.Item>

      <Form.Item
        label="Date & Time"
        name="date"
      >
        <DatePicker placeholder="Select Date" showTime style={{width: '100%'}} />
      </Form.Item>

      <Form.Item
        label="Total"
        name="total"
      >
        <InputNumber placeholder="Total coin" disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  )
}
