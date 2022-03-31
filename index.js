const modals = [];
let counter = 0;
let _modal_list = $.createdModals();


const init = () => {
    const btn_qnt = document.getElementById('btn-qnty');
    btn_qnt.addEventListener('change', () => {
        buildButtons(btn_qnt.value);
    });

    const inputList = document.querySelectorAll('input');
    for(let el of inputList) {
        el.addEventListener('change', disable_btn);
    }

    const inputTypeNumber = document.getElementsByClassName('number');
    for (let i = 0; i < inputTypeNumber.length; ++i) {
        setPlaceholderWidth(inputTypeNumber[i]);
    }

    const input = document.getElementById('background-color');
    setPatternForTextInput(input, '#[a-z0-9]{6}');

    const btn_sbmt = document.getElementById('btn-sbmt');
    btn_sbmt.disabled = true;
    btn_sbmt.addEventListener('click', () => {
        let obj = getModalObjParams();
        let modal = $.modal(obj, counter);
        modals.push(modal);
    
        modal.currentAmount = ++counter;
        if(!_modal_list.isOpened()) {
            _modal_list.target_show_hide().children[0].checked = true; 
            _modal_list.target_show_hide().style.backgroundColor = '#8390e6';
            _modal_list.push(modal);
            _modal_list.show(modals);
        }
        else if(_modal_list.isOpened()) {
            _modal_list.push(modal);
        }
        reset_inputs();
        btn_sbmt.disabled = true;
    });

    const btn_reset = document.getElementById('btn-reset');
    btn_reset.addEventListener('click', reset_inputs);

    _modal_list.target_show_hide().children[0].addEventListener('click', () => {
        if(_modal_list.target_show_hide().children[0].checked) {
            _modal_list.show(modals);
        }
        else {
            _modal_list.hide();
        }
    });
}

init();



