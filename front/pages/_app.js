import React from 'react';
import Head from 'next/Head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga';

import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';

const NodeBird = ({ Component, store, pageProps }) =>{
    
    return(
        <Provider store={store}>
            <Head>
                <title>NodeBird1</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout>
             <Component {...pageProps} />
            </AppLayout>
        </Provider>
        
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType,
    store : PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};

NodeBird.getInitialProps = async (context) => {
    console.log(context);
    const {ctx, Component } = context;
    let pageProps = {};
    if(Component.getInitialProps){   
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};
 
export default withRedux((initailState, options)=>{
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares),)
        : compose(
            applyMiddleware(...middlewares), 
            typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
        );
    const store = createStore(reducer, initailState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
})(NodeBird);