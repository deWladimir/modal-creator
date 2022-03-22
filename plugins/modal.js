const _createSkeleton = (title) => {
    const modal_wrapper = document.createElement('div');
    modal_wrapper.classList.add('modal-wrapper');
    modal_wrapper.insertAdjacentHTML('afterBegin', `
    <div class="modal-block">
        <div class="modal-header">
            <p>${title}</p>
        </div>
        <div class="modal-footer">  
        </div>
    </div>
    `);

    return modal_wrapper;
}

const _createButtons = (parent, qnt, titles) => {
    const modal_footer = parent.children[0].children[1];

    for (let i = 0; i < qnt; ++i) {
        let button = document.createElement('button');
        button.setAttribute('id', 'btn_' + i);
        button.classList.add('mdl-ftr-btn');
        button.appendChild(document.createTextNode(titles[i]));
        modal_footer.appendChild(button);
    }
}

$.modal = (modalObj) => {
    $modal = _createSkeleton(modalObj.title);
    _createButtons($modal, modalObj.qnt, modalObj.btn_titles);

    //document.body.appendChild($modal);
}