/**
 * Created by zj-db0666 on 2018/6/7.
 */
import 'resources_css/base/dialog.scss';
export default {
    defaults: {
        content: '',
        ok: true,
        okLabel: '确定',
        cancel: true,
        cancelLabel: '取消'
    },
    ok: null,
    cancel: null,
    options: {},
    _render (options) {
        let html = `<div class="dialog-mask show">
            <div class="dialog-wrapper show">
                <div class="dialog-content">${this.options.content}</div>
                <div class="dialog-footer">
                    <a href="javascript:;" class="dialog-cancel">取消</a>
                    <a href="javascript:;" class="dialog-confirm">确认</a>
                </div>
            </div>
        </div>`;

        $('body').append(html);
        this._bindEvent();
    },
    _close () {
        this._unbindEvent();
        $('.dialog-mask').remove();
    },
    _ok () {
        if (this.ok) {
            this.ok(this._close.bind(this));
        } else {
            this._close();
        }
    },
    _cancel () {
        if (this.cancel) {
            this.cancel(this._close.bind(this));
        } else {
            this._close();
        }
    },
    _bindEvent () {
        $('.dialog-cancel').bind('click', this._cancel.bind(this));
        $('.dialog-confirm').bind('click', this._ok.bind(this));
    },
    _unbindEvent () {
        $('.dialog-cancel').unbind('click', this._cancel.bind(this));
        $('.dialog-confirm').unbind('click', this._ok.bind(this));
    },
    dialog ({options, cancel, ok}) {
        $.extend(this.options, this.defaults, options);
        this.ok = ok;
        this.cancel = cancel;
        this._render();
    },
    confirm ({options, cancel, ok}) {
        $.extend(this.options, this.defaults, options);
        this.ok = ok;
        this.cancel = cancel;
        this._render();
    }
};
