let data;
let dynamicData;
let sort;
let direction_up = false;
let highestid;

const mainCall = () => {
  return fetch('http://localhost:3000/api/')//takes one argument the path to the resource you want to fetch
  .then(function(response){//this is an http response not an actual JSON
    return response.json()//use the json() to extract the body of the response
  })
  .then(function(myJson) {
    let id = myJson.map(e=>e.userID);
    highestid = Math.max(...id)
    highestid = highestid + 1;

    name = (JSON.stringify(myJson));

    data = myJson.map(element =>{
      addElement(element)
      return element;
    })
    dynamicData = data
  });
}

mainCall()

function addElement(data) {
  let bod = new Date(data.birthOfDate).toLocaleString('en-GB', {dateStyle:'short'});
  let mainDiv = document.querySelector('.main ol')
  let dataLi = document.createElement('ul');
  dataLi.classList.add('classOl');
  dataLi.setAttribute('data-id',data._id);

  let objectIdDiv = document.createElement('div');
  objectIdDiv.innerText = data._id;
  objectIdDiv.classList.add('objID');
  dataLi.appendChild(objectIdDiv);

  let userIdDiv = document.createElement('div');
  userIdDiv.innerText = data.userID;
  userIdDiv.classList.add('userID');
  dataLi.appendChild(userIdDiv);

  let fnameDiv = document.createElement('div');
  fnameDiv.innerText = data.first_name;
  fnameDiv.classList.add('firstName');
  dataLi.appendChild(fnameDiv);

  let lnameDiv = document.createElement('div');
  lnameDiv.innerText = data.last_name;
  lnameDiv.classList.add('lastName');
  dataLi.appendChild(lnameDiv);

  let genderCheck = document.querySelector('#genderCheck').checked;
  let genderDiv = document.createElement('div');
  genderDiv.innerText = data.gender;
  genderDiv.classList.add('gender');
  if(genderCheck){
    genderDiv.style.display = 'none'
  }
  dataLi.appendChild(genderDiv);

  let birthDiv = document.createElement('div');
  birthDiv.innerText = bod;
  birthDiv.classList.add('birthOfDate');
  dataLi.appendChild(birthDiv);

  let emailDiv = document.createElement('div');
  emailDiv.innerText = data.email;
  emailDiv.classList.add('email');
  dataLi.appendChild(emailDiv);

  let phoneDiv = document.createElement('div');
  phoneDiv.innerText = data.phone;
  phoneDiv.classList.add('phone');
  dataLi.appendChild(phoneDiv);

  let deleteBtn = document.createElement('button'); //we create a button element
  deleteBtn.classList.add('delBtn'); //we are adding a button class to our button element
  deleteBtn.onclick = function() { deleteFunction(data._id)} ;

  let delIcon = document.createElement('i');
  delIcon.classList.add('material-icons');
  delIcon.innerText = 'delete';

  let editBtn = document.createElement('button'); //we create a button element
  editBtn.classList.add('editBtn'); //we are adding a button class to our button element
  editBtn.onclick = () => { editFunction(editBtn, data) };

  editIcon = document.createElement('i');
  editIcon.classList.add('material-icons');
  editIcon.innerText = 'edit';

  mainDiv.appendChild(dataLi);
  deleteBtn.appendChild(delIcon);
  dataLi.appendChild(deleteBtn);
  editBtn.appendChild(editIcon);
  dataLi.appendChild(editBtn);
}

function myFunction() {
  let a;
  input = document.getElementById("myInput"); //pick the input element
  filter = input.value; //get the value of the element
  if (!filter){ //if the filter is empty
    a = dynamicData; //dynamicdata is the updated data that's been gathered after filter
  } else {
    a = dynamicData.filter(e => e.first_name.match(new RegExp(filter, 'mgi')) || e.last_name.match(new RegExp(filter, 'mgi')))
    //
  }
  document.querySelector('.main ol').innerHTML = '';
  a.map(element =>{
    addElement(element)
  })
}

function sortFunction(param) {
  direction_up = !direction_up
  sort = param
  dynamicData = data.sort((a,b) => {
    return (direction_up ? a[param] > b[param] : a[param] < b[param]) ? 1 : -1
  });

  redrawList()
}

function sortIntFunction(param) {
  direction_up = !direction_up
  sort = param
  dynamicData = data.sort((a,b) => {
    return direction_up ? parseInt(a[param]) - parseInt(b[param]) : parseInt(b[param]) - parseInt(a[param])
  });
  redrawList()
}

function redrawList () {
  document.querySelector('.main ol').innerHTML = '';
  dynamicData.map(element =>{
      addElement(element)
  });
  myFunction();
}

function deleteFunction(param) {
    return fetch('http://localhost:3000/api/' + param, {
      method: 'delete'
    }).then(response => {
      mainCall().then( () => {
        sortFunction(sort)
      })
      response.json().then(json => {
        return json;
      })
    });
}

function addEditElm (ol, data) {
  if (!data) {
    data = {
      first_name: 'first_name',
      last_name: 'last_name',
      gender: 'gender',
      birthOfDate: 'birthOfDate',
      email: 'email',
      phone: 'phone'
    }
  }

  let container = document.createElement('div');
  container.classList.add('container');

  let efnameDiv = document.createElement('div');
  efnameDiv.innerText = data.first_name;
  efnameDiv.contentEditable = "true";
  efnameDiv.classList.add('editFname');

  let elnameDiv = document.createElement('div');
  elnameDiv.innerText = data.last_name;
  elnameDiv.contentEditable = "true";
  elnameDiv.classList.add('editLname');

  let egenderDiv = document.createElement('div');
  egenderDiv.innerText = data.gender;
  egenderDiv.contentEditable = "true";
  egenderDiv.classList.add('editGender');

  let ebodDiv = document.createElement('input');
  ebodDiv.value = data.birthOfDate;
  ebodDiv.type = 'date';
  ebodDiv.classList.add('eBod');

  let eEmailDiv = document.createElement('div');
  eEmailDiv.innerText = data.email;
  eEmailDiv.contentEditable = "true";
  eEmailDiv.classList.add('eEmail');

  let ePhoneDiv = document.createElement('div');
  ePhoneDiv.innerText = data.phone;
  ePhoneDiv.contentEditable = "true";
  ePhoneDiv.classList.add('ePhone');

  let updateBtn = document.createElement('button');
  updateBtn.classList.add('updateBtn');
  updateBtn.onclick = function() {
    console.log('click update')
    updateFunction(data._id)
  };

  let editIcon = document.createElement('i');
  editIcon.classList.add('material-icons');
  editIcon.innerText = 'save';

  container.appendChild(efnameDiv);
  container.appendChild(elnameDiv);
  container.appendChild(egenderDiv);
  container.appendChild(ebodDiv);
  container.appendChild(eEmailDiv);
  container.appendChild(ePhoneDiv);
  container.appendChild(updateBtn);
  updateBtn.appendChild(editIcon);

  ol.appendChild(container);
}

function editFunction(btn, data) {
  btn.classList.toggle('active')
  document.querySelectorAll('.container').forEach(element=>{
    let parent = element.parentNode;
    parent.removeChild(element);
    parent.querySelector('.editBtn').style.background = 'white';
    parent.style.height = '31px';
  })
  if(btn.classList.contains('active')) {
    btn.style.background = 'rgba(0,0,0,0.4)'
    btn.parentElement.style.height = '100px';
    let ol = btn.parentElement;
    addEditElm(ol, data)
  }
}

function updateFunction(id) {
  let con = document.querySelector(`[data-id="${id}"]`)
  return fetch('http://localhost:3000/api/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userID: con.querySelector('.userID').innerText,
      first_name: con.querySelector('.editFname').innerText,
      last_name: con.querySelector('.editLname').innerText,
      gender: con.querySelector('.editGender').innerText,
      birthOfDate: new Date(con.querySelector('.eBod').value).toISOString(),
      email: con.querySelector('.eEmail').innerText,
      phone: con.querySelector('.ePhone').innerText
    })

  }).then(response => {
    mainCall().then( () => {
      sortFunction(sort)
    })
    response.json().then(json => {
      return json;
    })
  });
}

function insertFunction(parent) {
  return fetch('http://localhost:3000/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userID: highestid,
      first_name: parent.querySelector('.editFname').innerText,
      last_name: parent.querySelector('.editLname').innerText,
      gender: parent.querySelector('.editGender').innerText,
      birthOfDate: new Date(parent.querySelector('.eBod').value).toISOString(),
      email: parent.querySelector('.eEmail').innerText,
      phone: parent.querySelector('.ePhone').innerText
    })
  }).then(response => {
    mainCall().then( () => {
      sortFunction(sort)
    })
    response.json().then(json => {
      return json;
    })
  });
}

function addMember() {
  var btn = document.querySelector('.addBtn');
  btn.style.display = 'none';


  var parent = document.querySelector('.addMember');
  parent.style.width = "100%"
  var cancel = document.createElement('button');
  cancel.innerText = 'close panel'
  parent.appendChild(cancel);

  cancel.onclick = function() {
    parent.removeChild(parent.querySelector('.container'));
    btn.style.display = 'inline-block';
    cancel.style.display = 'none';
  }

  addEditElm(parent)
  parent.querySelector('.updateBtn').onclick = () => {
    insertFunction(parent)
    btn.style.display = 'inline-block';
    parent.removeChild(parent.querySelector('.container'));
    cancel.style.display = 'none';
  }
}

function tickGenderCheckbox(a) {
  let checkBox = document.getElementById('genderCheck');
  let genderList = document.querySelectorAll('.gender');

  genderList.forEach(elm => {
    elm.style.display = checkBox.checked ? 'none' : 'inline-block'
  })
}

function tickEmailCheckbox() {
  let checkBox = document.getElementById('emailCheck');
  let emailList = document.querySelectorAll('.email');

  emailList.forEach(elm => {
    elm.style.display = checkBox.checked ? 'none' : 'inline-block'
  })
}

function tickPhoneCheckbox() {
  let checkBox = document.getElementById('phoneCheck');
  let phoneList = document.querySelectorAll('.phone');

  phoneList.forEach(elm => {
    elm.style.display = checkBox.checked ? 'none' : 'inline-block'

  })
}

function tickBodCheckbox() {
  let checkBox = document.getElementById('bodCheck');
  let bodList = document.querySelectorAll('.birthOfDate');

  bodList.forEach(elm => {
    elm.style.display = checkBox.checked ? 'none' : 'inline-block'
  })
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
