/*! iCheck v1.0.2 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */

(function (f) {
    function A(a, b, d) {
        var c = a[0], g = /er/.test(d) ? _indeterminate : /bl/.test(d) ? n : k, e = d == _update ? {
            checked: c[k],
            disabled: c[n],
            indeterminate: "true" == a.attr(_indeterminate) || "false" == a.attr(_determinate)
        } : c[g];
        if (/^(ch|di|in)/.test(d) && !e)x(a, g); else if (/^(un|en|de)/.test(d) && e)q(a, g); else if (d == _update)for (var f in e)e[f] ? x(a, f, !0) : q(a, f, !0); else if (!b || "toggle" == d) {
            if (!b)a[_callback]("ifClicked");
            e ? c[_type] !== r && q(a, g) : x(a, g)
        }
    }

    function x(a, b, d) {
        var c = a[0], g = a.parent(), e = b == k, u = b == _indeterminate,
            v = b == n, s = u ? _determinate : e ? y : "enabled", F = l(a, s + t(c[_type])), B = l(a, b + t(c[_type]));
        if (!0 !== c[b]) {
            if (!d && b == k && c[_type] == r && c.name) {
                var w = a.closest("form"), p = 'input[name="' + c.name + '"]', p = w.length ? w.find(p) : f(p);
                p.each(function () {
                    this !== c && f(this).data(m) && q(f(this), b)
                })
            }
            u ? (c[b] = !0, c[k] && q(a, k, "force")) : (d || (c[b] = !0), e && c[_indeterminate] && q(a, _indeterminate, !1));
            D(a, e, b, d)
        }
        c[n] && l(a, _cursor, !0) && g.find("." + C).css(_cursor, "default");
        g[_add](B || l(a, b) || "");
        g.attr("role") && !u && g.attr("aria-" + (v ? n : k), "true");
        g[_remove](F || l(a, s) || "")
    }

    function q(a, b, d) {
        var c = a[0], g = a.parent(), e = b == k, f = b == _indeterminate, m = b == n, s = f ? _determinate : e ? y : "enabled", q = l(a, s + t(c[_type])), r = l(a, b + t(c[_type]));
        if (!1 !== c[b]) {
            if (f || !d || "force" == d)c[b] = !1;
            D(a, e, s, d)
        }
        !c[n] && l(a, _cursor, !0) && g.find("." + C).css(_cursor, "pointer");
        g[_remove](r || l(a, b) || "");
        g.attr("role") && !f && g.attr("aria-" + (m ? n : k), "false");
        g[_add](q || l(a, s) || "")
    }

    function E(a, b) {
        if (a.data(m)) {
            a.parent().html(a.attr("style", a.data(m).s || ""));
            if (b)a[_callback](b);
            a.off(".i").unwrap();
            f(_label + '[for="' + a[0].id + '"]').add(a.closest(_label)).off(".i")
        }
    }

    function l(a, b, f) {
        if (a.data(m))return a.data(m).o[b + (f ? "" : "Class")]
    }

    function t(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    }

    function D(a, b, f, c) {
        if (!c) {
            if (b)a[_callback]("ifToggled");
            a[_callback]("ifChanged")[_callback]("if" + t(f))
        }
    }

    var m = "iCheck", C = m + "-helper", r = "radio", k = "checked", y = "un" + k, n = "disabled";
    _determinate = "determinate";
    _indeterminate = "in" + _determinate;
    _update = "update";
    _type = "type";
    _click = "click";
    _touch = "touchbegin.i touchend.i";
    _add = "addClass";
    _remove = "removeClass";
    _callback = "trigger";
    _label = "label";
    _cursor = "cursor";
    _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
    f.fn[m] = function (a, b) {
        var d = 'input[type="checkbox"], input[type="' + r + '"]', c = f(), g = function (a) {
            a.each(function () {
                var a = f(this);
                c = a.is(d) ? c.add(a) : c.add(a.find(d))
            })
        };
        if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a))return a = a.toLowerCase(), g(this), c.each(function () {
            var c =
                f(this);
            "destroy" == a ? E(c, "ifDestroyed") : A(c, !0, a);
            f.isFunction(b) && b()
        });
        if ("object" != typeof a && a)return this;
        var e = f.extend({
            checkedClass: k,
            disabledClass: n,
            indeterminateClass: _indeterminate,
            labelHover: !0
        }, a), l = e.handle, v = e.hoverClass || "hover", s = e.focusClass || "focus", t = e.activeClass || "active", B = !!e.labelHover, w = e.labelHoverClass || "hover", p = ("" + e.increaseArea).replace("%", "") | 0;
        if ("checkbox" == l || l == r)d = 'input[type="' + l + '"]';
        -50 > p && (p = -50);
        g(this);
        return c.each(function () {
            var a = f(this);
            E(a);
            var c = this,
                b = c.id, g = -p + "%", d = 100 + 2 * p + "%", d = {
                    position: "absolute",
                    top: g,
                    left: g,
                    display: "block",
                    width: d,
                    height: d,
                    margin: 0,
                    padding: 0,
                    background: "#fff",
                    border: 0,
                    opacity: 0
                }, g = _mobile ? {position: "absolute", visibility: "hidden"} : p ? d : {
                    position: "absolute",
                    opacity: 0
                }, l = "checkbox" == c[_type] ? e.checkboxClass || "icheckbox" : e.radioClass || "i" + r, z = f(_label + '[for="' + b + '"]').add(a.closest(_label)), u = !!e.aria, y = m + "-" + Math.random().toString(36).substr(2, 6), h = '<div class="' + l + '" ' + (u ? 'role="' + c[_type] + '" ' : "");
            u && z.each(function () {
                h +=
                    'aria-labelledby="';
                this.id ? h += this.id : (this.id = y, h += y);
                h += '"'
            });
            h = a.wrap(h + "/>")[_callback]("ifCreated").parent().append(e.insert);
            d = f('<ins class="' + C + '"/>').css(d).appendTo(h);
            a.data(m, {o: e, s: a.attr("style")}).css(g);
            e.inheritClass && h[_add](c.className || "");
            e.inheritID && b && h.attr("id", m + "-" + b);
            "static" == h.css("position") && h.css("position", "relative");
            A(a, !0, _update);
            if (z.length)z.on(_click + ".i mouseover.i mouseout.i " + _touch, function (b) {
                var d = b[_type], e = f(this);
                if (!c[n]) {
                    if (d == _click) {
                        if (f(b.target).is("a"))return;
                        A(a, !1, !0)
                    } else B && (/ut|nd/.test(d) ? (h[_remove](v), e[_remove](w)) : (h[_add](v), e[_add](w)));
                    if (_mobile)b.stopPropagation(); else return !1
                }
            });
            a.on(_click + ".i focus.i blur.i keyup.i keydown.i keypress.i", function (b) {
                var d = b[_type];
                b = b.keyCode;
                if (d == _click)return !1;
                if ("keydown" == d && 32 == b)return c[_type] == r && c[k] || (c[k] ? q(a, k) : x(a, k)), !1;
                if ("keyup" == d && c[_type] == r)!c[k] && x(a, k); else if (/us|ur/.test(d))h["blur" == d ? _remove : _add](s)
            });
            d.on(_click + " mousedown mouseup mouseover mouseout " + _touch, function (b) {
                var d =
                    b[_type], e = /wn|up/.test(d) ? t : v;
                if (!c[n]) {
                    if (d == _click)A(a, !1, !0); else {
                        if (/wn|er|in/.test(d))h[_add](e); else h[_remove](e + " " + t);
                        if (z.length && B && e == v)z[/ut|nd/.test(d) ? _remove : _add](w)
                    }
                    if (_mobile)b.stopPropagation(); else return !1
                }
            })
        })
    }
})(window.jQuery || window.Zepto);
