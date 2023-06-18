import React from "react";

import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

import Stock from "./Stock";
import StockDialog from "./StockDialog";

export default function Folio(props) {
	const [stockDialogOpen, setStockDialogOpen] = React.useState(false);
	const [stockDialogDelete, setStockDialogDelete] = React.useState(false);
	const [stockToEdit, setStockToEdit] = React.useState({});
	const folio = props.folio || [];
	const quotes = props.quotes || {};
	const xrs = props.xrs || {};
	const baseCurrency = props.baseCurrency || "SGD";
	const currencies = props.currencies || ["SGD", "USD", "JPY"];
	const onChange = props.onChange || ((folio) => { console.log("onChange", folio); });

	const handleStockAdd = () => {
		setStockToEdit({});
		setStockDialogDelete(false);
		setStockDialogOpen(true);
	}

	const handleStockEdit = (stock) => {
		setStockToEdit(stock);
		if (typeof stock.orders !== "undefined" && stock.orders.length === 0) {
			setStockDialogDelete(true);
		} else {
			setStockDialogDelete(false);
		}
		setStockDialogOpen(true);
	}

	const handleStockDelete = (stockToDelete) => {
		const newFolio = folio.filter(stock => stock.id !== stockToDelete.id);
		onChange(newFolio);
		setStockDialogOpen(false);
	}

	const handleStockSave = (newStock) => {
		const newFolio = folio.concat();
		if(typeof newStock.id === "undefined"){
			newStock.id = newFolio.reduce((accumulator, stock) => {
				return stock.id > accumulator ? stock.id : accumulator
			}, 0) + 1;
		}
		const oldStock = newFolio.find(stock => stock.id == newStock.id)
		if (typeof oldStock === "undefined") {	
			newFolio.push(newStock);
		} else {
			Object.assign(oldStock, newStock);
		}
		onChange(newFolio);
		setStockDialogOpen(false)
	}

	const StockArray = [];
	for (const stock of folio) {
		StockArray.push(<Stock key={stock.id} stock={stock} quotes={quotes}
			xrs={xrs} baseCurrency={baseCurrency} onEdit={handleStockEdit} onChange={handleStockSave} />)
	}
	return (
		<React.Fragment>
			<Button onClick={handleStockAdd}>Add New Stock</Button>
			<StockDialog open={stockDialogOpen} onClose={() => setStockDialogOpen(false)}
				stock={stockToEdit} currencies={currencies}
				onSave={handleStockSave} onDelete={handleStockDelete}
				enableDelete={stockDialogDelete} />
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{StockArray}
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	)
}