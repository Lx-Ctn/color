import Color, { defaultValues } from "../index.js";
import { offset, property } from "../src/checkTypes.js";
import { getErrorMessage } from "../src/errorMessages.js";

function allDefaultParamTest(color) {
	expect(color.hue).toBe(defaultValues.properties.hue);
	expect(color.saturation).toBe(defaultValues.properties.saturation);
	expect(color.light).toBe(defaultValues.properties.light);
	expect(color.alpha).toBe(defaultValues.properties.alpha);
	expect(color.hueOffset).toBe(defaultValues.offsets.hue);
	expect(color.saturationOffset).toBe(defaultValues.offsets.saturation);
	expect(color.lightOffset).toBe(defaultValues.offsets.light);
	expect(color.alphaOffset).toBe(defaultValues.offsets.alpha);
}
// Get spreadable set of arguments with the value to test at the correct position :
function getDirectValues(testedProperty, testedValue) {
	const directValues = { hue: null, saturation: null, light: null, alpha: null };
	directValues[testedProperty] = testedValue;
	return Object.values(directValues);
}

// null || undefined :
describe("nullish parameters & default values", () => {
	test("Should have all default value with empty constructor parameters", () => {
		const color = new Color();
		allDefaultParamTest(color);
	});

	describe.each([null, undefined])("Should have default value with %s constructor parameters", nullish => {
		const testArgs = [
			// hue
			[[nullish]],
			// saturation
			[[nullish, nullish]],
			[[0, nullish]],
			[[nullish, 100]],
			//light
			[[nullish, nullish, nullish]],
			[[nullish, 100, nullish]],
			[[nullish, nullish, 50]],
			// alpha
			[[nullish, nullish, nullish, nullish]],
			[[nullish, nullish, 50, nullish]],
			[[nullish, nullish, nullish, 100]],
			// more
			[[nullish, nullish, nullish, nullish, nullish]],
			// Color + offsets collection
			[[new Color(), { hue: nullish }]],
			[[new Color(), { saturation: nullish }]],
			[[new Color(), { light: nullish }]],
			[[new Color(), { alpha: nullish }]],
			// object
			[[{ properties: nullish }]],
			[[{ offset: nullish }]],
			[[{ color: nullish }]],
			[[{ ref: nullish }]],
			[[{ parentColor: nullish }]],
			// color collection in object
			[[{ properties: { hue: nullish } }]],
			[[{ properties: { saturation: nullish } }]],
			[[{ properties: { light: nullish } }]],
			[[{ properties: { alpha: nullish } }]],
			// offset collection in object
			[[{ offsets: { hue: nullish } }]],
			[[{ offsets: { saturation: nullish } }]],
			[[{ offsets: { light: nullish } }]],
			[[{ offsets: { alpha: nullish } }]],
		];
		test.each(testArgs)("with %s arguments", argArray => {
			const color = new Color(...argArray);
			allDefaultParamTest(color);
		});
	});

	// Nullish color property setters assignment :
	const colorProps = ["hue", "saturation", "light", "alpha"];
	describe.each(colorProps)("nullish %s assignment should be ignored", property => {
		test.each([null, undefined])("default value with %s", nullish => {
			const color = new Color();
			color[property] = nullish;
			expect(color[property]).toBe(defaultValues.properties[property]);
		});

		const testProps = { hue: 240, saturation: 57, light: 57, alpha: 57 };
		test.each([null, undefined])("custom value with %s", nullish => {
			const color = new Color(testProps.hue, testProps.saturation, testProps.light, testProps.alpha);
			color[property] = nullish;
			expect(color[property]).toBe(testProps[property]);
		});
	});

	// Nullish offset property setters assignment :
	const offsetProps = [
		["hueOffset", "hue"],
		["saturationOffset", "saturation"],
		["lightOffset", "light"],
		["alphaOffset", "alpha"],
	];
	describe.each(offsetProps)("%s assignment should be ignored", (offset, property) => {
		const testOffsets = { hue: 10, saturation: -10, light: 10, alpha: -10 };
		test.each([null, undefined])("with %s on parent Color", nullish => {
			const parent = new Color();
			parent[offset] = nullish;
			expect(parent[offset]).toBe(defaultValues.offsets[property]);
		});
		test.each([null, undefined])("with %s on a child Color", nullish => {
			const parent = new Color();
			const child = new Color(parent, testOffsets);
			child[offset] = nullish;
			expect(child[offset]).toBe(testOffsets[property]);
			expect(child[property]).toBe(defaultValues.properties[property] + testOffsets[property]);
		});
	});
});

// Number values :
describe("hue number value", () => {
	const getHueArgumentTypes = hue => [hue, { hue }, { properties: { hue } }];

	const correctHueValues = [1, 9, 10, 57, 100, 148, 234, 356];
	describe.each(correctHueValues)("For a hue value between 0 and 360 : %s", hue => {
		// Constructor
		test.each(getHueArgumentTypes(hue))(`in %s should be ${hue}`, argument => {
			const color = new Color(argument);
			expect(color.hue).toBe(hue);
		});

		// Property
		test(`in hue property setter should be ${hue}`, () => {
			const color = new Color();
			color.hue = hue;
			expect(color.hue).toBe(hue);
		});
	});

	const midnightValues = [0, 360];
	describe.each(midnightValues)("hue value at 0 and 360 should be 0 : %s", hue => {
		// Constructor
		test.each(getHueArgumentTypes(hue))(`in %s should be 0`, argument => {
			const color = new Color(argument);
			expect(color.hue).toBe(0);
		});

		// Property
		test(`in hue property setter should be 0`, () => {
			const color = new Color();
			color.hue = hue;
			expect(color.hue).toBe(0);
		});
	});

	const negativeValues = [
		[-0, 0],
		[-10, 350],
		[-300, 60],
		[-360, 0],
		[-3660, 300],
		[-360.1, 359.9],
	];
	describe.each(negativeValues)(
		"negative hue value should work and be set back on the color wheel : %s",
		(tested, expected) => {
			// Constructor
			test.each(getHueArgumentTypes(tested))(`in %s should be ${expected}`, argument => {
				let color = new Color(argument);
				expect(color.hue).toBe(expected);
			});

			// Property
			test(`in hue property setter should be ${expected}`, () => {
				const color = new Color();
				color.hue = tested;
				expect(color.hue).toBe(expected);
			});
		}
	);

	const valuesOver360 = [
		[361, 1],
		[3600, 0],
		[3660, 60],
		[360.1, 0.1],
	];
	describe.each(valuesOver360)(
		"hue value over 360 should work and be set back on the color wheel : %s",
		(tested, expected) => {
			// Constructor
			test.each(getHueArgumentTypes(tested))(`in %s should be ${expected}`, argument => {
				let color = new Color(argument);
				expect(color.hue).toBe(expected);
			});

			// Property
			test(`in hue property setter should be ${expected}`, () => {
				const color = new Color();
				color.hue = tested;
				expect(color.hue).toBe(expected);
			});
		}
	);
});

describe("saturation, light and alpha number value", () => {
	const valueFrom0to100 = ["saturation", "light", "alpha"];
	describe.each(valueFrom0to100)("%s", property => {
		const getPropertyArgumentTypes = tested => [
			[getDirectValues(property, tested)], // direct value
			[[{ [property]: tested }]], // value in named property
			[[{ properties: { [property]: tested } }]], // value in collection of named properties
		];

		const correctValues = [0, 1, 7, 10, 57, 100];
		describe.each(correctValues)("value between 0 and 100 should be the same : %s", tested => {
			// Constructor
			test.each(getPropertyArgumentTypes(tested))(`in %s should be ${tested}`, args => {
				const color = new Color(...args);
				expect(color[property]).toBe(tested);
			});

			// Property
			test(`in ${property} property setter should be ${tested}`, () => {
				const color = new Color();
				color[property] = tested;
				expect(color[property]).toBe(tested);
			});
		});

		const negativeValues = [-99999, -10, -0, -0.1, -0.99];
		describe.each(negativeValues)("negative value should work and be set to 0 : %s", tested => {
			// Constructor
			test.each(getPropertyArgumentTypes(tested))(`in %s should be ${tested}`, args => {
				const color = new Color(...args);
				expect(color[property]).toBe(0);
			});

			// Property
			test(`in ${property} property setter should be ${tested}`, () => {
				const color = new Color();
				color[property] = tested;
				expect(color[property]).toBe(0);
			});
		});

		const valueOver100 = [100.09, 345, 999999];
		describe.each(valueOver100)("value over 100 should work and be set back to 100 : %s", tested => {
			// Constructor
			test.each(getPropertyArgumentTypes(tested))(`in %s should be ${tested}`, args => {
				const color = new Color(...args);
				expect(color[property]).toBe(100);
			});

			// Property
			test(`in ${property} property setter should be ${tested}`, () => {
				const color = new Color();
				color[property] = tested;
				expect(color[property]).toBe(100);
			});
		});
	});
});

const properties = ["hue", "saturation", "light", "alpha"];
describe.each(properties)("precision for %s value should allowed 1 decimal", property => {
	const decimalTestValues = [
		[56, 56],
		[56.7, 56.7],
		[56.78, 56.8],
		[56.74321, 56.7],
		[0.01, 0],
		[99.99, 100],
	];

	describe.each(decimalTestValues)("%s", (tested, expected) => {
		// Constructor
		const propertyArgumentTypes = [
			[getDirectValues(property, tested)], // direct value
			[[{ [property]: tested }]], // value in named property
			[[{ properties: { [property]: tested } }]], // value in collection of named properties
		];

		test.each(propertyArgumentTypes)(`in %s should be ${expected}`, args => {
			const color = new Color(...args);
			expect(color[property]).toBe(expected);
		});

		// Property
		test(`in ${property} property setter should be ${expected}`, () => {
			const color = new Color();
			color[property] = tested;
			expect(color[property]).toBe(expected);
		});
	});
});

// String values :
describe("hue <angle> string value", () => {
	const getHueArgumentTypes = hue => [hue, { hue }, { properties: { hue } }];

	const correctHueValues = [
		// turn
		["0turn", 0],
		["0.5turn", 180],
		["+0.5turn", 180],
		["1turn", 0],
		// direct string number
		["0", 0],
		["180", 180],
		["+180", 180],
		["360", 0],
		// deg
		["0deg", 0],
		["180deg", 180],
		["+180deg", 180],
		["360deg", 0],
		// grad
		["0grad", 0],
		["200grad", 180],
		["+200grad", 180],
		["400grad", 0],
		// rad
		[`0rad`, 0],
		[`${Math.PI}rad`, 180],
		[`+${Math.PI}rad`, 180],
		[`${Math.PI * 2}rad`, 0],
	];
	describe.each(correctHueValues)("For a hue value between 0 and 360 : %s", (hue, expected) => {
		// Constructor
		test.each(getHueArgumentTypes(hue))(`in %s should be ${hue}`, argument => {
			const color = new Color(argument);
			expect(color.hue).toBe(expected);
		});

		// Property
		test(`in hue property setter should be ${hue}`, () => {
			const color = new Color();
			color.hue = hue;
			expect(color.hue).toBe(expected);
		});
	});

	const extraSpaceValues = [
		// turn
		[" 0.5turn", 180],
		["0.5turn ", 180],
		["0.5 turn", 180],
		["   0.5   turn   ", 180],
		// direct string number
		[" 180", 180],
		["180 ", 180],
		["   180   ", 180],
		// deg
		[" 180deg", 180],
		["180deg ", 180],
		["180 deg", 180],
		["   180   deg   ", 180],
		// grad
		[" 200grad", 180],
		["200grad ", 180],
		["200 grad", 180],
		["   200   grad   ", 180],
		// rad
		[` ${Math.PI}rad`, 180],
		[`${Math.PI}rad `, 180],
		[`${Math.PI} rad`, 180],
		[`   ${Math.PI}   rad   `, 180],
	];
	describe.each(extraSpaceValues)("Extra space in string should be ignored : %s", (hue, expected) => {
		// Constructor
		test.each(getHueArgumentTypes(hue))(`in %s should be ${hue}`, argument => {
			const color = new Color(argument);
			expect(color.hue).toBe(expected);
		});

		// Property
		test(`in hue property setter should be ${hue}`, () => {
			const color = new Color();
			color.hue = hue;
			expect(color.hue).toBe(expected);
		});
	});

	const no0beforeFloatValues = [
		// turn
		[".5turn", 180],
		// direct string number
		[".99", 1],
		// deg
		[".99deg", 1],
		// grad
		[".99grad", 360 / 400],
		// rad
		[".785rad", 45],
	];

	describe.each(no0beforeFloatValues)(
		"missing 0 before '.' in float values should work : %s",
		(hue, expected) => {
			// Constructor
			test.each(getHueArgumentTypes(hue))(`in %s should be ${hue}`, argument => {
				const color = new Color(argument);
				expect(color.hue).toBe(expected);
			});

			// Property
			test(`in hue property setter should be ${hue}`, () => {
				const color = new Color();
				color.hue = hue;
				expect(color.hue).toBe(expected);
			});
		}
	);

	const negativeValues = [
		// turn
		["-0turn", 0],
		["-0.5turn", 180],
		["-36.5turn", 180],
		// direct string number
		["-0", 0],
		["-180", 180],
		["-3600.1", 359.9],
		// deg
		["-0deg", 0],
		["-180deg", 180],
		["-3600.1deg", 359.9],
		// grad
		["-0grad", 0],
		["-200grad", 180],
		["-4000.1grad", 359.9],
		// rad
		[`-0rad`, 0],
		[`-${Math.PI}rad`, 180],
		[`-${Math.PI * 20}rad`, 0],
	];
	describe.each(negativeValues)(
		"negative hue value should work and be set back on the color wheel : %s",
		(tested, expected) => {
			// Constructor
			test.each(getHueArgumentTypes(tested))(`in %s should be ${expected}`, argument => {
				let color = new Color(argument);
				expect(color.hue).toBe(expected);
			});

			// Property
			test(`in hue property setter should be ${expected}`, () => {
				const color = new Color();
				color.hue = tested;
				expect(color.hue).toBe(expected);
			});
		}
	);

	const valuesOver360 = [
		// turn
		["2turn", 0],
		["1.5turn", 180],
		["36.5turn", 180],
		// direct string number
		["361", 1],
		["540", 180],
		["3600.1", 0.1],
		// deg
		["361deg", 1],
		["540deg", 180],
		["3600.1deg", 0.1],
		// grad
		["401grad", 0.9],
		["600grad", 180],
		["4000.1grad", 0.1],
		// rad
		[`${Math.PI * 3}rad`, 180],
		[`${Math.PI * 20}rad`, 0],
	];
	describe.each(valuesOver360)(
		"hue value over 360 should work and be set back on the color wheel : %s",
		(tested, expected) => {
			// Constructor
			test.each(getHueArgumentTypes(tested))(`in %s should be ${expected}`, argument => {
				let color = new Color(argument);
				expect(color.hue).toBe(expected);
			});

			// Property
			test(`in hue property setter should be ${expected}`, () => {
				const color = new Color();
				color.hue = tested;
				expect(color.hue).toBe(expected);
			});
		}
	);
});

describe("color from CSS color string :", () => {
	const getCssTypes = css => [
		css, // direct value
		{ css }, // named value
	];

	const correctHueValues = [
		// hexa
		["#000", { hue: 0, saturation: 0, light: 0, alpha: 100 }],
		["#000000", { hue: 0, saturation: 0, light: 0, alpha: 100 }],
		["#0f0", { hue: 120, saturation: 100, light: 50, alpha: 100 }],
		["#00ff00", { hue: 120, saturation: 100, light: 50, alpha: 100 }],
		["#fff", { hue: 0, saturation: 0, light: 100, alpha: 100 }],
		["#ffffff", { hue: 0, saturation: 0, light: 100, alpha: 100 }],
		// hexa + alpha
		["#ffff", { hue: 0, saturation: 0, light: 100, alpha: 100 }],
		["#ffffffff", { hue: 0, saturation: 0, light: 100, alpha: 100 }],
		["#fff9", { hue: 0, saturation: 0, light: 100, alpha: 60 }],
		["#ffffff99", { hue: 0, saturation: 0, light: 100, alpha: 60 }],

		// rgb
		["rgb(0, 0, 0)", { hue: 0, saturation: 0, light: 0, alpha: 100 }],
		["rgb(0, 255, 0)", { hue: 120, saturation: 100, light: 50, alpha: 100 }],
		["rgb(255, 255, 255)", { hue: 0, saturation: 0, light: 100, alpha: 100 }], // comma
		["rgb(0/ 255/ 0)", { hue: 120, saturation: 100, light: 50, alpha: 100 }], // slash
		["rgb(0 255 0)", { hue: 120, saturation: 100, light: 50, alpha: 100 }], // just space
		["rgb(0%, 100%, 0%)", { hue: 120, saturation: 100, light: 50, alpha: 100 }], // %
		["rgb(0, 255, 0, 100%)", { hue: 120, saturation: 100, light: 50, alpha: 100 }], // alpha %
		["rgb(0, 255, 0, 1)", { hue: 120, saturation: 100, light: 50, alpha: 100 }], // alpha /1
		["rgb(0, 255, 0, 50%)", { hue: 120, saturation: 100, light: 50, alpha: 50 }],
		["rgb(0, 255, 0, 0.5)", { hue: 120, saturation: 100, light: 50, alpha: 50 }],
		// rgba
		["rgba(0, 0, 0)", { hue: 0, saturation: 0, light: 0, alpha: 100 }],
		["rgba(0, 255, 0)", { hue: 120, saturation: 100, light: 50, alpha: 100 }],
		["rgba(255, 255, 255)", { hue: 0, saturation: 0, light: 100, alpha: 100 }], // comma
		["rgba(0/ 255/ 0)", { hue: 120, saturation: 100, light: 50, alpha: 100 }], // slash
		["rgba(0 255 0)", { hue: 120, saturation: 100, light: 50, alpha: 100 }], // just space
		["rgba(0%, 100%, 0%)", { hue: 120, saturation: 100, light: 50, alpha: 100 }], // %
		["rgba(0, 255, 0, 100%)", { hue: 120, saturation: 100, light: 50, alpha: 100 }], // alpha %
		["rgba(0, 255, 0, 1)", { hue: 120, saturation: 100, light: 50, alpha: 100 }], // alpha /1
		["rgba(0, 255, 0, 50%)", { hue: 120, saturation: 100, light: 50, alpha: 50 }],
		["rgba(0, 255, 0, 0.5)", { hue: 120, saturation: 100, light: 50, alpha: 50 }],

		// hsl
		["hsl(0, 0, 0)", { hue: 0, saturation: 0, light: 0, alpha: 100 }],
		["hsl(120, 80%, 60%)", { hue: 120, saturation: 80, light: 60, alpha: 100 }],
		["hsl(234, 57%, 100%)", { hue: 234, saturation: 57, light: 100, alpha: 100 }], // comma
		["hsl(120/ 80%/ 60%)", { hue: 120, saturation: 80, light: 60, alpha: 100 }], // slash
		["hsl(120 80% 60%)", { hue: 120, saturation: 80, light: 60, alpha: 100 }], // just space
		["hsl(120, 0.8, 0.6)", { hue: 120, saturation: 80, light: 60, alpha: 100 }], // value/1
		["hsl(180deg, 0.8, 0.6)", { hue: 180, saturation: 80, light: 60, alpha: 100 }], // deg hue value
		["hsl(0.5turn, 0.8, 0.6)", { hue: 180, saturation: 80, light: 60, alpha: 100 }], // turn hue value
		["hsl(200grad, 0.8, 0.6)", { hue: 180, saturation: 80, light: 60, alpha: 100 }], // grad hue value
		["hsl(3.1415rad, 0.8, 0.6)", { hue: 180, saturation: 80, light: 60, alpha: 100 }], // rad hue value
		["hsl(120, 80%, 60%, 100%)", { hue: 120, saturation: 80, light: 60, alpha: 100 }], // alpha %
		["hsl(120, 0.8, 0.6, 1)", { hue: 120, saturation: 80, light: 60, alpha: 100 }], // alpha /1
		["hsl(120, 80%, 60%, 50%)", { hue: 120, saturation: 80, light: 60, alpha: 50 }],
		["hsl(120, 0.8, 0.6, 0.5)", { hue: 120, saturation: 80, light: 60, alpha: 50 }],
		// hsla
		["hsla(0, 0, 0)", { hue: 0, saturation: 0, light: 0, alpha: 100 }],
		["hsla(120, 80%, 60%)", { hue: 120, saturation: 80, light: 60, alpha: 100 }],
		["hsla(234, 57%, 100%)", { hue: 234, saturation: 57, light: 100, alpha: 100 }], // comma
		["hsla(120/ 80%/ 60%)", { hue: 120, saturation: 80, light: 60, alpha: 100 }], // slash
		["hsla(120 80% 60%)", { hue: 120, saturation: 80, light: 60, alpha: 100 }], // just space
		["hsla(120, 0.8, 0.6)", { hue: 120, saturation: 80, light: 60, alpha: 100 }], // value/1
		["hsla(180deg, 0.8, 0.6)", { hue: 180, saturation: 80, light: 60, alpha: 100 }], // deg hue value
		["hsla(0.5turn, 0.8, 0.6)", { hue: 180, saturation: 80, light: 60, alpha: 100 }], // turn hue value
		["hsla(200grad, 0.8, 0.6)", { hue: 180, saturation: 80, light: 60, alpha: 100 }], // grad hue value
		["hsla(3.1415rad, 0.8, 0.6)", { hue: 180, saturation: 80, light: 60, alpha: 100 }], // rad hue value
		["hsla(120, 80%, 60%, 100%)", { hue: 120, saturation: 80, light: 60, alpha: 100 }], // alpha %
		["hsla(120, 0.8, 0.6, 1)", { hue: 120, saturation: 80, light: 60, alpha: 100 }], // alpha /1
		["hsla(120, 80%, 60%, 50%)", { hue: 120, saturation: 80, light: 60, alpha: 50 }],
		["hsla(120, 0.8, 0.6, 0.5)", { hue: 120, saturation: 80, light: 60, alpha: 50 }],
	];
	describe.each(correctHueValues)('For "%s", should be %o', (cssString, expected) => {
		test.each(getCssTypes(cssString))(`in %s`, argument => {
			const color = new Color(argument);
			for (const property in expected) {
				expect(color[property]).toBe(expected[property]);
			}
		});
	});

	const multiCaseValues = [
		// hexa
		["#FFF", "toHex", "#ffffff"],
		["#aBcD", "toHex", "#aabbccdd"],
		["#AbCdEf", "toHex", "#abcdef"],
		["#fEdC34BA", "toHex", "#fedc34ba"],

		// rgb
		["RGB(0, 255, 0)", "toRgb", "rgb(0, 255, 0)"],
		["RgB(0, 255, 0)", "toRgb", "rgb(0, 255, 0)"],
		["rgbA(0, 255, 0, 50%)", "toRgb", "rgba(0, 255, 0, 0.5)"],
		["RGBA(0, 255, 0, 50%)", "toRgb", "rgba(0, 255, 0, 0.5)"],

		// hsl
		["HSL(120, 80%, 60%)", "toHsl", "hsl(120, 80%, 60%)"],
		["hsLA(120, 80%, 60%, 50%)", "toHsl", "hsla(120, 80%, 60%, 50%)"],
		["hsl(180DeG, 0.8, 0.6)", "toHsl", "hsl(180, 80%, 60%)"],
		["hsl(0.5TUrn, 0.8, 0.6)", "toHsl", "hsl(180, 80%, 60%)"],
		["hsl(200gRAd, 0.8, 0.6)", "toHsl", "hsl(180, 80%, 60%)"],
		["hsl(3.1415rAD, 0.8, 0.6)", "toHsl", "hsl(180, 80%, 60%)"],
	];
	describe.each(multiCaseValues)(
		'should be case insensible. For "%s" %s should be %s',
		(cssString, method, expected) => {
			test.each(getCssTypes(cssString))(`in %s`, argument => {
				const color = new Color(argument);
				expect(color[method]()).toBe(expected);
			});
		}
	);

	const extraSpaceValues = [
		// hexa
		["  #fff  ", "toHex", "#ffffff"],
		["  #abcd  ", "toHex", "#aabbccdd"],
		["  #abcdef  ", "toHex", "#abcdef"],
		["  #fedc34ba  ", "toHex", "#fedc34ba"],

		// rgb
		["  rgb(0, 255, 0)  ", "toRgb", "rgb(0, 255, 0)"],
		["rgb(  0  ,  255  ,  0  )", "toRgb", "rgb(0, 255, 0)"],
		["rgb(  0  255  0  )", "toRgb", "rgb(0, 255, 0)"],
		["  rgba(0, 255, 0, 50%)  ", "toRgb", "rgba(0, 255, 0, 0.5)"],
		["rgba(  0  ,  255  ,  0  ,  50%  )", "toRgb", "rgba(0, 255, 0, 0.5)"],
		["rgba(  0   255  0  50%  )", "toRgb", "rgba(0, 255, 0, 0.5)"],

		// hsl
		["   hsl(120, 80%, 60%)   ", "toHsl", "hsl(120, 80%, 60%)"],
		["hsl(  120  ,  80%  ,  60%  )", "toHsl", "hsl(120, 80%, 60%)"],
		["hsl(  120  80%  60%  )", "toHsl", "hsl(120, 80%, 60%)"],
		["   hsla(120, 80%, 60%, 50%)   ", "toHsl", "hsla(120, 80%, 60%, 50%)"],
		["hsla(  120  ,  80%  ,  60%  ,  50%  )", "toHsl", "hsla(120, 80%, 60%, 50%)"],
		["hsla(  120  80%  60%  50%  )", "toHsl", "hsla(120, 80%, 60%, 50%)"],
	];
	describe.each(extraSpaceValues)(
		'extra space should be ignored: For "%s" %s should be %s',
		(cssString, method, expected) => {
			test.each(getCssTypes(cssString))(`in %s`, argument => {
				const color = new Color(argument);
				expect(color[method]()).toBe(expected);
			});
		}
	);
});

// Other color constructor :
describe("color from Color", () => {
	let parent = new Color(10, 10, 10, 10);
	const refTypes = [
		parent, // direct value
		{ ref: parent }, // named value
		{ parentColor: parent }, // alias
	];

	describe.each(refTypes)("child with Color parent should inherit parent color", arg => {
		const child = new Color(arg);
		test.each(properties)("%s property", property => {
			expect(child[property]).toBe(10);
		});
	});

	describe.each(refTypes)("if parent change, child should inherit changes", arg => {
		const child = new Color(arg);
		test.each(properties)("%s property", property => {
			parent[property] = 20;
			expect(child[property]).toBe(20);
			parent[property] = 54.99;
			expect(child[property]).toBe(55);
		});
	});

	describe.each(refTypes)("if direct property is setted, parent property is ignored", arg => {
		const child = new Color(arg);
		test.each(properties)("%s property", property => {
			child[property] = 30;
			expect(child[property]).toBe(30);
		});
	});
});

// Offsets :
const offsets = [
	["hueOffset", "hue"],
	["saturationOffset", "saturation"],
	["lightOffset", "light"],
	["alphaOffset", "alpha"],
];
describe.each(offsets)("offsets :", (offset, property) => {
	const parent = new Color({ hue: 10, saturation: 10, light: 10, alpha: 10 });
	const getOffsetTypes = testedValue => [
		[[parent, { [property]: testedValue }]],
		[[{ ref: parent, [offset]: testedValue }]],
		[[{ ref: parent, offsets: { [property]: testedValue } }]],
	];

	const offsetNumberValues =
		property === "hue"
			? [
					// positive values
					[0, 10],
					[+0, 10],
					[10, 20],
					[+10, 20],
					[57, 67],
					[100, 110],
					[234, 244],
					[360, 10],
					[540, 190],
					[3600, 10],
					// negative values
					[-0, 10],
					[-10, 0],
					[-57, 313],
					[-100, 270],
					[-360, 10],
					[-540, 190],
					[-36000, 10],
					// float values
					[0.01, 10],
					[-0.01, 10],
					[10.1, 20.1],
					[359.99, 10],
			  ]
			: [
					// positive values
					[0, 10],
					[+0, 10],
					[10, 20],
					[+10, 20],
					[57, 67],
					[90, 100],
					[100, 100],
					[101, 100],
					[99999, 100],
					// negative values
					[-0, 10],
					[-10, 0],
					[-57, 0],
					[-100, 0],
					[-99999, 0],
					// float values
					[0.01, 10],
					[-0.01, 10],
					[10.1, 20.1],
					[89.99, 100],
			  ];
	describe.each(offsetNumberValues)(
		`if ${property} offset is a number : child.${property} should be parent.${property} + ${offset} : with %s`,
		(offsetValue, expected) => {
			test.each(getOffsetTypes(offsetValue))("in %s argument", arg => {
				const child = new Color(...arg);
				expect(child[property]).toBe(expected);
			});
			test("in offset setter", () => {
				const child = new Color(parent);
				child[offset] = offsetValue;
				expect(child[property]).toBe(expected);
			});
		}
	);

	describe(`if ${property} offset is a function :`, () => {
		describe(`callback should get parent.${property} as parameter`, () => {
			test.each(getOffsetTypes(prop => prop))("for %s argument", arg => {
				const child = new Color(...arg);
				expect(child[property]).toBe(parent[property]);
			});
			test("for offset setter", () => {
				const child = new Color(parent);
				child[offset] = prop => prop;
				expect(child[property]).toBe(parent[property]);
			});
		});

		const offsetCallbackValues =
			property === "hue"
				? [
						// positive values
						[() => 0, 0],
						[() => +0, 0],
						[() => 10, 10],
						[() => +10, 10],
						[() => 57, 57],
						[() => 234, 234],
						[() => 360, 0],
						[() => 540, 180],
						[() => 3600, 0],
						// negative values
						[() => -0, 0],
						[() => -10, 350],
						[() => -57, 303],
						[() => -360, 0],
						[() => -540, 180],
						[() => -36000, 0],
						// float values
						[() => 0.01, 0],
						[() => -0.01, 0],
						[() => 10.1, 10.1],
						[() => 359.99, 0],
				  ]
				: [
						// positive values
						[() => 0, 0],
						[() => +0, 0],
						[() => 10, 10],
						[() => +10, 10],
						[() => 57, 57],
						[() => 100, 100],
						[() => 101, 100],
						[() => 99999, 100],
						// negative values
						[() => -0, 0],
						[() => -10, 0],
						[() => -57, 0],
						[() => -100, 0],
						[() => -99999, 0],
						// float values
						[() => 0.01, 0],
						[() => -0.01, 0],
						[() => 10.1, 10.1],
						[() => 99.99, 100],
				  ];
		describe.each(offsetCallbackValues)(
			`child.${property} should be return by ${offset}(parent.${property}) : with %s`,
			(offsetValue, expected) => {
				test.each(getOffsetTypes(offsetValue))("in %s argument", arg => {
					const child = new Color(...arg);
					expect(child[property]).toBe(expected);
				});
				test("in offset setter", () => {
					const child = new Color(parent);
					child[offset] = offsetValue;
					expect(child[property]).toBe(expected);
				});
			}
		);
	});

	test.each([50, () => 50])(`if Color have no parent, ${offset} is ignored`, offsetvalue => {
		const color = new Color({
			properties: { hue: 10, saturation: 10, light: 10, alpha: 10 },
			offsets: { [property]: offsetvalue },
		});
		expect(color[property]).toBe(10);
	});
});

// Extra arguments in constructor :
describe("extra argument should be ignored", () => {
	const everyTypes = [null, undefined, 0, 1, NaN, true, false, "toto", {}, [], () => {}, new Color()];
	const everyProp = [
		"hue",
		"saturation",
		"light",
		"alpha",
		"hueOffset",
		"saturationOffset",
		"lightOffset",
		"alphaOffset",
	];

	describe("For number color constructor : ", () => {
		test.each(everyTypes)("%s should not throw any error", type => {
			const testArg = () => new Color(null, null, null, null, type);
			expect(testArg).not.toThrow();
		});

		test.each(everyProp)("should not change %s property", prop => {
			const baseColor = new Color();
			const extraColor = new Color(null, null, null, null, 10);
			expect(extraColor[prop]).toBe(baseColor[prop]);
		});
	});

	describe("For CSS color string constructor : ", () => {
		test.each(everyTypes)("%s should not throw any error", type => {
			const testArg = () => new Color("#f00", type);
			expect(testArg).not.toThrow();
		});

		test.each(everyProp)("should not change %s property", prop => {
			const baseColor = new Color("#f00");
			const extraColor = new Color("#f00", 10);
			expect(extraColor[prop]).toBe(baseColor[prop]);
		});
	});

	describe("For Color + offset constructor : ", () => {
		test.each(everyTypes)("%s should not throw any error", type => {
			const parent = new Color();
			const testArg = () => new Color(parent, {}, type);
			expect(testArg).not.toThrow();
		});

		test.each(everyProp)("should not change %s property", prop => {
			const parent = new Color();
			const baseColor = new Color(parent, {});
			const extraColor = new Color(parent, {}, 10);
			expect(extraColor[prop]).toBe(baseColor[prop]);
		});

		test.each(everyTypes)("extra props with %s in offsets should not throw any error", type => {
			const parent = new Color();
			const testArg = () => new Color(parent, { toto: type });
			expect(testArg).not.toThrow();
		});

		test.each(everyProp)("extra props in offsets should not change %s property", prop => {
			const parent = new Color();
			const baseColor = new Color(parent, {});
			const extraColor = new Color(parent, { toto: 10 });
			expect(extraColor[prop]).toBe(baseColor[prop]);
		});
	});

	describe("For named props constructor : ", () => {
		test.each(everyTypes)("%s should not throw any error", type => {
			const testArg = () => new Color({}, type);
			expect(testArg).not.toThrow();
		});

		test.each(everyProp)("should not change %s property", prop => {
			const baseColor = new Color({});
			const extraColor = new Color({}, 10);
			expect(extraColor[prop]).toBe(baseColor[prop]);
		});

		test.each(everyTypes)("extra prop with %s should not throw any error", type => {
			const testArg = () => new Color({ toto: type });
			expect(testArg).not.toThrow();
		});

		test.each(everyProp)("extra prop should not change %s property", prop => {
			const baseColor = new Color({});
			const extraColor = new Color({ toto: 10 });
			expect(extraColor[prop]).toBe(baseColor[prop]);
		});

		test.each(everyTypes)("extra prop with %s in the properties collection should not throw any error", type => {
			const testArg = () => new Color({ properties: { toto: type } });
			expect(testArg).not.toThrow();
		});

		test.each(everyProp)("extra prop in the properties collection should not change %s property", prop => {
			const baseColor = new Color({});
			const extraColor = new Color({ properties: { toto: 10 } });
			expect(extraColor[prop]).toBe(baseColor[prop]);
		});

		test.each(everyTypes)("extra prop with %s in the offsets collection should not throw any error", type => {
			const parent = new Color();
			const testArg = () => new Color({ ref: parent, offsets: { toto: type } });
			expect(testArg).not.toThrow();
		});

		test.each(everyProp)("extra prop in the offsets collection should not change %s property", prop => {
			const parent = new Color();
			const baseColor = new Color({ ref: parent });
			const extraColor = new Color({ ref: parent, offsets: { toto: 10 } });
			expect(extraColor[prop]).toBe(baseColor[prop]);
		});
	});
});
