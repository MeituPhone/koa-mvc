const path = require('path');
const merge = require('webpack-merge');

module.exports = function config (NODE_ENV = 'development') {
    return merge({
        jquery: ['jquery'],
        ROUTER_MODE: 'hash',
    });
}
