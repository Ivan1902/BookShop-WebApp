<template>
    <div class="kupac">
        <div class="navigacijaKupac">
            <NavigacijaKupac></NavigacijaKupac>
        </div>
        <div class="dostupneKnjige" >
            <h1>Izmena lozinke</h1>
            <br/><br/>
            <div class="licniPodaci">
            <table class="licniPodaciTabela" style="background-color: #D8D8D8; width: 30%">
                <br/>
                <tr>
                    <td> <b><i>Stara lozinka:</i></b> </td>
                    <td><input type="password" placeholder="Stara lozinka" v-model="staraLozinka" style="width: 90%; "></td>
                </tr>
                <br/>
                <tr>
                    <td><b><i>Nova lozinka:</i></b> </td>
                    <td><input type="password" placeholder="Nova lozinka" v-model="novaLozinka" style="width: 90%; "> </td>
                </tr>
                <br/>
                <tr>
                    <td><b><i>&nbsp; Nova lozinka (ponovo): &nbsp;</i></b> </td>
                    <td><input type="password" placeholder="Nova lozinka" v-model="novaLozinkaPonovo" style="width: 90%; "></td>
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
        name: "KupacLozinka",
        components: {
            NavigacijaKupac
        },
        data() {
            return {
                korisnik: {},
                poruka : '',
                staraLozinka: '',
                novaLozinka: '',
                novaLozinkaPonovo: ''
            }
        },
        mounted() {
            this.korisnik = JSON.parse(localStorage.getItem('ulogovan'))
        },
        methods: {
            potvrdi(){
                if(this.staraLozinka == '' || this.novaLozinka == '' || this.novaLozinkaPonovo == ''){
                    this.poruka = 'Sva polja moraju biti popunjena!'
                    return
                }
                if(this.staraLozinka != this.korisnik.lozinka){
                    this.poruka = 'Pogresna stara lozinka!'
                    return
                }
                if(this.novaLozinka != this.novaLozinkaPonovo){
                    this.poruka = 'Nove lozinke se ne poklapaju!'
                    return
                }
                this.korisnik.lozinka = this.novaLozinka
                localStorage.setItem('ulogovan', JSON.stringify(this.korisnik))
                let sviKorisnici = JSON.parse(localStorage.getItem('sviKorisnici'))
                for(let i = 0; i < sviKorisnici.length; i++){
                    if(sviKorisnici[i].kor_ime == this.korisnik.kor_ime){
                        sviKorisnici[i] = this.korisnik;
                        localStorage.setItem('sviKorisnici', JSON.stringify(sviKorisnici))
                        this.poruka = 'Uspesno azurirano!'
                        this.staraLozinka = ''
                        this.novaLozinka = ''
                        this.novaLozinkaPonovo = ''
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