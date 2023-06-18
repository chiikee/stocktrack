import React from "react";
import numbro from "numbro";

import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

function tableHeaders() {
	const headers = ["name", "symbol", "buyDate", "quantity", "currency", "buyPrice",
		"buyXR", "buyTotalX", "tradeDate", "price", "XRDate", "XR", "nowTotalX",
		"profit", "annualised", ""];
	return headers.map(item => <TableCell key={item}>{item}</TableCell>);
}

function getQuote(ticker, quotes) {
	return typeof quotes[ticker] !== "undefined" ?
		quotes[ticker] : { tradeDate: "", price: 0, lastUpdate: 0 }

}

function getXR(currency, xrs) {
	return typeof xrs[currency] !== "undefined" ?
		xrs[currency] : { xrDate: "", xr: 0, lastUpdate: 0 }
}

export default function Portfolio(props) {
	const portId = props.portId || 0;
	const data = props.data || [];
	const quotes = props.quotes || {};
	const xrs = props.xrs || {};
	const onEdit = props.onEdit || ((id) => {
		console.log("edit",id);
	});
	const onAdd = props.onAdd || ((id) => {
		console.log("add",id);
	});

	const handleEdit = (id) => {
		onEdit(id);
	}

	const handleAdd = () => {
		onAdd(portId);
	}

	const rows = [];
	for (const dataRow of data) {
		const row = Object.assign({}, dataRow);
		row.buyDate = new Date(row.buyDate);
		row.buyTotalX = row.quantity * row.buyPrice * row.buyXR;
		const quote = getQuote(row.symbol, quotes);
		row.tradeDate = new Date(quote.tradeDate);
		row.price = quote.price;
		const xr = getXR(row.currency, xrs);
		row.xrDate = new Date(xr.xrDate);
		row.xr = xr.xr;
		row.nowTotalX = row.quantity * row.price * row.xr;
		row.profit = row.nowTotalX - row.buyTotalX;
		const ytd = (new Date() - row.buyDate) / 31556926000;
		row.annualised = (row.profit / row.buyTotalX / ytd);
		rows.push(row);
	}
	return (
		<React.Fragment>
			<Button onClick={handleAdd}>Add New Row</Button>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{tableHeaders()}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.id}>
								<TableCell component="th" scope="row">
									{row.name}
								</TableCell>
								<TableCell align="right">{row.symbol}</TableCell>
								<TableCell align="right">{row.buyDate.toLocaleDateString()}</TableCell>
								<TableCell align="right">{row.quantity}</TableCell>
								<TableCell align="right">{row.currency}</TableCell>
								<TableCell align="right">{row.buyPrice}</TableCell>
								<TableCell align="right">{row.buyXR}</TableCell>
								<TableCell align="right">{numbro(row.buyTotalX).format({ mantissa: 2, thousandSeparated: true })}</TableCell>
								<TableCell align="right">{row.tradeDate.toLocaleDateString()}</TableCell>
								<TableCell align="right">{numbro(row.price).format()}</TableCell>
								<TableCell align="right">{row.xrDate.toLocaleDateString()}</TableCell>
								<TableCell align="right">{numbro(row.xr).format()}</TableCell>
								<TableCell align="right">{numbro(row.nowTotalX).format({ mantissa: 2, thousandSeparated: true })}</TableCell>
								<TableCell align="right">{numbro(row.profit).format({ mantissa: 2, thousandSeparated: true })}</TableCell>
								<TableCell align="right">{numbro(row.annualised).format({output:"percent", mantissa:2})}</TableCell>
								<TableCell><IconButton onClick={handleEdit.bind(null,row.id)}><Icon>edit</Icon></IconButton></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	)
}