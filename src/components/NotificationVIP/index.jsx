import React from "react";
import "scss/_notificationvip.scss";

function NotificationVIP() {
    return (
        <div className='modal-overlay'>
            <div className="modal-wrapper">
                <div className='notification'>
                    <div className='notification-title'>Dành Cho Tài Khoản VIP</div>
                    <div className='notification-description'>
                        Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản
                        VIP để nghe bài hát này.
                    </div>
                    <div id='close-notification-vip'></div>
                    <div className='notification-login'>
                        ĐĂNG NHẬP TÀI KHOẢN VIP
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationVIP;
