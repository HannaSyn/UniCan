const animItems = document.querySelectorAll('.anim-items');
const langBtn = document.querySelector('.lang');
const iconMenu=document.querySelector('.navigation__burger');
const menuBody=document.querySelector('.navigation__list');
const fileInput = document.querySelector("#file");
const fileName = document.querySelector("#file-name");
const fileEdit = document.querySelector('.contact-form__file-edit');
const fileRemove = document.querySelector('#file-remove');
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');


function animateOnScroll() {
  for( let i = 0; i < animItems.length; i++ ) {
    const animItem = animItems[i];
    const animItemHeigh = animItem.offsetHeight;
    const animItemOffset = offset(animItem).top;
    const animStart = 4;

    let animItemPoint = window.innerHeight - animItemHeigh / animStart;

    if( animItemHeigh >  window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if((pageYOffset > (animItemOffset - animItemPoint)) && (pageYOffset < (animItemOffset + animItemHeigh))) {
      animItem.classList.add('active');
    } else {
      animItem.classList.remove('active');
    }
  }
}

function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageXOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}


function openMenu(e) {
  iconMenu.classList.toggle('open');
  menuBody.classList.toggle('open');
};


function openLangList(e) {
  langBtn.classList.add('open');
  const target = e.target;
  if(!target.classList.contains('lang')){
    langBtn.classList.remove('open');
  }
};

fileInput.onchange = function(){
  uploadFile(this.files[0]);
  if (fileName != ''){
    fileEdit.classList.add('required');
  }
  fileName.textContent = this.files[0].name;
}

function uploadFile(file) {
  if(file.size > 25 * 1024 * 1024) {
    alert('error size');
  }
}

function removeFile() {
  fileInput.value = '';
  fileName.textContent = '';
  fileEdit.classList.remove('required');
}

async function formSend(e) {
  e.preventDefault();
  let error = formValidate(form);
  let formData = new FormData(form);
  formData.append('file', fileInput.files[0])
  if (!error) {
    let response = await fetch('sendmail.php', {
      method: 'POST',
      body: formData
    });
    if(response.ok) {
      let result = await response.json();
      alert(result.message);
      reset();
    } else {
      alert("Error")
    }
  } else {
    console.log("Fill form")
  }
}

function reset() {
  name.value = '';
  email.value = '';
  message.value = '';
  removeFile();
}

function formValidate(form) {
  let error = 0;
  let formReq = document.querySelectorAll(".req");

  for(let i = 0; i < formReq.length; i++) {
    const input = formReq[i]
    formRemoveError(input);
    
    if (input.classList.contains('email')) {
      if (emailTest(input)) {
        formAddError(input);
        error++;
      }
    } else {
      if (input.value === '') {
        formAddError(input)
        error++;
      }
    }
  }
}

function formAddError(input) {
  input.previousElementSibling.classList.add('err');
  input.classList.add('err');
}

function formRemoveError(input) {
  input.previousElementSibling.classList.remove('err');
  input.classList.remove('err');
}

function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener('scroll', animateOnScroll);
  form.addEventListener("submit", formSend);
  langBtn.addEventListener('click', openLangList);
  iconMenu.addEventListener('click', openMenu);
  fileRemove.addEventListener('click', removeFile);

});
