# cid.graph_front

Cid.Graph 在底层拥有2个数据池:
1. 未构建数据画像的数据池
2. 已构建数据画像的数据池

用户可以从 1)中选择已有的cid数据进行画像构建，或者 可以通过web3.storage上传文件到IPFS/Filecoin上后直接对此cid数据进行画像构建.
目前我们仅仅在demo中实现了通过web3.storage上传文件的功能，后续会增加nft.storage以及其他的存储平台的功能

用户可以通过metamask链接到nervos network，当用户通过web3.storage上传文件到IPFS/Filecoin后可以选择在nervos上保存，这样就在nervos network
上面实现了 IPFS/Filecoin的文件系统，并且用户可以通过合约管理自己的这些IPFS/Filecoin数据
同时 当用户进行数据画像构建后，也可以选择在nervos network 进行管理自己的存于IPFS.Filecoin的数据画像
