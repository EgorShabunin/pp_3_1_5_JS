const requestUserURL = 'http://localhost:8080/api/user';

$(async function() {
    await userPage();
});


async function userPage() {
    // проверяем статус запроса
     fetch(requestUserURL)
         // возвращаем json
         .then(r => r.json())
             // Закидываем данные в шапку и в таблицу
             .then(commits => {
                 $('#headOfUserPage').append(commits.username);
                 let roles = commits.roles.map(role => " " + role.name.substring(0));
                 $('#headOfUserPageRole').append(roles);

                 let user = `$(
             <tr>
                 <td>${commits.id}</td>
                 <td>${commits.firstName}</td>
                 <td>${commits.lastName}</td>
                 <td>${commits.age}</td>
                 <td>${commits.username}</td>
                 <td>${roles}</td>)
</tr>`;

                 $('#userPageContent').append(user);
             })
}
