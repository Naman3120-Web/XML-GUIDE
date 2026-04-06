function go(i) {
  document
    .querySelectorAll(".section")
    .forEach((s, j) => s.classList.toggle("active", j === i));
  document
    .querySelectorAll(".nav-btn")
    .forEach((b, j) => b.classList.toggle("active", j === i));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cp(btn) {
  const pre = btn.closest(".code-hdr").nextElementSibling.querySelector("pre");
  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.textContent = "Copied!";
    btn.style.color = "#4ade80";
    setTimeout(() => {
      btn.textContent = "Copy";
      btn.style.color = "";
    }, 2000);
  });
}

// Load PNG icons when page loads
document.addEventListener("DOMContentLoaded", loadIcons);

function loadIcons() {
  const icons = {
    "🗺": "roadmap.png",
    "📝": "code.png",
    "🐍": "python.png",
    "☕": "java.png",
    "🌐": "globe.png",
    "✅": "check.png",
    "🏦": "bank.png",
    "🏥": "hospital.png",
    "🛒": "shopping.png",
    "📱": "phone.png",
    "📰": "rss.png",
    "🏛️": "document.png",
    "📦": "document.png",
  };

  // Load tool icons (.ti) - larger size for tool section
  document.querySelectorAll(".ti").forEach((el) => {
    const text = el.textContent.trim();
    for (const [emoji, file] of Object.entries(icons)) {
      if (text.includes(emoji) || el.innerText.includes(emoji)) {
        el.innerHTML = `<img src="icons/${file}" alt="icon" class="icon-img icon-lg">`;
        break;
      }
    }
  });

  // Load usage card icons (.uci) - medium size for usage grid
  document.querySelectorAll(".uci").forEach((el) => {
    const text = el.textContent.trim();
    for (const [emoji, file] of Object.entries(icons)) {
      if (text.includes(emoji) || el.innerText.includes(emoji)) {
        el.innerHTML = `<img src="icons/${file}" alt="icon" class="icon-img icon-md">`;
        break;
      }
    }
  });

  // Load checkmarks in table cells - replace ✅ emoji with check.png
  document.querySelectorAll("td").forEach((el) => {
    if (el.textContent.includes("✅")) {
      const text = el.innerHTML;
      el.innerHTML = text.replace(
        /✅/g,
        '<img src="icons/check.png" alt="checkmark" class="icon-img icon-md" style="display: inline-block; vertical-align: middle; margin-right: 6px; position: relative; top: -1px;">',
      );
    }
  });
}

// Suggestions Panel Functions
function toggleSuggestions() {
  const panel = document.getElementById("suggestionsPanel");
  panel.classList.toggle("active");
  document.getElementById("suggestionsForm").reset();
  document.getElementById("sugg-success").style.display = "none";
}

function submitSuggestion(event) {
  event.preventDefault();

  const name = document.getElementById("sugg-name").value;
  const email = document.getElementById("sugg-email").value;
  const type = document.getElementById("sugg-type").value;
  const message = document.getElementById("sugg-message").value;

  // Create a message body
  const mailtoLink = `mailto:namanpandey.dev@gmail.com?subject=Suggestion from ${name} - ${type}&body=Name: ${name}%0DEmail: ${email}%0DType: ${type}%0D%0DMessage:%0D${message}`;

  // Open default email client
  window.location.href = mailtoLink;

  // Show success message
  document.getElementById("suggestionsForm").style.display = "none";
  document.getElementById("sugg-success").style.display = "block";

  // Reset after 3 seconds
  setTimeout(() => {
    toggleSuggestions();
    document.getElementById("suggestionsForm").style.display = "block";
  }, 3000);
}

// Close suggestions panel when clicking outside
document.addEventListener("click", function (event) {
  const panel = document.getElementById("suggestionsPanel");
  if (event.target === panel) {
    toggleSuggestions();
  }
});
