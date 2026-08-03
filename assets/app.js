(function () {
  const data = window.AcademicBlogData || {};
  const allCategory = "全部";
  const state = {
    category: allCategory,
    query: ""
  };

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

  const renderTag = (tag) => `<span class="tag">${escapeHTML(tag)}</span>`;

  function renderNews() {
    const list = document.querySelector("#news-list");
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

  function renderExperiences() {
    const list = document.querySelector("#experience-list");
    list.innerHTML = (data.experiences || [])
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

  function getCategories() {
    const categories = new Set((data.posts || []).map((post) => post.category));
    return [allCategory, ...categories];
  }

  function renderFilters() {
    const row = document.querySelector("#filter-row");
    row.innerHTML = getCategories()
      .map(
        (category) => `
          <button class="filter-button${category === state.category ? " is-active" : ""}" type="button" data-category="${escapeHTML(category)}">
            ${escapeHTML(category)}
          </button>
        `
      )
      .join("");
  }

  function getFilteredPosts() {
    const query = state.query.trim().toLowerCase();
    return (data.posts || []).filter((post) => {
      const inCategory = state.category === allCategory || post.category === state.category;
      const searchable = [post.title, post.summary, post.category, ...post.tags].join(" ").toLowerCase();
      return inCategory && (!query || searchable.includes(query));
    });
  }

  function renderPosts() {
    const list = document.querySelector("#post-list");
    const posts = getFilteredPosts();

    if (!posts.length) {
      list.innerHTML = '<p class="empty-state">没有匹配的文章。</p>';
      return;
    }

    list.innerHTML = posts
      .map(
        (post) => `
          <article class="post-item">
            <div class="post-meta">
              <time datetime="${escapeHTML(post.date)}">${escapeHTML(formatDate(post.date))}</time>
              <span>${escapeHTML(post.category)}</span>
            </div>
            <h3><a href="${escapeHTML(post.link)}">${escapeHTML(post.title)}</a></h3>
            <p>${escapeHTML(post.summary)}</p>
            <div class="tag-row">${post.tags.map(renderTag).join("")}</div>
          </article>
        `
      )
      .join("");
  }

  function bindEvents() {
    document.querySelector("#filter-row").addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      state.category = button.dataset.category;
      renderFilters();
      renderPosts();
    });

    document.querySelector("#post-search").addEventListener("input", (event) => {
      state.query = event.target.value;
      renderPosts();
    });
  }

  document.querySelector("#footer-year").textContent = `© ${new Date().getFullYear()} HongningLiu`;
  renderNews();
  renderExperiences();
  renderSimpleList("#interest-list", data.interests);
  renderSimpleList("#honor-list", data.honors);
  renderSimpleList("#activity-list", data.activities);
  renderPublications();
  renderFilters();
  renderPosts();
  bindEvents();
})();
