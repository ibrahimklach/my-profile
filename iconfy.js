/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt or license.gpl.txt
* files at https://github.com/iconify/iconify
*
* Licensed under Apache 2.0 or GPL 2.0 at your option.
* If derivative product is not compatible with one of licenses, you can pick one of licenses.
*
* @license Apache 2.0
* @license GPL 2.0
* @version 2.1.0
*/
var Iconify = function(e) {
    "use strict";
    var n = /^[a-z0-9]+(-[a-z0-9]+)*$/
      , r = Object.freeze({
        left: 0,
        top: 0,
        width: 16,
        height: 16,
        rotate: 0,
        vFlip: !1,
        hFlip: !1
    });
    function t(e) {
        return Object.assign({}, r, e)
    }
    function i(e, n, i) {
        void 0 === i && (i = !1);
        var o = function n(t, i) {
            var o, a, c, f;
            if (void 0 !== e.icons[t])
                return Object.assign({}, e.icons[t]);
            if (i > 5)
                return null;
            if (void 0 !== (null == (o = e.aliases) ? void 0 : o[t])) {
                var u = null == (a = e.aliases) ? void 0 : a[t]
                  , s = n(u.parent, i + 1);
                return s ? function(e, n) {
                    var t = Object.assign({}, e);
                    for (var i in r) {
                        var o = i;
                        if (void 0 !== n[o]) {
                            var a = n[o];
                            if (void 0 === t[o]) {
                                t[o] = a;
                                continue
                            }
                            switch (o) {
                            case "rotate":
                                t[o] = (t[o] + a) % 4;
                                break;
                            case "hFlip":
                            case "vFlip":
                                t[o] = a !== t[o];
                                break;
                            default:
                                t[o] = a
                            }
                        }
                    }
                    return t
                }(s, u) : s
            }
            return 0 === i && void 0 !== (null == (c = e.chars) ? void 0 : c[t]) ? n(null == (f = e.chars) ? void 0 : f[t], i + 1) : null
        }(n, 0);
        if (o)
            for (var a in r)
                void 0 === o[a] && void 0 !== e[a] && (o[a] = e[a]);
        return o && i ? t(o) : o
    }
    var o = /^[a-f0-9]+(-[a-f0-9]+)*$/;
    function a(e, n) {
        for (var r in e) {
            var t = r
              , i = typeof e[t];
            if ("undefined" !== i)
                switch (r) {
                case "body":
                case "parent":
                    if ("string" !== i)
                        return r;
                    break;
                case "hFlip":
                case "vFlip":
                case "hidden":
                    if ("boolean" !== i) {
                        if (!n)
                            return r;
                        delete e[t]
                    }
                    break;
                case "width":
                case "height":
                case "left":
                case "top":
                case "rotate":
                case "inlineHeight":
                case "inlineTop":
                case "verticalAlign":
                    if ("number" !== i) {
                        if (!n)
                            return r;
                        delete e[t]
                    }
                    break;
                default:
                    if ("object" === i) {
                        if (!n)
                            return r;
                        delete e[t]
                    }
                }
            else
                delete e[t]
        }
        return null
    }
    function c(e, t, c) {
        c = c || {};
        var f = [];
        if ("object" != typeof e || "object" != typeof e.icons)
            return f;
        var u = c.validate;
        if (!1 !== u)
            try {
                !function(e, t) {
                    var i = !!(null == t ? void 0 : t.fix);
                    if ("object" != typeof e || null === e || "object" != typeof e.icons || !e.icons)
                        throw new Error("Bad icon set");
                    var c = e;
                    if ("string" == typeof (null == t ? void 0 : t.prefix))
                        c.prefix = t.prefix;
                    else if ("string" != typeof c.prefix || !c.prefix.match(n))
                        throw new Error("Invalid prefix");
                    if ("string" == typeof (null == t ? void 0 : t.provider))
                        c.provider = t.provider;
                    else if (void 0 !== c.provider) {
                        var f = c.provider;
                        if ("string" != typeof f || "" !== f && !f.match(n)) {
                            if (!i)
                                throw new Error("Invalid provider");
                            delete c.provider
                        }
                    }
                    var u = c.icons;
                    if (Object.keys(u).forEach((function(e) {
                        if (!e.match(n)) {
                            if (i)
                                return void delete u[e];
                            throw new Error('Invalid icon name: "' + e + '"')
                        }
                        var r = u[e];
                        if ("object" != typeof r || null === r || "string" != typeof r.body) {
                            if (i)
                                return void delete u[e];
                            throw new Error('Invalid icon: "' + e + '"')
                        }
                        var t = "string" == typeof r.parent ? "parent" : a(r, i);
                        if (null !== t) {
                            if (i)
                                return void delete u[e];
                            throw new Error('Invalid property "' + t + '" in icon "' + e + '"')
                        }
                    }
                    )),
                    !Object.keys(c.icons).length)
                        throw new Error("Icon set is empty");
                    if (void 0 !== c.aliases && ("object" != typeof c.aliases || null === c.aliases)) {
                        if (!i)
                            throw new Error("Invalid aliases list");
                        delete c.aliases
                    }
                    if ("object" == typeof c.aliases) {
                        var s = function(e, r) {
                            if (d.has(e))
                                return !v.has(e);
                            var t = l[e];
                            if (r > 5 || "object" != typeof t || null === t || "string" != typeof t.parent || !e.match(n)) {
                                if (i)
                                    return delete l[e],
                                    v.add(e),
                                    !1;
                                throw new Error('Invalid icon alias: "' + e + '"')
                            }
                            var o = t.parent;
                            if (void 0 === c.icons[o] && (void 0 === l[o] || !s(o, r + 1))) {
                                if (i)
                                    return delete l[e],
                                    v.add(e),
                                    !1;
                                throw new Error('Missing parent icon for alias "' + e)
                            }
                            i && void 0 !== t.body && delete t.body;
                            var f = void 0 !== t.body ? "body" : a(t, i);
                            if (null !== f) {
                                if (i)
                                    return delete l[e],
                                    v.add(e),
                                    !1;
                                throw new Error('Invalid property "' + f + '" in alias "' + e + '"')
                            }
                            return d.add(e),
                            !0
                        }
                          , l = c.aliases
                          , d = new Set
                          , v = new Set;
                        Object.keys(l).forEach((function(e) {
                            s(e, 0)
                        }
                        )),
                        i && !Object.keys(c.aliases).length && delete c.aliases
                    }
                    if (Object.keys(r).forEach((function(e) {
                        var n = typeof r[e]
                          , t = typeof c[e];
                        if ("undefined" !== t && t !== n)
                            throw new Error('Invalid value type for "' + e + '"')
                    }
                    )),
                    void 0 !== c.chars && ("object" != typeof c.chars || null === c.chars)) {
                        if (!i)
                            throw new Error("Invalid characters map");
                        delete c.chars
                    }
                    if ("object" == typeof c.chars) {
                        var p = c.chars;
                        Object.keys(p).forEach((function(e) {
                            var n;
                            if (!e.match(o) || "string" != typeof p[e]) {
                                if (i)
                                    return void delete p[e];
                                throw new Error('Invalid character "' + e + '"')
                            }
                            var r = p[e];
                            if (void 0 === c.icons[r] && void 0 === (null == (n = c.aliases) ? void 0 : n[r])) {
                                if (i)
                                    return void delete p[e];
                                throw new Error('Character "' + e + '" points to missing icon "' + r + '"')
                            }
                        }
                        )),
                        i && !Object.keys(c.chars).length && delete c.chars
                    }
                }(e, "object" == typeof u ? u : {
                    fix: !0
                })
            } catch (e) {
                return f
            }
        e.not_found instanceof Array && e.not_found.forEach((function(e) {
            t(e, null),
            f.push(e)
        }
        ));
        var s = e.icons;
        Object.keys(s).forEach((function(n) {
            var r = i(e, n, !0);
            r && (t(n, r),
            f.push(n))
        }
        ));
        var l = c.aliases || "all";
        if ("none" !== l && "object" == typeof e.aliases) {
            var d = e.aliases;
            Object.keys(d).forEach((function(n) {
                if ("variations" !== l || !function(e) {
                    for (var n in r)
                        if (void 0 !== e[n])
                            return !0;
                    return !1
                }(d[n])) {
                    var o = i(e, n, !0);
                    o && (t(n, o),
                    f.push(n))
                }
            }
            ))
        }
        return f
    }
    var f = function(e, n, r, t) {
        void 0 === t && (t = "");
        var i = e.split(":");
        if ("@" === e.slice(0, 1)) {
            if (i.length < 2 || i.length > 3)
                return null;
            t = i.shift().slice(1)
        }
        if (i.length > 3 || !i.length)
            return null;
        if (i.length > 1) {
            var o = i.pop()
              , a = i.pop()
              , c = {
                provider: i.length > 0 ? i[0] : t,
                prefix: a,
                name: o
            };
            return n && !u(c) ? null : c
        }
        var f = i[0]
          , s = f.split("-");
        if (s.length > 1) {
            var l = {
                provider: t,
                prefix: s.shift(),
                name: s.join("-")
            };
            return n && !u(l) ? null : l
        }
        if (r && "" === t) {
            var d = {
                provider: t,
                prefix: "",
                name: f
            };
            return n && !u(d, r) ? null : d
        }
        return null
    }
      , u = function(e, r) {
        return !!e && !("" !== e.provider && !e.provider.match(n) || !(r && "" === e.prefix || e.prefix.match(n)) || !e.name.match(n))
    }
      , s = Object.create(null);
    function l(e, n) {
        void 0 === s[e] && (s[e] = Object.create(null));
        var r = s[e];
        return void 0 === r[n] && (r[n] = function(e, n) {
            return {
                provider: e,
                prefix: n,
                icons: Object.create(null),
                missing: Object.create(null)
            }
        }(e, n)),
        r[n]
    }
    function d(e, n) {
        var r = Date.now();
        return c(n, (function(n, t) {
            t ? e.icons[n] = t : e.missing[n] = r
        }
        ))
    }
    function v(e, n) {
        var r = e.icons[n];
        return void 0 === r ? null : r
    }
    function p(e, n) {
        var r = [];
        return ("string" == typeof e ? [e] : Object.keys(s)).forEach((function(e) {
            ("string" == typeof e && "string" == typeof n ? [n] : void 0 === s[e] ? [] : Object.keys(s[e])).forEach((function(n) {
                var t = l(e, n)
                  , i = Object.keys(t.icons).map((function(r) {
                    return ("" !== e ? "@" + e + ":" : "") + n + ":" + r
                }
                ));
                r = r.concat(i)
            }
            ))
        }
        )),
        r
    }
    var h = !1;
    function g(e) {
        var n = "string" == typeof e ? f(e, !0, h) : e;
        return n ? v(l(n.provider, n.prefix), n.name) : null
    }
    function y(e, n) {
        var r = f(e, !0, h);
        return !!r && function(e, n, r) {
            try {
                if ("string" == typeof r.body)
                    return e.icons[n] = Object.freeze(t(r)),
                    !0
            } catch (e) {}
            return !1
        }(l(r.provider, r.prefix), r.name, n)
    }
    function b(e, n) {
        if ("object" != typeof e)
            return !1;
        if ("string" != typeof n && (n = "string" == typeof e.provider ? e.provider : ""),
        h && "" === n && ("string" != typeof e.prefix || "" === e.prefix)) {
            var r = !1;
            return c(e, (function(e, n) {
                n && y(e, n) && (r = !0)
            }
            ), {
                validate: {
                    fix: !0,
                    prefix: ""
                }
            }),
            r
        }
        return !("string" != typeof e.prefix || !u({
            provider: n,
            prefix: e.prefix,
            name: "a"
        })) && !!d(l(n, e.prefix), e)
    }
    function m(e) {
        return null !== g(e)
    }
    function w(e) {
        var n = g(e);
        return n ? Object.assign({}, n) : null
    }
    var x = Object.freeze({
        inline: !1,
        width: null,
        height: null,
        hAlign: "center",
        vAlign: "middle",
        slice: !1,
        hFlip: !1,
        vFlip: !1,
        rotate: 0
    });
    function j(e, n) {
        var r = {};
        for (var t in e) {
            var i = t;
            if (r[i] = e[i],
            void 0 !== n[i]) {
                var o = n[i];
                switch (i) {
                case "inline":
                case "slice":
                    "boolean" == typeof o && (r[i] = o);
                    break;
                case "hFlip":
                case "vFlip":
                    !0 === o && (r[i] = !r[i]);
                    break;
                case "hAlign":
                case "vAlign":
                    "string" == typeof o && "" !== o && (r[i] = o);
                    break;
                case "width":
                case "height":
                    ("string" == typeof o && "" !== o || "number" == typeof o && o || null === o) && (r[i] = o);
                    break;
                case "rotate":
                    "number" == typeof o && (r[i] += o)
                }
            }
        }
        return r
    }
    var O = /(-?[0-9.]*[0-9]+[0-9.]*)/g
      , E = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
    function I(e, n, r) {
        if (1 === n)
            return e;
        if (r = void 0 === r ? 100 : r,
        "number" == typeof e)
            return Math.ceil(e * n * r) / r;
        if ("string" != typeof e)
            return e;
        var t = e.split(O);
        if (null === t || !t.length)
            return e;
        for (var i = [], o = t.shift(), a = E.test(o); ; ) {
            if (a) {
                var c = parseFloat(o);
                isNaN(c) ? i.push(o) : i.push(Math.ceil(c * n * r) / r)
            } else
                i.push(o);
            if (void 0 === (o = t.shift()))
                return i.join("");
            a = !a
        }
    }
    function k(e) {
        var n = "";
        switch (e.hAlign) {
        case "left":
            n += "xMin";
            break;
        case "right":
            n += "xMax";
            break;
        default:
            n += "xMid"
        }
        switch (e.vAlign) {
        case "top":
            n += "YMin";
            break;
        case "bottom":
            n += "YMax";
            break;
        default:
            n += "YMid"
        }
        return n += e.slice ? " slice" : " meet"
    }
    function A(e, n) {
        var r, t, i = {
            left: e.left,
            top: e.top,
            width: e.width,
            height: e.height
        }, o = e.body;
        [e, n].forEach((function(e) {
            var n, r = [], t = e.hFlip, a = e.vFlip, c = e.rotate;
            switch (t ? a ? c += 2 : (r.push("translate(" + (i.width + i.left) + " " + (0 - i.top) + ")"),
            r.push("scale(-1 1)"),
            i.top = i.left = 0) : a && (r.push("translate(" + (0 - i.left) + " " + (i.height + i.top) + ")"),
            r.push("scale(1 -1)"),
            i.top = i.left = 0),
            c < 0 && (c -= 4 * Math.floor(c / 4)),
            c %= 4) {
            case 1:
                n = i.height / 2 + i.top,
                r.unshift("rotate(90 " + n + " " + n + ")");
                break;
            case 2:
                r.unshift("rotate(180 " + (i.width / 2 + i.left) + " " + (i.height / 2 + i.top) + ")");
                break;
            case 3:
                n = i.width / 2 + i.left,
                r.unshift("rotate(-90 " + n + " " + n + ")")
            }
            c % 2 == 1 && (0 === i.left && 0 === i.top || (n = i.left,
            i.left = i.top,
            i.top = n),
            i.width !== i.height && (n = i.width,
            i.width = i.height,
            i.height = n)),
            r.length && (o = '<g transform="' + r.join(" ") + '">' + o + "</g>")
        }
        )),
        null === n.width && null === n.height ? r = I(t = "1em", i.width / i.height) : null !== n.width && null !== n.height ? (r = n.width,
        t = n.height) : null !== n.height ? r = I(t = n.height, i.width / i.height) : t = I(r = n.width, i.height / i.width),
        "auto" === r && (r = i.width),
        "auto" === t && (t = i.height);
        var a = {
            attributes: {
                width: r = "string" == typeof r ? r : r + "",
                height: t = "string" == typeof t ? t : t + "",
                preserveAspectRatio: k(n),
                viewBox: i.left + " " + i.top + " " + i.width + " " + i.height
            },
            body: o
        };
        return n.inline && (a.inline = !0),
        a
    }
    function M(e, n) {
        return A(t(e), n ? j(x, n) : x)
    }
    var S = /\sid="(\S+)"/g
      , T = "IconifyId-" + Date.now().toString(16) + "-" + (16777216 * Math.random() | 0).toString(16) + "-"
      , C = 0;
    function F(e, n) {
        void 0 === n && (n = T);
        for (var r, t = []; r = S.exec(e); )
            t.push(r[1]);
        return t.length ? (t.forEach((function(r) {
            var t = "function" == typeof n ? n(r) : n + C++
              , i = r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            e = e.replace(new RegExp('([#;"])(' + i + ')([")]|\\.[a-z])',"g"), "$1" + t + "$3")
        }
        )),
        e) : e
    }
    var P = "iconify2"
      , L = "iconify"
      , D = "iconify-count"
      , N = "iconify-version"
      , R = 36e5
      , U = {
        local: !0,
        session: !0
    }
      , z = !1
      , q = {
        local: 0,
        session: 0
    }
      , _ = {
        local: [],
        session: []
    }
      , $ = "undefined" == typeof window ? {} : window;
    function H(e) {
        var n = e + "Storage";
        try {
            if ($ && $[n] && "number" == typeof $[n].length)
                return $[n]
        } catch (e) {}
        return U[e] = !1,
        null
    }
    function V(e, n, r) {
        try {
            return e.setItem(D, r + ""),
            q[n] = r,
            !0
        } catch (e) {
            return !1
        }
    }
    function J(e) {
        var n = e.getItem(D);
        if (n) {
            var r = parseInt(n);
            return r || 0
        }
        return 0
    }
    var Y = function() {
        if (!z) {
            z = !0;
            var e = Math.floor(Date.now() / R) - 168;
            for (var n in U)
                r(n)
        }
        function r(n) {
            var r = H(n);
            if (r) {
                var t = function(n) {
                    var t = L + n
                      , i = r.getItem(t);
                    if ("string" != typeof i)
                        return !1;
                    var o = !0;
                    try {
                        var a = JSON.parse(i);
                        if ("object" != typeof a || "number" != typeof a.cached || a.cached < e || "string" != typeof a.provider || "object" != typeof a.data || "string" != typeof a.data.prefix)
                            o = !1;
                        else
                            o = d(l(a.provider, a.data.prefix), a.data).length > 0
                    } catch (e) {
                        o = !1
                    }
                    return o || r.removeItem(t),
                    o
                };
                try {
                    var i = r.getItem(N);
                    if (i !== P)
                        return i && function(e) {
                            try {
                                for (var n = J(e), r = 0; r < n; r++)
                                    e.removeItem(L + r)
                            } catch (e) {}
                        }(r),
                        void function(e, n) {
                            try {
                                e.setItem(N, P)
                            } catch (e) {}
                            V(e, n, 0)
                        }(r, n);
                    for (var o = J(r), a = o - 1; a >= 0; a--)
                        t(a) || (a === o - 1 ? o-- : _[n].push(a));
                    V(r, n, o)
                } catch (e) {}
            }
        }
    }
      , B = {};
    function G(e, n) {
        switch (e) {
        case "local":
        case "session":
            U[e] = n;
            break;
        case "all":
            for (var r in U)
                U[r] = n
        }
    }
    var Q = Object.create(null);
    function K(e, n) {
        Q[e] = n
    }
    function W(e) {
        return Q[e] || Q[""]
    }
    function X(e) {
        var n;
        if ("string" == typeof e.resources)
            n = [e.resources];
        else if (!((n = e.resources)instanceof Array && n.length))
            return null;
        return {
            resources: n,
            path: void 0 === e.path ? "/" : e.path,
            maxURL: e.maxURL ? e.maxURL : 500,
            rotate: e.rotate ? e.rotate : 750,
            timeout: e.timeout ? e.timeout : 5e3,
            random: !0 === e.random,
            index: e.index ? e.index : 0,
            dataAfterTimeout: !1 !== e.dataAfterTimeout
        }
    }
    for (var Z = Object.create(null), ee = ["https://api.simplesvg.com", "https://api.unisvg.com"], ne = []; ee.length > 0; )
        1 === ee.length || Math.random() > .5 ? ne.push(ee.shift()) : ne.push(ee.pop());
    function re(e, n) {
        var r = X(n);
        return null !== r && (Z[e] = r,
        !0)
    }
    function te(e) {
        return Z[e]
    }
    Z[""] = X({
        resources: ["https://api.iconify.design"].concat(ne)
    });
    var ie = function(e, n) {
        var r = e
          , t = -1 !== r.indexOf("?");
        return Object.keys(n).forEach((function(e) {
            var i;
            try {
                i = function(e) {
                    switch (typeof e) {
                    case "boolean":
                        return e ? "true" : "false";
                    case "number":
                    case "string":
                        return encodeURIComponent(e);
                    default:
                        throw new Error("Invalid parameter")
                    }
                }(n[e])
            } catch (e) {
                return
            }
            r += (t ? "&" : "?") + encodeURIComponent(e) + "=" + i,
            t = !0
        }
        )),
        r
    }
      , oe = null
      , ae = null
      , ce = Object.create(null)
      , fe = Object.create(null);
    function ue() {
        if (null === oe) {
            var e = self
              , n = "Iconify"
              , r = ".cb";
            if (void 0 === e[n])
                r = "",
                void 0 === e[n = "IconifyJSONP"] && (e[n] = Object.create(null)),
                oe = e[n];
            else {
                var t = e[n];
                void 0 === t.cb && (t.cb = Object.create(null)),
                oe = t.cb
            }
            ae = n + r + ".{cb}"
        }
        return oe
    }
    var se = {
        prepare: function(e, n, r) {
            var t = []
              , i = ce[e + ":" + n];
            void 0 === i && (i = function(e, n) {
                var r, t = te(e);
                if (!t)
                    return 0;
                if (t.maxURL) {
                    var i = 0;
                    t.resources.forEach((function(e) {
                        var n = e;
                        i = Math.max(i, n.length)
                    }
                    )),
                    ue();
                    var o = ie(n + ".js", {
                        icons: "",
                        callback: ae
                    });
                    r = t.maxURL - i - t.path.length - o.length
                } else
                    r = 0;
                var a = e + ":" + n;
                return fe[a] = t.path,
                ce[a] = r,
                r
            }(e, n));
            var o = "icons"
              , a = {
                type: o,
                provider: e,
                prefix: n,
                icons: []
            }
              , c = 0;
            return r.forEach((function(r, f) {
                (c += r.length + 1) >= i && f > 0 && (t.push(a),
                a = {
                    type: o,
                    provider: e,
                    prefix: n,
                    icons: []
                },
                c = r.length),
                a.icons.push(r)
            }
            )),
            t.push(a),
            t
        },
        send: function(e, n, r) {
            if ("icons" === n.type) {
                for (var t = n.provider, i = n.prefix, o = n.icons.join(","), a = t + ":" + i, c = i.split("-").shift().slice(0, 3), f = ue(), u = function(e) {
                    var n, r = 0;
                    for (n = e.length - 1; n >= 0; n--)
                        r += e.charCodeAt(n);
                    return r % 999
                }(t + ":" + e + ":" + i + ":" + o); void 0 !== f[c + u]; )
                    u++;
                var s = c + u
                  , l = ie(i + ".js", {
                    icons: o,
                    callback: ae.replace("{cb}", s)
                })
                  , d = fe[a] + l;
                f[s] = function(e) {
                    delete f[s],
                    r.done(e)
                }
                ;
                var v = e + d
                  , p = document.createElement("script");
                p.type = "text/javascript",
                p.async = !0,
                p.src = v,
                document.head.appendChild(p)
            } else
                r.done(void 0, 400)
        }
    }
      , le = Object.create(null)
      , de = Object.create(null)
      , ve = function() {
        var e;
        try {
            if ("function" == typeof (e = fetch))
                return e
        } catch (e) {}
        try {
            var n = String.fromCharCode(114) + String.fromCharCode(101);
            if ("function" == typeof (e = (0,
            global[n + "qui" + n])("cross-fetch")))
                return e
        } catch (e) {}
        return null
    }();
    var pe = {
        prepare: function(e, n, r) {
            var t = []
              , i = le[n];
            void 0 === i && (i = function(e, n) {
                var r, t = te(e);
                if (!t)
                    return 0;
                if (t.maxURL) {
                    var i = 0;
                    t.resources.forEach((function(e) {
                        var n = e;
                        i = Math.max(i, n.length)
                    }
                    ));
                    var o = ie(n + ".json", {
                        icons: ""
                    });
                    r = t.maxURL - i - t.path.length - o.length
                } else
                    r = 0;
                var a = e + ":" + n;
                return de[e] = t.path,
                le[a] = r,
                r
            }(e, n));
            var o = "icons"
              , a = {
                type: o,
                provider: e,
                prefix: n,
                icons: []
            }
              , c = 0;
            return r.forEach((function(r, f) {
                (c += r.length + 1) >= i && f > 0 && (t.push(a),
                a = {
                    type: o,
                    provider: e,
                    prefix: n,
                    icons: []
                },
                c = r.length),
                a.icons.push(r)
            }
            )),
            t.push(a),
            t
        },
        send: function(e, n, r) {
            if (ve) {
                var t = function(e) {
                    if ("string" == typeof e) {
                        if (void 0 === de[e]) {
                            var n = te(e);
                            if (!n)
                                return "/";
                            de[e] = n.path
                        }
                        return de[e]
                    }
                    return "/"
                }(n.provider);
                switch (n.type) {
                case "icons":
                    var i = n.prefix
                      , o = n.icons.join(",");
                    t += ie(i + ".json", {
                        icons: o
                    });
                    break;
                case "custom":
                    var a = n.uri;
                    t += "/" === a.slice(0, 1) ? a.slice(1) : a;
                    break;
                default:
                    return void r.done(void 0, 400)
                }
                var c = 503;
                ve(e + t).then((function(e) {
                    if (200 === e.status)
                        return c = 501,
                        e.json();
                    setTimeout((function() {
                        r.done(void 0, e.status)
                    }
                    ))
                }
                )).then((function(e) {
                    "object" == typeof e && null !== e ? setTimeout((function() {
                        r.done(e)
                    }
                    )) : setTimeout((function() {
                        r.done(void 0, c)
                    }
                    ))
                }
                )).catch((function() {
                    r.done(void 0, c)
                }
                ))
            } else
                r.done(void 0, 424)
        }
    };
    var he = Object.create(null)
      , ge = Object.create(null);
    function ye(e, n) {
        e.forEach((function(e) {
            var r = e.provider;
            if (void 0 !== he[r]) {
                var t = he[r]
                  , i = e.prefix
                  , o = t[i];
                o && (t[i] = o.filter((function(e) {
                    return e.id !== n
                }
                )))
            }
        }
        ))
    }
    var be = 0;
    var me = {
        resources: [],
        index: 0,
        timeout: 2e3,
        rotate: 750,
        random: !1,
        dataAfterTimeout: !1
    };
    function we(e, n, r, t, i) {
        var o, a = e.resources.length, c = e.random ? Math.floor(Math.random() * a) : e.index;
        if (e.random) {
            var f = e.resources.slice(0);
            for (o = []; f.length > 1; ) {
                var u = Math.floor(Math.random() * f.length);
                o.push(f[u]),
                f = f.slice(0, u).concat(f.slice(u + 1))
            }
            o = o.concat(f)
        } else
            o = e.resources.slice(c).concat(e.resources.slice(0, c));
        var s = Date.now()
          , l = "pending"
          , d = 0
          , v = void 0
          , p = null
          , h = []
          , g = [];
        function y() {
            p && (clearTimeout(p),
            p = null)
        }
        function b() {
            "pending" === l && (l = "aborted"),
            y(),
            h.forEach((function(e) {
                e.abort && e.abort(),
                "pending" === e.status && (e.status = "aborted")
            }
            )),
            h = []
        }
        function m(e, n) {
            n && (g = []),
            "function" == typeof e && g.push(e)
        }
        function w() {
            return {
                startTime: s,
                payload: n,
                status: l,
                queriesSent: d,
                queriesPending: h.length,
                subscribe: m,
                abort: b
            }
        }
        function x() {
            l = "failed",
            g.forEach((function(e) {
                e(void 0, v)
            }
            ))
        }
        function j() {
            h = h.filter((function(e) {
                return "pending" === e.status && (e.status = "aborted"),
                e.abort && e.abort(),
                !1
            }
            ))
        }
        function O() {
            if ("pending" === l) {
                y();
                var t = o.shift();
                if (void 0 !== t) {
                    var a = {
                        getQueryStatus: w,
                        status: "pending",
                        resource: t,
                        done: function(n, r) {
                            !function(n, r, t) {
                                var a = void 0 === r;
                                switch (h = h.filter((function(e) {
                                    return e !== n
                                }
                                )),
                                l) {
                                case "pending":
                                    break;
                                case "failed":
                                    if (a || !e.dataAfterTimeout)
                                        return;
                                    break;
                                default:
                                    return
                                }
                                if (a)
                                    return void 0 !== t && (v = t),
                                    void (h.length || (o.length ? O() : x()));
                                if (y(),
                                j(),
                                i && !e.random) {
                                    var c = e.resources.indexOf(n.resource);
                                    -1 !== c && c !== e.index && i(c)
                                }
                                l = "completed",
                                g.forEach((function(e) {
                                    e(r)
                                }
                                ))
                            }(a, n, r)
                        }
                    };
                    h.push(a),
                    d++;
                    var c = "function" == typeof e.rotate ? e.rotate(d, s) : e.rotate;
                    p = setTimeout(O, c),
                    r(t, n, a)
                } else {
                    if (h.length) {
                        var f = "function" == typeof e.timeout ? e.timeout(s) : e.timeout;
                        if (f)
                            return void (p = setTimeout((function() {
                                y(),
                                "pending" === l && (j(),
                                x())
                            }
                            ), f))
                    }
                    x()
                }
            }
        }
        return "function" == typeof t && g.push(t),
        setTimeout(O),
        w
    }
    function xe(e) {
        var n = function(e) {
            if (!("object" == typeof e && "object" == typeof e.resources && e.resources instanceof Array && e.resources.length))
                throw new Error("Invalid Reduncancy configuration");
            var n, r = Object.create(null);
            for (n in me)
                void 0 !== e[n] ? r[n] = e[n] : r[n] = me[n];
            return r
        }(e)
          , r = [];
        function t() {
            r = r.filter((function(e) {
                return "pending" === e().status
            }
            ))
        }
        var i = {
            query: function(e, i, o) {
                var a = we(n, e, i, (function(e, n) {
                    t(),
                    o && o(e, n)
                }
                ), (function(e) {
                    n.index = e
                }
                ));
                return r.push(a),
                a
            },
            find: function(e) {
                var n = r.find((function(n) {
                    return e(n)
                }
                ));
                return void 0 !== n ? n : null
            },
            setIndex: function(e) {
                n.index = e
            },
            getIndex: function() {
                return n.index
            },
            cleanup: t
        };
        return i
    }
    function je() {}
    var Oe = Object.create(null);
    function Ee(e, n, r) {
        var t, i;
        if ("string" == typeof e) {
            var o = W(e);
            if (!o)
                return r(void 0, 424),
                je;
            i = o.send;
            var a = function(e) {
                if (void 0 === Oe[e]) {
                    var n = te(e);
                    if (!n)
                        return;
                    var r = {
                        config: n,
                        redundancy: xe(n)
                    };
                    Oe[e] = r
                }
                return Oe[e]
            }(e);
            a && (t = a.redundancy)
        } else {
            var c = X(e);
            if (c) {
                t = xe(c);
                var f = W(e.resources ? e.resources[0] : "");
                f && (i = f.send)
            }
        }
        return t && i ? t.query(n, i, r)().abort : (r(void 0, 424),
        je)
    }
    function Ie() {}
    var ke = Object.create(null)
      , Ae = Object.create(null)
      , Me = Object.create(null)
      , Se = Object.create(null);
    function Te(e, n) {
        void 0 === Me[e] && (Me[e] = Object.create(null));
        var r = Me[e];
        r[n] || (r[n] = !0,
        setTimeout((function() {
            r[n] = !1,
            function(e, n) {
                void 0 === ge[e] && (ge[e] = Object.create(null));
                var r = ge[e];
                r[n] || (r[n] = !0,
                setTimeout((function() {
                    if (r[n] = !1,
                    void 0 !== he[e] && void 0 !== he[e][n]) {
                        var t = he[e][n].slice(0);
                        if (t.length) {
                            var i = l(e, n)
                              , o = !1;
                            t.forEach((function(r) {
                                var t = r.icons
                                  , a = t.pending.length;
                                t.pending = t.pending.filter((function(r) {
                                    if (r.prefix !== n)
                                        return !0;
                                    var a = r.name;
                                    if (void 0 !== i.icons[a])
                                        t.loaded.push({
                                            provider: e,
                                            prefix: n,
                                            name: a
                                        });
                                    else {
                                        if (void 0 === i.missing[a])
                                            return o = !0,
                                            !0;
                                        t.missing.push({
                                            provider: e,
                                            prefix: n,
                                            name: a
                                        })
                                    }
                                    return !1
                                }
                                )),
                                t.pending.length !== a && (o || ye([{
                                    provider: e,
                                    prefix: n
                                }], r.id),
                                r.callback(t.loaded.slice(0), t.missing.slice(0), t.pending.slice(0), r.abort))
                            }
                            ))
                        }
                    }
                }
                )))
            }(e, n)
        }
        )))
    }
    var Ce = Object.create(null);
    function Fe(e, n, r) {
        void 0 === Ae[e] && (Ae[e] = Object.create(null));
        var t = Ae[e];
        void 0 === Se[e] && (Se[e] = Object.create(null));
        var i = Se[e];
        void 0 === ke[e] && (ke[e] = Object.create(null));
        var o = ke[e];
        void 0 === t[n] ? t[n] = r : t[n] = t[n].concat(r).sort(),
        i[n] || (i[n] = !0,
        setTimeout((function() {
            i[n] = !1;
            var r = t[n];
            delete t[n];
            var a = W(e);
            a ? a.prepare(e, n, r).forEach((function(r) {
                Ee(e, r, (function(t, i) {
                    var a = l(e, n);
                    if ("object" != typeof t) {
                        if (404 !== i)
                            return;
                        var c = Date.now();
                        r.icons.forEach((function(e) {
                            a.missing[e] = c
                        }
                        ))
                    } else
                        try {
                            var f = d(a, t);
                            if (!f.length)
                                return;
                            var u = o[n];
                            f.forEach((function(e) {
                                delete u[e]
                            }
                            )),
                            B.store && B.store(e, t)
                        } catch (e) {
                            console.error(e)
                        }
                    Te(e, n)
                }
                ))
            }
            )) : function() {
                var r = ("" === e ? "" : "@" + e + ":") + n
                  , t = Math.floor(Date.now() / 6e4);
                Ce[r] < t && (Ce[r] = t,
                console.error('Unable to retrieve icons for "' + r + '" because API is not configured properly.'))
            }()
        }
        )))
    }
    var Pe = function(e) {
        var n = e.provider
          , r = e.prefix;
        return ke[n] && ke[n][r] && void 0 !== ke[n][r][e.name]
    }
      , Le = function(e, n) {
        var r, t = function(e) {
            var n = {
                loaded: [],
                missing: [],
                pending: []
            }
              , r = Object.create(null);
            e.sort((function(e, n) {
                return e.provider !== n.provider ? e.provider.localeCompare(n.provider) : e.prefix !== n.prefix ? e.prefix.localeCompare(n.prefix) : e.name.localeCompare(n.name)
            }
            ));
            var t = {
                provider: "",
                prefix: "",
                name: ""
            };
            return e.forEach((function(e) {
                if (t.name !== e.name || t.prefix !== e.prefix || t.provider !== e.provider) {
                    t = e;
                    var i = e.provider
                      , o = e.prefix
                      , a = e.name;
                    void 0 === r[i] && (r[i] = Object.create(null));
                    var c = r[i];
                    void 0 === c[o] && (c[o] = l(i, o));
                    var f = c[o]
                      , u = {
                        provider: i,
                        prefix: o,
                        name: a
                    };
                    (void 0 !== f.icons[a] ? n.loaded : "" === o || void 0 !== f.missing[a] ? n.missing : n.pending).push(u)
                }
            }
            )),
            n
        }(function(e, n, r) {
            void 0 === n && (n = !0),
            void 0 === r && (r = !1);
            var t = [];
            return e.forEach((function(e) {
                var i = "string" == typeof e ? f(e, !1, r) : e;
                n && !u(i, r) || t.push({
                    provider: i.provider,
                    prefix: i.prefix,
                    name: i.name
                })
            }
            )),
            t
        }(e, !0, ("boolean" == typeof r && (h = r),
        h)));
        if (!t.pending.length) {
            var i = !0;
            return n && setTimeout((function() {
                i && n(t.loaded, t.missing, t.pending, Ie)
            }
            )),
            function() {
                i = !1
            }
        }
        var o, a, c = Object.create(null), s = [];
        t.pending.forEach((function(e) {
            var n = e.provider
              , r = e.prefix;
            if (r !== a || n !== o) {
                o = n,
                a = r,
                s.push({
                    provider: n,
                    prefix: r
                }),
                void 0 === ke[n] && (ke[n] = Object.create(null));
                var t = ke[n];
                void 0 === t[r] && (t[r] = Object.create(null)),
                void 0 === c[n] && (c[n] = Object.create(null));
                var i = c[n];
                void 0 === i[r] && (i[r] = [])
            }
        }
        ));
        var d = Date.now();
        return t.pending.forEach((function(e) {
            var n = e.provider
              , r = e.prefix
              , t = e.name
              , i = ke[n][r];
            void 0 === i[t] && (i[t] = d,
            c[n][r].push(t))
        }
        )),
        s.forEach((function(e) {
            var n = e.provider
              , r = e.prefix;
            c[n][r].length && Fe(n, r, c[n][r])
        }
        )),
        n ? function(e, n, r) {
            var t = be++
              , i = ye.bind(null, r, t);
            if (!n.pending.length)
                return i;
            var o = {
                id: t,
                icons: n,
                callback: e,
                abort: i
            };
            return r.forEach((function(e) {
                var n = e.provider
                  , r = e.prefix;
                void 0 === he[n] && (he[n] = Object.create(null));
                var t = he[n];
                void 0 === t[r] && (t[r] = []),
                t[r].push(o)
            }
            )),
            i
        }(n, t, s) : Ie
    }
      , De = "iconifyFinder" + Date.now()
      , Ne = "iconifyData" + Date.now();
    function Re(e, n, r, t) {
        var i;
        try {
            i = document.createElement("span")
        } catch (e) {
            return t ? "" : null
        }
        var o = A(r, j(x, n))
          , a = e.element
          , c = e.finder
          , f = e.name
          , u = a ? a.getAttribute("class") : ""
          , s = c ? c.classFilter(u ? u.split(/\s+/) : []) : []
          , l = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="' + ("iconify iconify--" + f.prefix + ("" === f.provider ? "" : " iconify--" + f.provider) + (s.length ? " " + s.join(" ") : "")) + '">' + F(o.body) + "</svg>";
        i.innerHTML = l;
        var d = i.childNodes[0]
          , v = d.style
          , p = o.attributes;
        if (Object.keys(p).forEach((function(e) {
            d.setAttribute(e, p[e])
        }
        )),
        o.inline && (v.verticalAlign = "-0.125em"),
        a) {
            for (var h = a.attributes, g = 0; g < h.length; g++) {
                var y = h.item(g);
                if (y) {
                    var b = y.name;
                    if ("class" !== b && "style" !== b && void 0 === p[b])
                        try {
                            d.setAttribute(b, y.value)
                        } catch (e) {}
                }
            }
            for (var m = a.style, w = 0; w < m.length; w++) {
                var O = m[w];
                v[O] = m[O]
            }
        }
        if (c) {
            var E = {
                name: f,
                status: "loaded",
                customisations: n
            };
            d[Ne] = E,
            d[De] = c
        }
        var I = t ? i.innerHTML : d;
        return a && a.parentNode ? a.parentNode.replaceChild(d, a) : i.removeChild(d),
        I
    }
    var Ue = [];
    function ze(e) {
        for (var n = 0; n < Ue.length; n++) {
            var r = Ue[n];
            if (("function" == typeof r.node ? r.node() : r.node) === e)
                return r
        }
    }
    function qe(e, n) {
        void 0 === n && (n = !1);
        var r = ze(e);
        return r ? (r.temporary && (r.temporary = n),
        r) : (r = {
            node: e,
            temporary: n
        },
        Ue.push(r),
        r)
    }
    function _e() {
        return Ue
    }
    var $e = null
      , He = {
        childList: !0,
        subtree: !0,
        attributes: !0
    };
    function Ve(e) {
        if (e.observer) {
            var n = e.observer;
            n.pendingScan || (n.pendingScan = setTimeout((function() {
                delete n.pendingScan,
                $e && $e(e)
            }
            )))
        }
    }
    function Je(e, n) {
        if (e.observer) {
            var r = e.observer;
            if (!r.pendingScan)
                for (var t = 0; t < n.length; t++) {
                    var i = n[t];
                    if (i.addedNodes && i.addedNodes.length > 0 || "attributes" === i.type && void 0 !== i.target[De])
                        return void (r.paused || Ve(e))
                }
        }
    }
    function Ye(e, n) {
        e.observer.instance.observe(n, He)
    }
    function Be(e) {
        var n = e.observer;
        if (!n || !n.instance) {
            var r = "function" == typeof e.node ? e.node() : e.node;
            r && (n || (n = {
                paused: 0
            },
            e.observer = n),
            n.instance = new MutationObserver(Je.bind(null, e)),
            Ye(e, r),
            n.paused || Ve(e))
        }
    }
    function Ge() {
        _e().forEach(Be)
    }
    function Qe(e) {
        if (e.observer) {
            var n = e.observer;
            n.pendingScan && (clearTimeout(n.pendingScan),
            delete n.pendingScan),
            n.instance && (n.instance.disconnect(),
            delete n.instance)
        }
    }
    function Ke(e) {
        var n = null !== $e;
        $e !== e && ($e = e,
        n && _e().forEach(Qe)),
        n ? Ge() : function(e) {
            var n = document;
            "complete" === n.readyState || "loading" !== n.readyState && !n.documentElement.doScroll ? e() : (n.addEventListener("DOMContentLoaded", e),
            window.addEventListener("load", e))
        }(Ge)
    }
    function We(e) {
        (e ? [e] : _e()).forEach((function(e) {
            if (e.observer) {
                var n = e.observer;
                if (n.paused++,
                !(n.paused > 1) && n.instance)
                    n.instance.disconnect()
            } else
                e.observer = {
                    paused: 1
                }
        }
        ))
    }
    function Xe(e) {
        if (e) {
            var n = ze(e);
            n && We(n)
        } else
            We()
    }
    function Ze(e) {
        (e ? [e] : _e()).forEach((function(e) {
            if (e.observer) {
                var n = e.observer;
                if (n.paused && (n.paused--,
                !n.paused)) {
                    var r = "function" == typeof e.node ? e.node() : e.node;
                    if (!r)
                        return;
                    n.instance ? Ye(e, r) : Be(e)
                }
            } else
                Be(e)
        }
        ))
    }
    function en(e) {
        if (e) {
            var n = ze(e);
            n && Ze(n)
        } else
            Ze()
    }
    function nn(e, n) {
        void 0 === n && (n = !1);
        var r = qe(e, n);
        return Be(r),
        r
    }
    function rn(e) {
        var n = ze(e);
        n && (Qe(n),
        function(e) {
            Ue = Ue.filter((function(n) {
                var r = "function" == typeof n.node ? n.node() : n.node;
                return e !== r
            }
            ))
        }(e))
    }
    var tn = [];
    function on(e) {
        return "string" == typeof e && (e = f(e)),
        null !== e && u(e) ? e : null
    }
    function an(e) {
        var n = [];
        tn.forEach((function(r) {
            var t = r.find(e);
            Array.prototype.forEach.call(t, (function(e) {
                var t = e;
                if (void 0 === t[De] || t[De] === r) {
                    var i = on(r.name(t));
                    if (null !== i) {
                        t[De] = r;
                        var o = {
                            element: t,
                            finder: r,
                            name: i
                        };
                        n.push(o)
                    }
                }
            }
            ))
        }
        ));
        var r = e.querySelectorAll("svg.iconify");
        return Array.prototype.forEach.call(r, (function(e) {
            var r = e
              , t = r[De]
              , i = r[Ne];
            if (t && i) {
                var o = on(t.name(r));
                if (null !== o) {
                    var a, c = !1;
                    if (o.prefix !== i.name.prefix || o.name !== i.name.name ? c = !0 : (a = t.customisations(r),
                    function(e, n) {
                        var r = Object.keys(e)
                          , t = Object.keys(n);
                        if (r.length !== t.length)
                            return !1;
                        for (var i = 0; i < r.length; i++) {
                            var o = r[i];
                            if (n[o] !== e[o])
                                return !1
                        }
                        return !0
                    }(i.customisations, a) || (c = !0)),
                    c) {
                        var f = {
                            element: r,
                            finder: t,
                            name: o,
                            customisations: a
                        };
                        n.push(f)
                    }
                }
            }
        }
        )),
        n
    }
    var cn = !1;
    function fn() {
        cn || (cn = !0,
        setTimeout((function() {
            cn && (cn = !1,
            un())
        }
        )))
    }
    function un(e, n) {
        void 0 === n && (n = !1),
        cn = !1;
        var r = Object.create(null);
        (e ? [e] : _e()).forEach((function(e) {
            var t = "function" == typeof e.node ? e.node() : e.node;
            if (t && t.querySelectorAll) {
                var i = !1
                  , o = !1;
                an(t).forEach((function(n) {
                    var t, a, c = n.element, f = n.name, u = f.provider, s = f.prefix, d = f.name, p = c[Ne];
                    if (void 0 !== p && (t = p.name,
                    a = f,
                    null !== t && null !== a && t.name === a.name && t.prefix === a.prefix))
                        switch (p.status) {
                        case "missing":
                            return;
                        case "loading":
                            if (Pe({
                                provider: u,
                                prefix: s,
                                name: d
                            }))
                                return void (i = !0)
                        }
                    var h = l(u, s);
                    if (void 0 === h.icons[d]) {
                        if (h.missing[d])
                            return p = {
                                name: f,
                                status: "missing",
                                customisations: {}
                            },
                            void (c[Ne] = p);
                        if (!Pe({
                            provider: u,
                            prefix: s,
                            name: d
                        })) {
                            void 0 === r[u] && (r[u] = Object.create(null));
                            var g = r[u];
                            void 0 === g[s] && (g[s] = Object.create(null)),
                            g[s][d] = !0
                        }
                        p = {
                            name: f,
                            status: "loading",
                            customisations: {}
                        },
                        c[Ne] = p,
                        i = !0
                    } else {
                        !o && e.observer && (We(e),
                        o = !0);
                        var y = void 0 !== n.customisations ? n.customisations : n.finder.customisations(c);
                        Re(n, y, v(h, d))
                    }
                }
                )),
                e.temporary && !i ? rn(t) : n && i ? nn(t, !0) : o && e.observer && Ze(e)
            }
        }
        )),
        Object.keys(r).forEach((function(e) {
            var n = r[e];
            Object.keys(n).forEach((function(r) {
                Le(Object.keys(n[r]).map((function(n) {
                    return {
                        provider: e,
                        prefix: r,
                        name: n
                    }
                }
                )), fn)
            }
            ))
        }
        ))
    }
    var sn = /[\s,]+/;
    function ln(e, n) {
        return e.hasAttribute(n)
    }
    function dn(e, n) {
        return e.getAttribute(n)
    }
    var vn = ["inline", "hFlip", "vFlip"]
      , pn = ["width", "height"]
      , hn = "iconify-inline"
      , gn = {
        find: function(e) {
            return e.querySelectorAll("i.iconify, span.iconify, i.iconify-inline, span.iconify-inline")
        },
        name: function(e) {
            return ln(e, "data-icon") ? dn(e, "data-icon") : null
        },
        customisations: function(e, n) {
            void 0 === n && (n = {
                inline: !1
            });
            var r, t = n, i = e.getAttribute("class");
            if (-1 !== (i ? i.split(/\s+/) : []).indexOf(hn) && (t.inline = !0),
            ln(e, "data-rotate")) {
                var o = function(e, n) {
                    void 0 === n && (n = 0);
                    var r = e.replace(/^-?[0-9.]*/, "");
                    function t(e) {
                        for (; e < 0; )
                            e += 4;
                        return e % 4
                    }
                    if ("" === r) {
                        var i = parseInt(e);
                        return isNaN(i) ? 0 : t(i)
                    }
                    if (r !== e) {
                        var o = 0;
                        switch (r) {
                        case "%":
                            o = 25;
                            break;
                        case "deg":
                            o = 90
                        }
                        if (o) {
                            var a = parseFloat(e.slice(0, e.length - r.length));
                            return isNaN(a) ? 0 : (a /= o) % 1 == 0 ? t(a) : 0
                        }
                    }
                    return n
                }(dn(e, "data-rotate"));
                o && (t.rotate = o)
            }
            return ln(e, "data-flip") && (r = t,
            dn(e, "data-flip").split(sn).forEach((function(e) {
                switch (e.trim()) {
                case "horizontal":
                    r.hFlip = !0;
                    break;
                case "vertical":
                    r.vFlip = !0
                }
            }
            ))),
            ln(e, "data-align") && function(e, n) {
                n.split(sn).forEach((function(n) {
                    var r = n.trim();
                    switch (r) {
                    case "left":
                    case "center":
                    case "right":
                        e.hAlign = r;
                        break;
                    case "top":
                    case "middle":
                    case "bottom":
                        e.vAlign = r;
                        break;
                    case "slice":
                    case "crop":
                        e.slice = !0;
                        break;
                    case "meet":
                        e.slice = !1
                    }
                }
                ))
            }(t, dn(e, "data-align")),
            vn.forEach((function(n) {
                if (ln(e, "data-" + n)) {
                    var r = function(e, n) {
                        var r = e.getAttribute(n);
                        return r === n || "true" === r || "" !== r && "false" !== r && null
                    }(e, "data-" + n);
                    "boolean" == typeof r && (t[n] = r)
                }
            }
            )),
            pn.forEach((function(n) {
                if (ln(e, "data-" + n)) {
                    var r = dn(e, "data-" + n);
                    "" !== r && (t[n] = r)
                }
            }
            )),
            t
        },
        classFilter: function(e) {
            var n = [];
            return e.forEach((function(e) {
                "iconify" !== e && "" !== e && "iconify--" !== e.slice(0, 9) && n.push(e)
            }
            )),
            n
        }
    };
    function yn(e, n, r) {
        var t = g(e);
        return t ? Re({
            name: f(e)
        }, j(x, "object" == typeof n ? n : {}), t, r) : null
    }
    function bn() {
        return "2.1.0"
    }
    function mn(e, n) {
        return yn(e, n, !1)
    }
    function wn(e, n) {
        return yn(e, n, !0)
    }
    function xn(e, n) {
        var r = g(e);
        return r ? A(r, j(x, "object" == typeof n ? n : {})) : null
    }
    function jn(e) {
        e ? function(e) {
            var n = ze(e);
            n ? un(n) : un({
                node: e,
                temporary: !0
            }, !0)
        }(e) : un()
    }
    if ("undefined" != typeof document && "undefined" != typeof window) {
        !function() {
            if (document.documentElement)
                return qe(document.documentElement);
            Ue.push({
                node: function() {
                    return document.documentElement
                }
            })
        }(),
        function(e) {
            -1 === tn.indexOf(e) && tn.push(e)
        }(gn);
        var On = window;
        if (void 0 !== On.IconifyPreload) {
            var En = On.IconifyPreload
              , In = "Invalid IconifyPreload syntax.";
            "object" == typeof En && null !== En && (En instanceof Array ? En : [En]).forEach((function(e) {
                try {
                    ("object" != typeof e || null === e || e instanceof Array || "object" != typeof e.icons || "string" != typeof e.prefix || !b(e)) && console.error(In)
                } catch (e) {
                    console.error(In)
                }
            }
            ))
        }
        setTimeout((function() {
            Ke(un),
            un()
        }
        ))
    }
    function kn(e, n) {
        G(e, !1 !== n)
    }
    function An(e) {
        G(e, !0)
    }
    if (K("", ve ? pe : se),
    "undefined" != typeof document && "undefined" != typeof window) {
        B.store = function(e, n) {
            function r(r) {
                if (!U[r])
                    return !1;
                var t = H(r);
                if (!t)
                    return !1;
                var i = _[r].shift();
                if (void 0 === i && !V(t, r, (i = q[r]) + 1))
                    return !1;
                try {
                    var o = {
                        cached: Math.floor(Date.now() / R),
                        provider: e,
                        data: n
                    };
                    t.setItem(L + i, JSON.stringify(o))
                } catch (e) {
                    return !1
                }
                return !0
            }
            z || Y(),
            r("local") || r("session")
        }
        ,
        Y();
        var Mn = window;
        if (void 0 !== Mn.IconifyProviders) {
            var Sn = Mn.IconifyProviders;
            if ("object" == typeof Sn && null !== Sn)
                for (var Tn in Sn) {
                    var Cn = "IconifyProviders[" + Tn + "] is invalid.";
                    try {
                        var Fn = Sn[Tn];
                        if ("object" != typeof Fn || !Fn || void 0 === Fn.resources)
                            continue;
                        re(Tn, Fn) || console.error(Cn)
                    } catch (e) {
                        console.error(Cn)
                    }
                }
        }
    }
    var Pn = {
        getAPIConfig: te,
        setAPIModule: K,
        sendAPIQuery: Ee,
        setFetch: function(e) {
            ve = e,
            K("", pe)
        },
        listAPIProviders: function() {
            return Object.keys(Z)
        },
        mergeParams: ie
    }
      , Ln = {
        _api: Pn,
        addAPIProvider: re,
        loadIcons: Le,
        iconExists: m,
        getIcon: w,
        listIcons: p,
        addIcon: y,
        addCollection: b,
        replaceIDs: F,
        calculateSize: I,
        buildIcon: M,
        getVersion: bn,
        renderSVG: mn,
        renderHTML: wn,
        renderIcon: xn,
        scan: jn,
        observe: nn,
        stopObserving: rn,
        pauseObserver: Xe,
        resumeObserver: en,
        enableCache: kn,
        disableCache: An
    };
    return e._api = Pn,
    e.addAPIProvider = re,
    e.addCollection = b,
    e.addIcon = y,
    e.buildIcon = M,
    e.calculateSize = I,
    e.default = Ln,
    e.disableCache = An,
    e.enableCache = kn,
    e.getIcon = w,
    e.getVersion = bn,
    e.iconExists = m,
    e.listIcons = p,
    e.loadIcons = Le,
    e.observe = nn,
    e.pauseObserver = Xe,
    e.renderHTML = wn,
    e.renderIcon = xn,
    e.renderSVG = mn,
    e.replaceIDs = F,
    e.resumeObserver = en,
    e.scan = jn,
    e.stopObserving = rn,
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e
}({});
if ("object" == typeof exports)
    try {
        for (var key in exports.__esModule = !0,
        exports.default = Iconify,
        Iconify)
            exports[key] = Iconify[key]
    } catch (e) {}
try {
    void 0 === self.Iconify && (self.Iconify = Iconify)
} catch (e) {}
