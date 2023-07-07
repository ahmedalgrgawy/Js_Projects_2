Array.prototype.forEach.call(document.querySelectorAll(".file-btn"), function (btn) {
    const hiddenBtn = btn.parentElement.querySelector('.file-input');
    const label = btn.parentElement.querySelector('.file-label');

    const defaultLabelTxt = "No file(S) Selected";
    label.textContent = defaultLabelTxt;
    label.title = defaultLabelTxt;

    btn.onclick = function () {
        hiddenBtn.click();
    };
    hiddenBtn.addEventListener('change', () => {
        const filenamesList = Array.prototype.map.call(hiddenBtn.files, (file) => {
            return file.name;
        });

        label.textContent = filenamesList.join(', ') || defaultLabelTxt;
        label.title = label.textContent;
    });

});