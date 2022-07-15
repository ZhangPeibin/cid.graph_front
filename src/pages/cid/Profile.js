import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName, useSignMessage,
} from 'wagmi'
import React from "react";
import {verifyMessage} from "ethers/lib.esm/utils";

export function Profile() {

    const recoveredAddress = React.useRef();
    const { data, signMessage } = useSignMessage({
        onSuccess(data, variables) {
            // Verify signature when sign message succeeds
            const address = verifyMessage(variables.message, data)
            recoveredAddress.current = address
        },
    })

    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: address })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { disconnect } = useDisconnect()

    if (isConnected) {
        return (
            <div>
                <button className='btn-connect' onClick={disconnect}>Connected:{address.substring(0,4)}****{address.substring(address.length-4,address.length)}</button>
            </div>
        )
    }

    return (
        <div>
            {connectors.map((connector) => (
                <button
                    className='btn-connect'
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={async () => {
                            await connect({connector})
                            signMessage({message:generateMessageForEntropy()})
                        }
                    }
                >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {isLoading &&
                    connector.id === pendingConnector?.id &&
                    ' (connecting)'}
                </button>
            ))}

            {error && <div>{error.message}</div>}
        </div>
    )
}