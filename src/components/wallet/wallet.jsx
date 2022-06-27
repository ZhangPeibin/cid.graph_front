import { InjectedConnector } from 'wagmi/connectors/injected'
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'
import './index.less'
import {Button, Icon, Input, Menu, Modal, message, Spin, Tooltip} from 'antd'
function ellipseAddress(address = '', width = 6) {
    if (!address) {
      return ''
    }
    return `${address.slice(0, width)}...${address.slice(-width)}`
}
  
  
export default function Wallet() {
    const { data: account } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
    const { data: ensName } = useEnsName({ address: account?.address })
    const { connect, connectors, error, isConnecting, pendingConnector } =
      useConnect()
    const { disconnect } = useDisconnect()
  
    if (account) {
      return (
        <div className='wallet'>
          {/* <img src={ensAvatar} alt="ENS Avatar" /> */}
          <div>
            {ensName ? `${ensName} (${ellipseAddress(account.address)})` : account.address}
          </div>
          <Button type="secondry" onClick={disconnect}>Disconnect</Button>
        </div>
      )
    }
  
    return (
      <div>
        {connectors.map((connector) => (
          <Button  type="primary"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect(connector)}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isConnecting &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </Button>
        ))}
  
        {error && <div>{error.message}</div>}
      </div>
    )
  }