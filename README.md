# analytics-client

## Install

```bash
npm i dhhb/analytics-client --save
```

## Usage

```js
import analytics from 'analytics-client';

// connect to analytics server
analytics
  .config({url: 'http://analytics.server.com'})
  .install();

// start to send events
analytics.syncAdminUser({
  id: '12345',
  email: 'test@example.org'
});
```

---
