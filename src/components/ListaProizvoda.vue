<template>
    <div id="listapr">
        <div class="row justify-content-center">
            <div class='col-sm-5' v-for="proizvod in proizvodi" :key="proizvod.id">
                <router-link :to='/detaljiproizvoda/+proizvod.id'>
                    <Proizvod :pr="proizvod"></Proizvod>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Proizvod from './Proizvod.vue'
    import proizvodi from '../data/proizvodi.js'
    export default{
        name : "ListaProizvoda",
        components: {
            Proizvod
        },
        data(){
            return {
                proizvodi: [ ]
            }
        },
        mounted(){
            if(localStorage.getItem('proizvodi') != null){
                this.proizvodi = JSON.parse(localStorage.getItem('proizvodi'));
            }
            else{
                this.proizvodi = proizvodi;
            }
            if(localStorage.getItem('korisnik') != null){
                //ulogovan korisnik, radi sortiranje
                this.proizvodi.sort(function (a,b){
                    let datumA = a.datum.split('-');
                    let datA = new Date(datumA[0], datumA[1] - 1, datumA[2])
                    let datumB = b.datum.split('-');
                    let datB = new Date(datumB[0], datumB[1] - 1, datumB[2])

                    if(datA < datB) return -1;
                    else {
                        if(datA > datB) return 1;
                        else return 0;
                    }
                })
            }
        }
    }
</script>