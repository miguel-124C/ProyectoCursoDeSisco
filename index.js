const contentCards = document.querySelector('.content-cards');
const select = document.getElementById('filter-by');
const search = document.getElementById('search');
const filterStatus = document.getElementById('status-filter');
const filterGender = document.getElementById('gender-filter');
const modal = document.querySelector('.modal');
const listSearch = document.querySelector('.listSearch');

let query = 'name';
let parameters = '';

function showStatusGender(query){
    search.setAttribute('disabled','true');
    if (query == 'status') {
        filterStatus.style.display = 'flex';
        filterGender.style.display = 'none';
    }else{
        filterStatus.style.display = 'none';
        filterGender.style.display = 'flex';
    }
}

function ocultarStatusGender(){
    search.removeAttribute('disabled');
    filterStatus.style.display = 'none';
    filterGender.style.display = 'none';
}

async function fetchCharacter(query,parameters,callback){
    try {
        if (!parameters) {
            listSearch.innerHTML = '';
            contentCards.innerHTML = '';
            return;
        }
        const result = await     fetch(`https://rickandmortyapi.com/api/character?${query}=${parameters}`)
        const data = await result.json();
        callback(data.results);
    } catch (error) {
        console.log('nada');
    }
}

const showData=(result)=>{
    contentCards.innerHTML = '';
    for (let i = 0; i < result.length; i++) {
        const data = result[i];
        const cards = document.createElement('div');
        cards.classList.add('cards-personajes');
        cards.innerHTML = `        
        <div class="contain-img">
        <img src="${data.image}" alt="" class="img-personaje">
        </div>
        <div class="contain-dataPersonaje">
        <h3 class="name">
        ${data.name}<br>
        <span class="status-species">${data.status} - ${data.species}</span>
        </h3>
        <div class="last-location">
        <span class="first-last-ubication">ultima ubicaion conocida:</span><br>
        ${data.location.name}
        </div>
        <div class="first-aparicion">
        <span class="first-last-ubication">Visto por primera vez en:</span><br>
                ${data.name}
            </div>
        </div>`
        cards.addEventListener('click',()=>{viewCharacter(data)})
        contentCards.appendChild(cards)
    }
}
        

function viewCharacter(data){
    document.body.style.overflow = 'hidden'
    modal.style.display = 'flex';
    modal.innerHTML = `        
    <div class="contain-img">
    <img src="${data.image}" alt="" class="img-personaje">
    </div>
    <div class="contain-dataPersonaje">
    <h3 class="name">
    ${data.name}<br>
    <span class="status-species">${data.status} - ${data.species}</span>
    </h3>
    <div class="last-location">
    <span class="first-last-ubication">ultima ubicaion conocida:</span><br>
    ${data.location.name}
    </div>
    <div class="first-aparicion">
    <span class="first-last-ubication">Visto por primera vez en:</span><br>
            ${data.name}
        </div>
    </div>
    <button class="exit">Volver</button>`

    document.querySelector('.exit').addEventListener('click',()=>{
        document.body.style.overflow = 'auto'
        modal.style.display = 'none';
        modal.innerHTML = '';
    })

}

function showAutoComplete(result){
    listSearch.innerHTML = '';
    for (let i = 0; i < result.length; i++) {
        const data = result[i];
        const cards = document.createElement('div');
        cards.classList.add('item-search');
        cards.innerHTML = `        
        <div class="contain-img-list">
            <img src="${data.image}" alt="" class="img-personaje-list">
        </div>
        <div class="contain-dataPersonaje-list">
            <h3 class="name">
                ${data.name}
                <span>${data.status} - ${data.species}</span>
            </h3>
            <div class="last-location-list">
                <span>ultima ubicaion conocida:</span><br>
                ${data.location.name}
            </div>
            <div class="first-aparicion-list">
                <span class="first-last-ubication-list">Visto por primera vez en:</span><br>
                    ${data.name}
            </div>
        </div>`
        cards.addEventListener('click',()=>{viewCharacter(data)})
        listSearch.appendChild(cards);
    }
}

select.addEventListener('change',()=>{
    listSearch.innerHTML = '';
    search.value = '';
    contentCards.innerHTML = '';
    query = select.value;
    if (query !== 'name') {
        showStatusGender(query);
        parameters = (query == 'status')? 'alive' : (query == 'gender') ? 'male' : '';
        fetchCharacter(query,parameters,showData);
    }else{
        ocultarStatusGender();
    }
});

search.addEventListener('keyup',(e)=>{
    fetchCharacter(query,search.value,showAutoComplete)
});

filterStatus.addEventListener('change',()=>{
    parameters = filterStatus.value;
    fetchCharacter(query,parameters,showData)
});

filterGender.addEventListener('change',()=>{
    parameters = filterGender.value;
    fetchCharacter(query,parameters,showData)
});