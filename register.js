// Lấy ra element của trang

const formRegister = document.getElementById("formRegister");
const userNameElement = document.getElementById("userName");
const emailElement = document.getElementById("Email");
const passwordElement = document.getElementById("password");
const rePasswordElement = document.getElementById("rePassword");
const addressElement = document.getElementById("address");
// Lấy phần lỗi 
const userNameError = document.getElementById("userNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const rePasswordError = document.getElementById("rePasswordError");

// Lấy dữ liệu từ localStorage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];
/**
 *  Validate: địa chỉ email
 * @param {*} email: chuỗi email người dùng nhập vào 
 * @returns : Dữ liệu nếu email đúng định dạng, ngược lại undifined nếu email không đúng định dạng
 * Author: TMT(11/08/2024)
 */
// Định dạng cho email
function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}

// Lắng nghe sự kiện submit form đăng ký tài khoản
formRegister.addEventListener("submit", function(e){
    // Ngăn chặn sự kiện load lại trang
    e.preventDefault();

    // Kiểm tra giá trị  đầu vào

    // Họ và tên
    if(!userNameElement.value){
        // Bật hiển thị lỗi
        userNameError.style.display="block";
    }else {
        // Tắt hiển thị lỗi
        userNameError.style.display="none";
    }

    // Email
    if(!emailElement.value){
        // Bật hiển thị lỗi
        emailError.style.display="block";
    }else {
        // Tắt hiển thị lỗi
        emailError.style.display="none";

        // Kiểm tra định dạng của email @gmail.com
        if(!validateEmail(emailElement.value)){
            // Hiển thị lỗi
            emailError.style.display="block";
            emailError.innerHTML="Email không đúng định dạng";
        }
    }

    // Password
    if(!passwordElement.value){
        // Bật hiển thị lỗi
        passwordError.style.display="block";
    }else {
        // Tắt hiển thị lỗi
        passwordError.style.display="none";
    }

    // Nhập lại passord
    if(!rePasswordElement.value){
        // Bật hiển thị lỗi
        rePasswordError.style.display="block";
    }else {
        // Tắt hiển thị lỗi
        rePasswordError.style.display="none";
    }
    // Kiểm tra mật khẩu với nhập lại mật khẩu có trùng khớp hay không
    if(passwordElement.value !== rePasswordElement.value){
        rePasswordError.style.display = "block";
        rePasswordError.innerHTML = "Mật khẩu không khớp";
    }

    // Gửi dữ liệu từ form lên localStorage
    // Kiểm tra xem tất cả phải có thông tin mới gửi dữ liệu đi
    if
    (
       userNameElement.value &&
       emailElement.value &&
       passwordElement.value &&
       rePasswordElement.value &&
       passwordElement.value === rePasswordElement.value &&
       validateEmail(emailElement.value)
    ) {
        // Lấy dữ liệu từ form và gộp thành đối tượng user
        const user = {
            //userID: uuidv4(),
            userID: Math.ceil(Math.random()*100000000),
            userName: userNameElement.value,
            email: emailElement.value,
            password: passwordElement.value,
            address: addressElement.value,
        };

        // Push user vào trong mảng userLocal
        userLocal.push(user);

        // Lưu trữ dữ liệu lên local
        localStorage.setItem("users", JSON.stringify(userLocal));

        // Chuyển hướng về trang đăng nhập
        
        // Chuyển hướng về trang đăng nhập sau 1 giây
        setTimeout(function(){
            window.location.href = "login.html";
        }, 1000);
        
    }
});