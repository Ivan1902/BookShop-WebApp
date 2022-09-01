<template>

<body>
  <div class="container">
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Pacifico" />
    <h1>Knjižara Perce</h1>
    <br/><br/><br/>
     <div class="center">
        <table>
          <tr>
            
            <td><input type="text" name="kor_ime" v-model="korisnicko_ime" placeholder="Korisnicko ime"></td>
          </tr>
          <tr>
            <td><input type="password" name="lozinka" v-model="lozinka" placeholder="Lozinka"></td>
          </tr>
          <tr>
            <br/><br/>
          </tr>
          <tr>
            <td >
              <button class="btn bg-primary" @click='prijava()'>Potvrdi</button>
            </td>
          </tr>
          <tr>
            <td >
              <br/>
              <i style="color:red"><b>{{poruka}}</b></i>
            </td>
          </tr>
        </table>
      </div>
</div>
</body>
</template>


<script>
    import korisnici from '../data/korisnici.js'

    export default{
        name: 'Pocetna',
        data(){
            return {
                sviKorisnici : [ ],
                korisnicko_ime : '',
                lozinka: '',
                poruka: ''
            }
        },
        mounted(){
            if(localStorage.getItem('sviKorisnici') == null){
                localStorage.setItem('sviKorisnici', JSON.stringify(korisnici))
            }
            this.sviKorisnici = JSON.parse(localStorage.getItem('sviKorisnici'))
        },
        methods: {
            prijava(){
                this.sviKorisnici = JSON.parse(localStorage.getItem('sviKorisnici'))
                if(this.sviKorisnici.find(kor => kor.kor_ime == this.korisnicko_ime) == null){
                    this.poruka = 'Uneto korisnicko ime ne postoji u sistemu!'
                    return;
                }
                let korisnik = this.sviKorisnici.find(kor => kor.kor_ime == this.korisnicko_ime && kor.lozinka == this.lozinka);
                if(korisnik == null){
                    this.poruka = 'Neispravna lozinka!'
                    return;
                }
                localStorage.setItem('ulogovan',JSON.stringify(korisnik));
                if(korisnik.tip == 0){
                    this.$router.push('kupacDostupne');
                }
                else{
                    this.$router.push('prodavacPregled');
                }
            }
        }
    }
</script>

<style>
  .container{
    width: 100%;
    height: 100%;
  }
  body{
    height: 100vh;
    
    background-image: url("../assets/perce.jpeg");
  }

  h1{
    color:red;
    font-family: Pacifico;
  }
  .center{
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
  }
</style>