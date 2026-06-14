document.addEventListener("DOMContentLoaded", () => {
  // 1. Lucideアイコンを初期化して、HTML内の「data-lucide」属性のアイコンを描画
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. 必要なHTML要素を変数として取得
  const menuBtn = document.getElementById("menu-btn");
  const menuCloseBtn = document.getElementById("menu-close-btn");
  const menuBottomCloseBtn = document.getElementById("menu-bottom-close-btn");
  const navigationMenu = document.getElementById("navigation-menu");

  // 3. メニューを開く処理 (CSSで設計した .open クラスを追加する)
  function openMenu() {
    if (navigationMenu) {
      navigationMenu.classList.add("open");
    }
  }

  // 4. メニューを閉じる処理 (CSSの .open クラスを削除する)
  function closeMenu() {
    if (navigationMenu) {
      navigationMenu.classList.remove("open");
    }
  }

  // 5. 各種ボタンをクリックしたときに実行する関数を紐づけ (EventListener)
  if (menuBtn) {
    menuBtn.addEventListener("click", openMenu);
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener("click", closeMenu);
  }

  if (menuBottomCloseBtn) {
    menuBottomCloseBtn.addEventListener("click", closeMenu);
  }
});