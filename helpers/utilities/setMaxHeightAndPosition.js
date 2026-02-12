const setMaxHeightAndPosition = (el, initialTop) => {
  const top = document.documentElement.scrollTop || document.body.scrollTop;
  const bottom = document.documentElement.scrollHeight || document.body.scrollHeight;

  if (top <= initialTop) {
    el.style.maxHeight =
      window.innerHeight - initialTop + top + "px";
  } else {
    el.style.maxHeight = window.innerHeight + "px";
  }

  if (top >= initialTop && top <= bottom) {
    el.style.position = "fixed";
  } else {
    el.style.position = "static";
  }
};

export default setMaxHeightAndPosition;
