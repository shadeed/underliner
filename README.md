# Underliner.js

Underliner is a simple script that can help in creating custom link underline effects with SVG paths. I wrote an [article](www.ishadeed.com) about it.

## Usage

```js
var underliner = new Underliner(
	selector, 
	path1_color, 
	path2_color, 
	path1_thickness, 
	path2_thickness, 
	strokeLinecap, 
	RTL);
```

`selector`: an array of links.

`path1_color`, `path2_color`: a single color, or a gradient with SVG.

`path1_thickness`, `path2_thickness`: the stroke width of a path

strokeLinecap: controlling how edges of a path are shown

`RTL`: a boolean variable to change the direction of the animation

When assigning Underline to a list of links, it will add an SVG with two paths. Each path will have an ID to style it with CSS.

```scss
.c-nav__item {
	svg {
		pointer-events: none;
        transition: 0.5s;
	}

	path {
        transition: stroke-dasharray 0.5s, stroke-dashoffset 0.5s, opacity 0.5s;
        
        &:last-child {
            opacity: 0.2;
        }
	}

	a:hover + svg,
	a:focus + svg {
		opacity: 1;

		path {
			stroke-dashoffset: 0;	
		}
	}
}

#path1 {
	opacity: 0.25;
}
```

Checkout this [Codepen](https://codepen.io/shadeed/pen/OeNbMO) demo.
