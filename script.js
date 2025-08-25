// -------------------- CONTACT FORM SUBMISSION --------------------
document.getElementById("contactForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("message", document.getElementById("message").value);

    const scriptURL = "https://script.google.com/macros/s/AKfycbznXVomatPexeKZBosTh88WaJUFHnM_it5tFjPvRhKk0HJ7dgeupPc8E84ahcFvp8r7/exec"; // Replace with your Web App URL

    fetch(scriptURL, {
        method: "POST",
        body: formData
    })
    .then(async (res) => {
        const text = await res.text();
        console.log("Server response:", res.status, text);

        if (res.ok && text.includes("Success")) {
            alert("✅ Message sent successfully!");
            document.getElementById("contactForm").reset();
        } else {
            alert("⚠️ Server error: " + text);
        }
    })
    .catch(err => {
        console.error("❌ Fetch failed:", err);
        alert("❌ Could not send your message. Check console for details.");
    });
});


// -------------------- COLLAPSIBLE NAVBAR --------------------
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        // Collapse menu when a link is clicked
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // ---------- Carousel Navigation ----------
    const carousel = document.getElementById("carousel");
    const slides = document.querySelectorAll(".carousel .slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let index = 0;

    function showSlide(i) {
        index = (i + slides.length) % slides.length;
        carousel.style.transform = `translateX(${-index * 100}%)`;
    }

    prevBtn?.addEventListener("click", () => showSlide(index - 1));
    nextBtn?.addEventListener("click", () => showSlide(index + 1));
    
    // Optional: auto-play
    setInterval(() => showSlide(index + 1), 5000);

    // ---------- Click-to-Zoom Modal ----------
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const caption = document.getElementById("caption");
    const closeBtn = document.querySelector(".close");

    document.querySelectorAll(".zoomable").forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = img.src;      // full-size image
            caption.innerText = img.alt || "";
        });
    });

    closeBtn?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal?.addEventListener("click", e => {
        if(e.target === modal) modal.style.display = "none";
    });
});

