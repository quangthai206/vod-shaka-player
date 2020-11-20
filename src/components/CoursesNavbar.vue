<template>
    <div>
        <nav class="navbar navbar-default"></nav>
        <nav class="navbar navbar-inverse navbar-fixed-top courses-top-nav">
            <div class="container-courses">
                <div class="navbar-header">
                    <a class="navbar-brand courses-logo" href="#">
                        <img src="https://vueschool.io/img/logo/vueschool_logo_multicolor_negative.svg" alt="" width="150px">
                    </a>
                </div>
                <ul class="nav navbar-nav courses-menu">
                    <li><a href="#">Courses</a></li>
                    <li><a href="#">Plans</a></li>
                    <li><a href="#">Contacts</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#"><span class="glyphicon glyphicon-search"></span></a></li>
                    <li><a href="#"><span class="glyphicon glyphicon-user"></span> Profile</a></li>
                    <li><a href="#"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "CoursesNavbar"
    }
</script>

<style scoped>

    .navbar {
        margin: 0;
        border: none;
    }

    .courses-logo {
        display: flex;
        align-items: center;
        padding: 0;
        margin-right: 40px;
    }

    .courses-top-nav {
        border-radius: 0;
        background-color: #1D185E;
        font-size: 16px;
    }
</style>