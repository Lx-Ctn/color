import Color from "../index.js";
import { getErrorMessage } from "../src/errorMessages.js";

describe("1st argument :", () => {
	const expected1stArgTypes = [100, "0.5turn", "#f0f", {}, new Color(), null, undefined];

	test.each([true, false, [], () => {}])("if %s is passed for the 1st argument, it should throw a error", arg => {
		const getNewColor = () => new Color(arg);
		const isArg = true;

		expect(() => getNewColor(true)).toThrow(new TypeError(getErrorMessage.directValues("main", arg, isArg)));
	});

	const wrongStringArguments = [
		// generic
		"",
		"toto",
		"red",
		// angle
		"3turns",
		"230degrees",
		// hexa
		"#",
		"#red",
		"#ff",
		"#ff34vv",
		// rgb
		"rgb",
		"rgb()",
		"rgb(0, 0)",
		// hsl
		"hsl",
		"hsl()",
		"hsl(0, 0)",
	];
	test.each(wrongStringArguments)(
		"wrong type of string in 1st argument should throw error",
		wrongStringArgument => {
			const getNewColor = () => new Color(wrongStringArgument);
			expect(getNewColor).toThrow(new TypeError(getErrorMessage.stringArgument(wrongStringArgument)));
		}
	);

	test("If the 1st argument is NaN, a TypeError should be thrown", () => {
		// NaN is a number and should thrown a direct "Hue" value message
		const getNan = () => new Color(NaN);
		const isArg = true;

		expect(getNan).toThrow(new TypeError(getErrorMessage.directValues("hue", NaN, isArg)));
	});

	test.each(expected1stArgTypes)("%s in the 1st argument should not throw error", expectedType => {
		const getNewColor = () => new Color(expectedType);

		expect(() => getNewColor(true)).not.toThrow();
	});
});

describe.each(["saturation", "light", "alpha"])("For the %s direct value in constructor :", property => {
	// If the 1st argument is a number, a <angle> string, null ou undefined :

	const expectedDirectValueTypes = [100, null, undefined];
	const wrongDirectValueTypes = [NaN, true, false, "toto", {}, [], () => {}, new Color()];

	test.each(wrongDirectValueTypes)(
		`If the ${property} get , a direct value TypeError should be thrown`,
		wrongType => {
			const args = { hue: 0, saturation: 0, light: 0, alpha: 0 }; // all arguments init with a correct number value
			args[property] = wrongType; // except the tested interation
			const getArg = () => new Color(args.hue, args.saturation, args.light, args.alpha);
			const isArg = true;

			expect(getArg).toThrow(new TypeError(getErrorMessage.directValues(property, wrongType, isArg)));
		}
	);
	test.each(expectedDirectValueTypes)("If the 2nd argument is %s, no error should be thrown", rightType => {
		const args = { hue: 0, saturation: 0, light: 0, alpha: 0 }; // all arguments init with a correct number value
		args[property] = rightType; // except the tested interation
		const getArg = () => new Color(args.hue, args.saturation, args.light, args.alpha);
		expect(getArg).not.toThrow();
	});
});

describe("2nd argument if the 1st argument is a Color: ", () => {
	const parent = new Color();
	const expectedOffsetsTypes = [{}, null, undefined];
	const wrongOffsetsTypes = [NaN, true, false, "toto", [], () => {}];

	test.each(wrongOffsetsTypes)(
		"If the 2nd argument is %s after a Color ref in the 1st, a offsets TypeError should be thrown",
		wrongType => {
			const getArg = () => new Color(parent, wrongType);
			expect(getArg).toThrow(new TypeError(getErrorMessage.object.set(wrongType, "offsets")));
		}
	);
	test.each(expectedOffsetsTypes)("If the 2nd argument is %s, no error should be thrown", rightType => {
		const getArg = () => new Color(parent, rightType);
		expect(getArg).not.toThrow();
	});
});
/*



*/ // Color properties :
describe.each(["hue", "saturation", "light", "alpha"])("TypeError For the %s color property :", property => {
	// Color properties accepts only a number.
	// Correct <angle> string for hue are tested in the properties test files.
	const expectedPropertyTypes = [null, undefined, 100];
	const wrongPropertyTypes = [NaN, true, false, "toto", {}, [], () => {}, new Color()];

	// In the main object argument :
	test.each(wrongPropertyTypes)(
		`if the ${property} property is %s in 1st argument, a TypeError should be thrown`,
		wrongPropertyType => {
			const setProp = () => new Color({ [property]: wrongPropertyType });

			expect(setProp).toThrow(new TypeError(getErrorMessage.object.properties(property, wrongPropertyType)));
		}
	);
	test.each(expectedPropertyTypes)(
		`if the ${property} property is %s in 1st argument, no error should be thrown`,
		expectedPropertyType => {
			const setProp = () => new Color({ [property]: expectedPropertyType });
			expect(setProp).not.toThrow();
		}
	);

	// In the "properties" collection of the main object argument :
	test.each(wrongPropertyTypes)(
		`if the ${property} property is %s in the "properties" collection of the 1st argument, a TypeError should be thrown`,
		wrongPropertyType => {
			const properties = { [property]: wrongPropertyType };
			const setProp = () => new Color({ properties });

			expect(setProp).toThrow(new TypeError(getErrorMessage.object.properties(property, wrongPropertyType)));
		}
	);
	test.each(expectedPropertyTypes)(
		`if the ${property} property is %s in the "properties" collection of the  1st argument, no error should be thrown`,
		expectedPropertyType => {
			const setProp = () => new Color({ properties: { [property]: expectedPropertyType } });
			expect(setProp).not.toThrow();
		}
	);

	// Color property setter (Color.hue) accept only a number.
	test.each(wrongPropertyTypes)(
		`if the ${property} property setter is %s, a TypeError should be thrown`,
		wrongPropertyType => {
			const color = new Color();
			const setProp = () => (color[property] = wrongPropertyType);

			expect(setProp).toThrow(new TypeError(getErrorMessage.directValues(property, wrongPropertyType)));
		}
	);
	test.each(expectedPropertyTypes)(
		`if the ${property} property setter is a number, no error should be thrown`,
		expectedPropertyType => {
			const color = new Color();
			const setProp = () => (color[property] = expectedPropertyType);
			expect(setProp).not.toThrow();
		}
	);
});
/*


*/ // Offsets :
describe.each([
	["hueOffset", "hue"],
	["saturationOffset", "saturation"],
	["lightOffset", "light"],
	["alphaOffset", "alpha"],
])("TypeError for the %s property setter:", (offset, property) => {
	// Offset property accept only a number or a callback.
	const rightPropertyTypes = [100, () => {}, null, undefined];
	const wrongPropertyTypes = [NaN, true, false, "toto", {}, [], new Color()];

	// direct offsets in the main object argument :
	test.each(wrongPropertyTypes)(
		`if the ${offset} property in 1st argument is %s, a TypeError should be thrown`,
		wrongPropertyType => {
			const setOffset = () => new Color({ [offset]: wrongPropertyType });
			const isArg = true;

			expect(setOffset).toThrow(new TypeError(getErrorMessage.offset(property, wrongPropertyType, isArg)));
		}
	);
	test.each(rightPropertyTypes)(
		`if the ${offset} property in 1st argument is %s, no error should be thrown`,
		rightPropertyType => {
			const setOffset = () => new Color({ [offset]: rightPropertyType });
			expect(setOffset).not.toThrow();
		}
	);

	// offsets in the offsets collection of the main object argument :
	test.each(wrongPropertyTypes)(
		`if the ${offset} property in 1st argument is %s, a TypeError should be thrown`,
		wrongPropertyType => {
			const offsets = { [property]: wrongPropertyType };
			const setOffset = () => new Color({ offsets });
			const isArg = true;

			expect(setOffset).toThrow(new TypeError(getErrorMessage.offset(property, wrongPropertyType, isArg)));
		}
	);
	test.each(rightPropertyTypes)(
		`if the ${offset} property in 1st argument is %s, no error should be thrown`,
		rightPropertyType => {
			const offsets = { [property]: rightPropertyType };
			const setOffset = () => new Color({ offsets });

			expect(setOffset).not.toThrow();
		}
	);

	// Offsets in 2nd argument (when the 1st is a Color)
	test.each(wrongPropertyTypes)(
		`if the ${property} offset property in 2nd argument is %s, a TypeError should be thrown`,
		wrongPropertyType => {
			const parent = new Color();
			const setOffset = () => new Color(parent, { [property]: wrongPropertyType });
			const isArg = true;

			expect(setOffset).toThrow(new TypeError(getErrorMessage.offset(property, wrongPropertyType, isArg)));
		}
	);
	test.each(rightPropertyTypes)(
		`if the ${property} offset property in 2nd argument is %s, no error should be thrown`,
		rightPropertyType => {
			const parent = new Color();
			const setOffset = () => new Color(parent, { [property]: rightPropertyType });

			expect(setOffset).not.toThrow();
		}
	);

	// Offset property setter (Color.hue) accept only a number or a callback.
	test.each(wrongPropertyTypes)(
		`if the ${offset} property setter is %s, a TypeError should be thrown`,
		wrongPropertyType => {
			const color = new Color();
			const setOffset = () => (color[offset] = wrongPropertyType);

			expect(setOffset).toThrow(new TypeError(getErrorMessage.offset(property, wrongPropertyType)));
		}
	);
	test.each(rightPropertyTypes)(
		`if the ${offset} property setter is %s, no error should be thrown`,
		rightPropertyType => {
			const color = new Color();
			const setOffset = () => (color[offset] = rightPropertyType);

			expect(setOffset).not.toThrow();
		}
	);

	// Callback should return a number :
	const rightReturnTypes = [100];
	const wrongReturnTypes = [NaN, null, undefined, true, false, "toto", {}, [], new Color(), () => {}];

	test.each(wrongReturnTypes)(
		`if the ${offset} callback return %s, a TypeError should be thrown`,
		wrongReturnType => {
			const parent = new Color();
			const child = new Color(parent, { [property]: () => wrongReturnType });

			const getProp = () => child[property];
			expect(getProp).toThrow(new TypeError(getErrorMessage.callback(property, wrongReturnType)));
		}
	);
	test(`if the ${offset} callback return %s, no error should be thrown`, () => {
		const parent = new Color();
		const child = new Color(parent, { [property]: () => rightReturnTypes[0] });

		const getProp = () => child[property];
		expect(getProp).not.toThrow();
	});
});
/*



*/ // Main object argument :
describe("In main object argument :", () => {
	// ref \ parentColor prop :
	describe.each(["ref", "parentColor"])('if "%s" is', ref => {
		const expectedRefTypes = [new Color(), null, undefined];
		const wrongRefTypes = [100, NaN, true, false, "toto", {}, [], () => {}];
		test.each(wrongRefTypes)("%s, a TypeError should be thrown", wrongType => {
			const setProp = () => new Color({ [ref]: wrongType });
			expect(setProp).toThrow(new TypeError(getErrorMessage.object.parentColor(wrongType)));
		});
		test.each(expectedRefTypes)(`%s, no error shoumd be thrown`, expectedType => {
			const setProp = () => new Color({ [ref]: expectedType });
			expect(setProp).not.toThrow();
		});
	});

	// css prop :
	const expectedCssTypes = ["#f0f", "rgb(0,0,0)", "hsl(0,0,0)", null, undefined];
	const wrongCssTypes = [100, NaN, true, false, "toto", {}, [], () => {}, new Color()];
	test.each(wrongCssTypes)('if "css" is %s, a TypeError should be thrown', wrongType => {
		const setProp = () => new Color({ css: wrongType });
		expect(setProp).toThrow(new TypeError(getErrorMessage.object.css(wrongType)));
	});
	test.each(expectedCssTypes)(`if "css" is %s, no error shoumd be thrown`, expectedType => {
		const setProp = () => new Color({ css: expectedType });
		expect(setProp).not.toThrow();
	});

	// Collection objects (color properties & offsets) :
	describe.each(["properties", "offsets"])("if %s is", collection => {
		const expectedSetTypes = [{}, null, undefined];
		const wrongSetTypes = [100, NaN, true, false, "toto", [], () => {}];
		test.each(wrongSetTypes)("%s, a TypeError should be thrown", wrongType => {
			const setProp = () => new Color({ [collection]: wrongType });
			expect(setProp).toThrow(new TypeError(getErrorMessage.object.set(wrongType, collection)));
		});
		test.each(expectedSetTypes)("%s, no errors should be thrown", expectedType => {
			const setProp = () => new Color({ [collection]: expectedType });
			expect(setProp).not.toThrow();
		});
	});
});
