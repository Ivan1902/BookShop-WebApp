<template>
    <div>
        <div class="navigacijaKupac">
            <NavigacijaKupac></NavigacijaKupac>
        </div>
        <div class="kupacPreporuka" >
            <div style="display: flex; justify-content: center">
                <table style="width: 60%; margin-top: 80px; border: 1px solid black;">
                    <tr style="height: 20px; background-color:gray; color:black">
                        <th style="text-align: center;border: 1px solid black; ">Ime i prezime</th>
                        <th style="text-align: center;border: 1px solid black;">Korisnicko ime</th>
                    </tr>
                    <tr v-for="user in korisniciZaPreporuku" :key="user.id" style="background-color: silver" > 
                        <td style="border: 1px solid black;"> {{user.ime}}  {{user.prezime}} </td>
                        <td style="border: 1px solid black;"> {{user.kor_ime}} </td>
                        <td style="border: 1px solid black;" > <input type="checkbox"  :id="user.id" v-model="odabraniKorisnici" :value="user.kor_ime"   number> Odaberi </td>
                    </tr>
                </table>
            </div>
            <br/><br/>
            <div style="display: flex; justify-content: center">
                <button class="btn bg-primary" @click='preporuci()'> Preporuci odabranim korisnicima</button> 
            </div>
            <div style="display: flex; justify-content: center" v-if="poruka">
                <i style="color: red"><b>{{poruka}}</b></i>
            </div>
        </div>
    </div>
</template>


<script>
    import NavigacijaKupac from '../components/NavigacijaKupac.vue'
    import preporucene from '../data/preporucene.js'
    import korisnici from '../data/korisnici.js'

    export default {
        name: "KupacPreporuka",
        components: {
            NavigacijaKupac
        },
        data(){
            return {
                sviKorisnici: [],
                odabraniKorisnici: [],
                knjiga : {},
                korisnik: {},
                preporucene: [],
                poruka: '',
                korisniciZaPreporuku: []
            }
        },
        mounted(){
            if(localStorage.getItem('sviKorisnici') == null){
                localStorage.setItem('sviKorisnici', JSON.stringify(korisnici))
            }
            this.sviKorisnici = JSON.parse(localStorage.getItem('sviKorisnici'))
            this.korisnik = JSON.parse(localStorage.getItem('ulogovan'))
            for(let i=0; i < this.sviKorisnici.length; i++){
                if(this.sviKorisnici[i].kor_ime != this.korisnik.kor_ime){
                    this.korisniciZaPreporuku.push(this.sviKorisnici[i])
                }
            }
            if(localStorage.getItem('preporucene') == null){
                localStorage.setItem('preporucene', JSON.stringify(preporucene))
            }
            this.preporucene = JSON.parse(localStorage.getItem('preporucene'))
            this.knjiga = JSON.parse(localStorage.getItem('knjiga'))
        },
        methods: {
            preporuci(){
                if(this.odabraniKorisnici.length == 0){
                    this.poruka = 'Morate odabrati barem jednog korisnika!'
                    return
                }
                let preporucenaKnjiga = null
                for(let i = 0; i < this.preporucene.length; i++){
                    if(this.preporucene[i].id == this.knjiga.id){
                        preporucenaKnjiga = this.preporucene[i]
                        break
                    }
                }
                if(preporucenaKnjiga !== null){
                    // nekad nekome preporucena
                    for(let i = 0; i < this.odabraniKorisnici.length; i++){
                        if(preporucenaKnjiga.za.indexOf(this.odabraniKorisnici[i]) === -1){
                            preporucenaKnjiga.za.push(this.odabraniKorisnici[i])
                        }
                    }
                    for(let i = 0; i < this.preporucene.length; i++){
                        if(this.preporucene[i].id == this.knjiga.id){
                            this.preporucene[i] = preporucenaKnjiga
                            break
                        }
                    }
                    localStorage.setItem('preporucene', JSON.stringify(this.preporucene))
                }
                else {
                    // nikad nikome preporucena
                    preporucenaKnjiga = {
                        id: this.knjiga.id,
                        slika: this.knjiga.slika,
                        naziv: this.knjiga.naziv,
                        autor: this.knjiga.autor,
                        godina: this.knjiga.godina,
                        opis: this.knjiga.opis,
                        strane: this.knjiga.strane,
                        za: []
                    }
                    for(let i = 0; i < this.odabraniKorisnici.length; i++){
                        preporucenaKnjiga.za.push(this.odabraniKorisnici[i])
                    }
                    this.preporucene.push(preporucenaKnjiga)
                    localStorage.setItem('preporucene', JSON.stringify(this.preporucene))
                }
                this.poruka = 'Uspesno preporuceno!'
                this.odabraniKorisnici = []
            }
        }
  }
</script>

<style>
    .navigacijaKupac{
        height: 10vh;
        width: 100vw;
        position: absolute;
        top:0;
        left:0;
        
    }
    .kupacPreporuka{
        background-image: url("../assets/pozadina.png");
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 10vh;
    }
</style>