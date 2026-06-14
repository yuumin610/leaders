document.addEventListener("DOMContentLoaded", () => {
  // 1. 掲示板セクション (news.html) を非同期で読み込んで合体させる
  const newsPlaceholder = document.getElementById("news-placeholder");

  if (newsPlaceholder) {
    fetch("news.html")
      .then(response => {
        if (!response.ok) {
          throw new Error("news.html の読み込みに失敗しました");
        }
        return response.text();
      })
      .then(html => {
        // 取得した掲示板セクションのHTMLをプレースホルダーに挿入して「くっつける」
        newsPlaceholder.innerHTML = html;
        
        // 合体完了後に、ボタン操作やアイコン描画などの処理を初期化
        initializeAcapellaApp();
      })
      .catch(error => {
        console.error("読み込みエラーが発生しました:", error);
        
        // ブラウザで直接 index.html をダブルクリックして開いた際、セキュリティ制限(CORS)に引っかかる場合があります。
        // その際にもエラーで真っ白にならずに、開発者に分かりやすいアラートを表示します。
        newsPlaceholder.innerHTML = `
          <div style="padding: 24px; text-align: center; font-size: 11px; color: #ef4444; line-height: 1.8; background: #fff1f2; border: 1px solid #fecdd3;">
            <strong>【ローカル開発時の注意】</strong><br>
            ブラウザのセキュリティ制限(CORS)により、HTMLファイルを直接ダブルクリックすると news.html を合体させることができません。<br><br>
            VSCodeの拡張機能<strong>「Live Server」</strong>を使って起動するか、任意のローカルサーバー上でご確認ください。
          </div>
        `;
        // モジュール合体に失敗しても、MENUなどの親基本機能は動くようにフォールバックします
        initializeAcapellaApp(true);
      });
  } else {
    initializeAcapellaApp();
  }

  // アプリケーション全体の動きをコントロールする関数
  function initializeAcapellaApp(fallback = false) {
    // インサートされたものも含めてLucideアイコンを綺麗に描画
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // 要素の取得
    const menuBtn = document.getElementById("menu-btn");
    const menuCloseBtn = document.getElementById("menu-close-btn");
    const menuBottomCloseBtn = document.getElementById("menu-bottom-close-btn");
    const navigationMenu = document.getElementById("navigation-menu");
    
    const scrollArrow = document.getElementById("scroll-arrow");
    const navNews = document.getElementById("nav-news");

    // メニューを開く
    function openMenu() {
      if (navigationMenu) {
        navigationMenu.classList.add("open");
      }
    }

    // メニューを閉じる
    function closeMenu() {
      if (navigationMenu) {
        navigationMenu.classList.remove("open");
      }
    }

    // 掲示板セクションまでスムーズスクロール
    function scrollToNews() {
      const newsSection = document.getElementById("news-section");
      if (newsSection) {
        newsSection.scrollIntoView({ behavior: "smooth" });
      }
    }

    // メインビジュアルの操作イベントを登録
    if (menuBtn) menuBtn.addEventListener("click", openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener("click", closeMenu);
    if (menuBottomCloseBtn) menuBottomCloseBtn.addEventListener("click", closeMenu);
    if (scrollArrow) scrollArrow.addEventListener("click", scrollToNews);

    if (navNews) {
      navNews.addEventListener("click", () => {
        closeMenu();
        setTimeout(scrollToNews, 300);
      });
    }

    // news.html が無事にくっついた場合のみ、もっと見るボタンのアクションをバインド
    if (!fallback) {
      const moreBtn = document.getElementById("more-button");
      const newsModal = document.getElementById("news-modal");
      const newsModalCloseBtn = document.getElementById("news-modal-close-btn");
      const newsModalBottomCloseBtn = document.getElementById("news-modal-bottom-close-btn");

      function openNewsModal() {
        if (newsModal) {
          newsModal.classList.add("open");
        }
      }

      function closeNewsModal() {
        if (newsModal) {
          newsModal.classList.remove("open");
        }
      }

      if (moreBtn) moreBtn.addEventListener("click", openNewsModal);
      if (newsModalCloseBtn) newsModalCloseBtn.addEventListener("click", closeNewsModal);
      if (newsModalBottomCloseBtn) newsModalBottomCloseBtn.addEventListener("click", closeNewsModal);
    }
  }
});