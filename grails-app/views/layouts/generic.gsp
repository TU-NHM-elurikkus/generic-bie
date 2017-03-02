<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>
            <g:layoutTitle />
        </title>

        <r:require modules="bie"/>

        <!-- Resources -->
        <r:layoutResources/>

        <!-- Head -->
        <g:layoutHead />

        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>
        <div class="wrap">
            <g:render template="/menu" plugin="elurikkus-commons" />

            <g:layoutBody/>
        </div>

        <!-- Resources -->
        <r:layoutResources/>
    </body>
</html>
