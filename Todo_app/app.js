// firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyBeRw8Xvug7Uy2lVq06DKB3Pmy3HbeyxJs",
  authDomain: "todo-app-6a2b8.firebaseapp.com",
  databaseURL: "https://todo-app-6a2b8-default-rtdb.firebaseio.com",
  projectId: "todo-app-6a2b8",
  storageBucket: "todo-app-6a2b8.appspot.com",
  messagingSenderId: "408113404213",
  appId: "1:408113404213:web:d6e7fe1633d2db6e26547c",
  measurementId: "G-36JB63Z5DB"
};

const frb = firebase.initializeApp(firebaseConfig)
const database = firebase.database();
let list = document.getElementById('list');

firebase.database().ref('node_name').on('child_added', (data) => {
  let item = data.val();
  let li = document.createElement('li');
  let liText = document.createTextNode(item.value);
  li.appendChild(liText);

  let deletebtn = document.createElement('button');
  let delBtnText = document.createTextNode('Del');
  let btns = document.createElement('div')
  btns.className = 'buttons'
  deletebtn.setAttribute('id', item.key)
  deletebtn.classList.add('del_btn')
  deletebtn.setAttribute('onclick', 'deleteItems(this)');
  deletebtn.appendChild(delBtnText);

  let editbtn = document.createElement('button');
  let editbtnText = document.createTextNode('Edit');
  editbtn.classList.add('edit_btn')
  editbtn.setAttribute('id', item.key)
  editbtn.setAttribute('onclick', 'editItems(this)');
  editbtn.appendChild(editbtnText);

  li.appendChild(btns);
  btns.appendChild(editbtn);
  btns.appendChild(deletebtn);
  list.appendChild(li);
  input.value = ''
  // console.log(data.val())
})

function addItems() {
  let input = document.getElementById('input');
  let key = database.ref('node_name').push().key;
  const obj = {
    value: input.value,
    key: key
  };
  database.ref('node_name/' + key).set(obj);
}
function deleteItems(e) {
  firebase.database().ref('node_name').child(e.id).remove()
  e.parentNode.parentNode.remove()
}
function editItems(e) {
  let userNewval = prompt('Enter your edit item.')
  let editTodo = {
    value: userNewval == '' || userNewval == null || userNewval == undefined ? editTodo?.value : userNewval,
    key: e.id
  }
  e.parentNode.parentNode.firstChild.nodeValue = editTodo?.value
  console.log(userNewval, 'chk')
  firebase.database().ref('node_name').child(e.id).set(editTodo)
}




