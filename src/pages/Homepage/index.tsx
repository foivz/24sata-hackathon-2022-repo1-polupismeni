import React from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import { BsPlusLg } from 'react-icons/bs'
import { AiFillRobot } from 'react-icons/ai'
import { Grid, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

import { firebaseAuth } from '../../firebase';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { DatePicker, DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";



// import { firestore } from '../../firebase';
const actions = [{
	name: 'Add expense',
	icon: <BsPlusLg />
}, {
	name: 'ChatBot',
	icon: <AiFillRobot />
}]
const dataPie = [
	{ name: 'Group A', value: 400 },
	{ name: 'Group B', value: 300 },
	{ name: 'Group C', value: 300 },
	{ name: 'Group D', value: 200 },
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
	  spent: 800,
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

const Homepage = () => {
	console.log('u homepageu')
	const [value, setValue] = React.useState<Date | null>(new Date());

	// const articlesRef = firestore.collection('articles');
	//  const a = articlesRef.orderBy('title').limit(5).get().then((snapShot) => snapShot.docs.forEach((s) => console.log(s.data())));
	function handleChartClick(e: any) {
		return () => {
			console.log(e);
		}
	}
	return (
		<div className='homepage'>
			<Grid container>
				<Grid style={{ 'padding': '12px', 'color': 'white', 'fontSize': '22px', 'marginLeft': '10vh' }} item xs={12}>
					<span>{`Hello, ${firebaseAuth.currentUser?.displayName}, here are your expenses`} </span>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DateTimePicker
							label="DateTimePicker"
							inputVariant="outlined"
							views={['year', 'month']}
							value={new Date()}
							onChange={(value) => setValue(value)}

						/>
					</MuiPickersUtilsProvider>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item xs={6} alignItems={'center'}>
					<PieChart width={400} height={400}>
						<Pie
							data={dataPie}
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={100}
							fill="#8884d8"
							dataKey="value"
						>
							{dataPie.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} onClick={handleChartClick(entry)} />
							))}
						</Pie>
					</PieChart>
				</Grid>
				<Grid item xs={6} alignItems='center'>
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
							<stop offset={`25%`} stopColor="blue" />
							<stop offset={`75%`} stopColor="blue" />
							<stop offset="100%" stopColor="blue" />
       					 </linearGradient>
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="spent" stroke="red" />
						<Line type="monotone" dataKey="estSpent" stroke="blue" />
					</LineChart>
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
						/>
					))}
					</SpeedDial>
		</div>
	);
};

export default Homepage;
