# analytics-js-sdk

## Install

```bash
npm i dhhb/analytics-js-sdk --save
```

## Usage

```js
import robAnalyticsSDK from 'analytics-js-sdk';

// connect to analytics server
robAnalyticsSDK
  .config({url: 'http://analytics.server.com'})
  .install();

// start to send events
robAnalyticsSDK.syncAdminUser({
  id: '12345',
  email: 'test@example.org'
});
```

---
