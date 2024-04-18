// Seleciona todos as pecas com a classe de "draggable"
const draggables = document.querySelectorAll('.draggable');

// Seleciona todas os vaos com a classe de "dropzone"
const dropzones = document.querySelectorAll('.dropzone');

// Seleciona os contadores de cada vao
const contador1 = document.getElementById('contador1');
const contador2 = document.getElementById('contador2');

// Objetos que serão usados para relacionar os contadores com as dropzones
let contadores = {
  dropzone1: contador1,
  dropzone2: contador2
};
let contadorDePecas = {
  dropzone1: 0,
  dropzone2: 0
};

// Para cada peca das listas de pecas adiciona o evento de "segurar" a peca
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', dragStart);
});

// Para cada vao da lista de vaos adiciona os eventos de "posicionar acima" e "soltar" a peca na zona
dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragover', dragOver);
  dropzone.addEventListener('drop', drop);
});

// Ao segurar a peca, o id dela é armazenado no dataTransfer
function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

// Ao segurar a peca acima do vao, previne que a peca faca o comportamento padrao de posicionar a peca acima do vao
function dragOver(event) {
  event.preventDefault();
}

// Ao soltar a peca no vao, ela é posicionada dentro dele e a quantidade de pecas do vao é atualizado
function drop(event) {
  event.preventDefault();
  // puxa o id da peca setado no dataTransfer
  const data = event.dataTransfer.getData('text/plain');
  // puxa a peca com base no id dela
  const draggableElement = document.getElementById(data);
  // puxa o vao que a peca foi solta
  const dropzone = event.target;
  
  // remove a classe de animacao inicial da peca
  draggableElement.classList.remove('animate-initialize')
  // adiciona a classe de animacao de entrada da peca no vao
  draggableElement.classList.add('fadeIn')

  // puxa o id do vao
  const dropzoneId = dropzone.id;
  // pega o id do container anterior da peca
  const previousDropzoneId = draggableElement.parentElement.id;

  // oncrementa o contador de pecas do vao em que a peca foi solta
  if (dropzoneId !== previousDropzoneId) {
    contadorDePecas[dropzoneId]++;
    if (contadores[dropzoneId]) {
      contadores[dropzoneId].innerText = contadorDePecas[dropzoneId];
    }
    
    // decrementa o contador de pecas do vao anterior da peca (caso tenha sido retirada de um vao e realocado em outro)
    if (contadores[previousDropzoneId]) {
      contadorDePecas[previousDropzoneId]--;
      contadores[previousDropzoneId].innerText = contadorDePecas[previousDropzoneId];
    }
  }

  // move a peca para o novo vao dela se ela nao estiver dentro dele
  if (!dropzone.contains(draggableElement)) {
    draggableElement.parentNode.removeChild(draggableElement);
    dropzone.appendChild(draggableElement);
  }
}

// Reseta todas as pecas, vaos e estilos
function resetDragDrop() {
  draggables.forEach(draggable => {
    // adiciona uma classe para iniciar a animação de remoção
    draggable.classList.add('removing');
    // define um intervalo de tempo antes de remover as peças
    setTimeout(() => {
      // retorna a peca para o container de pecas
      document.getElementById('drag-container').appendChild(draggable);
      // remove a classe de remocao, para ser feito novamente a animacao inicial
      draggable.classList.remove('removing');
    }, 500);

  });
  // para cada contador de vao, chama a funcao de remover as pecas dele
  for (let dropzoneId in contadorDePecas) {
    if (contadores[dropzoneId]) {
      removePeca(dropzoneId);
    }
  }
}

// zera o contador do vao 
function removePeca(dropzoneId) {
  contadorDePecas[dropzoneId] = 0;
  contadores[dropzoneId].innerText = contadorDePecas[dropzoneId];
}