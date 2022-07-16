export const ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "fileName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "fileSize",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "fileType",
                "type": "string"
            }
        ],
        "name": "addCid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "desc",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "metas",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "copyright",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "size",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "filetype",
                "type": "string"
            }
        ],
        "name": "addCidGraph",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCids",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "cid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "fileName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "fileType",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fileSize",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct CidGraph.CidFileStruct[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getGraphs",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "cid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "desc",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "metas",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "copyright",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "size",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "filetype",
                        "type": "string"
                    }
                ],
                "internalType": "struct CidGraph.CidGraphStruct[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
