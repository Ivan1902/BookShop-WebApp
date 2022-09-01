<template>
    <div class="prodavac">
        <div class="navigacijaProdavac">
            <NavigacijaProdavac></NavigacijaProdavac>
        </div>
        <div class="dostupneKnjige">
            <h1>Unos nove knjige</h1>
            <br/><br/>
            <div class="licniPodaci" style="display: flex; justify-content: center;">
                <table class="licniPodaciTabela" style="background-color: #D8D8D8; width: 30%;">
                    <br/>
                    <tr>
                        <td>Naziv knjige:</td>
                        <td><input type="text" placeholder="Naziv knjige" v-model="naziv" style="width: 90%; "></td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Autor knjige:</td>
                        <td><input type="text" placeholder="Autor knjige" v-model="autor" style="width: 90%; "> </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Opis knjige:</td>
                        <td> <textarea placeholder="Opis knjige" v-model="opis" style="width: 90%; "></textarea></td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Godina izdanja:</td>
                        <td><input type="text" placeholder="Godina izdanja" v-model="godina" style="width: 90%; "></td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Broj strana:</td>
                        <td><input type="text" placeholder="Broj strana" v-model="strane" style="width: 90%; "></td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Odaberi sliku:</td>
                        <td >
                            <input type="file" id="myFileInput" @change="onFileChange"  style="float:right">
                        </td>
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
    import NavigacijaProdavac from '../components/NavigacijaProdavac.vue'

    export default {
        name: "KupacLicniPodaci",
        components: {
            NavigacijaProdavac
        },
        data() {
            return {
                naziv: '',
                autor: '',
                opis: '',
                godina: '',
                strane: '',
                poruka : '',
                image: ''
            }
        },
        mounted() {
            this.korisnik = JSON.parse(localStorage.getItem('ulogovan'))
            this.sveKnjige = JSON.parse(localStorage.getItem('sveKnjige'))
        },
        methods: {
            potvrdi(){
                if(!this.naziv || !this.autor || !this.opis || !this.godina || !this.strane || !this.image){
                    this.poruka = 'Sva polja moraju biti popunjena'
                    return
                }
                if(isNaN(this.godina)){
                    this.poruka = 'Godina izdanja mora biti broj'
                    return
                }
                if(isNaN(this.strane)){
                    this.poruka = 'Broj strana mora biti broj'
                    return
                }
                let knjiga = {
                    id: this.sveKnjige.length + 1,
                    naziv: this.naziv,
                    autor: this.autor,
                    opis: this.opis,
                    godina: this.godina, 
                    strane: this.strane,
                    slika: this.image
                }
                this.sveKnjige.push(knjiga)
                localStorage.setItem('sveKnjige', JSON.stringify(this.sveKnjige))
                this.naziv = ''
                this.autor = ''
                this.opis = ''
                this.godina = ''
                this.strane = ''
                this.poruka = 'Uspesan unos!'
                this.image = ''
            },
            get(key){
                this.image = localStorage.getItem(key)
            },
            set(key){
                try{
                    localStorage.setItem(key, this.image)
                }catch(e){
                    console.log(`Storage failed: ${e}`)
                }
            },
            onFileChange(e){
                var files = e.target.files || e.dataTransfer.files
                if(!files.length){
                    return
                }
                this.createImage(files[0])
            },
            createImage(file){
                var image = new Image()
                var reader = new FileReader()

                reader.onload = (e) => {
                    this.image = e.target.result
                    this.set('img')
                }
                reader.readAsDataURL(file)
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
    .licniPodaci{
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
    }
</style>