// // Seleciona todos as pecas com a classe de "draggable"
// const draggables = document.querySelectorAll('.draggable');

// // Seleciona todas os vaos com a classe de "dropzone"
// const dropzones = document.querySelectorAll('.dropzone');

// // Seleciona os contadores de cada vao
// const contador1 = document.getElementById('contador1');
// const contador2 = document.getElementById('contador2');

// // Seleciona o modal de aviso
// const modal = document.querySelector('#modal');

// // Objetos que serão usados para relacionar os contadores com as dropzones
// let contadores = {
//   dropzone1: contador1,
//   dropzone2: contador2
// };
// let contadorDePecas = {
//   dropzone1: 0,
//   dropzone2: 0
// };

// // Para cada peca das listas de pecas adiciona o evento de "segurar" a peca
// draggables.forEach(draggable => {
//   draggable.addEventListener('dragstart', dragStart);
// });

// // Para cada vao da lista de vaos adiciona os eventos de "posicionar acima" e "soltar" a peca na zona
// dropzones.forEach(dropzone => {
//   dropzone.addEventListener('dragover', dragOver);
//   dropzone.addEventListener('drop', drop);
// });

// // Ao segurar a peca, o id dela é armazenado no dataTransfer
// function dragStart(event) {
//   event.dataTransfer.setData('text/plain', event.target.id);
// }

// // Ao segurar a peca acima do vao, previne que a peca faca o comportamento padrao de posicionar a peca acima do vao
// function dragOver(event) {
//   event.preventDefault();
// }

// // Ao soltar a peca no vao, ela é posicionada dentro dele e a quantidade de pecas do vao é atualizado
// function drop(event) {
//   event.preventDefault();
//   // puxa o id da peca setado no dataTransfer
//   const data = event.dataTransfer.getData('text/plain');
//   // puxa a peca com base no id dela
//   const draggableElement = document.getElementById(data);
//   // puxa o vao que a peca foi solta
//   const dropzone = event.target;
//   // pega o botao de fechar o modal
//   const close = document.querySelector('.close')

//   // verifica a quantidade de pecas no vao e limita ele
//   if(dropzone.querySelectorAll('.draggable').length >= 10) {
//     alert('Limite de peças atingido!!');
//     // modal.style.display = 'block';
//     // modal.children[0].classList.add('fadeScaleIn');
//     // close.addEventListener('click', function closeModal() {
//     //   modal.children[0].classList.add('fadeScaleOut');
//     //   setTimeout(() => {
//     //     modal.style.display = 'none';
//     //   }, 400);
//     // })
//     return;
//   }
  
//   // remove a classe de animacao inicial da peca
//   draggableElement.classList.remove('animate-initialize')
//   // adiciona a classe de animacao de entrada da peca no vao
//   draggableElement.classList.add('fadeIn')

//   // puxa o id do vao
//   const dropzoneId = dropzone.id;
//   // pega o id do container anterior da peca
//   const previousDropzoneId = draggableElement.parentElement.id;

//   // oncrementa o contador de pecas do vao em que a peca foi solta
//   if (dropzoneId !== previousDropzoneId) {
//     contadorDePecas[dropzoneId]++;
//     if (contadores[dropzoneId]) {
//       contadores[dropzoneId].innerText = contadorDePecas[dropzoneId];
//     }
    
//     // decrementa o contador de pecas do vao anterior da peca (caso tenha sido retirada de um vao e realocado em outro)
//     if (contadores[previousDropzoneId]) {
//       contadorDePecas[previousDropzoneId]--;
//       contadores[previousDropzoneId].innerText = contadorDePecas[previousDropzoneId];
//     }
//   }

//   // move a peca para o novo vao dela se ela nao estiver dentro dele
//   if (!dropzone.contains(draggableElement)) {
//     draggableElement.parentNode.removeChild(draggableElement);
//     dropzone.appendChild(draggableElement);
//   }
// }

// // Reseta todas as pecas, vaos e estilos
// function resetDragDrop() {
//   draggables.forEach(draggable => {
//     // adiciona uma classe para iniciar a animação de remoção
//     draggable.classList.add('removing');
//     // define um intervalo de tempo antes de remover as peças
//     setTimeout(() => {
//       // retorna a peca para o container de pecas
//       document.getElementById('drag-container').appendChild(draggable);
//       // remove a classe de remocao, para ser feito novamente a animacao inicial
//       draggable.classList.remove('removing');
//     }, 500);

//   });
//   // para cada contador de vao, chama a funcao de remover as pecas dele
//   for (let dropzoneId in contadorDePecas) {
//     if (contadores[dropzoneId]) {
//       removePeca(dropzoneId);
//     }
//   }
// }

// // zera o contador do vao 
// function removePeca(dropzoneId) {
//   contadorDePecas[dropzoneId] = 0;
//   contadores[dropzoneId].innerText = contadorDePecas[dropzoneId];
// }

const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

// Objeto para armazenar os contadores de peças de cada vão
let contadores = {};

// Inicializa os contadores de peças para cada vão
for (let i = 1; i <= 5; i++) {
  const contadorElement = document.getElementById(`contador${i}`);
  if (contadorElement) {
    contadores[`vao${i}`] = contadorElement;
    contadores[`vao${i}`].innerText = 0;
  } else {
    console.error(`Elemento contador não encontrado para o vão ${i}`);
  }
}

// Adiciona os ouvintes de eventos para cada peça
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', dragStart);
});

// Adiciona os ouvintes de eventos para cada dropzone
dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragover', dragOver);
  dropzone.addEventListener('drop', drop);
});

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  const draggableElement = document.getElementById(data);
  const dropzone = event.target.closest('.dropzone');
const vaoId = dropzone.getAttribute('data-vao-id');
const vao = document.getElementById(vaoId);

  // Verifica se o dropzone já contém 10 peças
  if (dropzone.querySelectorAll('.draggable').length >= 10) {
    alert('Este vão já contém o máximo de peças permitido.');
    return;
  }

  draggableElement.classList.remove('animate-initialize');
  draggableElement.classList.add('fadeIn');

  const dropzoneId = dropzone.id;

  console.log(contadores)
  console.log(vaoId)
  // Incrementa o contador de peças no vão atual
  contadores[vaoId].innerText++;

  if (!dropzone.contains(draggableElement)) {
    draggableElement.parentNode.removeChild(draggableElement);
    dropzone.appendChild(draggableElement);
  }
}

function resetDragDrop() {
  draggables.forEach(draggable => {
    draggable.classList.add('removing');
    setTimeout(() => {
      document.getElementById('drag-container').appendChild(draggable);
      draggable.classList.remove('removing');
    }, 500);
  });

  // Restaura os contadores de peças para cada vão
  for (let vaoId in contadores) {
    let totalCount = 0;
    const dropzonesInVao = document.querySelectorAll(`.${vaoId} .dropzone`);
    dropzonesInVao.forEach(dropzone => {
      totalCount += dropzone.querySelectorAll('.draggable').length;
    });
    contadores[vaoId].innerText = totalCount;
  }
}
