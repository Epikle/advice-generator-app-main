const adviceParagraph = document.getElementById('advice');
const adviceNumber = document.getElementById('number');
const adviceButton = document.getElementById('roll');

const getNewAdvice = async () => {
  adviceNumber.classList.remove('loaded');
  adviceParagraph.classList.remove('loaded');

  await fetch('https://api.adviceslip.com/advice')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then((data) => {
      adviceNumber.innerHTML = data.slip.id;
      adviceParagraph.innerHTML = '"' + data.slip.advice + '"';
    })
    .catch((error) => {
      adviceNumber.innerHTML = 'ERROR';
      adviceParagraph.innerHTML =
        'There has been a problem with your fetch operation';
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    });
  adviceNumber.classList.add('loaded');
  adviceParagraph.classList.add('loaded');
};

adviceButton.addEventListener('click', (e) => {
  e.preventDefault();
  getNewAdvice();
});

getNewAdvice();
