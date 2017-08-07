<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <g:render template="/manifest" plugin="elurikkus-commons" />

        <title>
            <g:layoutTitle />
        </title>

        <r:require modules="jquery, biefixed, menu" />

        <!-- Resources -->
        <r:layoutResources />

        <!-- Head -->
        <g:layoutHead />

        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>
        <g:render template="/menu" plugin="elurikkus-commons" />

        <div class="wrap">
            <g:layoutBody />
        </div>

        <g:render template="/footer" plugin="elurikkus-commons" />

        <!-- Resources -->
        <r:layoutResources />
    </body>
</html>
