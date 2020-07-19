const refs = {
  signOut: document.querySelector(".header__sign-out-button"),
  signIn: document.querySelector(".sign-in"),
  registration: document.querySelector(".registration"),
  table: document.querySelector(".table"),
  tableBody: document.querySelector(".table__tbody"),
  tableButton: document.querySelector(".table__button-add-admin"),
  tamplate: document.querySelector('#template').innerHTML.trim(),
};

/// time
let date = new Date();
const options = {
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};
const time = date.toLocaleString('Uk-uk', options);

/// array with admins
let adminList = {
  activeAdmin: 0,
  admins: [{
    id: 0,
    admin: "admin",
    password: "admin",
    date: time,
  }, ]
};

///get admins with localstorage
const savedAdmins = localStorage.getItem('admins');
const parsedAdmins = JSON.parse(savedAdmins);
if (parsedAdmins !== null) {
  adminList = {
    ...parsedAdmins
  };
};

/// rendering admins list
const template = Handlebars.compile(refs.tamplate);
const markup = template(adminList);
refs.tableBody.insertAdjacentHTML('beforeend', markup);

let buttonDeleteActivUser = refs.tableBody.rows[adminList.activeAdmin].cells[2].children[0];
// if (adminList.activeAdmin === true) {
//   buttonDeleteActivUser = refs.tableBody.rows[adminList.activeAdmin].cells[2].children[0];
// }

/// event sign in
refs.signIn.addEventListener("submit", validatingAdmins);

function validatingAdmins(e) {
  e.preventDefault();
  const adminItem = {
    admin: e.currentTarget.elements[0].value,
    password: e.currentTarget.elements[1].value,
  };

  for (let i = 0; i < adminList.admins.length; i++) {
    if (adminItem.admin === adminList.admins[i].admin &&
      adminItem.password === adminList.admins[i].password) {
      adminList.activeAdmin = adminList.admins[i].id;
      localStorage.setItem('admins', JSON.stringify(adminList));

      refs.signIn.classList.add('disable');
      refs.table.classList.remove('disable');
      refs.signOut.classList.remove('disable');
      break;
    } else {
      console.log('no');
    }
  }

  buttonDeleteActivUser.classList.remove('disable');
}

/// event sign out
refs.signOut.addEventListener("click", signOut);

function signOut() {
  refs.signIn.classList.remove('disable');
  refs.table.classList.add('disable');
  refs.signOut.classList.add('disable');
  buttonDeleteActivUser.classList.add('disable');
}

/// event open form for add other admins
refs.tableButton.addEventListener("click", openFormAddAdmin);

function openFormAddAdmin() {
  refs.registration.classList.remove('disable');
  refs.table.classList.add('disable');
  refs.signOut.classList.add('disable');
}

/// event add other admins
refs.registration.addEventListener("submit", addAdmin);

let lenghtAdminList = adminList.admins.length - 1;
let id = adminList.admins[lenghtAdminList].id;

function addAdmin(e) {
  e.preventDefault();
  refs.registration.classList.remove('disable');
  refs.table.classList.add('disable');
  refs.signOut.classList.add('disable');

  const adminItem = {
    id: id + 1,
    admin: e.currentTarget.elements[0].value,
    password: e.currentTarget.elements[1].value,
    date: time,
  };

  adminList.admins.push(adminItem);

  e.currentTarget.elements[0].value = '';
  e.currentTarget.elements[1].value = '';

  refs.registration.classList.add('disable');
  refs.table.classList.remove('disable');
  refs.signOut.classList.remove('disable');

  const template = Handlebars.compile(refs.tamplate);
  const markup = template(adminList);
  refs.tableBody.innerHTML = markup;

  localStorage.setItem('admins', JSON.stringify(adminList));
};

/// remove admins
refs.tableBody.addEventListener("click", removeAdmin);

function removeAdmin(e) {
  // console.log(refs.tableBody.rows[0].id);
  // for (let j = 0; j < refs.tableBody.rows.length; j++) {
  //   console.log(refs.tableBody.rows[j].id);
  // }
  // const buttonDelete = document.querySelector(".button-delete");
  // console.log(buttonDelete.parentNode.parentNode);
  // let element = e.target;
  // let id = element.parentNode.parentNode.id;
  // if (Number(id) === adminList.activeAdmin) {
  //   element.parentNode.parentNode.parentNode.removeChild(
  //     element.parentNode.parentNode);
  // }

  // for (let j = 0; j < refs.tableBody.rows.length; j++) {
  //   if (Number(refs.tableBody.rows[j].id) === adminList.activeAdmin) {
  //     refs.tableBody.rows[j].cells[2].children[0].classList.add('disable');
  //     console.log(refs.tableBody.rows[j].cells[2].children[0].className);
  //     console.log(refs.tableBody.rows[j].id);
  //   }
  // };
  refs.tableBody.rows[adminList.activeAdmin].remove();
}