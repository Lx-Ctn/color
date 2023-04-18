/**
 * Créé un objet couleur au format hsl + alpha optionnel
 * @class
 *
 * Permet d'intéragir facilement avec la couleur,
 * Par exemple d'accéder facilement aux nuances et ombres d'une couleur en variant la propriétés de luminosité.
 *
 * On peut passer un autre object Color en paramètre :
 * Il sera la référence pour garder un lien dynamique avec ses propriétés :
 * 		const mainColor = new Color(360, 90, 70);
 * 		const darkMainColor = new Color(mainColor, null, -30);
 * 		mainColor.hue = 30;
 * 		=> darkMainColor : (30, 90, 40)
 * La nouvelle instance hérite des changements sur la référence, sauf si la propriété est écrasée sur la nouvelle.
 * Les propriétés Offset permettent un décalage dynamique avec la valeur de référence.
 * => Idéal pour la gestion dynamique de thème de couleurs
 *
 * @param	{Color|string|number} [ColorOrValue=0] - Set values (from a other Color or a CSS color string) or set hue from number (optional - 0 by default - 0° Hue get a pure red color)
 * @param	{number}	[saturation=100] - Set the saturation value (optional - 100% by default)
 * @param	{number}	[light=50]	- Set the light value (optional - 50% by default)
 * @param	{number}	[alpha=100] - Set the alpha value (optional - 100% by default)
 */

/*
	TODO:
	- feat : gestion des notations racourcies "#fff" -> "#ffffff" && "#ffff" -> "#ffffffff"
	- feat : gestion des autres notations CSS rgb & hsl (% & /1)
	- feat : création de "helpers" / ex: helper shadow = sat / 2 && light - 40% && alpha / 2  => shadows + color = shadowColor
	- feat : method that export the status of the color (values, offset, hasReference) for debbug reason
	- feat : easy dark/light theme integration ?
	- feat : add a remove method to reset fixed properties
	- doc : add useful exemple in the README section
	*/

const defaultValues = {
	hue: 0,
	saturation: 100,
	light: 50,
	alpha: 100,
	offset: 0,
};

class Color {
	#colorReference;
	#hue;
	#saturation;
	#light;
	#alpha;
	// Parameters are protected to ensure min and max values (properties from 0 to 100%)
	// And the rotation around the color wheel.

	constructor(
		ColorOrValue = defaultValues.hue,
		saturation = defaultValues.saturation,
		light = defaultValues.light,
		alpha = defaultValues.alpha
	) {
		// init :
		this.hueOffset = 0;
		this.saturationOffset = 0;
		this.lightOffset = 0;
		this.alphaOffset = 0;

		// If we get a CSS color value :
		if (ColorOrValue instanceof String || typeof ColorOrValue === "string") {
			let colors;
			if (ColorOrValue.startsWith("#")) {
				colors = hexToValue(ColorOrValue);
			} else throw new Error(getErrorMessage.stringArgument);
			({ hue: ColorOrValue, saturation, light, alpha } = rgbToHsl(colors));
		}

		// If we get a Color object :
		if (ColorOrValue instanceof Color) {
			this.#colorReference = ColorOrValue;
			switch (arguments.length) {
				case 4:
					this.alphaOffset = alpha ?? defaultValues.offset; // eslint-disable-next-line no-fallthrough
				case 3:
					this.lightOffset = light ?? defaultValues.offset; // eslint-disable-next-line no-fallthrough
				case 2:
					this.saturationOffset = saturation ?? defaultValues.offset; // eslint-disable-next-line no-fallthrough
				default:
					break;
			}

			// If we get a hue number value :
		} else {
			for (const index in arguments) {
				const argument = arguments[index];
				if (typeof argument !== "number") throw new Error(getErrorMessage.argument(index, argument));
			}
			this.#hue = getFormatedHue(ColorOrValue ?? defaultValues.hue);
			this.#saturation = getFormatedValue(saturation ?? defaultValues.saturation);
			this.#light = getFormatedValue(light ?? defaultValues.light);
			this.#alpha = getFormatedValue(alpha ?? defaultValues.alpha);
		}
	}

	#getValueFromOffset(value) {
		const refValue = this.#colorReference?.[value];
		const valueOffset = this[`${value}Offset`];

		if (typeof valueOffset === "function") {
			const valueFromCallback = valueOffset(refValue);
			if (typeof valueFromCallback !== "number")
				throw new Error(getErrorMessage.callback(value, valueFromCallback));
			return valueFromCallback;
		} else if (typeof valueOffset !== "number") throw new Error(getErrorMessage.offset(value, valueOffset));
		return refValue + valueOffset;
	}

	// Hue :
	get hue() {
		const hueFromOffset = getFormatedHue(this.#getValueFromOffset("hue"));
		return this.#hue ?? hueFromOffset;
	}
	set hue(hue) {
		this.#hue = getFormatedHue(hue);
	}

	// Saturation :
	get saturation() {
		const saturationFromOffset = getFormatedValue(this.#getValueFromOffset("saturation"));
		return this.#saturation ?? saturationFromOffset;
	}
	set saturation(saturation) {
		this.#saturation = getFormatedValue(saturation);
	}

	// Light :
	get light() {
		const lightFromOffset = getFormatedValue(this.#getValueFromOffset("light"));
		return this.#light ?? lightFromOffset;
	}
	set light(light) {
		this.#light = getFormatedValue(light);
	}

	// Alpha :
	get alpha() {
		const alphaFromOffset = getFormatedValue(this.#getValueFromOffset("alpha"));
		return this.#alpha ?? alphaFromOffset;
	}
	set alpha(alpha) {
		this.#alpha = getFormatedValue(alpha);
	}

	// Export css :
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






*/ // Allow every argument but export the right HSL value :
const getFormatedHue = hue => (hue >= 360 ? hue % 360 : hue < 0 ? (hue % 360) + 360 : hue);
const getFormatedValue = value => (value > 100 ? 100 : value < 0 ? 0 : value);

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
	hue = Math.round(hue * 360 * 10) / 10;
	saturation = Math.round(saturation * 100 * 10) / 10;
	light = Math.round(light * 100 * 10) / 10;
	alpha = Math.round(alpha * 100 * 10) / 10;

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

		red = Math.round(hueToRgb(p, q, hue + 2 / 6) * 255);
		green = Math.round(hueToRgb(p, q, hue) * 255);
		blue = Math.round(hueToRgb(p, q, hue - 2 / 6) * 255);
	}

	return [red, green, blue];
};

/*


Handling errors : 
*/
const checkDocsMessage = "Check docs at https://github.com/Lx-Ctn/color/#properties- to know more.";

const stringArgumentMessage = `Argument must be a valid CSS string.
${checkDocsMessage}`;

const hueErrorMessage =
	parameter => `The hue argument is a ${typeof parameter}, but a number, a CSS string, or a Color object was expected
${checkDocsMessage}`;

const argumentErrorMessage = (
	property,
	parameter
) => `The ${property} argument is a ${typeof parameter}, but a number was expected
${checkDocsMessage}`;

const propertyErrorMessage = (
	value,
	returnValue
) => `".${value}Offset" property return a ${typeof returnValue}, but must return a number.
${checkDocsMessage}`;

const getErrorMessage = {
	stringArgument: stringArgumentMessage,
	argument: (index, parameter) => {
		if (index === "0") return hueErrorMessage(parameter);
		const property = index === "1" ? "saturation" : index === "2" ? "light" : "alpha";
		return argumentErrorMessage(property, parameter);
	},
	offset: (value, returnValue) => propertyErrorMessage(value, returnValue),
	callback: (value, returnValue) => "Callback in your " + propertyErrorMessage(value, returnValue),
};
