import React from "react";

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
//     "name": "OCBC",
//     "symbol": "O39.SI",
//     "currency": "SGD",
//     "quantity": 2000,
//     "buyDate": "2018-02-22",
//     "buyPrice": 12.98,
//     "buyXR": 1,
//     "id": 0
// },

export default function SourceDialog(props) {
    let { stock, open, currencies, onClose, onSave, onDelete } = props;
    const [portId, setPortId] = React.useState(-1);
    const [id, setId] = React.useState(-1);
    const [name, setName] = React.useState("");
    const [ticker, setTicker] = React.useState("");
    const [currency, setCurrency] = React.useState("");
    const [quantity, setQuantity] = React.useState(0);
    const [buyDate, setBuyDate] = React.useState(new Date());
    const [buyPrice, setBuyPrice] = React.useState(0);
    const [buyXR, setBuyXR] = React.useState(1);
    const [deleteEnabled, setDeleteEnabled] = React.useState(false);

    if (typeof currencies === "undefined") { currencies = ["SGD", "USD", "JPY"] }
    if (typeof onClose !== "function") { onClose = () => { open = false } }
    if (typeof onSave !== "function") { onSave = () => { open = false } }
    if (typeof onDelete !== "function") { onDelete = () => { open = false } }

    React.useEffect(() => {
        //console.log(stock);
        setPortId(stock.portId >= 0 ? stock.portId : -1)
        setId(stock.id >= 0 ? stock.id : -1);
        setName(stock.name || "");
        setTicker(stock.symbol || "");
        setCurrency(stock.currency || currencies[0]);
        setQuantity(stock.quantity || 0);
        setBuyDate(stock.buyDate || new Date());
        setBuyPrice(stock.buyPrice || 0);
        setBuyXR(stock.buyXR || 1);
    }, [stock]);

    const handleSave = () => {
        try {
            const newStock = {
                portId, id, name, symbol: ticker.toUpperCase(), currency, quantity, buyDate, buyPrice, buyXR
            }
            //console.log(newStock);
            onSave(newStock);
        } catch (err) {
            //setHelperText(err.message)
        }
    };

    const toggleDelete = () => {
        setDeleteEnabled(!deleteEnabled)
    }

    const handleDelete = () => {
        const newStock = {
            portId, id, name, symbol: ticker.toUpperCase(), currency, quantity, buyDate, buyPrice, buyXR
        };
        onDelete(newStock);
        setDeleteEnabled(false);
    }

    const handleChange = (setter, event) => {
        const newText = event.target.value;
        setter(newText);
        // console.log(newText);
        // try {
        //     JSON.parse(newText);
        //     setHelperText("")
        // } catch (err) {
        //     setHelperText(err.message)
        // }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                Stock
            </DialogTitle>
            <DialogContent>
                {/* <DialogContentText></DialogContentText> */}
                <form noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField variant="filled" label="Name" value={name} fullWidth
                                onChange={handleChange.bind(null, setName)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="filled" label="Symbol" value={ticker} fullWidth
                                onChange={handleChange.bind(null, setTicker)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="filled" label="Currency" value={currency} fullWidth
                                onChange={handleChange.bind(null, setCurrency)} select>
                                {currencies.map((item) => {
                                    return (
                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                    )
                                })}
                            </TextField>
                        </Grid>
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
                    <Box visibility={id===-1?"hidden":"visible"}>
                        <Switch
                            checked={deleteEnabled}
                            onChange={toggleDelete}
                            name="checkedDelete"
                            inputProps={{ 'aria-label': 'deletion enabling checkbox' }}
                        />
                        <Button onClick={handleDelete} disabled={!deleteEnabled}>Delete</Button>
                    </Box>
                    <Box display="flex">
                        <Box visibility={id===-1?"hidden":"visible"}><Button onClick={onClose}>Cancel</Button></Box>
                        <Box><Button onClick={handleSave}>Save</Button></Box>
                    </Box>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

