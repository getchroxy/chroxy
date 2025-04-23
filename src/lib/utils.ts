export function setTitle(title: string, subtitle?: string) {
  document.title = `${title} | Chroxy`;
  const subtitleEl = document.getElementById("subtitle");
  if (subtitleEl) {
    subtitleEl.innerText = subtitle ?? title;
  }
}
