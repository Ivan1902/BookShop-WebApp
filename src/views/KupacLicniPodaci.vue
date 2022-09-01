<template>
    <div class="kupac">
        <div class="navigacijaKupac">
            <NavigacijaKupac></NavigacijaKupac>
        </div>
        <div class="dostupneKnjige" >
            <h1>Licni Podaci</h1>
            <br/><br/>
            <div class="licniPodaci">
            <table class="licniPodaciTabela" style="background-color: #D8D8D8; width: 30%">
                <br/>
                <tr>
                    <td> <b><i>Ime:</i></b> </td>
                    <td><input type="text" placeholder="Ime" v-model="korisnik.ime" style="width: 90%; "></td>
                </tr>
                <br/>
                <tr>
                    <td><b><i>Prezime:</i></b> </td>
                    <td><input type="text" placeholder="Prezime" v-model="korisnik.prezime" style="width: 90%; "> </td>
                </tr>
                <br/>
                <tr>
                    <td><b><i>&nbsp; Kontakt telefon: &nbsp;</i></b> </td>
                    <td><input type="text" placeholder="Kontakt telefon" v-model="korisnik.telefon" style="width: 90%; "></td>
                </tr>
                <br/>
                <tr>
                    <td><b><i>Adresa:</i></b></td>
                    <td><textarea placeholder="Adresa" v-model="korisnik.adresa" style="width: 90%; "></textarea></td>
                </tr>
                <br/>
                <tr>
                    <td colspan="2">
                        <button class="btn bg-primary" @click='potvrdi()'>Potvrdi</button>
                    </td>
                </tr>
                <br/>
                <tr v-if="poruka !== '' ">
                    <td colspan="2">
                        <i style="color: red">{{poruka}}</i>
                    </td>
                </tr>
            </table>
            </div>
        </div>
    </div>
</template>

<script>
    import NavigacijaKupac from '../components/NavigacijaKupac.vue'

    export default {
        name: "KupacLicniPodaci",
        components: {
            NavigacijaKupac
        },
        data() {
            return {
                korisnik: {},
                poruka : ''
            }
        },
        mounted() {
            this.korisnik = JSON.parse(localStorage.getItem('ulogovan'))
        },
        methods: {
            potvrdi(){
            if(this.korisnik.ime == '' || this.korisnik.prezime == '' || this.korisnik.telefon == '' || this.korisnik.adresa == '' ||
            this.korisnik.ime == null || this.korisnik.prezime == null || this.korisnik.telefon == null || this.korisnik.adresa == null){
                this.poruka = 'Sva polja moraju biti popunjena!'
                return
            }
            if(this.korisnik.ime.charAt(0) !== this.korisnik.ime.charAt(0).toUpperCase()){
                this.poruka = 'Prvo slovo imena mora biti veliko slovo!'
                return
            }
            if(this.korisnik.prezime.charAt(0) !== this.korisnik.prezime.charAt(0).toUpperCase()){
                this.poruka = 'Prvo slovo prezimena mora biti veliko slovo!'
                return
            }
            if(/\d/.test(this.korisnik.ime)){
                this.poruka = 'Ime ne sme da sadrzi broj!'
                return
            }
            if(/\d/.test(this.korisnik.prezime)){
                this.poruka = 'Prezime ne sme da sadrzi broj!'
                return
            }
            if(isNaN(this.korisnik.telefon)){
                this.poruka = 'Kontak telefon nije broj!'
                return
            }
            localStorage.setItem('ulogovan', JSON.stringify(this.korisnik))
            let sviKorisnici = JSON.parse(localStorage.getItem('sviKorisnici'))
            for(let i = 0; i < sviKorisnici.length; i++){
                if(sviKorisnici[i].id == this.korisnik.id){
                    sviKorisnici[i] = this.korisnik;
                    localStorage.setItem('sviKorisnici', JSON.stringify(sviKorisnici))
                    this.poruka = 'Uspesno azurirano!'
                    break
                }
            }
        }
        }
        
  }
</script>

<style>
    .kupac{
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
    .navigacijaKupac{
        height: 10vh;
        width: 100vw;
        position: absolute;
        top:0;
        left:0;
    }
    .licniPodaci{
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
    }
</style>