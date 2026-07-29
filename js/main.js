'use strict';

/* =====================================================================
   AICHI CLEAN ハウスクリーニング集客LP — main.js
   実装：1.ハンバーガーメニュー 2.スムーススクロール 3.FAQアコーディオン
        4.フォーム疑似送信 5.フェードイン
   外部ライブラリ不使用（Vanilla JavaScript）
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    // メニュー内のリンクを押したら閉じる
    gnav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeNav(); }
    });

    // Escキーで閉じ、フォーカスをボタンへ戻す
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        closeNav();
        burger.focus();
      }
    });

    // PC幅に戻したときに開いた状態が残らないようにする
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) { closeNav(); }
    });
  }

  /* ---------- 2. スムーススクロール ---------- */
  /* CSSの scroll-behavior: smooth を基本とし、
     固定ヘッダーの高さ分だけ位置を補正する */
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

      window.scrollTo({
        top: top < 0 ? 0 : top,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    });
  });

  /* ---------- 3. FAQアコーディオン ---------- */
  var faqButtons = document.querySelectorAll('.faq-item__btn');

  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panelId = btn.getAttribute('aria-controls');
      var panel = document.getElementById(panelId);
      if (!panel) return;

      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      panel.hidden = isOpen;
    });
  });

  /* ---------- 4. フォーム疑似送信 ---------- */
  var form = document.getElementById('contactForm');
  var formDone = document.getElementById('formDone');
  var formBack = document.getElementById('formBack');

  if (form && formDone) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // 実送信は行わない（ポートフォリオ仕様）

      // 既存のエラー表示をクリア
      form.querySelectorAll('.form__error').forEach(function (el) { el.remove(); });
      form.querySelectorAll('[aria-invalid]').forEach(function (el) {
        el.removeAttribute('aria-invalid');
      });

      // 必須項目の検証
      var invalidField = null;
      form.querySelectorAll('[required]').forEach(function (field) {
        if (!field.checkValidity()) {
          field.setAttribute('aria-invalid', 'true');

          var msg = document.createElement('p');
          msg.className = 'form__error';
          msg.textContent = field.validity.valueMissing
            ? '入力してください。'
            : '入力内容をご確認ください。';
          field.parentNode.appendChild(msg);

          if (!invalidField) { invalidField = field; }
        }
      });

      if (invalidField) {
        invalidField.focus();
        return;
      }

      // 疑似送信：完了画面へ切り替え
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
      form.querySelectorAll('[aria-invalid]').forEach(function (el) {
        el.removeAttribute('aria-invalid');
      });
      formDone.hidden = true;
      form.hidden = false;

      var firstInput = form.querySelector('input, select, textarea');
      if (firstInput) { firstInput.focus(); }
    });
  }

  /* ---------- 5. フェードイン ---------- */
  var revealItems = document.querySelectorAll('.reveal');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    // モーションを抑制する設定、または非対応環境では即時表示
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // 一度表示したら監視を解除
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealItems.forEach(function (el) { observer.observe(el); });
  }

});
