document.addEventListener('DOMContentLoaded', function() {
    const findPwButton = document.getElementById('findPwButton');

    findPwButton.addEventListener('click', function() {
        const memberName = document.getElementById('userName').value;
        const memberId = document.getElementById('userId').value;
        const memberEmail = document.getElementById('userEmail').value;

        if (!memberName || !memberId || !memberEmail) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        fetch('/member/find-pw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                memberName: memberName,
                memberId: memberId,
                memberEmail: memberEmail
            })
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text);
                    });
                }
                return response.json();
            })
            .then(data => {
                alert('임시 비밀번호가 이메일로 전송되었습니다.');
                window.location.href = `/member/find-pwOk?memberName=${encodeURIComponent(memberName)}`;
            })
            .catch(error => {
                alert(error.message || '입력하신 정보와 일치하는 회원이 없습니다.');
            });
    });
});