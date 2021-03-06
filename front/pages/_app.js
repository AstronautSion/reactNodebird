import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import Helmet from 'react-helmet';
import App, { Container } from 'next/app';

import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';

// class NodeBird extends App {
//   static getInitialProps(context) {
//
//   }
//   render() {
//
//   }
// }

const NodeBird = ({ Component, store, pageProps }) => {
  return (
    <Container>
      <Provider store={store}>
        <Helmet
          title="NodeBird"
          htmlAttributes={{ lang: 'ko' }}
          meta={[{
            charset: 'UTF-8',
          }, {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
          }, {
            'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
          }, {
            name: 'description', content: 'NodeBird SNS',
          }, {
            name: 'og:title', content: 'NodeBird',
          }, {
            name: 'og:description', content: 'NodeBird SNS',
          }, {
            property: 'og:type', content: 'website',
          },{
            name: 'msapplication-TileColor', content: '#ffffff',
          },{
            name: 'msapplication-TileImage', content: '/ms-icon-144x144.png',
          },{
            name: 'theme-color', content: '#ffffff',
          }]}
          link={[{
            rel: 'shortcut icon', href: '/favicon.ico',
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
          },{
            rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png',
          },{
            rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png',
          },{
            rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png',
          },{
            rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png',
          },{
            rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png',
          },{
            rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png',
          },{
            rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png',
          },{
            rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png',
          },{
            rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png',
          },{
            rel: 'icon', type: 'image/png', sizes: '192x192',  href: '/android-icon-192x192.png',
          },{
            rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png',
          },{
            rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png',
          },{
            rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png',
          },{
            rel: 'manifest', href: '/manifest.json',
          }]}
        />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    </Container>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

NodeBird.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx) || {};
  }
  return { pageProps };
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));
