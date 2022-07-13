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

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;


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

function InputDetailsPage(props) {

    const [open, setOpen] = React.useState(true);
    const [scroll, setScroll] = React.useState('paper');
    const [title, setTitle] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [aurl, setAurl] = React.useState("");
    const [aintro, setAintro] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [license, setLicense] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [tags, setTags] = React.useState([]);
    const [cid, setCid] = React.useState(props.cid);


    const handleDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleTagChanged = (v) => {
        setTags(v)
    }

    const handleClose = () => {
        props.close();
    };

    const onChange = selectedOption => {
        console.log(selectedOption)
        setLicense(selectedOption.value)
    }


    const handleOk = async () => {
    };

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
                        <input type="text" name="item_title" id="item_title" className="form-control" value={title}
                               onChange={(v) => {
                                   setTitle(v.target.value)
                               }}/>
                        <div style={{height:"8px"}}/>
                        <h5 style={{color: "#ffffff",padding:0,margin:0}}>GraphAuthor</h5>
                        <input
                            placeholder="who made this "
                            type="text" name="item_desc" id="item_desc" className="form-control" value={author}
                            onChange={(v) => {
                                setAuthor(v.target.value)
                            }}/>
                        <div style={{height:"8px"}}/>
                        <h5 style={{color: "#ffffff",padding:0,margin:0}}>GraphAuthor Introduce</h5>
                        <input
                            placeholder="graphAuthor's intro"
                            type="text" name="item_desc" id="item_desc" className="form-control" value={aurl}
                            onChange={(v) => {
                                setAintro(v.target.value)
                            }}/>
                        <div style={{height:"8px"}}/>
                        <h5 style={{color: "#ffffff",padding:0,margin:0}}>GraphAuthor website</h5>
                        <input
                            placeholder="graphAuthor's website"
                            type="text" name="item_desc" id="item_desc" className="form-control" value={aintro}
                            onChange={(v) => {
                                setAurl(v.target.value)
                            }}/>
                        <div style={{height:"8px"}}/>
                        <h5 style={{color: "#ffffff",padding:0,margin:0}}>License</h5>
                        <div className='dropdownSelect one' style={{height:"24px"}}>
                            <Select
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={customStyles}
                                onChange={onChange}
                                menuContainerStyle={{'zIndex': 999}} options={options}/></div>

                        <div style={{height:"8px"}}/>
                        <div style={{marginTop: "18px"}}>
                            <h style={{color: "#ffffff",padding:0,margin:0}}>Tags</h>
                        </div>
                        <div>
                            <EditableTagGroup tagChanged={handleTagChanged}/>
                        </div>
                        <div style={{height:"8px"}}/>

                        <h5 style={{color: "#ffffff",padding:0,margin:0}}>Description</h5>
                        <textarea
                            style={{width:"100%"}}
                            placeholder="description about this data"
                            onChange={handleDescription} data-autoresize name="item_desc" id="item_desc"
                            className="form-control" value={description}></textarea>
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{background: "#21224C"}}>
                    {/*{*/}
                    {/*    props.iscnLoading && <Spin indicator={antIcon}/>*/}
                    {/*}*/}
                    <Button onClick={handleClose} style={{color: "#b1b3b4"}}>
                        Cancel
                    </Button>
                    <Button onClick={handleOk} style={{color: "#ffffff"}}>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default InputDetailsPage