class spazz {
    constructor(c, props = {}) {
        let ct = c.getContext("2d");
        if ('ontouchstart' in document.documentElement) {
            let lol = {
                yes: false,
                touchstart: function (co) {
                    ct.beginPath();
                    ct.moveTo(co.x, co.y);
                    this.yes = true;
                },
                touchmove: function (co) {
                    if (this.yes) {
                        ct.lineTo(co.x, co.y);
                        ct.stroke();
                    }
                },
                touchend: function (co) {
                    if (this.yes) {
                        this.touchmove(co);
                        this.yes = false;
                    }
                }
            };
            function draw(e) {
                let co = {
                    x: e.targetTouches[0].pageX,
                    y: e.targetTouches[0].pageY
                };
                let o = c;
                if (obj.offsetParent) {
                    do {
                        co.x -= o.offsetLeft;
                        co.y -= o.offsetTop;
                    }
                    while ((o = o.offsetParent) != null);
                }
                lol[e.type](co);
            }
            c.addEventListener('touchstart', draw, false);
            c.addEventListener('touchmove', draw, false);
            c.addEventListener('touchend', draw, false);
            c.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);
        }
        else {
            c.addEventListener("mousedown", (e) => {
                c.down = true;
                let p = this.pos(e, c);
                ct.moveTo(p.h, p.v);
                ct.beginPath();
            });
            c.addEventListener("mousemove", (e) => {
                this.d(e, c, ct);
            })
            c.addEventListener("mouseup", (e) => {
                this.d(e, c, ct);
                c.down = false;
            })
            c.addEventListener("mouseout", (e) => {
                this.d(e, c, ct);
                c.down = false;
            });
        }
        ct.strokeStyle = props.color || 'Black';
    }
    d = (e, c, ct) => {
        switch (c.down) {
            case true:
                let p = this.pos(e, c);
                ct.lineTo(p.h, p.v);
                ct.stroke();
                break;
            case false:
                break;
            default:
                break;
        }
    }
    f = (e, c, ct) => {
        this.d(e, c, ct);
        ct.closePath();
    }
    pos = (e, c) => {
        let x, y;
        if (e.pageX != undefined && e.pageY != undefined) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { h: x - c.offsetLeft, v: y - c.offsetTop };
    }
}