document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('todoList');
    const inputTodo = document.getElementById('inputTodo');
    const btnAdd = document.getElementById('btnAdd');
    
    // 로컬스테이지에서 로드하기
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todoList.innerHTML = ''; 
        todos.forEach(todo => {
            addTodoItem(todo);
        });
    }

    // 로컬스테이지에 추가하기
    function addTodoItem(todoValue) {
        const listItem = document.createElement('li');
        listItem.className = 'd-flex list-group-item';
        listItem.innerText = todoValue;

        const listBtn = document.createElement('button');
        listBtn.className = 'btn-close ms-auto';
        
        //삭제
        listBtn.onclick = function(e) {
            let pNode = e.target.parentNode;
            todoList.removeChild(pNode);
            updateLocalStorage();
        }

        // 수정하기(더블클릭시)
        listItem.ondblclick = function() {
            const currentText = listItem.innerText.replace('×', ''); // Remove the delete button text
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control';
            input.value = currentText;
            listItem.innerHTML = '';
            listItem.appendChild(input);

            //수정(엔터시 입력)
            input.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    listItem.innerHTML = input.value + ' ';
                    listItem.appendChild(listBtn);
                    updateLocalStorage();
                }
            });
        };

        listItem.appendChild(listBtn);
        todoList.appendChild(listItem);

        updateLocalStorage();
    }

    // 리스트를 현재 작업 목록으로 로컬스테이지 업데이트
    function updateLocalStorage() {
        const todos = [];
        document.querySelectorAll('#todoList li').forEach(item => {
            todos.push(item.innerText.replace('×', '').trim());
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // 추가 버튼 클릭시 작업 추가
    btnAdd.addEventListener('click', function() {
        const todoValue = inputTodo.value;
        if(todoValue === '') {
            alert('할일을 입력하세요.');
            return;
        }
        addTodoItem(todoValue);
        inputTodo.value = '';
    });

    // 작업목록 로드
    loadTodos();
});