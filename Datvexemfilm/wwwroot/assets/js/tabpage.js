const pageLogin = "userlogin.html"; 
const pageSignUp = "usersignup.html";

function goToPageLogin() {
    window.location.href = pageLogin;
}
function goToPageLogin2() {
    window.location.href = pageLogin;
}
function goToPageSignUp() {
    window.location.href = pageSignUp;
}

function toggleContent(type) {
    document.querySelectorAll(".description, .trailer").forEach(el => el.classList.add("hidden"));
    document.querySelector("." + type).classList.remove("hidden");

    document.querySelector(".buttoncontainer__description").classList.remove("active");
    document.querySelector(".buttoncontainer__trailer").classList.remove("active");
    document.querySelector(".buttoncontainer__" + type).classList.add("active");
}

// CUỘN TRANG
window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

function closeTab() {
    document.querySelector('.schedule__Booking').classList.add("hidden");
}
function showTab() {
    const modal = document.querySelector('.booking-modal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
}

function closeBookingModal() {
    const modal = document.querySelector('.booking-modal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Xử lý form đăng nhập
const loginForm = document.getElementById("loginform");
if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const user = document.getElementById("Username").value;
        const pass = document.getElementById("Password").value;

        const response = await fetch("http://localhost:5120/api/LoginControllers/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: user, password: pass })
        });

        const result = await response.json();
        if (result.success) {
            if (result.role === "admin") {
                window.location.href = "adminhome.html";
            } else {
                window.location.href = "home.html";
            }
        } else {
            alert(result.message);
        }
    });
}

// Xử lý form đăng ký
const registerForm = document.getElementById("registerform");
if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const user = document.getElementById("Username").value;
        const email = document.getElementById("Email").value;
        const pass = document.getElementById("Password").value;
        const confirm_pass = document.getElementById("Confirm_Password").value;

        if (pass !== confirm_pass) {
            alert("Mật khẩu không khớp!");
            return;
        }

        const response = await fetch("http://localhost:5120/api/RegisterControllers/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Username: user, Password: pass, Email: email })
        });

        const result = await response.json();
        if (result.success) {
            alert("Đăng ký thành công!");
            window.location.href = "userlogin.html";
        } else {
            alert(result.message);
        }
    });
}

// Load danh sách phim
async function loadfilm() {
    const response = await fetch("http://localhost:5120/api/FilmControllers/getfilm", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const result = await response.json();
    const movieList = document.querySelector("#movie");
    movieList.innerHTML = ""; 

    result.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie1");
        movieContainer.innerHTML = `
            <img src="${movie.src}" alt="photo" class="poster_booking">
            <p class="movie__name">${movie.name}</p>
            <p class="movie__releaseDay">KC | ${movie.releaseDay}</p>
        `;
        movieList.appendChild(movieContainer);
    });
}

// Xử lý chọn rạp
document.querySelectorAll('.cinema-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.cinema-item').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        // TODO: Cập nhật danh sách suất chiếu theo rạp
    });
});

// Xử lý chọn ngày
document.querySelectorAll('.date-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.date-item').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        // TODO: Cập nhật danh sách suất chiếu theo ngày
    });
});

// Xử lý chọn định dạng
document.querySelectorAll('.format-item input').forEach(item => {
    item.addEventListener('change', function() {
        // TODO: Cập nhật danh sách suất chiếu theo định dạng
    });
});

// Biến lưu thông tin đặt chỗ
let selectedShowtime = {
    date: '',
    time: '',
    screen: '',
    seats: 0
};

// Xử lý sự kiện click cho suất chiếu
document.querySelectorAll('.showtime-item').forEach(item => {
    item.addEventListener('click', function() {
        const seats = parseInt(this.dataset.seats);
        if (seats > 0) {
            // Xóa active state từ các suất chiếu khác
            document.querySelectorAll('.showtime-item').forEach(btn => btn.classList.remove('active'));
            // Thêm active state cho suất chiếu được chọn
            this.classList.add('active');

            const time = this.querySelector('.time').textContent;
            const screen = this.querySelector('.screen').textContent;
            const date = document.querySelector('.date-item.active .date').textContent;
            
            selectedShowtime = {
                date: date,
                time: time,
                screen: screen,
                seats: seats
            };
            
            showConfirmModal();
        }
    });
});

// Hiển thị form xác nhận
function showConfirmModal() {
    const confirmModal = document.querySelector('.confirm-modal');
    const movieTitle = document.querySelector('.movie-info__title').textContent;
    
    // Cập nhật thông tin trong form xác nhận
    document.getElementById('confirm-movie-title').textContent = movieTitle;
    document.getElementById('confirm-date').textContent = selectedShowtime.date;
    document.getElementById('confirm-time').textContent = selectedShowtime.time;
    document.getElementById('confirm-screen').textContent = selectedShowtime.screen;
    
    // Hiển thị form
    confirmModal.classList.remove('hidden');
    confirmModal.classList.add('active');
}

// Đóng form xác nhận
function closeConfirmModal() {
    const confirmModal = document.querySelector('.confirm-modal');
    confirmModal.classList.remove('active');
    setTimeout(() => {
        confirmModal.classList.add('hidden');
    }, 300);
}

// Xử lý checkbox điều khoản
document.getElementById('terms-checkbox').addEventListener('change', function() {
    const confirmBtn = document.querySelector('.confirm-modal__btn.confirm');
    confirmBtn.disabled = !this.checked;
});

// Chuyển hướng đến trang đặt ghế
function proceedToSeatSelection() {
    // Lưu thông tin đặt chỗ vào localStorage
    localStorage.setItem('bookingInfo', JSON.stringify({
        movieTitle: document.querySelector('.movie-info__title').textContent,
        date: selectedShowtime.date,
        time: selectedShowtime.time,
        screen: selectedShowtime.screen,
        seats: selectedShowtime.seats
    }));
    
    // Tạo và thêm element chuyển trang
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);
    
    // Kích hoạt hiệu ứng chuyển trang
    requestAnimationFrame(() => {
        pageTransition.classList.add('active');
    });
    
    // Chuyển hướng sau khi hiệu ứng hoàn thành
    setTimeout(() => {
        window.location.href = 'bookingTicket.html';
    }, 400);
}
