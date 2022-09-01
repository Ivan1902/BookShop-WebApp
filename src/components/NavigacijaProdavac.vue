<template>
<body>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <div class="navigacijaKupac">
        <nav class="navbar navbar-expand-lg navbar-light bg-success">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" >
            <li class="nav-item active">
                <router-link to="/prodavacPregled"> &nbsp;&nbsp;&nbsp; <b style="color:black">Pregled i odabir knjiga na promociji</b>&nbsp;&nbsp;&nbsp;|</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/prodavacUnos"> &nbsp;&nbsp;&nbsp; <b style="color:black">Unos nove knjige</b> &nbsp;&nbsp;&nbsp;|</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/prodavacLicniPodaci"> &nbsp;&nbsp;&nbsp; <b style="color:black">Izmena licnih podataka</b> &nbsp;&nbsp;&nbsp;|</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/prodavacLozinka"> &nbsp;&nbsp;&nbsp; <b style="color:black">Izmena lozinke</b> &nbsp;&nbsp;&nbsp;</router-link>
            </li>
        </ul>
        </div>
        </nav>
        <div class="logout" @click="odjava()">
        <a  class="btn btn-info btn-lg">
          <span class="glyphicon glyphicon-log-out" ></span> Odjava
        </a>
      
        </div>
    </div>
</body>
</template>

<style >
body{
    height: 10vh;
}
.navigacijaKupac{
    background-color: #198754 ;
    height: 100%;
    width: 100%;
    display: flex;
}
.logout{
    position: absolute;
    right: 25px;
    top: 10px;
}
</style>

<script>
    export default {
        name: "NavigacijaProdavac",
        methods: {
            odjava(){
                localStorage.removeItem('ulogovan');
                this.$router.push('/login');
            }
        }
    }
    
</script>