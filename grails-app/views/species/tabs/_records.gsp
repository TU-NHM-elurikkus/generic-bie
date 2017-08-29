<section class="tab-pane" id="records" role="tabpanel">
    <div id="occurrenceRecords">
        <div id="recordBreakdowns">
            <h2>
                <g:message code="show.records.chart.title" />
                <g:message code="show.records.recordCount.title" />
            </h2>

            <%-- This is not page header but we can use its classes to lay out links in the same way. --%>
            <div class="page-header-links">
                <a
                    href="${biocacheUrl}/occurrences/search?q=lsid:${tc?.taxonConcept?.guid ?: ''}#tab-records"
                    class="page-header-links__link"
                >
                    <span class="fa fa-list"></span>
                    <g:message code="show.map.btn.viewRecords" />
                    <g:message code="show.records.recordCount.title" />
                </a>

                <a
                    href="${biocacheUrl}/occurrences/search?q=lsid:${tc?.taxonConcept?.guid ?: ''}#tab-map"
                    class="page-header-links__link"
                >
                    <i class="fa fa-map-marker"></i>
                    <g:message code="show.map.btn.viewMap" />
                    <g:message code="show.records.recordCount.title" />
                </a>
            </div>

            <div id="charts"></div>
        </div>
    </div>
</section>
