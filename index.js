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
 * @param	{Color|string|number} [color=0] - Set values (from a other Color or a CSS color string) or set hue from number (optional - 0 by default - 0° Hue get a pure red color)
 * @param	{number}	[saturation=100] - Set the saturation value (optional - 100% by default)
 * @param	{number}	[light=50]	- Set the light value (optional - 50% by default)
 * @param	{number}	[alpha=100] - Set the alpha value (optional - 100% by default)
 */

/*
	TODO: 
	- feat : accept other CSS color format : rgb and hsl (and % & /1)
	- feat : creation of "helpers" / ex: helper shadow = sat / 2 && light - 40% && alpha / 2  => shadows + color = shadowColor
	- feat : method that export the status of the color (values, offset, hasReference) for debbug reason
	- feat : easy dark/light theme integration ?
	- feat : add a remove method to reset fixed properties
	- doc : add useful exemple in the README section 
	- feat : add .parent with .ref alias to get parent color
	- feat : allowing the remplacement of all color properties through a new color property, 
				who act like the contructor function, accepting the same arguments, with value, css color strings and Color object
	- 
	*/

const defaultValues = {
	hue: 0,
	saturation: 100,
	light: 50,
	alpha: 100,
	offset: 0,
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
	#offset = {
		hue: defaultValues.offset,
		saturation: defaultValues.offset,
		light: defaultValues.offset,
		alpha: defaultValues.offset,
	};

	constructor(
		color = defaultValues.hue,
		saturation = defaultValues.saturation,
		light = defaultValues.light,
		alpha = defaultValues.alpha
	) {
		// If we get a Color object :
		if (color instanceof Color) {
			this.#colorReference = color;
			switch (arguments.length) {
				case arguments.length >= 5:
				case 4:
					this.#offset.alpha = alpha ?? defaultValues.offset; // eslint-disable-next-line no-fallthrough
				case 3:
					this.#offset.alpha = light ?? defaultValues.offset; // eslint-disable-next-line no-fallthrough
				case 2:
					this.#offset.saturation = saturation ?? defaultValues.offset; // eslint-disable-next-line no-fallthrough
				default:
					break;
			}
		} else {
			// If we get a CSS color string :
			if (color instanceof String || typeof color === "string") {
				let rgbaColors;
				if (isCssHexString(color)) {
					rgbaColors = hexToValue(color);
				} else throw new Error(getErrorMessage.stringArgument(color));
				({ hue: color, saturation, light, alpha } = rgbToHsl(rgbaColors));

				// If we get a hue number value :
			} else {
				for (const index in arguments) {
					const argument = arguments[index];
					if (typeof argument !== "number" && argument !== null)
						throw new Error(getErrorMessage.argument(index, argument));
					if (Number.isNaN(argument)) throw new Error(getErrorMessage.argumentIsNaN(index));
				}
			}
			this.#hue = getFormatedHue(color ?? defaultValues.hue);
			this.#saturation = getFormatedValue(saturation ?? defaultValues.saturation);
			this.#light = getFormatedValue(light ?? defaultValues.light);
			this.#alpha = getFormatedValue(alpha ?? defaultValues.alpha);
		}
	}

	#getValueFromOffset(value) {
		const refValue = this.#colorReference?.[value];
		const valueOffset = this.#offset[value];
		if (typeof valueOffset === "function") {
			const valueFromCallback = valueOffset(refValue);
			if (typeof valueFromCallback !== "number")
				throw new Error(getErrorMessage.callback(value, valueFromCallback));
			if (Number.isNaN(valueFromCallback)) throw new Error(getErrorMessage.callbackIsNaN(value));
			return valueFromCallback;
		} else if (typeof valueOffset !== "number") throw new Error(getErrorMessage.offset(value, valueOffset));
		return refValue + valueOffset;
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
		if (checkPropertyType("hue", hue)) this.#hue = getFormatedHue(hue);
	}

	// Saturation :
	get saturation() {
		const saturationFromOffset = () => getFormatedValue(this.#getValueFromOffset("saturation"));
		return this.#saturation ?? saturationFromOffset();
	}
	set saturation(saturation) {
		if (checkPropertyType("saturation", saturation)) this.#saturation = getFormatedValue(saturation);
	}

	// Light :
	get light() {
		const lightFromOffset = () => getFormatedValue(this.#getValueFromOffset("light"));
		return this.#light ?? lightFromOffset();
	}
	set light(light) {
		if (checkPropertyType("light", light)) this.#light = getFormatedValue(light);
	}

	// Alpha :
	get alpha() {
		const alphaFromOffset = () => getFormatedValue(this.#getValueFromOffset("alpha"));
		return this.#alpha ?? alphaFromOffset();
	}
	set alpha(alpha) {
		if (checkPropertyType("alpha", alpha)) this.#alpha = getFormatedValue(alpha);
	}

	/*



	/*******************/
	/***  Offsets :  ***/
	/*******************/

	// Hue offset :
	get hueOffset() {
		return this.#offset.hue;
	}
	set hueOffset(hueOffset) {
		if (checkOffsetType("hue", hueOffset)) this.#offset.hue = hueOffset;
	}

	// Saturation offset :
	get saturationOffset() {
		return this.#offset.saturation;
	}
	set saturationOffset(saturationOffset) {
		if (checkOffsetType("saturation", saturationOffset)) this.#offset.saturation = saturationOffset;
	}

	// Light offset :
	get lightOffset() {
		return this.#offset.light;
	}
	set lightOffset(lightOffset) {
		if (checkOffsetType("light", lightOffset)) this.#offset.light = lightOffset;
	}

	// Alpha offset :
	get alphaOffset() {
		return this.#offset.alpha;
	}
	set alphaOffset(alphaOffset) {
		if (checkOffsetType("alpha", alphaOffset)) this.#offset.alpha = alphaOffset;
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
			: `rgba(${red}, ${green}, ${blue}, ${this.alpha / 100})`;
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
}

export default Color;
/*




/*****************/
/***  Utils :  ***/
/*****************/

const roundAt1Decimal = number => Math.round(number * 10) / 10;
const isValue = value => value !== null && value !== undefined;

// assignment type cheking :
const offsetTypes = ["number", "function"];
const checkOffsetType = (property, offset) => {
	if (!isValue(offset)) return false; // If null || undefined, just ignore the assignment with no error.
	if (offsetTypes.includes(typeof offset)) {
		if (Number.isNaN(offset)) throw new Error(getErrorMessage.offsetIsNaN(property));
		else return true;
	}
	throw new Error(getErrorMessage.offset(property, offset));
};
const checkPropertyType = (property, value) => {
	if (!isValue(value)) return false; // If null || undefined, just ignore the assignment with no error.
	if (typeof value === "number") {
		if (Number.isNaN(value)) throw new Error(getErrorMessage.propertyIsNaN(property));
		else return true;
	}
	throw new Error(getErrorMessage.property(property, value));
};

// Allow every argument but export the right HSL value :
const getFormatedHue = hue => {
	hue = roundAt1Decimal(hue);
	if (hue >= 360) return roundAt1Decimal(hue % 360); // js math float approximation problem
	if (hue <= 0) return hue % 360 === 0 ? 0 : roundAt1Decimal(hue % 360) + 360;
	return hue;
};
const getFormatedValue = value => {
	value = roundAt1Decimal(value);
	return value > 100 ? 100 : value <= 0 ? 0 : value;
};

// Cheking for CSS strings format
const isCssHexString = colorString => {
	return colorString.match(/^#(\d|[a-f]){3,}$/i);
};

// Converts hex string to digital values :
const hexToValue = (stringColor = "") => {
	const isShort = stringColor.length < 7; // For the short hex syntax like "#f00"
	if (isShort) stringColor = stringColor.replace(/^#(.)(.)(.)(.?)/i, "#$1$1$2$2$3$3$4$4");

	const hex = stringColor.match(/^#(?<red>.{2})(?<green>.{2})(?<blue>.{2})(?<alpha>.{0,2})/).groups;

	const red = parseInt(hex.red, 16);
	const green = parseInt(hex.green, 16);
	const blue = parseInt(hex.blue, 16);
	const alpha = parseInt(hex.alpha || "ff", 16);

	return { red, green, blue, alpha };
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

	if (saturation == 0) {
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



/***************************/
/***  Handling errors :  ***/
/***************************/

const displayWrongValue = value => (typeof value !== "function" ? JSON.stringify(value) : value);
const checkDocsMessage = (where = "the-color-object") =>
	`Check docs at https://github.com/Lx-Ctn/color/#${where}- to know more.`;

const colorErrorMessage = parameter => `' ${displayWrongValue(
	parameter
)} ', a ${typeof parameter}, was passed for the hue argument, but a number, a CSS string or a Color object is expected.
${checkDocsMessage("constructor-parameters")}`;

const argumentErrorMessage = (property, parameter) => `' ${displayWrongValue(
	parameter
)} ', a ${typeof parameter}, was passed for the ${property} argument, but a number is expected.
${checkDocsMessage("constructor-parameters")}`;

const colorIsNaNMessage = `' NaN ' was passed for the hue argument, but a number, a CSS string or a Color object is expected.
${checkDocsMessage("constructor-parameters")}`;

const argumentIsNaNMessage =
	property => `' NaN ' was passed for the ${property} argument, but a number is expected.
${checkDocsMessage("constructor-parameters")}`;

export const getErrorMessage = {
	stringArgument: argument => `Argument must be a valid CSS color string, but "${argument}" was passed.
${checkDocsMessage("constructor-parameters")}`,

	argument: (index, parameter) => {
		if (index === "0") return colorErrorMessage(parameter);
		const property = index === "1" ? "saturation" : index === "2" ? "light" : "alpha";
		return argumentErrorMessage(property, parameter);
	},
	argumentIsNaN: index => {
		if (index === "0") return colorIsNaNMessage;
		const property = index === "1" ? "saturation" : index === "2" ? "light" : "alpha";
		return argumentIsNaNMessage(property);
	},
	property: (property, returnValue) => `The "${property}" property return ' ${displayWrongValue(
		returnValue
	)} ', a ${typeof returnValue}, but must return a number.
${checkDocsMessage("properties")}`,

	propertyIsNaN: property => `The "${property}" property return ' NaN ', but must return a number.
${checkDocsMessage("properties")}`,

	offset: (property, returnValue) => `The "${property}Offset" property return ' ${displayWrongValue(
		returnValue
	)} ', a ${typeof returnValue}, but must return a number, or a function returning a number.
${checkDocsMessage("properties")}`,

	offsetIsNaN:
		property => `The "${property}Offset" property return ' NaN ', but must return a number, or a function returning a number.
${checkDocsMessage("properties")}`,

	callback: (
		property,
		returnValue
	) => `Callback in your "${property}Offset" property return ' ${displayWrongValue(returnValue)} '${
		typeof returnValue === "undefined" ? "" : ", a " + typeof returnValue
	}, but must return a number.
${checkDocsMessage("properties")}`,

	callbackIsNaN:
		property => `Callback in your "${property}Offset" property return ' NaN ' but must return a valid number.
${checkDocsMessage("properties")}`,
};
