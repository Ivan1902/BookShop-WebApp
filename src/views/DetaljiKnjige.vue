<template>
    <div class="kupac">
        <div class="navigacijaKupac">
            <NavigacijaKupac></NavigacijaKupac>
        </div>
        <div class="detaljiKnjige">
            <div style="width:40%; float: left; display:flex; flex-direction: column;">
                <div>
                    <div style="width: 50%; float: left">
                        <img :src="knjiga.slika" style="width: 150px; height: 250px;">
                    </div>
                
                    <div style="width: 50%; float: right; height: 100%; ">
                        <div class="rectangle">
                            <i> {{knjiga.opis}}</i>
                        </div>
                    </div>
                </div>
                <div class="rectangle1">
                    <b>Naziv: <i>{{knjiga.naziv}}</i></b> <br/>
                    <b>Autor: <i>{{knjiga.autor}}</i></b> <br/>
                    <b>Godina izdanja: <i>{{knjiga.godina}}</i></b> <br/>
                    <b>Broj strana: <i>{{knjiga.strane}}</i></b>
                </div>
                <div style="margin-left: 20px; margin-right: 20px; vertical-align: center; height: auto">
                    <div style="float:left">
                        <input type="text" placeholder="Ocena" v-model="ocena">
                    </div>
                    <div style="float:right">
                        <button class="btn bg-primary" @click='unesiOcenu()'>Unesi ocenu</button>
                    </div>
                </div>
                <div v-if='this.porukaOcena !== "" ' style="display:flex; justify-content: center">
                    <i style="color: red">{{this.porukaOcena}}</i>
                </div>
                <div style="margin-left: 20px; margin-right: 20px; margin-top: 10px">
                    <textarea placeholder="Komentar o knjizi" style="width: 100%; height: 100px;" v-model="komentar"></textarea>
                </div>
                <div style="margin-left: 20px; margin-right: 20px; margin-top: 10px; float: left; display:flex">
                    <button class="btn bg-primary" @click='unesiKomentar()'>Unesi komentar</button>
                    <div v-if="porukaKomentar">
                    &nbsp; &nbsp; &nbsp;<i style="color: red">{{this.porukaKomentar}}</i>
                </div>
                </div>
                
                <div style="margin-left: 20px; margin-right: 20px; margin-top: 10px; float: left; display:flex">
                    <router-link to='/preporuka'><button class="btn bg-primary">Preporuci knjigu</button></router-link>
                </div>
            </div>
            <div style="width: 60%; float: right;  ">
                <h1> <b> <i> Komentari korisnika:</i></b>  </h1>
                <div style="width: 100%; display:flex; justify-content: center; margin-top: 50px;"> 
                    <table style="width: 80%">
                        <template v-for="komentarIOcena in this.komentariOcene">
                            <tr :key="komentarIOcena.kor_ime" style="height: 25px;"> 
                                <td style="background-color: gray; width: 20px;"> {{komentarIOcena.kor_ime}}</td>
                                <td style="width:80%"></td>
                                <td style="background-color: gray; width: 20px;"> {{komentarIOcena.ocena}} </td>
                            </tr>
                            <tr :key="komentarIOcena.komentar">
                                <td colspan="3" style="background-color: lightgray; height: 40px;">
                                    {{komentarIOcena.komentar}}
                                </td>
                            </tr>
                        </template>
                    
                    </table>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style>
    .kupac{
        width: 100vw;
        height: 100vh;
    }
    .detaljiKnjige{
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
        height: 250px !important;
        align-items: center;
        display:flex;
        justify-content: center;
    }
    .rectangle1{
        background-color: #f1f2f6;
        background-image: linear-gradient(315deg, #f1f2f6 0%, #c9c6c6 74%);
        height: auto;
        align-items: center;
        justify-content: center;
        margin: 20px;
    }
    tr,td{
        height: auto;
    }
    
</style>

<script>
    import NavigacijaKupac from '../components/NavigacijaKupac.vue'
    import knjige from '../data/knjige.js'
    import komentariOcene from '../data/komentariOcene.js'

    export default {
        name: "DetaljiKnjige",
        components: {
            NavigacijaKupac
        },
        data(){
            return {
                sveKnjige : [],
                knjiga: {},
                komentariOcene: [],
                komentarOcena: {},
                idKnjige : '',
                kor_ime: '',
                ocena: '',
                komentar: '',
                korisnik: {},
                porukaOcena: "",
                porukaKomentar: ""
            }
        },
        mounted(){
            if(localStorage.getItem('sveKnjige') == null){
                localStorage.setItem('sveKnjige', JSON.stringify(knjige))
            }
            this.sveKnjige = JSON.parse(localStorage.getItem('sveKnjige'))
            this.korisnik = JSON.parse(localStorage.getItem('ulogovan'))

            for(let i = 0; i < this.sveKnjige.length; i++){
                if(Number(this.$route.params.id) == this.sveKnjige[i].id){
                    this.knjiga = this.sveKnjige[i]
                    localStorage.setItem('knjiga', JSON.stringify(this.knjiga))
                    break
                }
            }
            if(localStorage.getItem('komentariOcene') == null){
                localStorage.setItem('komentariOcene', JSON.stringify(komentariOcene))
            }
            let sviKomentariOcene = JSON.parse(localStorage.getItem('komentariOcene'))
            this.komentariOcene = [ ]
            for(let i = 0; i < sviKomentariOcene.length; i++){
                if(Number(this.$route.params.id) == sviKomentariOcene[i].idKnjige){
                    this.komentariOcene.push(sviKomentariOcene[i])
                }
            }
            for(let i = 0; i < this.komentariOcene.length; i++){
                if(this.komentariOcene[i].kor_ime == this.korisnik.kor_ime){
                    this.komentarOcena = this.komentariOcene[i]
                }
            }
            if(this.komentarOcena.ocena != null){
                this.ocena = this.komentarOcena.ocena
            }
            if(this.komentarOcena.komentar != null){
                this.komentar = this.komentarOcena.komentar
            }
        },
        methods:{
            unesiOcenu(){
                if(this.ocena < 1 || this.ocena > 5 || isNaN(this.ocena || this.ocena == '')){
                    this.porukaOcena = 'Ocena mora biti broj u intervalu od 1 do 5!'
                    return;
                }
                if(this.komentarOcena.idKnjige && this.komentarOcena.kor_ime){
                    //vec imamo neku ocenu i/ili komentar
                    for(let i = 0; i < this.komentariOcene.length; i++){
                        if(this.komentariOcene[i].idKnjige == this.komentarOcena.idKnjige && this.komentariOcene[i].kor_ime == this.komentarOcena.kor_ime){
                            this.komentarOcena.ocena = this.ocena ? this.ocena : ' '
                            this.komentariOcene[i] = this.komentarOcena
                            localStorage.setItem('komentariOcene', JSON.stringify(this.komentariOcene))
                            break;
                        }
                    }
                }
                else{
                    //nemamo ocenu i/ili komentar
                    this.komentarOcena.kor_ime = this.korisnik.kor_ime
                    this.komentarOcena.idKnjige = this.knjiga.id
                    this.komentarOcena.ocena = this.ocena ? this.ocena : ' '
                    this.komentariOcene.push(this.komentarOcena)
                    localStorage.setItem('komentariOcene', JSON.stringify(this.komentariOcene))
                }
                this.porukaOcena = ''
            },
            unesiKomentar(){
                if(this.komentar == ''){
                    this.porukaKomentar = 'Polje za komentar mora biti popunjeno!'
                    return;
                }
                if(this.komentarOcena.idKnjige && this.komentarOcena.kor_ime){
                    //vec imamo neku ocenu i/ili komentar
                    for(let i = 0; i < this.komentariOcene.length; i++){
                        if(this.komentariOcene[i].idKnjige == this.komentarOcena.idKnjige && this.komentariOcene[i].kor_ime == this.komentarOcena.kor_ime){
                            
                            this.komentarOcena.komentar = this.komentar ? this.komentar : ' '
                            this.komentariOcene[i] = this.komentarOcena
                            localStorage.setItem('komentariOcene', JSON.stringify(this.komentariOcene))
                            break;
                        }
                    }
                }
                else{
                    //nemamo ocenu i/ili komentar
                    this.komentarOcena.kor_ime = this.korisnik.kor_ime
                    this.komentarOcena.idKnjige = this.knjiga.id
                    this.komentarOcena.komentar = this.komentar ? this.komentar : ' '
                    this.komentariOcene.push(this.komentarOcena)
                    localStorage.setItem('komentariOcene', JSON.stringify(this.komentariOcene))
                }
                this.porukaKomentar = ''
            },
            preporuci(){
                //this.$router.push('preporuka')
            }
        }
  }
</script>