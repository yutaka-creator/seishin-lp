/* ========================================
   HEADER / MENU
======================================== */

const header = document.querySelector("#header");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#global-nav");

menuButton?.addEventListener("click", () => {
  const open = menuButton.classList.toggle("open");

  nav?.classList.toggle("open", open);

  menuButton.setAttribute(
    "aria-expanded",
    String(open)
  );

  menuButton.setAttribute(
    "aria-label",
    open ? "メニューを閉じる" : "メニューを開く"
  );
});


/* ナビをクリックしたらメニューを閉じる */

document.querySelectorAll("#global-nav a").forEach((link) => {

  link.addEventListener("click", () => {

    menuButton?.classList.remove("open");
    nav?.classList.remove("open");

    menuButton?.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton?.setAttribute(
      "aria-label",
      "メニューを開く"
    );

  });

});


/* ========================================
   PAGE TOP
======================================== */

const pageTop = document.querySelector(".page-top");

pageTop?.addEventListener("click", (event) => {

  event.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* ========================================
   FIXED CONTACT
======================================== */

const fixedContact =
  document.querySelector(".fixed-contact");

const siteFooter = document.querySelector(".site-footer");
let footerInView = false;


/* ========================================
   SCROLL
======================================== */

const onScroll = () => {

  const y = window.scrollY;


  /* ヘッダー */

  header?.classList.toggle(
    "scrolled",
    y > 12
  );


  /* TOPへ戻るボタン */

  pageTop?.classList.toggle(
    "show",
    y > 500
  );


  /* メールお問い合わせボタン */

  fixedContact?.classList.toggle(
    "is-visible",
    y > 520 && !footerInView
  );

};


window.addEventListener(
  "scroll",
  onScroll,
  { passive: true }
);


/* 読み込み時にも実行 */

onScroll();

/* フッターが見えたら固定メールボタンを隠す */
if (siteFooter && fixedContact && "IntersectionObserver" in window) {
  const footerObserver = new IntersectionObserver((entries) => {
    footerInView = entries[0].isIntersecting;
    onScroll();
  }, { threshold: 0.04 });

  footerObserver.observe(siteFooter);
}



/* ========================================
   SCROLL REVEAL
======================================== */

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


if (
  reducedMotion ||
  !("IntersectionObserver" in window)
) {

  document
    .querySelectorAll(".reveal")
    .forEach((element) => {

      element.classList.add("is-visible");

    });

} else {

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px"
      }
    );


  document
    .querySelectorAll(".reveal")
    .forEach((element) => {

      observer.observe(element);

    });

}


/* ========================================
   FOOTER PHONE
======================================== */

const phoneToggle =
  document.querySelector("#phoneToggle");

const phoneNumber =
  document.querySelector("#phoneNumber");


if (phoneToggle && phoneNumber) {

  phoneToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        phoneNumber.classList.toggle(
          "is-open"
        );


      phoneToggle.classList.toggle(
        "is-open",
        isOpen
      );


      phoneToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );

}