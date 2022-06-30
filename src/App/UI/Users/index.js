/* @flow */

import * as React from 'react';
import Search from './Search';
import List from './List';

export default () => (
    <section style={{  minHeight: '100vh' }}>
        <List />
        <Search />
    </section>
);
