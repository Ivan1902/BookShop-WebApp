<template>
  <div class="home">
    <h1>PetShop Maza</h1>
    <h3>Sve za vase ljubimce!</h3>
    <button class="btn btn-success" @click="pokaziModal()">Prijavi se</button>
    <hr/>
    <br/>
    <ListaProizvoda></ListaProizvoda>
    <modal name='prijavaModal'>
      <div class="closeModal"><button @click="$modal.hide('prijavaModal')">x</button></div>
      <div class="centerModal">
        <table>
          <tr>
            <td>Korisnicko ime:</td>
            <td><input type="text" name="kor_ime" v-model="korisnicko_ime"></td>
          </tr>
          <tr>
            <td>Lozinka</td>
            <td><input type="text" name="lozinka" v-model="lozinka"></td>
          </tr>
          <tr>
            <td colspan='2'>
              <button class="btn bg-success" @click='prijava()'>Potvrdi</button>
            </td>
          </tr>
        </table>
      </div>
    </modal>
  </div>
</template>

<style>
  .centerModal{
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .closeModal{
    width: 100%;
    background-color: lightgray;
    text-align: right;
  }
</style>

<script>
// @ is an alias to /src
import ListaProizvoda from '../components/ListaProizvoda.vue'
import korisnici from '../data/korisnici.js'

export default {
  name: 'Home',
  components: {
    ListaProizvoda
  },
  data(){
    return {
      korisnicko_ime : '',
      lozinka: ''
    }
  },
  methods:{
    pokaziModal(){
      this.$modal.show('prijavaModal');
    },
    prijava(){
      let korisnik = korisnici.find(kor => kor.kor_ime == this.korisnicko_ime && kor.lozinka == this.lozinka)
      localStorage.setItem('korisnik', JSON.stringify(korisnik))
      if(korisnik.tip==1){
        //admin
        this.$router.push('admin');
      }
    }
  }
}
</script>


