import React from "react";
import dayjs from 'dayjs';

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Switch from '@material-ui/core/Switch';

// { 
//     id: 1, 
//     quantity: 10, 
//     buyDate: "2019-01-01", 
//     buyPrice: 1000, 
//     buyXR: 1 
// }

export default function OrderDialog(props) {
    const { order, open, enableDelete } = props;
    const onClose = props.onClose || (() => { console.log("onClose") });
    const onSave = props.onSave || ((newOrder) => { console.log("onSave", newOrder) });
    const onDelete = props.onDelete || ((order) => { console.log("onDelete", order) });
    
    const [quantity, setQuantity] = React.useState(0);
    const [buyDate, setBuyDate] = React.useState(dayjs().format("YYYY-MM-DD"));
    const [buyPrice, setBuyPrice] = React.useState(0);
    const [buyXR, setBuyXR] = React.useState(1);
    const [deleteEnabled, setDeleteEnabled] = React.useState(false);

    React.useEffect(() => {
        //console.log(order);
        setQuantity(order.quantity || 0);
        setBuyDate(order.buyDate || dayjs().format("YYYY-MM-DD"));
        setBuyPrice(order.buyPrice || 0);
        setBuyXR(order.buyXR || 1);
    }, [order]);

    const handleSave = () => {
        const newOrder = Object.assign({}, order, { quantity, buyDate, buyPrice, buyXR });
        onSave(newOrder);
    };

    const toggleDelete = () => {
        setDeleteEnabled(!deleteEnabled)
    }

    const handleDelete = () => {
        onDelete(order);
        setDeleteEnabled(false);
    }

    const handleChange = (setter, event) => {
        const newText = event.target.value;
        setter(newText);
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                Order
            </DialogTitle>
            <DialogContent>
                {/* <DialogContentText></DialogContentText> */}
                <form noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField variant="filled" label="Quantity" value={quantity} fullWidth
                                onChange={handleChange.bind(null, setQuantity)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="filled" label="Buy Date" value={buyDate} fullWidth type="date"
                                onChange={handleChange.bind(null, setBuyDate)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="filled" label="Buy Price" value={buyPrice} fullWidth
                                onChange={handleChange.bind(null, setBuyPrice)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="filled" label="Buy XR" value={buyXR} fullWidth
                                onChange={handleChange.bind(null, setBuyXR)} />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Box visibility={enableDelete ? "visible" : "hidden"}>
                        <Switch
                            checked={deleteEnabled}
                            onChange={toggleDelete}
                            name="checkedDelete"
                            inputProps={{ 'aria-label': 'deletion enabling checkbox' }}
                        />
                        <Button onClick={handleDelete} disabled={!deleteEnabled}>Delete</Button>
                    </Box>
                    <Box display="flex">
                        <Box visibility={enableDelete ? "visible" : "hidden"}><Button onClick={onClose}>Cancel</Button></Box>
                        <Box><Button onClick={handleSave}>Save</Button></Box>
                    </Box>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

