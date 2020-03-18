import React, { useState } from 'react';
import Panel from '../components/Panel';
import Popup from '../components/Popup';
import PopupHeader from '../components/PopupHeader';
import PopupTitle from '../components/PopupTitle';
import PopupBody from '../components/PopupBody';
import PopupFooter from '../components/PopupFooter';
import Flex from '../components/Flex';
import Button from '../components/Button';
import { propValues } from '../components/Popup/Popup';
import { propValues as popupHeaderPropValues } from '../components/PopupHeader/PopupHeader';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles(theme => ({
   container: {
      display: 'flex',
   },
   content: {
      color: theme.textColors.normal
   }
}));

const Demo = () => {
   const [active, setActive] = useState('');
   const [width, setWidth] = useState('sm');
   const [fullWidth, setFullWidth] = useState(false);
   const [fullScreen, setFullScreen] = useState(false);
   const [animate, setAnimate] = useState(true);
   const [color, setColor] = useState('primary');
   const [content, setContent] = useState('Do you agree that React has some fallbacks?');
   const classes = useStyles();
   const popupProps = {
      width,
      fullWidth,
      fullScreen,
      animate
   };

   return (
      <div>
         <Settings
            onChange={{
               width: setWidth,
               fullWidth: setFullWidth,
               fullScreen: setFullScreen,
               animate: setAnimate,
               color: setColor,
               content: setContent
            }}
            values={{ width, fullWidth, fullScreen, animate, color, content }}
            settingsData={{
               props: [
                  { name: 'width', type: 'select', values: propValues.width },
                  { name: 'fullWidth', type: 'bool' },
                  { name: 'fullScreen', type: 'bool' },
                  { name: 'animate', type: 'bool' },
                  { name: 'color', type: 'select', values: popupHeaderPropValues.color }
               ],
               variables: [
                  { name: 'content', type: 'text' },
               ]
            }} />
         <Panel className={classes.container}>
            <Button onClick={() => setActive(0)}>Open Popup</Button>
            <Popup open={active === 0} onClose={() => setActive(null)} {...popupProps}>
               <PopupHeader style={{ justifyContent: 'space-between' }} color={color}>
                  <PopupTitle>
                     Are you sure ?
                     </PopupTitle>
               </PopupHeader>
               <PopupBody>
                  <div className={classes.content}>
                     {content}
                  </div>
               </PopupBody>
               <PopupFooter>
                  <Flex
                     container
                     justify='end'>
                     <Button type="transparent" color="grey" onClick={() => setActive(null)} style={{ marginRight: 10 }}>Nope</Button>
                     <Button type="transparent" color="success" onClick={() => setActive(null)}>Yeap</Button>
                  </Flex>
               </PopupFooter>
            </Popup>
         </Panel>
      </div>
   );
};

export default { name: 'Popup', component: Demo };
