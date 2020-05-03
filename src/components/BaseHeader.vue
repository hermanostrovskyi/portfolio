<template>
    <header class="main-header wrapper">
        <div class="logo">
            <a href="#" class="logo__link">SN</a>
        </div>

        <nav class="main-nav">
            <ul class="main-nav__menu-list">
                <li class="main-nav__menu-item">Experience</li>
                <li class="main-nav__menu-item">Skills</li>
                <li class="main-nav__menu-item">Portfolio</li>
                <li class="main-nav__menu-item">Certificates</li>
                <li class="main-nav__menu-item">Contact me</li>
            </ul>
        </nav>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="white" points="0,450 0,1 100,100"/>
        </svg>
    </header>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class BaseHeader extends Vue {

    }
</script>

<style scoped lang="scss">
    svg {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 250px;
        /* set height to pixels if you want angle to change with screen width */
    }
    .main-header {

        height: 500px;
        position: relative;
        display: flex;
        background-image: url("https://e-tangata.co.nz/wp-content/uploads/2018/04/Lance-Norman-001.jpg");
        background-position: 100% 0;
        background-repeat: no-repeat;

        background-color: black;

        .logo {
            margin-right: 50px;

            &__link {

            }
        }

        .main-nav {
            &__menu-list {
                display: flex;
            }

            &__menu-item {
                list-style: none;
                color: white;
                margin-right: 30px;
            }
        }

    }
</style>
