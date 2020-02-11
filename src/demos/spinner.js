import React from 'react';
import render from './render';
import Spinner from '../components/Spinner';
import { propValues } from '../components/Spinner/Spinner';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

class SpinnerDemosContainer extends React.Component {
   state = {
      color: 'primary',
      visible: true,
      animate: true,
      size: 100
   }
   render() {
      return <SpinnerDemos {...this.state} onChange={data => this.setState(data)} />;
   }
}
const useStyles = createUseStyles({
   spinnerContainer: {
      margin: 10
   }
});
const SpinnerDemos = props => {
   const {
      color,
      visible,
      animate,
      size,
      onChange
   } = props;
   const classes = useStyles();
   return (
      <div>
         <Settings
            onChange={onChange}
            values={{ color, visible, animate, size }}
            settingsData={{
               props: [
                  { propName: 'color', type: 'select', propValues: propValues.color },
                  { propName: 'visible', type: 'bool' },
                  { propName: 'animate', type: 'bool' }
               ],
               variables: [
                  { variableName: 'size', type: 'number' }
               ]
            }} />
         <div className={classes.spinnerContainer} style={{ width: size, height: size }}>
            <Spinner
               color={color}
               visible={visible}
               animate={animate}
            />
         </div>
      </div>
   );
};

export default () => render(<SpinnerDemosContainer />, 'app');