define("trade/list/jump/buyer", ["jquery", "trade/module/url", "just/aom/location", "trade/module/sale"], function(t, o, e, n) {
    t("#content").on("click.jump", ".module.good,.module.more", function(n) {
        var a = t(this).attr("data-order-id");
        a && e.goTo(o.orderDetail(a, "buyer")), n.preventDefault()
    }), t("#content").on("click.jump", ".contact,.button-refund", function(t) {
        t.stopPropagation()
    }), t("#content").on("tap.jump", ".o-t-title-shop .contact", function(o) {
        var n = t(this).parents(".o-t-title-shop").data("shopUrl");
        n && n.length > 0 && e.goTo(n)
    }), t(".search-extend").on("click", function(o) {
        o.preventDefault();
        var n = t(this).attr("href");
        n && e.replace(n)
    })
});
define("trade/list/load/pageLoader", ["jquery", "just/aom/action", "just/aom/location", "just/aom/template", "just/lang/observer", "just/aom/bridge", "doit/mod/loadingMask", "doit/mod/maskManager", "trade/module/sale616", "trade/list/biz/query", "justCache"], function(e, a, o, s, t, i, r, n, d, g, c) {
    var l = {
            ERROR_LOAD_FAILED: "数据加载异常，请再次尝试"
        },
        u = e("#orders-list"),
        h = !1,
        p = c.get("isBuyer") ? "pages/buyerOrderList/view" : "pages/sellerOrderList/view";
    return {
        init: function() {
            this.isInit || (this.isInit = !0, this.lazyLoad())
        },
        get: function(t, i) {
            i = i || {};
            var r = t || {},
                d = i.before;
            e.isFunction(d) && d();
            var l = this,
                f = g.get("page");
            if (!(h || r.page && c.get("pageEnd") && r.page > f)) {
                h = !0, i.showMask && this.showHideLoading(!0), g.update(r);
                var L = g.get("page");
                n.setMask(), a.get({
                    url: p,
                    data: g.get(),
                    success: function(e) {
                        if ("false" === e.success) return h = !1, void l.handlePageLoadError(e, i);
                        var a = e.data,
                            t = e._originalData,
                            r = +t.pageSize || 0;
                        r = "number" == typeof t.pageSize ? 1 : +t.pageSize || 0;
                        var n = function() {
                            h = !1, L >= r ? c.set("pageEnd", !0) : c.set("pageEnd", !1)
                        };
                        s.render({
                            url: "modules/list/orders",
                            data: {
                                model: a,
                                pageIndex: L,
                                pageSize: r,
                                query: g.get(),
                                isBuyer: c.get("isBuyer"),
                                isRecently: !o.getQuery("isHistory")
                            },
                            error: function() {
                                n(), l.handlePageLoadError({}, i)
                            },
                            success: function(e) {
                                return n(), "false" !== e.success && e.data ? (1 === L && u.empty(), void l.handlePageLoadSuccess(e, i)) : void l.handlePageLoadError(e, i)
                            }
                        })
                    },
                    error: function() {
                        h = !1, l.handlePageLoadError({}, i)
                    }
                })
            }
        },
        handlePageLoadError: function(a, o) {
            n.clearMask(), o = o || {}, a = a || {}, o.showMask && this.showHideLoading(!1);
            var s = l.ERROR_LOAD_FAILED;
            a.errorMessage && (s = a.errorMessage), i.toast(s), e.isFunction(o.error) && o.error(), e.isFunction(o.complete) && o.complete(), t.notify("pageLoadError"), t.notify("pageLoadComplete")
        },
        handlePageLoadSuccess: function(a, o) {
            n.clearMask(), o = o || {}, a = a || {}, this.showHideLoading(!1);
            var s = e("<div>" + a.data + "</div>");
            this.lazyLoad(s), u.append(s.children()), e.isFunction(o.success) && o.success(), e.isFunction(o.complete) && o.complete(), t.notify("pageLoadSuccess"), t.notify("pageLoadComplete")
        },
        showHideLoading: function(e) {
            this.loadingMask || (this.loadingMask = new r), e ? this.loadingMask.show() : this.loadingMask.hide()
        },
        lazyLoad: function(a) {
            a = a || u, a.find("img.lazyload").each(function() {
                var a = e(this),
                    o = a.data("lazyload-src");
                o && a.attr("src", o).removeAttr("data-lazyload-src")
            })
        }
    }
});
define("trade/list/load/scroller", [
  "jquery",
  "trade/list/load/pageLoader",
  "trade/list/filter/filter",
  "fui/scroller/1.0",
  "just/aom/action",
  "just/aom/location",
  "just/aom/template",
  "doit/mod/pageLayout",
  "just/lang/observer",
  "just/aom/bridge",
  "trade/module/url",
  "trade/list/biz/query",
  "justCache"], function(e, t, s, o, r, a, l, i, n, u, c, d, f) {
    var h = e("#orders-list"),
        p = e("#pull-down"),
        g = e("#pull-up"),
        m = p.children("i"),
        S = p.children("span"),
        y = g.children("i"),
        b = g.children("span");
    f.get("isBuyer") ? "pages/buyerOrderList/view" : "pages/sellerOrderList/view";
    return {
        init: function() {
            h.length ? (this.scroller(!0), this.bind(), t.init()) : this.scroller(!1);
            var e = this;
            s.onListRefresh = function(t) {
                e.onListRefresh(t)
            }, s.init()
        },
        onListRefresh: function(e) {
            var s = this;
            d.set("page", 1), d.set("pageIndex", 1), d.set("status", e), d.set("pageEnd", !1), h.empty(), p.hide(), t.get(e, {
                showMask: !0,
                success: function() {
                    p.show(), s.updatePageStatus(), n.notify("scrollerToTop"), n.notify("scrollerRefresh")
                },
                error: function() {
                    p.show(), s.updatePageStatus(), n.notify("scrollerRefresh")
                }
            })
        },
        scroller: function(e) {
            var t = new i({
                scrollerOpts: {
                    bounce: null == e ? !0 : e,
                    useTransition: !0,
                    topOffset: p.height(),
                    topSelector: "#pull-down",
                    topGapThreshold: 5,
                    bottomSelector: "#pull-up",
                    bottomGapThreshold: 0,
                    hideScrollbar: !0,
                    fadeScrollbar: !0,
                    useTransform: !0,
                    handleClick: !1
                },
                isLayoutOnResize: !0
            });
            this.listScroller = t.getScroller(), p.css("visibility", "visible")
        },
        updatePageStatus: function() {
            f.get("pageEnd") ? g.hide() : (g.show(), y[0] && (y[0].className = "loading"), b.text(b.data("loading")))
        },
        bind: function() {
            var e = this;
            n.attach("scrollerRefresh", function() {
                e.listScroller.refresh()
            }), n.attach("scrollerToTop", function() {
                e.listScroller.scrollToElement(h, 0)
            }), this.listScroller.on("infiniteScroll", function() {
                e.updatePageStatus(), t.get({
                    page: d.get("page") + 1
                }, {
                    success: function(t) {
                        e.updatePageStatus(), n.notify("scrollerRefresh")
                    },
                    error: function(t) {
                        e.updatePageStatus(), n.notify("scrollerRefresh")
                    }
                })
            }).on("pullDownChange", function() {
                m[0] && (m[0].className = "rotate"), S.text(S.data("rotate"))
            }).on("pullDownRestore", function() {
                m[0] && (m[0].className = ""), S.text(S.data("def"))
            }).on("pullToRefresh", function() {
                m[0] && (m[0].className = "loading"), S.text(S.data("loading")), e.updatePageStatus(), setTimeout(function() {
                    t.get({
                        page: 1
                    }, {
                        success: function(t) {
                            e.updatePageStatus(), n.notify("scrollerRefresh")
                        },
                        error: function(t) {
                            e.updatePageStatus(), n.notify("scrollerRefresh")
                        }
                    })
                }, 25)
            }).on("refresh", function() {
                m[0] && (m[0].className = ""), S.text(S.data("def")), y[0] && (y[0].className = ""), b.text(b.data("def"))
            })
        }
    }
});
define("trade/list/scene/daixiao", ["jquery", "just/aom/location", "trade/module/url"], function(e, i, a) {
    return {
        init: function() {
            var e = i.getQuery("sceneType");
            "daixiao" === e && this.deployBackScene()
        },
        deployBackScene: function() {
            this.createPlaceholder(), this.position(), this.append()
        },
        createPlaceholder: function() {
            this.placeholder = e('<div class="unit-back-scene"><a href="' + a.daixiaoMarket() + '">代销市场</a></div>')
        },
        position: function() {
            var i = e(window).height();
            this.placeholder.css("top", i - 200)
        },
        append: function() {
            var i = e("#floating");
            0 === i.length && (i = e('<div id="floating"></div>').appendTo(e("#doc"))), i.append(this.placeholder)
        }
    }
});
define("trade/list/biz/moreOperate", ["trade/module/bubbleMoreOperate", "jquery"], function(e, t) {
    return {
        init: function() {
            new e({
                trigger: ".more-operate-btn",
                width: 80,
                originApplyTo: t("#content"),
                appendOffset: {
                    left: 0,
                    top: -4
                }
            })
        }
    }
});
define(["justPage", "just/aom/location"], function(e, t) {
    e.register(["trade/list/jump/buyer", "trade/list/load/scroller", "trade/list/filter/classify", "trade/list/filter/search", "trade/list/biz/actions", "trade/list/biz/remindSendGoods", "trade/list/biz/cancelOrder", "trade/list/biz/confirmReceipt", "trade/list/biz/moreOperate", "trade/list/extra/tracer"]), t.getQuery("sceneType") && e.register("trade/list/scene/daixiao")
});
var SceneManage = {};
SceneManage.scene = null, SceneManage.$ = null, SceneManage.record = {};
var date = new Date;
SceneManage.startTime = date.getTime();
var verison = Math.round(date.getTime() / 1e3 / 86400);
SceneManage.version = verison,
    function(e) {
        var n = function(e) {
            SceneManage.$ = e, e(document).ready(function() {
                var e = document.body.getAttribute("data-spm");
                e || (e = window.location.origin + window.location.pathname), SceneManage.record.spmb = e;
                var n = document.createElement("script");
                n.setAttribute("async", !0);
                var t = document.referrer,
                    a = location.search,
                    o = "",
                    r = "https://cui.m.1688.com/scene?spmb=" + encodeURIComponent(e) + "&referrer=" + encodeURIComponent(t);
                if (a && "" != a) {
                    var c = a.substring(1),
                        i = c.split("&");
                    for (var s in i) {
                        var d = i[s].split("=");
                        2 == d.length && ("env" == d[0] ? (o = d[1], r = r + "&env=" + o) : "isGray" == d[0] && (r = r + "&isGray=" + d[1]))
                    }
                }
                n.src = r, n.onerror = function() {
                    setTimeout(function() {
                        n.src = r + "&time=" + (new Date).getTime()
                    }, 500)
                }, document.body.appendChild(n);
                var m = document.createElement("script");
                m.setAttribute("async", !0);
                var u = window.localStorage.getItem("showScript") || SceneManage.version;
                m.src = "//astyle.alicdn.com/m/roc/wap/static/sceneshow.js?_v=20160909" + u + ".js", document.body.appendChild(m)
            })
        };
        if (e) n(e);
        else {
            var t = document.createElement("script");
            t.src = "//g.alicdn.com/mtb/??zepto/1.1.3/zepto.js", t.setAttribute("async", !0), t.onload = function() {
                n(window.Zepto)
            }, document.body.appendChild(t)
        }
    }(window.jQuery || window.Zepto);
! function(e) {
    function t(e) {
        return "[object String]" == Object.prototype.toString.call(e)
    }
    if (!window.ImageControl) {
        var i = {},
            r = !1,
            e = e;
        i.defaultWidth = [16, 20, 24, 30, 32, 36, 40, 48, 50, 60, 64, 70, 72, 75, 80, 81, 88, 90, 100, 110, 115, 120, 121, 125, 128, 130, 140, 142, 145, 150, 160, 165, 170, 180, 190, 196, 200, 210, 220, 230, 240, 250, 264, 270, 280, 284, 288, 290, 292, 294, 300, 310, 315, 320, 336, 350, 360, 400, 420, 430, 440, 450, 460, 468, 480, 485, 490, 500, 540, 560, 570, 580, 600, 640, 660, 670, 720, 728, 760, 790, 960], i.defaultSize = {
            16: [16],
            20: [20],
            24: [24],
            30: [30],
            32: [32],
            36: [36],
            40: [40],
            48: [48],
            50: [50],
            60: [30, 60, 90],
            64: [64],
            70: [70],
            72: [72],
            75: [75, 100],
            80: [48, 60, 80],
            81: [65],
            88: [88],
            90: [45, 60, 90, 135],
            100: [50, 100, 150],
            110: [90, 110],
            115: [100],
            120: [60, 90, 120, 160],
            121: [75],
            125: [125],
            128: [128],
            130: [130],
            140: [70, 140],
            142: [142],
            145: [145],
            150: [150, 200],
            160: [80, 90, 160, 180, 240],
            165: [5e3],
            170: [120, 170],
            180: [90, 180, 230],
            190: [43, 190],
            196: [196],
            200: [100, 200],
            210: [140, 210],
            220: [220, 330],
            230: [87, 230],
            234: [234],
            240: [240],
            250: [225, 250],
            264: [100],
            270: [180, 270],
            280: [410],
            284: [284],
            288: [480],
            290: [290],
            292: [292],
            294: [430],
            300: [300, 1e3],
            310: [310],
            315: [315],
            320: [320, 480],
            336: [336],
            350: [350],
            360: [360],
            400: [152, 400],
            420: [280],
            430: [430],
            440: [440],
            450: [600],
            460: [460],
            468: [468],
            480: [420, 480],
            485: [175],
            490: [330, 490],
            500: [450, 1e3],
            540: [540],
            560: [370, 560, 840],
            570: [570],
            580: [580],
            600: [600],
            640: [480, 640],
            660: [440],
            670: [670],
            720: [720],
            728: [728],
            760: [760],
            790: [420],
            960: [960]
        }, i.cutSize = {
            "72x72": !0,
            "88x88": !0,
            "100x100": !0,
            "110x110": !0,
            "112x336": !0,
            "120x120": !0,
            "145x145": !0,
            "160x160": !0,
            "160x240": !0,
            "170x170": !0,
            "180x180": !0,
            "200x200": !0,
            "230x230": !0,
            "240x240": !0,
            "270x270": !0,
            "290x290": !0,
            "336x112": !0,
            "360x360": !0,
            "310x310": !0,
            "320x320": !0,
            "320x378": !0,
            "580x580": !0,
            "460x460": !0,
            "640x640": !0,
            "560x840": !0
        };
        var n = "q90",
            a = !1,
            o = !0,
            c = {},
            l = {},
            d = "data-lazyload-src",
            s = !1,
            p = function() {
                function e() {
                    for (var e = 0, t = {}; e < arguments.length; e++) {
                        var i = arguments[e];
                        for (var r in i) t[r] = i[r]
                    }
                    return t
                }

                function t(i) {
                    function r(t, n, a) {
                        var o;
                        if (arguments.length > 1) {
                            if (a = e({
                                    path: "/"
                                }, r.defaults, a), "number" == typeof a.expires) {
                                var c = new Date;
                                c.setMilliseconds(c.getMilliseconds() + 864e5 * a.expires), a.expires = c
                            }
                            try {
                                o = JSON.stringify(n), /^[\{\[]/.test(o) && (n = o)
                            } catch (l) {}
                            return n = i.write ? i.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = encodeURIComponent(String(t)), t = t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), t = t.replace(/[\(\)]/g, escape), document.cookie = [t, "=", n, a.expires && "; expires=" + a.expires.toUTCString(), a.path && "; path=" + a.path, a.domain && "; domain=" + a.domain, a.secure ? "; secure" : ""].join("")
                        }
                        t || (o = {});
                        for (var d = document.cookie ? document.cookie.split("; ") : [], s = /(%[0-9A-Z]{2})+/g, p = 0; p < d.length; p++) {
                            var u = d[p].split("="),
                                f = u[0].replace(s, decodeURIComponent),
                                g = u.slice(1).join("=");
                            '"' === g.charAt(0) && (g = g.slice(1, -1));
                            try {
                                if (g = i.read ? i.read(g, f) : i(g, f) || g.replace(s, decodeURIComponent), this.json) try {
                                    g = JSON.parse(g)
                                } catch (l) {}
                                if (t === f) {
                                    o = g;
                                    break
                                }
                                t || (o[f] = g)
                            } catch (l) {}
                        }
                        return o
                    }
                    return r.get = r.set = r, r.getJSON = function() {
                        return r.apply({
                            json: !0
                        }, [].slice.call(arguments))
                    }, r.defaults = {}, r.remove = function(t, i) {
                        r(t, "", e(i, {
                            expires: -1
                        }))
                    }, r.withConverter = t, r
                }
                return t(function() {})
            }(),
            u = function() {
                if (p.set("webp", "0", {
                        expires: 7,
                        domain: ".1688.com",
                        path: "/"
                    }), window.localStorage) try {
                    var e = window.localStorage.getItem("needWebpJS"),
                        t = window.localStorage.getItem("webp");
                    if (e) {
                        r = !1;
                        var i = document.createElement("script");
                        i.type = "text/javascript";
                        var n = document.getElementsByTagName("head")[0];
                        return i.src = "//astyle.alicdn.com/m/roc/wap/static/webpjs-0.0.2.min.js", n.appendChild(i), i.onload = function() {
                            r = !0
                        }, void p.set("webp", "0", {
                            expires: 7,
                            domain: ".1688.com",
                            path: "/"
                        })
                    }
                    if (t && "true" == t) return r = !0, void p.set("webp", "1", {
                        expires: 7,
                        domain: ".1688.com",
                        path: "/"
                    })
                } catch (a) {
                    t = p.get("webp"), t && "1" == t && (r = !0)
                }
                var o = new Image;
                new Date;
                o.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA", o.onload = o.onerror = function() {
                    if (2 != o.height) {
                        r = !1, p.set("webp", "0", {
                            expires: 7,
                            domain: ".1688.com",
                            path: "/"
                        });
                        var e = document.createElement("script");
                        e.type = "text/javascript", e.async = !0;
                        var t = document.getElementsByTagName("script")[0];
                        e.src = "//astyle.alicdn.com/m/roc/wap/static/webpjs-0.0.2.min.js", e.onload = function() {
                            if (r = !0, p.set("webp", "0", {
                                    expires: 7,
                                    domain: ".1688.com",
                                    path: "/"
                                }), window.localStorage) try {
                                window.localStorage.setItem("webp", !0), window.localStorage.setItem("needWebpJS", !0)
                            } catch (e) {}
                        }, t.parentNode.insertBefore(e, t)
                    } else if (r = !0, p.set("webp", "1", {
                            expires: 7,
                            domain: ".1688.com",
                            path: "/"
                        }), window.localStorage) try {
                        window.localStorage.setItem("webp", !0)
                    } catch (i) {}
                }
            };
        u(), i.isSupportWebp = function() {
            return r
        }, i.getFillSize = function(e, t, a, c) {
            if (!e || "" == e) return e;
            (0 == t || t > document.documentElement.offsetWidth) && (t = document.documentElement.offsetWidth), window.devicePixelRatio && o && !c && (t * window.devicePixelRatio < 480 ? (t *= window.devicePixelRatio, a *= window.devicePixelRatio) : t = 480), e = e.replace(/_\d+x\d+xzq\d+\.jpg$/g, ""), e = e.replace(/\d+x\d+xzq\d+\.jpg$/g, "jpg"), e = e.replace(/\.\d+x\d+/g, "");
            var l = e.split("-"),
                d = 0,
                s = 0;
            if (e.toLowerCase().indexOf("_.webp") > 0 && (e = e.substring(0, e.indexOf("_.webp"))), e.indexOf("xz.jpg") > 0 && (e = e.replace("xz.jpg", ".jpg")), l.length > 1 && (d = parseInt(l[1]), 3 == l.length)) {
                var p = l[2];
                s = parseInt(p.substring(0, p.indexOf(".")))
            }
            if (0 == d && (d = t), 0 == s && (s = a), t > d || a > s) return n && "" != n && (e += "_" + n + ".jpg"), r ? e + "_.webp" : e;
            var u = i.getFixSize(t, a);
            if (!u) return n && "" != n && (e += "_" + n + ".jpg"), r ? e + "_.webp" : e;
            var f = u.width,
                g = u.height,
                m = "";
            if (g) {
                var w = f + "x" + g;
                i.cutSize[w] && d >= s && Math.round(d / s) < 2 && (w += "xz"), w += n, m = "_" + w + ".jpg"
            }
            return m ? (r ? e = e + m + "_.webp" : e += m, e) : e
        }, i.getFixSize = function(e, t) {
            var r = e / t;
            if (l[e + "x" + t]) return l[e + "x" + t];
            var n = e >= t ? e : t,
                a = null,
                o = i.defaultWidth,
                c = e;
            if (t > 0 && t > e && (c = t), o[0] >= c) n = o[0];
            else
                for (var d = 0, s = o.length; s > d; d++) {
                    if (d == s - 1) {
                        n = o[d];
                        break
                    }
                    if (o[d] >= c) {
                        var p = i.defaultSize[o[d]];
                        if (1 != p.length) {
                            n = o[d];
                            break
                        }
                        if (a = p[0], Math.abs(r - n / a) <= .5) {
                            n = o[d];
                            break
                        }
                    }
                }
            var u = i.defaultSize[n];
            if (!u) return null;
            if (1 == u.length) a = u[0], suffix = "_" + n + "x" + u[0] + ".jpg";
            else
                for (var d = 0, s = u.length; s > d; d++) {
                    if (d == s - 1) {
                        a = u[d];
                        break
                    }
                    if (n / u[d] <= r && n / u[d + 1] > r) {
                        a = u[d];
                        break
                    }
                }
            var p = {
                width: n,
                height: a
            };
            return l[e + "x" + t] = p, p
        };
        var f = function(e) {
            var t = e.attr("unable-fix");
            return t ? !1 : !0
        };
        i.enableResize = function(e, t) {
            if (!f(t)) return !1;
            var i = /\.gif$/i.test(e);
            return i ? !1 : /.+\.aliimg\.com/i.test(e) || /.+\.alicdn\.com/i.test(e) || /.+\.tbcdn\.com/i.test(e) ? !0 : !1
        };
        var g = [];
        i.on = function(e) {
                g.push(e)
            }, i.pause = function() {
                a = !1
            }, i.resume = function() {
                a = !0, i.autoShow()
            }, i.autoShow = function(t) {
                if (a)
                    for (var r = e("img[" + d + "]"), n = 0, o = r.length; o > n; n++) i.loadImage(r.get(n), t)
            }, i.isAutoLoad = function() {
                return s
            }, i.loadImage = function(t, n) {
                var a = document.documentElement.clientHeight,
                    o = window.scrollY,
                    l = e(t),
                    s = l.attr(d),
                    p = l.attr("load-finished");
                if (n || !p || "true" != p) {
                    var u = l.attr("loading");
                    if (!u && "true" != u && s) {
                        s = s.replace(/\s/g, ""), s.indexOf("?") > 0 && (s = s.substring(0, s.indexOf("?"))), s = s.replace(/img\.china\.alibaba\.com/, "cbu01.alicdn.com"), s = s.replace(/gtms[\d]{2}\.alicdn\.com/, "gw.alicdn.com"), s = s.replace(/cbu[\d]{2}\.alicdn\.com/, "cbu01.alicdn.com"), s = s.replace(/style\.c\.aliimg\.com/, "astyle.alicdn.com");
                        var f = l.height(),
                            m = l.parent();
                        m && 1 == m.children().length && (f = m.height());
                        var w = l.offset().top;
                        if (a + o >= w && w + f >= o) {
                            if (s && !i.enableResize(s, l)) return l.attr("src", s), void l.attr(d, null);
                            s = s.replace(/\.search\./, ".");
                            var h = l.width();
                            if (t.parentElement && "p" == t.parentElement.tagName.toLowerCase() && (h = t.parentElement.offsetWidth), m && 1 == m.children().length && (h = m.width()), 0 == h && (h = l.css("width"))) try {
                                h = parseInt(h)
                            } catch (x) {
                                h = 0
                            }
                            h > screen.width && (h = screen.width, l.css("width", h + "px"));
                            var v = new Date;
                            l.on("load", function() {
                                if (c[this.src] = (new Date).getTime() - v.getTime(), g)
                                    for (var e in g) g[e].call(this);
                                l.attr("load-finished", "true"), l.attr("loading", null), l.attr(d, null)
                            }), l.attr("onerror", "if(this.getAttribute('load-finished')){return;}this.src='" + s + "';this.setAttribute('load-finished',true)");
                            var b = r,
                                S = l.attr("no-webp");
                            S && (r = !1);
                            var A = i.getFillSize(s, h, f);
                            r = b, l.attr("src", A), l.attr("loading", !0)
                        }
                    }
                }
            }, window.ImageControl = i,
            function(e) {
                var e = e,
                    r = null;
                e(document).ready(function() {
                    var c = window.pageLength || e("#pagecontent_length").val(),
                        l = window.pageSpeedConfig || e("#pagespeed_config").val();
                    if (l && c) {
                        if (a = l.autoFixFlag ? l.autoFixFlag : !1, l.lazyAttr && (d = l.lazyAttr), window.performance) {
                            var s = window.performance.timing,
                                p = s.responseEnd - s.responseStart,
                                u = 1e3 * c / (1024 * p);
                            r = u;
                            var f = l;
                            t(f) && (f = JSON.parse(f));
                            var g = f.quality;
                            if (g)
                                for (var m = g.split(";"), w = 0, h = m.length; h > w; w++) {
                                    var x = m[w],
                                        g = x.split(":");
                                    if (u >= g[0]) {
                                        n = g[1];
                                        break
                                    }
                                }
                            var v = f.dpr;
                            v && (0 > u || u >= v) && (o = !0)
                        }
                        if (!l.globalSwitch) return
                    }
                    if (a)
                        for (var b = document.getElementsByTagName("img"), w = 0, S = b.length; S > w; w++) {
                            var A = b[w].getAttribute(d);
                            if (!A || "" == A) {
                                var y = b[w].getAttribute("onerror");
                                if (!y) {
                                    var j = b[w].getAttribute("src");
                                    j && i.enableResize(j, e(b[w])) && (j.indexOf("?") > 0 && (j = j.substring(0, j.indexOf("?"))), b[w].setAttribute(d, j), b[w].removeAttribute("src"))
                                }
                            }
                        }
                })
            }(e)
    }
}(window.jQuery || window.Zepto);
