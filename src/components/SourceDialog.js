import React from "react";

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

export default function SourceDialog(props) {
    const { source, open, onClose, onSave } = props;
    const [helperText, setHelperText] = React.useState("");
    const [text, setText] = React.useState("");

    React.useEffect(() => {
        setText(JSON.stringify(source, null, "\t"))
    }, [source]);

    const handleCopy = () => {

    };

    const handleSaveToFile = () => {

    };

    const handleSave = () => {
        try {
            const newSource = JSON.parse(text);
            onSave(newSource);
        } catch (err) {
            setHelperText(err.message)
        }
    };

    const handleChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        try {
            JSON.parse(newText);
            setHelperText("")
        } catch (err) {
            setHelperText(err.message)
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {/* <Box position="absolute" right="16px" top="8px" zIndex={1350}>
                    <IconButton onClick={handleSaveToFile}>
                        <Icon>save</Icon>
                    </IconButton>
                    <IconButton onClick={handleCopy}>
                        <Icon>content_copy</Icon>
                    </IconButton>
                </Box> */}
                JSON
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This is provided as a means to quickly import your portfolio or to make backups.
                    Editing the JSON directly is not recommended.
       			</DialogContentText>
                <TextField
                    variant="filled"
                    error={helperText!==""}
                    helperText={helperText}
                    margin="dense"
                    id="portfolioText"
                    label="JSON"
                    fullWidth
                    multiline
                    value={text}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
          			</Button>
                <Button onClick={handleSave} color="primary">
                    Save
          			</Button>
            </DialogActions>
        </Dialog>
    );
}

