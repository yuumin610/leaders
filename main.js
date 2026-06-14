document.addEventListener("DOMContentLoaded", () => {
  // Lucideアイコンを初期化
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 要素を取得
  const menuBtn = document.getElementById("menu-btn");
  const menuCloseBtn = document.getElementById("menu-close-btn");
  const menuBottomCloseBtn = document.getElementById("menu-bottom-close-btn");
  const navigationMenu = document.getElementById("navigation-menu");

  // メニューを開く関数
  function openMenu() {
    if (navigationMenu) {
      navigationMenu.classList.remove("opacity-0", "pointer-events-none");
      const content = navigationMenu.querySelector(".transform");
      if (content) {
        content.classList.remove("scale-95");
        content.classList.add("scale-100");
      }
    }
  }

  // メニューを閉じる関数
  function closeMenu() {
    if (navigationMenu) {
      navigationMenu.classList.add("opacity-0", "pointer-events-none");
      const content = navigationMenu.querySelector(".transform");
      if (content) {
        content.classList.remove("scale-100");
        content.classList.add("scale-95");
      }
    }
  }

  // 各種ボタンへイベントリスナーを設定
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