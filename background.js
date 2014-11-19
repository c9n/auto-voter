'use strict';

var url = 'http://wap.nanshanski.com';

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 12; i++)
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
    var time = Math.floor(Math.random() * 360) + 1;

    clear_cookies();

    chrome.tabs.query({
        'url': url + '/*'
    }, function (tabs) {
        if (tabs.length > 0) {
            var cookie = 'COOKIE_61bcff89-7415-47b8-88c2-841aab7f168f' + makeid();
            chrome.tabs.update(tabs[0]['id'], {
                // xxx => id
                url: 'http://wap.nanshanski.com/ParticipateForVoting/userinfo/index.aspx?pvid=1&id=xxx&fromcookie=' + cookie
            })
        }
    });

    setTimeout(random_vote, time * 1000);
}

chrome.browserAction.onClicked.addListener(function () {
    random_vote();
});
