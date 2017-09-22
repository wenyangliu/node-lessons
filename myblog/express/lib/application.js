/**
 * Created by gyt-John on 2017/2/24.
 */
app.render = function render(name, options, callback) {
    var opts = options;
    var renderOptions = {};

    merge(renderOptions, this.locals);

    if (opts._locals) {
        merge(renderOptions, opts._locals);
    }

    merge(renderOptions, opts);

    tryRender(view, renderOptions, done);
};