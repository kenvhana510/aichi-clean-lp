'use strict';

/* =====================================================================
   AICHI CLEAN ハウスクリーニング集客LP — main.js (redesign v2)
   実装：1.ハンバーガー（フルスクリーンドロワー） 2.スムーススクロール
        3.FAQアコーディオン 4.フォーム疑似送信（挙動は旧版と同一）
        5.ヘッダー縮小 6.スマホ固定CTA 7.ヒーロー文字スタガー
        8.ScrollTrigger リビール／パララックス 9.カウントアップ
        10.BEFORE/AFTER 比較スライダー 11.磁力ボタン
   外部ライブラリ：GSAP 3.13.0 + ScrollTrigger（cdnjs）。
   GSAP が読めない場合や reduced-motion では IntersectionObserver /
   即時表示にフォールバックし、全コンテンツを必ず表示する。
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var useMotion = hasGsap && !prefersReduced;

  if (useMotion) { gsap.registerPlugin(ScrollTrigger); }

  /* ---------- 1. ハンバーガーメニュー ---------- */
  var burger = document.getElementById('burger');
  var gnav = document.getElementById('gnav');

  function closeNav() {
    if (!burger || !gnav) return;
    gnav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'メニューを開く');
    document.body.style.overflow = '';
  }

  function openNav() {
    if (!burger || !gnav) return;
    gnav.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'メニューを閉じる');
    document.body.style.overflow = 'hidden';
  }

  if (burger && gnav) {
    burger.addEventListener('click', function () {
      var isOpen = burger.getAttribute('aria-expanded') === 'true';
      if (isOpen) { closeNav(); } else { openNav(); }
    });
    gnav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeNav(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        closeNav();
        burger.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) { closeNav(); }
    });
  }

  /* ---------- 2. スムーススクロール ---------- */
  var header = document.querySelector('.site-header');

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var headerH = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
      window.scrollTo({ top: top < 0 ? 0 : top, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  /* ---------- 3. FAQアコーディオン ---------- */
  document.querySelectorAll('.faq-item__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      if (useMotion && !isOpen) {
        panel.hidden = false;
        gsap.from(panel, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' });
      } else {
        panel.hidden = isOpen;
      }
    });
  });

  /* ---------- 4. フォーム疑似送信（旧版と同一挙動） ---------- */
  var form = document.getElementById('contactForm');
  var formDone = document.getElementById('formDone');
  var formBack = document.getElementById('formBack');

  if (form && formDone) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // 実送信は行わない（ポートフォリオ仕様）

      form.querySelectorAll('.form__error').forEach(function (el) { el.remove(); });
      form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });

      var invalidField = null;
      form.querySelectorAll('[required]').forEach(function (field) {
        if (!field.checkValidity()) {
          field.setAttribute('aria-invalid', 'true');
          var msg = document.createElement('p');
          msg.className = 'form__error';
          msg.textContent = field.validity.valueMissing ? '入力してください。' : '入力内容をご確認ください。';
          field.parentNode.appendChild(msg);
          if (!invalidField) { invalidField = field; }
        }
      });

      if (invalidField) { invalidField.focus(); return; }

      form.hidden = true;
      formDone.hidden = false;
      formDone.setAttribute('tabindex', '-1');
      formDone.focus();
    });
  }

  if (formBack && form && formDone) {
    formBack.addEventListener('click', function () {
      form.reset();
      form.querySelectorAll('.form__error').forEach(function (el) { el.remove(); });
      form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });
      formDone.hidden = true;
      form.hidden = false;
      var firstInput = form.querySelector('input, select, textarea');
      if (firstInput) { firstInput.focus(); }
    });
  }

  /* ---------- 5. ヘッダー縮小 / 6. スマホ固定CTA ---------- */
  var fixedCta = document.querySelector('.fixed-cta');
  var hero = document.querySelector('.hero');
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) { header.classList.toggle('is-scrolled', y > 24); }
    if (fixedCta) {
      var heroH = hero ? hero.offsetHeight : 400;
      fixedCta.classList.toggle('is-shown', y > heroH * 0.6);
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- 7. ヒーロー：文字ごとのスタガー ---------- */
  if (hero) {
    hero.querySelectorAll('.hero__line').forEach(function (line) {
      var text = line.textContent;
      line.textContent = '';
      Array.prototype.forEach.call(text, function (ch) {
        var span = document.createElement('span');
        span.className = 'ch';
        span.textContent = ch;
        line.appendChild(span);
      });
    });
    var chars = hero.querySelectorAll('.ch');
    chars.forEach(function (ch, i) { ch.style.setProperty('--i', (0.25 + i * 0.045) + 's'); });
    // CSS transition で出現（JSはクラス付与のみ。reduced-motion時はCSSで即表示）
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { hero.classList.add('is-ready'); });
    });
  }

  /* ---------- 8. リビール & パララックス ---------- */
  var revealItems = document.querySelectorAll('.reveal');

  function showAll() {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  }

  if (prefersReduced || !hasGsap) {
    if (prefersReduced || !('IntersectionObserver' in window)) {
      showAll();
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealItems.forEach(function (el) {
        el.style.transition = 'opacity .6s cubic-bezier(.22,.61,.36,1), transform .8s cubic-bezier(.16,1,.3,1)';
        io.observe(el);
      });
    }
  } else {
    // セクション単位でスタガー出現
    document.querySelectorAll('section, footer').forEach(function (sec) {
      var items = sec.querySelectorAll('.reveal');
      if (!items.length) return;
      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: function (batch) {
          batch.forEach(function (el) { el.classList.add('is-visible'); });
          gsap.fromTo(batch,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, overwrite: true, clearProps: 'transform' }
          );
        }
      });
    });
    // 念のため：何らかの理由で発火しなかった要素は 3 秒後に表示保証
    window.setTimeout(function () {
      revealItems.forEach(function (el) {
        if (!el.classList.contains('is-visible') && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('is-visible');
        }
      });
    }, 3000);

    // パララックス（控えめ：±40px以内）
    document.querySelectorAll('[data-parallax]').forEach(function (wrap) {
      var amount = parseFloat(wrap.getAttribute('data-parallax')) || 24;
      var img = wrap.querySelector('img');
      if (!img) return;
      gsap.fromTo(img, { y: -amount }, {
        y: amount, ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }

  /* ---------- 9. カウントアップ ---------- */
  var counters = document.querySelectorAll('.count');
  if (counters.length) {
    if (useMotion) {
      counters.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count')) || 0;
        var obj = { v: 0 };
        el.textContent = '0';
        ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: function () {
            gsap.to(obj, {
              v: target, duration: 1.6, ease: 'power2.out',
              onUpdate: function () { el.textContent = Math.round(obj.v).toLocaleString('ja-JP'); }
            });
          }
        });
      });
    }
    // JS無効・reduced-motion時はHTMLの最終値をそのまま表示
  }

  /* ---------- 10. BEFORE/AFTER 比較スライダー ---------- */
  document.querySelectorAll('[data-cmp]').forEach(function (cmp) {
    var range = cmp.querySelector('.cmp__range');
    if (!range) return;

    function setPos(v) {
      v = Math.max(0, Math.min(100, v));
      cmp.style.setProperty('--pos', v + '%');
      range.value = v;
      range.setAttribute('aria-valuetext', '清掃後の表示割合 ' + Math.round(100 - v) + '%');
    }
    setPos(parseFloat(range.value) || 50);

    // キーボード・ネイティブドラッグ（range input）
    range.addEventListener('input', function () { setPos(parseFloat(range.value)); });

    // ポインタ：どこを押してもその位置へ（タッチ・マウス・ペン共通）
    var dragging = false;
    function posFromEvent(e) {
      var rect = cmp.getBoundingClientRect();
      return ((e.clientX - rect.left) / rect.width) * 100;
    }
    cmp.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true;
      cmp.classList.add('is-dragging');
      try { cmp.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
      setPos(posFromEvent(e));
      e.preventDefault();
    });
    cmp.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      setPos(posFromEvent(e));
    });
    function endDrag() { dragging = false; cmp.classList.remove('is-dragging'); }
    cmp.addEventListener('pointerup', endDrag);
    cmp.addEventListener('pointercancel', endDrag);
    cmp.addEventListener('lostpointercapture', endDrag);

    // 初回表示時に軽く「動く」ヒント
    if (useMotion) {
      ScrollTrigger.create({
        trigger: cmp, start: 'top 80%', once: true,
        onEnter: function () {
          var o = { v: 50 };
          gsap.timeline()
            .to(o, { v: 36, duration: 0.6, ease: 'power2.inOut', onUpdate: function () { if (!dragging) setPos(o.v); } })
            .to(o, { v: 50, duration: 0.6, ease: 'power2.inOut', onUpdate: function () { if (!dragging) setPos(o.v); } });
        }
      });
    }
  });

  /* ---------- 11. 磁力ボタン（ポインタが細かい端末のみ） ---------- */
  if (useMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        gsap.to(btn, { x: dx * 10, y: dy * 8, duration: 0.4, ease: 'power3.out' });
      });
      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

});
