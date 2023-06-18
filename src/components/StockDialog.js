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

export default function StockDialog(props) {
    const { stock, open, enableDelete } = props;
    const currencies = props.currencies || ["SGD", "USD", "JPY"];
    const onClose = props.onClose || (() => { console.log("onClose") });
    const onSave = props.onSave || ((newStock) => { console.log("onSave", newStock) });
    const onDelete = props.onDelete || ((stock) => { console.log("onDelete", stock) });

    const [name, setName] = React.useState("");
    const [symbol, setSymbol] = React.useState("");
    const [currency, setCurrency] = React.useState("");
    const [deleteEnabled, setDeleteEnabled] = React.useState(false);

    React.useEffect(() => {
        //console.log(stock);
        setName(stock.name || "");
        setSymbol(stock.symbol || "");
        setCurrency(stock.currency || currencies[0]);
    }, [stock]);

    const handleSave = () => {
        const newStock = Object.assign({}, stock, { name, symbol, currency });
        onSave(newStock);
    };

    const toggleDelete = () => {
        setDeleteEnabled(!deleteEnabled)
    }

    const handleDelete = () => {
        onDelete(stock);
        setDeleteEnabled(false);
    }

    const handleChange = (setter, event) => {
        const newText = event.target.value;
        setter(newText);
    };

    const setSymbolToUpperCase = (value) => {
        setSymbol(value.toUpperCase());
    }

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
                            <TextField variant="filled" label="Symbol" value={symbol} fullWidth
                                onChange={handleChange.bind(null, setSymbolToUpperCase)} />
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

