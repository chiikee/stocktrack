import React from "react";
import numbro from "numbro";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Box from "@material-ui/core/Box";
import Badge from '@material-ui/core/Badge';
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
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';

import Order from "./Order";
import OrderDialog from "./OrderDialog";

dayjs.extend(relativeTime);

const useStyles = makeStyles({
	xSmallText: {
		fontSize: "x-small",
	},
	xxSmallText: {
		fontSize: "xx-small",
	},
});

// function tableHeaders() {
// 	const headers = ["name", "symbol", "buyDate", "quantity", "currency", "buyPrice",
// 		"buyXR", "buyTotalX", "tradeDate", "price", "XRDate", "XR", "nowTotalX",
// 		"profit", "annualised", ""];
// 	return headers.map(item => <TableCell key={item}>{item}</TableCell>);
// }

function getQuote(ticker, quotes) {
	return typeof quotes[ticker] !== "undefined" ?
		quotes[ticker] : { tradeDate: "", price: 0, lastUpdate: 0 }

}

function getXR(currency, xrs) {
	return typeof xrs[currency] !== "undefined" ?
		xrs[currency] : { xrDate: "", xr: 0, lastUpdate: 0 }
}

export default function Stock(props) {
	const classes = useStyles();
	const stock = props.stock;
	stock.orders = stock.orders || [];
	const quotes = props.quotes || {};
	const xrs = props.xrs || {};
	const baseCurrency = props.baseCurrency || "SGD";
	const onEdit = props.onEdit || ((stock) => { console.log("onEdit", stock); });
	const onChange = props.onChange || ((stock) => { console.log("onChange", stock); });

	const [orderOpen, setOrderOpen] = React.useState(false);
	const [orderDialogOpen, setOrderDialogOpen] = React.useState(false);
	const [orderDialogDelete, setOrderDialogDelete] = React.useState(false);
	const [orderToEdit, setOrderToEdit] = React.useState({});

	const quote = getQuote(stock.symbol, quotes);
	const tradeDate = dayjs(quote.tradeDate)
	const price = quote.price;
	const xr = getXR(stock.currency, xrs);
	// const xrDate = new Date(xr.xrDate);
	const xrDate = dayjs(xr.xrDate);
	const priceText = numbro(price).format();
	const priceMantissa = priceText.lastIndexOf(".") === -1 ? 0 : priceText.length - priceText.lastIndexOf(".") - 1;

	// const data = props.data || [];

	// const onEdit = props.onEdit || ((id) => {
	// 	console.log("edit",id);
	// });

	// const onAdd = props.onAdd || ((id) => {
	// 	console.log("add",id);
	// });

	const handleEdit = (e) => {
		onEdit(stock);
		e.stopPropagation();
	}

	// const handleAdd = () => {
	// 	onAdd(index);
	// }

	const handleOrderEdit = (order) => {
		setOrderToEdit(order);
		setOrderDialogDelete(true);
		setOrderDialogOpen(true);
	}

	const handleOrderAdd = () => {
		setOrderToEdit({});
		setOrderDialogDelete(false);
		setOrderDialogOpen(true);
	}

	const handleOrderDelete = (orderToDelete) => {
		const newStock = Object.assign(stock);
		newStock.orders = newStock.orders.filter(order => order.id !== orderToDelete.id);
		onChange(newStock);
		setOrderDialogOpen(false);
	}

	const handleOrderSave = (newOrder) => {
		const newStock = Object.assign(stock);
		newStock.orders = newStock.orders.concat();
		if (typeof newOrder.id === "undefined") {
			newOrder.id = newStock.orders.reduce((accumulator, order) => {
				return order.id > accumulator ? order.id : accumulator
			}, 0) + 1;
		}
		const oldOrder = newStock.orders.find(order => order.id == newOrder.id)
		if (typeof oldOrder === "undefined") {
			newStock.orders.push(newOrder);
		} else {
			Object.assign(oldOrder, newOrder);
		}
		onChange(newStock);
		setOrderDialogOpen(false)
	}

	let lots = 0, totalBuyValue = 0, buyTotalX = 0, earliestBuyDate = dayjs();
	const orderArray = [];
	for (const order of stock.orders) {
		let quantity = parseInt(order.quantity);
		let buyPrice = parseFloat(order.buyPrice);
		let buyXR = parseFloat(order.buyXR);
		let buyDate = dayjs(order.buyDate);
		if (buyDate < earliestBuyDate) { earliestBuyDate = buyDate }
		lots += quantity;
		totalBuyValue += quantity * buyPrice;
		buyTotalX += quantity * buyPrice * buyXR;
		orderArray.push(
			<Order key={order.id} order={order} onEdit={handleOrderEdit} />
		)
	}
	const nowTotal = price * lots;
	const nowTotalX = nowTotal * xr.xr;
	const averagePrice = totalBuyValue / lots;
	const ytd = dayjs().diff(earliestBuyDate, "years", true);
	const annualised = ((nowTotalX - buyTotalX) / buyTotalX / ytd);

	return (
		<React.Fragment>
			<TableRow hover onClick={() => setOrderOpen(!orderOpen)}>
				<TableCell>
					{stock.name}<br />
					<span className={classes.xSmallText}>{stock.symbol}</span>
				</TableCell>
				<TableCell align="right">
					{lots}<br />
				</TableCell>
				<TableCell align="right">
					{stock.currency} {numbro(averagePrice).format({ mantissa: priceMantissa })}
				</TableCell>
				<TableCell align="right">
					{stock.currency} {numbro(price).format()}<br />
					<span className={classes.xSmallText}>{tradeDate.fromNow()}</span>
				</TableCell>
				<TableCell align="right">
					<Box display="flex" justifyContent="flex-end" alignItems="center">
						<Box>
							<Tooltip title={
								<React.Fragment>
									1 {stock.currency} = {numbro(xr.xr).format()} {baseCurrency}<br />
									<span className={classes.xxSmallText}>{xrDate.fromNow()}</span>
								</React.Fragment>
							} placement="top" arrow>
								<span>{baseCurrency} {numbro(nowTotalX).format({ mantissa: 2, thousandSeparated: true })}</span>
							</Tooltip>
							<br /><span className={classes.xSmallText}>
								{/* {numbro(buyTotalX).format({ mantissa: 2, thousandSeparated: true })} */}
								{numbro(annualised).format({ output: "percent", mantissa: 2 })} pa
							</span>
						</Box>
						<Box paddingLeft={2}>
							<IconButton aria-label="edit stock" onClick={handleEdit}><Icon>edit</Icon></IconButton>
						</Box>
					</Box>
				</TableCell>
				{/* <TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOrderOpen(!orderOpen)}>
						{orderOpen ? <Icon>keyboard_arrow_up</Icon> : <Icon>keyboard_arrow_down</Icon>}
					</IconButton>
				</TableCell> */}
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={orderOpen} timeout="auto" unmountOnExit>
						<Button onClick={handleOrderAdd}>Add New Order</Button>
						<TableContainer component={Paper}>
							<Table>
								<TableBody>
									{orderArray}
								</TableBody>
							</Table>
						</TableContainer>
					</Collapse>
				</TableCell>
			</TableRow>
			{/* <Button onClick={handleAdd}>Add New Row</Button>
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
			</TableContainer> */}
			<OrderDialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)}
				order={orderToEdit} onSave={handleOrderSave}
				onDelete={handleOrderDelete} enableDelete={orderDialogDelete} />
		</React.Fragment>
	)
}