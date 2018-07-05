import nunjucks from 'nunjucks';

function createEnv(path, opts) {
    let autoescape = opts.autoescape === undefined ? true : opts.autoescape;
    let noCache = opts.noCache || false;
    let watch = opts.watch || false;
    let throwOnUndefined = opts.throwOnUndefined || false;
    let env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(opts) {
    const PC_VIEWS = 'dist/pc/views';
    const MOBILE_VIEWS = 'dist/mobile/views';

    let PC_ENV = createEnv(PC_VIEWS, opts);
    let MOBILE_ENV = createEnv(MOBILE_VIEWS, opts);

    return async (ctx, next) => {
        const DEVICE_AGENT = ctx.request.headers['user-agent'].toLowerCase();
        const ENV = DEVICE_AGENT.match(/(iphone|ipod|ipad|android)/) ? MOBILE_ENV : PC_ENV;

        ctx.render = function (view, model) {
            ctx.response.body = ENV.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = 'text/html';
        };
        await next();
    };
}

export default templating;
