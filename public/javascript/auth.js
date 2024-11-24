document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header-bar");
    const mainSection = document.getElementById("main-section");
    const loginModal = document.getElementById("login-modal");
    const loginForm = document.getElementById("login-form");
    const logoutLink = document.getElementById("logout-link");

    // LẮNG NGHE TRẠNG THÁI NGƯỜI DÙNG
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("User logged in:", user);
            header.classList.remove("hider");
            mainSection.classList.remove("hider");
            loginModal.classList.add("hider");
        } else {
            console.log("No user logged in");
            header.classList.add("hider");
            mainSection.classList.add("hider");
            loginModal.classList.remove("hider");
        }
    });

    // XỬ LÝ ĐĂNG NHẬP
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = loginForm['input-email'].value;
        const password = loginForm['input-password'].value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Đăng nhập thành công");
                loginForm.reset(); // Reset form
            })
            .catch((error) => {
                console.error("Lỗi đăng nhập:", error.message);
                document.getElementById("error-message").innerText = error.message;
            });
    });

    // XỬ LÝ ĐĂNG XUẤT
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut()
            .then(() => console.log("Đăng xuất thành công"))
            .catch(error => console.error("Lỗi khi đăng xuất:", error.message));
    });
});
