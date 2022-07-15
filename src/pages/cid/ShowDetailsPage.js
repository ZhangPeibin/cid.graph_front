import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {LoadingOutlined} from '@ant-design/icons';
import Select from "react-select";
import EditableTagGroup from "./EditableTagGroup";
import {message} from 'antd';



const customStyles = {
    option: (base, state) => ({
        ...base,
        background: "#fff",
        color: "#333",
        borderRadius: state.isFocused ? "0" : 0,
        "&:hover": {
            background: "#eee",
        }
    }),
    menu: base => ({
        ...base,
        borderRadius: 0,
        marginTop: 0,
    }),
    menuList: base => ({
        ...base,
        padding: 0,
    }),
    control: (base, state) => ({
        ...base,
        padding: 2
    })
};
const options = [
    {value: 'MIT License', label: 'MIT License'},
    {value: 'Creative Commons Zero v1.0 Universal', label: 'Creative Commons Zero v1.0 Universal'},
    {value: 'Microsoft Public License', label: 'Microsoft Public License'},
    {value: 'GNU Lesser General Public License v2.1', label: 'GNU Lesser General Public License v2.1'},
    {value: 'GNU General Public License v2.0', label: 'GNU General Public License v2.0'},
    {value: 'The Unlicense', label: "The Unlicense"}
]

function ShowDetailsPage(props) {
    const data = props.showDetailsData
    const metas = JSON.parse(data.metas);

    const [open, setOpen] = React.useState(true);
    const [scroll, setScroll] = React.useState('paper');
    const [title, setTitle] = React.useState(data.name);

    const [author, setAuthor] = React.useState(metas['graphAuthor']);
    const [aurl, setAurl] = React.useState(metas['graphAuthorUrl']);
    const [aintro, setAintro] = React.useState(metas['graphAuthorIntro']);
    const [license, setLicense] = React.useState(data.copyright);
    const [description, setDescription] = React.useState(data.desc);
    const [tags, setTags] = React.useState(metas['tag']);
    const [cid, setCid] = React.useState(data.ipfs_cid);


    const handleClose = () => {
        props.close();
    };

    const onChange = selectedOption => {
        console.log(selectedOption)
        setLicense(selectedOption.value)
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle style={{background: "#21224C", color: "#ffffff"}}
                             id="scroll-dialog-title"
                ><p style={{color: "#ffffff",padding:0,margin:0}}>Graph You Cid</p></DialogTitle>
                <DialogContent style={{background: "#21224C"}} dividers={scroll === 'paper'}>
                    <DialogContentText
                        style={{width: "480px",}}
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        <h5 style={{color: "#ffffff",padding:0,margin:0}}>Cid</h5>
                        <button style={{color: "#1f1e1e"}}  type="text" name="item_title" id="item_title" className="form-control" >
                            {cid}
                        </button>
                        <div style={{height:"8px"}}/>
                        <h5 style={{color: "#ffffff",padding:0,margin:0}}>Name</h5>
                        <button style={{color: "#1f1e1e"}}  type="text" name="item_title" id="item_title" className="form-control" >
                            {title}
                        </button>
                        <div style={{height:"8px"}}/>
                        <h5 style={{color: "#ffffff",padding:0,margin:0}}>GraphAuthor</h5>

                        <button style={{color: "#1f1e1e"}}  type="text" name="item_title" id="item_title" className="form-control" >
                            {author}
                        </button>
                        <div style={{height:"8px"}}/>
                        <h5 style={{color: "#ffffff",padding:0,margin:0}}>GraphAuthor Introduce</h5>
                        <button style={{color: "#1f1e1e"}}  type="text" name="item_title" id="item_title" className="form-control" >
                            {aintro}
                        </button>

                        <div style={{height:"8px"}}/>
                        <h5 style={{color: "#ffffff",padding:0,margin:0}}>GraphAuthor website</h5>
                        <button style={{color: "#1f1e1e"}}  type="text" name="item_title" id="item_title" className="form-control" >
                            {aurl}
                        </button>
                        <div style={{height:"8px"}}/>
                        <h5 style={{color: "#ffffff",padding:0,margin:0}}>License</h5>
                        <div className='dropdownSelect one' style={{height:"24px"}}>

                            <button style={{color: "#1f1e1e"}}  type="text" name="item_title" id="item_title" className="form-control" >
                                {license}
                            </button>
                        </div>
                        <div style={{marginTop: "12px"}}>
                            <h style={{color: "#ffffff",padding:0,margin:0}}>Tags</h>
                        </div>
                        <div>
                            <button style={{color: "#1f1e1e"}}  type="text" name="item_title" id="item_title" className="form-control" >
                                {tags}
                            </button>
                        </div>
                        <div style={{height:"8px"}}/>

                        <h5 style={{color: "#ffffff",padding:0,margin:0}}>Description</h5>
                        <button style={{color: "#1f1e1e"}}  type="text" name="item_title" id="item_title" className="form-control" >
                            {description}
                        </button>
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{background: "#21224C"}}>
                    {/*{*/}
                    {/*    props.iscnLoading && <Spin indicator={antIcon}/>*/}
                    {/*}*/}
                    <Button onClick={handleClose} style={{color: "#b1b3b4"}}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ShowDetailsPage