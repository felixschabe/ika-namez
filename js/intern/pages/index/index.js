/* function which scrolls to clicked headline */
Array.prototype.slice.call(document.getElementsByClassName('csHeadline hoverEffect')).forEach(function (item) {
    item.addEventListener('click', function (event) {
        let clickedItem = event.target;
        document.documentElement.scrollTop = clickedItem.offsetTop;
    });
});