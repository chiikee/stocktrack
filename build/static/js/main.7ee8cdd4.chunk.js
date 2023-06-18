(this.webpackJsonpstocktrack=this.webpackJsonpstocktrack||[]).push([[0],{104:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(13),i=n.n(r),s=n(27),l=n(9),o=n(149),d=n(156);var u=n(153),j=n(154),b=n(152),f=n(142),h=n(32),O=n.n(h),x=n(19),p=n.n(x),y=n(72),v=n.n(y),g=n(159),m=n(136),C=n(139),S=n(140),D=n(141),k=n(162),w=n(150),E=n(151),_=n(2);function N(e){var t=e.order,n=e.onEdit||function(e){console.log("onEdit",e)};return Object(_.jsx)(c.a.Fragment,{children:Object(_.jsxs)(C.a,{children:[Object(_.jsx)(m.a,{children:t.quantity}),Object(_.jsx)(m.a,{children:t.buyDate}),Object(_.jsx)(m.a,{children:t.buyPrice}),Object(_.jsx)(m.a,{children:Object(_.jsxs)(g.a,{display:"flex",justifyContent:"flex-end",alignItems:"center",children:[Object(_.jsx)(g.a,{children:t.buyXR}),Object(_.jsx)(g.a,{paddingLeft:2,children:Object(_.jsx)(S.a,{"aria-label":"edit stock",onClick:function(e){n(t),e.stopPropagation()},children:Object(_.jsx)(D.a,{children:"edit"})})})]})})]})})}var R=n(158),U=n(161),I=n(148),T=n(145),G=n(144),P=n(146),q=n(163);function J(e){var t=e.order,n=e.open,a=e.enableDelete,r=e.onClose||function(){console.log("onClose")},i=e.onSave||function(e){console.log("onSave",e)},s=e.onDelete||function(e){console.log("onDelete",e)},d=c.a.useState(0),u=Object(l.a)(d,2),j=u[0],b=u[1],f=c.a.useState(p()().format("YYYY-MM-DD")),h=Object(l.a)(f,2),O=h[0],x=h[1],y=c.a.useState(0),v=Object(l.a)(y,2),m=v[0],C=v[1],S=c.a.useState(1),D=Object(l.a)(S,2),k=D[0],w=D[1],E=c.a.useState(!1),N=Object(l.a)(E,2),J=N[0],F=N[1];c.a.useEffect((function(){b(t.quantity||0),x(t.buyDate||p()().format("YYYY-MM-DD")),C(t.buyPrice||0),w(t.buyXR||1)}),[t]);var Y=function(e,t){e(t.target.value)};return Object(_.jsxs)(U.a,{open:n,onClose:r,"aria-labelledby":"form-dialog-title",children:[Object(_.jsx)(G.a,{id:"form-dialog-title",children:"Order"}),Object(_.jsx)(T.a,{children:Object(_.jsx)("form",{noValidate:!0,autoComplete:"off",children:Object(_.jsxs)(P.a,{container:!0,spacing:2,children:[Object(_.jsx)(P.a,{item:!0,xs:12,children:Object(_.jsx)(R.a,{variant:"filled",label:"Quantity",value:j,fullWidth:!0,onChange:Y.bind(null,b)})}),Object(_.jsx)(P.a,{item:!0,xs:12,children:Object(_.jsx)(R.a,{variant:"filled",label:"Buy Date",value:O,fullWidth:!0,type:"date",onChange:Y.bind(null,x)})}),Object(_.jsx)(P.a,{item:!0,xs:12,children:Object(_.jsx)(R.a,{variant:"filled",label:"Buy Price",value:m,fullWidth:!0,onChange:Y.bind(null,C)})}),Object(_.jsx)(P.a,{item:!0,xs:12,children:Object(_.jsx)(R.a,{variant:"filled",label:"Buy XR",value:k,fullWidth:!0,onChange:Y.bind(null,w)})})]})})}),Object(_.jsx)(I.a,{children:Object(_.jsxs)(g.a,{display:"flex",justifyContent:"space-between",width:"100%",children:[Object(_.jsxs)(g.a,{visibility:a?"visible":"hidden",children:[Object(_.jsx)(q.a,{checked:J,onChange:function(){F(!J)},name:"checkedDelete",inputProps:{"aria-label":"deletion enabling checkbox"}}),Object(_.jsx)(o.a,{onClick:function(){s(t),F(!1)},disabled:!J,children:"Delete"})]}),Object(_.jsxs)(g.a,{display:"flex",children:[Object(_.jsx)(g.a,{visibility:a?"visible":"hidden",children:Object(_.jsx)(o.a,{onClick:r,children:"Cancel"})}),Object(_.jsx)(g.a,{children:Object(_.jsx)(o.a,{onClick:function(){var e=Object.assign({},t,{quantity:j,buyDate:O,buyPrice:m,buyXR:k});i(e)},children:"Save"})})]})]})})]})}p.a.extend(v.a);var F=Object(w.a)({xSmallText:{fontSize:"x-small"},xxSmallText:{fontSize:"xx-small"}});function Y(e){var t=F(),n=e.stock;n.orders=n.orders||[];var a,r=e.quotes||{},i=e.xrs||{},d=e.baseCurrency||"SGD",h=e.onEdit||function(e){console.log("onEdit",e)},x=e.onChange||function(e){console.log("onChange",e)},y=c.a.useState(!1),v=Object(l.a)(y,2),w=v[0],R=v[1],U=c.a.useState(!1),I=Object(l.a)(U,2),T=I[0],G=I[1],P=c.a.useState(!1),q=Object(l.a)(P,2),Y=q[0],A=q[1],W=c.a.useState({}),B=Object(l.a)(W,2),X=B[0],L=B[1],M=function(e,t){return"undefined"!==typeof t[e]?t[e]:{tradeDate:"",price:0,lastUpdate:0}}(n.symbol,r),Q=p()(M.tradeDate),K=M.price,z=function(e,t){return"undefined"!==typeof t[e]?t[e]:{xrDate:"",xr:0,lastUpdate:0}}(n.currency,i),V=p()(z.xrDate),H=O()(K).format(),Z=-1===H.lastIndexOf(".")?0:H.length-H.lastIndexOf(".")-1,$=function(e){L(e),A(!0),G(!0)},ee=0,te=0,ne=0,ae=p()(),ce=[],re=Object(s.a)(n.orders);try{for(re.s();!(a=re.n()).done;){var ie=a.value,se=parseInt(ie.quantity),le=parseFloat(ie.buyPrice),oe=parseFloat(ie.buyXR),de=p()(ie.buyDate);de<ae&&(ae=de),ee+=se,te+=se*le,ne+=se*le*oe,ce.push(Object(_.jsx)(N,{order:ie,onEdit:$},ie.id))}}catch(fe){re.e(fe)}finally{re.f()}var ue=K*ee*z.xr,je=te/ee,be=(ue-ne)/ne/p()().diff(ae,"years",!0);return Object(_.jsxs)(c.a.Fragment,{children:[Object(_.jsxs)(C.a,{hover:!0,onClick:function(){return R(!w)},children:[Object(_.jsxs)(m.a,{children:[n.name,Object(_.jsx)("br",{}),Object(_.jsx)("span",{className:t.xSmallText,children:n.symbol})]}),Object(_.jsxs)(m.a,{align:"right",children:[ee,Object(_.jsx)("br",{})]}),Object(_.jsxs)(m.a,{align:"right",children:[n.currency," ",O()(je).format({mantissa:Z})]}),Object(_.jsxs)(m.a,{align:"right",children:[n.currency," ",O()(K).format(),Object(_.jsx)("br",{}),Object(_.jsx)("span",{className:t.xSmallText,children:Q.fromNow()})]}),Object(_.jsx)(m.a,{align:"right",children:Object(_.jsxs)(g.a,{display:"flex",justifyContent:"flex-end",alignItems:"center",children:[Object(_.jsxs)(g.a,{children:[Object(_.jsx)(k.a,{title:Object(_.jsxs)(c.a.Fragment,{children:["1 ",n.currency," = ",O()(z.xr).format()," ",d,Object(_.jsx)("br",{}),Object(_.jsx)("span",{className:t.xxSmallText,children:V.fromNow()})]}),placement:"top",arrow:!0,children:Object(_.jsxs)("span",{children:[d," ",O()(ue).format({mantissa:2,thousandSeparated:!0})]})}),Object(_.jsx)("br",{}),Object(_.jsxs)("span",{className:t.xSmallText,children:[O()(be).format({output:"percent",mantissa:2})," pa"]})]}),Object(_.jsx)(g.a,{paddingLeft:2,children:Object(_.jsx)(S.a,{"aria-label":"edit stock",onClick:function(e){h(n),e.stopPropagation()},children:Object(_.jsx)(D.a,{children:"edit"})})})]})})]}),Object(_.jsx)(C.a,{children:Object(_.jsx)(m.a,{style:{paddingBottom:0,paddingTop:0},colSpan:6,children:Object(_.jsxs)(E.a,{in:w,timeout:"auto",unmountOnExit:!0,children:[Object(_.jsx)(o.a,{onClick:function(){L({}),A(!1),G(!0)},children:"Add New Order"}),Object(_.jsx)(b.a,{component:f.a,children:Object(_.jsx)(u.a,{children:Object(_.jsx)(j.a,{children:ce})})})]})})}),Object(_.jsx)(J,{open:T,onClose:function(){return G(!1)},order:X,onSave:function(e){var t=Object.assign(n);t.orders=t.orders.concat(),"undefined"===typeof e.id&&(e.id=t.orders.reduce((function(e,t){return t.id>e?t.id:e}),0)+1);var a=t.orders.find((function(t){return t.id==e.id}));"undefined"===typeof a?t.orders.push(e):Object.assign(a,e),x(t),G(!1)},onDelete:function(e){var t=Object.assign(n);t.orders=t.orders.filter((function(t){return t.id!==e.id})),x(t),G(!1)},enableDelete:Y})]})}var A=n(164);function W(e){var t=e.stock,n=e.open,a=e.enableDelete,r=e.currencies||["SGD","USD","JPY"],i=e.onClose||function(){console.log("onClose")},s=e.onSave||function(e){console.log("onSave",e)},d=e.onDelete||function(e){console.log("onDelete",e)},u=c.a.useState(""),j=Object(l.a)(u,2),b=j[0],f=j[1],h=c.a.useState(""),O=Object(l.a)(h,2),x=O[0],p=O[1],y=c.a.useState(""),v=Object(l.a)(y,2),m=v[0],C=v[1],S=c.a.useState(!1),D=Object(l.a)(S,2),k=D[0],w=D[1];c.a.useEffect((function(){f(t.name||""),p(t.symbol||""),C(t.currency||r[0])}),[t]);var E=function(e,t){e(t.target.value)};return Object(_.jsxs)(U.a,{open:n,onClose:i,"aria-labelledby":"form-dialog-title",children:[Object(_.jsx)(G.a,{id:"form-dialog-title",children:"Stock"}),Object(_.jsx)(T.a,{children:Object(_.jsx)("form",{noValidate:!0,autoComplete:"off",children:Object(_.jsxs)(P.a,{container:!0,spacing:2,children:[Object(_.jsx)(P.a,{item:!0,xs:12,children:Object(_.jsx)(R.a,{variant:"filled",label:"Name",value:b,fullWidth:!0,onChange:E.bind(null,f)})}),Object(_.jsx)(P.a,{item:!0,xs:12,children:Object(_.jsx)(R.a,{variant:"filled",label:"Symbol",value:x,fullWidth:!0,onChange:E.bind(null,(function(e){p(e.toUpperCase())}))})}),Object(_.jsx)(P.a,{item:!0,xs:12,children:Object(_.jsx)(R.a,{variant:"filled",label:"Currency",value:m,fullWidth:!0,onChange:E.bind(null,C),select:!0,children:r.map((function(e){return Object(_.jsx)(A.a,{value:e,children:e},e)}))})})]})})}),Object(_.jsx)(I.a,{children:Object(_.jsxs)(g.a,{display:"flex",justifyContent:"space-between",width:"100%",children:[Object(_.jsxs)(g.a,{visibility:a?"visible":"hidden",children:[Object(_.jsx)(q.a,{checked:k,onChange:function(){w(!k)},name:"checkedDelete",inputProps:{"aria-label":"deletion enabling checkbox"}}),Object(_.jsx)(o.a,{onClick:function(){d(t),w(!1)},disabled:!k,children:"Delete"})]}),Object(_.jsxs)(g.a,{display:"flex",children:[Object(_.jsx)(g.a,{visibility:a?"visible":"hidden",children:Object(_.jsx)(o.a,{onClick:i,children:"Cancel"})}),Object(_.jsx)(g.a,{children:Object(_.jsx)(o.a,{onClick:function(){var e=Object.assign({},t,{name:b,symbol:x,currency:m});s(e)},children:"Save"})})]})]})})]})}function B(e){var t,n=c.a.useState(!1),a=Object(l.a)(n,2),r=a[0],i=a[1],d=c.a.useState(!1),h=Object(l.a)(d,2),O=h[0],x=h[1],p=c.a.useState({}),y=Object(l.a)(p,2),v=y[0],g=y[1],m=e.folio||[],C=e.quotes||{},S=e.xrs||{},D=e.baseCurrency||"SGD",k=e.currencies||["SGD","USD","JPY"],w=e.onChange||function(e){console.log("onChange",e)},E=function(e){g(e),"undefined"!==typeof e.orders&&0===e.orders.length?x(!0):x(!1),i(!0)},N=function(e){var t=m.concat();"undefined"===typeof e.id&&(e.id=t.reduce((function(e,t){return t.id>e?t.id:e}),0)+1);var n=t.find((function(t){return t.id==e.id}));"undefined"===typeof n?t.push(e):Object.assign(n,e),w(t),i(!1)},R=[],U=Object(s.a)(m);try{for(U.s();!(t=U.n()).done;){var I=t.value;R.push(Object(_.jsx)(Y,{stock:I,quotes:C,xrs:S,baseCurrency:D,onEdit:E,onChange:N},I.id))}}catch(T){U.e(T)}finally{U.f()}return Object(_.jsxs)(c.a.Fragment,{children:[Object(_.jsx)(o.a,{onClick:function(){g({}),x(!1),i(!0)},children:"Add New Stock"}),Object(_.jsx)(W,{open:r,onClose:function(){return i(!1)},stock:v,currencies:k,onSave:N,onDelete:function(e){var t=m.filter((function(t){return t.id!==e.id}));w(t),i(!1)},enableDelete:O}),Object(_.jsx)(b.a,{component:f.a,children:Object(_.jsx)(u.a,{children:Object(_.jsx)(j.a,{children:R})})})]})}var X=n(155);function L(e){var t=e.source,n=e.open,a=e.onClose,r=e.onSave,i=c.a.useState(""),s=Object(l.a)(i,2),d=s[0],u=s[1],j=c.a.useState(""),b=Object(l.a)(j,2),f=b[0],h=b[1];c.a.useEffect((function(){h(JSON.stringify(t,null,"\t"))}),[t]);return Object(_.jsxs)(U.a,{open:n,onClose:a,"aria-labelledby":"form-dialog-title",children:[Object(_.jsx)(G.a,{id:"form-dialog-title",children:"JSON"}),Object(_.jsxs)(T.a,{children:[Object(_.jsx)(X.a,{children:"This is provided as a means to quickly import your portfolio or to make backups. Editing the JSON directly is not recommended."}),Object(_.jsx)(R.a,{variant:"filled",error:""!==d,helperText:d,margin:"dense",id:"portfolioText",label:"JSON",fullWidth:!0,multiline:!0,value:f,onChange:function(e){var t=e.target.value;h(t);try{JSON.parse(t),u("")}catch(n){u(n.message)}}})]}),Object(_.jsxs)(I.a,{children:[Object(_.jsx)(o.a,{onClick:a,color:"primary",children:"Cancel"}),Object(_.jsx)(o.a,{onClick:function(){try{var e=JSON.parse(f);r(e)}catch(t){u(t.message)}},color:"primary",children:"Save"})]})]})}var M="folios",Q="baseCurrency",K="currencies",z="avKey",V="quotes",H="xrs",Z=["SGD","USD","JPY"],$={"":{tradeDate:"",price:0,lastUpdate:Number.MAX_SAFE_INTEGER}},ee={"":{xrDate:"",xr:0,lastUpdate:Number.MAX_SAFE_INTEGER}},te=[[]],ne=36e5;function ae(e,t,n,a){if(function(e){switch(typeof e){case"undefined":return!0;case"string":return""===e;case"object":if(null===e)return!0;if(0===Object.keys(e).length)return!0}return!1}(t)){var c=window.localStorage.getItem(e);n(null!==c?JSON.parse(c):a)}else window.localStorage.setItem(e,JSON.stringify(t))}function ce(e,t,n){return function(a){if("undefined"!==typeof e[a])return e[a];var c=Object.assign({},e);return c[a]=n,t(c),c[a]}}function re(){var e=c.a.useState([]),t=Object(l.a)(e,2),n=t[0],r=t[1],i=c.a.useState(""),u=Object(l.a)(i,2),j=u[0],b=u[1],f=c.a.useState([]),h=Object(l.a)(f,2),O=h[0],x=h[1],p=c.a.useState(""),y=Object(l.a)(p,2),v=y[0],g=y[1],m=c.a.useState({}),C=Object(l.a)(m,2),S=C[0],D=C[1],k=c.a.useState({}),w=Object(l.a)(k,2),E=w[0],N=w[1];c.a.useEffect((function(){ae(Q,j,b,"SGD"),ae(K,O,x,Z),ae(z,v,g,"demo"),ae(V,S,D,$),ae(H,E,N,ee),ae(M,n,r,te)}),[n,j,O,v,S,E]);var R=c.a.useState(0),U=Object(l.a)(R,2),I=U[0],T=U[1];!function(e,t){var n=Object(a.useRef)();Object(a.useEffect)((function(){n.current=e}),[e]),Object(a.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){T(I+1)}),15e3),c.a.useEffect((function(){var e,t=!1,a=Object(s.a)(n);try{for(a.s();!(e=a.n()).done;){var c,r=e.value,i=Object(s.a)(r);try{for(i.s();!(c=i.n()).done;){var l=c.value;if(P(l.symbol).lastUpdate+ne<Date.now()){J(l.symbol),t=!0;break}if(q(l.currency).lastUpdate+ne<Date.now()){A(l.currency),t=!0;break}}}catch(o){i.e(o)}finally{i.f()}if(t)break}}catch(o){a.e(o)}finally{a.f()}}),[I]);var G,P=ce(S,D,{tradeDate:"",price:0,lastUpdate:0}),q=ce(E,N,{xrDate:"",xr:0,lastUpdate:0}),J=function(e){e.endsWith(".SI")?Y():F(e)},F=function(e){fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+e+"&apikey="+v).then((function(e){return e.json()})).then((function(t){if("undefined"!==typeof t["Global Quote"]){var n=Object.assign({},S);"undefined"===typeof n[e]&&(n[e]={}),n[e].tradeDate=t["Global Quote"]["07. latest trading day"],n[e].price=t["Global Quote"]["05. price"],n[e].lastUpdate=Date.now(),D(n)}}))},Y=function(){fetch("https://api.sgx.com/securities/v1.1?excludetypes=bonds&params=nc%2Cadjusted-vwap%2Cbond_accrued_interest%2Cbond_clean_price%2Cbond_dirty_price%2Cbond_date%2Cb%2Cbv%2Cp%2Cc%2Cchange_vs_pc%2Cchange_vs_pc_percentage%2Ccx%2Ccn%2Cdp%2Cdpc%2Cdu%2Ced%2Cfn%2Ch%2Ciiv%2Ciopv%2Clt%2Cl%2Co%2Cp_%2Cpv%2Cptd%2Cs%2Csv%2Ctrading_time%2Cv_%2Cv%2Cvl%2Cvwap%2Cvwap-currency",{headers:{accept:"*/*","accept-language":"en,en-GB;q=0.9,en-US;q=0.8"},referrer:"https://www.sgx.com/",referrerPolicy:"strict-origin-when-cross-origin",body:null,method:"GET",mode:"cors",credentials:"omit"}).then((function(e){return e.json()})).then((function(e){for(var t=Object.assign({},S),n=function(){var t=Object(l.a)(c[a],2),n=t[0],r=t[1];if(!n.endsWith(".SI"))return"continue";var i=n.replace(".SI",""),s=e.data.prices.find((function(e){return e.nc==i})),o=s.trading_time.slice(0,4)+"-"+s.trading_time.slice(4,6)+"-"+s.trading_time.slice(6,8);r.tradeDate=o,r.price=s.lt,r.lastUpdate=Date.now()},a=0,c=Object.entries(t);a<c.length;a++)n();D(t)}))},A=function(e){if(j===e){var t=Object.assign({},E);"undefined"===typeof t[e]&&(t[e]={}),t[e].xrDate=(new Date).toISOString(),t[e].xr=1,t[e].lastUpdate=Date.now(),N(t)}else{fetch("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency="+e+"&to_currency="+j+"&apikey="+v).then((function(e){return e.json()})).then((function(t){if("undefined"!==typeof t["Realtime Currency Exchange Rate"]){var n=Object.assign({},E);"undefined"===typeof n[e]&&(n[e]={}),n[e].xrDate=t["Realtime Currency Exchange Rate"]["6. Last Refreshed"],n[e].xr=t["Realtime Currency Exchange Rate"]["5. Exchange Rate"],n[e].lastUpdate=Date.now(),N(n)}}))}},W=c.a.useState({}),X=Object(l.a)(W,2),re=X[0],ie=X[1],se=c.a.useState(!1),le=Object(l.a)(se,2),oe=le[0],de=le[1],ue=function(e,t){var a=n.map((function(n,a){return a===e?t:n}));r(a)},je=[],be=Object(s.a)(n.entries());try{for(be.s();!(G=be.n()).done;){var fe=Object(l.a)(G.value,2),he=fe[0],Oe=fe[1];je.push(Object(_.jsx)(B,{folio:Oe,quotes:S,xrs:E,baseCurrency:j,currencies:O,onChange:ue.bind(this,he)},he))}}catch(xe){be.e(xe)}finally{be.f()}return Object(_.jsxs)(c.a.Fragment,{children:[je,Object(_.jsx)(o.a,{onClick:function(){ie({baseCurrency:j,currencies:O,avKey:v,folios:n}),de(!0)},children:"Access Source"}),Object(_.jsx)(L,{open:oe,onClose:function(){de(!1)},onSave:function(e){r(e.folios),b(e.baseCurrency),x(e.currencies),g(e.avKey),ie(e),de(!1)},source:re}),Object(_.jsx)(d.a,{children:Object(_.jsx)("pre",{style:{whiteSpace:"pre-wrap"},children:JSON.stringify(n,null,"\t")})})]})}var ie=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,166)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))},se=n(157);i.a.render(Object(_.jsxs)(c.a.StrictMode,{children:[Object(_.jsx)(se.a,{}),Object(_.jsx)(re,{})]}),document.getElementById("root")),ie(console.log)}},[[104,1,2]]]);
//# sourceMappingURL=main.7ee8cdd4.chunk.js.map