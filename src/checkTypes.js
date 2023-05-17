/*

/************************/
/***  Type checking :  ***/
/************************/

import { getErrorMessage } from "./errorMessages.js";

// Argument type checking in constructor :
const offsetTypes = ["number", "function"];
const offsetNames = ["hue", "saturation", "light", "alpha"];
const isValue = value => value !== null && value !== undefined;
export const isLiteralObject = object => {
	return Object.prototype.toString.call(object) === "[object Object]";
};

export const offsetObjectArgument = offsets => {
	if (!isValue(offsets)) return false; // If null || undefined, just ignore the assignment with no error.
	if (isLiteralObject(offsets)) {
		for (const propertyName in offsets) {
			if (!offsetNames.includes(propertyName)) continue; // Ignore extra properties.
			const value = offsets[propertyName];
			if (!isValue(value)) continue; // If null || undefined, just ignore the assignment with no error.
			if (!offsetTypes.includes(typeof value) || Number.isNaN(value))
				throw new Error(getErrorMessage.offset(propertyName, value, true));
		}
		return true;
	} else throw new Error(getErrorMessage.object.set(offsets, "offsets"));
};

export const directValueArgument = args => {
	// If the 1st argument is a direct number value or a hue <angle> string :
	for (const index in args) {
		if (index > 3) continue;
		const argument = args[index];
		if (index === "0" && (argument instanceof String || typeof argument === "string")) continue;
		const propertyName =
			index === "0" ? "hue" : index === "1" ? "saturation" : index === "2" ? "light" : "alpha";
		const isInConstructor = true;
		property(propertyName, argument, isInConstructor);
	}
};

// For offset or properties objects with a { hue, sat, light, alpha } set :
export const propsSetObject = (object, setName = "") => {
	if (isValue(object)) {
		if (isLiteralObject(object)) return true;
		throw new Error(getErrorMessage.object.set(object, setName));
	}
	return false;
};

// For hue, sat, light or alpha in set of offset or properties objects :
export const colorPropertiesInObject = colorProperties => {
	for (const key in colorProperties) {
		const colorProp = colorProperties[key];
		if (
			(isValue(colorProp) && !(colorProp instanceof Number) && typeof colorProp !== "number") ||
			Number.isNaN(colorProp)
		)
			throw new Error(getErrorMessage.object.properties(key, colorProp));
	}
};

export const parentColor = (color, colorType) => {
	if (color instanceof colorType) return color;
	if (isValue(color)) throw new Error(getErrorMessage.object.parentColor(color));
};

// Properties type checking :
export const offset = (propertyName, value, isInConstructor = false) => {
	if (!isValue(value)) return false; // If null || undefined, just ignore the assignment with no error.
	if (!offsetTypes.includes(typeof value) || Number.isNaN(value))
		throw new Error(getErrorMessage.offset(propertyName, value, isInConstructor));
	return true;
};
export const property = (propertyName, value, isInConstructor = false) => {
	if (!isValue(value)) return false; // If null || undefined, just ignore the assignment with no error.
	if ((!(value instanceof Number) && typeof value !== "number") || Number.isNaN(value))
		throw new Error(getErrorMessage.directValues(propertyName, value, isInConstructor));
	return true;
};

// Callback return type checking for offsets :
export const callbackReturnValue = (propertyName, value) => {
	if ((!(value instanceof Number) && typeof value !== "number") || Number.isNaN(value))
		throw new Error(getErrorMessage.callback(propertyName, value));
};
