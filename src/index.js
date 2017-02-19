import io from 'socket.io-client';

function createAnalyticsSDK () {
  const privateMethods = {};
  const publicMethods = {};

  let options = {}; // no defaults
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

  publicMethods.config = (opts = {}) => {
    if (!opts.url) {
      throw new Error('Analytics url is required');
    }

    options = Object.assign(options, opts);

    return publicMethods;
  };

  publicMethods.install = () => {
    socket = io(options.url);

    socket.on('connect', () => {
      privateMethods.triggerReady();
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
    socket.emit('admin-user', user);

    return publicMethods;
  };

  return publicMethods;
}

export default createAnalyticsSDK();
