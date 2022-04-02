import React, { useEffect, useState, useRef } from 'react';
import { Grid, Button, ButtonGroup, Popover, Paper, MenuItem, MenuList } from '@material-ui/core';
import { HiOfficeBuilding } from 'react-icons/hi';
import {  GiHamburgerMenu, GiPieChart } from 'react-icons/gi';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';import './_navigation-bar.scss';
import { Link } from 'react-router-dom';

const MOBILE_WIDTH_THRESHOLD = 1000; // px

const NavigationBar = () => {
    const [mobileMode, setMobileMode] = useState<boolean>(window.innerWidth < MOBILE_WIDTH_THRESHOLD);
    const [anchorEl, setAnchorEl] = useState(null);

    const menuButtonRef =  useRef(null);

    function handleMenuClick (event: any) {
        setAnchorEl(menuButtonRef.current);
    }
    function handleMenuClose (event: any) {
        setAnchorEl(null);
    }
    function resizeHandler() {
        if (window.innerWidth < MOBILE_WIDTH_THRESHOLD) {
            setMobileMode(true);
        } else {
            setMobileMode(false);
        }
    }

    function handleLogOut() {
        firebase.auth().signOut()
            .then(function() {
                
  })
    }

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
    }, []);

    return (
        <Grid container spacing={2} className='navigation-bar'>
            <Grid item xs={8} className='navigation-bar__logo-wrapper'>
                <GiPieChart className='navigation-bar__icon' />
                <span className="navigation-bar__stanko">everyEuro</span>
            </Grid>
            <Grid item xs={4}>
                {mobileMode ?
                    <div className="navigation-bar__menu">
                        <Button
                            ref={menuButtonRef}
                            onClick={handleMenuClick}
                        >
                            <GiHamburgerMenu className='navigation-bar__menu__icon'/>
                        </Button>
                        <Popover
                            open={!!anchorEl}
                            anchorEl={anchorEl}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                        >
                             <Paper >
                                <MenuList className="navigation-bar__menu__popover">
                                    <MenuItem style={{'color': '#4E9F3D'}} component={Link} to='/'>Spendings</MenuItem>
                                    <MenuItem style={{'color': '#4E9F3D'}} component={Link} to='prijava' onClick={handleLogOut}>Log out</MenuItem>
                                </MenuList>
                            </Paper>
                        </Popover>
                    </div>
                    :
                    <ButtonGroup variant="outlined" aria-label="text button group" className="navigation-bar__options">
                        <Button className='navigation-bar__hover-animation' style={{'color': '#4E9F3D'}} component={Link} to='/' >Spendings</Button>
                        <Button className='navigation-bar__hover-animation' style={{'color': '#4E9F3D'}}  component={Link} to='/prijava' onClick={handleLogOut}>Log out</Button>
                    </ButtonGroup>
                }
            </Grid>
        </Grid>
    );
};

export default NavigationBar;