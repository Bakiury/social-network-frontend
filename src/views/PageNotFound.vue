<template>
    <div class="mySection">
        <h1>404</h1>
        <p>Página no encontrada</p>
        <router-link :to="{ name: 'feed' }" class="btn btn-dark">
            Volver
        </router-link>
    </div>
</template>

<style scoped>
.mySection {
    background: rgba(255, 234, 167, 1);
    background: -webkit-linear-gradient(
        to bottom,
        rgba(255, 234, 167, 1),
        #333333
    );
    background: linear-gradient(to bottom, rgba(255, 234, 167, 1), #333333);
    color: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    cursor: default;
}
h1 {
    font-size: 150px;
    text-shadow: 4px 4px 4px #000000;
}
p {
    margin-top: -40px;
    font-size: 30px;
    text-shadow: 2px 2px 2px #000000;
}
a {
    width: 300px;
}
</style>
