<template>
    <div class="kupac">
        <div class="navigacijaKupac">
            <NavigacijaKupac></NavigacijaKupac>
        </div>
        <div class="knjigeNaPromociji">
            <h1>Knjige na promociji</h1>
            <div class='col-sm-4' v-for="knjiga in this.promocija" :key="knjiga.id" style="padding: 10px; display:flex; align-items: center;">
                
                <div style="width: 50%; float: left">
                    <router-link :to='/detaljiKnjige/+knjiga.id'>
                    <img  :src="knjiga.slika" style="width: 150px; height: 250px;">
                    </router-link>
                </div>
                
                <div style="width: 50%; float: right; height: 100%; ">
                    <router-link :to='/detaljiKnjige/+knjiga.id'>
                    <div class="rectangle">
                        <b style="color: black">
                        Naziv: <i>{{knjiga.naziv}}</i> <br/><br/>
                        Autor: <i>{{knjiga.autor}}</i>
                        </b>
                    </div>
                    </router-link>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavigacijaKupac from '../components/NavigacijaKupac.vue'
    import promocija from '../data/promocija.js'

    export default {
        name: "KupacDostupne",
        components: {
            NavigacijaKupac
        },
        data(){
            return {
                promocija : [ ]
            }
        },
        mounted(){
            if(localStorage.getItem('promocija') == null){
                localStorage.setItem('promocija', JSON.stringify(promocija))
            }
            this.promocija = JSON.parse(localStorage.getItem('promocija'))
        }
  }
</script>

<style>
    .kupac{
        width: 100vw;
        height: 100vh;
    }
    .knjigeNaPromociji{
        background-image: url("../assets/pozadina.png");
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 10vh;
    }
    .navigacijaKupac{
        height: 10vh;
        width: 100vw;
        position: absolute;
        top:0;
        left:0;
        
    }
    .rectangle{
        background-color: #f1f2f6;
        background-image: linear-gradient(315deg, #f1f2f6 0%, #c9c6c6 74%);
        height: 120px;
        align-items: center;
        display:flex;
        justify-content: center;
    }
</style>