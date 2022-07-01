/* @flow */

import * as React from 'react';
import Search from './Search';
import List from './List';

export default () => (
    <section style={{ minHeight: '100vh' }}>
        <Search style={{isolation: 'isolate',zIndex: 9999}} />
        <List  style={{isolation: 'isolate'}} />
    </section>
);
