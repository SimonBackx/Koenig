const {
    htmlAbsoluteToRelative,
    htmlRelativeToAbsolute,
    htmlToTransformReady
} = require('@tryghost/url-utils/lib/utils');

module.exports = {
    name: 'before-after',
    type: 'dom',

    render({payload, env: {dom}, options = {}}) {
        const orientation = payload.orientation === 'vertical' ? 'vertical' : 'horizontal';
        const cardWidth = payload.cardWidth === 'full' ? 'full' : 'wide';
        const startingPosition = Math.max(
            0,
            Math.min(
                100,
                Number.isNaN(parseInt(payload.startingPosition)) ? 50 : parseInt(payload.startingPosition)
            )
        );
        const caption = payload.caption;

        const figure = dom.createElement('figure');
        figure.setAttribute(
            'class',
            `kg-card kg-before-after-card kg-width-${cardWidth} ${caption ? 'kg-card-hascaption' : ''}`
        );

        let html = `
            <div data-orientation="${orientation}">
                <div class="kg-before-after-card-image-after">
                    <img data-width="${payload.afterImage.width}"
                        src="${payload.afterImage.src}"
                        width="${payload.afterImage.width}"/>
                </div>
                <div class="kg-before-after-card-image-before">
                    <img data-width="${payload.beforeImage.width}"
                        src="${payload.beforeImage.src}"
                        width="${payload.beforeImage.width}"/>
                </div>
                <input type="range" min="0" max="100" value="${startingPosition}"/>
            </div>
        `;

        if (options.target === 'email') {
            // @TODO Support for emails
            html = ``;
        }

        figure.appendChild(dom.createRawHTMLSection(html));

        if (caption) {
            let figcaption = dom.createElement('figcaption');
            figcaption.appendChild(dom.createRawHTMLSection(caption));
            figure.appendChild(figcaption);
        }

        return figure;
    },

    absoluteToRelative(payload, options) {
        payload.caption = payload.caption && htmlAbsoluteToRelative(payload.caption, options.siteUrl, options);
        return payload;
    },

    relativeToAbsolute(payload, options) {
        payload.caption = payload.caption && htmlRelativeToAbsolute(payload.caption, options.siteUrl, options.itemUrl, options);
        return payload;
    },

    toTransformReady(payload, options) {
        payload.html = payload.html && htmlToTransformReady(payload.html, options.siteUrl, options);
        return payload;
    }
};
