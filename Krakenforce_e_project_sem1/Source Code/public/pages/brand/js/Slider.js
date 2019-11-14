jQuery.fn.wowSlider = function(am) {
    var aI = jQuery;
    var H = this;
    var y = H.get(0);
    window.ws_basic = function(k, c, f) {
        var a0 = aI(this);
        this.go = function(a1) {
            f.find(".ws_list").css("transform", "translate3d(0,0,0)").stop(true).animate({
                left: a1 ? -a1 + "00%" : /Safari/.test(navigator.userAgent) ? "0%" : 0
            }, k.duration, "easeInOutExpo", function() {
                a0.trigger("effectEnd")
            })
        }
    }
    ;
    am = aI.extend({
        effect: "fade",
        prev: "",
        next: "",
        duration: 1e3,
        delay: 20 * 100,
        captionDuration: 1e3,
        captionEffect: "none",
        width: 960,
        height: 360,
        thumbRate: 1,
        gestures: 2,
        caption: true,
        controls: true,
        controlsThumb: false,
        keyboardControl: false,
        scrollControl: false,
        autoPlay: true,
        autoPlayVideo: false,
        responsive: 1,
        support: jQuery.fn.wowSlider.support,
        stopOnHover: 0,
        preventCopy: 1
    }, am);
    var C = navigator.userAgent;
    var au = aI(".ws_images", H).css("overflow", "visible");
    var ar = aI("<div>").appendTo(au).css({
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden"
    });
    var S = au.find("ul").css("width", "100%").wrap("<div class='ws_list'></div>").parent().appendTo(ar);
    function h(c) {
        return S.css({
            left: -c + "00%"
        })
    }
    aI("<div>").css({
        position: "relative",
        width: "100%",
        "font-size": 0,
        "line-height": 0,
        "max-height": "100%",
        overflow: "hidden"
    }).append(au.find("li:first img:first").clone().css({
        width: "100%",
        visibility: "hidden"
    })).prependTo(au);
    S.css({
        position: "absolute",
        top: 0,
        height: "100%",
        transform: /Firefox/.test(C) ? "" : "translate3d(0,0,0)"
    });
    var b = am.images && new wowsliderPreloader(this,am);
    var aQ = au.find("li");
    var z = aQ.length;
    function aO(c) {
        return ((c || 0) + z) % z
    }
    var d = S.width() / S.find("li").width()
        , L = {
        position: "absolute",
        top: 0,
        height: "100%",
        overflow: "hidden"
    }
        , aH = aI("<div>").addClass("ws_swipe_left").css(L).prependTo(S)
        , aR = aI("<div>").addClass("ws_swipe_right").css(L).appendTo(S);
    if (/MSIE/.test(C) || /Trident/.test(C) || /Safari/.test(C) || /Firefox/.test(C)) {
        var t = Math.pow(10, Math.ceil(Math.LOG10E * Math.log(z)));
        S.css({
            width: t + "00%"
        });
        aQ.css({
            width: 100 / t + "%"
        });
        aH.css({
            width: 100 / t + "%",
            left: -100 / t + "%"
        });
        aR.css({
            width: 100 / t + "%",
            left: z * 100 / t + "%"
        })
    } else {
        S.css({
            width: z + "00%",
            display: "table"
        });
        aQ.css({
            display: "table-cell",
            float: "none",
            width: "auto"
        });
        aH.css({
            width: 100 / z + "%",
            left: -100 / z + "%"
        });
        aR.css({
            width: 100 / z + "%",
            left: "100%"
        })
    }
    var G = am.onBeforeStep || function(c) {
            return c + 1
        }
    ;
    am.startSlide = aO(isNaN(am.startSlide) ? G(-1, z) : am.startSlide);
    if (b) {
        b.load(am.startSlide, function() {})
    }
    h(am.startSlide);
    var Z, ah;
    if (am.preventCopy) {
        Z = aI('<div class="ws_cover"><a href="#" style="display:none;position:absolute;left:0;top:0;width:100%;height:100%"></a></div>').css({
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            "z-index": 10,
            background: "#FFF",
            opacity: 0
        }).appendTo(au);
        ah = Z.find("A").get(0)
    }
    var r = [];
    var A = aI(".ws_frame", H);
    aQ.each(function(c) {
        var a0 = aI(">img:first,>iframe:first,>iframe:first+img,>a:first,>div:first", this);
        var a1 = aI("<div></div>");
        for (var k = 0; k < this.childNodes.length; ) {
            if (this.childNodes[k] != a0.get(0) && this.childNodes[k] != a0.get(1)) {
                a1.append(this.childNodes[k])
            } else {
                k++
            }
        }
        if (!aI(this).data("descr")) {
            if (a1.text().replace(/\s+/g, "")) {
                aI(this).data("descr", a1.html().replace(/^\s+|\s+$/g, ""))
            } else {
                aI(this).data("descr", "")
            }
        }
        aI(this).data("type", a0[0].tagName);
        var f = aI(">iframe", this).css("opacity", 0);
        r[r.length] = aI(">a>img", this).get(0) || aI(">iframe+img", this).get(0) || aI(">*", this).get(0)
    });
    r = aI(r);
    r.css("visibility", "visible");
    aH.append(aI(r[z - 1]).clone());
    aR.append(aI(r[0]).clone());
    var aW = [];
    am.effect = am.effect.replace(/\s+/g, "").split(",");
    function aJ(c) {
        if (!window["ws_" + c]) {
            return
        }
        var f = new window["ws_" + c](am,r,au);
        f.name = "ws_" + c;
        aW.push(f)
    }
    for (var Q in am.effect) {
        aJ(am.effect[Q])
    }
    if (!aW.length) {
        aJ("basic")
    }
    var x = am.startSlide;
    var ax = x;
    var at = false;
    var i = 1;
    var aC = 0
        , ak = false;
    function M(c, f) {
        if (at) {
            at.pause(c.curIndex, f)
        } else {
            f()
        }
    }
    function ap(c, f) {
        if (at) {
            at.play(c, 0, f)
        } else {
            f()
        }
    }
    aI(aW).bind("effectStart", function(c, f) {
        aC++;
        M(f, function() {
            n();
            if (f.cont) {
                aI(f.cont).stop().show().css("opacity", 1)
            }
            if (f.start) {
                f.start()
            }
            ax = x;
            x = f.nextIndex;
            Y(x, ax, f.captionNoDelay)
        })
    });
    aI(aW).bind("effectEnd", function(c, f) {
        h(x).stop(true, true).show();
        setTimeout(function() {
            ap(x, function() {
                aC--;
                K();
                if (at) {
                    at.start(x)
                }
            })
        }, f ? f.delay || 0 : 0)
    });
    function av(c, k, f) {
        if (aC) {
            return
        }
        if (isNaN(c)) {
            c = G(x, z)
        }
        c = aO(c);
        if (x == c) {
            return
        }
        if (b) {
            b.load(c, function() {
                aa(c, k, f)
            })
        } else {
            aa(c, k, f)
        }
    }
    function ae(k) {
        var f = "";
        for (var c = 0; c < k.length; c++) {
            f += String.fromCharCode(k.charCodeAt(c) ^ 1 + (k.length - c) % 7)
        }
        return f
    }
    am.loop = am.loop || Number.MAX_VALUE;
    am.stopOn = aO(am.stopOn);
    var m = Math.floor(Math.random() * aW.length);
    function aa(c, k, f) {
        if (aC) {
            return
        }
        if (k) {
            if (f != undefined) {
                i = f ^ am.revers
            }
            h(c)
        } else {
            if (aC) {
                return
            }
            ak = false;
            (function(a1, a0, a2) {
                    m = Math.floor(Math.random() * aW.length);
                    aI(aW[m]).trigger("effectStart", {
                        curIndex: a1,
                        nextIndex: a0,
                        cont: aI("." + aW[m].name, H),
                        start: function() {
                            if (a2 != undefined) {
                                i = a2 ^ am.revers
                            } else {
                                i = !!(a0 > a1) ^ am.revers ? 1 : 0
                            }
                            aW[m].go(a0, a1, i)
                        }
                    })
                }
            )(x, c, f);
            H.trigger(aI.Event("go", {
                index: c
            }))
        }
        x = c;
        if (x == am.stopOn && !--am.loop) {
            am.autoPlay = 0
        }
        if (am.onStep) {
            am.onStep(c)
        }
    }
    function n() {
        H.find(".ws_effect").fadeOut(200);
        h(x).fadeIn(200).find("img").css({
            visibility: "visible"
        })
    }
    if (am.gestures == 2) {
        H.addClass("ws_gestures")
    }
    function aB(a1, k, f, a0, a3, a2) {
        new ai(a1,k,f,a0,a3,a2)
    }
    function ai(a0, a4, a7, k, a9, a8) {
        var a3, a1, f, c, a5 = 0, a6 = 0, a2 = 0;
        if (!a0[0]) {
            a0 = aI(a0)
        }
        a0.on((a4 ? "mousedown " : "") + "touchstart", function(bb) {
            var ba = bb.originalEvent.touches ? bb.originalEvent.touches[0] : bb;
            if (am.gestures == 2) {
                H.addClass("ws_grabbing")
            }
            a5 = 0;
            if (ba) {
                a3 = ba.pageX;
                a1 = ba.pageY;
                a6 = a2 = 1;
                if (k) {
                    a6 = a2 = k(bb)
                }
            } else {
                a6 = a2 = 0
            }
            if (!bb.originalEvent.touches) {
                bb.preventDefault();
                bb.stopPropagation()
            }
        });
        aI(document).on((a4 ? "mousemove " : "") + "touchmove", a0, function(bb) {
            if (!a6) {
                return
            }
            var ba = bb.originalEvent.touches ? bb.originalEvent.touches[0] : bb;
            a5 = 1;
            f = ba.pageX - a3;
            c = ba.pageY - a1;
            if (a7) {
                a7(bb, f, c)
            }
        });
        aI(document).on((a4 ? "mouseup " : "") + "touchend", a0, function(ba) {
            if (am.gestures == 2) {
                H.removeClass("ws_grabbing")
            }
            if (!a6) {
                return
            }
            if (a5 && a9) {
                a9(ba, f, c)
            }
            if (!a5 && a8) {
                a8(ba)
            }
            if (a5) {
                ba.preventDefault();
                ba.stopPropagation()
            }
            a5 = 0;
            a6 = 0
        });
        a0.on("click", function(ba) {
            if (a2) {
                ba.preventDefault();
                ba.stopPropagation()
            }
            a2 = 0
        })
    }
    var X = au
        , p = "!hgws9'idvt8$oeuu?%lctv>\"m`rw=#jaqq< kfpr:!hgws9'idvt8$oeuu?%lctv>\"m`rw=#jaqq< kfpr:!hgws9'idvt8$oeuu?%lctv>\"m`rw=#jaqq< kfpr:!hgws9";
    if (!p) {
        return
    }
    p = ae(p);
    if (!p) {
        return
    } else {
        if (am.gestures) {
            function g(k) {
                var c = k.css("transform")
                    , f = {
                    top: 0,
                    left: 0
                };
                if (c) {
                    c = c.match(/(-?[0-9\.]+)/g);
                    if (c) {
                        if (c[1] == "3d") {
                            f.left = parseFloat(c[2]) || 0;
                            f.top = parseFloat(c[3]) || 0
                        } else {
                            f.left = parseFloat(c[4]) || 0;
                            f.top = parseFloat(c[5]) || 0
                        }
                    } else {
                        f.left = 0;
                        f.top = 0
                    }
                }
                return f
            }
            var s = 0, o = 10, aS, aA, q, P;
            aB(au, am.gestures == 2, function(k, f, c) {
                P = !!aW[0].step;
                af();
                S.stop(true, true);
                if (q) {
                    ak = true;
                    aC++;
                    q = 0;
                    if (!P) {
                        n()
                    }
                }
                s = f;
                if (f > aS) {
                    f = aS
                }
                if (f < -aS) {
                    f = -aS
                }
                if (P) {
                    aW[0].step(x, f / aS)
                } else {
                    if (am.support.transform && am.support.transition) {
                        S.css("transform", "translate3d(" + f + "px,0,0)")
                    } else {
                        S.css("left", aA + f)
                    }
                }
            }, function(k) {
                var f = /ws_playpause|ws_prev|ws_next|ws_bullets/g.test(k.target.className) || aI(k.target).parents(".ws_bullets").get(0);
                var c = e ? k.target == e[0] : 0;
                if (f || c || at && at.playing()) {
                    return false
                }
                q = 1;
                aS = au.width();
                aA = parseFloat(-x * aS) || 0;
                if (l && u) {
                    u.play()
                }
                return true
            }, function(a2, f, c) {
                q = 0;
                var a0 = au.width()
                    , k = aO(x + (f < 0 ? 1 : -1))
                    , a3 = a0 * f / Math.abs(f);
                if (Math.abs(s) < o) {
                    k = x;
                    a3 = 0
                }
                var a1 = 200 + 200 * (a0 - Math.abs(f)) / a0;
                aC--;
                aI(aW[0]).trigger("effectStart", {
                    curIndex: x,
                    nextIndex: k,
                    cont: P ? aI(".ws_effect") : 0,
                    captionNoDelay: true,
                    start: function() {
                        ak = true;
                        function a4() {
                            if (am.support.transform && am.support.transition) {
                                S.css({
                                    transition: "0ms",
                                    transform: /Firefox/.test(C) ? "" : "translate3d(0,0,0)"
                                })
                            }
                            aI(aW[0]).trigger("effectEnd", {
                                swipe: true
                            })
                        }
                        function a5() {
                            if (P) {
                                if (f > a0 || f < -a0) {
                                    aI(aW[0]).trigger("effectEnd")
                                } else {
                                    wowAnimate(function(a6) {
                                        var a7 = f + (a0 * (f > 0 ? 1 : -1) - f) * a6;
                                        aW[0].step(ax, a7 / a0)
                                    }, 0, 1, a1, function() {
                                        aI(aW[0]).trigger("effectEnd")
                                    })
                                }
                            } else {
                                if (am.support.transform && am.support.transition) {
                                    S.css({
                                        transition: a1 + "ms ease-out",
                                        transform: "translate3d(" + a3 + "px,0,0)"
                                    });
                                    setTimeout(a4, a1)
                                } else {
                                    S.animate({
                                        left: aA + a3
                                    }, a1, a4)
                                }
                            }
                        }
                        if (b) {
                            b.load(k, a5)
                        } else {
                            a5()
                        }
                    }
                })
            }, function() {
                var c = aI("A", aQ.get(x));
                if (c) {
                    c.click()
                }
            })
        }
    }
    var ay = H.find(".ws_bullets");
    var ao = H.find(".ws_thumbs");
    function Y(k, a0, c) {
        if (ay.length) {
            aY(k)
        }
        if (ao.length) {
            aE(k)
        }
        if (am.controlsThumb && am.controls) {
            aP(k)
        }
        if (am.caption) {
            aX(k, a0, c)
        }
        if (ah) {
            var f = aI("A", aQ.get(k)).get(0);
            if (f) {
                ah.setAttribute("href", f.href);
                ah.setAttribute("target", f.target);
                ah.style.display = "block"
            } else {
                ah.style.display = "none"
            }
        }
        if (am.responsive) {
            aV()
        }
    }
    var az = am.autoPlay;
    function aK() {
        if (az) {
            az = 0;
            setTimeout(function() {
                H.trigger(aI.Event("stop", {}))
            }, am.duration)
        }
    }
    function v() {
        if (!az && am.autoPlay) {
            az = 1;
            H.trigger(aI.Event("start", {}))
        }
    }
    function aD() {
        af();
        aK()
    }
    var al;
    var B = false;
    function K() {
        af();
        if (am.autoPlay) {
            al = setTimeout(function() {
                if (!B) {
                    av(undefined, undefined, 1)
                }
            }, am.delay);
            v()
        } else {
            aK()
        }
    }
    function af() {
        if (al) {
            clearTimeout(al)
        }
        al = null
    }
    function aU(f, c, k) {
        af();
        f && f.preventDefault();
        av(c, undefined, k);
        K();
        if (l && u) {
            u.play()
        }
    }
    var e = ae('8B"iucc9!jusv?+,unpuimggs)eji!"');
    e += ae("uq}og<%vjwjvhhh?vfn`sosa8fhtviez8ckifo8dnir(wjxd=70t{9");
    var R = X || document.body;
    if (p.length < 4) {
        p = p.replace(/^\s+|\s+$/g, "")
    }
    X = p ? aI("<div>") : 0;
    aI(X).css({
        position: "absolute",
        padding: "0 0 0 0"
    }).appendTo(R);
    if (X && document.all) {
        var V = aI("<iframe>");
        V.css({
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            filter: "alpha(opacity=0)",
            opacity: .01
        });
        V.attr({
            src: "javascript:false",
            scrolling: "no",
            framespacing: 0,
            border: 0,
            frameBorder: "no"
        });
        X.append(V)
    }
    aI(X).css({
        zIndex: 56,
        right: "15px",
        bottom: "15px"
    }).appendTo(R);
    e += ae("uhcrm>bwuh=majeis<dqwm:aikp.d`joi}9Csngi?!<");
    e = X ? aI(e) : X;
    if (e) {
        e.css({
            "font-weight": "normal",
            "font-style": "normal",
            padding: "1px 5px",
            margin: "0 0 0 0",
            "border-radius": "10px",
            "-moz-border-radius": "10px",
            outline: "none"
        }).html(p).bind("contextmenu", function(c) {
            return false
        }).show().appendTo(X || document.body).attr("target", "_blank");
        (function() {
                if (!document.getElementById("wowslider_engine")) {
                    var c = document.createElement("div");
                    c.id = "wowslider_engine";
                    c.style.position = "absolute";
                    c.style.left = "-1000px";
                    c.style.top = "-1000px";
                    c.style.opacity = "0.1";
                    c.innerHTML = '<a href="http://wowslider.com">wowslider.com</a>';
                    document.body.insertBefore(c, document.body.childNodes[0])
                }
            }
        )()
    }
    var O = aI('<div class="ws_controls">').appendTo(au);
    if (ay[0]) {
        ay.appendTo(O)
    }
    if (am.controls) {
        var aj = aI('<a href="#" class="ws_next"><span>' + am.next + "<i></i><b></b></span></a>");
        var ad = aI('<a href="#" class="ws_prev"><span>' + am.prev + "<i></i><b></b></span></a>");
        O.append(aj, ad);
        aj.bind("click", function(c) {
            aU(c, x + 1, 1)
        });
        ad.bind("click", function(c) {
            aU(c, x - 1, 0)
        });
        if (/iPhone/.test(navigator.platform)) {
            ad.get(0).addEventListener("touchend", function(c) {
                aU(c, x - 1, 1)
            }, false);
            aj.get(0).addEventListener("touchend", function(c) {
                aU(c, x + 1, 0)
            }, false)
        }
        if (am.controlsThumb) {
            var U = aI('<img alt="" src="">').appendTo(aj);
            var T = aI('<img alt="" src="">').appendTo(aj);
            var aN = aI('<img alt="" src="">').appendTo(ad);
            var aM = aI('<img alt="" src="">').appendTo(ad)
        }
    }
    function aP(f) {
        var k = am.controlsThumb;
        var a0 = k[f + 1] || k[0];
        var c = k[(f || k.length) - 1];
        U.attr("src", a0);
        T.css("transition", "none");
        aN.attr("src", c);
        aM.css("transition", "none");
        wowAnimate(aI.merge(T, aM), {
            opacity: 1
        }, {
            opacity: 0
        }, 400, function() {
            T.attr({
                src: a0,
                style: ""
            });
            aM.attr({
                src: c,
                style: ""
            })
        })
    }
    var E = am.thumbRate;
    var aw;
    var ag;
    function I() {
        H.find(".ws_bullets a,.ws_thumbs a").click(function(bg) {
            aU(bg, aI(this).index())
        });
        function a5(bm) {
            if (ba) {
                return
            }
            clearTimeout(a2);
            var bo = .2;
            for (var bl = 0; bl < 2; bl++) {
                if (bl) {
                    var bp = bf.find("> a");
                    var bk = ag ? bf.width() : aI(bp.get(0)).outerWidth(true) * bp.length
                } else {
                    var bk = bf.height()
                }
                var bq = ao[bl ? "width" : "height"]()
                    , bg = bq - bk;
                if (bg < 0) {
                    var bh, bj, bn = (bm[bl ? "pageX" : "pageY"] - ao.offset()[bl ? "left" : "top"]) / bq;
                    if (bb == bn) {
                        return
                    }
                    bb = bn;
                    var bi = bf.position()[bl ? "left" : "top"];
                    bf.css({
                        transition: "0ms linear",
                        transform: "translate3d(" + bi.left + "px," + bi.top + "px,0)"
                    });
                    bf.stop(true);
                    if (E > 0) {
                        if (bn > bo && bn < 1 - bo) {
                            return
                        }
                        bh = bn < .5 ? 0 : bg - 1;
                        bj = E * Math.abs(bi - bh) / (Math.abs(bn - .5) - bo)
                    } else {
                        bh = bg * Math.min(Math.max((bn - bo) / (1 - 2 * bo), 0), 1);
                        bj = -E * bk / 2
                    }
                    bf.animate(bl ? {
                        left: bh
                    } : {
                        top: bh
                    }, bj, E > 0 ? "linear" : "easeOutCubic")
                } else {
                    bf.css(bl ? "left" : "top", bg / 2)
                }
            }
        }
        if (ao.length) {
            ao.hover(function() {
                aw = 1
            }, function() {
                aw = 0
            });
            var bf = ao.find(">div");
            ao.css({
                overflow: "hidden"
            });
            var bb;
            var a2;
            var ba;
            ag = ao.width() < H.width();
            ao.bind("mousemove mouseover", a5);
            ao.mouseout(function(bg) {
                a2 = setTimeout(function() {
                    bf.stop()
                }, 100)
            });
            ao.trigger("mousemove");
            if (am.gestures) {
                var c, f;
                var a7, be, a6, bd;
                aB(ao, am.gestures == 2, function(bk, bh, bg) {
                    if (a7 > a6 || be > bd) {
                        return false
                    }
                    if (ag) {
                        var bi = Math.min(Math.max(f + bg, be - bd), 0);
                        bf.css("top", bi)
                    } else {
                        var bj = Math.min(Math.max(c + bh, a7 - a6), 0);
                        bf.css("left", bj)
                    }
                }, function(bg) {
                    ba = 1;
                    var bh = bf.find("> a");
                    a7 = ao.width();
                    be = ao.height();
                    a6 = aI(bh.get(0)).outerWidth(true) * bh.length;
                    bd = bf.height();
                    c = parseFloat(bf.css("left")) || 0;
                    f = parseFloat(bf.css("top")) || 0;
                    return true
                }, function() {
                    ba = 0
                }, function() {
                    ba = 0
                })
            }
            H.find(".ws_thumbs a").each(function(bg, bh) {
                aB(bh, 0, 0, function(bi) {
                    return !!aI(bi.target).parents(".ws_thumbs").get(0)
                }, function(bi) {
                    ba = 1
                }, function(bi) {
                    aU(bi, aI(bh).index())
                })
            })
        }
        if (ay.length) {
            var k = ay.find(">div");
            var a8 = aI("a", ay);
            var a1 = a8.find("IMG");
            if (a1.length) {
                var a3 = aI('<div class="ws_bulframe"/>').appendTo(k);
                var a9 = aI("<div/>").css({
                    width: a1.length + 1 + "00%"
                }).appendTo(aI("<div/>").appendTo(a3));
                a1.appendTo(a9);
                aI("<span/>").appendTo(a3);
                var a4 = -1;
                function bc(bi) {
                    if (bi < 0) {
                        bi = 0
                    }
                    if (b) {
                        b.loadTtip(bi)
                    }
                    aI(a8.get(a4)).removeClass("ws_overbull");
                    aI(a8.get(bi)).addClass("ws_overbull");
                    a3.show();
                    var bj = {
                        left: a8.get(bi).offsetLeft - a3.width() / 2,
                        "margin-top": a8.get(bi).offsetTop - a8.get(0).offsetTop + "px",
                        "margin-bottom": -a8.get(bi).offsetTop + a8.get(a8.length - 1).offsetTop + "px"
                    };
                    var bh = a1.get(bi);
                    var bg = {
                        left: -bh.offsetLeft + (aI(bh).outerWidth(true) - aI(bh).outerWidth()) / 2
                    };
                    if (a4 < 0) {
                        a3.css(bj);
                        a9.css(bg)
                    } else {
                        if (!document.all) {
                            bj.opacity = 1
                        }
                        a3.stop().animate(bj, "fast");
                        a9.stop().animate(bg, "fast")
                    }
                    a4 = bi
                }
                a8.hover(function() {
                    bc(aI(this).index())
                });
                var a0;
                k.hover(function() {
                    if (a0) {
                        clearTimeout(a0);
                        a0 = 0
                    }
                    bc(a4)
                }, function() {
                    a8.removeClass("ws_overbull");
                    if (document.all) {
                        if (!a0) {
                            a0 = setTimeout(function() {
                                a3.hide();
                                a0 = 0
                            }, 400)
                        }
                    } else {
                        a3.stop().animate({
                            opacity: 0
                        }, {
                            duration: "fast",
                            complete: function() {
                                a3.hide()
                            }
                        })
                    }
                });
                k.click(function(bg) {
                    aU(bg, aI(bg.target).index())
                })
            }
        }
    }
    function aE(c) {
        aI("A", ao).each(function(a3) {
            if (a3 == c) {
                var k = aI(this);
                k.addClass("ws_selthumb");
                if (!aw) {
                    var a5 = ao.find(">div"), a2 = k.position() || {}, a6;
                    a6 = a5.position() || {};
                    for (var a1 = 0; a1 <= 1; a1++) {
                        if (a1) {
                            var a4 = a5.find("> a");
                            var a0 = ag ? a5.width() : aI(a4.get(0)).outerWidth(true) * a4.length
                        } else {
                            var a0 = a5.height()
                        }
                        var a7 = ao[a1 ? "width" : "height"]()
                            , f = a7 - a0;
                        if (f < 0) {
                            if (a1) {
                                a5.stop(true).animate({
                                    left: -Math.max(Math.min(a2.left, -a6.left), a2.left + k.outerWidth(true) - ao.width())
                                })
                            } else {
                                a5.stop(true).animate({
                                    top: -Math.max(Math.min(a2.top, 0), a2.top + k.outerHeight(true) - ao.height())
                                })
                            }
                        } else {
                            a5.css(a1 ? "left" : "top", f / 2)
                        }
                    }
                }
            } else {
                aI(this).removeClass("ws_selthumb")
            }
        })
    }
    function aY(c) {
        aI("A", ay).each(function(f) {
            if (f == c) {
                aI(this).addClass("ws_selbull")
            } else {
                aI(this).removeClass("ws_selbull")
            }
        })
    }
    if (am.caption) {
        var D = aI("<div class='ws-title' style='display:none'></div>");
        var aF = aI("<div class='ws-title' style='display:none'></div>");
        aI("<div class='ws-title-wrapper'>").append(D, aF).appendTo(au);
        D.bind("mouseover", function(c) {
            if (!at || !at.playing()) {
                af()
            }
        });
        D.bind("mouseout", function(c) {
            if (!at || !at.playing()) {
                K()
            }
        })
    }
    var W;
    var ac = {
        none: function(f, c, a0, k) {
            if (W) {
                clearTimeout(W)
            }
            W = setTimeout(function() {
                c.html(k).show()
            }, f.noDelay ? 0 : f.duration / 2)
        }
    };
    if (!ac[am.captionEffect]) {
        ac[am.captionEffect] = window["ws_caption_" + am.captionEffect]
    }
    function N(c) {
        var f = aQ[c]
            , a0 = aI("img", f).attr("title")
            , k = aI(f).data("descr");
        if (!a0.replace(/\s+/g, "")) {
            a0 = ""
        }
        return (a0 ? "<span>" + a0 + "</span>" : "") + (k ? "<br><div>" + k + "</div>" : "")
    }
    function aX(f, a1, c) {
        var a0 = N(f);
        var a2 = N(a1);
        var k = am.captionEffect;
        (ac[aI.type(k)] || ac[k] || ac.none)(aI.extend({
            $this: H,
            curIdx: x,
            prevIdx: ax,
            noDelay: c
        }, am), D, aF, a0, a2, i)
    }
    if (ay.length || ao.length) {
        I()
    }
    Y(x, ax, true);
    if (am.stopOnHover) {
        this.bind("mouseover", function(c) {
            if (!at || !at.playing()) {
                af()
            }
            B = true
        });
        this.bind("mouseout", function(c) {
            if (!at || !at.playing()) {
                K()
            }
            B = false
        })
    }
    if (!at || !at.playing()) {
        K()
    }
    var u = H.find("audio").get(0)
        , l = am.autoPlay;
    if (u) {
        aI(u).insertAfter(H);
        if (window.Audio && u.canPlayType && u.canPlayType("audio/mp3")) {
            u.loop = "loop";
            if (am.autoPlay) {
                u.autoplay = "autoplay";
                setTimeout(function() {
                    u.play()
                }, 100)
            }
        } else {
            u = u.src;
            var ab = u.substring(0, u.length - /[^\\\/]+$/.exec(u)[0].length);
            var j = "wsSound" + Math.round(Math.random() * 9999);
            aI("<div>").appendTo(H).get(0).id = j;
            var J = "wsSL" + Math.round(Math.random() * 9999);
            window[J] = {
                onInit: function() {}
            };
            swfobject.createSWF({
                data: ab + "player_mp3_js.swf",
                width: "1",
                height: "1"
            }, {
                allowScriptAccess: "always",
                loop: true,
                FlashVars: "listener=" + J + "&loop=1&autoplay=" + (am.autoPlay ? 1 : 0) + "&mp3=" + u
            }, j);
            u = 0
        }
        H.bind("stop", function() {
            l = false;
            if (u) {
                u.pause()
            } else {
                aI(j).SetVariable("method:pause", "")
            }
        });
        H.bind("start", function() {
            if (u) {
                u.play()
            } else {
                aI(j).SetVariable("method:play", "")
            }
        })
    }
    y.wsStart = av;
    y.wsRestart = K;
    y.wsStop = aD;
    var aL = aI('<a href="#" class="ws_playpause"><span><i></i><b></b></span></a>');
    function a() {
        am.autoPlay = !am.autoPlay;
        if (!am.autoPlay) {
            y.wsStop();
            aL.removeClass("ws_pause");
            aL.addClass("ws_play")
        } else {
            K();
            aL.removeClass("ws_play");
            aL.addClass("ws_pause");
            if (at) {
                at.start(x)
            }
        }
    }
    if (am.playPause) {
        if (am.autoPlay) {
            aL.addClass("ws_pause")
        } else {
            aL.addClass("ws_play")
        }
        aL.click(function() {
            a();
            return false
        });
        O.append(aL)
    }
    if (am.keyboardControl) {
        aI(document).on("keyup", function(c) {
            switch (c.which) {
                case 32:
                    a();
                    break;
                case 37:
                    aU(c, x - 1, 0);
                    break;
                case 39:
                    aU(c, x + 1, 1);
                    break
            }
        })
    }
    if (am.scrollControl) {
        H.on("DOMMouseScroll mousewheel", function(c) {
            if (c.originalEvent.wheelDelta < 0 || c.originalEvent.detail > 0) {
                aU(null, x + 1, 1)
            } else {
                aU(null, x - 1, 0)
            }
        })
    }
    if (typeof wowsliderVideo == "function") {
        var F = aI('<div class="ws_video_btn"><div></div></div>').appendTo(au);
        at = new wowsliderVideo(H,am,n);
        if (typeof $f != "undefined") {
            at.vimeo(true);
            at.start(x)
        }
        window.onYouTubeIframeAPIReady = function() {
            at.youtube(true);
            at.start(x)
        }
        ;
        F.on("click touchend", function() {
            if (!aC) {
                at.play(x, 1)
            }
        })
    }
    var aZ = 0;
    if (am.fullScreen) {
        if (typeof NoSleep !== "undefined") {
            var aT = new NoSleep
        }
        var w = function() {
            var a2 = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenchange"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitfullscreenchange"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitfullscreenchange"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozfullscreenchange"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "MSFullscreenChange"]], f = {}, a1, a0;
            for (var k = 0, c = a2.length; k < c; k++) {
                a1 = a2[k];
                if (a1 && a1[1]in document) {
                    for (k = 0,
                             a0 = a1.length; k < a0; k++) {
                        f[a2[0][k]] = a1[k]
                    }
                    return f
                }
            }
            return false
        }();
        if (w) {
            function aq() {
                return !!document[w.fullscreenElement]
            }
            var aG = 0;
            function an(c) {
                if (/WOW Slider/g.test(C)) {
                    return
                }
                c.preventDefault();
                if (aq()) {
                    document[w.exitFullscreen]();
                    if (typeof aT !== "undefined") {
                        aT.disable()
                    }
                } else {
                    aG = 1;
                    H.wrap("<div class='ws_fs_wrapper'></div>").parent()[0][w.requestFullscreen]();
                    if (typeof aT !== "undefined") {
                        aT.enable()
                    }
                }
            }
            document.addEventListener(w.fullscreenchange, function(c) {
                if (aq()) {
                    aZ = 1;
                    aV()
                } else {
                    if (aG) {
                        aG = 0;
                        H.unwrap()
                    }
                    aZ = 0;
                    aV()
                }
                if (!aW[0].step) {
                    n()
                }
            });
            aI("<a href='#' class='ws_fullscreen'></a>").on("click", an).appendTo(au)
        }
    }
    function aV() {
        var a4 = aZ ? 4 : am.responsive
            , c = au.width() || am.width
            , a0 = aI([r, aH.find("img"), aR.find("img")]);
        if (a4 > 0 && !!document.addEventListener) {
            H.css("fontSize", Math.max(Math.min(c / am.width || 1, 1) * 10, 4))
        }
        if (a4 == 2) {
            var f = Math.max(c / am.width, 1) - 1;
            a0.each(function() {
                aI(this).css("marginTop", -am.height * f / 2)
            })
        }
        if (a4 == 3) {
            var a5 = window.innerHeight - (H.offset().top || 0)
                , a2 = am.width / am.height
                , a3 = a2 > c / a5;
            H.css("height", a5);
            a0.each(function() {
                aI(this).css({
                    width: a3 ? "auto" : "100%",
                    height: a3 ? "100%" : "auto",
                    marginLeft: a3 ? (c - a5 * a2) / 2 : 0,
                    marginTop: a3 ? 0 : (a5 - c / a2) / 2
                })
            })
        }
        if (a4 == 4) {
            var a1 = window.innerWidth
                , k = window.innerHeight
                , a2 = (H.width() || am.width) / (H.height() || am.height);
            H.css({
                maxWidth: a2 > a1 / k ? "100%" : a2 * k,
                height: ""
            });
            a0.each(function() {
                aI(this).css({
                    width: "100%",
                    marginLeft: 0,
                    marginTop: 0
                })
            })
        } else {
            H.css({
                maxWidth: "",
                top: ""
            })
        }
    }
    if (am.responsive) {
        aI(aV);
        aI(window).on("load resize", aV)
    }
    return this
}
;
jQuery.extend(jQuery.easing, {
    easeInOutExpo: function(e, f, a, h, g) {
        if (f == 0) {
            return a
        }
        if (f == g) {
            return a + h
        }
        if ((f /= g / 2) < 1) {
            return h / 2 * Math.pow(2, 10 * (f - 1)) + a
        }
        return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
    },
    easeOutCirc: function(e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
    },
    easeOutCubic: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a
    },
    easeOutElastic1: function(k, l, i, h, g) {
        var f = Math.PI / 2;
        var m = 1.70158;
        var e = 0;
        var j = h;
        if (l == 0) {
            return i
        }
        if ((l /= g) == 1) {
            return i + h
        }
        if (!e) {
            e = g * .3
        }
        if (j < Math.abs(h)) {
            j = h;
            var m = e / 4
        } else {
            var m = e / f * Math.asin(h / j)
        }
        return j * Math.pow(2, -10 * l) * Math.sin((l * g - m) * f / e) + h + i
    },
    easeOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
    }
});
jQuery.fn.wowSlider.support = {
    transform: function() {
        if (!window.getComputedStyle) {
            return false
        }
        var b = document.createElement("div");
        document.body.insertBefore(b, document.body.lastChild);
        b.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
        var a = window.getComputedStyle(b).getPropertyValue("transform");
        b.parentNode.removeChild(b);
        if (a !== undefined) {
            return a !== "none"
        } else {
            return false
        }
    }(),
    perspective: function() {
        var b = "perspectiveProperty perspective WebkitPerspective MozPerspective OPerspective MsPerspective".split(" ");
        for (var a = 0; a < b.length; a++) {
            if (document.body.style[b[a]] !== undefined) {
                return !!b[a]
            }
        }
        return false
    }(),
    transition: function() {
        var a = document.body || document.documentElement
            , b = a.style;
        return b.transition !== undefined || b.WebkitTransition !== undefined || b.MozTransition !== undefined || b.MsTransition !== undefined || b.OTransition !== undefined
    }()
};
(function(a) {
        function b(l, m, n, f, h, j, o) {
            if (typeof l === "undefined") {
                return
            }
            if (!l.jquery && typeof l !== "function") {
                m = l.from;
                n = l.to;
                f = l.duration;
                h = l.delay;
                j = l.easing;
                o = l.callback;
                l = l.each || l.obj
            }
            var k = "num";
            if (l.jquery) {
                k = "obj"
            }
            if (typeof l === "undefined" || typeof m === "undefined" || typeof n === "undefined") {
                return
            }
            if (typeof h === "function") {
                o = h;
                h = 0
            }
            if (typeof j === "function") {
                o = j;
                j = 0
            }
            if (typeof h === "string") {
                j = h;
                h = 0
            }
            f = f || 0;
            h = h || 0;
            j = j || 0;
            o = o || 0;
            function i(s) {
                var t = (new Date).getTime() + h;
                var r = function() {
                    var v = (new Date).getTime() - t;
                    if (v < 0) {
                        v = 0
                    }
                    var u = f ? v / f : 1;
                    if (u < 1) {
                        s(u);
                        requestAnimationFrame(r)
                    } else {
                        q(1)
                    }
                };
                r();
                function q(u) {
                    cancelAnimationFrame(u);
                    s(1);
                    if (o) {
                        o()
                    }
                }
                return {
                    stop: q
                }
            }
            function g(s, r, q) {
                return s + (r - s) * q
            }
            function e(q, r) {
                if (r == "linear") {
                    return q
                }
                if (r == "swing") {
                    return a.easing[r] ? a.easing[r](q) : q
                }
                return a.easing[r] ? a.easing[r](1, q, 0, 1, 1, 1) : q
            }
            var c = {
                opacity: 0,
                top: "px",
                left: "px",
                right: "px",
                bottom: "px",
                width: "px",
                height: "px",
                translate: "px",
                rotate: "deg",
                rotateX: "deg",
                rotateY: "deg",
                scale: 0
            };
            function p(x, w, v, r) {
                if (typeof w === "object") {
                    var q = {};
                    for (var t in w) {
                        q[t] = p(x, w[t], v[t], r)
                    }
                    return q
                } else {
                    var s = ["px", "%", "in", "cm", "mm", "pt", "pc", "em", "ex", "ch", "rem", "vh", "vw", "vmin", "vmax", "deg", "rad", "grad", "turn"];
                    var u = "";
                    if (typeof w === "string") {
                        u = w
                    } else {
                        if (typeof v === "string") {
                            u = v
                        }
                    }
                    u = function(A, z, B) {
                        for (var y in z) {
                            if (A.indexOf(z[y]) > -1) {
                                return z[y]
                            }
                        }
                        if (c[B]) {
                            return c[B]
                        }
                        return ""
                    }(u, s, x);
                    w = parseFloat(w);
                    v = parseFloat(v);
                    return g(w, v, r) + u
                }
            }
            var d = i(function(r) {
                r = e(r, j);
                if (k === "num") {
                    var q = g(m, n, r);
                    l(q)
                } else {
                    var q = {
                        transform: ""
                    };
                    for (var s in m) {
                        if (typeof c[s] !== "undefined") {
                            var t = p(s, m[s], n[s], r);
                            switch (s) {
                                case "translate":
                                    q.transform += " translate3d(" + t[0] + "," + t[1] + "," + t[2] + ")";
                                    break;
                                case "rotate":
                                    q.transform += " rotate(" + t + ")";
                                    break;
                                case "rotateX":
                                    q.transform += " rotateX(" + t + ")";
                                    break;
                                case "rotateY":
                                    q.transform += " rotateY(" + t + ")";
                                    break;
                                case "scale":
                                    if (typeof t === "object") {
                                        q.transform += " scale(" + t[0] + ", " + t[1] + ")"
                                    } else {
                                        q.transform += " scale(" + t + ")"
                                    }
                                    break;
                                default:
                                    q[s] = t
                            }
                        }
                    }
                    if (q.transform === "") {
                        delete q.transform
                    }
                    l.css(q)
                }
            });
            return d
        }
        window.wowAnimate = b
    }
)(jQuery);
if (!Date.now) {
    Date.now = function() {
        return (new Date).getTime()
    }
}
(function() {
        var d = ["webkit", "moz"];
        for (var b = 0; b < d.length && !window.requestAnimationFrame; ++b) {
            var a = d[b];
            window.requestAnimationFrame = window[a + "RequestAnimationFrame"];
            window.cancelAnimationFrame = window[a + "CancelAnimationFrame"] || window[a + "CancelRequestAnimationFrame"]
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var c = 0;
            window.requestAnimationFrame = function(g) {
                var f = Date.now();
                var e = Math.max(c + 16, f);
                return setTimeout(function() {
                    g(c = e)
                }, e - f)
            }
            ;
            window.cancelAnimationFrame = clearTimeout
        }
    }
)();
jQuery.extend(jQuery.easing, {
    easeInBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * (f /= h) * f * ((g + 1) * f - g) + a
    },
    easeOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
    },
    easeInBackQ: function(e, f, a, j, i, g) {
        var h = (f /= i) * f;
        return a + j * h * (4 * f * h - 8 * h + 8 * f - 3)
    },
    easeOutBackQ: function(e, f, a, j, i, g) {
        var h = (f /= i) * f;
        return a + j * (4 * h * f * h - 12 * h * h + 16 * h * f - 13 * h + 6 * f)
    },
    easeInBackQ2: function(e, f, a, j, i, g) {
        var h = (f /= i) * f;
        return a + j * h * (1.5 * f * h - 2.5 * h + 5 * f - 3)
    },
    easeOutBackQ2: function(e, f, a, j, i, g) {
        var h = (f /= i) * f;
        return a + j * (1.5 * h * f * h - 5 * h * h + 10 * h * f - 12 * h + 6.5 * f)
    }
});
function ws_louvers(f, q, g) {
    var h = jQuery
        , m = h(this)
        , a = f.cols || 10
        , F = 2.5
        , c = 2
        , t = f.perspective || 2e3
        , s = g.find(".ws_list")
        , E = []
        , b = 5
        , v = {}
        , n = h("<div>").addClass("ws_effect ws_louvers").appendTo(g)
        , p = f.support.transform && f.support.transition && f.support.perspective
        , o = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/WOW Slider/g.test(navigator.userAgent);
    var w = [];
    n.css({
        position: "absolute",
        top: 0,
        left: 0,
        width: g.width(),
        height: g.height(),
        transform: "translate3d(0,0,0)",
        transformOrigin: f.width / 2 + "px " + f.height / 2 + "px 0",
        perspective: t + 2e3
    }).hide();
    for (var l = 0; l < a; l++) {
        var z = l % a
            , y = Math.floor(l / a);
        var C = h("<div>").css({
            position: "absolute",
            left: 100 * z / a + "%",
            top: 0,
            outline: "1px solid transparent",
            transformStyle: o ? "flat" : "preserve-3d",
            overflow: p ? "visible" : "hidden"
        }).appendTo(n)
            , x = h("<div>").css({
            transform: "scale(1) rotateX(0) rotateY(0) translate3d(0,0,0)",
            outline: "1px solid transparent",
            transformStyle: "preserve-3d"
        }).appendTo(C)
            , u = h("<div>").addClass("ws_front_image").appendTo(x)
            , B = p ? h("<div>").addClass("ws_back_image").appendTo(x) : 0;
        u.css({
            position: "absolute",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            backfaceVisibility: "hidden",
            transform: "translate3d(0,0,0)"
        }).append(h("<img>").css({
            left: -z * 100 + "%",
            top: -y * 100 + "%",
            position: "absolute",
            outline: "1px solid transparent"
        }));
        if (p) {
            B.css({
                position: "absolute",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg) translate3d(0,0," + b + "px)"
            }).append(h("<img>").css({
                left: -z * 100 + "%",
                top: -y * 100 + "%",
                position: "absolute",
                outline: "1px solid transparent"
            }))
        }
        var r = {
            position: "absolute",
            outline: "1px solid transparent"
        };
        E[l] = {
            part: x,
            front: u,
            back: B,
            wrapper: C,
            leftEdge: p ? h("<div>").addClass("ws_left_edge").css(r).appendTo(x) : 0,
            rightEdge: p ? h("<div>").addClass("ws_right_edge").css(r).appendTo(x) : 0,
            topEdge: p ? h("<div>").addClass("ws_top_edge").css(r).appendTo(x) : 0,
            bottomEdge: p ? h("<div>").addClass("ws_bottom_edge").css(r).appendTo(x) : 0
        }
    }
    function A(L) {
        var H = {}
            , J = q.get(L)
            , M = f.width / a
            , N = f.height;
        for (var I = 0; I < a; I++) {
            var L = I % a
                , K = Math.floor(I / a);
            H[I] = D(J, {
                x: L * M,
                y: K * N,
                w: M,
                h: N
            })
        }
        return H
    }
    function G(H, K, j, I, J) {
        for (var i in K) {
            if (typeof E[i] !== "function") {
                K[i].topEdge.css({
                    width: I,
                    height: H,
                    background: j[i],
                    transform: "rotateX(90deg) translate3d(0,-" + H / 2 + "px," + H / 2 + "px)"
                });
                K[i].bottomEdge.css({
                    width: I,
                    height: H,
                    background: j[i],
                    transform: "rotateX(90deg) translate3d(0,-" + H / 2 + "px," + (-J + H / 2) + "px)"
                });
                K[i].leftEdge.css({
                    width: H,
                    height: J,
                    background: j[i],
                    transform: "rotateY(90deg) translate3d(" + H / 2 + "px,0,-" + H / 2 + "px)"
                });
                K[i].rightEdge.css({
                    width: H,
                    height: J,
                    background: j[i],
                    transform: "rotateY(90deg) translate3d(" + H / 2 + "px,0," + (I - H / 2) + "px)"
                })
            }
        }
    }
    function e(H, I) {
        var i = 0;
        for (var j in H) {
            if (typeof H[j] !== "function") {
                (function(J, K) {
                        wowAnimate(function(M) {
                            var S, Q, R, P = "", L = {};
                            if (M <= .5) {
                                S = h.easing.easeInBack(1, M * 2, 0, 1, 1, 1).toFixed(3);
                                Q = h.easing.easeInBackQ(1, M * 2, 0, 1, 1, 1).toFixed(3);
                                R = h.easing.easeInBackQ2(1, M * 2, 0, 1, 1, 1).toFixed(3);
                                K[J].back.css("backfaceVisibility", "hidden")
                            } else {
                                S = h.easing.easeOutBack(1, (M - .5) * 2, 0, 1, 1, 1).toFixed(3);
                                Q = h.easing.easeOutBackQ(1, (M - .5) * 2, 0, 1, 1, 1).toFixed(3);
                                R = h.easing.easeOutBackQ2(1, (M - .5) * 2, 0, 1, 1, 1).toFixed(3);
                                K[J].back.css("backfaceVisibility", "visible")
                            }
                            for (var N in K[J].animate[M <= .5 ? "half" : "end"]) {
                                var T = K[J].animate[M <= .5 ? "begin" : "half"][N] || 0
                                    , O = K[J].animate[M <= .5 ? "half" : "end"][N] || 0;
                                if (typeof O !== "object") {
                                    if (N === "scale" || N === "rotateX" || N === "rotateY") {
                                        O = T + (O - T) * Q
                                    } else {
                                        if (N === "left" || N === "top") {
                                            O = T + (O - T) * R
                                        } else {
                                            O = T + (O - T) * S
                                        }
                                    }
                                }
                                if (N === "rotateX" || N === "rotateY" || N === "rotateZ") {
                                    P += N + "(" + O + "deg) "
                                } else {
                                    if (N === "scale") {
                                        P += N + "(" + O + ") "
                                    } else {
                                        if (N === "translate3d") {
                                            P += N + "(" + (T[0] + (O[0] - T[0]) * S).toFixed(3) + "px," + (T[1] + (O[1] - T[1]) * S).toFixed(3) + "px," + (T[2] + (O[2] - T[2]) * S).toFixed(3) + "px) "
                                        } else {
                                            L[N] = O
                                        }
                                    }
                                }
                            }
                            K[J].wrapper.css({
                                transform: "translate3d(" + (L.left ? L.left : 0).toFixed(3) + "px," + (L.top ? L.top : 0).toFixed(3) + "px,0)"
                            });
                            delete L.left;
                            delete L.top;
                            if (P) {
                                L.transform = P
                            }
                            K[J].part.css(L)
                        }, 0, 1, K[J].animate.duration, K[J].animate.delay, function() {
                            i++;
                            if (i == K.length && I) {
                                I()
                            }
                        })
                    }
                )(j, H)
            }
        }
    }
    function k(Y, K, L, N) {
        var V = g.width()
            , U = g.height()
            , T = V / a
            , S = U
            , J = f.duration * .4 > 1e3 ? 1e3 : f.duration * .4
            , I = f.duration * .6
            , O = [0, 0];
        G(b, Y, v[K], T, S);
        n.css({
            transformOrigin: V / 2 + "px " + U / 2 + "px 0",
            width: V,
            height: U
        });
        for (var Q in Y) {
            if (typeof Y[Q] !== "function") {
                var H = w[Q].delay * J;
                if (O[1] <= H) {
                    O[0] = Q;
                    O[1] = H
                }
                Y[Q].part[0].ws_delay = [H, 0]
            }
        }
        Y[O[0]].part[0].ws_delay[1] = 1;
        for (var Q in Y) {
            if (typeof Y[Q] !== "function") {
                var P = Y[Q]
                    , X = Q % a
                    , W = Math.floor(Q / a)
                    , R = V * X / a
                    , M = U * W;
                P.animate = {
                    delay: P.part[0].ws_delay[0],
                    duration: I,
                    begin: {
                        left: 0,
                        top: 0,
                        width: T,
                        height: S,
                        scale: 1,
                        rotateX: 0,
                        rotateY: 0,
                        translate3d: [0, 0, o ? b : 0]
                    },
                    half: {
                        left: w[Q].halfLeft * T,
                        top: w[Q].halfTop * S,
                        scale: w[Q].halfScale,
                        rotateX: w[Q].rotateX / 2,
                        rotateY: w[Q].rotateY / 2,
                        translate3d: [0, 0, (o ? 1 : .5) * b]
                    },
                    end: {
                        left: 0,
                        top: 0,
                        scale: 1,
                        rotateX: w[Q].rotateX,
                        rotateY: w[Q].rotateY,
                        translate3d: [0, 0, b]
                    }
                };
                P.front.find("img").css(L);
                P.back.css("backfaceVisibility", "hidden").find("img").css(L);
                P.part.css({
                    width: P.animate.begin.width,
                    height: P.animate.begin.height,
                    left: P.animate.begin.left,
                    top: P.animate.begin.top
                })
            }
        }
        e(Y, N)
    }
    var d;
    this.go = function(U, K) {
        if (d) {
            return K
        }
        n.show();
        var I = h(q.get(K));
        I = {
            width: I.width(),
            height: I.height(),
            marginTop: parseFloat(I.css("marginTop")),
            marginLeft: parseFloat(I.css("marginLeft"))
        };
        w = function() {
            var aa = [0, 1];
            var ab = [1.2, .8];
            var Z = [.2, 0, -.2];
            var Y = [180, -180];
            aa = aa[Math.floor(Math.random() * aa.length)];
            ab = ab[Math.floor(Math.random() * ab.length)];
            Z = Z[Math.floor(Math.random() * Z.length)];
            Y = Y[Math.floor(Math.random() * Y.length)];
            var j = a;
            var i = [];
            for (var X = aa ? 0 : j; aa ? X <= j : X >= 0; aa ? X++ : X--) {
                i.push({
                    zIndex: X - (aa ? j : 0),
                    rotateY: Y,
                    delay: X / j,
                    halfScale: ab,
                    halfLeft: Z
                })
            }
            return i
        }();
        if (p) {
            E[0].front.find("img").on("load", function() {
                s.hide()
            });
            for (var L in E) {
                if (typeof E[L] !== "function") {
                    E[L].front.find("img").attr("src", q.get(K).src);
                    E[L].back.find("img").attr("src", q.get(U).src)
                }
            }
            if (!v[K]) {
                v[K] = A(K)
            }
            d = new k(E,K,I,function() {
                    s.show();
                    m.trigger("effectEnd");
                    n.hide();
                    for (var i in E) {
                        if (typeof E[i] !== "function") {
                            E[i].part.css({
                                transition: "",
                                transform: "rotateX(0) rotateY(0) translate3d(0,0,0)"
                            })
                        }
                    }
                    d = 0
                }
            )
        } else {
            d = true;
            function V(j, i) {
                return Math.random() * (i - j + 1) + j
            }
            var Q = g.width()
                , T = g.height()
                , P = Q / a
                , S = T
                , J = Q - P * (a - 1)
                , R = T;
            n.css({
                width: Q,
                height: T
            });
            var H = 0;
            for (var L in E) {
                var O = L % a
                    , N = Math.floor(L / a);
                E[L].front.find("img").attr("src", q.get(U).src).css(I);
                var W = f.duration * (1 - Math.abs((c * F - O * N) / (2 * a)));
                var M = V(-1, 1) > 0 ? 1 : -1;
                E[L].wrapper.css({
                    width: P,
                    height: S
                });
                E[L].part.css({
                    position: "absolute",
                    top: 0,
                    left: M * P,
                    opacity: 0,
                    width: P,
                    height: S
                }).animate({
                    left: 0,
                    opacity: 1
                }, W, function() {
                    H++;
                    if (H == a) {
                        s.stop(1, 1);
                        d = false;
                        m.trigger("effectEnd")
                    }
                })
            }
        }
    }
    ;
    function D(Q, H) {
        H = H || {};
        var S = 1, K = H.exclude || [], P;
        var M = document.createElement("canvas")
            , J = M.getContext("2d")
            , I = M.width = Q.naturalWidth
            , W = M.height = Q.naturalHeight;
        J.drawImage(Q, 0, 0, Q.naturalWidth, Q.naturalHeight);
        try {
            P = J.getImageData(H.x ? H.x : 0, H.y ? H.y : 0, H.w ? H.w : Q.width, H.h ? H.h : Q.height)["data"]
        } catch (R) {
            console.log("error:unable to access image data: " + R);
            return "#ccc"
        }
        var L = (H.w ? H.w : Q.width * H.h ? H.h : Q.height) || P.length
            , N = {}
            , U = ""
            , T = []
            , j = {
            dominant: {
                name: "",
                count: 0
            }
        };
        var O = 0;
        while (O < L) {
            T[0] = P[O];
            T[1] = P[O + 1];
            T[2] = P[O + 2];
            U = T.join(",");
            if (U in N) {
                N[U] = N[U] + 1
            } else {
                N[U] = 1
            }
            if (K.indexOf(["rgb(", U, ")"].join("")) === -1) {
                var V = N[U];
                if (V > j.dominant.count) {
                    j.dominant.name = U;
                    j.dominant.count = V
                }
            }
            O += S * 4
        }
        return ["rgb(", j.dominant.name, ")"].join("")
    }
}
jQuery("#wowslider-container1").wowSlider({
    effect: "louvers",
    prev: "",
    next: "",
    duration: 15 * 100,
    delay: 45 * 100,
    width: 780,
    height: 445,
    autoPlay: true,
    autoPlayVideo: false,
    playPause: false,
    stopOnHover: false,
    loop: false,
    bullets: 0,
    caption: false,
    captionEffect: "parallax",
    controls: false,
    controlsThumb: false,
    responsive: 1,
    fullScreen: false,
    gestures: 2,
    onBeforeStep: 0,
    images: 0
});
