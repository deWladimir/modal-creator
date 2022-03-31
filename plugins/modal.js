const _createSkeleton = (title, color, width, id) => {
    const modal_wrapper = document.createElement('div');
    modal_wrapper.classList.add('modal-wrapper');
    modal_wrapper.setAttribute('id', id);
    modal_wrapper.addEventListener('click', (event) => {
        if(event.target == event.currentTarget) {
            const this_modal = modals.filter( obj => obj.id() == event.target.id)[0];
            this_modal.close();
        }
    });
    modal_wrapper.insertAdjacentHTML('afterBegin', `
    <div class="modal-block" id="modal-block">
        <div class="modal-header">
            <p>${title}</p>
        </div>
        <div class="modal-footer">  
        </div>
    </div>
    `);

    const modal_block = modal_wrapper.children[0];

    modal_block.style.backgroundColor = color;
    modal_block.style.width = width + 'px';

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

$.modal = (modalObj, cnt) => {
    const _cnt = cnt;

    const $modal = _createSkeleton(modalObj.header, modalObj['background-color'], modalObj['width'], _cnt);
    _createButtons($modal, modalObj['btn-qnty'], modalObj.btn_titles);

    return {
        open: () => {
            document.body.appendChild($modal);
        },

        close: () => {
            document.body.removeChild($modal);
        },

        id: () => {
            return _cnt;
        },

        title: () => {
            return modalObj.header;
        },

        color: () => {
            return modalObj['background-color'];
        }
    }
}