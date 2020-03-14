import React, { useState } from 'react';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Settings from './Settings';

const Demo = () => {
    const [hoverable, setHoverable] = useState(true),
        [rounded, setRounded] = useState(true),
        [padding, setPadding] = useState(false),
        [shadow, setShadow] = useState(true),
        [activeItemId, setActiveItemId] = useState(null);

    return (
        <div>
            <Settings
                onChange={{
                    hoverable: setHoverable,
                    rounded: setRounded,
                    padding: setPadding,
                    shadow: setShadow
                }}
                values={{ hoverable, rounded, padding, shadow }}
                settingsData={{
                    props: [
                        { name: 'hoverable', type: 'bool' },
                        { name: 'rounded', type: 'bool' },
                        { name: 'padding', type: 'bool' },
                        { name: 'shadow', type: 'bool' },
                    ],
                    variables: []
                }} />
            <List style={{ width: 150 }} shadow={shadow} hoverable={hoverable} rounded={rounded} padding={padding} onSelect={setActiveItemId}
                activeItemId={activeItemId} >
                {['München', 'Nürnberg', 'Augsburg', 'Regensburg', 'Ingolstadt', 'Würzburg', 'Fürth', 'Erlangen'].map(v =>
                    <ListItem disabled={v === 'Ingolstadt'} itemId={v} key={v} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {v}
                    </ListItem>
                )}
            </List>
        </div>
    );
};

export default { name: 'List', component: Demo };
