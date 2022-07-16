// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Owner
 * @dev Set & change owner
 */
contract CidGraph {

    mapping(address=> CidFileStruct[]) private  cidFiles;
    mapping(string=> bool) private cidExist;
    mapping(string=> uint256) private cidIndex;

    mapping(address=> CidGraphStruct[]) private  cidGraphs;
    mapping(string=> bool) private cidGraphExist;
    mapping(string=> uint256) private cidGraphIndex;


    struct CidGraphStruct{
        string cid;
        string name;
        string desc;
        string metas;
        string copyright;
        uint size;
        string filetype;
    }

    struct CidFileStruct{
        string cid;
        string fileName;
        string fileType;
        uint fileSize;
    }

    modifier notContract() {
        require(!_isContract(msg.sender), "Contract not allowed");
        require(msg.sender == tx.origin, "Proxy contract not allowed");
        _;
    }

    function _isContract(address _addr) internal view returns (bool) {
        uint size;
        assembly {
            size := extcodesize(_addr)
        }
        return size > 0;
    }


    function addCid(string memory cid, string memory fileName, uint fileSize, string memory fileType) public notContract{
        CidFileStruct memory cidFile ;
        cidFile.cid = cid;
        cidFile.fileName = fileName;
        cidFile.fileType = fileType;
        cidFile.fileSize = fileSize;
        bool isCidExist = cidExist[cid];
        if (isCidExist){
            cidFiles[msg.sender][cidIndex[cid]] = cidFile;
        }else{
            cidFiles[msg.sender].push(cidFile);
            cidIndex[cid] = cidFiles[msg.sender].length-1;
            cidExist[cid] = true;
        }
    }

    function getCids() public view  notContract  returns( CidFileStruct  [] memory){
        return cidFiles[msg.sender];
    }

    function getGraphs() public view  notContract  returns( CidGraphStruct  [] memory){
        return cidGraphs[msg.sender];
    }


    function addCidGraph(string memory cid,string memory name,string memory desc, string memory metas,string memory copyright,
        uint size,string memory filetype) public notContract{

        CidGraphStruct memory cidGraph ;
        cidGraph.cid = cid;
        cidGraph.name = name;
        cidGraph.desc = desc;
        cidGraph.metas = metas;
        cidGraph.copyright = copyright;
        cidGraph.filetype = filetype;
        cidGraph.size = size;
        bool isCidGraphExist = cidGraphExist[cid];
        if (isCidGraphExist){
            cidGraphs[msg.sender][cidGraphIndex[cid]] = cidGraph;
        }else{
            cidGraphs[msg.sender].push(cidGraph);
            cidGraphIndex[cid] = cidGraphs[msg.sender].length-1;
            cidGraphExist[cid] = true;
        }
    }
}