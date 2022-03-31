const createList = (name) => {
    const div = document.createElement('div');
    div.classList.add('modal-list');
    div.insertAdjacentHTML("afterbegin", `
    <div class="modal-header">
        <div>
            <p class="name">
                ${name}
            </p>
            <p class="amount">
                0
            </p>
        </div>
        <div class="slider">
            <input type="checkbox" id="show-list">
            <label for="show-list"></label>
        </div>
    </div>
    <div id="modal-body">
        
    </div>
    `)

    document.body.appendChild(div);

    const input = div.children[0].children[1].children[0];
    input.addEventListener('click', (event) => {
        const slider = document.getElementsByClassName("slider")[0];
        if(event.target.checked) {
            slider.style.backgroundColor = '#8390e6';
        }

        else {
            slider.style.backgroundColor = 'rgb(194, 194, 194)';
        }
    });

    return div;
}

const change_amount = (parent, currentAmount) => {
    const p_amount = parent.children[0].children[0].children[1];
    p_amount.innerHTML = currentAmount;
}

const push_object = (parent, obj, flag) => {
    if(flag) {
        parent.children[1].insertAdjacentHTML("beforeend", `
                <div class="md-body-wrapper">
                    <div>
                        <p class="el-title">
                            ${obj.title()}
                        </p>
                        <p class="el-color">
                            ${obj.color()}
                        </p>
                    </div>
                    <button>Show</button>
                </div>
            `);
        
        parent.children[1].children[obj.currentAmount - 1].children[1].addEventListener('click', () => {
            obj.open();
        });
    }

    change_amount(parent, obj.currentAmount);
}

$.createdModals = () => {
    let modal_list = createList('Created modals');
    let _flag = false;

    return {
        push: (obj) => {
            push_object(modal_list, obj, _flag);
        },

        show: (list) => {
            for(el of list) {
                _flag = true; 
                push_object(modal_list, el, _flag);
                console.log(el.title());
            }
        },
        
        hide: () => {
            while(modal_list.children[1].children.length) {
                modal_list.children[1].children[0].remove();
            }
            
            _flag = false;
        },

        target_show_hide: () => {
            return modal_list.children[0].children[1];
        },

        isOpened: () => {
            return _flag;
        }
    }


} 