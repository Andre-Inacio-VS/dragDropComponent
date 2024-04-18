const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');
const contador1 = document.getElementById('contador1');
const contador2 = document.getElementById('contador2');

let contadores = {
  dropzone1: contador1,
  dropzone2: contador2
};

let contadorDePecas = {
  dropzone1: 0,
  dropzone2: 0
};

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', dragStart);
});

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
  const dropzone = event.target;
  
  draggableElement.classList.remove('animate-initialize')
  draggableElement.classList.add('fadeIn')

  const dropzoneId = dropzone.id;
  const previousDropzoneId = draggableElement.parentElement.id;

  if (dropzoneId !== previousDropzoneId) {
    contadorDePecas[dropzoneId]++;
    if (contadores[dropzoneId]) {
      contadores[dropzoneId].innerText = contadorDePecas[dropzoneId];
    }
    
    if (contadores[previousDropzoneId]) {
      contadorDePecas[previousDropzoneId]--;
      contadores[previousDropzoneId].innerText = contadorDePecas[previousDropzoneId];
    }
  }

  if (!dropzone.contains(draggableElement)) {
    draggableElement.parentNode.removeChild(draggableElement);
    dropzone.appendChild(draggableElement);
  }
}

function resetDragDrop() {
  draggables.forEach(draggable => {
    // Adiciona uma classe para iniciar a animação de remoção
    draggable.classList.add('removing');
    // Define um intervalo de tempo antes de remover as peças
    setTimeout(() => {
      // Remove a peça do seu contêiner
      document.getElementById('drag-container').appendChild(draggable);
      draggable.classList.remove('removing');
    }, 500); // 500ms, deve corresponder à duração da animação definida na CSS

  });
  for (let dropzoneId in contadorDePecas) {
    if (contadores[dropzoneId]) {
      removePeca(dropzoneId);
    }
  }
}

function removePeca(dropzoneId) {
  contadorDePecas[dropzoneId] = 0;
  contadores[dropzoneId].innerText = contadorDePecas[dropzoneId];
}

function removePeca(dropzoneId) {
  contadorDePecas[dropzoneId] = 0;
  contadores[dropzoneId].innerText = contadorDePecas[dropzoneId];
}