<template>
    <div class="center">
        <table>
            <tr>
                <td>Id:</td>
                <td> <input type="text" name='id' v-model="id"> </td>
            </tr>
            <tr>
                <td>Naziv:</td>
                <td> <input type="text" name='naziv' v-model="naziv"> </td>
            </tr>
            <tr>
                <td>Opis:</td>
                <td> <input type="text" name='opis' v-model="opis"> </td>
            </tr>
            <tr>
                <td>Cena:</td>
                <td> <input type="text" name='cena' v-model="cena"> </td>
            </tr>
            <tr>
                <td>Ocena:</td>
                <td> <input type="text" name='ocena' v-model="ocena"> </td>
            </tr>
            <tr>
                <td colspan="2"> <button class="btn btn-warning" @click="dodaj()">Dodaj</button></td>
            </tr>
        </table>
    </div>
</template>

<style>
    .center{
        display: flex;
        justify-content: center;
    }
</style>

<script>
    import proizvodi from '../data/proizvodi.js'

    export default{
        name: 'Admin',
        data(){
            return {
                id: '',
                naziv: '',
                cena: '',
                ocena: '',
                opis: '',
                sviProizvodi : []
            }
        },
        methods: {
            dodaj(){
                proizvodi.push({
                    'id': Number(this.id),
                    'naziv' : this.naziv,
                    'cena' : Number(this.cena),
                    'opis' : this.opis,
                    'ocena' : Number(this.ocena)
                })
                localStorage.setItem('proizvodi', JSON.stringify(proizvodi))
            }
        },
        mounted(){
            if(localStorage.getItem('proizvodi') != null){
                this.sviProizvodi = JSON.parse(localStorage.getItem('proizvodi'));
            }
            else{
                this.sviProizvodi = proizvodi;
            }
        }
    }
</script>
