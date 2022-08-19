/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
	// Helper vars and functions.
	const extend = function (a, b) {
		for (let key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	};

	// from http://www.quirksmode.org/js/events_properties.html#position
	const getMousePos = function (ev) {
		let posx = 0;
		let posy = 0;
		if (!ev) ev = window.event;
		if (ev.pageX || ev.pageY) {
			posx = ev.pageX;
			posy = ev.pageY;
		} else if (ev.clientX || ev.clientY) {
			posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x: posx, y: posy };
	};

	const TiltObj = function (el, options) {
		this.el = el;
		this.options = extend({}, this.options);
		extend(this.options, options);
		this.DOM = {};
		this.DOM.img = this.el.querySelector(".move-img");
		this.DOM.title = this.el.querySelector(".move-title");
		this._initEvents();
	};

	TiltObj.prototype.options = {
		movement: {
			img: { translation: { x: -40, y: -40 } },
			title: { translation: { x: 20, y: 20 } },
		},
	};

	TiltObj.prototype._initEvents = function () {
		this.mouseenterFn = (ev) => {
			anime.remove(this.DOM.img);
			anime.remove(this.DOM.title);
		};

		this.mousemoveFn = (ev) => {
			requestAnimationFrame(() => this._layout(ev));
		};

		this.mouseleaveFn = (ev) => {
			requestAnimationFrame(() => {
				anime({
					targets: [this.DOM.img, this.DOM.title],
					duration: 1500,
					easing: "easeOutElastic",
					elasticity: 400,
					translateX: 0,
					translateY: 0,
				});
			});
		};

		this.el.addEventListener("mousemove", this.mousemoveFn);
		this.el.addEventListener("mouseleave", this.mouseleaveFn);
		this.el.addEventListener("mouseenter", this.mouseenterFn);
	};

	TiltObj.prototype._layout = function (ev) {
		// Mouse position relative to the document.
		const mousepos = getMousePos(ev);
		// Document scrolls.
		const docScrolls = { left: document.body.scrollLeft + document.documentElement.scrollLeft, top: document.body.scrollTop + document.documentElement.scrollTop };
		const bounds = this.el.getBoundingClientRect();
		// Mouse position relative to the main element (this.DOM.el).
		const relmousepos = { x: mousepos.x - bounds.left - docScrolls.left, y: mousepos.y - bounds.top - docScrolls.top };

		// Movement settings for the animatable elements.
		const t = {
			img: this.options.movement.img.translation,
			title: this.options.movement.title.translation,
		};

		const transforms = {
			img: {
				x: ((-1 * t.img.x - t.img.x) / bounds.width) * relmousepos.x + t.img.x,
				y: ((-1 * t.img.y - t.img.y) / bounds.height) * relmousepos.y + t.img.y,
			},
			title: {
				x: ((-1 * t.title.x - t.title.x) / bounds.width) * relmousepos.x + t.title.x,
				y: ((-1 * t.title.y - t.title.y) / bounds.height) * relmousepos.y + t.title.y,
			},
		};
		this.DOM.img.style.WebkitTransform = this.DOM.img.style.transform = "translateX(" + transforms.img.x + "px) translateY(" + transforms.img.y + "px)";
		this.DOM.title.style.WebkitTransform = this.DOM.title.style.transform = "translateX(" + transforms.title.x + "px) translateY(" + transforms.title.y + "px)";
	};

	const DOM = {};
	DOM.svg = document.querySelector(".shape");
	DOM.footer = document.querySelector(".last-section");
	DOM.shapeEl = DOM.svg.querySelector("path");
	DOM.contentElems = Array.from(document.querySelectorAll(".sectin-wrap"));
	const contentElemsTotal = DOM.contentElems.length;

	const shapes = [
		//1
		{
			path: "M 350 400C350 306.112 426.112 230 520 230H880C973.888 230 1050 306.112 1050 400C1050 493.888 973.888 570 880 570H520C426.112 570 350 493.888 350 400 Z",
			scaleX: 1.4,
			scaleY: 1.4,
			rotate: 0,
			tx: 0,
			ty: 0,
			fill: {
				duration: 10000,
				easing: "linear",
			},
			animation: {
				points: {
					duration: 1000,
					easing: "easeOutExpo",
				},
				svg: {
					duration: 1000,
					easing: "easeOutElastic",
				},
			},
		},

		//2
		{
			// path: "M700 230L1050 400L700 570L350 400L700 230Z 230Z 230Z 230Z 230Z 230Z 230Z 230Z 230Z 230Z 230Z 230Z 230Z 230Z 230Z 230Z 230Z 230Z 230Z",
			path: "M700 230,1050 400,700 570,350 400,700 230Z",
			scaleX: 1.2,
			scaleY: 1.2,
			rotate: -45,
			tx: -10,
			ty: -10,
			fill: {
				color: "none",
				duration: 500,
				easing: "linear",
			},
			animation: {
				points: {
					duration: 500,
					easing: "easeOutExpo",
				},
				svg: {
					duration: 1500,
					easing: "easeOutElastic",
				},
			},
		},

		//3
		{
			path: "M870 240L530 50V560L870 750V240Z",
			// path: "M350 400C350 306.112 426.112 230 520 230H880C973.888 230 1050 306.112 1050 400C1050 493.888 973.888 570 880 570H520C426.112 570 350 493.888 350 400Z",
			scaleX: 1.2,
			scaleY: 1.2,
			rotate: -90,
			tx: 0,
			ty: -50,
			fill: {
				color: "none",
				duration: 500,
				easing: "linear",
			},
			animation: {
				points: {
					duration: 500,
					easing: "easeOutExpo",
				},
				svg: {
					duration: 1500,
					easing: "easeOutElastic",
				},
			},
		},

		//4
		{
			path: "M315.789 461.496,889.195 59.9924,986.703 199.248,1084.21 338.504,510.805 740.008,413.297 600.752,315.789 461.496Z",
			scaleX: 1,
			scaleY: 1,
			rotate: -145,
			tx: 100,
			ty: -50,
			fill: {
				color: "none",
				duration: 500,
				easing: "linear",
			},
			animation: {
				points: {
					duration: 500,
					easing: "easeOutExpo",
				},
				svg: {
					duration: 1500,
					easing: "easeOutElastic",
				},
			},
		},

		//5
		{
			path: "M450 230H950L1100 400,950 570H450L300 400,450 230Z",
			scaleX: 1,
			scaleY: 1,
			rotate: -45,
			tx: -50,
			ty: 50,
			fill: {
				color: "none",
				duration: 500,
				easing: "linear",
			},
			animation: {
				points: {
					duration: 500,
					easing: "easeOutExpo",
				},
				svg: {
					duration: 1500,
					easing: "easeOutElastic",
				},
			},
		},

		//6
		{
			path: "M350 400C350 306.112 426.112 230 520 230H880C973.888 230 1050 306.112 1050 400C1050 493.888 973.888 570 880 570H520C426.112 570 350 493.888 350 400Z",
			scaleX: 2,
			scaleY: 2,
			rotate: 135,
			tx: -100,
			ty: 100,
			fill: {
				color: "none",
				duration: 500,
				easing: "linear",
			},
			animation: {
				points: {
					duration: 500,
					easing: "easeOutExpo",
				},
				svg: {
					duration: 1500,
					easing: "easeOutElastic",
				},
			},
		},
	];
	let step;

	const initShapeEl = function () {
		anime.remove(DOM.svg);
		anime({
			targets: DOM.svg,
			duration: 1,
			easing: "linear",
			scaleX: shapes[0].scaleX,
			scaleY: shapes[0].scaleY,
			translateX: shapes[0].tx + "px",
			translateY: shapes[0].ty + "px",
			rotate: shapes[0].rotate + "deg",
		});
	};

	const createScrollWatchers = function () {
		DOM.contentElems.forEach((el, pos) => {
			const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
			pos = pos ? pos : contentElemsTotal;
			const watcher = scrollMonitor.create(scrollElemToWatch, -350);

			watcher.enterViewport(function () {
				step = pos;
				anime.remove(DOM.shapeEl);
				anime({
					targets: DOM.shapeEl,
					duration: shapes[pos].animation.points.duration,
					easing: shapes[pos].animation.points.easing,
					elasticity: shapes[pos].animation.points.elasticity || 0,
					d: shapes[pos].path,
					fill: {
						value: shapes[pos].fill.color,
						duration: shapes[pos].fill.duration,
						easing: shapes[pos].fill.easing,
					},
				});

				anime.remove(DOM.svg);
				anime({
					targets: DOM.svg,
					duration: shapes[pos].animation.svg.duration,
					easing: shapes[pos].animation.svg.easing,
					elasticity: shapes[pos].animation.svg.elasticity || 0,
					scaleX: shapes[pos].scaleX,
					scaleY: shapes[pos].scaleY,
					translateX: shapes[pos].tx + "px",
					translateY: shapes[pos].ty + "px",
					rotate: shapes[pos].rotate + "deg",
				});
			});

			watcher.exitViewport(function () {
				const idx = !watcher.isAboveViewport ? pos - 1 : pos + 1;

				if (idx <= contentElemsTotal && step !== idx) {
					step = idx;
					anime.remove(DOM.shapeEl);
					anime({
						targets: DOM.shapeEl,
						duration: shapes[idx].animation.points.duration,
						easing: shapes[idx].animation.points.easing,
						elasticity: shapes[idx].animation.points.elasticity || 0,
						// points: shapes[idx].points,
						d: shapes[idx].path,
						fill: {
							value: shapes[idx].fill.color,
							duration: shapes[idx].fill.duration,
							easing: shapes[idx].fill.easing,
						},
					});

					anime.remove(DOM.svg);
					anime({
						targets: DOM.svg,
						duration: shapes[idx].animation.svg.duration,
						easing: shapes[idx].animation.svg.easing,
						elasticity: shapes[idx].animation.svg.elasticity || 0,
						scaleX: shapes[idx].scaleX,
						scaleY: shapes[idx].scaleY,
						translateX: shapes[idx].tx + "px",
						translateY: shapes[idx].ty + "px",
						rotate: shapes[idx].rotate + "deg",
					});
				}
			});
		});
	};

	const init = function () {
		imagesLoaded(document.body, () => {
			initShapeEl();
			createScrollWatchers();
			Array.from(document.querySelectorAll(".section-grid")).forEach((el) => new TiltObj(el));
		});
	};

	init();
}
