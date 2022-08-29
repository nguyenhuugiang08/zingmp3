import React from "react";

function NotificationVIP() {
    return (
        <div className='modal-overlay'>
            <div>Dành Cho Tài Khoản VIP</div>
            <div>
                Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản VIP
                để nghe bài hát này.
            </div>
            <div id='close-notification-vip'></div>
            <button>ĐĂNG NHẬP TÀI KHOẢN VIP</button>
        </div>
    );
}

export default NotificationVIP;
