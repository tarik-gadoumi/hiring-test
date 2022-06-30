/* @flow */

import * as React from 'react';
import Search from './Search';
import List from './List';

export default () => (
    <section style={{ marginTop: '300px', minHeight: '100vh' }}>
        <List />
        <Search />
    </section>
);
