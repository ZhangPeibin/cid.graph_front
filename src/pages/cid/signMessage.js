export const generateMessageForEntropy = (ethereum_address, application_name: string, secret: string) => {
    return (
        '******************************************************************************** \n' +
        'READ THIS MESSAGE CAREFULLY. \n' +
        'DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND WRITE \n' +
        'ACCESS TO THIS APPLICATION. \n' +
        'DO NOT SIGN THIS MESSAGE IF THE FOLLOWING IS NOT TRUE OR YOU DO NOT CONSENT \n' +
        'TO THE CURRENT APPLICATION HAVING ACCESS TO THE FOLLOWING APPLICATION. \n' +
        '******************************************************************************** \n' +
        'The Ethereum address used by this application is: \n' +
        '\n' +
        ethereum_address +
        '\n' +
        '\n' +
        '\n' +
        'By signing this message, you authorize the current application to use the \n' +
        'following app associated with the above address: \n' +
        '\n' +
        application_name +
        '\n' +
        '\n' +
        '\n' +
        'The hash of your non-recoverable, private, non-persisted password or secret \n' +
        'phrase is: \n' +
        '\n' +
        secret +
        '\n' +
        '\n' +
        '\n' +
        '******************************************************************************** \n' +
        'ONLY SIGN THIS MESSAGE IF YOU CONSENT TO THE CURRENT PAGE ACCESSING THE KEYS \n' +
        'ASSOCIATED WITH THE ABOVE ADDRESS AND APPLICATION. \n' +
        'AGAIN, DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND \n' +
        'WRITE ACCESS TO THIS APPLICATION. \n' +
        '******************************************************************************** \n'
    );
}