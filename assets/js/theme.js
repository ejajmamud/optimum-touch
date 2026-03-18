(function ($) {
    "use strict";

    if ($(".testimonials-two__carousel__slider").length && $(".testimonials-two__carousel__thumbs").length) {
        // Initialize the main slider (swiper)
        var slider = new Swiper(".testimonials-two__carousel__slider", {
            slidesPerView: 1,
            centeredSlides: true,
            loop: true,
            loopedSlides: 6,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        // Initialize the thumbs slider (swiper)
        var thumbs = new Swiper(".testimonials-two__carousel__thumbs", {
            slidesPerView: "auto",
            spaceBetween: 0,
            centeredSlides: true,
            loop: true,
            slideToClickedSlide: true,
        });
        slider.controller.control = thumbs;
        thumbs.controller.control = slider;
    }


    $(".circleGraphic").each(function () {
        let elm = $(this);
        if (elm.length) {
            elm.appear(function () {
                let options = elm.data("circle-options");
                elm.circleGraphic(
                    typeof options === "object" ? options : JSON.parse(options)
                );
            });
        }
    });


    if ($(".range-slider-month").length) {
    }

    if ($(".range-slider-count").length) {
    }

    if ($("#loan-calculator").length) {
        var monthRange = document.getElementById("range-slider-month");
        var countRange = document.getElementById("range-slider-count");

        var limitFieldMinMonth = document.getElementById("min-value-rangeslider-month");
        var limitFieldMaxMonth = document.getElementById("max-value-rangeslider-month");

        var limitFieldMinCount = document.getElementById("min-value-rangeslider-count");
        var limitFieldMaxCount = document.getElementById("max-value-rangeslider-count");

        noUiSlider.create(monthRange, {
            start: 8,
            behaviour: "snap",
            step: 1,
            tooltips: [
                wNumb({
                    decimals: 0,
                }),
            ],
            connect: [true, false],
            range: {
                min: 1,
                max: 18,
            },
        });

        noUiSlider.create(countRange, {
            start: 16000,
            step: 1000,
            tooltips: [
                wNumb({
                    decimals: 0,
                    prefix: "RM ",
                }),
            ],
            behaviour: "snap",
            connect: [true, false],
            range: {
                min: 1000,
                max: 40000,
            },
        });

        monthRange.noUiSlider.on("update", function (values, handle) {
            (handle ? $(limitFieldMaxMonth) : $(limitFieldMinMonth)).attr("value", values[handle]);
            let loanMoney = limitFieldMinCount.value;
            let interestRate = $("#loan-calculator").data("interest-rate");
            let interestRatePercent = parseInt(interestRate, 10) / 100;
            let totalPay = loanMoney * interestRatePercent + parseInt(loanMoney, 10);
            let monthlyPay = totalPay / parseInt(values[handle], 10);

            $("#loan-month").html(parseInt(values[handle], 10));
            $("#loan-monthly-pay").html(parseInt(monthlyPay, 10));
            $("#loan-total").html(parseInt(totalPay, 10));
        });

        countRange.noUiSlider.on("update", function (values, handle) {
            (handle ? $(limitFieldMaxCount) : $(limitFieldMinCount)).attr("value", values[handle]);

            let loanMonth = limitFieldMinMonth.value;
            let interestRate = $("#loan-calculator").data("interest-rate");
            let interestRatePercent = parseInt(interestRate, 10) / 100;
            let totalPay = values[handle] * interestRatePercent + parseInt(values[handle], 10);
            let monthlyPay = totalPay / parseInt(loanMonth, 10);

            $("#loan-month").html(parseInt(loanMonth, 10));
            $("#loan-monthly-pay").html(parseInt(monthlyPay, 10));
            $("#loan-total").html(parseInt(totalPay, 10));
        });

        let loanMoney = limitFieldMinCount.value;
        let loanMonth = limitFieldMinMonth.value;
        let interestRate = $("#loan-calculator").data("interest-rate");
        let interestRatePercent = parseInt(interestRate, 10) / 100;
        let totalPay = loanMoney * interestRatePercent + parseInt(loanMoney, 10);
        let monthlyPay = totalPay / parseInt(loanMonth, 10);

        $("#loan-month").html(parseInt(loanMonth, 10));
        $("#loan-monthly-pay").html(parseInt(monthlyPay, 10));
        $("#loan-total").html(parseInt(totalPay, 10));
    }

    if ($(".scroll-to-target").length) {
        $(".scroll-to-target").on("click", function () {
            var target = $(this).attr("data-target");
            // animate
            $("html, body").animate(
                {
                    scrollTop: $(target).offset().top,
                },
                1000
            );

            return false;
        });
    }

    if ($(".contact-form-validated").length) {
        $(".contact-form-validated").validate({
            // initialize the plugin
            rules: {
                name: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
                },
                message: {
                    required: true,
                },
                subject: {
                    required: true,
                },
            },
            submitHandler: function (form) {
                // sending value with ajax request
                $.post($(form).attr("action"), $(form).serialize(), function (response) {
                    $(form).parent().find(".result").append(response);
                    $(form).find('input[type="text"]').val("");
                    $(form).find('input[type="email"]').val("");
                    $(form).find("textarea").val("");
                });
                return false;
            },
        });
    }

    // mailchimp form
    if ($(".mc-form").length) {
        $(".mc-form").each(function () {
            var Self = $(this);
            var mcURL = Self.data("url");
            var mcResp = Self.parent().find(".mc-form__response");

            Self.ajaxChimp({
                url: mcURL,
                callback: function (resp) {
                    // appending response
                    mcResp.append(function () {
                        return '<p class="mc-message">' + resp.msg + "</p>";
                    });
                    // making things based on response
                    if (resp.result === "success") {
                        // Do stuff
                        Self.removeClass("errored").addClass("successed");
                        mcResp.removeClass("errored").addClass("successed");
                        Self.find("input").val("");

                        mcResp.find("p").fadeOut(10000);
                    }
                    if (resp.result === "error") {
                        Self.removeClass("successed").addClass("errored");
                        mcResp.removeClass("successed").addClass("errored");
                        Self.find("input").val("");

                        mcResp.find("p").fadeOut(10000);
                    }
                },
            });
        });
    }

    if ($(".video-popup").length) {
        $(".video-popup").magnificPopup({
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: true,

            fixedContentPos: false,
        });
    }

    if ($(".img-popup").length) {
        var groups = {};
        $(".img-popup").each(function () {
            var id = parseInt($(this).attr("data-group"), 10);

            if (!groups[id]) {
                groups[id] = [];
            }

            groups[id].push(this);
        });

        $.each(groups, function () {
            $(this).magnificPopup({
                type: "image",
                closeOnContentClick: true,
                closeBtnInside: false,
                gallery: {
                    enabled: true,
                },
            });
        });
    }

    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function () {
            let anchor = $(this).find("a");
            if ($(anchor).attr("href") == FileName) {
                $(this).addClass("current");
            }
        });
        // if any li has .current elmnt add class
        selector.children("li").each(function () {
            if ($(this).find(".current").length) {
                $(this).addClass("current");
            }
        });
        // if no file name return
        if ("" == FileName) {
            selector.find("li").eq(0).addClass("current");
        }
    }
    if ($(".main-menu__list").length) {
        // dynamic current class
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
    }

    if ($(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(".mobile-nav__container");
        mobileNavContainer.innerHTML = navContent;
    }
    if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(".sticky-header__content");
        mobileNavContainer.innerHTML = navContent;
    }

    // Global language switch (EN/BM) with full-page translation.
    var langPrefStorageKey = "ot_site_language_pref";
    var langCacheStorageKey = "ot_site_language_cache_v2";
    var activeLang = "en";
    var langCache = {};
    var trackedTextNodes = [];
    var trackedAttrElements = [];
    var originalDocumentTitle = document.title || "";
    var isApplyingLanguage = false;
    var applyingLanguageCount = 0;
    var languageRunId = 0;
    var reapplyTimer = null;
    var manualMalayMap = {
        "Apply Now": "Mohon Sekarang",
        "Contact Us": "Hubungi Kami",
        "Contact our agent": "Hubungi ejen kami",
        "Speak to an Agent": "Berbincang dengan Ejen",
        "Company Profile": "Profil Syarikat",
        "Company News": "Berita Syarikat",
        "FAQs": "Soalan Lazim",
        "Home": "Laman Utama",
        "About": "Tentang Kami",
        "About Us": "Tentang Kami",
        "Quick Links": "Pautan Pantas",
        "Our Services": "Perkhidmatan Kami",
        "License Details": "Butiran Lesen",
        "Service": "Perkhidmatan",
        "Services": "Perkhidmatan",
        "Loan Types": "Jenis Pinjaman",
        "News": "Berita",
        "Read More": "Baca Lanjut",
        "Loan Services": "Perkhidmatan Pinjaman",
        "Personal Loan": "Pinjaman Peribadi",
        "Business Loan": "Pinjaman Perniagaan",
        "Medical Loan": "Pinjaman Perubatan",
        "Check Eligibility": "Semak Kelayakan",
        "Eligibility Check": "Semakan Kelayakan",
        "Are You?": "Adakah Anda?",
        "Looking for RM 2,000 to RM 20,000": "Mencari RM 2,000 hingga RM 20,000",
        "Need short tenure: 2-18 months": "Mahukan tempoh singkat: 2-18 bulan",
        "Malaysian citizen": "Warganegara Malaysia",
        "Below 55 years old": "Berumur bawah 55 tahun",
        "Not bankrupt": "Tidak muflis",
        "We can help.": "Kami boleh bantu.",
        "Walk in by appointment only.": "Kunjungan walk-in melalui temu janji sahaja.",
        "View Checklist": "Lihat Senarai Semak",
        "Required documents": "Dokumen diperlukan",
        "How the Process Works": "Bagaimana Proses Berjalan",
        "How Our Process Works": "Bagaimana Proses Kami Berjalan",
        "Qualification to Apply": "Kelayakan untuk Memohon",
        "Share basic details. We quickly confirm if you qualify.": "Kongsi maklumat asas. Kami sahkan dengan cepat sama ada anda layak.",
        "Getting in Touch": "Berhubung dengan Anda",
        "Our team contacts you and propose the solution for you.": "Pasukan kami akan menghubungi anda dan mencadangkan penyelesaian yang sesuai untuk anda.",
        "Office Visit and Immediate Disbursement": "Kunjungan ke Pejabat dan Pembayaran Segera",
        "Document Verification, Discuss terms, Signing of Agreement and Loan disbursement Instantly.": "Pengesahan dokumen, perbincangan terma, tandatangan perjanjian, dan pembayaran pinjaman serta-merta.",
        "A three-step flow keeps application, agreement, and disbursement fully transparent.": "Aliran tiga langkah memastikan permohonan, perjanjian, dan pembayaran kekal telus sepenuhnya.",
        "Prepare the required documents below before submission.": "Sediakan dokumen diperlukan di bawah sebelum penghantaran.",
        "Final approval is subject to document review, affordability, and signed agreement.": "Kelulusan akhir tertakluk kepada semakan dokumen, kemampuan bayaran, dan perjanjian yang ditandatangani.",
        "Operates as a licensed moneylender in Malaysia.": "Beroperasi sebagai pemberi pinjam wang berlesen di Malaysia.",
        "Identity checks, document review, and agreement signing are conducted face-to-face at the office.": "Semakan identiti, dokumen, dan perjanjian dibuat secara bersemuka di pejabat.",
        "Rates, charges, and repayment schedule are explained in writing before signing.": "Kadar, caj, dan jadual bayaran diterangkan secara bertulis sebelum tandatangan."
    };

    try {
        var cachedLanguage = (localStorage.getItem(langPrefStorageKey) || "en").toLowerCase();
        activeLang = cachedLanguage === "bm" ? "bm" : "en";
    } catch (e) {
        activeLang = "en";
    }

    try {
        var cacheRaw = localStorage.getItem(langCacheStorageKey);
        if (cacheRaw) {
            var parsedCache = JSON.parse(cacheRaw);
            if (parsedCache && typeof parsedCache === "object") {
                langCache = parsedCache;
            }
        }
    } catch (e) {
        langCache = {};
    }

    var persistLangCache = function () {
        try {
            localStorage.setItem(langCacheStorageKey, JSON.stringify(langCache));
        } catch (e) {
            // Ignore storage quota errors.
        }
    };

    var getLangToggleMarkup = function (variant) {
        var extraClass = variant === "mobile" ? " lang-switch--mobile" : "";
        var switchType = variant === "mobile" ? " data-lang-switch-mobile" : "";
        return '' +
            '<div class="lang-switch' + extraClass + '" data-lang-switch' + switchType + ' data-no-translate="true" aria-label="Language Switch">' +
                '<button type="button" class="lang-switch__btn" data-lang-toggle="en">EN</button>' +
                '<button type="button" class="lang-switch__btn" data-lang-toggle="bm">BM</button>' +
            "</div>";
    };

    var injectLanguageSwitches = function () {
        document.querySelectorAll(".main-header .main-header__info, .stricky-header .main-header__info").forEach(function (block) {
            if (block.querySelector("[data-lang-switch]:not([data-lang-switch-mobile])")) {
                return;
            }
            block.insertAdjacentHTML("beforeend", getLangToggleMarkup("desktop"));
        });

        document.querySelectorAll(".main-header .main-menu .logo-box").forEach(function (box) {
            if (box.querySelector("[data-lang-switch-mobile]")) {
                return;
            }
            var toggler = box.querySelector(".mobile-nav__toggler");
            if (toggler) {
                toggler.insertAdjacentHTML("beforebegin", getLangToggleMarkup("mobile"));
            } else {
                box.insertAdjacentHTML("beforeend", getLangToggleMarkup("mobile"));
            }
        });
    };

    var syncLanguageSwitchUi = function (lang) {
        document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
            var isActive = (btn.getAttribute("data-lang-toggle") || "").toLowerCase() === lang;
            btn.classList.toggle("is-active", isActive);
            btn.setAttribute("aria-pressed", isActive ? "true" : "false");
        });

        document.querySelectorAll("#language-select").forEach(function (selectEl) {
            var nextValue = lang === "bm" ? "bahasa" : "english";
            if (selectEl.value !== nextValue) {
                selectEl.value = nextValue;
            }
            if (window.jQuery && typeof window.jQuery(selectEl).selectpicker === "function") {
                window.jQuery(selectEl).selectpicker("refresh");
            }
        });

        document.documentElement.setAttribute("lang", lang === "bm" ? "ms" : "en");
        document.body.classList.toggle("is-lang-bm", lang === "bm");
    };

    var markNavAsManualTranslation = function () {
        document.querySelectorAll(".main-menu__list").forEach(function (list) {
            list.setAttribute("data-no-translate", "true");
        });
    };

    var formatMenuLabelsForLanguage = function (lang) {
        var menuLinks = document.querySelectorAll(".main-header .main-menu > .container > .main-menu__list > li > a, .stricky-header .main-menu__list > li > a, .mobile-nav__content .main-menu__list > li > a");
        menuLinks.forEach(function (link) {
            if (link.closest(".search-btn") || link.querySelector("i, svg")) {
                return;
            }

            if (typeof link.__i18nMenuOriginalHTML === "undefined") {
                link.__i18nMenuOriginalHTML = link.innerHTML;
                link.__i18nMenuOriginalText = (link.textContent || "").replace(/\s+/g, " ").trim();
                var menuEnLabel = link.__i18nMenuOriginalText;
                var menuBmLabel = manualMalayMap[menuEnLabel] || menuEnLabel;
                link.__i18nMenuMalayText = menuBmLabel;

                var longestWordLength = function (text) {
                    var words = (text || "").split(/\s+/).filter(Boolean);
                    var maxLen = 0;
                    words.forEach(function (w) {
                        maxLen = Math.max(maxLen, w.length);
                    });
                    return maxLen;
                };

                var maxWordLength = Math.max(longestWordLength(menuEnLabel), longestWordLength(menuBmLabel));
                var stableWidth = Math.min(124, Math.max(74, Math.round(maxWordLength * 8.2 + 14)));
                link.__i18nMenuStableWidth = stableWidth;
            }

            if (lang !== "bm") {
                link.innerHTML = link.__i18nMenuOriginalHTML;
            } else {
                var bmLabel = link.__i18nMenuMalayText || (link.textContent || "").replace(/\s+/g, " ").trim();
                var words = bmLabel.split(/\s+/).filter(Boolean);
                if (words.length === 2) {
                    link.innerHTML = '<span class="lang-break">' + words[0] + "<br>" + words[1] + "</span>";
                } else {
                    link.textContent = bmLabel;
                }
            }

            var isDesktopNav = link.closest(".main-header .main-menu__list, .stricky-header .main-menu__list");
            if (isDesktopNav) {
                link.style.width = (link.__i18nMenuStableWidth || 88) + "px";
            } else {
                link.style.removeProperty("width");
            }
        });
    };

    var isTranslatableText = function (text) {
        if (!text) {
            return false;
        }
        var trimmed = text.trim();
        if (!trimmed) {
            return false;
        }
        if (!/[A-Za-z]/.test(trimmed)) {
            return false;
        }
        return true;
    };

    var rememberTextNode = function (node) {
        if (typeof node.__i18nOriginalText === "undefined") {
            node.__i18nOriginalText = node.nodeValue;
            trackedTextNodes.push(node);
        }
    };

    var rememberElementAttr = function (el, attrName) {
        if (!el.__i18nOriginalAttrs) {
            el.__i18nOriginalAttrs = {};
        }
        if (typeof el.__i18nOriginalAttrs[attrName] === "undefined") {
            el.__i18nOriginalAttrs[attrName] = el.getAttribute(attrName);
        }
        if (!el.__i18nAttrTracked) {
            el.__i18nAttrTracked = true;
            trackedAttrElements.push(el);
        }
    };

    var collectTranslatableTargets = function (root) {
        var textTargets = [];
        var attrTargets = [];
        var sourceRoot = root || document.body;
        if (!sourceRoot) {
            return { textTargets: textTargets, attrTargets: attrTargets };
        }

        var queryRoot = sourceRoot.nodeType === 9 ? sourceRoot.documentElement : sourceRoot;
        if (!queryRoot) {
            return { textTargets: textTargets, attrTargets: attrTargets };
        }

        var walker = document.createTreeWalker(queryRoot, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                if (!node || !node.parentElement) {
                    return NodeFilter.FILTER_REJECT;
                }
                var parentTag = (node.parentElement.tagName || "").toUpperCase();
                if (parentTag === "SCRIPT" || parentTag === "STYLE" || parentTag === "NOSCRIPT" || parentTag === "TEXTAREA") {
                    return NodeFilter.FILTER_REJECT;
                }
                if (node.parentElement.closest("[data-no-translate], .notranslate")) {
                    return NodeFilter.FILTER_REJECT;
                }
                var candidate = typeof node.__i18nOriginalText === "undefined" ? node.nodeValue : node.__i18nOriginalText;
                if (!isTranslatableText(candidate)) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });

        while (walker.nextNode()) {
            var textNode = walker.currentNode;
            rememberTextNode(textNode);
            var originalText = textNode.__i18nOriginalText || "";
            var coreText = originalText.trim();
            if (!isTranslatableText(coreText)) {
                continue;
            }
            textTargets.push({
                node: textNode,
                original: originalText,
                core: coreText
            });
        }

        var attrSelector = "[placeholder],[title],[aria-label],[alt],input[type='submit'][value],input[type='button'][value],button[value]";
        queryRoot.querySelectorAll(attrSelector).forEach(function (el) {
            if (el.closest("[data-no-translate], .notranslate")) {
                return;
            }

            ["placeholder", "title", "aria-label", "alt", "value"].forEach(function (attrName) {
                if (!el.hasAttribute(attrName)) {
                    return;
                }
                var currentValue = el.getAttribute(attrName);
                if (!isTranslatableText(currentValue)) {
                    return;
                }
                rememberElementAttr(el, attrName);
                var originalValue = el.__i18nOriginalAttrs[attrName];
                if (!isTranslatableText(originalValue)) {
                    return;
                }
                attrTargets.push({
                    element: el,
                    attrName: attrName,
                    original: originalValue,
                    core: originalValue.trim()
                });
            });
        });

        return { textTargets: textTargets, attrTargets: attrTargets };
    };

    var collectDocumentMetaTargets = function () {
        var docTargets = [];

        if (isTranslatableText(originalDocumentTitle)) {
            docTargets.push({
                type: "title",
                original: originalDocumentTitle,
                core: originalDocumentTitle.trim()
            });
        }

        var metaSelector = "meta[name='description'],meta[property='og:title'],meta[property='og:description'],meta[name='twitter:title'],meta[name='twitter:description']";
        document.querySelectorAll(metaSelector).forEach(function (el) {
            if (!el.hasAttribute("content")) {
                return;
            }
            rememberElementAttr(el, "content");
            var originalValue = (el.__i18nOriginalAttrs && el.__i18nOriginalAttrs.content) || "";
            if (!isTranslatableText(originalValue)) {
                return;
            }
            docTargets.push({
                type: "meta",
                element: el,
                attrName: "content",
                original: originalValue,
                core: originalValue.trim()
            });
        });

        return docTargets;
    };

    var translateTextsBatch = async function (texts, targetLang) {
        var separator = "\n[[[OTSEP_9f2d]]]\n";
        var query = texts.join(separator);
        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" + targetLang + "&dt=t&q=" + encodeURIComponent(query);
        var response = await fetch(url, { method: "GET" });
        if (!response.ok) {
            throw new Error("Translation request failed");
        }
        var data = await response.json();
        var translated = ((data && data[0]) || []).map(function (part) {
            return (part && part[0]) || "";
        }).join("");
        var normalized = translated.replace(/\s*\[\[\[OTSEP_9f2d\]\]\]\s*/g, "[[[OTSEP_9f2d]]]");
        var pieces = normalized.split("[[[OTSEP_9f2d]]]");
        if (pieces.length !== texts.length) {
            throw new Error("Unexpected translation split");
        }
        return pieces.map(function (item) { return item.trim(); });
    };

    var translateMissingToMalay = async function (sourceTexts, runId) {
        if (runId !== languageRunId) {
            return;
        }

        sourceTexts.forEach(function (sourceText) {
            if (manualMalayMap[sourceText]) {
                langCache[sourceText] = manualMalayMap[sourceText];
            }
        });

        var missing = sourceTexts.filter(function (item) { return !langCache[item]; });
        if (!missing.length) {
            return;
        }

        var chunks = [];
        var maxItemsPerChunk = 14;
        var maxCharsPerChunk = 2400;
        var current = [];
        var currentChars = 0;

        missing.forEach(function (text) {
            var nextLen = currentChars + text.length + 16;
            if (current.length >= maxItemsPerChunk || nextLen > maxCharsPerChunk) {
                if (current.length) {
                    chunks.push(current);
                }
                current = [];
                currentChars = 0;
            }
            current.push(text);
            currentChars += text.length + 16;
        });
        if (current.length) {
            chunks.push(current);
        }

        for (var i = 0; i < chunks.length; i++) {
            if (runId !== languageRunId) {
                return;
            }
            var batch = chunks[i];
            try {
                var translatedBatch = await translateTextsBatch(batch, "ms");
                if (runId !== languageRunId) {
                    return;
                }
                batch.forEach(function (original, idx) {
                    langCache[original] = translatedBatch[idx] || original;
                });
            } catch (e) {
                for (var s = 0; s < batch.length; s++) {
                    if (runId !== languageRunId) {
                        return;
                    }
                    var single = batch[s];
                    try {
                        var singleResult = await translateTextsBatch([single], "ms");
                        if (runId !== languageRunId) {
                            return;
                        }
                        langCache[single] = singleResult[0] || single;
                    } catch (singleError) {
                        langCache[single] = single;
                    }
                }
            }
        }

        persistLangCache();
    };

    var applyMalayTranslation = async function (root, runId) {
        if (runId !== languageRunId) {
            return;
        }

        var targets = collectTranslatableTargets(root || document.body);
        var documentTargets = collectDocumentMetaTargets();
        var allCoresMap = {};

        targets.textTargets.forEach(function (target) {
            allCoresMap[target.core] = true;
        });
        targets.attrTargets.forEach(function (target) {
            allCoresMap[target.core] = true;
        });
        documentTargets.forEach(function (target) {
            allCoresMap[target.core] = true;
        });

        var allCores = Object.keys(allCoresMap);
        if (allCores.length) {
            await translateMissingToMalay(allCores, runId);
            if (runId !== languageRunId) {
                return;
            }
        }

        targets.textTargets.forEach(function (target) {
            var original = target.original || "";
            var translatedCore = langCache[target.core] || target.core;
            var leading = (original.match(/^\s*/) || [""])[0];
            var trailing = (original.match(/\s*$/) || [""])[0];
            target.node.nodeValue = leading + translatedCore + trailing;
        });

        targets.attrTargets.forEach(function (target) {
            var original = target.original || "";
            var translatedCore = langCache[target.core] || target.core;
            var leading = (original.match(/^\s*/) || [""])[0];
            var trailing = (original.match(/\s*$/) || [""])[0];
            target.element.setAttribute(target.attrName, leading + translatedCore + trailing);
        });

        documentTargets.forEach(function (target) {
            var original = target.original || "";
            var translatedCore = langCache[target.core] || target.core;
            var leading = (original.match(/^\s*/) || [""])[0];
            var trailing = (original.match(/\s*$/) || [""])[0];
            if (target.type === "title") {
                document.title = leading + translatedCore + trailing;
                return;
            }
            target.element.setAttribute(target.attrName, leading + translatedCore + trailing);
        });
    };

    var restoreEnglish = function () {
        document.title = originalDocumentTitle;

        trackedTextNodes = trackedTextNodes.filter(function (node) {
            if (!node || !node.isConnected || typeof node.__i18nOriginalText === "undefined") {
                return false;
            }
            node.nodeValue = node.__i18nOriginalText;
            return true;
        });

        trackedAttrElements = trackedAttrElements.filter(function (el) {
            if (!el || !el.isConnected || !el.__i18nOriginalAttrs) {
                return false;
            }
            Object.keys(el.__i18nOriginalAttrs).forEach(function (attrName) {
                var original = el.__i18nOriginalAttrs[attrName];
                if (original === null || typeof original === "undefined") {
                    el.removeAttribute(attrName);
                } else {
                    el.setAttribute(attrName, original);
                }
            });
            return true;
        });
    };

    var setLanguage = async function (lang, skipSave) {
        clearTimeout(reapplyTimer);
        var previousLang = activeLang;
        var nextLang = (lang || "en").toLowerCase() === "bm" ? "bm" : "en";
        var runId = ++languageRunId;
        activeLang = nextLang;
        markNavAsManualTranslation();
        injectLanguageSwitches();
        syncLanguageSwitchUi(activeLang);

        if (!skipSave) {
            try {
                localStorage.setItem(langPrefStorageKey, activeLang);
            } catch (e) {
                // Ignore storage errors.
            }
        }

        applyingLanguageCount += 1;
        isApplyingLanguage = true;
        try {
            // Force clean state when returning to EN so stale BM text cannot persist.
            if (nextLang === "en" && previousLang === "bm") {
                formatMenuLabelsForLanguage("en");
                window.location.reload();
                return;
            }

            if (activeLang === "bm") {
                await applyMalayTranslation(document.body, runId);
            } else {
                restoreEnglish();
            }
            if (runId !== languageRunId) {
                return;
            }
            formatMenuLabelsForLanguage(activeLang);
        } finally {
            applyingLanguageCount = Math.max(0, applyingLanguageCount - 1);
            isApplyingLanguage = applyingLanguageCount > 0;
        }
    };

    injectLanguageSwitches();
    markNavAsManualTranslation();
    window.setTimeout(injectLanguageSwitches, 400);
    window.setTimeout(markNavAsManualTranslation, 400);
    window.setTimeout(injectLanguageSwitches, 1200);
    window.setTimeout(markNavAsManualTranslation, 1200);
    window.addEventListener("load", injectLanguageSwitches);
    window.addEventListener("load", markNavAsManualTranslation);
    syncLanguageSwitchUi(activeLang);

    document.addEventListener("click", function (event) {
        var toggleBtn = event.target.closest("[data-lang-toggle]");
        if (!toggleBtn) {
            return;
        }
        event.preventDefault();
        var lang = toggleBtn.getAttribute("data-lang-toggle") || "en";
        setLanguage(lang);
    });

    document.addEventListener("change", function (event) {
        var languageSelect = event.target.closest("#language-select");
        if (!languageSelect) {
            return;
        }
        var selected = (languageSelect.value || "").toLowerCase();
        var lang = selected === "bahasa" || selected === "bm" ? "bm" : "en";
        setLanguage(lang);
    });

    var translationObserver = new MutationObserver(function (mutations) {
        if (activeLang !== "bm" || isApplyingLanguage) {
            return;
        }

        var hasTranslatableMutation = mutations.some(function (mutation) {
            if (mutation.type === "childList" && (mutation.addedNodes.length || mutation.removedNodes.length)) {
                return true;
            }
            if (mutation.type === "characterData") {
                return true;
            }
            if (mutation.type === "attributes") {
                return true;
            }
            return false;
        });

        if (!hasTranslatableMutation) {
            return;
        }

        clearTimeout(reapplyTimer);
        reapplyTimer = window.setTimeout(function () {
            if (activeLang === "bm") {
                setLanguage("bm", true);
            }
        }, 160);
    });

    if (document.body) {
        translationObserver.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ["placeholder", "title", "aria-label", "alt", "value", "content"]
        });
    }

    var scheduleMalayRefresh = function (delayMs) {
        window.setTimeout(function () {
            if (activeLang === "bm") {
                setLanguage("bm", true);
            }
        }, delayMs);
    };

    if (activeLang === "bm") {
        setLanguage("bm", true);
        scheduleMalayRefresh(180);
        scheduleMalayRefresh(850);
        window.addEventListener("pageshow", function () {
            scheduleMalayRefresh(80);
        });
        window.addEventListener("load", function () {
            scheduleMalayRefresh(40);
        });
    }

    // Keep hero clip section exactly viewport-height including live header height.
    var syncClipHeroViewport = function () {
        var heroClip = document.querySelector(".main-slider--clips");
        if (!heroClip) {
            return;
        }

        var headerRoot = document.querySelector(".main-header");
        var headerMenu = document.querySelector(".main-header .main-menu");
        var headerHeight = headerRoot ? headerRoot.getBoundingClientRect().height : 0;
        if (!headerHeight && headerMenu) {
            headerHeight = headerMenu.getBoundingClientRect().height;
        }
        heroClip.style.setProperty("--hero-header-offset", Math.max(0, headerHeight - 1) + "px");
    };

    syncClipHeroViewport();
    window.addEventListener("resize", syncClipHeroViewport, { passive: true });
    window.addEventListener("orientationchange", syncClipHeroViewport, { passive: true });
    window.setTimeout(syncClipHeroViewport, 120);

    if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(".mobile-nav__container .main-menu__list .dropdown > a");
        dropdownAnchor.each(function () {
            let self = $(this);
            let toggleBtn = document.createElement("BUTTON");
            toggleBtn.setAttribute("aria-label", "dropdown toggler");
            toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
            self.append(function () {
                return toggleBtn;
            });
            self.find("button").on("click", function (e) {
                e.preventDefault();
                let self = $(this);
                self.toggleClass("expanded");
                self.parent().toggleClass("expanded");
                self.parent().parent().children("ul").slideToggle();
            });
        });
    }

    // Toggle mobile navigation
    var syncMobileNavState = function () {
        $("body").toggleClass("mobile-nav-open", $(".mobile-nav__wrapper").hasClass("expanded"));
    };

    $(".mobile-nav__toggler").click(function (e) {
        e.preventDefault();
        $(".mobile-nav__wrapper").toggleClass("expanded");
        syncMobileNavState();
    });

    syncMobileNavState();

    var contactDisplayNumber = "0123285942";
    var whatsappNumber = "6" + contactDisplayNumber;
    var whatsappPrefillMessage = "Hi Optimum Touch team, I found your website and would like to enquire about consultation/appointment. Please assist. Thank you.";
    var whatsappCtaHref = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(whatsappPrefillMessage);

    // Route contact/appointment CTAs to WhatsApp with a standard website enquiry message
    var applyWhatsappToContactCtas = function () {
        $('a[href="contact.html"], a[href="./contact.html"]').each(function () {
            var link = $(this);
            var label = (link.text() || "").replace(/\s+/g, " ").trim().toLowerCase();
            var hasClockIcon = link.find(".pylon-icon-clock2").length > 0;
            var isContactOrAppointment = label.indexOf("contact") !== -1 || label.indexOf("appointment") !== -1;
            var isPrimaryNavLink = link.closest(".main-menu__list, .mobile-nav__container, .sticky-header__content").length > 0;

            // Keep navigation links pointing to the actual Contact page.
            if (isPrimaryNavLink) {
                return;
            }

            if (hasClockIcon || isContactOrAppointment) {
                link.attr("href", whatsappCtaHref);
                link.attr("target", "_blank");
                link.attr("rel", "noopener noreferrer");
            }
        });
    };
    applyWhatsappToContactCtas();

    // Enforce primary CTA routes across pages:
    // "Apply Now" -> apply-now.html
    // "Contact our agent" -> WhatsApp
    var enforcePrimaryCtaRoutes = function () {
        $("a").each(function () {
            var link = $(this);
            var label = (link.text() || "").replace(/\s+/g, " ").trim().toLowerCase();

            if (label === "apply now" || label.indexOf("apply now ") === 0) {
                link.attr("href", "apply-now.html");
                link.removeAttr("target");
                link.removeAttr("rel");
                return;
            }

            if (label === "contact our agent" || label.indexOf("contact our agent ") === 0) {
                link.attr("href", whatsappCtaHref);
                link.attr("target", "_blank");
                link.attr("rel", "noopener noreferrer");
            }
        });
    };
    enforcePrimaryCtaRoutes();

    // Service detail page context mapping (image + heading + single-service detail content)
    var initServiceDetailsContext = function () {
        var serviceContextRoot = document.querySelector("[data-service-context]");
        if (!serviceContextRoot) {
            return;
        }

        var commonFaqOneQuestion = "Can I proceed if some documents are still pending?";
        var commonFaqOneAnswer = "Initial review may begin, but final approval requires complete mandatory documents and signed confirmation of terms.";
        var commonFaqThreeQuestion = "Is disbursement done before agreement signing?";
        var commonFaqThreeAnswer = "No. Disbursement is only arranged after terms are explained, accepted, and signed during consultation.";

        var serviceMap = {
            personal: {
                heading: "Personal Loan Criteria",
                intro: "Prepare the required documents below before submission.",
                subIntro: "Final approval is subject to document review, affordability, and signed agreement.",
                image: "assets/images/loan/personal_loan.jpg.jpeg",
                imageAlt: "Personal Loan",
                quickLinks: [
                    { href: "#loan-personal", label: "View Checklist" },
                    { href: "apply-now.html", label: "Apply Now" },
                    { href: "https://wa.me/60123285942?text=Hi%20Optimum%20Touch%2C%20I%20would%20like%20to%20check%20Personal%20Loan%20criteria%20and%20eligibility.", label: "Contact Now" }
                ],
                card: {
                    id: "loan-personal",
                    tagIcon: "fas fa-user-check",
                    tagLabel: "Personal Loan",
                    title: "Required documents",
                    list: [
                        "3 months bank statement.",
                        "Pay slip.",
                        "Personal IC.",
                        "KWSP statement.",
                        "Utilities bill with current address (TNB or Water Bill)."
                    ],
                    ctaLabel: "Contact for Personal Loan",
                    ctaHref: "https://wa.me/60123285942?text=Hi%20Optimum%20Touch%2C%20I%20would%20like%20to%20check%20Personal%20Loan%20criteria%20and%20eligibility."
                },
                faq: [
                    { q: commonFaqOneQuestion, a: commonFaqOneAnswer },
                    { q: "Which documents are most important for Personal Loan review?", a: "Please prepare your bank statement, pay slip, personal IC, KWSP statement, and utility bill with current address." },
                    { q: commonFaqThreeQuestion, a: commonFaqThreeAnswer }
                ]
            },
            business: {
                heading: "Business Loan Criteria",
                intro: "Prepare the required documents below before submission.",
                subIntro: "Final approval is subject to document review, affordability, and signed agreement.",
                image: "assets/images/business.jpg",
                imageAlt: "Business Loan",
                quickLinks: [
                    { href: "#loan-business", label: "View Checklist" },
                    { href: "apply-now.html", label: "Apply Now" },
                    { href: "https://wa.me/60123285942?text=Hi%20Optimum%20Touch%2C%20I%20would%20like%20to%20check%20Business%20Loan%20criteria%20and%20eligibility.", label: "Contact Now" }
                ],
                card: {
                    id: "loan-business",
                    tagIcon: "fas fa-briefcase",
                    tagLabel: "Business Loan",
                    title: "Required documents",
                    list: [
                        "6 months company statement.",
                        "Business SSM (Form 14).",
                        "Director IC.",
                        "Utilities bill with current address (TNB or Water Bill)."
                    ],
                    ctaLabel: "Contact for Business Loan",
                    ctaHref: "https://wa.me/60123285942?text=Hi%20Optimum%20Touch%2C%20I%20would%20like%20to%20check%20Business%20Loan%20criteria%20and%20eligibility."
                },
                faq: [
                    { q: commonFaqOneQuestion, a: commonFaqOneAnswer },
                    { q: "Which documents are most important for Business Loan review?", a: "Please prepare 6 months company statement, Business SSM (Form 14), Director IC, and current utility bill." },
                    { q: commonFaqThreeQuestion, a: commonFaqThreeAnswer }
                ]
            },
            medical: {
                heading: "Medical Loan Criteria",
                intro: "Prepare the required documents below before submission.",
                subIntro: "Final approval is subject to document review, affordability, and signed agreement.",
                image: "assets/images/loan/medical_loan.avif",
                imageAlt: "Medical Loan",
                quickLinks: [
                    { href: "#loan-medical", label: "View Checklist" },
                    { href: "apply-now.html", label: "Apply Now" },
                    { href: "https://wa.me/60123285942?text=Hi%20Optimum%20Touch%2C%20I%20would%20like%20to%20check%20Medical%20Loan%20criteria%20and%20eligibility.", label: "Contact Now" }
                ],
                card: {
                    id: "loan-medical",
                    tagIcon: "fas fa-briefcase-medical",
                    tagLabel: "Medical Loan",
                    title: "Required documents",
                    list: [
                        "3 months bank statement.",
                        "Pay slip.",
                        "Personal IC.",
                        "Medical supporting document (quotation, invoice, or appointment letter).",
                        "Utilities bill with current address (TNB or Water Bill)."
                    ],
                    ctaLabel: "Contact for Medical Loan",
                    ctaHref: "https://wa.me/60123285942?text=Hi%20Optimum%20Touch%2C%20I%20would%20like%20to%20check%20Medical%20Loan%20criteria%20and%20eligibility."
                },
                faq: [
                    { q: commonFaqOneQuestion, a: commonFaqOneAnswer },
                    { q: "Which documents are most important for Medical Loan review?", a: "Please prepare bank statement, pay slip, personal IC, medical supporting document, and utility bill with current address." },
                    { q: commonFaqThreeQuestion, a: commonFaqThreeAnswer }
                ]
            }
        };

        var hashToServiceMap = {
            "loan-personal": "personal",
            "loan-business": "business",
            "loan-medical": "medical"
        };

        var normalizeKey = function (value) {
            return (value || "").toString().trim().toLowerCase().replace(/[^a-z-]/g, "");
        };

        var escapeHtml = function (value) {
            return (value || "").toString()
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\"/g, "&quot;")
                .replace(/'/g, "&#39;");
        };

        var renderCriteriaCard = function (card) {
            var bulletHtml = (card.list || []).map(function (item) {
                return '<li><i class="fa fa-check-circle"></i>' + escapeHtml(item) + "</li>";
            }).join("");

            return '' +
                '<article id="' + escapeHtml(card.id) + '" class="service-details__criteria-card">' +
                    '<span class="service-details__criteria-tag"><i class="' + escapeHtml(card.tagIcon) + '"></i>' + escapeHtml(card.tagLabel) + "</span>" +
                    "<h5>" + escapeHtml(card.title) + "</h5>" +
                    '<ul class="list-unstyled about-two__list service-details__list">' + bulletHtml + "</ul>" +
                    '<a href="' + escapeHtml(card.ctaHref) + '" target="_blank" rel="noopener noreferrer" class="thm-btn">' + escapeHtml(card.ctaLabel) + "</a>" +
                "</article>";
        };

        var resolveServiceKey = function () {
            var fromParam = "";

            try {
                var params = new URLSearchParams(window.location.search || "");
                fromParam = normalizeKey(params.get("service"));
            } catch (e) {
                fromParam = "";
            }

            var hashKey = normalizeKey((window.location.hash || "").replace("#", ""));
            var fromHash = hashToServiceMap[hashKey] || "";

            if (fromParam && serviceMap[fromParam]) {
                return fromParam;
            }

            if (fromHash && serviceMap[fromHash]) {
                return fromHash;
            }

            return "personal";
        };

        var applyContext = function (serviceKey) {
            var safeKey = serviceMap[serviceKey] ? serviceKey : "personal";
            var context = serviceMap[safeKey];

            var imageEl = serviceContextRoot.querySelector("[data-service-image]");
            var headingEl = serviceContextRoot.querySelector("[data-service-heading]");
            var introEl = serviceContextRoot.querySelector("[data-service-intro]");
            var subIntroEl = serviceContextRoot.querySelector("[data-service-subintro]");
            var quickLinksRoot = serviceContextRoot.querySelector("[data-service-quick-links]");
            var criteriaWrap = serviceContextRoot.querySelector("[data-service-criteria-wrap]");

            if (imageEl) {
                imageEl.setAttribute("src", context.image);
                imageEl.setAttribute("alt", context.imageAlt);
            }

            if (headingEl) {
                headingEl.textContent = context.heading;
            }

            if (introEl) {
                introEl.textContent = context.intro;
            }

            if (subIntroEl) {
                subIntroEl.textContent = context.subIntro;
            }

            if (quickLinksRoot && context.quickLinks) {
                quickLinksRoot.innerHTML = context.quickLinks.map(function (link) {
                    var isExternal = /^https?:\/\//i.test(link.href);
                    var targetAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
                    return '<a href="' + escapeHtml(link.href) + '"' + targetAttrs + ">" + escapeHtml(link.label) + "</a>";
                }).join("");
            }

            if (criteriaWrap && context.card) {
                criteriaWrap.innerHTML = renderCriteriaCard(context.card);
            }

            if (context.faq && context.faq.length === 3) {
                var faqQ1 = serviceContextRoot.querySelector("[data-faq-q1]");
                var faqA1 = serviceContextRoot.querySelector("[data-faq-a1]");
                var faqQ2 = serviceContextRoot.querySelector("[data-faq-q2]");
                var faqA2 = serviceContextRoot.querySelector("[data-faq-a2]");
                var faqQ3 = serviceContextRoot.querySelector("[data-faq-q3]");
                var faqA3 = serviceContextRoot.querySelector("[data-faq-a3]");

                if (faqQ1) { faqQ1.textContent = context.faq[0].q; }
                if (faqA1) { faqA1.textContent = context.faq[0].a; }
                if (faqQ2) { faqQ2.textContent = context.faq[1].q; }
                if (faqA2) { faqA2.textContent = context.faq[1].a; }
                if (faqQ3) { faqQ3.textContent = context.faq[2].q; }
                if (faqA3) { faqA3.textContent = context.faq[2].a; }
            }

            serviceContextRoot.querySelectorAll("[data-service-link]").forEach(function (link) {
                var item = link.closest("li");
                if (!item) {
                    return;
                }

                item.classList.toggle("service-active", normalizeKey(link.getAttribute("data-service-link")) === safeKey);
            });

            var hashKey = normalizeKey((window.location.hash || "").replace("#", ""));
            if (hashKey && hashKey === normalizeKey(context.card.id)) {
                var hashTarget = document.getElementById(context.card.id);
                if (hashTarget) {
                    setTimeout(function () {
                        hashTarget.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 60);
                }
            }
        };

        applyContext(resolveServiceKey());

        window.addEventListener("hashchange", function () {
            applyContext(resolveServiceKey());
        });
    };
    initServiceDetailsContext();

    // Homepage loan cards: open mapped Services section when card body is clicked.
    var initHomeServiceCardNavigation = function () {
        var selector = ".service-one--home .service-one__card[data-card-target]";

        $(document)
            .off("click.homeServiceCard", selector)
            .on("click.homeServiceCard", selector, function (e) {
                if ($(e.target).closest("a, button, input, textarea, select, label").length) {
                    return;
                }
                var targetHref = $(this).attr("data-card-target");
                if (targetHref) {
                    window.location.href = targetHref;
                }
            });

        $(document)
            .off("keydown.homeServiceCard", selector)
            .on("keydown.homeServiceCard", selector, function (e) {
                if (e.key !== "Enter" && e.key !== " ") {
                    return;
                }
                if ($(e.target).closest("a, button, input, textarea, select, label").length) {
                    return;
                }
                var targetHref = $(this).attr("data-card-target");
                if (!targetHref) {
                    return;
                }
                e.preventDefault();
                window.location.href = targetHref;
            });
    };
    initHomeServiceCardNavigation();

    // Inject floating WhatsApp CTA once (global across pages)
    if (!$(".whatsapp-float").length) {
        $("body").append(
            '<a href="' + whatsappCtaHref + '" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ' + contactDisplayNumber + '"><i class="fab fa-whatsapp" aria-hidden="true"></i></a>'
        );
    }

    var syncWhatsappOffset = function () {
        if (!$(".whatsapp-float").length) {
            return;
        }

        // Match the same threshold used for back-to-top visibility.
        var shouldShift = $(window).scrollTop() > 100;

        $(".whatsapp-float").toggleClass("is-shifted", shouldShift);
    };
    syncWhatsappOffset();

    // Toggle search popup (delegated so cloned sticky/mobile nodes always work)
    $(document).off("click.searchPopup", ".search-toggler").on("click.searchPopup", ".search-toggler", function (e) {
        e.preventDefault();
        $(".search-popup").toggleClass("active");
    });

    // Initialize odometer with robust triggers (appear + observer + load fallback)
    var activateOdometer = function (elm) {
        if (!elm || !elm.length || elm.data("odometer-fired")) {
            return;
        }
        var countNumber = elm.data("count");
        if (typeof countNumber === "undefined") {
            return;
        }
        elm.data("odometer-fired", true);
        setTimeout(function () {
            elm.html(countNumber);
        }, 80);
    };

    var initOdometers = function () {
        if (!$(".odometer").length) {
            return;
        }

        // Keep initial value at 0 before trigger for clearer count-up behavior.
        $(".odometer").each(function () {
            var current = $(this);
            if (!current.data("odometer-fired")) {
                current.html("0");
            }
        });

        if ($.fn.appear) {
            $(".odometer").appear(function () {
                activateOdometer($(this));
            });
        }

        // Fallback for browsers/render states where appear may not fire reliably.
        if ("IntersectionObserver" in window) {
            var io = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var target = $(entry.target);
                        activateOdometer(target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            $(".odometer").each(function () {
                if (!$(this).data("odometer-fired")) {
                    io.observe(this);
                }
            });
        }

        // Safety fallback for above-the-fold counters.
        setTimeout(function () {
            $(".odometer").each(function () {
                var elm = $(this);
                if (elm.data("odometer-fired")) {
                    return;
                }
                var rect = this.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.98 && rect.bottom > 0) {
                    activateOdometer(elm);
                }
            });
        }, 320);
    };

    initOdometers();


    if ($(".wow").length) {
        var wow = new WOW({
            boxClass: "wow", // animated element css class (default is wow)
            animateClass: "animated", // animation css class (default is animated)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true, // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    if ($("#donate-amount__predefined").length) {
        let donateInput = $("#donate-amount");
        $("#donate-amount__predefined")
            .find("li")
            .on("click", function (e) {
                e.preventDefault();
                let amount = $(this).find("a").text();
                donateInput.val(amount);
                $("#donate-amount__predefined").find("li").removeClass("active");
                $(this).addClass("active");
            });
    }

    $("#accordion .collapse").on("shown.bs.collapse", function () {
        $(this).prev().addClass("active");
        $(this).prev().parent().addClass("active");
    });

    $("#accordion .collapse").on("hidden.bs.collapse", function () {
        $(this).prev().removeClass("active");
        $(this).prev().parent().removeClass("active");
    });

    $("#accordion").on("hide.bs.collapse show.bs.collapse", (e) => {
        $(e.target).prev().find("i:last-child").toggleClass("fa-plus fa-minus");
    });

    // window load event

    $(window).on("load", function () {
        if ($(".preloader").length) {
            $(".preloader").fadeOut();
        }

        // swiper slider
        const swiperElm = document.querySelectorAll(".thm-swiper__slider");
        swiperElm.forEach(function (swiperelm) {
            const swiperOptions = JSON.parse(swiperelm.dataset.swiperOptions);
            let thmSwiperSlider = new Swiper(swiperelm, swiperOptions);
        });

        // Re-run after full load to catch counters inside delayed/animated sections.
        initOdometers();
    });

    // window load event

    $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
            var headerScrollPos = 130;
            var stricky = $(".stricked-menu");
            if ($(window).scrollTop() > headerScrollPos) {
                stricky.addClass("stricky-fixed");
            } else if ($(this).scrollTop() <= headerScrollPos) {
                stricky.removeClass("stricky-fixed");
            }
        }
        if ($(".scroll-to-top").length) {
            var strickyScrollPos = 100;
            if ($(window).scrollTop() > strickyScrollPos) {
                $(".scroll-to-top").fadeIn(500);
            } else if ($(this).scrollTop() <= strickyScrollPos) {
                $(".scroll-to-top").fadeOut(500);
            }
        }
        syncWhatsappOffset();
    });
})(jQuery);
