<section class="tab-pane" id="gallery" role="tabpanel">
    <g:each in="${["type", "specimen", "other", "uncertain"]}" var="cat">
        <div id="cat_${cat}" class="hidden-node image-section">
            <h2>
                <g:message code="images.heading.${cat}" default="${cat}" />

                <span class="fa fa-caret-square-o-up" onclick="toggleImageGallery(this)" ></span>
            </h2>

            <div class="taxon-gallery"></div>
        </div>
    </g:each>

    <div id="cat_nonavailable">
        <h2>
            <g:message code="show.gallery.noImages" />
        </h2>

        <p>
            <g:message
                code="show.gallery.upload.desc"
                args="${[raw(grailsApplication.config.skin.orgNameLong)]}"
            />
        </p>
    </div>

    <div id="taxon-summary-thumb-template" class="taxon-summary-thumb hidden-node" style="">
        <a data-toggle="lightbox"
           data-gallery="taxon-summary-gallery"
           data-parent=".taxon-summary-gallery"
           data-footer=""
           href="">
        </a>
    </div>

    <%-- thumbnail template --%>
    <div class="gallery-thumb-template gallery-thumb invisible">
        <div class="taxon-gallery-grid">
            <a
                class="cbLink"
                data-toggle="lightbox"
                data-gallery="main-image-gallery"
                rel="thumbs"
                href=""
            >
                <img class="gallery-thumb__img" src="" alt="" />
                <div class="gallery-thumb__footer"></div>
            </a>
        </div>
    </div>

    <img
        id="gallerySpinner"
        src="${resource(dir: 'images', file: 'spinner.gif', plugin: 'biePlugin')}"
        class="hidden-node"
        alt="spinner icon"
    />

</section>
