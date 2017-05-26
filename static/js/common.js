function rems() {
    var html = document.documentElement;
    var _fontSize = html.getBoundingClientRect().width / 7.5;
    html.style.fontSize = _fontSize + 'px';
}
rems();
