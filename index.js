/**
 * Create a color object with hsl format + optionnal alpha
 * @class
 *
 * Allows easy interaction with colors, to create dynamic color theme or complexe color animations.
 * E.g : easy access to tints and shades of a color through the light property variation.
 *
 * A other Color object can be passed as argument :
 * It will be the reference to keep a dynamic link with it's properties :
 * 		const mainColor = new Color(360, 90, 70);
 * 		const darkMainColor = new Color(mainColor, null, -30);
 * 		mainColor.hue = 30;
 * 		=> darkMainColor : (30, 90, 40)
 * The new instance inherits the changes on the reference, unless the property is overwritten on the new one.
 * Offset properties allows a dynamic offset with the reference's value.
 * => Ideal for dynamic color theme management.
 *
 * @param	{Color|string|number|object} [color=0] - Set values (from a other Color or a CSS color string) or set hue from number (optional - 0 by default - 0° Hue get a pure red color)
 * @param	{number|object}	[saturation=100] - Set the saturation value (optional - 100% by default)
 * @param	{number}	[light=50]	- Set the light value (optional - 50% by default)
 * @param	{number}	[alpha=100] - Set the alpha value (optional - 100% by default)
 */

/*
	TODO: 
	- feat : creation of "helpers" / ex: helper shadow = sat / 2 && light - 40% && alpha / 2  => shadows + color = shadowColor
	- feat : method that export the status of the color (values, offset, hasReference) for debbug reason
	- feat : easy dark/light theme integration ?
	- feat : set limits to color variation
	- feat : add a remove method to reset fixed properties
	- doc : add useful exemple in the README section 
	- feat : add .parent with .ref alias to get parent color
	- feat : allowing the remplacement of all color properties through a new color property, 
				who act like the contructor function, accepting the same arguments, with value, css color strings and Color object
	- feat : switch to TS !
	*/

import { getErrorMessage } from "./src/errorMessages.js";
import * as checkTypes from "./src/checkTypes.js";

export const defaultValues = {
	properties: {
		hue: 0,
		saturation: 100,
		light: 50,
		alpha: 100,
	},
	offsets: {
		hue: 0,
		saturation: 0,
		light: 0,
		alpha: 0,
	},
};

class Color {
	// Parameters are protected to ensure min and max values (properties from 0 to 100%),
	// the rotation around the color wheel,
	// And type checking
	#colorReference;
	#hue;
	#saturation;
	#light;
	#alpha;
	#offsets = { ...defaultValues.offsets };

	constructor(
		color = defaultValues.properties.hue,
		saturation = defaultValues.properties.saturation,
		light = defaultValues.properties.light,
		alpha = defaultValues.properties.alpha
	) {
		// If we get direct number value :
		if (color instanceof Number || typeof color === "number" || color === null) {
			checkTypes.directValueArgument(arguments);
			this.setColorProperties({ hue: color, saturation, light, alpha });

			// If we get a <angle> string for hue value ("180deg", "0.5turn"):
		} else if (isValidHueString(color)) {
			checkTypes.directValueArgument(arguments);
			this.setColorProperties({ hue: getValueFromHueString(color), saturation, light, alpha });

			// If we get a CSS color string :
		} else if (color instanceof String || typeof color === "string") {
			const hslValues = handleCssColorStrings(color);
			this.setColorProperties(hslValues);

			// If we get a Color object :
		} else if (color instanceof Color) {
			this.#colorReference = color;
			const offsets = arguments[1];
			checkTypes.offsetObjectArgument(offsets) && this.setColorOffsets(offsets);

			// If we get a object with named properties :
		} else if (checkTypes.isLiteralObject(color)) {
			const constructor = handleNamedProperties(color);
			this.#colorReference = constructor.ref;
			constructor.properties && this.setColorProperties(constructor.properties);
			constructor.offsets && this.setColorOffsets(constructor.offsets);

			//
		} else throw new TypeError(getErrorMessage.directValues("main", color, true));
	}

	#getValueFromOffset(value) {
		const refValue = this.#colorReference?.[value];
		const valueOffset = this.#offsets[value];

		if (typeof valueOffset === "function") {
			const valueFromCallback = valueOffset(refValue);
			checkTypes.callbackReturnValue(value, valueFromCallback);
			return valueFromCallback;
		} else return refValue + valueOffset;
	}

	/*



	/****************************/
	/***  Color properties :  ***/
	/****************************/

	// Hue :
	get hue() {
		const hueFromOffset = () => getFormatedHue(this.#getValueFromOffset("hue"));
		return this.#hue ?? hueFromOffset();
	}
	set hue(hue) {
		if (isValidHueString(hue)) hue = getValueFromHueString(hue);
		if (checkTypes.property("hue", hue)) this.#hue = getFormatedHue(hue);
	}

	// Saturation :
	get saturation() {
		const saturationFromOffset = () => getFormatedValue(this.#getValueFromOffset("saturation"));
		return this.#saturation ?? saturationFromOffset();
	}
	set saturation(saturation) {
		if (checkTypes.property("saturation", saturation)) this.#saturation = getFormatedValue(saturation);
	}

	// Light :
	get light() {
		const lightFromOffset = () => getFormatedValue(this.#getValueFromOffset("light"));
		return this.#light ?? lightFromOffset();
	}
	set light(light) {
		if (checkTypes.property("light", light)) this.#light = getFormatedValue(light);
	}

	// Alpha :
	get alpha() {
		const alphaFromOffset = () => getFormatedValue(this.#getValueFromOffset("alpha"));
		return this.#alpha ?? alphaFromOffset();
	}
	set alpha(alpha) {
		if (checkTypes.property("alpha", alpha)) this.#alpha = getFormatedValue(alpha);
	}

	/*



	/*******************/
	/***  Offsets :  ***/
	/*******************/

	// Hue offset :
	get hueOffset() {
		return this.#offsets.hue;
	}
	set hueOffset(hueOffset) {
		if (checkTypes.offset("hue", hueOffset)) this.#offsets.hue = hueOffset;
	}

	// Saturation offset :
	get saturationOffset() {
		return this.#offsets.saturation;
	}
	set saturationOffset(saturationOffset) {
		if (checkTypes.offset("saturation", saturationOffset)) this.#offsets.saturation = saturationOffset;
	}

	// Light offset :
	get lightOffset() {
		return this.#offsets.light;
	}
	set lightOffset(lightOffset) {
		if (checkTypes.offset("light", lightOffset)) this.#offsets.light = lightOffset;
	}

	// Alpha offset :
	get alphaOffset() {
		return this.#offsets.alpha;
	}
	set alphaOffset(alphaOffset) {
		if (checkTypes.offset("alpha", alphaOffset)) this.#offsets.alpha = alphaOffset;
	}

	/*


	/*******************/
	/***  Methods :  ***/
	/*******************/

	// Export CSS string :
	toHsl() {
		return this.alpha === 100
			? `hsl(${this.hue}, ${this.saturation}%, ${this.light}%)`
			: `hsla(${this.hue}, ${this.saturation}%, ${this.light}%, ${this.alpha}%)`;
	}
	toRgb() {
		const [red, green, blue] = hslToRgb(this.hue, this.saturation, this.light);
		return this.alpha === 100
			? `rgb(${red}, ${green}, ${blue})`
			: `rgba(${red}, ${green}, ${blue}, ${(this.alpha * 10) / 1000})`; // prevent decimal precision problem.
	}
	toHex() {
		const getHex = value => {
			const hex = value.toString(16);
			return hex.length < 2 ? hex.padStart(2, "0") : hex; // need "00" instead of "0"
		};
		const [red, green, blue] = hslToRgb(this.hue, this.saturation, this.light).map(value => getHex(value));
		const alpha = getHex(Math.round((this.alpha * 255) / 100));
		return this.alpha === 100 ? `#${red}${green}${blue}` : `#${red}${green}${blue}${alpha}`;
	}

	// Set all properties at once :
	setColorProperties(properties = defaultValues.properties) {
		this.#hue = getFormatedHue(properties.hue ?? defaultValues.properties.hue);
		this.#saturation = getFormatedValue(properties.saturation ?? defaultValues.properties.saturation);
		this.#light = getFormatedValue(properties.light ?? defaultValues.properties.light);
		this.#alpha = getFormatedValue(properties.alpha ?? defaultValues.properties.alpha);
	}

	setColorOffsets(offsets = defaultValues.offsets) {
		this.#offsets.hue = offsets.hue ?? defaultValues.offsets.hue;
		this.#offsets.saturation = offsets.saturation ?? defaultValues.offsets.saturation;
		this.#offsets.light = offsets.light ?? defaultValues.offsets.light;
		this.#offsets.alpha = offsets.alpha ?? defaultValues.offsets.alpha;
	}
}

export default Color;
/*





/*****************/
/***  Utils :  ***/
/*****************/

const roundAt1Decimal = number => Math.round(number * 10) / 10;
const isValue = value => value !== null && value !== undefined;

// Allow every argument but export the right HSL value :
const getFormatedHue = hue => {
	hue = roundAt1Decimal(hue);
	if (hue >= 360) return roundAt1Decimal(hue % 360); // js math float approximation problem
	if (hue <= 0) return hue % 360 === 0 ? 0 : roundAt1Decimal(hue % 360) + 360;
	return hue;
};
const getFormatedValue = (value, max = 100) => {
	value = roundAt1Decimal(value);
	return value > max ? max : value <= 0 ? 0 : value;
};

/**
 * Converts an RGB color value to HSL.
 * Conversion formula adapted from https://gist.github.com/mjackson/5311256
 */
const rgbToHsl = ({ red, green, blue, alpha = 255 }) => {
	red /= 255;
	green /= 255;
	blue /= 255;
	alpha /= 255;

	const max = Math.max(red, green, blue),
		min = Math.min(red, green, blue);
	let hue,
		saturation,
		light = (max + min) / 2;

	if (max === min) {
		hue = saturation = 0; // achromatic
	} else {
		const delta = max - min;
		saturation = light > 0.5 ? delta / (2 - max - min) : delta / (max + min);

		switch (max) {
			case red:
				hue = (green - blue) / delta + (green < blue ? 6 : 0);
				break;
			case green:
				hue = (blue - red) / delta + 2;
				break;
			case blue:
				hue = (red - green) / delta + 4;
				break;
			default:
				break;
		}

		hue /= 6;
	}

	// Keeping a 1 decimal value for precision compare to hex and rgb values :
	hue = roundAt1Decimal(hue * 360);
	saturation = roundAt1Decimal(saturation * 100);
	light = roundAt1Decimal(light * 100);
	alpha = roundAt1Decimal(alpha * 100);
	return { hue, saturation, light, alpha };
};

/**
 * Convert an HSL color value to RGB.
 * Conversion formula adapted from https://gist.github.com/mjackson/5311256
 */
const hslToRgb = (hue, saturation, light) => {
	hue /= 360;
	saturation /= 100;
	light /= 100;

	let red, green, blue;

	if (saturation === 0) {
		red = green = blue = light; // achromatic
	} else {
		function hueToRgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 3 / 6) return q;
			if (t < 4 / 6) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}

		const q = light < 0.5 ? light * (1 + saturation) : light + saturation - light * saturation;
		const p = 2 * light - q;

		red = hueToRgb(p, q, hue + 2 / 6);
		green = hueToRgb(p, q, hue);
		blue = hueToRgb(p, q, hue - 2 / 6);
	}

	red = Math.round(red * 255);
	green = Math.round(green * 255);
	blue = Math.round(blue * 255);
	return [red, green, blue];
};
/*





/*************************************/
/***  Handling named properties :  ***/
/*************************************/

const isProperty = props =>
	isValue(props.hue) || isValue(props.saturation) || isValue(props.light) || isValue(props.alpha);

const handleNamedProperties = props => {
	let ref = null,
		properties = null,
		offsets = null;

	// Color properties (hue, saturation, light, alpha) :
	if (checkTypes.propsSetObject(props.properties, "properties") || isProperty(props)) {
		properties = handleColorProperties({ ...props, ...props.properties });
	} else if (isValue(props.css)) {
		properties = handleCssColorStrings(props.css, true);
	}

	// Parent Color object as ref :
	if (isValue(props.ref) || isValue(props.parentColor)) {
		ref = checkTypes.parentColor(props.ref, Color) ?? checkTypes.parentColor(props.parentColor, Color);
	} else if (properties === null) properties = defaultValues.properties; // if no ref and no properties : default values

	// Color offsets from the parent Color object :
	const hue = props.hueOffset;
	const saturation = props.saturationOffset;
	const light = props.lightOffset;
	const alpha = props.alphaOffset;
	if (checkTypes.propsSetObject(props.offsets, "offsets") || isProperty({ hue, saturation, light, alpha })) {
		offsets = handleOffsets({ hue, saturation, light, alpha, ...props.offsets });
	}
	return { ref, properties, offsets };
};

const handleColorProperties = ({ hue, saturation, light, alpha }) => {
	if (isValidHueString(hue)) hue = getValueFromHueString(hue);
	checkTypes.colorPropertiesInObject({ hue, saturation, light, alpha });
	return { hue, saturation, light, alpha };
};

const handleOffsets = offsets => {
	if (checkTypes.offsetObjectArgument(offsets)) return offsets;
};
/*





/**************************************/
/***  Handling CSS color strings :  ***/
/**************************************/

// Cheking for valid CSS strings format
const isCssHexString = colorString => /^ *#(\d|[a-f]){3,} *$/i.test(colorString);
const isCssRgbString = colorString =>
	/^ *rgba?\( *(((-|\+)?\d+(\.\d*)?%?|-?\.\d+%?|none)( *, *| *\/ *| +)?){3,4} *\) *$/i.test(colorString);
const isCssHslString = colorString =>
	/^ *hsla?\( *((-|\+)?\d+(\.\d*)?|-?\.\d+) *(deg|turn|rad|grad)?( *, *| *\/ *| +)(((-|\+)?\d+(\.\d*)?%?|-?\.\d+%?)( *, *| *\/ *| +)?){2,3} *\) *$/i.test(
		colorString
	);
const isValidHueString = colorString =>
	(colorString instanceof String || typeof colorString === "string") &&
	/^ *((-|\+)?\d+(\.\d*)?|-?\.\d+) *(deg|turn|rad|grad)? *$/i.test(colorString);

// Converts CSS hexa string to digital values :
const hexStringToValue = (colorString = "") => {
	colorString = colorString.trim();
	const isShort = colorString.length < 7; // For the short hex syntax like "#f00"
	if (isShort) colorString = colorString.replace(/^#(.)(.)(.)(.?)/i, "#$1$1$2$2$3$3$4$4");
	const hex = colorString.match(/^#(?<red>.{2})(?<green>.{2})(?<blue>.{2})(?<alpha>.{0,2})/).groups;

	const red = parseInt(hex.red, 16);
	const green = parseInt(hex.green, 16);
	const blue = parseInt(hex.blue, 16);
	const alpha = parseInt(hex.alpha || "ff", 16);

	return { red, green, blue, alpha };
};

// Converts CSS rgb string to digital values :
const rgbStringToValue = (colorString = "") => {
	const stringValues = colorString.match(
		/^ *rgba?\( *(?<red>.+?)(?: *, *| *\/ *| +)(?<green>.+?)(?: *, *| *\/ *| +)(?<blue>.+?)((?: *, *| *\/ *| +)(?<alpha>.+?)?)? *\) *$/i
	).groups;

	const red = handleStringtoValue(stringValues.red, true);
	const green = handleStringtoValue(stringValues.green, true);
	const blue = handleStringtoValue(stringValues.blue, true);
	const alpha = (handleStringtoValue(stringValues.alpha ?? "100") / 100) * 255;
	return { red, green, blue, alpha };
};

// Converts CSS hsl string to digital values :
const hslStringToValue = (colorString = "") => {
	const stringValues = colorString.match(
		/^ *hsla?\( *(?<hue>.+?)(?: *, *| *\/ *| +)(?<saturation>.+?)(?: *, *| *\/ *| +)(?<light>.+?)((?: *, *| *\/ *| +)(?<alpha>.+?)?)? *\) *$/i
	).groups;

	const hue = getValueFromHueString(stringValues.hue);
	const saturation = handleStringtoValue(stringValues.saturation);
	const light = handleStringtoValue(stringValues.light);
	const alpha = handleStringtoValue(stringValues.alpha ?? "100");
	return { hue, saturation, light, alpha };
};

// Converts hue string to hue value :
const getValueFromHueString = (colorString = "") => {
	let [, stringValue, type] = colorString.match(/^ *(.+?)(deg|turn|rad|grad)? *$/i);
	if (type) type = type.toLowerCase();
	const ratio = type === "turn" ? 360 : type === "grad" ? 360 / 400 : type === "rad" ? 360 / (2 * Math.PI) : 1;
	const value = parseFloat(stringValue) * ratio;
	return value;
};

// Converts css string value to number value :
const handleStringtoValue = (string, isRgb = false) => {
	if (string === "none") string = "0";
	const rawValue = parseFloat(string);
	if (Number.isNaN(rawValue)) throw new TypeError(getErrorMessage.stringArgument(string));

	if (isRgb) {
		const value = string.includes("%") ? (rawValue / 100) * 255 : rawValue;
		return getFormatedValue(value, 255);
	}
	const value = string.includes("%") ? rawValue : rawValue * 100;
	return getFormatedValue(value, 100);
};

// Return HSLA values from CSS color string :
const handleCssColorStrings = (color, isInObject = false) => {
	let hslValues;
	if (isCssHexString(color)) {
		const rgbaValues = hexStringToValue(color);
		hslValues = rgbToHsl(rgbaValues);
	} else if (isCssRgbString(color)) {
		const rgbaValues = rgbStringToValue(color);
		hslValues = rgbToHsl(rgbaValues);
	} else if (isCssHslString(color)) {
		hslValues = hslStringToValue(color);
	} else if (isInObject) {
		throw new TypeError(getErrorMessage.object.css(color));
	} else throw new TypeError(getErrorMessage.stringArgument(color));
	return hslValues;
};
