<template>
    <div id='proizvod'>
        <div class="card">
            <img class="card-img-top" :src="'/img/img' + pr.id + '.png'">
            <div class="card-body">
                <h4>{{pr.naziv}}</h4>
                <h6>{{pr.cena}}</h6>
                <p>{{pr.opis}}</p>
                <small>{{pr.datum}}</small>
            </div>
        </div>
    </div>
</template>

<style>
    img{
        width: 30%;
    }
    .card-img-top{
        height: 500px;
        width: 500px;
    }
</style>

<script>
    export default {
        name : "Proizvod",
        props: [
            'pr'
        ]
    }
</script>