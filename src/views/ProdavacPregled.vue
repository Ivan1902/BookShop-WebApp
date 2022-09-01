<template>
    <div class="prodavac">
        <div class="navigacijaProdavac">
            <NavigacijaProdavac></NavigacijaProdavac>
        </div>
        <div class="dostupneKnjige">
            <div style="margin-top: 10px">
                <input type="text" placeholder="Naziv knjige" v-model="nazivKnjige"> &nbsp; &nbsp; &nbsp;
                <input type="text" placeholder="Autor knjige" v-model="autorKnjige"> <br/> <br/>
                <button class="btn bg-primary" @click='pretrazi()'>Pretrazi</button>
            </div>
            <div class='col-sm-4' v-for="knjiga in this.prikazaneKnjige" :key="knjiga.id" style="padding: 10px; display:flex; align-items: center;">
                
                <div style="width: 50%; float: left">
                    <img :src="knjiga.slika" style="width: 150px; height: 250px;">
                </div>
                
                <div style="width: 50%; float: right; height: 100%; ">
                    <div class="rectangle">
                        <b style="color: black">
                        Naziv: <i>{{knjiga.naziv}}</i> <br/> <br/>
                        Autor: <i>{{knjiga.autor}}</i> <br/> <br/>
                        <button class="btn bg-danger" v-if="naPromociji(knjiga.id) == true" @click="skini(knjiga.id)">Skini sa promocije</button>
                        <button class="btn bg-primary" v-if="naPromociji(knjiga.id) == false" @click="stavi(knjiga.id)">Stavi na promociju</button>
                        </b>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavigacijaProdavac from '../components/NavigacijaProdavac.vue'
    import knjige from '../data/knjige.js'
    import promocija from '../data/promocija.js'

    export default {
        name: "KupacDostupne",
        components: {
            NavigacijaProdavac
        },
        data(){
            return {
                sveKnjige : [ ],
                prikazaneKnjige: [ ],
                nazivKnjige: '',
                autorKnjige: '',
                promocija : [ ]
            }
        },
        mounted(){
            if(localStorage.getItem('sveKnjige') == null){
                localStorage.setItem('sveKnjige', JSON.stringify(knjige))
            }
            if(localStorage.getItem('promocija') == null){
                localStorage.setItem('promocija', JSON.stringify(promocija))
            }
            this.sveKnjige = JSON.parse(localStorage.getItem('sveKnjige'))
            this.prikazaneKnjige = this.sveKnjige
            this.promocija = JSON.parse(localStorage.getItem('promocija'))
        },
        methods: {
            pretrazi(){
                this.prikazaneKnjige = this.sveKnjige
                if(this.nazivKnjige == '' && this.autorKnjige == ''){
                    return
                }
                if(this.nazivKnjige){
                    this.prikazaneKnjige = this.prikazaneKnjige.filter(x => x.naziv.toLowerCase().includes(this.nazivKnjige.toLowerCase()))
                }
                if(this.autorKnjige){
                    this.prikazaneKnjige = this.prikazaneKnjige.filter(x => x.autor.toLowerCase().includes(this.autorKnjige.toLowerCase()))
                }
            },
            naPromociji(id){
                for(let i = 0; i < this.promocija.length; i++){
                    if(this.promocija[i].id == id){
                        return true
                    }
                }
                return false
            },
            skini(id){
                let index = -1
                for(let i = 0; i < this.promocija.length; i++){
                    if(this.promocija[i].id == id){
                        index = i
                    }
                }
                if(index != -1){
                    this.promocija.splice(index, 1)
                    localStorage.setItem('promocija', JSON.stringify(this.promocija))
                }
            },
            stavi(id){
                let knjiga = { }
                for(let i = 0; i < this.sveKnjige.length; i++){
                    if(this.sveKnjige[i].id == id){
                        knjiga = this.sveKnjige[i]
                    }
                }
                if(knjiga){
                    let knjigaZaPromociju = {
                        id: knjiga.id,
                        slika: knjiga.slika,
                        naziv: knjiga.naziv,
                        autor: knjiga.autor,
                        godina: knjiga.godina,
                        opis: knjiga.opis,
                        strane: knjiga.strane
                    }
                    this.promocija.push(knjigaZaPromociju)
                    localStorage.setItem('promocija', JSON.stringify(this.promocija))
                }
                
            }
        }
  }
</script>

<style>
    .prodavac{
        width: 100vw;
        height: 100vh;
    }
    .dostupneKnjige{
        background-image: url("../assets/pozadina.png");
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 10vh;
    }
    .navigacijaProdavac{
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