document.addEventListener("DOMContentLoaded", () => {
      // 1. 外部アイコンライブラリは使わず、HTML内のインラインSVGで表示します
// 2. 必要なHTML要素を変数として取得
      const mainContainer = document.querySelector(".main-container");
      const topHeader = document.getElementById("top-header");
      const topBgImage = document.querySelector(".top-bg-image");
      const headerContent = document.getElementById("header-content");
      const indicatorContainer = document.getElementById("indicator-container");
      const whiteoutOverlay = document.getElementById("whiteout-overlay");
      const foregroundLeaves = document.querySelector(".foreground-leaves");
      const particles = document.querySelectorAll(".particle");

      const menuBtn = document.getElementById("menu-btn");
      const menuCloseBtn = document.getElementById("menu-close-btn");
      const menuBottomCloseBtn = document.getElementById("menu-bottom-close-btn");
      const navigationMenu = document.getElementById("navigation-menu");
      
      const scrollArrow = document.getElementById("scroll-arrow");
      const navNews = document.getElementById("nav-news");
      const navGuide = document.getElementById("nav-guide");
      const navSchedule = document.getElementById("nav-schedule");
      const navSns = document.getElementById("nav-sns");

      // 掲示板詳細モーダル用要素
      const moreBtn = document.getElementById("more-button");
      const newsModal = document.getElementById("news-modal");
      const newsModalCloseBtn = document.getElementById("news-modal-close-btn");
      const newsModalBottomCloseBtn = document.getElementById("news-modal-bottom-close-btn");

      // 初めてガイドステップ要素
      const stepBtn1 = document.getElementById("step-btn-1");
      const stepBtn2 = document.getElementById("step-btn-2");
      const stepBtn3 = document.getElementById("step-btn-3");
      const stepPop1 = document.getElementById("step-pop-1");
      const stepPop2 = document.getElementById("step-pop-2");
      const stepPop3 = document.getElementById("step-pop-3");

      // 「頑張ってみる？」ボタンおよびガイド下部アクションボタン
      const applyBtn = document.getElementById("apply-btn");
      const guideActionBtn = document.getElementById("guide-action-btn");

      // スケジュールカード用データ
      const scheduleData = [
        { day: "月", team: "1．2．3", place: "大連" },
        { day: "火", team: "1．2．3", place: "大連" },
        { day: "水", team: "1．2．3", place: "大連" },
        { day: "木", team: "1．2．3", place: "大連" },
        { day: "金", team: "1．2．3", place: "大連" },
      ];

      // 曜日カードをデータから生成
      const scheduleCardsContainer = document.getElementById("schedule-list");
      if (scheduleCardsContainer) {
        scheduleCardsContainer.innerHTML = scheduleData.map(({ day, team, place }) => `
          <div class="day-card">
            <div class="day-header">${day}</div>
            <div class="day-about">
              <div class="about-row">
                <span class="row-label">チーム</span>
                <span class="row-divider"></span>
                <span class="row-value">${team}</span>
              </div>
              <div class="about-row">
                <span class="row-label">場　所</span>
                <span class="row-divider"></span>
                <span class="row-value">${place}</span>
              </div>
            </div>
          </div>
        `).join("");
      }


      // =======================================================
      // ★ 究極の3D吸い込みズーム・パララックス・ホワイトアウト制御 ★
      // =======================================================
      if (mainContainer && topBgImage && headerContent && indicatorContainer && whiteoutOverlay && foregroundLeaves) {
        let ticking = false;

        window.addEventListener("scroll", () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const scrollTop = mainContainer.scrollTop || window.scrollY;
              const headerHeight = topHeader ? topHeader.offsetHeight : 847; // ヘッダーの高さ基準

              if (scrollTop <= headerHeight) {
                const progress = scrollTop / headerHeight; // 0.0 〜 1.0 の進捗率

                // ❶ 背景画像を森の奥深くへと大きくズーム (1.0倍 ➔ 1.6倍) ＆ なめらかにピントをずらす
                const bgScale = 1 + progress * 0.6;
                const bgBlur = progress * 3; // スクロールするほど少しぼやけて、ピントが無限遠にいくような効果
                topBgImage.style.transform = `scale(${bgScale})`;
                topBgImage.style.filter = `blur(${bgBlur}px)`;

                // ❷ 【新規実装】手前の葉っぱ（周辺遮蔽）を「爆速で外側に弾け飛ばす」
                // 1.0倍 ➔ 2.6倍 に瞬時に広がり、一瞬で通り過ぎる奥行き感を創出
                const leafScale = 1 + progress * 1.6;
                const leafOpacity = 1 - progress * 2.5; // スクロール約40%で手前の葉は完全に見えなくなる
                const leafBlur = progress * 12; // 通り過ぎる際、カメラに近いため猛烈にブレる
                foregroundLeaves.style.transform = `scale(${leafScale})`;
                foregroundLeaves.style.opacity = Math.max(0, leafOpacity);
                foregroundLeaves.style.filter = `blur(${leafBlur}px)`;

                // ❸ 【新規実装】中景に浮遊する「魔法の光の胞子」を別々の3D速度で手前に吸い寄せる
                particles.forEach((p, idx) => {
                  const depthFactor = 1.2 + (idx * 0.5); // 粒ごとに手前に迫り来る速度を変えます
                  const pScale = 1 + progress * depthFactor * 1.8;
                  const pOpacity = 1 - progress * (depthFactor * 0.9);
                  
                  // 画面中心から放射状に飛び散る軌道
                  const directionX = (idx % 2 === 0 ? 1 : -1) * (idx + 1) * 60 * progress;
                  const directionY = (idx % 3 === 0 ? 1 : -1) * (idx + 1) * 35 * progress;
                  
                  p.style.transform = `translate3d(${directionX}px, ${directionY}px, 0) scale(${pScale})`;
                  p.style.opacity = Math.max(0, pOpacity);
                });

                // ❹ タイトルテキストを手前にダイナミックにすり抜けさせる
                const textScale = 1 + progress * 0.45;
                const textOpacity = 1 - progress * 1.6; // スクロール中盤で完全に通り過ぎてフェードアウト
                headerContent.style.transform = `scale(${textScale})`;
                headerContent.style.opacity = Math.max(0, textOpacity);

                // ❺ 下部スクロールインジケータ（矢印）は早めにスッと消す
                indicatorContainer.style.opacity = Math.max(0, 1 - progress * 4.0);

                // ❻ ホワイトアウトポータル効果（中心から膨張するブワーッとした閃光）
                let whiteScale = 0.5 + progress * 2.5; // 小さな光の点が、画面全体を覆い尽くすポータルに成長
                let whiteOpacity = 0;
                if (progress > 0.3) {
                  whiteOpacity = (progress - 0.3) / 0.7; // 急激に閃光を放ちます
                }
                whiteoutOverlay.style.transform = `scale(${whiteScale})`;
                whiteoutOverlay.style.opacity = Math.min(1, whiteOpacity);

                // ❼ トップヘッダー全体を遅れて動かす（パララックス視差効果）
                const parallaxY = scrollTop * 0.4;
                topHeader.style.transform = `translateY(${parallaxY}px)`;
              } else {
                // スクロールアウト時は描画を完全にOFFにして負荷をゼロにし、上部は完全に純白で隠します
                headerContent.style.opacity = 0;
                indicatorContainer.style.opacity = 0;
                foregroundLeaves.style.opacity = 0;
                whiteoutOverlay.style.opacity = 1;
                whiteoutOverlay.style.transform = `scale(3)`;
              }

              ticking = false;
            });
            ticking = true;
          }
        });
      }

      // 3. メニューを開く処理 (CSSの .open クラスを追加する)
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

      // 5. 掲示板詳細モーダルを開く
      function openNewsModal() {
        if (newsModal) {
          newsModal.classList.add("open");
        }
      }

      // 6. 掲示板詳細モーダルを閉じる
      function closeNewsModal() {
        if (newsModal) {
          newsModal.classList.remove("open");
        }
      }

      // 7. 各セクションへスクロールする
      function scrollToNews() {
        const newsSection = document.getElementById("news-section");
        if (newsSection) {
          newsSection.scrollIntoView({ behavior: "smooth" });
        }
      }

      // ガイドセクションへ
      function scrollToGuide() {
        const guideSection = document.getElementById("guide-section");
        if (guideSection) {
          guideSection.scrollIntoView({ behavior: "smooth" });
        }
      }

      // スケジュールセクションへ
      function scrollToSchedule() {
        const scheduleSection = document.getElementById("schedule-section");
        if (scheduleSection) {
          scheduleSection.scrollIntoView({ behavior: "smooth" });
        }
      }

      // SNS・フッターセクションへ
      function scrollToSns() {
        const snsSection = document.getElementById("sns-section");
        if (snsSection) {
          snsSection.scrollIntoView({ behavior: "smooth" });
        }
      }

      // 8. ステップ詳細のポップアップ切り替え処理
      function toggleStepPop(stepNum) {
        const pops = [stepPop1, stepPop2, stepPop3];
        pops.forEach((pop, index) => {
          if (index + 1 === stepNum) {
            pop.classList.toggle("open");
          } else {
            pop.classList.remove("open");
          }
        });
      }

      // 各種イベントリスナーの登録
      if (menuBtn) menuBtn.addEventListener("click", openMenu);
      if (menuCloseBtn) menuCloseBtn.addEventListener("click", closeMenu);
      if (menuBottomCloseBtn) menuBottomCloseBtn.addEventListener("click", closeMenu);

      // スクロールアクション
      if (scrollArrow) {
        scrollArrow.addEventListener("click", scrollToNews);
        scrollArrow.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            scrollToNews();
          }
        });
      }

      // メニュー内クリック
      if (navNews) {
        navNews.addEventListener("click", () => {
          closeMenu();
          setTimeout(scrollToNews, 300);
        });
      }

      if (navGuide) {
        navGuide.addEventListener("click", () => {
          closeMenu();
          setTimeout(scrollToGuide, 300);
        });
      }

      if (navSchedule) {
        navSchedule.addEventListener("click", () => {
          closeMenu();
          setTimeout(scrollToSchedule, 300);
        });
      }

      if (navSns) {
        navSns.addEventListener("click", () => {
          closeMenu();
          setTimeout(scrollToSns, 300);
        });
      }

      // 掲示板詳細モーダル起動
      if (moreBtn) moreBtn.addEventListener("click", openNewsModal);
      if (newsModalCloseBtn) newsModalCloseBtn.addEventListener("click", closeNewsModal);
      if (newsModalBottomCloseBtn) newsModalBottomCloseBtn.addEventListener("click", closeNewsModal);

      // 初めてガイドステップクリック
      if (stepBtn1) stepBtn1.addEventListener("click", () => toggleStepPop(1));
      if (stepBtn2) stepBtn2.addEventListener("click", () => toggleStepPop(2));
      if (stepBtn3) stepBtn3.addEventListener("click", () => toggleStepPop(3));

      // 【体験お申し込みアクション：SNS（お問い合わせ）へスムーズスクロール】
      if (applyBtn) applyBtn.addEventListener("click", scrollToSns);
      if (guideActionBtn) guideActionBtn.addEventListener("click", scrollToSns);
    });
