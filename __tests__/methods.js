import Color from "..";
import { offset } from "../src/checkTypes";
/**********************/
/**  Test Methods :  **/
/**********************/

// Test Color.toHsl() :
describe("export to hsl CSS color String", () => {
	test("hsl values should reflect color proporties", () => {
		let color = new Color();
		expect(color.toHsl()).toBe("hsl(0, 100%, 50%)");
		color = new Color(27, 33, 47);
		expect(color.toHsl()).toBe("hsl(27, 33%, 47%)");
		color.hue = 77;
		color.saturation = 77;
		color.light = 77;
		expect(color.toHsl()).toBe("hsl(77, 77%, 77%)");
	});

	test("if alpha != 100%,  hsl should switch to hsla", () => {
		let color = new Color(1, 2, 3, 4);
		expect(color.toHsl()).toBe("hsla(1, 2%, 3%, 4%)");
		color.alpha = 77;
		expect(color.toHsl()).toBe("hsla(1, 2%, 3%, 77%)");
	});

	test("hsl values should accept float to 1 decimal", () => {
		let color = new Color(9.9, 9.9, 9.9);
		expect(color.toHsl()).toBe("hsl(9.9, 9.9%, 9.9%)");
		color = new Color(9.9, 9.9, 9.9, 9.9);
		expect(color.toHsl()).toBe("hsla(9.9, 9.9%, 9.9%, 9.9%)");
		color = new Color(9.99, 9.99, 9.99, 9.99);
		expect(color.toHsl()).toBe("hsla(10, 10%, 10%, 10%)");
	});

	test.each([
		"hsl(0, 0%, 0%)",
		"hsl(200, 100%, 100%)",
		"hsl(4, 23%, 30%)",
		"hsla(0, 0%, 0%, 0%)",
		"hsla(330, 60%, 20%, 9.9%)",
	])("if %s are pass as constructor, toHsl() should be the same", hsl => {
		let color = new Color(hsl);
		expect(color.toHsl()).toBe(hsl);
	});
});

// Test Color.toHex() :
describe("export to hexa CSS color String", () => {
	test("hexa values should reflect color proporties", () => {
		let color = new Color();
		expect(color.toHex()).toBe("#ff0000");
		color = new Color(240, 0, 100);
		expect(color.toHex()).toBe("#ffffff");
		color.hue = 120;
		color.saturation = 100;
		color.light = 50;
		expect(color.toHex()).toBe("#00ff00");
	});

	test("if alpha != 100%, the string should switch to the 8 values format", () => {
		let color = new Color(0, 100, 50, 50);
		expect(color.toHex()).toBe("#ff000080");
		color = new Color("#12345678");
		expect(color.toHex()).toBe("#12345678");
	});

	test("hexa values should keep precision thanks to properties float to 1 decimal", () => {
		let color = new Color(9.9, 9.9, 9.9);
		expect(color.toHex()).toBe("#1c1817");
		color = new Color(9.9, 9.9, 9.9, 9.9);
		expect(color.toHex()).toBe("#1c181719");
		color = new Color(9.99, 9.99, 9.99, 9.99);
		expect(color.toHex()).toBe("#1c18171a");
	});

	test.each(["#ffffff", "#000000", "#123456", "#12345678", "#abcdef02"])(
		"if %s are pass as constructor, toHex() should be the same",
		hex => {
			let color = new Color(hex);
			expect(color.toHex()).toBe(hex);
		}
	);

	test("if hexa value are pass as constructor, toHex should be the same, and vice-versa", () => {
		let color = new Color("#12345678");
		expect(color.toHsl()).toBe("hsla(210, 65.4%, 20.4%, 47.1%)");
		color = new Color(210, 65.4, 20.4, 47.1);
		expect(color.toHex()).toBe("#12345678");

		color = new Color("#abcdef02");
		expect(color.toHsl()).toBe("hsla(210, 68%, 80.4%, 0.8%)");
		color = new Color(210, 68, 80.4, 0.8);
		expect(color.toHex()).toBe("#abcdef02");
	});
});

// Test Color.toRgb() :
describe("export to RGB CSS color String", () => {
	test("RGB values should reflect color proporties", () => {
		let color = new Color();
		expect(color.toRgb()).toBe("rgb(255, 0, 0)");
		color = new Color(240, 0, 100);
		expect(color.toRgb()).toBe("rgb(255, 255, 255)");
		color.hue = 120;
		color.saturation = 100;
		color.light = 50;
		expect(color.toRgb()).toBe("rgb(0, 255, 0)");
	});

	test("if alpha != 100%, the string should switch to rgba()", () => {
		let color = new Color(0, 100, 50, 50);
		expect(color.toRgb()).toBe("rgba(255, 0, 0, 0.5)");
		color = new Color("#12345678");
		expect(color.toRgb()).toBe("rgba(18, 52, 86, 0.471)");
	});

	test("values should keep precision thanks to properties float to 1 decimal", () => {
		let color = new Color(9.9, 9.9, 9.9);
		expect(color.toRgb()).toBe("rgb(28, 24, 23)");
		color = new Color(9.9, 9.9, 9.9, 9.9);
		expect(color.toRgb()).toBe("rgba(28, 24, 23, 0.099)");
		color = new Color(9.99, 9.99, 9.99, 9.99);
		expect(color.toRgb()).toBe("rgba(28, 24, 23, 0.1)");
	});

	test.each([
		"rgb(0, 0, 0)",
		"rgb(255, 255, 255)",
		"rgb(0, 0, 0)",
		"rgba(10, 234, 98, 0.001)",
		"rgba(123, 123, 255, 0.99)",
	])("if %s are pass as constructor, toRgb() should be the same", rgb => {
		let color = new Color(rgb);
		expect(color.toRgb()).toBe(rgb);
	});
});

// Test Color.setColorProperties() :
const colorProps = ["hue", "saturation", "light", "alpha"];
describe("change mutiple color Properties", () => {
	const baseTestValue = 10;
	const baseTestProperties = {
		hue: baseTestValue,
		saturation: baseTestValue,
		light: baseTestValue,
		alpha: baseTestValue,
	};

	const propertiesValues = [
		[undefined, baseTestProperties],
		[{}, baseTestProperties],
		[{ hue: 20 }, { ...baseTestProperties, hue: 20 }],
		[{ saturation: 20 }, { ...baseTestProperties, saturation: 20 }],
		[{ light: 20 }, { ...baseTestProperties, light: 20 }],
		[{ alpha: 20 }, { ...baseTestProperties, alpha: 20 }],
		[
			{ hue: 20, saturation: 20 },
			{ ...baseTestProperties, hue: 20, saturation: 20 },
		],
		[
			{ hue: 20, light: 20 },
			{ ...baseTestProperties, hue: 20, light: 20 },
		],
		[
			{ alpha: 20, light: 20 },
			{ ...baseTestProperties, alpha: 20, light: 20 },
		],
		[
			{ hue: 20, saturation: 20, light: 20 },
			{ ...baseTestProperties, hue: 20, saturation: 20, light: 20 },
		],
		[
			{ alpha: 20, saturation: 20, light: 20 },
			{ ...baseTestProperties, alpha: 20, saturation: 20, light: 20 },
		],
		[
			{ hue: 20, saturation: 20, light: 20, alpha: 20 },
			{ hue: 20, saturation: 20, light: 20, alpha: 20 },
		],
	];
	describe.each(propertiesValues)("with %s", (properties, expected) => {
		const color = new Color(baseTestProperties);
		color.setColorProperties(properties);

		test.each(colorProps)(`expect %s to be as ${JSON.stringify(expected)}`, prop => {
			expect(color[prop]).toBe(expected[prop]);
		});
	});

	describe("extra colorProps shoud be ignored", () => {
		const color = new Color(baseTestProperties);
		color.setColorProperties({ extra: "value" });
		test.each(colorProps)(`expect %s to be ${baseTestValue}`, prop => {
			expect(color[prop]).toBe(baseTestValue);
		});
	});
});

// Test Color.setColorOffsets() :
const offsets = [
	["hueOffset", "hue"],
	["saturationOffset", "saturation"],
	["lightOffset", "light"],
	["alphaOffset", "alpha"],
];
describe("change mutiple color Offsets", () => {
	const baseTestValue = 10;
	const baseTestOffsets = {
		hue: baseTestValue,
		saturation: baseTestValue,
		light: baseTestValue,
		alpha: baseTestValue,
	};

	const offsetValues = [
		[undefined, baseTestOffsets],
		[{}, baseTestOffsets],
		[{ hue: 20 }, { ...baseTestOffsets, hue: 20 }],
		[{ saturation: 20 }, { ...baseTestOffsets, saturation: 20 }],
		[{ light: 20 }, { ...baseTestOffsets, light: 20 }],
		[{ alpha: 20 }, { ...baseTestOffsets, alpha: 20 }],
		[
			{ hue: 20, saturation: 20 },
			{ ...baseTestOffsets, hue: 20, saturation: 20 },
		],
		[
			{ hue: 20, light: 20 },
			{ ...baseTestOffsets, hue: 20, light: 20 },
		],
		[
			{ alpha: 20, light: 20 },
			{ ...baseTestOffsets, alpha: 20, light: 20 },
		],
		[
			{ hue: 20, saturation: 20, light: 20 },
			{ ...baseTestOffsets, hue: 20, saturation: 20, light: 20 },
		],
		[
			{ alpha: 20, saturation: 20, light: 20 },
			{ ...baseTestOffsets, alpha: 20, saturation: 20, light: 20 },
		],
		[
			{ hue: 20, saturation: 20, light: 20, alpha: 20 },
			{ hue: 20, saturation: 20, light: 20, alpha: 20 },
		],
	];
	describe.each(offsetValues)("with %s", (offsetsValue, expected) => {
		const parent = new Color();
		const color = new Color(parent, baseTestOffsets);
		color.setColorOffsets(offsetsValue);

		test.each(offsets)(`expect %s to be as ${JSON.stringify(expected)}`, (offset, property) => {
			expect(color[offset]).toBe(expected[property]);
		});
	});

	describe("extra offsets shoud be ignored", () => {
		const parent = new Color();
		const color = new Color(parent, baseTestOffsets);
		color.setColorOffsets({ extra: "value" });
		test.each(offsets)(`expect %s to be ${baseTestValue}`, (offset, property) => {
			expect(color[offset]).toBe(baseTestValue);
		});
	});
});

// Test Color.set() :
const allprops = [
	"hue",
	"saturation",
	"light",
	"alpha",
	"hueOffset",
	"saturationOffset",
	"lightOffset",
	"alphaOffset",
];
describe("if .set() method", () => {
	const parentColor = new Color();
	const originalValue = 10;
	const colorConstructor = {
		properties: { hue: originalValue, saturation: originalValue, light: originalValue, alpha: originalValue },
		offsets: { hue: originalValue, saturation: originalValue, light: originalValue, alpha: originalValue },
		ref: parentColor,
	};

	// properties & offsets :
	test.each(allprops)("is empty, %s should not change", prop => {
		const testColor = new Color(colorConstructor);
		testColor.set();
		expect(testColor[prop]).toBe(originalValue);
	});
	describe.each(allprops)("provide %s :", providedProp => {
		const newValue = 7;
		const testColor = new Color(colorConstructor);
		testColor.set({ [providedProp]: newValue });

		test(`${providedProp} should be as provided`, () => {
			expect(testColor[providedProp]).toBe(newValue);
		});
		test.each(allprops)("%s should not change", otherProp => {
			if (otherProp !== providedProp) expect(testColor[otherProp]).toBe(originalValue);
		});
	});

	// ref :
	test("is empty, .ref should not change", () => {
		const testColor = new Color(colorConstructor);
		testColor.set();
		expect(testColor.ref).toBe(parentColor);
	});
	describe("provide only a ref value :", () => {
		const newParent = new Color();

		test(".ref should be the ref", () => {
			const testColor = new Color(colorConstructor);
			testColor.set({ ref: newParent });
			expect(testColor.ref).toBe(newParent);
		});
		test.each(allprops)("%s should not change", prop => {
			const testColor = new Color(colorConstructor);
			testColor.set({ ref: newParent });
			expect(testColor[prop]).toBe(originalValue);
		});
	});

	// css :
	describe("provide a css string value without a color property value :", () => {
		const cssString = "hsl(23, 23%, 23%, 23%)";
		const expectedValue = 23;
		test.each(colorProps)("%s should change to new value", prop => {
			const testColor = new Color(colorConstructor);
			testColor.set({ css: cssString });
			expect(testColor[prop]).toBe(expectedValue);
		});
		test.each(offsets)("%s should not change", offset => {
			const testColor = new Color(colorConstructor);
			testColor.set({ css: cssString });
			expect(testColor[offset]).toBe(originalValue);
		});
	});
});

// Test Color.reset() :

describe("If .reset() method", () => {
	const defaultValues = {
		hue: 0,
		saturation: 100,
		light: 50,
		alpha: 100,
		hueOffset: 0,
		saturationOffset: 0,
		lightOffset: 0,
		alphaOffset: 0,
	};
	const parentColor = new Color();
	const originalValue = 10;
	const colorConstructor = {
		properties: { hue: originalValue, saturation: originalValue, light: originalValue, alpha: originalValue },
		offsets: { hue: originalValue, saturation: originalValue, light: originalValue, alpha: originalValue },
		ref: parentColor,
	};

	// properties & offsets :
	test.each(allprops)("is empty, %s should reset to default value", prop => {
		const testColor = new Color(colorConstructor);
		testColor.reset();
		expect(testColor[prop]).toBe(defaultValues[prop]);
	});
	describe.each(allprops)("provide %s :", providedProp => {
		const newValue = 7;
		const testColor = new Color(colorConstructor);
		testColor.reset({ [providedProp]: newValue });

		test(`${providedProp} should be as provided`, () => {
			expect(testColor[providedProp]).toBe(newValue);
		});
		test.each(allprops)("%s should reset to default value", otherProp => {
			if (otherProp !== providedProp) expect(testColor[otherProp]).toBe(defaultValues[otherProp]);
		});
	});

	// ref :
	test("is empty, .ref should not change", () => {
		const testColor = new Color(colorConstructor);
		testColor.reset();
		expect(testColor.ref).toBe(parentColor);
	});
	describe("provide only a ref value :", () => {
		const newParent = new Color();

		test(".ref should be the ref", () => {
			const testColor = new Color(colorConstructor);
			testColor.reset({ ref: newParent });
			expect(testColor.ref).toBe(newParent);
		});
		test.each(allprops)("%s should reset to default value", prop => {
			const testColor = new Color(colorConstructor);
			testColor.reset({ ref: newParent });
			expect(testColor[prop]).toBe(defaultValues[prop]);
		});
	});

	// css :
	describe("provide a css string value without a color property value :", () => {
		const cssString = "hsl(23, 23%, 23%, 23%)";
		const expectedValue = 23;
		test.each(colorProps)("%s should change to new value", prop => {
			const testColor = new Color(colorConstructor);
			testColor.reset({ css: cssString });
			expect(testColor[prop]).toBe(expectedValue);
		});
		test.each(offsets)("%s should reset to default value", offset => {
			const testColor = new Color(colorConstructor);
			testColor.reset({ css: cssString });
			expect(testColor[offset]).toBe(defaultValues[offset]);
		});
	});
});
