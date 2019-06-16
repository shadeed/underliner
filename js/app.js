class Underliner {
    constructor(selector, color1, color2, thickness1, thickness2, strokeLinecap, rtl) {
        this.links = document.querySelectorAll(selector)
        this.fill = 'transparent';
        this.color1 = color1;
        this.color2 = color2;
        this.thickness1 = thickness1;
        this.thickness2 = thickness2;
        this.strokeLinecap = strokeLinecap;
        this.rtl = rtl;
        this.init();
    }

    init() {
        var self = this;

        self.links.forEach(function (link) {
            var linkWidth = parseInt(link.offsetWidth);
            var svg = self.createSVG(linkWidth);
            self.insertAfter(svg, link);
        });
    }

    setPath(pathD, color, thickness, strokeLinecap) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        path.setAttribute("d", pathD);
        path.setAttribute("fill", this.fill);
        path.setAttribute("stroke", color);
        path.setAttribute("stroke-width", thickness);
        path.setAttribute("stroke-linecap", strokeLinecap);
        path.setAttribute("stroke-dasharray", path.getTotalLength() + 5);
        path.setAttribute("stroke-dashoffset", path.getTotalLength() + 5);

        return path;
    }

    randomizePath(linkWidth) {
        var moveYMin = 5;
        var moveYMax = 12;

        var curveXMin = 15;
        var curveXMax = linkWidth; /* Width of the link */
        var curveYMin = 7;
        var curveYMax = linkWidth * 0.12; /* Making the quadratic propotional to the link width */
        //var curveYMax = 20

        var endYMin = 5;
        var endYMax = 11;

        var moveY = Math.floor(Math.random() * (moveYMax - moveYMin)) + moveYMin;
        var curveX = Math.floor(Math.random() * (curveXMax - curveXMin)) + curveXMin;
        var curveY = Math.floor(Math.random() * (curveYMax - curveYMin)) + curveYMin;
        var endY = Math.floor(Math.random() * (endYMax - endYMin)) + endYMin;

        return `M5 ${moveY} Q ${curveX} ${curveY} ${linkWidth - 7} ${endY}`
    }

    createSVG(linkWidth) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        svg.setAttribute("width", linkWidth);
        svg.setAttribute("height", "35");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");

        var pathD = this.randomizePath(linkWidth);
        var pathD2 = this.randomizePath(linkWidth);

        if(this.rtl === true) {
            pathD = this.reverseMe(pathD);
            pathD2 = this.reverseMe(pathD2);
        }

        svg.appendChild(this.setPath(pathD, this.color1, this.thickness1, this.strokeLinecap));
        svg.appendChild(this.setPath(pathD2, this.color2, this.thickness2, this.strokeLinecap));

        svg.setAttribute("focusable", false);

        return svg;
    }

    reverseMe(path) {
        /* Regex functions borrwed from 
        https://github.com/krispo/svg-path-utils/blob/master/src/svg-path-utils.js */
        var pathOperators = path.replace(/[\d,\-\s]+/g, '').split('');
        var pathNums = path.replace(/[A-Za-z,]+/g, ' ').trim().replace(/\s\s+/g, ' ').split(' ');
    
        return `${pathOperators[0]} ${pathNums[4]} ${pathNums[5]} ${pathOperators[1]} ${pathNums[2]} ${pathNums[3]} ${pathNums[0]} ${pathNums[1]}`;
    }

    // https://plainjs.com/javascript/manipulation/insert-an-element-after-or-before-another-32/
    insertAfter(el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    }
}

var test = new Underliner(".underliner a", "url(#gradient)", "url(#gradient2)", 7, 12, "round", true);

var test2 = new Underliner(".underliner-small a", "url(#gradient)", "url(#gradient2)", 3, 6, "round");