<%@ page contentType="text/html;charset=UTF-8" %>
<html>
    <head>
        <meta name="layout" content="${grailsApplication.config.skin.layout}"/>
        <title>
            Biodiversity Information Explorer
        </title>
    </head>

    <body>
        <div class="container">
            <header class="page-header">
                <h1 class="page-header__title">
                    Search for Taxa
                </h1>
            </header>

            <div class="section">
                <form id="search-inpage" action="search" method="get" name="search-form">
                    <div class="input-plus">
                        <input
                            id="search"
                            type="text"
                            name="q"
                            placeholder="Search the Atlas"
                            autocomplete="off"
                            autofocus
                            onfocus="this.value = this.value;"
                            class="input-plus__field"
                        />

                        <button type="submit" class="erk-button erk-button--dark input-plus__addon">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </body>
</html>
