import Color, { getErrorMessage } from "./index.js";

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

	test("hue value is NaN", () => {
		// Constructor
		const getNan = arg => new Color(NaN);
		expect(getNan).toThrow(new Error(getErrorMessage.argumentIsNaN("0")));

		// Property
		const color = new Color();
		const propNaN = prop => (color.hue = NaN);
		expect(propNaN).toThrow(new Error(getErrorMessage.propertyIsNaN("hue")));
	});

	test("wrong hue type should throw error", () => {
		console.log(getErrorMessage);
		// Constructor
		const getNewColor = arg => {
			new Color(arg);
		};
		expect(() => getNewColor("toto")).toThrow(new Error(getErrorMessage.stringArgument("toto")));
		expect(() => getNewColor("#zer")).toThrow(new Error(getErrorMessage.stringArgument("#zer")));
		expect(() => getNewColor(true)).toThrow(new Error(getErrorMessage.argument("0", true)));
		expect(() => getNewColor(false)).toThrow(new Error(getErrorMessage.argument("0", false)));
		expect(() => getNewColor({})).toThrow(new Error(getErrorMessage.argument("0", {})));
		expect(() => getNewColor([])).toThrow(new Error(getErrorMessage.argument("0", [])));
		expect(() => getNewColor(() => "")).toThrow(new Error(getErrorMessage.argument("0", () => "")));

		// Property
		const color = new Color();
		const changeHueProp = prop => {
			color.hue = prop;
		};
		expect(() => changeHueProp("toto")).toThrow(new Error(getErrorMessage.property("hue", "toto")));
		expect(() => changeHueProp("#zer")).toThrow(new Error(getErrorMessage.property("hue", "#zer")));
		expect(() => changeHueProp(true)).toThrow(new Error(getErrorMessage.property("hue", true)));
		expect(() => changeHueProp(false)).toThrow(new Error(getErrorMessage.property("hue", false)));
		expect(() => changeHueProp({})).toThrow(new Error(getErrorMessage.property("hue", {})));
		expect(() => changeHueProp([])).toThrow(new Error(getErrorMessage.property("hue", [])));
		expect(() => changeHueProp(() => "")).toThrow(new Error(getErrorMessage.property("hue", () => "")));
	});
});

describe("saturation number value", () => {
	test("saturation default value should be 100", () => {
		const color = new Color();
		expect(color.saturation).toBe(100);
	});

	test("saturation value between 0 and 100 should be the same", () => {
		// Constructor
		let color = new Color(null, 0);
		expect(color.saturation).toBe(0);
		color = new Color(null, 100);
		expect(color.saturation).toBe(100);
		color = new Color(null, 57);
		expect(color.saturation).toBe(57);

		// Property
		color.saturation = 0;
		expect(color.saturation).toBe(0);
		color.saturation = 100;
		expect(color.saturation).toBe(100);
		color.saturation = 57;
		expect(color.saturation).toBe(57);
	});

	test("precision for saturation value allowed 1 decimal", () => {
		// Constructor
		let color = new Color(null, 56.8);
		expect(color.saturation).toBe(56.8);
		color = new Color(null, 56.89);
		expect(color.saturation).toBe(56.9);
		color = new Color(null, 56.54321);
		expect(color.saturation).toBe(56.5);
		color = new Color(null, 0.01);
		expect(color.saturation).toBe(0);
		color = new Color(null, 99.99);
		expect(color.saturation).toBe(100);

		// Property
		color.saturation = 56.8;
		expect(color.saturation).toBe(56.8);
		color.saturation = 56.89;
		expect(color.saturation).toBe(56.9);
		color.saturation = 56.54321;
		expect(color.saturation).toBe(56.5);
		color.saturation = 0.01;
		expect(color.saturation).toBe(0);
		color.saturation = 99.99;
		expect(color.saturation).toBe(100);
	});

	test("negative saturation value should work and be set to 0", () => {
		// Constructor
		let color = new Color(null, -10);
		expect(color.saturation).toBe(0);
		color = new Color(null, -0);
		expect(color.saturation).toBe(0);
		color = new Color(null, -999999);
		expect(color.saturation).toBe(0);
		color = new Color(null, -0.1);
		expect(color.saturation).toBe(0);
		color = new Color(null, -0.99);
		expect(color.saturation).toBe(0);

		// Property
		color.saturation = -10;
		expect(color.saturation).toBe(0);
		color.saturation = -0;
		expect(color.saturation).toBe(0);
		color.saturation = -999999;
		expect(color.saturation).toBe(0);
		color.saturation = -0.1;
		expect(color.saturation).toBe(0);
		color.saturation = -0.99;
		expect(color.saturation).toBe(0);
	});

	test("saturation value over 100 should work and be set back to 100", () => {
		// Constructor
		let color = new Color(null, 361);
		expect(color.saturation).toBe(100);
		color = new Color(null, 999999);
		expect(color.saturation).toBe(100);
		color = new Color(null, 360.1);
		expect(color.saturation).toBe(100);
		color = new Color(null, 360.09);
		expect(color.saturation).toBe(100);

		// Property
		color.saturation = 361;
		expect(color.saturation).toBe(100);
		color.saturation = 999999;
		expect(color.saturation).toBe(100);
		color.saturation = 360.1;
		expect(color.saturation).toBe(100);
		color.saturation = 360.09;
		expect(color.saturation).toBe(100);
	});

	test("saturation value is NaN", () => {
		// Constructor
		const getNan = arg => new Color(0, NaN);
		expect(getNan).toThrow(new Error(getErrorMessage.argumentIsNaN("1")));

		// Property
		const color = new Color();
		const propNaN = prop => (color.saturation = NaN);
		expect(propNaN).toThrow(new Error(getErrorMessage.propertyIsNaN("saturation")));
	});

	test("wrong saturation type should throw error", () => {
		// Constructor
		const getNewColor = arg => {
			new Color(null, arg);
		};
		expect(() => getNewColor("toto")).toThrow(new Error(getErrorMessage.argument("1", "toto")));
		expect(() => getNewColor(true)).toThrow(new Error(getErrorMessage.argument("1", true)));
		expect(() => getNewColor(false)).toThrow(new Error(getErrorMessage.argument("1", false)));
		expect(() => getNewColor({})).toThrow(new Error(getErrorMessage.argument("1", {})));
		expect(() => getNewColor([])).toThrow(new Error(getErrorMessage.argument("1", [])));
		expect(() => getNewColor(() => "")).toThrow(new Error(getErrorMessage.argument("1", () => "")));

		// Property
		const color = new Color();
		const changeSatProp = prop => {
			color.saturation = prop;
		};
		expect(() => changeSatProp("toto")).toThrow(new Error(getErrorMessage.property("saturation", "toto")));
		expect(() => changeSatProp(true)).toThrow(new Error(getErrorMessage.property("saturation", true)));
		expect(() => changeSatProp(false)).toThrow(new Error(getErrorMessage.property("saturation", false)));
		expect(() => changeSatProp({})).toThrow(new Error(getErrorMessage.property("saturation", {})));
		expect(() => changeSatProp([])).toThrow(new Error(getErrorMessage.property("saturation", [])));
		expect(() => changeSatProp(() => "")).toThrow(new Error(getErrorMessage.property("saturation", () => "")));
	});
});

describe("light number value", () => {
	test("light default value should be 100", () => {
		const color = new Color();
		expect(color.light).toBe(50);
	});

	test("light value between 0 and 100 should be the same", () => {
		// Constructor
		let color = new Color(null, null, 0);
		expect(color.light).toBe(0);
		color = new Color(null, null, 100);
		expect(color.light).toBe(100);
		color = new Color(null, null, 57);
		expect(color.light).toBe(57);

		// Property
		color.light = 0;
		expect(color.light).toBe(0);
		color.light = 100;
		expect(color.light).toBe(100);
		color.light = 57;
		expect(color.light).toBe(57);
	});

	test("precision for light value allowed 1 decimal", () => {
		// Constructor
		let color = new Color(null, null, 56.8);
		expect(color.light).toBe(56.8);
		color = new Color(null, null, 56.89);
		expect(color.light).toBe(56.9);
		color = new Color(null, null, 56.54321);
		expect(color.light).toBe(56.5);
		color = new Color(null, null, 0.01);
		expect(color.light).toBe(0);
		color = new Color(null, null, 99.99);
		expect(color.light).toBe(100);

		// Property
		color.light = 56.8;
		expect(color.light).toBe(56.8);
		color.light = 56.89;
		expect(color.light).toBe(56.9);
		color.light = 56.54321;
		expect(color.light).toBe(56.5);
		color.light = 0.01;
		expect(color.light).toBe(0);
		color.light = 99.99;
		expect(color.light).toBe(100);
	});

	test("negative light value should work and be set to 0", () => {
		// Constructor
		let color = new Color(null, null, -10);
		expect(color.light).toBe(0);
		color = new Color(null, null, -0);
		expect(color.light).toBe(0);
		color = new Color(null, null, -999999);
		expect(color.light).toBe(0);
		color = new Color(null, null, -0.1);
		expect(color.light).toBe(0);
		color = new Color(null, null, -0.99);
		expect(color.light).toBe(0);

		// Property
		color.light = -10;
		expect(color.light).toBe(0);
		color.light = -0;
		expect(color.light).toBe(0);
		color.light = -999999;
		expect(color.light).toBe(0);
		color.light = -0.1;
		expect(color.light).toBe(0);
		color.light = -0.99;
		expect(color.light).toBe(0);
	});

	test("light value over 100 should work and be set back to 100", () => {
		// Constructor
		let color = new Color(null, null, 361);
		expect(color.light).toBe(100);
		color = new Color(null, null, 999999);
		expect(color.light).toBe(100);
		color = new Color(null, null, 360.1);
		expect(color.light).toBe(100);
		color = new Color(null, null, 360.09);
		expect(color.light).toBe(100);

		// Property
		color.light = 361;
		expect(color.light).toBe(100);
		color.light = 999999;
		expect(color.light).toBe(100);
		color.light = 360.1;
		expect(color.light).toBe(100);
		color.light = 360.09;
		expect(color.light).toBe(100);
	});

	test("light value is NaN", () => {
		// Constructor
		const getNan = arg => new Color(0, 100, NaN);
		expect(getNan).toThrow(new Error(getErrorMessage.argumentIsNaN("2")));

		// Property
		const color = new Color();
		const propNaN = prop => (color.light = NaN);
		expect(propNaN).toThrow(new Error(getErrorMessage.propertyIsNaN("light")));
	});

	test("wrong light type should throw error", () => {
		// Constructor
		const getNewColor = arg => {
			new Color(null, null, arg);
		};
		expect(() => getNewColor("toto")).toThrow(new Error(getErrorMessage.argument("2", "toto")));
		expect(() => getNewColor(true)).toThrow(new Error(getErrorMessage.argument("2", true)));
		expect(() => getNewColor(false)).toThrow(new Error(getErrorMessage.argument("2", false)));
		expect(() => getNewColor({})).toThrow(new Error(getErrorMessage.argument("2", {})));
		expect(() => getNewColor([])).toThrow(new Error(getErrorMessage.argument("2", [])));
		expect(() => getNewColor(() => "")).toThrow(new Error(getErrorMessage.argument("2", () => "")));

		// Property
		const color = new Color();
		const changeLightProp = prop => {
			color.light = prop;
		};
		expect(() => changeLightProp("toto")).toThrow(new Error(getErrorMessage.property("light", "toto")));
		expect(() => changeLightProp(true)).toThrow(new Error(getErrorMessage.property("light", true)));
		expect(() => changeLightProp(false)).toThrow(new Error(getErrorMessage.property("light", false)));
		expect(() => changeLightProp({})).toThrow(new Error(getErrorMessage.property("light", {})));
		expect(() => changeLightProp([])).toThrow(new Error(getErrorMessage.property("light", [])));
		expect(() => changeLightProp(() => "")).toThrow(new Error(getErrorMessage.property("light", () => "")));
	});
});

describe("alpha number value", () => {
	test("alpha default value should be 100", () => {
		const color = new Color();
		expect(color.alpha).toBe(100);
	});

	test("alpha value between 0 and 100 should be the same", () => {
		// Constructor
		let color = new Color(null, null, null, 0);
		expect(color.alpha).toBe(0);
		color = new Color(null, null, null, 100);
		expect(color.alpha).toBe(100);
		color = new Color(null, null, null, 57);
		expect(color.alpha).toBe(57);

		// Property
		color.alpha = 0;
		expect(color.alpha).toBe(0);
		color.alpha = 100;
		expect(color.alpha).toBe(100);
		color.alpha = 57;
		expect(color.alpha).toBe(57);
	});

	test("precision for alpha value allowed 1 decimal", () => {
		// Constructor
		let color = new Color(null, null, null, 56.8);
		expect(color.alpha).toBe(56.8);
		color = new Color(null, null, null, 56.89);
		expect(color.alpha).toBe(56.9);
		color = new Color(null, null, null, 56.54321);
		expect(color.alpha).toBe(56.5);
		color = new Color(null, null, null, 0.01);
		expect(color.alpha).toBe(0);
		color = new Color(null, null, null, 99.99);
		expect(color.alpha).toBe(100);

		// Property
		color.alpha = 56.8;
		expect(color.alpha).toBe(56.8);
		color.alpha = 56.89;
		expect(color.alpha).toBe(56.9);
		color.alpha = 56.54321;
		expect(color.alpha).toBe(56.5);
		color.alpha = 0.01;
		expect(color.alpha).toBe(0);
		color.alpha = 99.99;
		expect(color.alpha).toBe(100);
	});

	test("negative alpha value should work and be set to 0", () => {
		// Constructor
		let color = new Color(null, null, null, -10);
		expect(color.alpha).toBe(0);
		color = new Color(null, null, null, -0);
		expect(color.alpha).toBe(0);
		color = new Color(null, null, null, -999999);
		expect(color.alpha).toBe(0);
		color = new Color(null, null, null, -0.1);
		expect(color.alpha).toBe(0);
		color = new Color(null, null, null, -0.99);
		expect(color.alpha).toBe(0);

		// Property
		color.alpha = -10;
		expect(color.alpha).toBe(0);
		color.alpha = -0;
		expect(color.alpha).toBe(0);
		color.alpha = -999999;
		expect(color.alpha).toBe(0);
		color.alpha = -0.1;
		expect(color.alpha).toBe(0);
		color.alpha = -0.99;
		expect(color.alpha).toBe(0);
	});

	test("alpha value over 100 should work and be set back to 100", () => {
		// Constructor
		let color = new Color(null, null, null, 361);
		expect(color.alpha).toBe(100);
		color = new Color(null, null, null, 999999);
		expect(color.alpha).toBe(100);
		color = new Color(null, null, null, 360.1);
		expect(color.alpha).toBe(100);
		color = new Color(null, null, null, 360.09);
		expect(color.alpha).toBe(100);

		// Property
		color.alpha = 361;
		expect(color.alpha).toBe(100);
		color.alpha = 999999;
		expect(color.alpha).toBe(100);
		color.alpha = 360.1;
		expect(color.alpha).toBe(100);
		color.alpha = 360.09;
		expect(color.alpha).toBe(100);
	});

	test("alpha value is NaN", () => {
		// Constructor
		const getNan = arg => new Color(0, 100, 50, NaN);
		expect(getNan).toThrow(new Error(getErrorMessage.argumentIsNaN("3")));

		// Property
		const color = new Color();
		const propNaN = prop => (color.alpha = NaN);
		expect(propNaN).toThrow(new Error(getErrorMessage.propertyIsNaN("alpha")));
	});

	test("wrong alpha type should throw error", () => {
		// Constructor
		const getNewColor = arg => {
			new Color(null, null, null, arg);
		};
		expect(() => getNewColor("toto")).toThrow(new Error(getErrorMessage.argument("3", "toto")));
		expect(() => getNewColor(true)).toThrow(new Error(getErrorMessage.argument("3", true)));
		expect(() => getNewColor(false)).toThrow(new Error(getErrorMessage.argument("3", false)));
		expect(() => getNewColor({})).toThrow(new Error(getErrorMessage.argument("3", {})));
		expect(() => getNewColor([])).toThrow(new Error(getErrorMessage.argument("3", [])));
		expect(() => getNewColor(() => "")).toThrow(new Error(getErrorMessage.argument("3", () => "")));

		// Property
		const color = new Color();
		const changeAlphaProp = prop => {
			color.alpha = prop;
		};
		expect(() => changeAlphaProp("toto")).toThrow(new Error(getErrorMessage.property("alpha", "toto")));
		expect(() => changeAlphaProp(true)).toThrow(new Error(getErrorMessage.property("alpha", true)));
		expect(() => changeAlphaProp(false)).toThrow(new Error(getErrorMessage.property("alpha", false)));
		expect(() => changeAlphaProp({})).toThrow(new Error(getErrorMessage.property("alpha", {})));
		expect(() => changeAlphaProp([])).toThrow(new Error(getErrorMessage.property("alpha", [])));
		expect(() => changeAlphaProp(() => "")).toThrow(new Error(getErrorMessage.property("alpha", () => "")));
	});
});

describe("color from CSS Hexa color string", () => {
	test("#RGB syntax", () => {
		// Constructor
		let color = new Color("#fff");
		expect(color.toHex()).toBe("#ffffff");
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(0);
		expect(color.light).toBe(100);
		expect(color.alpha).toBe(100);

		color = new Color("#000");
		expect(color.toHex()).toBe("#000000");
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(0);
		expect(color.light).toBe(0);
		expect(color.alpha).toBe(100);

		color = new Color("#f00");
		expect(color.toHex()).toBe("#ff0000");
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(100);
		expect(color.light).toBe(50);

		color = new Color("#2C5");
		expect(color.toHex()).toBe("#22cc55");
		color = new Color("#b3A");
		expect(color.toHex()).toBe("#bb33aa");
	});

	test("#RRGGBB syntax", () => {
		// Constructor
		let color = new Color("#ffffff");
		expect(color.toHex()).toBe("#ffffff");
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(0);
		expect(color.light).toBe(100);
		expect(color.alpha).toBe(100);

		color = new Color("#000000");
		expect(color.toHex()).toBe("#000000");
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(0);
		expect(color.light).toBe(0);
		expect(color.alpha).toBe(100);

		color = new Color("#ff0000");
		expect(color.toHex()).toBe("#ff0000");
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(100);
		expect(color.light).toBe(50);

		color = new Color("#2f3c5b");
		expect(color.toHex()).toBe("#2f3c5b");
		color = new Color("#123456");
		expect(color.toHex()).toBe("#123456");
	});

	test("#RGBA syntax", () => {
		// Constructor
		let color = new Color("#ffff");
		expect(color.toHex()).toBe("#ffffff"); // 100% alpha is ignored
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(0);
		expect(color.light).toBe(100);
		expect(color.alpha).toBe(100);

		color = new Color("#0000");
		expect(color.toHex()).toBe("#00000000");
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(0);
		expect(color.light).toBe(0);
		expect(color.alpha).toBe(0);

		color = new Color("#f000");
		expect(color.toHex()).toBe("#ff000000");
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(100);
		expect(color.light).toBe(50);
		expect(color.alpha).toBe(0);

		color = new Color("#2C5c");
		expect(color.toHex()).toBe("#22cc55cc");
		color = new Color("#b3A6");
		expect(color.toHex()).toBe("#bb33aa66");
	});

	test("#RRGGBBAA syntax", () => {
		// Constructor
		let color = new Color("#ffffffff");
		expect(color.toHex()).toBe("#ffffff"); // 100% alpha is ignored
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(0);
		expect(color.light).toBe(100);
		expect(color.alpha).toBe(100);

		color = new Color("#00000000");
		expect(color.toHex()).toBe("#00000000");
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(0);
		expect(color.light).toBe(0);
		expect(color.alpha).toBe(0);

		color = new Color("#ff000000");
		expect(color.toHex()).toBe("#ff000000");
		expect(color.hue).toBe(0);
		expect(color.saturation).toBe(100);
		expect(color.light).toBe(50);
		expect(color.alpha).toBe(0);

		color = new Color("#2f3c5b4d");
		expect(color.toHex()).toBe("#2f3c5b4d");
		color = new Color("#12345678");
		expect(color.toHex()).toBe("#12345678");
	});

	test("CSS hexa color string argument should be case insensible", () => {
		let color = new Color("#fff");
		expect(color.toHex()).toBe("#ffffff");
		color = new Color("#FFF");
		expect(color.toHex()).toBe("#ffffff");
		color = new Color("#fFf");
		expect(color.toHex()).toBe("#ffffff");
		color = new Color("#AbCdEfaB");
		expect(color.toHex()).toBe("#abcdefab");
	});

	test("must be a valid css haxe string or throw error", () => {
		// Constructor
		const getNewColor = arg => {
			new Color(arg);
		};
		expect(() => getNewColor("toto")).toThrow(new Error(getErrorMessage.stringArgument("toto")));
		expect(() => getNewColor("#")).toThrow(new Error(getErrorMessage.stringArgument("#")));
		expect(() => getNewColor("#red")).toThrow(new Error(getErrorMessage.stringArgument("#red")));
		expect(() => getNewColor("#ff")).toThrow(new Error(getErrorMessage.stringArgument("#ff")));
		expect(() => getNewColor("#ff34vv")).toThrow(new Error(getErrorMessage.stringArgument("#ff34vv")));
	});
});

describe.skip("color from Color", () => {
	test("child with Color parent should inherit parent color properties", () => {
		const parent = new Color(10, 10, 10, 10);
		const child = new Color(parent);
		expect(child.hue).toBe(10);
		expect(child.saturation).toBe(10);
		expect(child.light).toBe(10);
		expect(child.alpha).toBe(10);
	});

	test("if parent change, child should inherit changes", () => {
		let parent = new Color(10, 10, 10, 10);
		const child = new Color(parent);
		parent.hue = 20;
		parent.saturation = 20;
		parent.light = 20;
		parent.alpha = 20;
		expect(child.hue).toBe(20);
		expect(child.saturation).toBe(20);
		expect(child.light).toBe(20);
		expect(child.alpha).toBe(20);
		parent.hue = 54.99;
		parent.saturation = 54.99;
		parent.light = 54.99;
		parent.alpha = 54.99;
		expect(child.hue).toBe(55);
		expect(child.saturation).toBe(55);
		expect(child.light).toBe(55);
		expect(child.alpha).toBe(55);
	});

	test("if direct property is setted, parent property is ignored", () => {
		let parent = new Color(10, 10, 10, 10);
		const child = new Color(parent, 20, 20, 20);
		child.hueOffset = 20;
		expect(child.hue).toBe(30);
		expect(child.saturation).toBe(30);
		expect(child.light).toBe(30);
		expect(child.alpha).toBe(30);
		child.hue = 20;
		child.saturation = 20;
		child.light = 20;
		child.alpha = 20;
		expect(child.hue).toBe(20);
		expect(child.saturation).toBe(20);
		expect(child.light).toBe(20);
		expect(child.alpha).toBe(20);
	});
});

describe("hueOffset", () => {
	test("hueOffset default value should be 0", () => {
		const parent = new Color();
		expect(parent.hueOffset).toBe(0);

		const child = new Color(parent);
		expect(child.hueOffset).toBe(0);
	});

	describe("if hueOffset is a number : child.hue should be parent.hue + hueOffset", () => {
		test("with positive hueOffset", () => {
			const parent = new Color();
			const child = new Color(parent);
			child.hueOffset = 0;
			expect(child.hue).toBe(0);
			child.hueOffset = 10;
			expect(child.hue).toBe(10);
			child.hueOffset = +10;
			expect(child.hue).toBe(10);
			child.hueOffset = 360;
			expect(child.hue).toBe(0);
			child.hueOffset = 3600;
			expect(child.hue).toBe(0);
		});

		test("with negative number hueOffset", () => {
			const parent = new Color();
			const child = new Color(parent);
			child.hueOffset = -0;
			expect(child.hue).toBe(0);
			child.hueOffset = -10;
			expect(child.hue).toBe(350);
			child.hueOffset = -360;
			expect(child.hue).toBe(0);
			child.hueOffset = -3600;
			expect(child.hue).toBe(0);
		});

		test("with float number hueOffset", () => {
			const parent = new Color();
			const child = new Color(parent);
			child.hueOffset = 0.01;
			expect(child.hue).toBe(0);
			child.hueOffset = -0.01;
			expect(child.hue).toBe(0);
			child.hueOffset = 10.1;
			expect(child.hue).toBe(10.1);
			child.hueOffset = 359.9999;
			expect(child.hue).toBe(0);
		});

		test("if NaN should throw error", () => {
			const parent = new Color();
			const child = new Color(parent);
			const propNaN = prop => (child.hueOffset = NaN);
			expect(propNaN).toThrow(new Error(getErrorMessage.offsetIsNaN("hue")));
		});
	});

	describe("if hueOffset is a function : child.hue should be return by hueOffset(parent.hue)", () => {
		test("callback should get parent.hue as parameter", () => {
			const parent = new Color(10);
			const child = new Color(parent);
			child.hueOffset = hue => hue;
			expect(child.hue).toBe(10);
			child.hueOffset = hue => hue * 2;
			expect(child.hue).toBe(20);
			parent.hue = 50;
			expect(child.hue).toBe(100);
		});

		test("return value is positive", () => {
			const parent = new Color();
			const child = new Color(parent);
			child.hueOffset = () => 0;
			expect(child.hue).toBe(0);
			child.hueOffset = () => 360;
			expect(child.hue).toBe(0);
			child.hueOffset = () => 3755;
			expect(child.hue).toBe(155);
		});

		test("return value is negative", () => {
			const parent = new Color();
			const child = new Color(parent);
			child.hueOffset = () => -0;
			expect(child.hue).toBe(0);
			child.hueOffset = () => -360;
			expect(child.hue).toBe(0);
			child.hueOffset = () => -3755;
			expect(child.hue).toBe(205);
		});

		test("return value is float", () => {
			const parent = new Color();
			const child = new Color(parent);
			child.hueOffset = () => 0.01;
			expect(child.hue).toBe(0);
			child.hueOffset = () => -0.01;
			expect(child.hue).toBe(0);
			child.hueOffset = () => 359.9;
			expect(child.hue).toBe(359.9);
			child.hueOffset = () => 359.99;
			expect(child.hue).toBe(0);
		});

		test("return value is NaN", () => {
			const parent = new Color();
			const child = new Color(parent);
			const setOffset = returnValue => {
				child.hueOffset = hue => returnValue;
				child.hue;
			};
			expect(() => setOffset(NaN)).toThrow(new Error(getErrorMessage.callbackIsNaN("hue")));
		});

		test("callback should return a number or throw a error", () => {
			const parent = new Color(10);
			const child = new Color(parent);
			const setOffset = returnValue => {
				child.hueOffset = hue => returnValue;
				child.hue;
			};
			expect(() => setOffset("toto")).toThrow(new Error(getErrorMessage.callback("hue", "toto")));
			expect(() => setOffset(true)).toThrow(new Error(getErrorMessage.callback("hue", true)));
			expect(() => setOffset(false)).toThrow(new Error(getErrorMessage.callback("hue", false)));
			expect(() => setOffset(null)).toThrow(new Error(getErrorMessage.callback("hue", null)));
			expect(() => setOffset(undefined)).toThrow(new Error(getErrorMessage.callback("hue", undefined)));
			expect(() => setOffset({})).toThrow(new Error(getErrorMessage.callback("hue", {})));
			expect(() => setOffset([])).toThrow(new Error(getErrorMessage.callback("hue", [])));
			expect(() => setOffset(new Color())).toThrow(new Error(getErrorMessage.callback("hue", new Color())));
			expect(() => setOffset(() => {})).toThrow(new Error(getErrorMessage.callback("hue", () => {})));
		});
	});

	test("if Color have no parent, hueOffSet is ignored", () => {
		const color = new Color(10);
		color.hueOffset = 50;
		expect(color.hue).toBe(10);
		color.hueOffset = () => 60;
		expect(color.hue).toBe(10);
	});

	test("should be a number, a function, or throw a error", () => {
		const parent = new Color();
		const child = new Color(parent);
		const setOffset = offset => {
			child.hueOffset = offset;
		};
		expect(() => setOffset("toto")).toThrow(new Error(getErrorMessage.offset("hue", "toto")));
		expect(() => setOffset(true)).toThrow(new Error(getErrorMessage.offset("hue", true)));
		expect(() => setOffset(false)).toThrow(new Error(getErrorMessage.offset("hue", false)));
		expect(() => setOffset([])).toThrow(new Error(getErrorMessage.offset("hue", [])));
		expect(() => setOffset({})).toThrow(new Error(getErrorMessage.offset("hue", {})));
		expect(() => setOffset(new Color())).toThrow(new Error(getErrorMessage.offset("hue", new Color())));
	});
});

describe("saturationOffset", () => {
	test("saturationOffset default value should be 0", () => {
		const parent = new Color();
		expect(parent.saturationOffset).toBe(0);

		const child = new Color(parent);
		expect(child.saturationOffset).toBe(0);
	});

	describe("if saturationOffset is a number : child.saturation should be parent.saturation + saturationOffset", () => {
		test("with positive saturationOffset", () => {
			// Constructor
			const parent = new Color(0, 50);
			let child = new Color(parent, 0);
			expect(child.saturation).toBe(50);
			child = new Color(parent, 10);
			expect(child.saturation).toBe(60);
			child = new Color(parent, +10);
			expect(child.saturation).toBe(60);
			child = new Color(parent, 50);
			expect(child.saturation).toBe(100);
			child = new Color(parent, 100);
			expect(child.saturation).toBe(100);
			child = new Color(parent, 1000);
			expect(child.saturation).toBe(100);

			// Property
			child = new Color(parent, 10);
			child.saturationOffset = 0;
			expect(child.saturation).toBe(50);
			child.saturationOffset = 10;
			expect(child.saturation).toBe(60);
			child.saturationOffset = +10;
			expect(child.saturation).toBe(60);
			child.saturationOffset = 360;
			expect(child.saturation).toBe(100);
			child.saturationOffset = 3600;
			expect(child.saturation).toBe(100);
		});

		test("with negative number saturationOffset", () => {
			// Constructor
			const parent = new Color(0, 50);
			let child = new Color(parent, 0);
			expect(child.saturation).toBe(50);
			child = new Color(parent, -0);
			expect(child.saturation).toBe(50);
			child = new Color(parent, -10);
			expect(child.saturation).toBe(40);
			child = new Color(parent, -50);
			expect(child.saturation).toBe(0);
			child = new Color(parent, -100);
			expect(child.saturation).toBe(0);

			// Property
			child = new Color(parent, 10);
			child.saturationOffset = -0;
			expect(child.saturation).toBe(50);
			child.saturationOffset = -10;
			expect(child.saturation).toBe(40);
			child.saturationOffset = -360;
			expect(child.saturation).toBe(0);
			child.saturationOffset = -3600;
			expect(child.saturation).toBe(0);
		});

		test("with float number saturationOffset", () => {
			// Constructor
			const parent = new Color(0, 50);
			let child = new Color(parent, 0.01);
			expect(child.saturation).toBe(50);
			child = new Color(parent, -0.01);
			expect(child.saturation).toBe(50);
			child = new Color(parent, -10.1);
			expect(child.saturation).toBe(39.9);
			child = new Color(parent, 49.99);
			expect(child.saturation).toBe(100);
			child = new Color(parent, -999.9999);
			expect(child.saturation).toBe(0);

			// Property
			child = new Color(parent);
			child.saturationOffset = 0.01;
			expect(child.saturation).toBe(50);
			child.saturationOffset = -0.01;
			expect(child.saturation).toBe(50);
			child.saturationOffset = -10.1;
			expect(child.saturation).toBe(39.9);
			child.saturationOffset = 49.99;
			expect(child.saturation).toBe(100);
			child.saturationOffset = -999.9999;
			expect(child.saturation).toBe(0);
		});

		test("if NaN should throw error", () => {
			const parent = new Color();

			// Constructor
			const argNaN = arg => new Color(parent, NaN);
			expect(argNaN).toThrow(new Error(getErrorMessage.argumentIsNaN("saturation offset")));

			// Property
			const child = new Color(parent);
			const propNaN = prop => (child.saturationOffset = NaN);
			expect(propNaN).toThrow(new Error(getErrorMessage.offsetIsNaN("saturation")));
		});
	});

	describe("if saturationOffset is a function : child.saturation should be return by saturationOffset(parent.saturation)", () => {
		test("callback should get parent.saturation as parameter", () => {
			// Constructor
			const parent = new Color(10, 30);
			let child = new Color(parent, saturation => saturation);
			expect(child.saturation).toBe(30);
			child = new Color(parent, saturation => saturation * 2);
			expect(child.saturation).toBe(60);
			parent.saturation = 40;
			expect(child.saturation).toBe(80);

			// Property
			parent.saturation = 30;
			child = new Color(parent);
			child.saturationOffset = saturation => saturation;
			expect(child.saturation).toBe(30);
			child.saturationOffset = saturation => saturation * 2;
			expect(child.saturation).toBe(60);
			parent.saturation = 40;
			expect(child.saturation).toBe(80);
		});

		test("return value is positive", () => {
			// Constructor
			const parent = new Color(0, 30);
			let child = new Color(parent, () => 0);
			expect(child.saturation).toBe(0);
			child = new Color(parent, () => 67);
			expect(child.saturation).toBe(67);
			child = new Color(parent, () => 3755);
			expect(child.saturation).toBe(100);

			// Property
			child = new Color(parent);
			child.saturationOffset = () => 0;
			expect(child.saturation).toBe(0);
			child.saturationOffset = () => 67;
			expect(child.saturation).toBe(67);
			child.saturationOffset = () => 3755;
			expect(child.saturation).toBe(100);
		});

		test("return value is negative", () => {
			// Constructor
			const parent = new Color(0, 30);
			let child = new Color(parent, () => -0);
			expect(child.saturation).toBe(0);
			child = new Color(parent, () => -67);
			expect(child.saturation).toBe(0);
			child = new Color(parent, () => -3755);
			expect(child.saturation).toBe(0);

			// Property
			child = new Color(parent);
			child.saturationOffset = () => -0;
			expect(child.saturation).toBe(0);
			child.saturationOffset = () => -67;
			expect(child.saturation).toBe(0);
			child.saturationOffset = () => -3755;
			expect(child.saturation).toBe(0);
		});

		test("return value is float", () => {
			// Constructor
			const parent = new Color(0, 30);
			let child = new Color(parent, () => 0.01);
			expect(child.saturation).toBe(0);
			child = new Color(parent, () => -0.01);
			expect(child.saturation).toBe(0);
			child = new Color(parent, () => 67.1);
			expect(child.saturation).toBe(67.1);
			child = new Color(parent, () => 99.99);
			expect(child.saturation).toBe(100);

			// Property
			child = new Color(parent);
			child.saturationOffset = () => 0.01;
			expect(child.saturation).toBe(0);
			child.saturationOffset = () => -0.01;
			expect(child.saturation).toBe(0);
			child.saturationOffset = () => 67.1;
			expect(child.saturation).toBe(67.1);
			child.saturationOffset = () => 99.99;
			expect(child.saturation).toBe(100);
		});

		test("return value is NaN", () => {
			const parent = new Color();

			// Constructor
			const argNaN = () => new Color(parent, () => NaN).saturation;
			expect(argNaN).toThrow(new Error(getErrorMessage.callbackIsNaN("saturation")));

			// Property
			const child = new Color(parent);
			const offsetNaN = () => {
				child.saturationOffset = () => NaN;
				child.saturation;
			};
			expect(offsetNaN).toThrow(new Error(getErrorMessage.callbackIsNaN("saturation")));
		});

		test("callback should return a number or throw a error", () => {
			const parent = new Color(10, 10);
			const child = new Color(parent);
			const setOffset = returnValue => {
				child.saturationOffset = saturation => returnValue;
				child.saturation;
			};
			expect(() => setOffset("toto")).toThrow(new Error(getErrorMessage.callback("saturation", "toto")));
			expect(() => setOffset(true)).toThrow(new Error(getErrorMessage.callback("saturation", true)));
			expect(() => setOffset(false)).toThrow(new Error(getErrorMessage.callback("saturation", false)));
			expect(() => setOffset(null)).toThrow(new Error(getErrorMessage.callback("saturation", null)));
			expect(() => setOffset(undefined)).toThrow(new Error(getErrorMessage.callback("saturation", undefined)));
			expect(() => setOffset({})).toThrow(new Error(getErrorMessage.callback("saturation", {})));
			expect(() => setOffset([])).toThrow(new Error(getErrorMessage.callback("saturation", [])));
			expect(() => setOffset(new Color())).toThrow(
				new Error(getErrorMessage.callback("saturation", new Color()))
			);
			expect(() => setOffset(() => {})).toThrow(new Error(getErrorMessage.callback("saturation", () => {})));
		});
	});

	test("if Color have no parent, saturationOffSet is ignored", () => {
		const color = new Color(10, 10);
		color.saturationOffset = 50;
		expect(color.saturation).toBe(10);
		color.saturationOffset = () => 60;
		expect(color.saturation).toBe(10);
	});

	test("should be a number, a function, or throw a error", () => {
		const parent = new Color();
		const child = new Color(parent);
		const setOffset = offset => {
			child.saturationOffset = offset;
		};
		expect(() => setOffset("toto")).toThrow(new Error(getErrorMessage.offset("saturation", "toto")));
		expect(() => setOffset(true)).toThrow(new Error(getErrorMessage.offset("saturation", true)));
		expect(() => setOffset(false)).toThrow(new Error(getErrorMessage.offset("saturation", false)));
		expect(() => setOffset([])).toThrow(new Error(getErrorMessage.offset("saturation", [])));
		expect(() => setOffset({})).toThrow(new Error(getErrorMessage.offset("saturation", {})));
		expect(() => setOffset(new Color())).toThrow(new Error(getErrorMessage.offset("saturation", new Color())));
	});
});
