$(async function() {
    await allUsers();
});

const requestUsersURL = 'http://localhost:8080/api/users';
const table = $('#adminPageContent');

async function allUsers() {
    table.empty()
    fetch(requestUsersURL)
        // возвращаем json
        .then(r => r.json())
        // Закидываем данные в шапку и в таблицу
        .then(commits => {
            commits.forEach(user => {
                let allUsers = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.age}</td>
                             <td>${user.username}</td>
                            <td>${user.roles.map(role => " " + role.name.substring(0))}</td>
                            <td>
                                <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit"
                                data-action="edit" data-id="${user.id}" data-target="#edit">Edit</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
                                data-action="delete" data-id="${user.id}" data-target="#delete">Delete</button>
                            </td>
                        </tr>)`;
                table.append(allUsers);
            })
        })
}

                               // Добавление юзера//
$(async function() {
    await newUser();
});

const requestNewUserURL = 'http://localhost:8080/api/roles';
async function newUser() {
    await fetch(requestNewUserURL)
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let el = document.createElement("option");
                el.text = role.name.substring(5);
                el.value = role.id;
                $('#newRole')[0].appendChild(el);
            })
        })

    const form = document.forms["NewUser"];
    form.addEventListener('submit', addNewUser)

    function addNewUser(e) {
        e.preventDefault();
        let newRoles = [];
        for (let i = 0; i < form.roles.options.length; i++) {
            if (form.roles.options[i].selected) newRoles.push({
                id : form.roles.options[i].value,
                name : form.roles.options[i].name
            })
        }

        fetch("http://localhost:8080/api/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: form.name.value,
                lastName: form.lastName.value,
                age: form.age.value,
                username: form.username.value,
                password: form.password.value,
                roles: newRoles
            })
        }).then(() => {
            form.reset();
            allUsers();
            $('#nav-home-tab').click();
        })
    }
}





                          // Редактирование пользователя //

// Получаем модальное окно

$('#edit').on('show.bs.modal', ev => {
    let button = $(ev.relatedTarget);
    let id = button.data('id');
    openEditModal(id);
})

async function openEditModal(id) {
    let user = await getUserById(id);
    let form = document.forms["editUser"];
    form.id.value = user.id;
    form.firstName.value = user.firstName;
    form.lastName.value = user.lastName;
    form.age.value = user.age;
    form.username.value = user.username;
    form.password.value = null;


    await fetch("http://localhost:8080/api/roles")
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < user.roles.length; i++) {
                    if (user.roles[i].name === role.name) {
                        selectedRole = true;
                        break;
                    }
                }
                let el = document.createElement("option");
                el.text = role.name.substring(5);
                el.value = role.id;
                if (selectedRole) el.selected = true;
                $('#rolesEdit')[0].appendChild(el);
            })
        })
}


// Редактируем пользователя

$(async function() {
    editUser();
});

function editUser() {
    const editForm = document.forms["editUser"];
    editForm.addEventListener("submit", ev => {
        ev.preventDefault();
        let editRoles = [];
        for (let i = 0; i < editForm.roles.options.length; i++) {
            if (editForm.roles.options[i].selected) editRoles.push({
                id : editForm.roles.options[i].value,
                name : "ROLE_" + editForm.roles.options[i].text
            })
        }
        fetch("http://localhost:8080/api/users/" + editForm.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editForm.id.value,
                firstName: editForm.firstName.value,
                lastName: editForm.lastName.value,
                age: editForm.age.value,
                username: editForm.username.value,
                password: editForm.password.value,
                roles: editRoles
            })
        }).then(() => {
            $('#closeEdit').click();
            allUsers();
        })
    })
}




                   // Удаление пользователя

// Получаем модальное окно
$('#delete').on('show.bs.modal', ev => {
    let button = $(ev.relatedTarget);
    let id = button.data('id');
    openDeleteModal(id);
})

async function openDeleteModal(id) {
    let userDel = await getUserById(id);
    let formDel = document.forms["deleteUser"];
    formDel.id.value = userDel.id;
    formDel.firstName.value = userDel.firstName;
    formDel.lastName.value = userDel.lastName;
    formDel.age.value = userDel.age;
    formDel.username.value = userDel.username;

    await fetch("http://localhost:8080/api/roles")
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < userDel.roles.length; i++) {
                    if (userDel.roles[i].name === role.name) {
                        selectedRole = true;
                        break;
                    }
                }
                let el = document.createElement("option");
                el.text = role.name.substring(5);
                el.value = role.id;
                if (selectedRole) el.selected = true;
                $('#rolesDel')[0].appendChild(el);
            })
        });
}

// Удаляем пользователя
$(async function() {
    deleteUser();
});
function deleteUser(){
    const deleteUser = document.forms["deleteUser"];
    deleteUser.addEventListener("submit", ev => {
        ev.preventDefault();
        fetch("http://localhost:8080/api/users/" + deleteUser.id.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                $('#closeDelete').click();
                allUsers();
            })
    })
}



async function getUserById(id) {
    let url = "http://localhost:8080/api/users/" + id;
    let response = await fetch(url);
    return await response.json();
}



