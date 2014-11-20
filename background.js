'use strict';

var url = 'http://wap.nanshanski.com';

function makeid(count) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < count; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function clear_cookies() {
    chrome.cookies.getAll({
        'url': url

    }, function (cookies) {
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            chrome.cookies.remove({
                'url': url,
                'name': cookie.name

            }, function (el) {
                console.log(el);
            })
        }
    });
}

function random_vote() {
    var time = Math.floor(Math.random() * 10) + 1;

    clear_cookies();

    chrome.tabs.query({
        'url': url + '/*'
    }, function (tabs) {
        if (tabs.length > 0) {
            var cookie = 'COOKIE_' + makeid(8) +'-' + makeid(4) + '-' + makeid(4) + '-' + makeid(4) + '-841aab7f168f' + makeid(12);
            chrome.tabs.update(tabs[0]['id'], {
                url: 'http://wap.nanshanski.com/ParticipateForVoting/userinfo/index.aspx?pvid=1&id=xxx&fromcookie=' + cookie
            })
        }
    });

    setTimeout(random_vote, time * 1000);
}

chrome.browserAction.onClicked.addListener(function () {
    random_vote();
});
