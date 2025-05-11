const userinfo = {
    username: 'user1',
    password: 'user123',
    role: 'user'
}


function checklogin(){
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;
    if(username === userinfo.username && password === userinfo.password){
        if(userinfo.role === 'admin'){
            const usertest = {
                username: username,
                password: password,
                role: userinfo.role
            }
            window.location.href = '../FE/adminhome.html';
            saveUserInfo(usertest);
        }
        else{
            const usertest = {
                username: username,
                password: password,
                role: userinfo.role
            }
            window.location.href = '../FE/home.html';
            saveUserInfo(usertest);
        }
    }
    else{
        alert('Đăng nhập không thành công');
    }
}



