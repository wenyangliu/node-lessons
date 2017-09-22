/**
 * Created by gyt-John on 2017/2/24.
 */
res.render = function render(view, options, callback) {
    var app = this.req.app;
    var opts = options || {};

    opts._locals = self.locals;

    app.render(view, opts, done);
};