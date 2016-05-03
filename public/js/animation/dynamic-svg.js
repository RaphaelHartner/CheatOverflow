$(document).ready(startTransformation());

function TransformMatrix(a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
}

TransformMatrix.prototype.toString = function matrixToString() {
    return  "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.e + ", " + this.f + ")";
};

function startTransformation(){

    window.setTimeout(transformSVG, 3000, document.getElementById("svg_line3"), new TransformMatrix(1, 0.3, -0.3, 1, 30, -40));
    window.setTimeout(transformSVG, 2000, document.getElementById("svg_line4"), new TransformMatrix(0.8, 0.6, -0.6, 0.8, 100, -60));
    window.setTimeout(transformSVG, 1000, document.getElementById("svg_line5"), new TransformMatrix(0.6, 0.8, -0.8, 0.6, 160, -70));
}

function transformSVG(element, matrix) {

    element.setAttribute('transform', matrix.toString());
}


