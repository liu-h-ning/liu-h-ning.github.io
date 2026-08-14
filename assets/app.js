(function () {
  const data = window.AcademicBlogData || {};

  const escapeHTML = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const formatDate = (dateString) => {
    const date = new Date(`${dateString}T00:00:00`);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  };

  function renderNews() {
    const list = document.querySelector("#news-list");
    if (!list) return;
    list.innerHTML = (data.news || [])
      .map((item) => {
        const text = escapeHTML(item.text);
        const date = escapeHTML(formatDate(item.date));
        const content = item.link
          ? `<a href="${escapeHTML(item.link)}">${text}</a>`
          : text;
        return `<li><time datetime="${escapeHTML(item.date)}">${date}</time> ${content}</li>`;
      })
      .join("");
  }

  function renderEducation() {
    const list = document.querySelector("#education-list");
    if (!list) return;
    list.innerHTML = (data.education || [])
      .map(
        (item) => `
          <li>
            <span class="education-period">${escapeHTML(item.period)}</span>
            <span class="education-school">${escapeHTML(item.organization)}</span>
            <span class="education-field">${escapeHTML(item.field)}</span>
          </li>
        `
      )
      .join("");
  }

  function renderSimpleList(selector, items) {
    const list = document.querySelector(selector);
    if (!list) return;
    list.innerHTML = (items || []).map((item) => `<li>${escapeHTML(item)}</li>`).join("");
  }

  const footerYear = document.querySelector("#footer-year");
  if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()} HongningLiu`;
  }
  renderNews();
  renderEducation();
  renderSimpleList("#interest-list", data.interests);
  renderSimpleList("#honor-list", data.honors);
})();
