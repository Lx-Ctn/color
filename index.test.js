import Color from "./index.js";

function allDefaultParamTest(color) {
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
}

describe("undefined parameters", () => {
	test("Should have all default value with undefined constructor parameters", () => {
		const color = new Color();
		allDefaultParamTest(color);
	});

	test("undefined hue assignment should be ignored", () => {
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

	test("undefined saturation assignment should be ignored", () => {
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

	test("undefined light assignment should be ignored", () => {
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

	test("undefined alpha assignment should be ignored", () => {
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

	test("undefined hueOffset assignment should be ignored", () => {
		const red = new Color();
		red.hueOffset = undefined;
		expect(red.hueOffset).toBe(0);
		expect(red.hue).toBe(0);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(red);
		blue.hueOffset = 240;
		expect(blue.hueOffset).toBe(240);
		expect(blue.hue).toBe(240);
		expect(blue.toHsl()).toBe("hsl(240, 100%, 50%)");

		blue.hueOffset = undefined;
		expect(blue.hueOffset).toBe(240);
		expect(blue.hue).toBe(240);
		expect(blue.toHsl()).toBe("hsl(240, 100%, 50%)");
	});

	test("undefined saturationOffset assignment should be ignored", () => {
		const red = new Color();
		red.saturationOffset = undefined;
		expect(red.saturationOffset).toBe(0);
		expect(red.saturation).toBe(100);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(red);
		blue.saturationOffset = -20;
		expect(blue.saturationOffset).toBe(-20);
		expect(blue.saturation).toBe(80);
		expect(blue.toHsl()).toBe("hsl(0, 80%, 50%)");

		blue.saturationOffset = undefined;
		expect(blue.saturationOffset).toBe(-20);
		expect(blue.saturation).toBe(80);
		expect(blue.toHsl()).toBe("hsl(0, 80%, 50%)");
	});

	test("undefined lightOffset assignment should be ignored", () => {
		const red = new Color();
		red.lightOffset = undefined;
		expect(red.lightOffset).toBe(0);
		expect(red.light).toBe(50);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(red);
		blue.lightOffset = 20;
		expect(blue.lightOffset).toBe(20);
		expect(blue.light).toBe(70);
		expect(blue.toHsl()).toBe("hsl(0, 100%, 70%)");

		blue.lightOffset = undefined;
		expect(blue.lightOffset).toBe(20);
		expect(blue.light).toBe(70);
		expect(blue.toHsl()).toBe("hsl(0, 100%, 70%)");
	});

	test("undefined alphaOffset assignment should be ignored", () => {
		const red = new Color();
		red.alphaOffset = undefined;
		expect(red.alphaOffset).toBe(0);
		expect(red.alpha).toBe(100);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(red);
		blue.alphaOffset = -30;
		expect(blue.alphaOffset).toBe(-30);
		expect(blue.alpha).toBe(70);
		expect(blue.toHsl()).toBe("hsla(0, 100%, 50%, 70%)");

		blue.alphaOffset = undefined;
		expect(blue.alphaOffset).toBe(-30);
		expect(blue.alpha).toBe(70);
		expect(blue.toHsl()).toBe("hsla(0, 100%, 50%, 70%)");
	});
});

describe("null parameters", () => {
	test("Should have default value with null constructor parameters", () => {
		let color = new Color(null);
		allDefaultParamTest(color);

		color = new Color(null, null);
		allDefaultParamTest(color);
		color = new Color(0, null);
		allDefaultParamTest(color);
		color = new Color(null, 100);
		allDefaultParamTest(color);

		color = new Color(null, null, null);
		allDefaultParamTest(color);
		color = new Color(null, 100, null);
		allDefaultParamTest(color);
		color = new Color(null, null, 50);
		allDefaultParamTest(color);

		color = new Color(null, null, null, null);
		allDefaultParamTest(color);
		color = new Color(null, null, 50, null);
		allDefaultParamTest(color);
		color = new Color(null, null, null, 50);
		expect(color.toHsl()).toBe("hsla(0, 100%, 50%, 50%)");
		expect(color.toRgb()).toBe("rgba(255, 0, 0, 0.5)");
		expect(color.toHex()).toBe("#ff000080");
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(100);
		expect(color.light).toBe(50);
		expect(color.alpha).toBe(50);
		expect(color.hueOffset).toBe(0);
		expect(color.saturationOffset).toBe(0);
		expect(color.lightOffset).toBe(0);
		expect(color.alphaOffset).toBe(0);

		color = new Color(null, null, null, null, null);
		allDefaultParamTest(color);
	});

	test("null hue assignment should be ignored", () => {
		const red = new Color();
		red.hue = null;
		expect(red.hue).toBe(0);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(240);
		blue.hue = null;
		expect(blue.hue).toBe(240);
		expect(blue.toHsl()).toBe("hsl(240, 100%, 50%)");
		expect(blue.toRgb()).toBe("rgb(0, 0, 255)");
		expect(blue.toHex()).toBe("#0000ff");
	});

	test("null saturation assignment should be ignored", () => {
		const red = new Color();
		red.saturation = null;
		expect(red.saturation).toBe(100);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(240, 57);
		blue.saturation = null;
		expect(blue.saturation).toBe(57);
		expect(blue.toHsl()).toBe("hsl(240, 57%, 50%)");
	});

	test("null light assignment should be ignored", () => {
		const red = new Color();
		red.light = null;
		expect(red.light).toBe(50);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(240, null, 57);
		blue.light = null;
		expect(blue.light).toBe(57);
		expect(blue.toHsl()).toBe("hsl(240, 100%, 57%)");
	});

	test("null alpha assignment should be ignored", () => {
		const red = new Color();
		red.alpha = null;
		expect(red.alpha).toBe(100);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(240, null, null, 57);
		blue.alpha = null;
		expect(blue.alpha).toBe(57);
		expect(blue.toHsl()).toBe("hsla(240, 100%, 50%, 57%)");
	});

	test("null hueOffset assignment should be ignored", () => {
		const red = new Color();
		red.hueOffset = null;
		expect(red.hueOffset).toBe(0);
		expect(red.hue).toBe(0);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(red);
		blue.hueOffset = 240;
		expect(blue.hueOffset).toBe(240);
		expect(blue.hue).toBe(240);
		expect(blue.toHsl()).toBe("hsl(240, 100%, 50%)");

		blue.hueOffset = null;
		expect(blue.hueOffset).toBe(240);
		expect(blue.hue).toBe(240);
		expect(blue.toHsl()).toBe("hsl(240, 100%, 50%)");
	});

	test("null saturationOffset assignment should be ignored", () => {
		const red = new Color();
		red.saturationOffset = null;
		expect(red.saturationOffset).toBe(0);
		expect(red.saturation).toBe(100);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(red);
		blue.saturationOffset = -20;
		expect(blue.saturationOffset).toBe(-20);
		expect(blue.saturation).toBe(80);
		expect(blue.toHsl()).toBe("hsl(0, 80%, 50%)");

		blue.saturationOffset = null;
		expect(blue.saturationOffset).toBe(-20);
		expect(blue.saturation).toBe(80);
		expect(blue.toHsl()).toBe("hsl(0, 80%, 50%)");
	});

	test("null lightOffset assignment should be ignored", () => {
		const red = new Color();
		red.lightOffset = null;
		expect(red.lightOffset).toBe(0);
		expect(red.light).toBe(50);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(red);
		blue.lightOffset = 20;
		expect(blue.lightOffset).toBe(20);
		expect(blue.light).toBe(70);
		expect(blue.toHsl()).toBe("hsl(0, 100%, 70%)");

		blue.lightOffset = null;
		expect(blue.lightOffset).toBe(20);
		expect(blue.light).toBe(70);
		expect(blue.toHsl()).toBe("hsl(0, 100%, 70%)");
	});

	test("null alphaOffset assignment should be ignored", () => {
		const red = new Color();
		red.alphaOffset = null;
		expect(red.alphaOffset).toBe(0);
		expect(red.alpha).toBe(100);
		expect(red.toHsl()).toBe("hsl(0, 100%, 50%)");
		expect(red.toRgb()).toBe("rgb(255, 0, 0)");
		expect(red.toHex()).toBe("#ff0000");

		const blue = new Color(red);
		blue.alphaOffset = -30;
		expect(blue.alphaOffset).toBe(-30);
		expect(blue.alpha).toBe(70);
		expect(blue.toHsl()).toBe("hsla(0, 100%, 50%, 70%)");

		blue.alphaOffset = null;
		expect(blue.alphaOffset).toBe(-30);
		expect(blue.alpha).toBe(70);
		expect(blue.toHsl()).toBe("hsla(0, 100%, 50%, 70%)");
	});
});

describe("hue number value", () => {
	test("hue default value should be 0", () => {
		const color = new Color();
		expect(color.hue).toBe(0);
	});

	test("hue value between 0 and 360 should be the same", () => {
		// Constructor
		let color = new Color(10);
		expect(color.hue).toBe(10);
		color = new Color(57);
		expect(color.hue).toBe(57);
		color = new Color(340);
		expect(color.hue).toBe(340);

		// Property
		color.hue = 12;
		expect(color.hue).toBe(12);
		color.hue = 234;
		expect(color.hue).toBe(234);
	});

	test("precision for hue value allowed 1 decimal", () => {
		// Constructor
		let color = new Color(56.8);
		expect(color.hue).toBe(56.8);
		color = new Color(56.89);
		expect(color.hue).toBe(56.9);
		color = new Color(56.54321);
		expect(color.hue).toBe(56.5);

		// Property
		color.hue = 56.8;
		expect(color.hue).toBe(56.8);
		color.hue = 56.89;
		expect(color.hue).toBe(56.9);
		color.hue = 56.54321;
		expect(color.hue).toBe(56.5);
	});

	test("hue value at 0 and 360 should be 0", () => {
		// Constructor
		let color = new Color(0);
		expect(color.hue).toBe(0);
		color = new Color(360);
		expect(color.hue).toBe(0);
		color = new Color(0.01);
		expect(color.hue).toBe(0);
		color = new Color(359.9);
		expect(color.hue).toBe(359.9);
		color = new Color(359.99);
		expect(color.hue).toBe(0);

		// Property
		color.hue = 0;
		expect(color.hue).toBe(0);
		color.hue = 360;
		expect(color.hue).toBe(0);
		color.hue = 0.01;
		expect(color.hue).toBe(0);
		color.hue = 359.9;
		expect(color.hue).toBe(359.9);
		color.hue = 359.99;
		expect(color.hue).toBe(0);
	});

	test("negative hue value should work and be set back on the color wheel", () => {
		// Constructor
		let color = new Color(-10);
		expect(color.hue).toBe(350); // 360 - 10
		color = new Color(-300);
		expect(color.hue).toBe(60);
		color = new Color(-0);
		expect(color.hue).toBe(0);
		color = new Color(-360);
		expect(color.hue).toBe(0);
		color = new Color(-3660);
		expect(color.hue).toBe(300);
		color = new Color(-360.1);
		expect(color.hue).toBe(359.9);
		color = new Color(-359.99);
		expect(color.hue).toBe(0);

		// Property
		color.hue = -10;
		expect(color.hue).toBe(350);
		color.hue = -300;
		expect(color.hue).toBe(60);
		color.hue = -0;
		expect(color.hue).toBe(0);
		color.hue = -360;
		expect(color.hue).toBe(0);
		color.hue = -3660;
		expect(color.hue).toBe(300);
		color.hue = -360.1;
		expect(color.hue).toBe(359.9);
		color.hue = -359.99;
		expect(color.hue).toBe(0);
	});

	test("hue value over 360 should work and be set back on the color wheel", () => {
		// Constructor
		let color = new Color(361);
		expect(color.hue).toBe(1);
		color = new Color(3600);
		expect(color.hue).toBe(0);
		color = new Color(3660);
		expect(color.hue).toBe(60);
		color = new Color(360.1);
		expect(color.hue).toBe(0.1);
		color = new Color(360.09);
		expect(color.hue).toBe(0.1);

		// Property
		color.hue = 361;
		expect(color.hue).toBe(1);
		color.hue = 3600;
		expect(color.hue).toBe(0);
		color.hue = 3660;
		expect(color.hue).toBe(60);
		color.hue = 360.1;
		expect(color.hue).toBe(0.1);
		color.hue = 360.09;
		expect(color.hue).toBe(0.1);
	});

	test("wrong hue type should throw error", () => {
		const checkDocsMessage = "Check docs at https://github.com/Lx-Ctn/color/#properties- to know more.";
		const wrongStringMessage = `Argument must be a valid CSS string.
${checkDocsMessage}`;
		const wrongTypeMessage =
			type => `The hue argument is a ${type}, but a number, a CSS string, or a Color object was expected
${checkDocsMessage}`;

		// Constructor
		const getNewColor = arg => {
			new Color(arg);
		};
		expect(() => getNewColor("toto")).toThrow(new Error(wrongStringMessage));
		expect(() => getNewColor("#zer")).toThrow(new Error(wrongStringMessage));
		expect(() => getNewColor(true)).toThrow(new Error(wrongTypeMessage("boolean")));
		expect(() => getNewColor(false)).toThrow(new Error(wrongTypeMessage("boolean")));
		expect(() => getNewColor({})).toThrow(new Error(wrongTypeMessage("object")));
		expect(() => getNewColor([])).toThrow(new Error(wrongTypeMessage("object")));
		expect(() => getNewColor(() => "")).toThrow(new Error(wrongTypeMessage("function")));
	});
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
