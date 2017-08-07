<p class="activeFilters">
    <b>
        Active filters:
    </b>

    <g:each var="item" in="${facetMap}" status="facetIdx">
        <button class="erk-button erk-button--light erk-button--inline" onclick="removeFacet(${facetIdx});">
            <g:if test="${item.key?.contains("uid")}">
                <g:set var="resourceType">
                    ${item.value}_resourceType
                </g:set>

                ${collectionsMap?.get(resourceType)}: ${collectionsMap?.get(item.value)}
            </g:if>

            <g:else>
                <%-- TODO: Test it --%>
                <g:message code="facet.${item.key}" default="${item.key}" />:
                <g:message code="${item.key}.${item.value}" default="${item.value}" />
            </g:else>

            <span>
                ×
            </span>
        </button>
    </g:each>

    <%--
        TODO: Clear all filters button
    --%>
    <g:if test="${facetMap?.size() > 1}">
        <button class="erk-button erk-button--light erk-button--inline" onclick="removeAllFacets();">
            Clear all
        </button>
    </g:if>
</p>
