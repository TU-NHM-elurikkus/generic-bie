<form id="search-inpage" action="search" method="get" name="search-form">
    <div class="input-plus">
        <input
            id="search"
            type="text"
            name="q"
            value="${request.query == "*:*" ? '' : request.query}"
            placeholder="${message(code: 'searchBox.btn.placeholder')}"
            autocomplete="off"
            autofocus
            onfocus="this.value = this.value;"
            class="input-plus__field"
        />

        <button type="submit" class="erk-button erk-button--dark input-plus__addon">
            <g:message code="general.btn.search" />
        </button>
    </div>
</form>
