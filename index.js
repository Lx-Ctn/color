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
	- fix : if parameter = null ?
	- feat : easy dark/light theme integration ?
	- feat : add a remove method to reset fixed properties
	- fix : callback offset must return a number : throw error.
	*/
class Color {
	#colorReference;
	#hue;
	#saturation;
	#light;
	#alpha;
	// Les paramètres sont protégés pour assurer les valeurs min et max (propriétés de 0 à 100%)
	// Ainsi que la rotation sur la roue chromatique

	constructor(ColorOrValue = 0, saturation = 100, light = 50, alpha = 100) {
		// init :
		this.hueOffset = 0;
		this.saturationOffset = 0;
		this.lightOffset = 0;
		this.alphaOffset = 0;

		// If we get a CSS color value :
		if (ColorOrValue instanceof String || typeof ColorOrValue === "string") {
			let colors;
			if (ColorOrValue.includes("#")) {
				colors = hexToValue(ColorOrValue);
			}
			({ hue: ColorOrValue, saturation, light, alpha } = rgbToHsl(colors));
		}
		// If we get a Color object :
		if (ColorOrValue instanceof Color) {
			this.#colorReference = ColorOrValue;
			switch (arguments.length) {
				case 4:
					this.alphaOffset = alpha; // eslint-disable-next-line no-fallthrough
				case 3:
					this.lightOffset = light; // eslint-disable-next-line no-fallthrough
				case 2:
					this.saturationOffset = saturation; // eslint-disable-next-line no-fallthrough
				default:
					break;
			}
			// If we get a hue number value :
		} else {
			this.#hue = getFormatedHue(ColorOrValue);
			this.#saturation = getFormatedValue(saturation);
			this.#light = getFormatedValue(light);
			this.#alpha = getFormatedValue(alpha);
		}
	}

	#getValueFromOffset(value) {
		const valueOffset = this[`${value}Offset`];
		const refValue = this.#colorReference?.[value];
		return typeof valueOffset === "function" ? valueOffset(refValue) : refValue + valueOffset;
	}

	// Hue :
	get hue() {
		return this.#hue ?? getFormatedHue(this.#getValueFromOffset("hue"));
	}
	set hue(hue) {
		this.#hue = getFormatedHue(hue);
	}

	// Saturation :
	get saturation() {
		return this.#saturation ?? getFormatedValue(this.#getValueFromOffset("saturation"));
	}
	set saturation(saturation) {
		this.#saturation = getFormatedValue(saturation);
	}

	// Light :
	get light() {
		return this.#light ?? getFormatedValue(this.#getValueFromOffset("light"));
	}
	set light(light) {
		this.#light = getFormatedValue(light);
	}

	// Alpha :
	get alpha() {
		return this.#alpha ?? getFormatedValue(this.#getValueFromOffset("alpha"));
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

// Converts string to values :
const hexToValue = stringColor => {
	const red = parseInt(stringColor.slice(1, 3), 16);
	const green = parseInt(stringColor.slice(3, 5), 16);
	const blue = parseInt(stringColor.slice(5, 7), 16);
	const alpha = parseInt(stringColor.slice(7) || "ff", 16);
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
