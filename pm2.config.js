
module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'node-sql-over-http',
      script    : 'server.js',
      watch     : true,
      env: {
          DB_HOST : 'localhost',
          DB_USER : 'root',
          DB_PASS : '',
          DB_SCHEMA:  'letterbox',
          NODE_ENV: "development",
          PORT : 3000
      },
      env_production : {
        NODE_ENV: 'production',
        APP_CONTEXT_PATH: '/lb'
      }
    },
  ]
};
