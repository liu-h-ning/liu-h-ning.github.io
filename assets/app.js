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
            <span class="timeline-left">${escapeHTML(item.organization)}</span>
            <span class="timeline-right">${escapeHTML(item.role)}, ${escapeHTML(item.period)}</span>
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

  const publicationGroups = [
    { type: "journal", title: "Journal Publications" },
    { type: "conference", title: "Conference Publications" }
  ];

  function renderPublicationItem(item) {
    const links = (item.links || [])
      .map((link) => `<a href="${escapeHTML(link.url)}">${escapeHTML(link.label)}</a>`)
      .join(" ");
    return `
      <li>
        ${escapeHTML(item.authors)}. ${escapeHTML(item.year)}.
        <strong>${escapeHTML(item.title)}.</strong>
        <em>${escapeHTML(item.venue)}.</em>
        ${links ? `<span class="paper-links">${links}</span>` : ""}
      </li>
    `;
  }

  function renderPublicationGroup(title, items) {
    if (!items.length) return "";
    return `
      <section class="publication-group">
        <h3>${escapeHTML(title)}</h3>
        <ol class="publication-list">
          ${items.map(renderPublicationItem).join("")}
        </ol>
      </section>
    `;
  }

  function renderPublications() {
    const container = document.querySelector("#publication-list");
    if (!container) return;
    const publications = data.publications || [];
    const renderedTypes = new Set(publicationGroups.map((group) => group.type));
    const sections = publicationGroups.map((group) =>
      renderPublicationGroup(
        group.title,
        publications.filter((item) => item.type === group.type)
      )
    );
    const uncategorized = publications.filter((item) => !renderedTypes.has(item.type));
    container.innerHTML = [...sections, renderPublicationGroup("Other Publications", uncategorized)].join("");
  }

  const footerYear = document.querySelector("#footer-year");
  if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()} HongningLiu`;
  }
  renderNews();
  renderEducation();
  renderSimpleList("#interest-list", data.interests);
  renderSimpleList("#honor-list", data.honors);
  renderPublications();
})();
