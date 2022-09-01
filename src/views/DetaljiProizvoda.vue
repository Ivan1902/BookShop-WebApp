<template>
    <div id='detalji'>
        <h2>{{izabranProizvod.naziv}}</h2>
        <p>{{izabranProizvod.opis}}</p>
        <b>{{izabranProizvod.ocena}}</b>
    </div>
</template>

<script>
    import proizvodi from '../data/proizvodi.js'
    export default {
        name: 'DetaljiProizvoda',
        data(){
            return {
                sviProizvodi : proizvodi,
                izabranProizvod : {}
            }
        },
        mounted(){
            this.sviProizvodi = JSON.parse(localStorage.getItem('proizvodi'))
            let id = Number(this.$route.params.id);
            let proizvod = this.sviProizvodi.find(pr=>pr.id==id);
            this.izabranProizvod = proizvod;
        }
    }
</script>