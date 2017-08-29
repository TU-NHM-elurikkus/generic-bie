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

    <img
        id="gallerySpinner"
        src="${resource(dir: 'images', file: 'spinner.gif', plugin: 'biePlugin')}"
        class="hidden-node"
        alt="spinner icon"
    />
</section>
