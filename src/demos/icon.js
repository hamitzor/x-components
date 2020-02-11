import React from 'react';
import render from './render';
import { Icon } from '../index';
import { MdNotifications } from 'react-icons/md';
import { propValues } from '../components/Icon/Icon';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

class IconDemosContainer extends React.Component {
   state = {
      color: 'inherit',
      size: 100
   }
   render() {
      return <IconDemos {...this.state} onChange={data => this.setState(data)} />;
   }
}
const useStyles = createUseStyles({
   iconContainer: {
      display: 'inline-block'
   }
});
const IconDemos = props => {
   const {
      color,
      size,
      onChange
   } = props;
   const classes = useStyles();
   return (
      <div>
         <Settings
            onChange={onChange}
            values={{ color, size }}
            settingsData={{
               props: [
                  { propName: 'color', type: 'select', propValues: propValues.color },
               ],
               variables: [
                  { variableName: 'size', type: 'number' }
               ]
            }} />
         <div className={classes.iconContainer}>
            <Icon color={color}>
               <MdNotifications style={{ fontSize: size }} />
            </Icon>
         </div>
      </div>
   );
};

export default () => render(<IconDemosContainer />, 'app');