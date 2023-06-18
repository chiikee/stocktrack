import React from "react";
// import numbro from "numbro";
import dayjs from 'dayjs';

import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
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

export default function Order(props) {
	const order = props.order;
	const onEdit = props.onEdit || ((order) => { console.log("onEdit", order); });

	const handleEdit = (e) => {
		onEdit(order);
		e.stopPropagation();
	}

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>{order.quantity}</TableCell>
				<TableCell>{order.buyDate}</TableCell>
				<TableCell>{order.buyPrice}</TableCell>
				<TableCell>
					<Box display="flex" justifyContent="flex-end" alignItems="center">
						<Box>
							{order.buyXR}
						</Box>
						<Box paddingLeft={2}>
							<IconButton aria-label="edit stock" onClick={handleEdit}><Icon>edit</Icon></IconButton>
						</Box>
					</Box>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}