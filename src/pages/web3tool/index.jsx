import React from 'react'
import { Card ,Button, Form, Input,Icon,message} from 'antd';
import Wallet from '../../components/wallet/wallet'
import { ethers,BigNumber } from 'ethers';
import { useAccount } from 'wagmi'
import { useSendTransaction } from 'wagmi'
import { useSignMessage } from 'wagmi'

const title = 'EVODEFI工具'
export default function Web3Tool() {
  const { data, isIdle, isError, isLoading, isSuccess, sendTransaction } =
  useSendTransaction({
    request: {
      to: 'awkweb.eth',
      value: BigNumber.from('1000'), // 1 ETH
    },
  })
  const success = () => {
    message.success('交易成功');
  };
  
  const error = () => {
    message.error('error');
  };
  
  const warning = (data) => {
    message.warning(JSON.stringify(data));
  };
  return (
    <Card className='web3tool'
        title={title}>
        <Form
            name="wrap"
            labelAlign="left"
            labelWrap
            wrapperCol={{
            flex: 1,
            }}
            colon={false}
        >
            <Form.Item
            label="浏览器提现地址"
            name="withdrawurl"
            >
            <Input />
            </Form.Item>
            
            <Form.Item label=" ">
                <Button type="primary" htmlType="submit" onClick={()=>sendTransaction()}>
                    发起交易
                </Button>
            </Form.Item>
        </Form>
        {isSuccess && success()}
        {isError && error()}
    </Card>
  )
}
