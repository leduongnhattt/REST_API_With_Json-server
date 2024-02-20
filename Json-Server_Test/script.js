var postApi = "http://localhost:3000/posts";

function start() {
  // getPosts(function(post) {
  //     renderPost(post);
  // });
  getPosts(renderPost);
  handleCreateForm();
}

start();

// Functions

function getPosts(callback) {
  fetch(postApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function createPost(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(postApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function editPost(id, data, callback) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(postApi + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderPost(post) {
  var listPosts = document.querySelector("#list-posts");
  var html = post.map(function (postTmp) {
    return `
            <li data-id="${postTmp.id}"> 
                <h4 class="id-${postTmp.id}">${postTmp.id}</h4>
                <p class="title-${postTmp.id}">${postTmp.title}</p>
                <button onclick="handleDeletePost(${postTmp.id})">Xóa</button>
                <button onclick="handleEditPost(${postTmp.id})">Sửa</button>
            </li>
        `;
  });

  listPosts.innerHTML = html.join("");
}
function handleDeletePost(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  fetch(postApi + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      var post = document.querySelector('li[data-id="' + id + '"]');
      if (post) {
        post.remove();
      }
    });
}

function handleCreateForm() {
  var createBtn = document.querySelector("#create");
  createBtn.onclick = function () {
    var id = document.querySelector('input[name="id"]').value;
    var title = document.querySelector('input[name="title"]').value;

    var formData = {
      id: id,
      title: title,
    };

    createPost(formData, function () {
      getPosts(renderPost);
    });
  };
}

function handleEditPost(id) {
  var iD = document.querySelector(".id-" + id);
  var title = document.querySelector(".title-" + id);
  var btnEdit = document.querySelector("#create");

  var inputId = document.querySelector('input[name="id"]');
  var inputTitle = document.querySelector('input[name="title"]');

  if (id && title) {
    inputId.value = iD.innerText;
    inputTitle.value = title.innerText;
    btnEdit.innerText = "Update";
  }

  btnEdit.onclick = function () {
    var formData = {
      id: inputId.value,
      title: inputTitle.value,
    };
    console.log(formData);
    editPost(id, formData, function () {
      getPosts(renderPost);
    });
    btnEdit.innerText = "Create";
    inputId.value = "";
    inputTitle.value = "";
  };
}
