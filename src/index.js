import io from 'socket.io-client';
import { EventEmitter } from 'events';

class SocketsEmitter extends EventEmitter {}

function createAnalyticsSDK () {
  const privateMethods = {};
  const publicMethods = {};

  let options = {
    reconnection: true
  };

  let readyList = [];
  let readyFired = false;
  let socket;

  privateMethods.triggerReady = () => {
    if (!readyFired) {
      readyFired = true;
    }

    readyList.forEach(fn => fn());
    readyList = [];
  };

  publicMethods.events = new SocketsEmitter();

  publicMethods.config = (opts = {}) => {
    if (!opts.url) {
      throw new Error('Analytics url is required');
    }

    options = Object.assign(options, opts);

    return publicMethods;
  };

  publicMethods.install = () => {
    socket = io(options.url, {
      reconnection: options.reconnection
    });

    socket.on('connect', () => {
      privateMethods.triggerReady();

      socket.on('connected-admin-user', user => {
        publicMethods.events.emit('connected-admin-user', user);
      });
    });

    return publicMethods;
  };

  publicMethods.ready = (fn) => {
    if (readyFired) {
      setTimeout(() => fn(), 0);
    } else {
      readyList.push(fn);
    }

    return publicMethods;
  };

  publicMethods.sendAdminUser = (user = {}) => {
    socket.emit('connect-admin-user', user);

    return publicMethods;
  };

  return publicMethods;
}

export default createAnalyticsSDK();
