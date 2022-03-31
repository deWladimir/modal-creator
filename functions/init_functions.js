const IDS = ['width', 'header', 'background-color'];

const checkBackGround = () => {
    const backgroundINPUT = document.getElementById('background-color');
    const backgroundREGEX = backgroundINPUT.getAttribute('pattern');
    if(backgroundINPUT.value.match(backgroundREGEX) && backgroundINPUT.value.length == 7) {
        return true;
    }

    return false;
}

const setPlaceholderWidth = (element) => {
    const span = document.createElement('span');
    const spanText = document.createTextNode(element.placeholder);
    span.style.opacity = 0;
    span.style.fontSize = '14px';
    span.appendChild(spanText);
    
    document.body.appendChild(span);
    textWidth = span.offsetWidth;
    document.body.removeChild(span);
    //console.log(textWidth);
    element.style.width = textWidth + 17 + 'px';
}

const setPatternForTextInput = (element, regex) => {
    element.setAttribute('pattern', regex);
}

const buildButtons = (qnt) => {

    if(document.getElementById('btn-headers')) {
        for(let i = 0; i < document.getElementById('btn-headers').children.length; ++i) {
            document.getElementById('btn-header_' + i).removeEventListener('change', disable_btn);
        }
        document.getElementById('btn-headers').remove();
    }
        
    if(qnt > 0) {
        const btn_headers_wrapper = document.createElement('div');
        btn_headers_wrapper.setAttribute('id', 'btn-headers');
        for(let i = 0; i < qnt; ++i) {
                let btn_id = 'btn-header_' + i;
                let btn_text = 'Btn_' + i + ' Text';
                btn_headers_wrapper.insertAdjacentHTML('beforeEnd', `
                <div>
                    <label for="${btn_id}">${btn_text}</label>
                    <input type="text" placeholder=${btn_text} id="${btn_id}" required>
                </div>
                `)
        }

        const ref = document.getElementById('btn-qnty').parentNode.nextSibling;
        const parent = document.getElementsByClassName('form')[0];
        parent.insertBefore(btn_headers_wrapper, ref);

        for(let i = 0; i < qnt; ++i) {
            document.getElementById('btn-header_' + i).addEventListener('change', disable_btn);
        }
    }
}

const getModalObjParams = () => {
    const ids = ['width', 'btn-qnty', 'header', 'background-color'];

    const input = [];

    for(let id of ids) {
        let node = document.getElementById(id);

        input.push({
            id: node.id,
            value: node.value
        });
    }

    if(document.getElementById('btn-qnty').value > 0) {
        const childList = document.getElementById('btn-headers').children;

        const btn_titles = []

        for(el of childList) {
            btn_titles.push(el.children[1].value);
        }

        input.push({
            id: 'btn_titles',
            value: btn_titles
        });
    }

    const obj = {}
    input.map(el => {
        obj[el['id']] = el['value']
    });

    return obj;
}

const disable_btn = (event) => {
    const btn_sbmt = document.getElementById('btn-sbmt');
    let flag = true;

    for(let id of IDS) {
        if(!document.getElementById(id).value || !checkBackGround()) {
            btn_sbmt.disabled = true;
            flag = false;
            break;
        }
    }

    if(flag && document.getElementById('btn-qnty').value > 0) {
        const childList = document.getElementById('btn-headers').children;
        for(el of childList) {
            if(!el.children[1].value) {
                btn_sbmt.disabled = true;
                flag = false;
                break;
            }
        }
    } 

    if(flag) {
        btn_sbmt.disabled = false;
    }
}

const reset_inputs = () => {
    for(let id of IDS) {
        const input = document.getElementById(id);
        if(input.value) {
            input.value = '';
        }
    }

    const btn_qnt = document.getElementById('btn-qnty');
    if(btn_qnt.value > 0) {
        const btns_text = document.getElementById('btn-headers');
        btns_text.remove();
        btn_qnt.value = '';
    }
}