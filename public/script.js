document.addEventListener('DOMContentLoaded', () => {
    const getJokeBtn = document.getElementById('getJokeBtn');
    const jokeText = document.getElementById('jokeText');
    const jokeType = document.getElementById('jokeType');
    const addJokeBtn = document.getElementById('addJokeBtn');
    const searchJokeBtn = document.getElementById('searchJokeBtn');
    const categoryCountBtn = document.getElementById('categoryCountBtn');
    const jokesByRatingBtn = document.getElementById('jokesByRatingBtn');

    getJokeBtn.addEventListener('click', getJoke);
    addJokeBtn.addEventListener('click', addJoke);
    searchJokeBtn.addEventListener('click', searchJoke);
    categoryCountBtn.addEventListener('click', getCategoryCount);
    jokesByRatingBtn.addEventListener('click', getJokesByRating);

    const modals = document.querySelectorAll('.modal');
    const modalButtons = document.querySelectorAll('[id$="ModalBtn"]');
    const closeButtons = document.querySelectorAll('.close');

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.id.replace('ModalBtn', 'Modal');
            document.getElementById(modalId).style.display = 'block';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    async function getJoke() {
        const type = jokeType.value;
        try {
            const response = await fetch(`/joke/${type}`);
            const data = await response.json();
            if (response.ok) {
                jokeText.textContent = data.joke;
            } else {
                throw new Error(data.message || 'Error al obtener el chiste');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function addJoke() {
        const jokeInput = document.getElementById('jokeInput');
        const authorInput = document.getElementById('authorInput');
        const ratingInput = document.getElementById('ratingInput');
        const categoryInput = document.getElementById('categoryInput');

        if (!jokeInput.value.trim()) {
            alert('El texto del chiste es obligatorio.');
            return;
        }

        if (!ratingInput.value) {
            alert('El puntaje del chiste es obligatorio.');
            return;
        }

        if (!categoryInput.value) {
            alert('La categoría del chiste es obligatoria.');
            return;
        }

        const jokeData = {
            text: jokeInput.value,
            author: authorInput.value,
            rating: parseInt(ratingInput.value),
            category: categoryInput.value
        };

        try {
            const response = await fetch('/api/jokes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jokeData),
            });
            const data = await response.json();
            if (response.ok) {
                alert(`Chiste agregado con ID: ${data.id}`);
                jokeInput.value = '';
                authorInput.value = '';
                ratingInput.value = '';
                categoryInput.value = '';
            } else {
                throw new Error(data.message || 'Error al agregar el chiste');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function searchJoke() {
        const jokeIdInput = document.getElementById('jokeIdInput');
        const searchedJokeContainer = document.getElementById('searchedJokeContainer');

        if (!jokeIdInput.value.trim()) {
            alert('El ID del chiste es obligatorio.');
            return;
        }

        try {
            const response = await fetch(`/api/jokes/${jokeIdInput.value}`);
            const data = await response.json();
            if (response.ok) {
                searchedJokeContainer.innerHTML = `
                    <p><strong>Texto:</strong> ${data.text}</p>
                    <p><strong>Autor:</strong> ${data.author}</p>
                    <p><strong>Puntaje:</strong> ${data.rating}</p>
                    <p><strong>Categoría:</strong> ${data.category}</p>
                    <button onclick="updateJoke('${data._id}')">Actualizar</button>
                    <button onclick="deleteJoke('${data._id}')">Eliminar</button>
                `;
            } else {
                throw new Error(data.message || 'Error al buscar el chiste');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function getCategoryCount() {
        const categoryCountInput = document.getElementById('categoryCountInput');
        const categoryCountText = document.getElementById('categoryCountText');

        if (!categoryCountInput.value) {
            alert('La categoría es obligatoria.');
            return;
        }

        try {
            const response = await fetch(`/api/jokes/category/${categoryCountInput.value}`);
            const data = await response.json();
            if (response.ok) {
                categoryCountText.textContent = `Hay ${data.count} chistes en la categoría ${categoryCountInput.value}`;
            } else {
                throw new Error(data.message || 'Error al obtener el conteo de chistes');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function getJokesByRating() {
        const ratingSearchInput = document.getElementById('ratingSearchInput');
        const jokesByRatingList = document.getElementById('jokesByRatingList');

        if (!ratingSearchInput.value) {
            alert('El puntaje es obligatorio.');
            return;
        }

        try {
            const response = await fetch(`/jokes/score/${ratingSearchInput.value}`);
            const data = await response.json();
            if (response.ok) {
                jokesByRatingList.innerHTML = data.map(joke => `<li>${joke.text}</li>`).join('');
            } else {
                throw new Error(data.message || 'Error al obtener los chistes por puntaje');
            }
        } catch (error) {
            alert(error.message);
        }
    }
});

async function updateJoke(id) {
    const newText = prompt("Ingrese el nuevo texto del chiste:");
    if (newText) {
        try {
            const response = await fetch(`/api/jokes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newText }),
            });
            if (response.ok) {
                alert('Chiste actualizado correctamente');
                document.getElementById('searchJokeBtn').click();
            } else {
                throw new Error('Error al actualizar el chiste');
            }
        } catch (error) {
            alert(error.message);
        }
    }
}

async function deleteJoke(id) {
    if (confirm("¿Está seguro de que desea eliminar este chiste?")) {
        try {
            const response = await fetch(`/api/jokes/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Chiste eliminado correctamente');
                document.getElementById('searchedJokeContainer').innerHTML = '';
                document.getElementById('jokeIdInput').value = '';
            } else {
                throw new Error('Error al eliminar el chiste');
            }
        } catch (error) {
            alert(error.message);
        }
    }
}
