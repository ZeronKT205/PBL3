// Hàm khởi tạo khi trang web được tải
window.onload = function() {
    loadfilm();
};

const navBtn = document.querySelector('.toggle-nav-btn');
const navBar = document.querySelector('.NavbarLeftContainer');
navBtn.addEventListener('click', () => {
    navBar.classList.toggle('show');
});
document.addEventListener('click', function(e) {
    if (!navBar.contains(e.target) && !navBtn.contains(e.target)) {
        navBar.classList.remove('show');
    }
});

// MainPoster slideshow functionality
const slides = document.querySelectorAll('.mainposter__slide');
const dots = document.querySelectorAll('.mainposter__dot');
const prevBtn = document.querySelector('.mainposter__button-left');
const nextBtn = document.querySelector('.mainposter__button-right');
let currentSlide = 0;
let slideInterval;

// Hàm hiển thị slide và dot tương ứng với index được chọn
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

// Hàm chuyển đến slide tiếp theo
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Hàm quay lại slide trước đó
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Hàm bắt đầu tự động chuyển slide sau mỗi 5.5 giây
function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5500);
}

// Hàm dừng tự động chuyển slide
function stopSlideInterval() {
    clearInterval(slideInterval);
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopSlideInterval();
    startSlideInterval();
});
nextBtn.addEventListener('click', () => {
    nextSlide();
    stopSlideInterval();
    startSlideInterval();
});
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        stopSlideInterval();
        startSlideInterval();
    });
});
startSlideInterval();
document.querySelector('.mainposter').addEventListener('mouseenter', stopSlideInterval);
document.querySelector('.mainposter').addEventListener('mouseleave', startSlideInterval);

// Carousel scroll for movie-horizontal-list
/**
 * Hàm thiết lập carousel cho danh sách phim
 * @param {string} carouselId - ID của carousel cần thiết lập
 * @param {HTMLElement} leftBtn - Nút điều hướng trái
 * @param {HTMLElement} rightBtn - Nút điều hướng phải
 */
function setupCarousel(carouselId, leftBtn, rightBtn) {
    const list = document.getElementById(carouselId);
    const btnLeft = leftBtn;
    const btnRight = rightBtn;
    const card = list.querySelector('.movie-card');
    const gap = parseInt(getComputedStyle(list).gap) || 28;
    const cardWidth = card.offsetWidth + gap;

    // Hàm cập nhật trạng thái nút điều hướng
    function updateBtns() {
        btnLeft.disabled = list.scrollLeft <= 0;
        btnRight.disabled = list.scrollLeft + list.clientWidth >= list.scrollWidth - 2;
    }

    btnLeft.addEventListener('click', () => {
        list.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        setTimeout(updateBtns, 400);
    });
    btnRight.addEventListener('click', () => {
        list.scrollBy({ left: cardWidth, behavior: 'smooth' });
        setTimeout(updateBtns, 400);
    });
    list.addEventListener('scroll', updateBtns);
    window.addEventListener('resize', updateBtns);
    updateBtns();
}

document.addEventListener('DOMContentLoaded', function() {
    setupCarousel('now-showing',
    document.querySelector('.movie-carousel-nav-btn.left[data-target="now-showing"]'),
    document.querySelector('.movie-carousel-nav-btn.right[data-target="now-showing"]')
    );
    setupCarousel('coming-soon',
    document.querySelector('.movie-carousel-nav-btn.left[data-target="coming-soon"]'),
    document.querySelector('.movie-carousel-nav-btn.right[data-target="coming-soon"]')
    );
});

// Scroll to section when click button
const btnNow = document.querySelector('.listfilmnow');
const btnFuture = document.querySelector('.listfilmfulture');
const nowSection = document.getElementById('now-showing-section');
const soonSection = document.getElementById('coming-soon-section');
if(btnNow && nowSection) {
    btnNow.addEventListener('click', function() {
        nowSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}
if(btnFuture && soonSection) {
    btnFuture.addEventListener('click', function() {
        soonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// Scroll to section when click sidebar nav
const navNow = document.querySelector('.nav-nowshowing');
const navSoon = document.querySelector('.nav-comingsoon');
if(navNow && nowSection) {
    navNow.addEventListener('click', function(e) {
        e.preventDefault();
        nowSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}
if(navSoon && soonSection) {
    navSoon.addEventListener('click', function(e) {
        e.preventDefault();
        soonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// Toggle dropdown thể loại
const genreBtn = document.getElementById('genreDropdownBtn');
const genreDropdown = document.getElementById('genreDropdown');
if(genreBtn && genreDropdown) {
    genreBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        genreDropdown.classList.toggle('show');
        genreBtn.classList.toggle('active');
    });
    document.addEventListener('click', function(e) {
        if (!genreDropdown.contains(e.target) && !genreBtn.contains(e.target)) {
            genreDropdown.classList.remove('show');
            genreBtn.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.NavbarLeftContainer__content .nav-item');
    navItems.forEach(item => {
        if (item.textContent.includes('Thông tin cá nhân')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.style.opacity = 0;
                setTimeout(() => {
                    window.location.href = 'CustomerInfor.html';
                }, 500);
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Sự kiện cho nút Đặt vé
    const btnBooks = document.querySelectorAll('.btn-book');
    btnBooks.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = 'detailmovie.html';
            }, 500);
        });
    });
});