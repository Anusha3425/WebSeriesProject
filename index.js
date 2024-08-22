
function fetchSeries(){
    fetch(`http://localhost:3000/series`)
    .then(resp=>resp.json())
    .then(async data => {
        console.log(data,'data one'); 
        if(data){
            showCatalogue(data)

        }
    })
   
}

const seriesCollection=document.getElementById("series-collection");
async function showCatalogue(series){
    seriesCollection.innerHTML=""
    console.log(series,'test one')
let data = series
data?.forEach((i)=>{
        seriesCollection.innerHTML+=`
        <div id="card" data-id=${i.data}>
        <h2>${i.name}</h2>
        <img src="${i.image}"
        </div>`
    });
    console.log("Success")
}

fetchSeries();

const addSeries=document.querySelector(".add-series");
addSeries.addEventListener('submit', function(event){
    fetch('http://localhost:3000/series', {
        method:'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            name: `${event.target.name.value}`,
            image: `${event.target.image.value}`
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('response was not ok');
        }
        return res.json();
    })
    .then(data => {
        showCatalogue(data);
    })
});

const updateseries=document.querySelector(".update-series")
updateseries.addEventListener('submit', function(event){
    
    fetch('http://localhost:3000/series/58f0', {
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            name:event.target.name.value,
            image:event.target.image.value
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('response was not ok');
        }
        return res.json();
    })
    .then(data => {
        showCatalogue(data);
    })

})

const deleteseries=document.querySelector('.delete-series')
deleteseries.addEventListener('submit', function(){
    fetch('http://localhost:3000/series/58f0', {
        method: 'DELETE'
    })
})