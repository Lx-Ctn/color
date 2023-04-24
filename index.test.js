import Color from "./index.js";

describe("undefined parameters", () => {
	test("undefined constructor parameters", () => {
		const color = new Color();
		expect(color.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(color.toRgb()).toBe("rgb(255, 0, 0)");
		expect(color.toHex()).toBe("#ff0000");
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(100);
		expect(color.light).toBe(50);
		expect(color.alpha).toBe(100);
		expect(color.hueOffset).toBe(0);
		expect(color.saturationOffset).toBe(0);
		expect(color.lightOffset).toBe(0);
		expect(color.alphaOffset).toBe(0);
	});

	test("undefined hue assignment", () => {
		const red = new Color();
		red.hue = undefined;
		expect(red.hue).toBe(0);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(240);
		blue.hue = undefined;
		expect(blue.hue).toBe(240);
		expect(blue.toHsl()).toBe("hsl(240, 100%, 50%)");
		expect(blue.toRgb()).toBe("rgb(0, 0, 255)");
		expect(blue.toHex()).toBe("#0000ff");
	});

	test("undefined saturation assignment", () => {
		const red = new Color();
		red.saturation = undefined;
		expect(red.saturation).toBe(100);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(240, 57);
		blue.saturation = undefined;
		expect(blue.saturation).toBe(57);
		expect(blue.toHsl()).toBe("hsl(240, 57%, 50%)");
	});

	test("undefined light assignment", () => {
		const red = new Color();
		red.light = undefined;
		expect(red.light).toBe(50);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(240, null, 57);
		blue.light = undefined;
		expect(blue.light).toBe(57);
		expect(blue.toHsl()).toBe("hsl(240, 100%, 57%)");
	});

	test("undefined alpha assignment", () => {
		const red = new Color();
		red.alpha = undefined;
		expect(red.alpha).toBe(100);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(240, null, null, 57);
		blue.alpha = undefined;
		expect(blue.alpha).toBe(57);
		expect(blue.toHsl()).toBe("hsla(240, 100%, 50%, 57%)");
	});
});

test("others", () => {
	let color = new Color(23);
	expect(color.toHsl()).toBe("hsl(23, 100%, 50%)");

	color = new Color(56.8);
	expect(color.toHsl()).toBe("hsl(56.8, 100%, 50%)");

	color = new Color(56.89);
	expect(color.toHsl()).toBe("hsl(56.9, 100%, 50%)");

	color = new Color(56.893345, 99.99, 49.99, 99.99);
	expect(color.toHsl()).toBe("hsl(56.9, 100%, 50%)");
});

/* 
hue 
   negatif
   0 
   int
   float
   360
   > 360
   null
   undefined
   Object color
   CSS string
   other string
   boolean
   other object

saturation 
   negatif
   0 
   int
   float
   100
   > 100
   null
   undefined
   string
   boolean
   object

idem light 
idem alpha

*/
