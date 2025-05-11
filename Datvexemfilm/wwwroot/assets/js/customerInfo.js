
// Sửa thông tin
const btnEdit = document.querySelector('.btn-edit-info');
const userInfoContainer = document.querySelector('.user-info-container');
let isEditing = false;

btnEdit.addEventListener('click', function() {
    if (!isEditing) {
        userInfoContainer.querySelectorAll('.user-info-row').forEach((row) => {
            const valueSpan = row.querySelector('.user-info-value');
            const label = row.querySelector('.user-info-label').innerText.trim();
            let type = 'text';
            if (label.includes('Username')) {
                valueSpan.innerHTML = `<input type='text' value='${valueSpan.innerText.trim()}' readonly style='background:#222; color:#aaa; cursor:not-allowed;'>`;
                return;
            }
            if (label.includes('Email')) type = 'email';
            if (label.includes('Số điện thoại')) type = 'tel';
            if (label.includes('Ngày sinh')) type = 'date';
            if (label.includes('Giới tính')) {
                valueSpan.innerHTML = `<select><option>Nam</option><option>Nữ</option><option>Khác</option></select>`;
                return;
            }
            valueSpan.innerHTML = `<input type='${type}' value='${valueSpan.innerText.trim()}' />`;
        });
        btnEdit.innerHTML = '<i class="fas fa-save"></i> Lưu thông tin';
        isEditing = true;
    } else {
        userInfoContainer.querySelectorAll('.user-info-row').forEach((row) => {
            const valueSpan = row.querySelector('.user-info-value');
            const input = valueSpan.querySelector('input, select');
            if (input) valueSpan.innerText = input.value || input.options[input.selectedIndex].text;
        });
        btnEdit.innerHTML = '<i class="fas fa-edit"></i> Chỉnh sửa thông tin';
        isEditing = false;
    }
});

// Đổi mật khẩu
const btnChangePass = document.querySelector('.btn-change-pass');
const changePassModal = document.getElementById('changePassModal');
const closeChangePass = document.querySelector('.close-change-pass');

btnChangePass.addEventListener('click', () => {
    changePassModal.classList.add('show');
});
closeChangePass.addEventListener('click', () => {
    changePassModal.classList.remove('show');
});
window.addEventListener('click', (e) => {
    if (e.target === changePassModal) changePassModal.classList.remove('show');
});