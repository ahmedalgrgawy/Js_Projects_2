const keyboard = {
    elements: {
        main: null,
        keyContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: '',
        capslock: false
    },

    init() {
        // Create Elemnts
        this.elements.main = document.createElement("div");
        this.elements.keyContainer = document.createElement("div");

        // Setup Elemnts
        this.elements.main.classList.add("keyboard", 'keyboard-hidden');
        this.elements.keyContainer.classList.add("keys");
        this.elements.keyContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keyContainer.querySelectorAll(".key");

        // Add Dom
        this.elements.main.appendChild(this.elements.keyContainer);
        document.body.appendChild(this.elements.main);

        // Use Keyboard
        document.querySelectorAll(".user-input").forEach(ele => {
            ele.addEventListener('focus', () => {
                this.openKeyboard(ele.value, currentValue => {
                    ele.value = currentValue
                });
            })
        });
    },

    _createKeys() {
        let fragment = document.createDocumentFragment();
        let keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        // Create Html for an Icon
        let createHtmlIcons = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`;
        };

        keyLayout.forEach(key => {
            let keyElemnt = document.createElement('button');
            let insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add Atrrs to Elemnts
            keyElemnt.setAttribute('type', 'button');
            keyElemnt.classList.add('key');

            switch (key) {
                case 'backspace':
                    keyElemnt.classList.add("key-wide");
                    keyElemnt.innerHTML = createHtmlIcons("backspace");

                    keyElemnt.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvents("oninput");
                    });

                    break;

                case 'caps':
                    keyElemnt.classList.add("key-wide", 'key-active-dot');
                    keyElemnt.innerHTML = createHtmlIcons("keyboard_capslock");

                    keyElemnt.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElemnt.classList.toggle("key-active", this.properties.capslock);
                    });

                    break;

                case 'enter':
                    keyElemnt.classList.add("key-wide");
                    keyElemnt.innerHTML = createHtmlIcons("keyboard_return");

                    keyElemnt.addEventListener("click", () => {
                        this.properties.value += '\n';
                        this._triggerEvents("oninput");
                    });

                    break;

                case 'space':
                    keyElemnt.classList.add("key-extra-wide");
                    keyElemnt.innerHTML = createHtmlIcons("space_bar");

                    keyElemnt.addEventListener("click", () => {
                        this.properties.value += ' ';
                        this._triggerEvents("oninput");
                    });

                    break;

                case 'done':
                    keyElemnt.classList.add("key-wide", "key-dark");
                    keyElemnt.innerHTML = createHtmlIcons("check_circle");

                    keyElemnt.addEventListener("click", () => {
                        this.closeKeyboard();
                        this._triggerEvents("onclose");
                    });

                    break;

                default:

                    keyElemnt.textContent = key.toLowerCase();

                    keyElemnt.addEventListener("click", () => {
                        this.properties.value += this.properties.capslock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvents("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElemnt);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;

    },

    _triggerEvents(handlerName) {
        if (typeof this.eventHandlers[handlerName] == 'function') {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capslock = !this.properties.capslock;

        for (let key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    openKeyboard(intialValue, oninput, onclose) {
        this.properties.value = intialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard-hidden');
    },

    closeKeyboard() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard-hidden');
    }

};

window.addEventListener("DOMContentLoaded", function () {
    keyboard.init();
});