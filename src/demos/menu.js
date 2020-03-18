import React, { useState } from 'react';
import Menu from '../components/Menu';
import Button from '../components/Button';
import MenuItem from '../components/MenuItem';
import Panel from '../components/Panel';
import Flex from '../components/Flex';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles(theme => ({
   clickArea: {
      backgroundColor: theme.colors.success.normal,
      width: '100%',
      height: 300,
   },
   button: {
      marginBottom: 200
   }
}));

const Demo = () => {
   const [animate, setAnimate] = useState(true);
   const [clickPosition, setClickPosition] = useState(null);
   const [open, setOpen] = useState(false);
   const [openButtonMenu, setOpenButtonMenu] = useState(false);
   const [buttonRef, setButtonRef] = useState(null);
   const classes = useStyles();

   const list = ['My Profile', 'Settings', 'Logout', 'About'];

   return (
      <div>
         <Settings
            onChange={{
               animate: setAnimate,
            }}
            values={{ animate }}
            settingsData={{
               props: [
                  { name: 'animate', type: 'bool' },
               ],
               variables: []
            }} />
         <Panel className={classes.container}>
            <Button className={classes.button} onClick={e => {
               setOpenButtonMenu(!openButtonMenu);
               setButtonRef(e.currentTarget);
            }}>
               Profile
            </Button>
            <Flex container justify="center" alignItems="center" className={classes.clickArea}
               onClick={() => setOpen(false)}
               onContextMenu={e => {
                  e.preventDefault();
                  var x = e.clientX;
                  var y = e.clientY;
                  setClickPosition({ left: x, top: y });
                  setOpen(true);
               }}>
               Right click here to test Menu component.
            </Flex>
         </Panel>
         <Menu
            animate={animate}
            clickPosition={clickPosition}
            open={open}
            onSelect={data => {
               console.log(data); setOpen(false);
            }}>
            {list.map(data => (
               <MenuItem key={data} itemId={data} >{data}</MenuItem>
            ))}
         </Menu>
         <Menu
            animate={animate}
            anchorEl={buttonRef}
            open={openButtonMenu}
            onSelect={data => {
               console.log(data); setOpenButtonMenu(false);
            }}>
            {list.map(data => (
               <MenuItem key={data} itemId={data} >{data}</MenuItem>
            ))}
         </Menu>
      </div>
   );
};

export default { name: 'Menu', component: Demo };