L.Icon.FontAwesome = L.Icon.extend({

    options: {
        popupAnchor: [0, -25]
    },

    createIcon: function () {

        var div = document.createElement('div');
        var options = this.options;

        if(options.iconClasses) {
            div.appendChild(this._createIcon());
        }

        return div;
    },

    _createIcon: function () {

        var options = this.options;

        // container div
        var iconDiv = L.DomUtil.create('div', 'leaflet-fa-markers');

        // feature icon
        var iconSpan = L.DomUtil.create('span', options.iconClasses + ' feature-icon');
        iconSpan.style.color = options.iconColor;
        iconSpan.style.textAlign = 'center';

        // XY position adjustments
        if(options.iconYOffset && options.iconYOffset != 0) iconSpan.style.marginTop = options.iconYOffset + 'px';
        if(options.iconXOffset && options.iconXOffset != 0) iconSpan.style.marginLeft = options.iconXOffset + 'px';

        // marker icon L.DomUtil doesn't seem to like svg, just append out html directly
        var markerSvg = document.createElement('div');
        markerSvg.className = "marker-icon-svg";
        markerSvg.innerHTML = '<svg ' +
            'width="16px" ' +
            'height="26px" ' +
            'viewBox="0 0 16 26" ' +
            'version="1.1" ' +
            'xmlns="http://www.w3.org/2000/svg" ' +
            'xmlns:xlink="http://www.w3.org/1999/xlink">' +
            '<path class="markerBackground" id="' + options.markerClass + '" d="'+options.markerPath+'" ' +
            'fill="'+ options.markerColor + '"></path>' +
            '</svg>';


        iconDiv.appendChild(markerSvg);
        iconDiv.appendChild(iconSpan);
        return iconDiv;
    }
});

L.icon.fontAwesome = function (options) {
    return new L.Icon.FontAwesome(options);
};

L.Icon.FontAwesome.prototype.options.markerPath = 'M8,1 C3.7146,1 1,3.65636364 1,8.4648485 C1,12.0760606 8,25.5 8,25.5 C8,25.5 15.5,12.0360606 15.5,8.2648485 C15.5,3.85636364 12.1815,1 8,1 L8,1 Z';