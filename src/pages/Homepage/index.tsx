import React, { useEffect, useState } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import { BsPlusLg } from 'react-icons/bs'
import { AiFillRobot, AiOutlineClose } from 'react-icons/ai'
import { MdLocalGroceryStore, MdOutlineAirplanemodeActive, MdCelebration } from 'react-icons/md';
import { FaBed } from 'react-icons/fa'
import { IoMdClose, IoMdCalendar } from 'react-icons/io'
import { FiSave } from 'react-icons/fi'
import { duration, Grid, Switch, TextField, Dialog, Paper, Box, Button, IconButton } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import DatePicker from 'react-date-picker';
import { MonthPicker } from '@mui/lab';
import shoppingImage from '../Homepage/shopping.svg';


import { firebaseAuth } from '../../firebase';
import { Autocomplete, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import './_homepage.scss'
import { animated, useSpring } from 'react-spring';

const expenses = [
	{
		type: 'GROCERIES',
		amount: 2.4,
		boughtAt: "2.4.2022.",
		name: 'Banana',
		storeName: 'Konzum, Radićeva 12'
	},
	{
		type: 'GROCERIES',
		amount: 14.12,
		boughtAt: "2.4.2022.",
		name: 'Ice cream',
		storeName: 'Konzum, Radićeva 12'
	},
	{
		type: 'GROCERIES',
		amount: 1,
		boughtAt: "2.4.2022.",
		name: 'Snickers',
		storeName: 'Konzum, Radićeva 12'
	},
	{
		type: 'ENTERTAIMENT',
		amount: 23.19,
		boughtAt: "1.4.2022.",
		name: 'Spiderman 3',
		storeName: 'Cinestar, Radićeva 13'
	},
	{
		type: 'TRAVEL',
		amount: 40,
		boughtAt: "1.4.2022.",
		name: 'Plane Ticket Malta',
		storeName: 'RyanAir, Dublin Joyce Street 12'
	},
	{
		type: 'RENT',
		amount: 100,
		boughtAt: "11.3.2022.",
		name: 'Apartment Rent',
		storeName: 'Home'
	}
]



// import { firestore } from '../../firebase';

const dataPie = [
	{ name: 'GROCERIES', value: 400 },
	{ name: 'ENTERTAIMENT', value: 300 },
	{ name: 'TRAVEL', value: 300 },
	{ name: 'RENT', value: 200 },
];

const dataLine = [
	{
		name: '1.-7.',
		spent: 250,
		amt: 2400,
	},
	{
		name: '7.-14.',
		estSpent: 800,
		amt: 2210,
	},
	{
		name: '14.-21.',
		estSpent: 900,
		amt: 2290,
	},
	{
		name: '21.-28.',
		estSpent: 1500,
		amt: 2000,
	},
	{
		name: '28.-31.',
		estSpent: 2000,
		amt: 2181,
	},
];

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = (props: any) => {
	const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

function AnimatedNumber(props: any) {
	const { value } = props;

	const spring: any = useSpring({ from: { value: 0 }, to: { value }, duration: 2000 });
	return (
		<span>
			<animated.div>
				{spring.value.interpolate((c: any) => c.toFixed(1))}
			</animated.div>
		</span>
	);
}

function getIconFromExpenseType(type: any) {
	switch (type) {
		case 'GROCERIES':
			return <MdLocalGroceryStore color='#0088FE' style={{ 'marginRight': '2px' }} />
		case 'TRAVEL':
			return <MdOutlineAirplanemodeActive color='#FFBB28' style={{ 'marginRight': '2px' }} />
		case 'ENTERTAIMENT':
			return <MdCelebration color='#00C49F' style={{ 'marginRight': '2px' }} />
		case 'RENT':
			return <FaBed color='#FF8042' style={{ 'marginRight': '2px' }} />
		default:
			break;
	}
}

const Homepage = () => {

	const [value, setValue] = useState<Date | null>(new Date());
	const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
	const [currentSection, setCurrentSection] = useState(null);
	const [currentExpenses, setCurrentExpenses] = useState<any>([]);
	const [currentTotal, setCurrentTotal] = useState<number>(0);
	const [currentExpenseToAdd, setCurrentExpenseToAdd] = useState<any>(null);
	const [currentPieData, setCurrentPieData] = useState<any>([]);
	console.log(currentSection);
	function handleClick(e: any) {
		e.preventDefault();
		setOpenAddExpenseModal(true);// to close the speed dial, remove this line if not needed.
	};
	const actions = [{
		name: 'Add expense',
		icon: <BsPlusLg />,
		action: () => setOpenAddExpenseModal(true),
	}, {
		name: 'ChatBot',
		icon: <AiFillRobot />
	}]

	useEffect(() => {
		setCurrentExpenses(expenses);
		setCurrentPieData(dataPie);
	}, [])

	useEffect(() => {
		const ct = currentExpenses.reduce((total:number, currExpense: any) => {
			return total+= currExpense.amount;
		}, 0);
		setCurrentTotal(ct);
		let dataPie = [
			{ name: 'GROCERIES', value: 0 },
			{ name: 'ENTERTAIMENT', value: 0 },
			{ name: 'TRAVEL', value: 0 },
			{ name: 'RENT', value: 0 },
		];
		const newPieAmounts = currentExpenses.reduce((_acc: any, _currExp: any) => {
			if (!_acc[_currExp.type]) {
				_acc[_currExp.type] = 0;
			}
			_acc[_currExp.type] += _currExp.amount;
			return _acc;
		}, {})
		dataPie = dataPie.map((p) => ({ value: newPieAmounts[p.name], name: p.name }));
		setCurrentPieData(dataPie);
	}, [currentExpenses])

	function handleCloseSectionModal() {
		setCurrentSection(null);
	}

	// const articlesRef = firestore.collection('articles');
	//  const a = articlesRef.orderBy('title').limit(5).get().then((snapShot) => snapShot.docs.forEach((s) => console.log(s.data())));
	function handleChartClick(e: any) {
		return () => {
			setCurrentSection(e.name);
		}
	}
	return (
		<div className='homepage'>
			<Grid container>
				<Grid style={{ 'padding': '12px', 'color': 'white', 'fontSize': '22px', 'marginLeft': '10vh' }} item xs={6}>
					<Grid container>
						<Grid item xs={12} style={{ 'fontSize': '30px', 'fontWeight': '800' }}>
							{`Hello, ${firebaseAuth.currentUser?.displayName}!`}
						</Grid>
						<Grid item xs={12} style={{ 'fontSize': '18px' }}>
							<span>Here are your expenses for: </span>
							<DatePicker
								onChange={setValue}
								value={value}
								maxDetail={'year'}
								minDetail='month'
								clearIcon={<IoMdClose color='white' />}
								calendarIcon={<IoMdCalendar color='white' />}
								className='homepage__date-picker'
								defaultValue={new Date()}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Grid container justifyContent='center' alignContent='center'
						style={{ 'color': 'white', 'fontSize': '16', 'fontWeight': '800', 'padding': '12px' }}
					>
						<Grid item xs={12}>
							<Grid container>
								<Grid item xs={10}>
									Spent this month:
								</Grid>
								<Grid item xs={2}>
									<AnimatedNumber value={currentTotal} />
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} >
							<Grid container>
								<Grid item xs={10}>
									Include family?
								</Grid>
								<Grid item xs={2}>
									<Switch defaultChecked={false} color='primary' className='homepage__switch' />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item xs={6}>
					<Grid container alignItems='center' justifyContent='center'>
						<PieChart width={400} height={400}>
							<Pie
								data={currentPieData}
								labelLine={false}
								label={renderCustomizedLabel}
								outerRadius={140}
								fill="#8884d8"
								dataKey="value"
							>
								{dataPie.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} onClick={handleChartClick(entry)} />
								))}
							</Pie>
						</PieChart>
					</Grid>
				</Grid>
				<Grid item xs={6} >
					<Grid container alignItems='center' justifyContent='center' style={{ 'padding': '50px' }}>
						<LineChart
							width={500}
							height={300}
							data={dataLine}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
								<stop offset="0%" stopColor="red" />
								<stop offset={`25%`} stopColor="red" />
								<stop offset={`75%`} stopColor="blue" />
								<stop offset="100%" stopColor="blue" />
							</linearGradient>
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line type="monotone" dataKey="spent" stroke="#82ca9d" />
							<Line type="monotone" dataKey="estSpent" stroke="#82ca9d" />
						</LineChart>
					</Grid>
				</Grid>
			</Grid>
			<SpeedDial
				ariaLabel="SpeedDial basic example"
				sx={{ position: 'absolute', bottom: 64, right: 64 }}
				icon={<SpeedDialIcon />}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={action.action}
					/>
				))}
			</SpeedDial>
			<Dialog
				open={!!currentSection}
				onClose={handleCloseSectionModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
				fullWidth
				maxWidth='md'
			>
				<Grid
					container style={{
						'height': '60vh',
						'color': 'black',
						'backgroundImage': `url(${shoppingImage})`,
						'backgroundRepeat': 'no-repeat',
						'backgroundSize': 'cover',
					}}>
					<Grid item xs={12} className='homepage__modal-title' style={{ 'height': '10%', 'fontWeight': '800', 'fontSize': '24px' }}>
						{currentSection}
					</Grid>
					<Grid container >
						{currentExpenses?.filter((expense: any) => expense.type === currentSection)?.map((expense: any) => {
							return (
								<Grid container>
									<Grid item xs={12} style={{ 'width': '60%' }}>
										<div className='homepage__expense-container'>
											<div className='homepage__expense'>
												{`${expense.name} - ${expense.storeName} ${expense.boughtAt}`}
												<span className='homepage__expense__amount'>
													{`-${expense.amount} €`}
												</span>
											</div>
										</div>
									</Grid>
								</Grid>
							)
						})}
					</Grid>
				</Grid>
			</Dialog>
			<Dialog
				open={openAddExpenseModal}
				onClose={() => setOpenAddExpenseModal(false)}
				maxWidth='sm'
			>
				<Grid container style={{ 'height': '40vh', 'padding': '16px' }}>
					<Grid item xs={12}>
						<Autocomplete
							id="country-select-demo"
							sx={{ width: 300 }}
							options={expenses}
							autoHighlight
							getOptionLabel={(option: any) => option.name}
							renderOption={(props: any, option: any) => (
								<Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
									{getIconFromExpenseType(option.type)} {option.name} {option.amount}€
								</Box>
							)}
							onChange={(event, value) => setCurrentExpenseToAdd(value)}
							renderInput={(params: any) => (
								<TextField
									{...params}
									label="Add an expense"
									inputProps={{
										...params.inputProps,
										autoComplete: 'new-password', // disable autocomplete and autofill
									}}
								/>
							)}
						/>
						<div className='homepage__or'>
							Or
						</div>
						<Grid container justifyContent='center' alignContent='center' direction='column'>
							<Grid item xs={12}>
								<Button
									variant="contained"
									component="label"
									>
									Upload File
									<input
										type="file"
										hidden
									/>
								</Button>
							</Grid>
						</Grid>
						<Grid container justifyContent='flex-end' alignContent='flex-end' direction='column'>
							<Grid item xs={12}>
								<IconButton onClick={() => {
									const array = currentExpenses.map((ex: any) => ex);
									array.push(currentExpenseToAdd);
									setCurrentExpenses(array);
								}}>
									<FiSave color='green' onClick={() => {
										const newPieData = currentPieData.map((p: any) => {
											if (p.name === currentExpenseToAdd.type) {
												const value = p.value + currentExpenseToAdd.amount;
												return { name: p.name, value }
											}
											return p;
										});
										setCurrentPieData(newPieData)
									}}/>
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Dialog>
		</div>
	);
};

export default Homepage;
