'use strict';

const apiKey = '41Ap8BBPuKfQeclpjj3Vv3DpEX0JAFFdG4h92EcxL7RIczK0wuoQ6b5v'
const container = $('#imagem-container')

async function carregarFotos() {
    if (!container.length) {
        console.error('Elemento #imagem-container não encontrado.')
        return
    }

    const apiUrl = `https://api.pexels.com/v1/search?query=pizza peperoni&per_page=10`

    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': apiKey,
            }
        })
        .then(response => response.json())
        .then(data => {
            container.html('');

            const photos = data.photos;

            photos.forEach(photo => {
                const imgcontainer = $('<div class="imgContainer"></div>')
                const imgElement = $('<img>')
                imgElement.attr('src', photo.src.medium)
                imgElement.attr('alt', photo.photographer)
                imgcontainer.append(imgElement)
                container.append(imgcontainer)
            });

            container.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
            })
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error)
        })
}

$(document).ready(function() {
    carregarFotos()
})