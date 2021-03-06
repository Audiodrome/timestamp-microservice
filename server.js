'use strict';

const Hapi = require('hapi');
// const Scooter = require('scooter');

const server = Hapi.server({
  host: '0.0.0.0',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, h) {
    return 'Hello World!';
  }
})

server.route({
  method: 'GET',
  path: '/api/timestamp/{date}',
  handler: function (request, h) {
    const unixTimestamp = { 'unix': Date.parse(request.params.date) };
    if (!unixTimestamp.unix) {
      unixTimestamp['natural'] = null;
    } else {
      unixTimestamp['natural'] = request.params.date;
    }
    return unixTimestamp;
  }
});

server.route({
  method: 'GET',
  path: '/api/whoami',
  handler: function (request, h) {
    const whoami = {
      'ipaddress': request.info.remoteAddress,
      'language': request.headers['accept-language'].split(',')[0],
      'software': request.headers['user-agent'],
    }
    console.log(request.plugins.scooter.toJSON());
    return whoami;
  }
});

server.route({
  method: 'GET',
  path: '/api/url-shortener/{url}',
  handler: function (request, h) {
    return 0;
  }
});

const init = async () => {
  await server.register({
    plugin: require('scooter'),
    options: {
      prettyPrint: false,
      logEvents: ['response']
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
// async function start() {
//   try {
//     await server.register(Scooter);
//     await server.start();
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
//   console.log('Server running at:', server.info.uri);
// };

// start();
