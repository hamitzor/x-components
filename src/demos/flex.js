import React, { useState } from 'react';
import Panel from '../components/Panel';
import { Flex, propValues, itemProps } from '../components/Flex/Flex';
import Settings from './Settings';

const Demo = () => {
   const [direction, setDirection] = useState('row');
   const [wrap, setWrap] = useState('nowrap');
   const [justify, setJustify] = useState('start');
   const [alignItems, setAlignItems] = useState('stretch');
   const [alignContent, setAlignContent] = useState('stretch');
   const [xs, setXs] = useState(1);
   const [sm, setSm] = useState(1);
   const [md, setMd] = useState(1);
   const [lg, setLg] = useState(1);
   const [xl, setXl] = useState(1);
   const [xxl, setXxl] = useState(1);
   const boxStyle = {
      height: 80, backgroundColor: 'blue', color: 'white', fontSize: 25,
      border: '2px solid yellow',
   };

   return (
      <div>
         <Settings
            onChange={{
               direction: setDirection,
            }}
            values={{ direction }}
            settingsData={{
               props: [
                  { name: 'direction', type: 'select', values: propValues.direction },
               ],
               variables: []
            }} />
         <Panel style={{ marginBottom: 10 }}>
            <Flex direction={direction} container>
               {[0, 1, 2, 3, 4, 5].map(num => 
                  <Flex xs={12} sm={6} md={4} lg={3} xl={2} container item alignItems="center" justify="center"
                     style={{ ...boxStyle }} key={num}>
                     {num}
                  </Flex>
               )}
            </Flex>
         </Panel>
         <Settings
            onChange={{
               wrap: setWrap,
            }}
            values={{ wrap }}
            settingsData={{
               props: [
                  { name: 'wrap', type: 'select', values: propValues.wrap },
               ],
               variables: []
            }} />
         <Panel style={{ marginBottom: 10 }}>
            <Flex wrap={wrap} container style={{ width: 850 }}>
               {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => 
                  <Flex container item alignItems="center" justify="center"
                     style={{ ...boxStyle, width: 80 }} key={num}>{num}</Flex>
               )}
            </Flex>
         </Panel>
         <Settings
            onChange={{
               justify: setJustify,
            }}
            values={{ justify }}
            settingsData={{
               props: [
                  { name: 'justify', type: 'select', values: propValues.justify },
               ],
               variables: []
            }} />
         <Panel style={{ marginBottom: 10 }}>
            <Flex container justify={justify}>
               {[0, 1, 2, 3].map(num => 
                  <Flex xs={12} sm={6} md={4} lg={3} xl={2} container item alignItems="center" justify="center"
                     style={{ ...boxStyle }} key={num}>{num}</Flex>
               )}
            </Flex>
         </Panel>
         <Settings
            onChange={{
               alignItems: setAlignItems,
            }}
            values={{ alignItems }}
            settingsData={{
               props: [
                  { name: 'alignItems', type: 'select', values: propValues.alignItems },
               ],
               variables: []
            }} />
         <Panel style={{ marginBottom: 10 }}>
            <Flex container alignItems={alignItems} style={{ height: 150 }}>
               {[0, 1, 2, 3, 4, 5].map(num => 
                  <Flex xs={12} sm={6} md={4} lg={3} xl={2} container item alignItems="center" justify="center"
                     style={{ ...boxStyle }} key={num}>{num}</Flex>
               )}
            </Flex>
         </Panel>
         <Settings
            onChange={{
               alignContent: setAlignContent,
            }}
            values={{ alignContent }}
            settingsData={{
               props: [
                  { name: 'alignContent', type: 'select', values: propValues.alignContent },
               ],
               variables: []
            }} />
         <Panel style={{ marginBottom: 10 }}>
            <Flex alignContent={alignContent} wrap="wrap" container style={{ width: 850, height: 250 }}>
               {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => 
                  <Flex container item alignItems="center" justify="center"
                     style={{ ...boxStyle, width: 80 }} key={num}>{num}</Flex>
               )}
            </Flex>
         </Panel>
         <Settings
            onChange={{
               xs: setXs,
               sm: setSm,
               md: setMd,
               lg: setLg,
               xl: setXl,
               xxl: setXxl,
            }}
            values={{ xs, sm, md, lg, xl, xxl }}
            settingsData={{
               props: [
                  { name: 'xs', type: 'select', values: itemProps.size },
                  { name: 'sm', type: 'select', values: itemProps.size },
                  { name: 'md', type: 'select', values: itemProps.size },
                  { name: 'lg', type: 'select', values: itemProps.size },
                  { name: 'xl', type: 'select', values: itemProps.size },
                  { name: 'xxl', type: 'select', values: itemProps.size },
               ],
               variables: []
            }} />
         <Panel style={{ marginBottom: 10 }}>
            <Flex alignContent={alignContent} wrap="wrap" container>
               {[0, 1, 2, 3, 4, 5].map(num => 
                  <Flex xs={Number(xs)} sm={Number(sm)} md={Number(md)} lg={Number(lg)} xl={Number(xl)} xxl={Number(xxl)}
                     container item alignItems="center" justify="center"
                     style={{ ...boxStyle }} key={num}>{num}</Flex>
               )}
            </Flex>
         </Panel>
      </div>
   );
};

export default { name: 'Flex', component: Demo };