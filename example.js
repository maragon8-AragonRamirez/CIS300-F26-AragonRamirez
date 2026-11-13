const openCapsuleButton = document.querySelector(".open-capsule");
const popupFallback = document.querySelector("#popup-fallback");

openCapsuleButton.addEventListener("click", () => {
  const popup = window.open(
    "blank-capsule.html",
    "revistBlankCapsule",
    "popup=yes,width=420,height=560,resizable=yes,scrollbars=yes"
  );

  if (!popup) {
    popupFallback.hidden = false;
  } else {
    popup.focus();
  }
});
