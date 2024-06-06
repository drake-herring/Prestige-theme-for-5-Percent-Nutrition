
function onVisibilityChange(e, t) {
    return function () {
        1 == isElementInViewport(e) && e === document.getElementsByClassName("frequently-boughtProducts-section")[0] && window.matchMedia("(max-width: 1024px)").matches
            ? $(".js-quantity-and-addToCart-container").css({ opacity: "0", "z-index": "-1" })
            : $(".js-quantity-and-addToCart-container").css({ opacity: "1", "z-index": "2" });
    };
}
if (
    ($(document).ready(function () {
        $(".variant-wrapper select").on("change", function () {
            let e = $(this).parents(".variant-wrapper").find("#ProductSelect-0").val(),
                t = $(this).parents(".variant-wrapper").find("#ProductSelect-1").val(),
                i = $(this).parents(".variant-wrapper").find("#ProductSelect-2").val();
            if (void 0 === t && void 0 === i)
                var s = $(this)
                    .parents("form")
                    .find('.variant-data-wrapper .variant_id[data-option1="' + e + '"]')
                    .attr("value");
            else
                s =
                    void 0 === i
                        ? $(this)
                              .parents("form")
                              .find('.variant-data-wrapper .variant_id[data-option1="' + e + '"][data-option2="' + t + '"]')
                              .attr("value")
                        : $(this)
                              .parents("form")
                              .find('.variant-data-wrapper .variant_id[data-option1="' + e + '"][data-option2="' + t + '"][data-option3="' + i + '"]')
                              .attr("value");
            $(this).parents("form").find(".add-to-cart-id").val(s);
        }),
            $("#target").on("keyup", function () {
                var e = $(this).val();
                ("" != $("#target").val().trim() && "undefined" != $("#target").val().trim()) || $("#artlist").hide(),
                    "" != e.trim() &&
                        $.ajax({
                            method: "GET",
                            url: "/search/suggest.json?q=" + e + "&resources[type]=article",
                            dataType: "json",
                            limit: "3",
                            success: function (e) {
                                var t = e.resources.results.articles;
                                if (t.length > 0) {
                                    var i = 0;
                                    for ($(".predictive-search-content").html(""), i = 0; i < 3; i++) {
                                        var s = t[i],
                                            n = s.url,
                                            o = s.image,
                                            a = s.title;
                                        $(
                                            '<div class="article-data">\n       <div class="articles-list">\n                                              <a href="' +
                                                n +
                                                '"><img src=" ' +
                                                o +
                                                '" ><li> ' +
                                                a +
                                                " </li></a>\n                                          </div>\n                                      </div>"
                                        ).appendTo(".predictive-search-content"),
                                            "" == $("#target").val().trim() || "undefined" == $("#target").val().trim() ? $("#artlist").hide() : $("#artlist").show();
                                    }
                                }
                            },
                        });
            }),
            $("#order-sorting").on("change", function () {
                var e = $(this).val(),
                    t = $("." + e).html();
                $("#ArticleList").html(""), $(t).appendTo("#ArticleList");
            }),
            $("#search-btn").click(function () {
                console.log("serch btn clicked");
                var e = "/pages/search-results-page?q=" + $("#target").val() + "&type=article&tab=pages";
                location.href = e;
            }),
            $("#target").keypress(function (e) {
                if ("13" == (e.keyCode ? e.keyCode : e.which)) {
                    console.log("keypressed");
                    var t = "/pages/search-results-page?q=" + $(this).val() + "&type=article&tab=pages";
                    location.href = t;
                }
            }),
            $("select#tag-sorting").change(function () {
                var e = $(this).children("option:selected").val();
                $(".ArticleListWrapper .ArticleList").html(),
                    $(".overlay").show(),
                    $(".tag-list .ArticleListWrapper").load(e + " #ArticleList .ArticleList ", function () {
                        $(".Pagination.Text--subdued .Pagination__Nav").load(e + " .Pagination__Nav"), $(".overlay").hide();
                    });
            });
    }),
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? (module.exports = e(require("jquery"))) : e(jQuery);
    })(function (e) {
        var t = Array.prototype.slice,
            i = Array.prototype.splice,
            s = { topSpacing: 0, bottomSpacing: 0, className: "is-sticky", wrapperClassName: "sticky-wrapper", center: !1, getWidthFrom: "", widthFromWrapper: !0, responsiveWidth: !1, zIndex: "inherit" },
            n = e(window),
            o = e(document),
            a = [],
            r = n.height(),
            c = function () {
                for (var t = n.scrollTop(), i = o.height(), s = i - r, c = t > s ? s - t : 0, l = 0, d = a.length; l < d; l++) {
                    var p = a[l],
                        u = p.stickyWrapper.offset().top - p.topSpacing - c;
                    if ((p.stickyWrapper.css("height", p.stickyElement.outerHeight()), t <= u))
                        null !== p.currentTop &&
                            (p.stickyElement.css({ width: "", position: "", top: "", "z-index": "" }), p.stickyElement.parent().removeClass(p.className), p.stickyElement.trigger("sticky-end", [p]), (p.currentTop = null));
                    else {
                        var h,
                            m = i - p.stickyElement.outerHeight() - p.topSpacing - p.bottomSpacing - t - c;
                        m < 0 ? (m += p.topSpacing) : (m = p.topSpacing),
                            p.currentTop !== m &&
                                (p.getWidthFrom ? ((padding = p.stickyElement.innerWidth() - p.stickyElement.width()), (h = e(p.getWidthFrom).width() - padding || null)) : p.widthFromWrapper && (h = p.stickyWrapper.width()),
                                null == h && (h = p.stickyElement.width()),
                                p.stickyElement.css("width", h).css("position", "fixed").css("top", m).css("z-index", p.zIndex),
                                p.stickyElement.parent().addClass(p.className),
                                null === p.currentTop ? p.stickyElement.trigger("sticky-start", [p]) : p.stickyElement.trigger("sticky-update", [p]),
                                (p.currentTop === p.topSpacing && p.currentTop > m) || (null === p.currentTop && m < p.topSpacing)
                                    ? p.stickyElement.trigger("sticky-bottom-reached", [p])
                                    : null !== p.currentTop && m === p.topSpacing && p.currentTop < m && p.stickyElement.trigger("sticky-bottom-unreached", [p]),
                                (p.currentTop = m));
                        var $ = p.stickyWrapper.parent();
                        p.stickyElement.offset().top + p.stickyElement.outerHeight() >= $.offset().top + $.outerHeight() && p.stickyElement.offset().top <= p.topSpacing
                            ? p.stickyElement.css("position", "absolute").css("top", "").css("bottom", 0).css("z-index", "")
                            : p.stickyElement.css("position", "fixed").css("top", m).css("bottom", "").css("z-index", p.zIndex);
                    }
                }
            },
            l = function () {
                r = n.height();
                for (var t = 0, i = a.length; t < i; t++) {
                    var s = a[t],
                        o = null;
                    s.getWidthFrom ? s.responsiveWidth && (o = e(s.getWidthFrom).width()) : s.widthFromWrapper && (o = s.stickyWrapper.width()), null != o && s.stickyElement.css("width", o);
                }
            },
            d = {
                init: function (t) {
                    return this.each(function () {
                        var i = e.extend({}, s, t),
                            n = e(this),
                            o = n.attr("id"),
                            r = o ? o + "-" + s.wrapperClassName : s.wrapperClassName,
                            c = e("<div></div>").attr("id", r).addClass(i.wrapperClassName);
                        n.wrapAll(function () {
                            if (0 == e(this).parent("#" + r).length) return c;
                        });
                        var l = n.parent();
                        i.center && l.css({ width: n.outerWidth(), marginLeft: "auto", marginRight: "auto" }),
                            "right" === n.css("float") && n.css({ float: "none" }).parent().css({ float: "right" }),
                            (i.stickyElement = n),
                            (i.stickyWrapper = l),
                            (i.currentTop = null),
                            a.push(i),
                            d.setWrapperHeight(this),
                            d.setupChangeListeners(this);
                    });
                },
                setWrapperHeight: function (t) {
                    var i = e(t),
                        s = i.parent();
                    s && s.css("height", i.outerHeight());
                },
                setupChangeListeners: function (e) {
                    window.MutationObserver
                        ? new window.MutationObserver(function (t) {
                              (t[0].addedNodes.length || t[0].removedNodes.length) && d.setWrapperHeight(e);
                          }).observe(e, { subtree: !0, childList: !0 })
                        : window.addEventListener
                        ? (e.addEventListener(
                              "DOMNodeInserted",
                              function () {
                                  d.setWrapperHeight(e);
                              },
                              !1
                          ),
                          e.addEventListener(
                              "DOMNodeRemoved",
                              function () {
                                  d.setWrapperHeight(e);
                              },
                              !1
                          ))
                        : window.attachEvent &&
                          (e.attachEvent("onDOMNodeInserted", function () {
                              d.setWrapperHeight(e);
                          }),
                          e.attachEvent("onDOMNodeRemoved", function () {
                              d.setWrapperHeight(e);
                          }));
                },
                update: c,
                unstick: function (t) {
                    return this.each(function () {
                        for (var t = e(this), s = -1, n = a.length; n-- > 0; ) a[n].stickyElement.get(0) === this && (i.call(a, n, 1), (s = n));
                        -1 !== s && (t.unwrap(), t.css({ width: "", position: "", top: "", float: "", "z-index": "" }));
                    });
                },
            };
        window.addEventListener ? (window.addEventListener("scroll", c, !1), window.addEventListener("resize", l, !1)) : window.attachEvent && (window.attachEvent("onscroll", c), window.attachEvent("onresize", l)),
            (e.fn.sticky = function (i) {
                return d[i] ? d[i].apply(this, t.call(arguments, 1)) : "object" != typeof i && i ? void e.error("Method " + i + " does not exist on jQuery.sticky") : d.init.apply(this, arguments);
            }),
            (e.fn.unstick = function (i) {
                return d[i] ? d[i].apply(this, t.call(arguments, 1)) : "object" != typeof i && i ? void e.error("Method " + i + " does not exist on jQuery.sticky") : d.unstick.apply(this, arguments);
            }),
            e(function () {
                setTimeout(c, 0);
            });
    }),
    $(document).ready(function () {
        // const e = ["Italy", "Syria", "Maldives", "India"];
        const t = ["Syria", "Maldives", "India"];
     
        $.getJSON('https://api.db-ip.com/v2/pe2db1519a7604fd99896d70b62c22f9966f700e/self',
          // $.getJSON('https://api.db-ip.com/v2/free/self',
            function (i) {
                var s = i.countryCode;
                const e = i.countryName;
                window.countryName = i.countryName;
                if("US" == s){
                  if($("button[data-value='US']").length > 0) {
                   setTimeout(function () {
                      // $("button[data-value='US']")[0].click();
                      $(".js-restricted-shipping-message").hide();
                    }, 50);
                  }
                  else{
                    setTimeout(function () {
                    console.log('uk eu in');
                       // $("button[data-value='International']")[0].click();
                        $(".js-restricted-shipping-message").hide();
                    }, 50);
                    // $("button[data-value='International']")[0].click();
                    $(".js-restricted-shipping-message").show();
                  }
                }
                else if("UK" == s || "GB" == s || "EU" == s || "IT" == s || s == 'AT' || s == 'BE' || s == 'BG' || s == 'CY' || s == 'CZ' || s == 'DE' || s == 'DK' || s == 'EE' || s == 'ES' || s == 'FI' || s == 'FR' || s == 'GR' || s == 'HR' || s == 'HU' || s == 'IE' || s == 'IT' || s == 'LT' || s == 'LU' || s == 'LV' || s == 'MT' || s == 'NL' || s == 'PO' || s == 'PT' || s == 'RO' || s == 'SE' || s == 'SI' || s == 'SK'){
                  if($("button[data-value='International']").length > 0){
                     setTimeout(function () {
                      $("button[data-value='International']").click();
                      $(".js-restricted-shipping-message").hide();
                    }, 50);
                  }
                  else{
                  setTimeout(function () {
                      $("button[data-value='US']")[0].click();
                      $(".js-restricted-shipping-message").show();
                    }, 50);
                  }
                }
                else{
                    $(".js-restricted-shipping-message").css('display','none');
                  /*
                  if($("button[data-value='US']").length > 0) {
                    $("button[data-value='US']")[0].click();
                    $(".js-restricted-shipping-message").css('display','block');
                  }else{
                    $("button[data-value='International']")[0].click();
                    $(".js-restricted-shipping-message").css('display','block');
                  }
                  */
                }
                if($("button[data-value='International']").length > 0){
                  $("button[data-value='International']")[0].click();
                }
              
                  /*
                  "US" == s
                        ? setTimeout(function () {
                          console.log('us in');
                              $("button[data-value='US']").length > 0 && $("button[data-value='US']")[0].click();
                          }, 50)
                        : setTimeout(function () {
                          console.log('us out');
                              $("button[data-value='International']").length > 0 && $("button[data-value='International']")[0].click();
                          }, 50),
                  "UK" == s || "GB" == s || "EU" == s
                        ? setTimeout(function () {
                          console.log('uk eu in');
                              $("button[data-value='International']").length > 0 && $("button[data-value='International']")[0].click();
                              $(".js-restricted-shipping-message").hide();
                          }, 50)
                        : setTimeout(function () {
                          console.log('uk eu out');
                              $("button[data-value='US']").length > 0 && $("button[data-value='US']")[0].click();
                              $(".js-restricted-shipping-message").show();
                          }, 50),
                    $.inArray(e, t) > -1 &&
                        ($(".js-restricted-shipping-message").addClass("active"),
                        $(".js-restricted-shipping-message").html(
                            'International shipping is currently restricted for <strong class="restricted-country">' +
                                e +
                                '</strong>. For more information, please see our <a style="text-decoration: underline" href="https://5percentnutrition.com/pages/shipping-returns">shipping policies.</a>'
                        ));
*/
                  },
            "jsonp"
        ),
          
        $("button.Popover__Value").on("click", function (){
          var productName = $(".js-restricted-shipping-message").data("title");
          // $.getJSON('https://api.db-ip.com/v2/free/self',
           $.getJSON('https://api.db-ip.com/v2/pe2db1519a7604fd99896d70b62c22f9966f700e/self',
            function (i) {
                var s = i.countryCode;
                const e = i.countryName;
                setTimeout(function () {
                    console.log($(".product-variant-container .ProductForm__Option:nth-child(2) button .ProductForm__OptionName").text());
                    console.log(e + " => " + t);
                    console.log($.inArray(e, t) > -1);
                  var btnText = $(".product-variant-container .ProductForm__Option:nth-child(2) button .ProductForm__OptionName").text();

                   if ( "US" == s ){
                     if(btnText == 'International'){
                       $(".js-restricted-shipping-message").addClass("active");
                       $('.js-restricted-shipping-message').css('display','block');
                       $(".js-restricted-shipping-message").html("<strong>" + productName + "</strong> has several variants including those specific to U.S. and international consumers. Please make sure you select the appropriate variant based on your location; where product(s) are being shipped. Orders outside of the United States could be subject to import taxes and customs duties charged by the destination country.");
                     }else{
                       $('.js-restricted-shipping-message').css('display','none');
                     }
                   }
                  else if ("UK" == s || "GB" == s || "EU" == s || "IT" == s || s == 'AT' || s == 'BE' || s == 'BG' || s == 'CY' || s == 'CZ' || s == 'DE' || s == 'DK' || s == 'EE' || s == 'ES' || s == 'FI' || s == 'FR' || s == 'GR' || s == 'HR' || s == 'HU' || s == 'IE' || s == 'IT' || s == 'LT' || s == 'LU' || s == 'LV' || s == 'MT' || s == 'NL' || s == 'PO' || s == 'PT' || s == 'RO' || s == 'SE' || s == 'SI' || s == 'SK') { 
                    if (btnText == 'US') {
                       $(".js-restricted-shipping-message").addClass("active");
                       $(".js-restricted-shipping-message").show();
                       $(".js-restricted-shipping-message").html("<strong>" + productName + "</strong> has several variants including those specific to U.S. and international consumers. Please make sure you select the appropriate variant based on your location; where product(s) are being shipped. Orders outside of the United States could be subject to import taxes and customs duties charged by the destination country.");
                    } else {
                      $('.js-restricted-shipping-message').css('display','none');
                    }
                   }
                  else{
                    $('.js-restricted-shipping-message').css('display','none');
                    /*
                    if( btnText == 'US'){
                      // IND US
                      console.log('IND US');
                      $(".js-restricted-shipping-message").addClass("active");
                      $(".js-restricted-shipping-message").html("<strong>" + productName + "</strong> has several variants including those specific to U.S. and international consumers. Please make sure you select the appropriate variant based on your location; where product(s) are being shipped. Orders outside of the United States could be subject to import taxes and customs duties charged by the destination country.").css('display','block');
                     setTimeout(function () { $(".js-restricted-shipping-message").css('display','block'); }, 50); 
                    }else{
                      // IND INTERNATIONNAL
                       console.log('IND INTERNATIONNAL');
                      if ($.inArray(e, t) > -1) {
                        $(".js-restricted-shipping-message").addClass("active");
                        $(".js-restricted-shipping-message").html('International shipping is currently restricted for <strong class="restricted-country">' + t + '</strong>. For more information, please see our <a style="text-decoration: underline" href="https://5percentnutrition.com/pages/shipping-returns">shipping policies.</a>');
                        setTimeout(function () { $(".js-restricted-shipping-message").css('display','block'); }, 50);
                      }else{
                      $(".js-restricted-shipping-message").addClass("active");
                      $(".js-restricted-shipping-message").html("<strong>" + productName + "</strong> has several variants including those specific to U.S. and international consumers. Please make sure you select the appropriate variant based on your location; where product(s) are being shipped. Orders outside of the United States could be subject to import taxes and customs duties charged by the destination country.");
                      setTimeout(function () { $(".js-restricted-shipping-message").css('display','block'); }, 50); 
                     }
                    }
                    */
                  }
                }, 50);
            });
        }),
        $(window).on("ready load resize", function () {
            if (window.matchMedia("(min-width: 1025px)").matches && $(".benefits-content__desc").length > 0)
                for (var e = 0; e < $(".benefits-content__desc").length; e++) $($(".benefits-content__desc")[e]).text().length <= 1 && $($(".benefits-content__image")[e]).css("min-height", "170px");
            if ("false" == $($(".OptionSelector.Popover")[0]).attr("aria-hidden"))
                if (window.matchMedia("(min-width: 1025px)").matches) {
                    $this = $($(".ProductForm__Item")[0]);
                    var t = $this.offset().top - $(window).scrollTop() + $this.outerHeight(),
                        i = $this.offset().left;
                    $($(".OptionSelector")[0]).css({ top: t, left: i });
                } else $($(".OptionSelector")[0]).css({ top: t, left: 0 });
            if ("false" == $($(".OptionSelector.Popover")[1]).attr("aria-hidden"))
                if (window.matchMedia("(min-width: 1024px)").matches) {
                    $this = $($(".ProductForm__Item")[1]);
                    var s = $this.offset().top - $(window).scrollTop() + $this.outerHeight(),
                        n = $this.offset().left;
                    $($(".OptionSelector")[1]).css({ top: s, left: n });
                } else $($(".OptionSelector")[1]).css({ top: s, left: 0 });
            if ("false" == $("#collection-sort-popover").attr("aria-hidden"))
                if (window.matchMedia("(min-width: 1025px)").matches) {
                    $this = $("button[aria-controls='collection-sort-popover']");
                    var o = $this.offset().top - $(window).scrollTop() + $this.outerHeight(),
                        a = $this.offset().left;
                    $("#collection-sort-popover").css({ top: o, left: a });
                } else $("#collection-sort-popover").css({ top: o, left: 0 });
        }),
        $("button[aria-controls='collection-sort-popover']").on("click", function () {
            if (window.matchMedia("(min-width: 1025px)").matches) {
                var e = $(this).offset().top - $(window).scrollTop() + $(this).outerHeight(),
                    t = $(this).offset().left;
                $(this).width(), $("#collection-sort-popover").css({ top: e, left: t });
            } else $("#collection-sort-popover").css({ top: e, left: 0 });
        }),
        $(".ProductForm__Item").on("click", function () {
            var e = $(this).closest(".ProductForm__Option").index();
            if (window.matchMedia("(min-width: 1025px)").matches) {
                var t = $(this).offset().top - $(window).scrollTop() + $(this).outerHeight(),
                    i = $(this).offset().left,
                    s = $(this).width();
                $($(".OptionSelector")[e]).css({ top: t, left: i, "min-width": s + " !important" });
            } else $($(".OptionSelector")[e]).css({ top: t, left: 0 });
        }),
        $(window).on("click", function () {
            ("true" == $($(".OptionSelector.Popover")[0]).attr("aria-hidden") && "true" == $($(".OptionSelector.Popover")[1]).attr("aria-hidden")) ||
            ("true" == $($(".OptionSelector.Popover")[0]).attr("aria-hidden") && null == $($(".OptionSelector.Popover")[1]).attr("aria-hidden"))
                ? console.log("start scroll")
                : "true" == $($(".OptionSelector.Popover")[1]).attr("aria-hidden") && $($(".OptionSelector.Popover")[0]).attr("aria-hidden");
        }),
        $(window).on("scroll", function () {
            if ("false" == $($(".OptionSelector.Popover")[0]).attr("aria-hidden"))
                if (window.matchMedia("(min-width: 1024px)").matches) {
                    $this = $($(".ProductForm__Item")[0]);
                    var e = $this.offset().top - $(window).scrollTop() + $this.outerHeight();
                    $($(".OptionSelector")[0]).css("top", e);
                } else $($(".OptionSelector")[0]).css({ top: e, left: 0 });
            if ("false" == $($(".OptionSelector.Popover")[1]).attr("aria-hidden"))
                if (window.matchMedia("(min-width: 1024px)").matches) {
                    $this = $($(".ProductForm__Item")[1]);
                    var t = $this.offset().top - $(window).scrollTop() + $this.outerHeight();
                    $($(".OptionSelector")[1]).css("top", t);
                } else $($(".OptionSelector")[1]).css({ top: t, left: 0 });
            if ("false" == $("#collection-sort-popover").attr("aria-hidden"))
                if (window.matchMedia("(min-width: 1025px)").matches) {
                    $this = $("button[aria-controls='collection-sort-popover']");
                    var i = $this.offset().top - $(window).scrollTop() + $this.outerHeight();
                    $("#collection-sort-popover").css("top", i);
                } else $("#collection-sort-popover").css({ top: i, left: 0 });
        }),
        $(".HorizontalList__Item").on("mouseenter", function () {
            $(this).children(".DropdownMenu").length;
        }),
        $(".HorizontalList__Item").on("mouseleave", function () {}),
        $(".homepage-instagram-feed").length > 0 && $(".homepage-instagram-feed").parent().removeClass("shopify-section--bordered"),
        $(".Popover__ValueList:first").on("click", "button", function () {
            var e = $(this).index();
            $(".js-variants-supplements-container").prop("selectedIndex", e).selectric("refresh"), $(".js-variants-supplements-container").trigger("change");
        }),
        $(window).on("load", function () {
                setTimeout(function () {
                    $(".Popover__ValueList .Popover__Value--1").click();
                }, 50);
            });

      
        
          
            $(".product-description-text-container").height() > 400 && ($(".product-description-text-container").addClass("to-expand"), $(".g-read-more").addClass("active")),
            $(".g-read-more").on("click", function () {
                $(".g-read-more").toggleClass("read-less"),
                    $(".g-read-more").hasClass("read-less")
                        ? ($(".product-description-text-container.to-expand").css("max-height", "4000px"), $(".g-read-more").text("+ Read Less"))
                        : ($(".g-read-more").text("+ Read More"), $(".product-description-text-container").css("max-height", "400px"), $("html, body").animate({ scrollTop: $(".product-description-text-container").offset().top }, 800));
            }),
            $(".SidebarMenu__Nav--primary .Collapsible:first").find(".Collapsible:first .subtitle").css("display", "none"),
            $(".SidebarMenu__Nav--primary .Collapsible:nth-child(2)").find(".Collapsible:first .subtitle").css("display", "none"),
            $(".product-button--nav").on("click", function () {
                $("html, body").animate({ scrollTop: 0 }, 800),
                    setTimeout(function () {
                        $(".main-product-form").addClass("wiggle");
                    }, 1e3),
                    setTimeout(function () {
                        $(".main-product-form").removeClass("wiggle");
                    }, 1500);
            }),
            new MutationObserver(function (e) {
                e.forEach(function (e) {
                    e.addedNodes &&
                        e.addedNodes.length > 0 &&
                        [].some.call(e.addedNodes, function (e) {
                            return "BIS_frame" == e.id;
                        }) &&
                        $("#BIS_trigger").html("<span class='sold-out-text'>SOLD OUT!</span><span class='email-availability-text'>EMAIL WHEN AVAILABLE</span>");
                });
            }).observe(document.body, { attributes: !0, childList: !0, characterData: !0 }),
            $(".Popover__Value").on("click", function () {
                $(".main-add-to-cart").hasClass("Button--secondary") ? $(".main-add-to-cart").css("display", "none") : $(".main-add-to-cart").css("display", "flex"),
                    $(".js-quantity-and-addToCart-container .ajaxified-cart-feedback").length > 0 && $(".js-quantity-and-addToCart-container .ajaxified-cart-feedback").remove();
            }),
            $(this).scrollTop(0),
            $(".js-product-nav-section").sticky({ topSpacing: 84 }),
            $(".main-site-header").sticky({ topSpacing: 0 }),
            $(".Drawer__Container--sidenav").outerHeight($(".Drawer__Main--sidenav").outerHeight()),
            $(".clearable").each(function () {
                var e = $(this).find("input:text"),
                    t = $(this).find(".clearable__clear");
                e.on("input", function () {
                    t.toggle(!!this.value);
                }),
                    t.on("touchstart click", function (t) {
                        t.preventDefault(), e.val("").trigger("input");
                    });
            }),
            $(".js-open-searchMobile").on("click", function () {
                $(".nav-search").toggleClass("active"), $(".nav-search").hasClass("active") && $(".nav-search").focus();
            }),
            $(".js-show-tabletNav").on("click", function () {
                $(".js-header-main-nav").toggleClass("active"), $(".PageOverlay").toggleClass("is-visible-tab"), $(".AnnouncementBar").toggleClass("inactive");
            }),
            $(".PageOverlay").on("click", function () {
                $(".js-header-main-nav").hasClass("active") && ($(".js-header-main-nav").removeClass("active"), $(".PageOverlay").removeClass("is-visible-tab"), $(".AnnouncementBar").toggleClass("inactive"));
            }),
            $(".Popover__Value").on("click", function (e) {
                e.preventDefault();
            }),
            $(".HorizontalList__Item[data-navname='5% NATION']").addClass("five-nation-nav"),
            $(".HorizontalList__Item[data-navname='5% NATION'] .DropdownMenu .Linklist").addClass("Linklist--five-nation");
        var i = $(".Linklist--five-nation").find(".Link--shopnow");
        console.log(i[0] ? i[0].innerHTML : '' + " - " + i[1] ? i[1].innerHTML : '' + " - " + i[2] ? i[2].innerHTML : '' + " - " + i[3] ? i[3].innerHTML : '');
        //if (i.length > 0 && i[1].length > 0 && i[2].length > 0 && i[3].length > 0) {
          
          if ((i.length > 0 && ((i[0] ? i[0].innerHTML = "VIEW ALL" : ''), (i[1] ? i[1].innerHTML = "GET CONNECTED" : ''), (i[2] ? i[2].innerHTML = "JOIN TEAM" : ''), (i[3] ? i[3].innerHTML = "VIEW ALL" : '')), $("#supplementFactsSection").length > 0)) {
              $(".js-variants-supplements-container").selectric({
                  arrowButtonMarkup:
                      '<b class="button"><svg class="Icon Icon--select-arrow" role="presentation" viewBox="0 0 19 12"><polyline fill="none" stroke="currentColor" points="17 2 9.5 10 2 2" fill-rule="evenodd" stroke-width="2" stroke-linecap="square"></polyline></svg></b>',
                  onOpen: function () {},
              });
            
              var s = $(".js-variants-supplements-container :selected").text().trim().replace(/ /g, "-");
              $("." + s).css("display", "block"),
                  $(".js-variants-supplements-container").on("change", function () {
                      var e = $(".js-variants-supplements-container :selected").text().trim();
                      e = e.replace(/(\r\n|\n|\r)/gm, "");
                      for (var t = 0; t < e.length && " " == e[t]; t++);
                      for (var i = e.length - 1; i > t && " " == e[i]; i--);
                      var s = (e = e.substring(t, i + 1)).replace(/ /g, "-");
                      console.log(s);
                      $(".supplement-info > div").css("display", "none"), $("." + s).css("display", "block");
                  }),
                  $(".variant-name-mobile:first").addClass("active"),
                  $(".variant-name-mobile").on("click", function () {
                      $(".variant-name-mobile").removeClass("active"), $(this).addClass("active");
                      var e = $(this).index();
                      $(".js-variants-supplements-container").prop("selectedIndex", e).selectric("refresh"), $(".js-variants-supplements-container").trigger("change");
                  });
          }
        //}
        
        function n() {
            try {
                $(".js-benefits-slider").slick("slickNext");
            } catch (e) {}
        }
      console.log('16 console from custom.js')
        function o() {
            $(".js-product-gallery-slider").slick("slickNext");
        }
      console.log('17 console from custom.js')
        $(".frequent-variants-container").find("option:eq(0)").prop("selected", !0),
            $(".frequent-variants-container").prop("selectedIndex", 0).selectric("refresh"),
            $(".frequent-variants-container").selectric({
                highlight: !1,
                arrowButtonMarkup:
                    '<b class="button"><svg class="Icon Icon--select-arrow" role="presentation" viewBox="0 0 19 12"><polyline fill="none" stroke="currentColor" points="17 2 9.5 10 2 2" fill-rule="evenodd" stroke-width="2" stroke-linecap="square"></polyline></svg></b>',
                onOpen: function () {},
            }),
            $(".frequent-variants-container").on("change", function () {
                $(".frequent-go-cart-text").hasClass("active") && ($(".frequent-go-cart-text").removeClass("active"), $(".frequent-add-cart-text").addClass("active")),
                    $(".frequent-notinstock").length > 0 && $(".frequent-notinstock").remove();
                for (var e = $(this).attr("class").split(/\s+/)[1], t = "", i = 0; i < $("." + e).length; i++) 1 == i ? (t = t + " / " + $("." + e)[i].value) : (t += $("." + e)[i].value);
                var s = $(".selectric-" + e)
                    .siblings(".frequently-bought-metadata")
                    .children("li");
                for (i = 0; i < s.length; i++)
                    if (s[i].dataset.title == t)
                        var n = s[i].dataset.variantid,
                            o = s[i].dataset.variantquantity;
                $(this).closest(".frequent-variant-wrapper").siblings(".frequent-checkbox").find(".js-frequent-product-checkbox").attr("data-variant-id", n),
                    $(this).closest(".frequent-variant-wrapper").siblings(".frequent-checkbox").find(".js-frequent-product-checkbox").attr("data-inventory-quantity", o);
            }),
            $("#frequently-added-form").submit(function (e) {
                var t = [],
                    i = !0;
                if (
                    ($(".js-frequent-product-checkbox").each(function () {
                        var e = $(this).attr("data-variant-id"),
                            s = $(this).attr("data-inventory-quantity");
                        if (($(this).is(":checked") && s > 0 && ((i = !0), t.push([e, 1])), $(this).is(":checked") && !(s > 0)))
                            return $(this).closest(".frequent-checkbox").siblings(".frequent-variant-wrapper").append("<p class='frequent-notinstock'>Selected variant combination not in stock</p>"), (i = !1), !1;
                    }),
                    1 == i)
                )
                    for (let e = 0; e < t.length; e++)
                        CartJS.addItem(Number(t[e][0]), t[e][1], {
                            success: function (e, t, i) {
                                $(".frequent-adding-cart-text").addClass("active"), $(".frequent-add-cart-text").removeClass("active");
                            },
                            error: function (e, t, i) {
                                console.log("Error: " + i + "!");
                            },
                        });
                $(".ProductForm").on("submit", function (e) {
                    e.preventDefault();
                }),
                    $(document).on("cart.requestComplete", function (e, t) {
                        $(".Header__CartCount").html(t.item_count), $(".frequent-go-cart-text").addClass("active"), $(".frequent-adding-cart-text").removeClass("active");
                    }),
                    e.preventDefault();
            }),
            setTimeout(function () {
                $(".swym-button-bar").insertAfter(".swym-button-custom"),
                    $(".js-review-btns-container").append($(".yotpo-regular-box .write-review-button")[1]),
                    $(".js-review-btns-container").append($(".yotpo-regular-box .write-question-button")[1]);
            }, 5200),
            $(window).on("ready load resize", function () {
                $(".PageOverlay").hasClass("is-visible") ? $(".PageOverlay").removeClass("is-visible") : $(".PageOverlay").hasClass("is-visible-tab") && $(".PageOverlay").removeClass("is-visible-tab"),
                    $(".js-header-main-nav").hasClass("active") && ($(".js-header-main-nav").removeClass("active"), $(".AnnouncementBar").removeClass("inactive")),
                    window.matchMedia("(max-width: 767px)").matches
                        ? $(".js-benefits-slider").length > 0 &&
                          ($(".js-benefits-slider").slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !1, fade: !0, dots: !0 }),
                          $(".js-benefits-slider .slick-dots").append('<li class="next-benefit-custom"></li>'),
                          setTimeout(function () {
                              document.getElementsByClassName("next-benefit-custom")[0].addEventListener("click", n);
                          }, 100))
                        : $(".js-benefits-slider").length > 0 &&
                          (function () {
                              try {
                                  $(".js-benefits-slider").slick("unslick");
                              } catch (e) {}
                          })();
            }),
            $(".js-product-gallery-slider").slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !1, fade: !0, dots: !0, asNavFor: ".js-thumbnail-gallery-slider", responsive: [{ breakpoint: 1024, settings: { adaptiveHeight: !0 } }] }),
            $(".js-thumbnail-gallery-slider").slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: ".js-product-gallery-slider",
                focusOnSelect: !0,
                infinite: "false",
                vertical: !0,
                arrows: !0,
                prevArrow:
                    '<button type=\'button\' class=\'slick-arrow slick-arrow--prev pull-left\'><i class=\'\'><svg class="Icon Icon--select-arrow" role="presentation" viewBox="0 0 19 12"><polyline fill="none" stroke="currentColor" points="17 2 9.5 10 2 2" fill-rule="evenodd" stroke-width="2" stroke-linecap="square"></polyline></svg></i></button>',
                nextArrow:
                    '<button type=\'button\' class=\'slick-arrow slick-arrow--next pull-right\'><i class=\'\'><svg class="Icon Icon--select-arrow" role="presentation" viewBox="0 0 19 12"><polyline fill="none" stroke="currentColor" points="17 2 9.5 10 2 2" fill-rule="evenodd" stroke-width="2" stroke-linecap="square"></polyline></svg></i></button>',
            }),
            $(".js-thumbnail-gallery-slider").find(".video-container").length > 0 && $(".slick-dots li:nth-child(2)").addClass("video-dot"),
            $(".Product__SlideshowNav--thumbnails").css("visibility", "visible"),
            $(".js-product-gallery-slider").css("visibility", "visible"),
            setTimeout(function () {}, 100),
            $(".js-product-gallery-slider").length > 0 &&
                ($(".js-product-gallery-slider .slick-dots").append('<li class="next-slide-custom"></li>'),
                setTimeout(function () {
                    document.getElementsByClassName("next-slide-custom")[0].addEventListener("click", o);
                }, 100)),
            $(".js-thumbnail-gallery-slider").on("afterChange", function () {
                $(".Product__SlideshowNavImage:first").hasClass("slick-current")
                    ? $(".js-thumbnail-gallery-slider .slick-arrow--prev").css("max-height", "00px")
                    : $(".js-thumbnail-gallery-slider .slick-arrow--prev").css("max-height", "40px"),
                    $(".Product__SlideshowNavImage:last").hasClass("slick-active")
                        ? $(".js-thumbnail-gallery-slider .slick-arrow--next").css("max-height", "0px")
                        : $(".js-thumbnail-gallery-slider .slick-arrow--next").css("max-height", "40px");
            }),
            $(window).on("resize orientationchange", function () {
                $(".js-product-gallery-slider").slick("refresh"), $(".js-thumbnail-gallery-slider").slick("refresh");
            }),
            $(".image-popup-vertical-fit").magnificPopup({ type: "image", closeOnContentClick: !0, mainClass: "mfp-img-mobile", gallery: { enabled: !0, navigateByImgClick: !0, preload: [0, 1] }, image: { verticalFit: !0 } }),
            $(".product-video").magnificPopup({
                type: "iframe",
                iframe: {
                    markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe></div>',
                    patterns: {
                        youtube: { index: "youtube.com/", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" },
                        vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
                    },
                    srcAction: "iframe_src",
                },
            });
        var a = document.getElementsByClassName("js-accordion-heading");
        for (let e = 0; e < a.length; e++)
            a[e].addEventListener("click", function () {
                for (let e = 0; e < a.length; e++) a[e].classList.remove("active"), (a[e].nextElementSibling.style.maxHeight = null);
                this.classList.add("active");
                var e = this.nextElementSibling;
                e.style.maxHeight ? (e.style.maxHeight = null) : (e.style.maxHeight = e.scrollHeight + "px");
            });
        $(".beam-me-up-scotty").click(function () {
            $("html, body").animate({ scrollTop: 0 }, 1e3);
        }),
            ($window = $(window)),
            $(".product-description-section").length > 0 &&
                $(window).on("scroll", function () {
                    $window.scrollTop() > $(".product-description-section").offset().top ? $(".beam-me-up-scotty").css("visibility", "visible") : $(".beam-me-up-scotty").css("visibility", "hidden"),
                        $(".js-product-faq-section").length > 0 &&
                        $window.scrollTop() > $(".js-product-faq-section").offset().top - 101 &&
                        $window.scrollTop() < $(".js-product-faq-section").offset().top + $(".js-product-faq-section").height() - 101
                            ? ($(".js-product-nav-elements li").removeClass("active"), $(".js-faq").addClass("active"))
                            : $(".js-fivenation-section").length > 0 &&
                              $window.scrollTop() > $(".js-fivenation-section").offset().top - 101 &&
                              $window.scrollTop() < $(".js-fivenation-section").offset().top + $(".js-fivenation-section").height() - 101
                            ? ($(".js-product-nav-elements li").removeClass("active"), $(".js-five-percent-nation").addClass("active"))
                            : $(".js-review-section").length > 0 && $window.scrollTop() > $(".js-review-section").offset().top - 101 && $window.scrollTop() < $(".js-review-section").offset().top + $(".js-review-section").height() - 101
                            ? ($(".js-product-nav-elements li").removeClass("active"), $(".js-reviews").addClass("active"))
                            : $(".js-supplement-section").length > 0 &&
                              $window.scrollTop() > $(".js-supplement-section").offset().top - 101 &&
                              $window.scrollTop() < $(".js-supplement-section").offset().top + $(".js-supplement-section").height() - 101
                            ? ($(".js-product-nav-elements li").removeClass("active"), $(".js-supplements").addClass("active"))
                            : (($(".js-benefits-section").length > 0 &&
                                  $(".js-product-description-section").length > 0 &&
                                  $window.scrollTop() > $(".js-product-description-section").offset().top - 101 &&
                                  $window.scrollTop() < $(".js-product-description-section").offset().top + $(".js-product-description-section").height() + $(".js-benefits-section").height() - 101) ||
                                  (0 == $(".js-benefits-section").length &&
                                      $(".js-product-description-section").length > 0 &&
                                      $window.scrollTop() > $(".js-product-description-section").offset().top - 101 &&
                                      $window.scrollTop() < $(".js-product-description-section").offset().top + $(".js-product-description-section").height() - 101)) &&
                              ($(".js-product-nav-elements li").removeClass("active"), $(".js-description").addClass("active"));
                }),
            $(".js-product-nav-elements li").on("click", function () {
                ($this = $(this)),
                    setTimeout(function () {
                        $(".js-product-nav-elements li").removeClass("active"), $this.addClass("active");
                    }, 100);
            }),
            $(".product-page--thumb").on("click", function () {}),
            $(".scrollTo").on("click", function (e) {
                if ("" !== this.hash) {
                    e.preventDefault();
                    var t = this.hash,
                        i = $(t).offset().top - 100;
                    $("html, body").animate({ scrollTop: i }, 800, function () {});
                }
            }),
            $(".js-frequent-product-checkbox").prop("checked", !0);
        var r = $(".js-frequent-product-priceTotal").data("total");
        r /= 100;
        for (var c = 0, l = 0; l < $(".Price--compareAt--frequent").length; l++) c += Number($(".Price--compareAt--frequent")[l].innerHTML.substr(1));
        if (((c = Math.round(100 * c) / 100), 0 == r ? $(".js-frequent-totalPrice").html("$ 0") : ($(".js-frequent-totalPrice").html("$ " + r), $(".js-frequent-totalPrice").attr("data-revisedTotalPrice", r)), r != c)) {
            $(".js-frequent-compareAt").html("$" + c), $(".js-frequent-compareAt").attr("data-revisedCompareAt", c);
            var d = ((c - r) / c) * 100;
            (d = Math.round(100 * d) / 100), $(".js-frequent-discount").html(d + "% OFF");
        } else $(".js-frequent-compareAt").css("display", "none"), $(".js-frequent-discount").css("display", "none");
        $(".js-frequent-product-checkbox").change(function () {
            if (
                ($(".frequent-go-cart-text").hasClass("active") && ($(".frequent-go-cart-text").removeClass("active"), $(".frequent-add-cart-text").addClass("active")),
                0 == $(".js-frequent-product-checkbox:checked").length
                    ? $(".js-frequent-product-priceTotal").css({ "max-height": "0", "padding-top": "0px" })
                    : $(".js-frequent-product-priceTotal").css({ "max-height": "200px", "padding-top": "10px" }),
                this.checked)
            ) {
                var e = $(this).attr("id");
                $("." + e).addClass("active-price");
            } else (e = $(this).attr("id")), $("." + e).removeClass("active-price");
            for (var t = $(".active-price").length, i = 0, s = 0, n = 0, o = 0; i < t; )
                (s += Number($(".active-price .Price--highlight--frequent")[i].innerHTML.substr(1))), (n += Number($(".active-price .Price--compareAt--frequent")[i].innerHTML.substr(1))), i++;
            (s = Math.round(100 * s) / 100),
                (n = Math.round(100 * n) / 100) != s
                    ? ((o = ((n - s) / n) * 100),
                      (o = Math.round(100 * o) / 100),
                      $(".js-frequent-compareAt").html("$ " + n),
                      $(".js-frequent-discount").html(o + " % OFF"),
                      $(".js-frequent-compareAt").css("display", "inline-block"),
                      $(".js-frequent-discount").css("display", "inline-block"))
                    : ($(".js-frequent-compareAt").css("display", "none"), $(".js-frequent-discount").css("display", "none")),
                $(".js-frequent-totalPrice").html("$ " + s);
        });
    }),
    0 != document.getElementsByClassName("frequently-boughtProducts-section").length)
) {
    var handler = onVisibilityChange(document.getElementsByClassName("frequently-boughtProducts-section")[0], addToCartVisibility);
    function addToCartVisibility() {}
}
function isElementInViewport(e) {
    "function" == typeof jQuery && e instanceof jQuery && (e = e[0]);
    var t = e.getBoundingClientRect();
    return t.bottom > 0 && t.right > 0 && t.left < (window.innerWidth || document.documentElement.clientWidth) && t.top < (window.innerHeight || document.documentElement.clientHeight);
}
$(window).on("DOMContentLoaded load resize scroll", handler),
    $(window).on("load ready resize", function () {
        if (window.matchMedia("(max-width: 1024px)").matches) {
            $(".js-product-heading").insertBefore($(".js-attach-heading"));
            for (var e = 0; e < $(".Linklist__Item h4").length; e++) "Daily Deals" == $(".Linklist__Item h4")[e].innerHTML && $($(".Linklist__Item h4")[e].closest(".Linklist__Item")).css("display", "block");
        } else for ($(".js-product-heading").appendTo($(".js-heading-wrapper")), e = 0; e < $(".Linklist__Item h4").length; e++) "Daily Deals" == $(".Linklist__Item h4")[e].innerHTML && $($(".Linklist__Item h4")[e].closest(".Linklist__Item")).css("display", "none");
        window.matchMedia("(max-width: 767px)").matches
            ? ($(".image-zoom").trigger("zoom.destroy"), $(".js-nav-search").insertAfter($("header#section-header")), $(".js-review-btns-container").insertAfter($(".js-full-underline--reviews")))
            : ($(".image-zoom").trigger("zoom.destroy"),
              $.each($(".image-zoom"), function (e, t) {
                  try {
                      $(this)
                          .parent()
                          .zoom({ url: $(this).attr("data-zoom"), zoom: 2 });
                  } catch (e) {}
              }),
              $(".js-search-nav-container").append($(".js-nav-search")),
              $(".js-reviews-heading").append($(".js-review-btns-container")));
    });
var $allVideos = $("iframe[src^='//player.vimeo.com'], iframe[src^='//www.youtube.com']"),
    $fluidEl = $("body");
function handleResponsiveVimeoIframe() {
    const e = document.querySelector("[data-vimeo-desktop]"),
        t = document.querySelector("[data-vimeo-mobile]");
    let i, s;
    e && (i = new Vimeo.Player(e)),
        t && (s = new Vimeo.Player(t)),
        window.innerWidth > 767
            ? t &&
              s.getPaused().then(function (e) {
                  !1 === e && s.pause();
              })
            : e &&
              t &&
              i.getPaused().then(function (e) {
                  !1 === e && i.pause();
              });
}
$allVideos.each(function () {
    $(this)
        .data("aspectRatio", this.height / this.width)
        .removeAttr("height")
        .removeAttr("width");
}),
    $(window)
        .resize(function () {
            var e = $fluidEl.width();
            $allVideos.each(function () {
                var t = $(this);
                t.width(e).height(e * t.data("aspectRatio"));
            });
        })
        .resize();
const iframesContainer = document.querySelector(".embedded-iframe");
iframesContainer && (window.addEventListener("resize", handleResponsiveVimeoIframe), window.dispatchEvent(new Event("resize")));
var i,
    acc = document.getElementsByClassName("accordion");
if (acc)
    for (i = 0; i < acc.length; i++)
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var e = this.nextElementSibling;
            "block" === e.style.display ? (e.style.display = "none") : (e.style.display = "block");
        });
