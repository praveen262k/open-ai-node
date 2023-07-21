const deps = require('../package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
const { NodeFederationPlugin, StreamingTargetPlugin } = require('@module-federation/node');

module.exports = {
  client: new ModuleFederationPlugin({
    name: 'shell',
    filename: 'container.js',
    remotes: {
      remote1: 'remote1@http://localhost:3012/client/remoteEntry.js',
      remote2: 'remote2@http://localhost:3011/client/remoteEntry.js',
    },
    shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
  },{
    name: 'shell',
    filename: 'container.js',
    remotes: {
      remote2: 'remote2@http://localhost:3011/client/remoteEntry.js',
    },
    shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
  }),
  server: [
    new NodeFederationPlugin({
      name: 'shell',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {
        remote1: 'remote1@http://localhost:3012/server/remoteEntry.js',
        remote2: 'remote2@http://localhost:3011/server/remoteEntry.js',
      },
      shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
    },{
      name: 'shell',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {
        remote2: 'remote2@http://localhost:3011/server/remoteEntry.js',
      },
      shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
    }),
    new StreamingTargetPlugin({
      name: 'shell',
      library: { type: 'commonjs-module' },
      remotes: {
        remote1: 'remote1@http://localhost:3012/server/remoteEntry.js',
        remote2: 'remote2@http://localhost:3011/server/remoteEntry.js',
      },
    },{
      name: 'shell',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {
        remote2: 'remote2@http://localhost:3011/server/remoteEntry.js',
      },
      shared: [{ react: deps.react, 'react-dom': deps['react-dom'] }],
    }),
  ],
};
