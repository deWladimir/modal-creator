const setPlaceholderWidth = (element) => {
    const span = document.createElement('span');
    const spanText = document.createTextNode(element.placeholder);
    span.appendChild(spanText);
    span.style.opacity = 0;
    span.style.fontSize = '14px';

    document.body.appendChild(span);
    textWidth = span.offsetWidth;
    document.body.removeChild(span);
    //console.log(textWidth);
    element.style.width = textWidth + 17 + 'px';
}

const setPatternForTextInput = (element, regex) => {
    element.setAttribute('pattern', regex);
}

const init = () => {
    const inputTypeNumber = document.getElementsByClassName('number');
    for (let i = 0; i < inputTypeNumber.length; ++i) {
        setPlaceholderWidth(inputTypeNumber[i]);
    }

    const input = document.getElementById('background-color');
    setPatternForTextInput(input, '#[a-z]{6}');
}

init();

$.modal(
    {
        title: 'MyModal',
        qnt: 2,
        btn_titles: ['First', 'Second']
    }
);