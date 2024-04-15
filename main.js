function createMessageBubble(sender, message, timestamp, isUser) {
    let messageBubbleHtml = `
        <div class="message-bubble ${isUser ? 'text-end right' : 'text-start left'}">
            <sub class="${isUser ? 'sender' : 'receive'} fw-bold">${sender}</sub>
            <div class="bgclr card ${isUser ? 'ms-auto' : 'me-auto'}" style="width: fit-content">
                <div class="card-body text-start p-2">${message}</div>
            </div>
            <sup class="fw-light">${timestamp}</sup>
        </div>
    `;
    
    $('.card-body.content').append(messageBubbleHtml);
}

function handleUserInput(message) {
    let timestamp = new Date().toLocaleString('en-IN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        
    });

    let lowercaseMessage = message.toLowerCase();

    // Check different scenarios
    let jamieResponse;


    if (lowercaseMessage.endsWith('?')) {
        jamieResponse = 'Yes';

    } else if (lowercaseMessage.trim() === 'jamie') {
            jamieResponse = 'Can I help you?';

    } else if (message === message.toUpperCase() || message.includes('!')) {
        if (lowercaseMessage.includes('!')) {
            jamieResponse = 'Please give me some time to resolve the issue.';
        } else {
            jamieResponse = 'Please remain calm.';  
        }
    
    } else {
        jamieResponse = 'Sorry, I don’t understand.';
    }

    // Display user's input
    createMessageBubble('You', message, timestamp, true);

    // Display Jamie's response
    createMessageBubble('Jamie', jamieResponse, timestamp, false);
}

$('#send-button').on('click', function() {
    let message = $('#message-input').val().trim();
    
    if (message !== '') {

        handleUserInput(message);
        
        $('#message-input').val('');
    }
});


$('#message-input').on('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        
        $('#send-button').click();
        window.location.href = '#message-input';
    }
});

function setTimestamp() {
    let timestamp = new Date().toLocaleString('en-IN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    document.getElementById('timestamp-placeholder').textContent = timestamp;
}

window.onload = setTimestamp;