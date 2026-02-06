const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

function changeActiveLink() {
    let current = '';
    const scrollY = window.scrollY;
    const triggerPoint = window.innerHeight / 3;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - triggerPoint;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    if ((window.innerHeight + scrollY) >= document.body.offsetHeight - 10) {
        if (sections.length > 0) {
            current = sections[sections.length - 1].getAttribute('id');
        }
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', changeActiveLink);
changeActiveLink();

fetch("data/menu.json")
  .then(res => res.json())
  .then(data => {
    const menuContainer = document.getElementById("menu-dinh-duong");
    let htmlContent = "";

    data.forEach(item => {
      const hasLevel2 = item.children && item.children.length > 0;
      
      htmlContent += `<li class="${hasLevel2 ? 'has-child' : ''}">`;
      htmlContent += `<a href="${item.link}">${item.title}</a>`;

      if (hasLevel2) {
        htmlContent += `<ul class="level-2-menu shadow">`;
        
        item.children.forEach(child2 => {
          const hasLevel3 = child2.children && child2.children.length > 0;
          
          htmlContent += `<li class="${hasLevel3 ? 'has-child-level-3' : ''}">`;
          
          htmlContent += `<a href="${child2.link}">${child2.title} </a>`;

          if (hasLevel3) {
            htmlContent += `<ul class="level-3-menu shadow">`;
            child2.children.forEach(child3 => {
              htmlContent += `<li><a href="${child3.link}">${child3.title}</a></li>`;
            });
            htmlContent += `</ul>`;
          }

          htmlContent += `</li>`;
        });

        htmlContent += `</ul>`;
      }

      htmlContent += `</li>`;
    });

    menuContainer.innerHTML = htmlContent;
  })
  .catch(error => console.error(error));

// Nút Top
let mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// Render section hoạt động
fetch("data/hoatdong.json")
  .then(res => res.json())
  .then(data => {
    const wrapper = document.getElementById("hoat-dong-wrapper");

    data.forEach(item => {
      wrapper.innerHTML += `
        <div class="swiper-slide">
          <div class="news-item">
            <div class="img-frame-hd">
              <img src="${item.image}" alt="${item.title}">
            </div>
            <a href="${item.link}" class="news-link ${item.uppercase ? "text-uppercase" : ""}">
              ${item.title}
            </a>
          </div>
        </div>
      `;
    });

    const hoatDongSection = document.getElementById("hoat-dong-content");

    new Swiper("#hoat-dong-swiper", {
      slidesPerView: 4,
      spaceBetween: 24,
      navigation: {
        nextEl: hoatDongSection.querySelector(".hoatdong-next"),
        prevEl: hoatDongSection.querySelector(".hoatdong-prev")
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 4 }
      }
    });
  });



// Render section ddsk
fetch("data/ddsk.json")
  .then(res => res.json())
  .then(data => {
    const wrapper = document.getElementById("ddsk-wrapper");

    data.forEach(item => {
      wrapper.innerHTML += `
        <div class="swiper-slide">
          <div class="news-item ddsk-item" data-link="${item.link}">
            
            <div class="img-frame">
              <img src="${item.image}" alt="${item.title}">
            </div>

            <b class="news-title">${item.title}</b>

            <p class="news-desc">
              ${item.desc}
            </p>

          </div>
        </div>
      `;
    });

    const ddskSection = document.getElementById("ddsk-content");

    new Swiper("#ddsk-swiper", {
      slidesPerView: 5,
      spaceBetween: 30,
      navigation: {
        nextEl: ddskSection.querySelector(".ddsk-next"),
        prevEl: ddskSection.querySelector(".ddsk-prev")
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 }
      }
    });
  });

document.addEventListener("click", function (e) {
  const card = e.target.closest(".ddsk-item");
  if (!card) return;

  const link = card.dataset.link;
  if (link) {
    window.location.href = link;
  }
});

