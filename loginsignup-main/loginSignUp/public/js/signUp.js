/*document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    const qrCodeContainer = document.getElementById('qrcodeImage');
    const qrCodeText = 'https://192.168.174.174:8443/signUpMobile.html';

    function generateQRCode(text) {
        console.log("Generating QR code with text:", text);
        if (!qrCodeContainer) {
            console.error('QR code container not found!');
            return;
        }
        try {
            new QRCode(qrCodeContainer, {
                text: text,
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
            });
            console.log('QR code generated!');
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    }

    generateQRCode(qrCodeText);

    const ws = new WebSocket('wss://192.168.174.174:8443/');

    ws.onopen = function () {
        console.log('WebSocket connection established');
    };

    ws.onmessage = function (event) {
        console.log('Message from server: ' + event.data);
        let receivedMessages = JSON.parse(localStorage.getItem('receivedMessages')) || [];
        receivedMessages.push(event.data);
        localStorage.setItem('receivedMessages', JSON.stringify(receivedMessages));
        updateReceivedMessages();
    };

    function updateReceivedMessages() {
        const receivedMessages = JSON.parse(localStorage.getItem('receivedMessages')) || [];
        const receivedMessagesDiv = document.getElementById('receivedMessages');
        receivedMessagesDiv.innerHTML = '';
        receivedMessages.forEach((msg, index) => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${index + 1}: ${msg}`;
            receivedMessagesDiv.appendChild(messageElement);
        });
    }

    window.addEventListener('storage', function (e) {
        if (e.key === 'savedDescriptor') {
            console.log('New savedDescriptor received:', e.newValue);
            ws.send(e.newValue);
        }
    });
});
*/
var getData = localStorage.getItem("receivedMessages");
document.addEventListener('DOMContentLoaded', function () {
    const ws = new WebSocket('wss:///192.168.174.174:8443/');
    const receivedMessagesDiv = document.getElementById('receivedMessages');

    ws.onopen = function () {
        console.log('WebSocket connection established');
    };

  
    
    ws.onmessage = function (event) {
        console.log('Message from server:', event.data);

        // 서버에서 받은 JSON 문자열을 객체로 변환
        let messageObject = JSON.parse(event.data);

        // 로컬 스토리지에 객체를 문자열로 저장하기 전에 객체로 처리
        let receivedMessages = JSON.parse(localStorage.getItem('receivedMessages')) || [];
        receivedMessages.push(messageObject);  // 객체를 배열에 추가

        // 배열을 문자열로 변환하여 로컬 스토리지에 저장
        localStorage.setItem('receivedMessages', JSON.stringify(receivedMessages));

        // 화면 업데이트
        updateReceivedMessages();
    };

    function updateReceivedMessages() {
        const receivedMessagesDiv = document.getElementById('receivedMessages');
        if (receivedMessagesDiv) {
            receivedMessagesDiv.innerHTML = ''; // 기존 내용을 초기화
            let receivedMessages = JSON.parse(localStorage.getItem('receivedMessages')) || [];
            receivedMessages.forEach((message, index) => {
                // 객체를 문자열로 표시할 때는 JSON.stringify를 사용
                const messageElement = document.createElement('div');
                messageElement.textContent = `Message ${index + 1}: ${JSON.stringify(message)}`;
                receivedMessagesDiv.appendChild(messageElement);
            });
        } else {
            console.error('The element with ID "receivedMessages" does not exist in the HTML document.');
        }
    }
    var qrcodeText = "https://192.168.174.174:8443/signUpMobile.html";
    new QRCode(document.getElementById("qrcodeImage"), {
        width: 200,
        height: 200,
        colorDark : "rgb(245,245,220)",
        colorLight : "rgb(85, 107, 47)",
        text: qrcodeText
    });


});

