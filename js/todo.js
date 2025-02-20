document.addEventListener('DOMContentLoaded', function(){
    const todoList = document.getElementById('todoList');
    const inputTodo = document.getElementById('inputTodo');
    const btnAdd = document.getElementById('btnAdd');
    
    //등록
    btnAdd.addEventListener('click', function(e) {
        const todoValue = inputTodo.value;
        if(todoValue == '') {
            alert('할일을 입력하세요.');
            return;
        }
        const listItem = document.createElement('li');
        listItem.className = 'd-flex list-group-item';
        listItem.innerText = todoValue;

        const listBtn = document.createElement('button');
        listBtn.className = 'btn-close ms-auto';
        
        //삭제
        listBtn.onclick = function(e) {
            let pNode = e.target.parentNode;
            todoList.removeChild(pNode);
        }
        // 수정 (더블클릭시)
        listItem.ondblclick = function() {
            const currentText = listItem.innerText.replace('×', ''); // Remove the delete button text
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control';
            input.value = currentText;
            listItem.innerHTML = '';

            listItem.appendChild(input);

            // 엔터키 입력시 저장
            input.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    listItem.innerHTML = input.value + ' ';
                    listItem.appendChild(listBtn);
                }
            });
        };

        listItem.appendChild(listBtn);
        todoList.appendChild(listItem);

        inputTodo.value = '';
    });
});