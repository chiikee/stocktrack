import React from "react";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import useInterval from "./components/useInterval";
// import Portfolio from "./components/Portfolio";
import Folio from "./components/Folio";
import SourceDialog from "./components/SourceDialog";
// import StockDialog from "./components/StockDialog";

const LS_KEYS = {
	// PORTFOLIOS: "portfolios",
	FOLIOS: "folios",
	BASE_CURRENCY: "baseCurrency",
	CURRENCIES: "currencies",
	AV_KEY: "avKey",
	QUOTES: "quotes",
	XRS: "xrs",
}
// const INIT_PORTFOLIOS = [[{ id: 1, name: "Google", symbol: "GOOG", currency: "USD", quantity: 1, buyPrice: 100, buyXR: 1, buyDate: "2021-02-13" }]];
const INIT_BASE_CURRENCY = "SGD";
const INIT_CURRENCIES = ["SGD", "USD", "JPY"];
const INIT_QUOTES = { "": { tradeDate: "", price: 0, lastUpdate: Number.MAX_SAFE_INTEGER } };
const INIT_XRS = { "": { xrDate: "", xr: 0, lastUpdate: Number.MAX_SAFE_INTEGER } };
// const INIT_FOLIOS = [[{ id: 1, name: "Google", symbol: "GOOGL", currency: "USD", orders: [{ id: 1, quantity: 10, buyDate: "2019-01-01", buyPrice: 1000, buyXR: 1 }] }]];
const INIT_FOLIOS = [[]];
const UPDATE_DURATION = 1000 * 60 * 60 // update tickers every hour

function isEmpty(thing) {
	const thingType = typeof thing;
	switch (thingType) {
		case "undefined":
			return true;
		case "string":
			return thing === "";
		case "object":
			if (thing === null) {
				return true;
			} else {
				if (Object.keys(thing).length === 0) {
					return true;
				}
			}
			break;
	}
	return false;
}

function handleLocalStorage(key, obj, setter, initial) {
	if (isEmpty(obj)) {
		const stored = window.localStorage.getItem(key);
		if (stored !== null) {
			setter(JSON.parse(stored));
		} else {
			setter(initial);
		}
	} else {
		window.localStorage.setItem(key, JSON.stringify(obj));
	}
}

function itemGetter(obj, setter, initial) {
	return (key) => {
		if (typeof obj[key] !== "undefined") {
			return obj[key];
		} else {
			const newObj = Object.assign({}, obj)
			newObj[key] = initial
			setter(newObj);
			return newObj[key];
		}
	}
}

// function convertPortfolios(portfolios) {
// 	// {
// 	// 	"name": "OCBC",
// 	// 	"symbol": "O39.SI",
// 	// 	"currency": "SGD",
// 	// 	"orders":[
// 	// 		{
// 	// 			"quantity": 2000,
// 	// 			"buyDate": "2018-02-22",
// 	// 			"buyPrice": 12.98,
// 	// 			"buyXR": 1,
// 	// 			"id": 0
// 	// 		}
// 	// 	]
// 	// },

// 	const folios = [];
// 	for (const portfolio of portfolios) {
// 		const folio = [];
// 		folios.push(folio)
// 		for (const stock of portfolio) {
// 			let folioItem = folio.find(folioItem => folioItem.symbol == stock.symbol)
// 			if (typeof folioItem == "undefined") {
// 				folioItem = {
// 					name: stock.name,
// 					symbol: stock.symbol,
// 					currency: stock.currency,
// 					orders: []
// 				}
// 				folio.push(folioItem);
// 			}
// 			folioItem.orders.push({
// 				id: stock.id,
// 				quantity: stock.quantity,
// 				buyDate: stock.buyDate,
// 				buyPrice: stock.buyPrice,
// 				buyXR: stock.buyXR
// 			})
// 		}
// 	}
// 	return folios;
// }

export default function App() {
	const [folios, setFolios] = React.useState([]);
	// const [portfolios, setPortfolios] = React.useState([]);
	const [baseCurrency, setBaseCurrency] = React.useState("");
	const [currencies, setCurrencies] = React.useState([]);
	const [avKey, setAVKey] = React.useState("");
	const [quotes, setQuotes] = React.useState({});
	const [xrs, setXRs] = React.useState({});

	React.useEffect(() => {
		// handleLocalStorage(LS_KEYS.PORTFOLIOS, portfolios, setPortfolios, INIT_PORTFOLIOS);
		handleLocalStorage(LS_KEYS.BASE_CURRENCY, baseCurrency, setBaseCurrency, INIT_BASE_CURRENCY);
		handleLocalStorage(LS_KEYS.CURRENCIES, currencies, setCurrencies, INIT_CURRENCIES);
		handleLocalStorage(LS_KEYS.AV_KEY, avKey, setAVKey, "demo");
		handleLocalStorage(LS_KEYS.QUOTES, quotes, setQuotes, INIT_QUOTES);
		handleLocalStorage(LS_KEYS.XRS, xrs, setXRs, INIT_XRS);
		handleLocalStorage(LS_KEYS.FOLIOS, folios, setFolios, INIT_FOLIOS);
	}, [
		// portfolios,
		folios,	baseCurrency, currencies, avKey, quotes, xrs]);

	const [ticks, setTicks] = React.useState(0);

	useInterval(() => {
		setTicks(ticks + 1)
	}, 15000);

	React.useEffect(() => {
		// console.log(ticks)
		let updateFired = false;
		for (const folio of folios) {
			for (const stock of folio) {
				const quote = getQuote(stock.symbol);
				if (quote.lastUpdate + UPDATE_DURATION < Date.now()) {
					fetchQuote(stock.symbol)
					updateFired = true;
					break;
				}
				const xr = getXR(stock.currency);
				if (xr.lastUpdate + UPDATE_DURATION < Date.now()) {
					//console.log(stock.currency, xr);
					fetchXR(stock.currency);
					updateFired = true;
					break;
				}
			}
			if (updateFired) { break; }
		}
	}, [ticks])

	const getQuote = itemGetter(quotes, setQuotes, { tradeDate: "", price: 0, lastUpdate: 0 })
	const getXR = itemGetter(xrs, setXRs, { xrDate: "", xr: 0, lastUpdate: 0 })

	const fetchQuote = (ticker) => {
		if (ticker.endsWith(".SI")) {
			fetchSGXSecuritiesPrices();
		} else {
			fetchAVQuote(ticker);
		}
	}

	const fetchAVQuote = (ticker) => {
		const avUrl = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + ticker + "&apikey=" + avKey;
		fetch(avUrl)
			.then(res => res.json())
			.then(res => {
				if (typeof res["Global Quote"] !== "undefined") {
					const newQuotes = Object.assign({}, quotes);
					if (typeof newQuotes[ticker] === "undefined") { newQuotes[ticker] = {} }
					newQuotes[ticker].tradeDate = res["Global Quote"]["07. latest trading day"];
					newQuotes[ticker].price = res["Global Quote"]["05. price"];
					newQuotes[ticker].lastUpdate = Date.now()
					setQuotes(newQuotes);
				}
			})
	}

	const fetchSGXSecuritiesPrices = () => {
		const sgxUrl = "https://api.sgx.com/securities/v1.1?excludetypes=bonds&params=nc%2Cadjusted-vwap%2Cbond_accrued_interest%2Cbond_clean_price%2Cbond_dirty_price%2Cbond_date%2Cb%2Cbv%2Cp%2Cc%2Cchange_vs_pc%2Cchange_vs_pc_percentage%2Ccx%2Ccn%2Cdp%2Cdpc%2Cdu%2Ced%2Cfn%2Ch%2Ciiv%2Ciopv%2Clt%2Cl%2Co%2Cp_%2Cpv%2Cptd%2Cs%2Csv%2Ctrading_time%2Cv_%2Cv%2Cvl%2Cvwap%2Cvwap-currency";
		fetch(sgxUrl, {
			"headers": {
				"accept": "*/*",
				"accept-language": "en,en-GB;q=0.9,en-US;q=0.8",
				//   "cache-control": "no-cache",
				//   "pragma": "no-cache",
				//   "sec-fetch-dest": "empty",
				//   "sec-fetch-mode": "cors",
				//   "sec-fetch-site": "same-site",
				//   "sec-gpc": "1"
			},
			"referrer": "https://www.sgx.com/",
			"referrerPolicy": "strict-origin-when-cross-origin",
			"body": null,
			"method": "GET",
			"mode": "cors",
			"credentials": "omit"
		})
			.then(res => res.json())
			.then(securities => {
				const newQuotes = Object.assign({}, quotes)
				for (const [ticker, quote] of Object.entries(newQuotes)) {
					if (!ticker.endsWith(".SI")) { continue; }
					const lookup = ticker.replace(".SI", "");
					const sgxQuote = securities.data.prices.find(elem => elem.nc == lookup);
					const ltd = sgxQuote.trading_time.slice(0, 4) + "-" +
						sgxQuote.trading_time.slice(4, 6) + "-" +
						sgxQuote.trading_time.slice(6, 8)
					quote.tradeDate = ltd;
					quote.price = sgxQuote.lt
					quote.lastUpdate = Date.now()
				}
				setQuotes(newQuotes);
			})
	}

	const fetchXR = (targetCurrency) => {
		if (baseCurrency === targetCurrency) {
			const newXRs = Object.assign({}, xrs);
			if (typeof newXRs[targetCurrency] === "undefined") { newXRs[targetCurrency] = {} }
			newXRs[targetCurrency].xrDate = (new Date()).toISOString();
			newXRs[targetCurrency].xr = 1
			newXRs[targetCurrency].lastUpdate = Date.now()
			setXRs(newXRs);
		} else {
			const avUrl = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" + targetCurrency + "&to_currency=" + baseCurrency + "&apikey=" + avKey
			fetch(avUrl)
				.then(res => res.json())
				.then(res => {
					if (typeof res["Realtime Currency Exchange Rate"] !== "undefined") {
						const newXRs = Object.assign({}, xrs);
						if (typeof newXRs[targetCurrency] === "undefined") { newXRs[targetCurrency] = {} }
						newXRs[targetCurrency].xrDate = res["Realtime Currency Exchange Rate"]["6. Last Refreshed"];
						newXRs[targetCurrency].xr = res["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
						newXRs[targetCurrency].lastUpdate = Date.now()
						setXRs(newXRs);
					}
				})
		}
	}

	const [source, setSource] = React.useState({});
	const [sourceOpen, setSourceOpen] = React.useState(false);

	const handleSourceOpen = () => {
		setSource({
			// portfolios,
			baseCurrency,
			currencies,
			avKey,
			folios
		});
		setSourceOpen(true);
	};

	const handleSourceClose = () => {
		setSourceOpen(false);
	};

	const handleSourceSave = (newSource) => {
		// let maxId = Number.MIN_SAFE_INTEGER;
		// newSource.portfolios.forEach((portfolio) => {
		// 	portfolio.forEach((stock) => {
		// 		if (typeof stock.id === "number" && stock.id > maxId) { maxId = stock.id };
		// 	})
		// })
		// if (maxId < 0) { maxId = 0; }
		// for (const portfolio of newSource.portfolios) {
		// 	for (const stock of portfolio) {
		// 		if (typeof stock.id === "undefined") {
		// 			stock.id = maxId;
		// 			maxId++;
		// 		}
		// 	}
		// }
		setFolios(newSource.folios)
		// setPortfolios(newSource.portfolios)
		setBaseCurrency(newSource.baseCurrency)
		setCurrencies(newSource.currencies)
		setAVKey(newSource.avKey)
		setSource(newSource);
		setSourceOpen(false)
	};

	// const [stockToEdit, setStockToEdit] = React.useState({});
	// const [stockOpen, setStockOpen] = React.useState(false);

	// const handleStockAdd = (portId) => {
	// 	const stock = { portId, buyDate: (new Date()).toISOString().slice(0, 10) }
	// 	setStockToEdit(stock);
	// 	setStockOpen(true);
	// }

	const handleFolioChange = (folioIndex, newFolio) => {
		const newFolios = folios.map((folio, index) => {
			if(index === folioIndex){
				return newFolio;
			}else{
				return folio;
			}
		})
		setFolios(newFolios);
	}

	// const handleStockSave = (folioId, newStock) => {
	// 	const folio = folios[folioId];
	// 	console.log(folioId)
	// 	const oldStock = folio.find(stock => stock.symbol == newStock.symbol)
	// 	if(typeof oldStock === "undefined"){
	// 		folio.push(newStock);
	// 	}else{
	// 		oldStock.name = newStock.name;
	// 		oldStock.currency = newStock.currency;
	// 	}
	// 	setFolios(folios);
	// }

	// const handleStockDelete = (stock) => {
	// 	// const newPortfolios = [];
	// 	// for (const portfolio of portfolios) {
	// 	// 	let replaceIndex = null;
	// 	// 	for (const [index, oldStock] of portfolio.entries()) {
	// 	// 		if (oldStock.id === stock.id) {
	// 	// 			replaceIndex = index;
	// 	// 			console.log("delete", replaceIndex, stock)
	// 	// 			break;
	// 	// 		}
	// 	// 	}
	// 	// 	if (replaceIndex !== null) {
	// 	// 		portfolio.splice(replaceIndex, 1);
	// 	// 	}
	// 	// 	newPortfolios.push(portfolio);
	// 	// }
	// 	// setPortfolios(newPortfolios);
	// 	// setStockOpen(false);
	// }

	// const handleStockClose = () => {
	// 	setStockOpen(false);
	// };

	// const displayPortfolios = [];
	// for (const [index, portfolio] of portfolios.entries()) {
	// 	displayPortfolios.push(
	// 		<Portfolio key={index} portId={index} data={portfolio}
	// 			quotes={quotes} xrs={xrs} onEdit={handleStockEdit}
	// 			onAdd={handleStockAdd.bind(null, index)} />
	// 	)
	// }

	const folioArray = [];
	for (const [index, folio] of folios.entries()) {
		folioArray.push(
			<Folio key={index} folio={folio}
				quotes={quotes} xrs={xrs} baseCurrency={baseCurrency}
				currencies={currencies} onChange={handleFolioChange.bind(this,index)}
			/>
		)
	}

	return (
		<React.Fragment>
			{folioArray}
			<Button onClick={handleSourceOpen}>Access Source</Button>
			<SourceDialog open={sourceOpen} onClose={handleSourceClose}
				onSave={handleSourceSave} source={source} />
			{/* <StockDialog open={stockOpen} onClose={handleStockClose}
				stock={stockToEdit} currencies={currencies}
				onSave={handleStockSave} onDelete={handleStockDelete} /> */}
			<Container>
				<pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(folios, null, "\t")}</pre>
			</Container>
		</React.Fragment>
	);
}
